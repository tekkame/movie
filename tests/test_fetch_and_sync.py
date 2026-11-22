"""
fetch_and_sync.py の主要ロジックに対する単体テスト
"""

from __future__ import annotations

import gzip
import io
import unittest
from unittest.mock import MagicMock, patch

from pipeline import fetch_and_sync


def _make_gz_response(tsv_text: str) -> MagicMock:
    buf = io.BytesIO()
    with gzip.GzipFile(fileobj=buf, mode="wb") as gz:
        gz.write(tsv_text.encode("utf-8"))
    buf.seek(0)
    resp = MagicMock()
    resp.raw = buf
    resp.raise_for_status = MagicMock()
    resp.__enter__ = MagicMock(return_value=resp)
    resp.__exit__ = MagicMock(return_value=False)
    return resp


class TestFetchAndSync(unittest.TestCase):
    def test_build_excluded_genres_animation_default_and_flag(self) -> None:
        default_excluded = fetch_and_sync.build_excluded_genres()
        self.assertNotIn("Animation", default_excluded)
        self.assertIn("Documentary", default_excluded)

        excluded_with_flag = fetch_and_sync.build_excluded_genres(include_animation=False)
        self.assertIn("Animation", excluded_with_flag)

    def test_download_imdb_candidates_includes_animation_by_default(self) -> None:
        ratings_tsv = "tconst\taverageRating\tnumVotes\ntt0245429\t8.6\t880000\ntt0114369\t8.6\t1850000\n"
        basics_tsv = (
            "tconst\ttitleType\tprimaryTitle\toriginalTitle\tisAdult\tstartYear\tendYear\truntimeMinutes\tgenres\n"
            "tt0245429\tmovie\tSpirited Away\tSen to Chihiro no kamikakushi\t0\t2001\t\\N\t125\tAnimation,Adventure,Family\n"
            "tt0114369\tmovie\tSe7en\tSe7en\t0\t2001\t\\N\t127\tCrime,Drama,Mystery\n"
        )

        with patch.object(
            fetch_and_sync.requests,
            "get",
            side_effect=[_make_gz_response(ratings_tsv), _make_gz_response(basics_tsv)],
        ):
            res_default = fetch_and_sync.download_imdb_candidates(2001, 2001)

        ids_default = {m["imdb_id"] for m in res_default[2001]}
        self.assertIn("tt0245429", ids_default)
        self.assertIn("tt0114369", ids_default)

        with patch.object(
            fetch_and_sync.requests,
            "get",
            side_effect=[_make_gz_response(ratings_tsv), _make_gz_response(basics_tsv)],
        ):
            res_excluded = fetch_and_sync.download_imdb_candidates(2001, 2001, include_animation=False)

        ids_excluded = {m["imdb_id"] for m in res_excluded[2001]}
        self.assertNotIn("tt0245429", ids_excluded)
        self.assertIn("tt0114369", ids_excluded)

    def test_fetch_omdb_detail_returns_empty_cache_on_not_found(self) -> None:
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.raise_for_status = MagicMock()
        mock_resp.json.return_value = {"Response": "False", "Error": "Movie not found!"}

        with patch.object(fetch_and_sync.requests, "get", return_value=mock_resp):
            detail = fetch_and_sync.fetch_omdb_detail("tt9999999", "dummy-key")

        self.assertIsNotNone(detail)
        assert detail is not None
        self.assertEqual(detail["imdb_id"], "tt9999999")
        self.assertIsNone(detail["metascore"])
        self.assertIsNone(detail["rt_score"])
        self.assertEqual(detail["awards_text"], "")
        self.assertEqual(detail["director"], "")
        self.assertEqual(detail["country"], "")
        self.assertEqual(detail["language"], "")

    def test_fetch_omdb_detail_raises_on_rate_limit(self) -> None:
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.raise_for_status = MagicMock()
        mock_resp.json.return_value = {"Response": "False", "Error": "Request limit reached!"}

        with patch.object(fetch_and_sync.requests, "get", return_value=mock_resp):
            with self.assertRaises(RuntimeError):
                fetch_and_sync.fetch_omdb_detail("tt9999999", "dummy-key")

        mock_401 = MagicMock()
        mock_401.status_code = 401
        with patch.object(fetch_and_sync.requests, "get", return_value=mock_401):
            with self.assertRaises(RuntimeError):
                fetch_and_sync.fetch_omdb_detail("tt9999999", "dummy-key")

    def test_preserve_ai_enrichment_keeps_existing_summary_and_tags(self) -> None:
        new_records = [
            {"imdb_id": "tt0001", "title_ja": "作品A"},
            {"imdb_id": "tt0002", "title_ja": "作品B"},
        ]
        existing_rows = [
            {
                "imdb_id": "tt0001",
                "ai_summary": "ネタバレなしの推薦文",
                "mood_tags": ["映像美", "重厚サスペンス"],
            }
        ]

        merged = fetch_and_sync.preserve_ai_enrichment(new_records, existing_rows)
        self.assertEqual(merged[0]["ai_summary"], "ネタバレなしの推薦文")
        self.assertEqual(merged[0]["mood_tags"], ["映像美", "重厚サスペンス"])
        self.assertIsNone(merged[1]["ai_summary"])
        self.assertEqual(merged[1]["mood_tags"], [])

    def test_normalize_supabase_url_and_headers(self) -> None:
        self.assertEqual(
            fetch_and_sync.normalize_supabase_url("https://example.supabase.co/rest/v1/"),
            "https://example.supabase.co",
        )
        self.assertEqual(
            fetch_and_sync.normalize_supabase_url("https://example.supabase.co/rest/v1"),
            "https://example.supabase.co",
        )
        self.assertEqual(
            fetch_and_sync.normalize_supabase_url("https://example.supabase.co/"),
            "https://example.supabase.co",
        )

        sb_headers = fetch_and_sync.build_supabase_headers("sb_secret_abc")
        self.assertEqual(sb_headers["apikey"], "sb_secret_abc")
        self.assertNotIn("Authorization", sb_headers)

        jwt_headers = fetch_and_sync.build_supabase_headers("eyJhbGciOiJIUzI1NiJ9.dummy")
        self.assertEqual(jwt_headers["apikey"], "eyJhbGciOiJIUzI1NiJ9.dummy")
        self.assertEqual(jwt_headers["Authorization"], "Bearer eyJhbGciOiJIUzI1NiJ9.dummy")

    def test_select_year_candidates_multibucket_rescues_global_and_horror_hits(self) -> None:
        # 55本のローカル高評価作（投票数少）に、世界的話題作（Sinners相当）とホラー作を混ぜる
        items = [
            {
                "imdb_id": f"tt_local_{i:02d}",
                "release_year": 2025,
                "title_en": f"Local Film {i}",
                "genres": ["Drama"],
                "imdb_rating": 8.6 - i * 0.01,
                "imdb_votes": 12000 + i * 100,
            }
            for i in range(55)
        ]
        items.append(
            {
                "imdb_id": "tt31193180",
                "release_year": 2025,
                "title_en": "Sinners",
                "genres": ["Action", "Drama", "Horror"],
                "imdb_rating": 7.5,
                "imdb_votes": 414298,
            }
        )
        items.append(
            {
                "imdb_id": "tt_horror_rescue",
                "release_year": 2025,
                "title_en": "Genre Horror Gem",
                "genres": ["Horror", "Thriller"],
                "imdb_rating": 7.0,
                "imdb_votes": 45000,
            }
        )

        selected = fetch_and_sync.select_year_candidates_multibucket(items, year=2025, candidates_per_year=50)
        self.assertEqual(len(selected), 50)
        selected_ids = {m["imdb_id"] for m in selected}
        self.assertIn("tt31193180", selected_ids)
        self.assertIn("tt_horror_rescue", selected_ids)

    def test_select_year_candidates_multibucket_rescues_high_vote_cult_horror_at_6_5(self) -> None:
        # バケットAの20枠が別作品で埋まった状況でも、25万票以上かつIMDb 6.5〜6.7のカルトホラーがバケットBで救済されること
        items = [
            {
                "imdb_id": f"tt_major_{i:02d}",
                "release_year": 2019,
                "title_en": f"Major Hit {i}",
                "genres": ["Drama"],
                "imdb_rating": 8.0 + (i % 5) * 0.1,
                "imdb_votes": 600000 + i * 10000,
            }
            for i in range(25)
        ]
        # 6.8未満でも 25万票以上のホラー名作はバケットB対象になる
        items.append(
            {
                "imdb_id": "tt_cult_horror_66",
                "release_year": 2019,
                "title_en": "Cult Horror 6.6",
                "genres": ["Horror", "Mystery"],
                "imdb_rating": 6.6,
                "imdb_votes": 320000,
            }
        )
        # 25万票未満で 6.8未満はバケットB対象外
        items.append(
            {
                "imdb_id": "tt_low_horror_66",
                "release_year": 2019,
                "title_en": "Low Vote Horror 6.6",
                "genres": ["Horror"],
                "imdb_rating": 6.6,
                "imdb_votes": 100000,
            }
        )
        # 残りを満たすための一般作品
        for i in range(35):
            items.append(
                {
                    "imdb_id": f"tt_filler_{i:02d}",
                    "release_year": 2019,
                    "title_en": f"Filler {i}",
                    "genres": ["Drama"],
                    "imdb_rating": 7.6,
                    "imdb_votes": 50000 + i * 100,
                }
            )

        selected = fetch_and_sync.select_year_candidates_multibucket(items, year=2019, candidates_per_year=50)
        self.assertEqual(len(selected), 50)
        selected_ids = {m["imdb_id"] for m in selected}
        self.assertIn("tt_cult_horror_66", selected_ids)
        self.assertNotIn("tt_low_horror_66", selected_ids)

    def test_preserve_ai_enrichment_ensures_uniform_keys_for_postgrest(self) -> None:
        records = [
            {"imdb_id": "tt1", "title_ja": "A"},
            {"imdb_id": "tt2", "title_ja": "B", "extra_field": 123},
        ]
        merged = fetch_and_sync.preserve_ai_enrichment(records, [])
        self.assertEqual(set(merged[0].keys()), set(merged[1].keys()))
        self.assertIn("ai_summary", merged[0])
        self.assertIn("mood_tags", merged[0])


if __name__ == "__main__":
    unittest.main()
