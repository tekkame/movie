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


if __name__ == "__main__":
    unittest.main()
