"""
fetch_and_sync.py の主要ロジックに対する単体テスト
"""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
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

    def test_is_omdb_cache_fresh_ttl_rules(self) -> None:
        now = datetime(2026, 11, 23, 0, 0, 0, tzinfo=timezone.utc)
        current_year = 2026

        # 未キャッシュは常に False
        self.assertFalse(fetch_and_sync.is_omdb_cache_fresh(None, 2026, current_year, now_dt=now))
        self.assertFalse(fetch_and_sync.is_omdb_cache_fresh(None, 2010, current_year, now_dt=now))

        # 直近2年（2026, 2025）: 14日未満なら True、14日以上なら False
        fresh_ts = (now - timedelta(days=13, hours=23)).isoformat()
        stale_ts = (now - timedelta(days=14)).isoformat()
        very_old_ts = (now - timedelta(days=90)).isoformat()

        self.assertTrue(
            fetch_and_sync.is_omdb_cache_fresh({"fetched_at": fresh_ts}, 2026, current_year, now_dt=now)
        )
        self.assertTrue(
            fetch_and_sync.is_omdb_cache_fresh({"fetched_at": fresh_ts}, 2025, current_year, now_dt=now)
        )
        self.assertFalse(
            fetch_and_sync.is_omdb_cache_fresh({"fetched_at": stale_ts}, 2026, current_year, now_dt=now)
        )
        self.assertFalse(
            fetch_and_sync.is_omdb_cache_fresh({"fetched_at": stale_ts}, 2025, current_year, now_dt=now)
        )
        # fetched_at 欠損・不正値も直近2年なら再取得対象
        self.assertFalse(
            fetch_and_sync.is_omdb_cache_fresh({"fetched_at": None}, 2026, current_year, now_dt=now)
        )
        self.assertFalse(
            fetch_and_sync.is_omdb_cache_fresh({"fetched_at": "invalid-date"}, 2025, current_year, now_dt=now)
        )

        # 3年以上前（2024以前）は 90日経過していても既存キャッシュがあれば True（API枠節約）
        self.assertTrue(
            fetch_and_sync.is_omdb_cache_fresh({"fetched_at": very_old_ts}, 2024, current_year, now_dt=now)
        )
        self.assertTrue(
            fetch_and_sync.is_omdb_cache_fresh({"fetched_at": None}, 1995, current_year, now_dt=now)
        )

    def test_plan_omdb_fetch_and_sync_years_prioritizes_recent_then_backfill(self) -> None:
        now = datetime(2026, 11, 23, 0, 0, 0, tzinfo=timezone.utc)
        current_year = 2026
        candidates_by_year = {
            2026: [{"imdb_id": "tt_2026_fresh"}, {"imdb_id": "tt_2026_stale"}, {"imdb_id": "tt_2026_new"}],
            2025: [{"imdb_id": "tt_2025_stale"}],
            2024: [{"imdb_id": "tt_2024_cached"}, {"imdb_id": "tt_2024_uncached"}],
            1999: [{"imdb_id": "tt_1999_uncached"}],
        }
        omdb_cache = {
            "tt_2026_fresh": {"fetched_at": (now - timedelta(days=5)).isoformat()},
            "tt_2026_stale": {"fetched_at": (now - timedelta(days=15)).isoformat()},
            "tt_2025_stale": {"fetched_at": (now - timedelta(days=20)).isoformat()},
            "tt_2024_cached": {"fetched_at": (now - timedelta(days=60)).isoformat()},
        }
        existing_counts = {2026: 20, 2025: 20, 2024: 20, 1999: 0}

        plan = fetch_and_sync.plan_omdb_fetch_and_sync_years(
            candidates_by_year=candidates_by_year,
            omdb_cache=omdb_cache,
            existing_movie_counts_by_year=existing_counts,
            current_year=current_year,
            mode="weekly",
            recent_ttl_days=14,
            now_dt=now,
        )

        # 優先1: 直近2年の stale / new のみ（fresh は除外）
        self.assertEqual(
            [(y, c["imdb_id"]) for y, c in plan["priority1_queue"]],
            [(2026, "tt_2026_stale"), (2026, "tt_2026_new"), (2025, "tt_2025_stale")],
        )
        # 優先2: 過去年（2024 -> 1999 降順）の未キャッシュのみ（2024_cached は60日経過でも再利用）
        self.assertEqual(
            [(y, c["imdb_id"]) for y, c in plan["priority2_queue"]],
            [(2024, "tt_2024_uncached"), (1999, "tt_1999_uncached")],
        )
        # max_omdb_calls=4 で頭から切っても、優先1の3件をすべて処理したあと余剰1枠で2024年を自動バックフィルできる
        limited = plan["fetch_queue"][:4]
        self.assertEqual(
            [c["imdb_id"] for _, c in limited],
            ["tt_2026_stale", "tt_2026_new", "tt_2025_stale", "tt_2024_uncached"],
        )

        # weekly 時の年同期判定:
        # - 直近2年（2026, 2025）は常に同期
        # - 過去年（2024）は newly_fetched_years に含まれなければ（movies=20本済み）スキップ、含まれれば同期
        # - 過去年（1999）は既存 movies=0 (<20) なので新規OMDbが無くても既存キャッシュ分だけで同期対象
        self.assertTrue(fetch_and_sync.should_sync_year_movies(2026, current_year, "weekly", set(), existing_counts))
        self.assertFalse(fetch_and_sync.should_sync_year_movies(2024, current_year, "weekly", set(), existing_counts))
        self.assertTrue(fetch_and_sync.should_sync_year_movies(2024, current_year, "weekly", {2024}, existing_counts))
        self.assertTrue(fetch_and_sync.should_sync_year_movies(1999, current_year, "weekly", set(), existing_counts))


if __name__ == "__main__":
    unittest.main()
