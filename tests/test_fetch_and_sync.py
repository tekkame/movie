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
            {"imdb_id": "tt0001", "title_ja": "作品A", "mood_tags": ["自動タグ1", "自動タグ2"]},
            {"imdb_id": "tt0002", "title_ja": "作品B", "mood_tags": ["余韻ドラマ", "批評家絶賛"]},
            {"imdb_id": "tt0003", "title_ja": "作品C"},
        ]
        existing_rows = [
            {
                "imdb_id": "tt0001",
                "ai_summary": "ネタバレなしの推薦文",
                "mood_tags": ["映像美", "重厚サスペンス"],
            },
            {
                "imdb_id": "tt0002",
                "ai_summary": None,
                "mood_tags": ["古いタグ"],
            },
        ]

        merged = fetch_and_sync.preserve_ai_enrichment(new_records, existing_rows)
        # ai_summary IS NOT NULL の行は既存の ai_summary / mood_tags が保護され自動タグで上書きされない
        self.assertEqual(merged[0]["ai_summary"], "ネタバレなしの推薦文")
        self.assertEqual(merged[0]["mood_tags"], ["映像美", "重厚サスペンス"])
        # ai_summary IS NULL の行は自動生成された mood_tags が反映される
        self.assertIsNone(merged[1]["ai_summary"])
        self.assertEqual(merged[1]["mood_tags"], ["余韻ドラマ", "批評家絶賛"])
        # 新規レコードで mood_tags が未指定なら []
        self.assertIsNone(merged[2]["ai_summary"])
        self.assertEqual(merged[2]["mood_tags"], [])

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
        existing_counts = {2026: 25, 2025: 25, 2024: 25, 1999: 0}

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
        # - 過去年（2024）は newly_fetched_years に含まれなければ（movies=25本済み）スキップ、含まれれば同期
        # - 過去年（1999）は既存 movies=0 (<25) なので新規OMDbが無くても既存キャッシュ分だけで同期対象
        self.assertTrue(fetch_and_sync.should_sync_year_movies(2026, current_year, "weekly", set(), existing_counts))
        self.assertFalse(fetch_and_sync.should_sync_year_movies(2024, current_year, "weekly", set(), existing_counts))
        self.assertTrue(fetch_and_sync.should_sync_year_movies(2024, current_year, "weekly", {2024}, existing_counts))
        self.assertTrue(fetch_and_sync.should_sync_year_movies(1999, current_year, "weekly", set(), existing_counts))

    def test_select_year_candidates_top35_plus_genre_popular15_and_manual_picks(self) -> None:
        # 枠1(35本)が高IMDbドラマで埋まっても、枠2(15本)が 50,000票以上・IMDb 6.8以上のジャンル人気作を拾い、
        # manual_picks は投票数・スコア不問で無条件収録されることを検証
        items = [
            {
                "imdb_id": f"tt_drama_{i:02d}",
                "release_year": 2008,
                "title_en": f"High Rated Drama {i}",
                "genres": ["Drama"],
                "imdb_rating": 8.4 - i * 0.01,
                "imdb_votes": 40000 + i * 500,
            }
            for i in range(45)
        ]
        # クローバーフィールド型（IMDb 7.0 / 43万票 / Horror, Sci-Fi, Thriller）
        items.append(
            {
                "imdb_id": "tt1060277",
                "release_year": 2008,
                "title_en": "Cloverfield",
                "genres": ["Action", "Horror", "Sci-Fi"],
                "imdb_rating": 7.0,
                "imdb_votes": 430000,
            }
        )
        # 投票数5万未満のIMDb 6.9ホラーは枠2対象外（枠1の35本にも入れない）
        items.append(
            {
                "imdb_id": "tt_low_votes_horror",
                "release_year": 2008,
                "title_en": "Low Vote Horror",
                "genres": ["Horror"],
                "imdb_rating": 6.9,
                "imdb_votes": 20000,
            }
        )
        # manual_picks に指定された低投票作（無条件で収録される）
        items.append(
            {
                "imdb_id": "tt9990001",
                "release_year": 2008,
                "title_en": "Manual Niche Gem",
                "genres": ["Mystery"],
                "imdb_rating": 6.2,
                "imdb_votes": 4500,
            }
        )

        selected = fetch_and_sync.select_year_candidates_multibucket(
            items,
            year=2008,
            candidates_per_year=50,
            current_year=2026,
            manual_picks={"tt9990001"},
        )
        # itemsは48件なので全件返るが、より大きな60件ケースでも枠2が機能することを確認するため追加
        for i in range(15):
            items.append(
                {
                    "imdb_id": f"tt_drama_extra_{i:02d}",
                    "release_year": 2008,
                    "title_en": f"Extra Drama {i}",
                    "genres": ["Drama"],
                    "imdb_rating": 7.9 - i * 0.01,
                    "imdb_votes": 35000,
                }
            )
        selected = fetch_and_sync.select_year_candidates_multibucket(
            items,
            year=2008,
            candidates_per_year=50,
            current_year=2026,
            manual_picks={"tt9990001"},
        )
        self.assertEqual(len(selected), 50)
        selected_ids = {m["imdb_id"] for m in selected}
        self.assertIn("tt1060277", selected_ids)
        self.assertIn("tt9990001", selected_ids)
        self.assertNotIn("tt_low_votes_horror", selected_ids)
        manual_entry = next(m for m in selected if m["imdb_id"] == "tt9990001")
        self.assertTrue(manual_entry.get("is_manual_pick"))

    def test_load_manual_picks_parses_comments_and_ignores_invalid(self) -> None:
        import tempfile
        from pathlib import Path

        with tempfile.TemporaryDirectory() as tmpdir:
            p = Path(tmpdir) / "manual_picks.txt"
            p.write_text(
                "# header comment\n\ntt1060277 # Cloverfield\n  tt31193180\ninvalid_id\ntt5052448 # Get Out\n",
                encoding="utf-8",
            )
            picks = fetch_and_sync.load_manual_picks(p)
            self.assertEqual(picks, {"tt1060277", "tt31193180", "tt5052448"})

    def test_compute_newly_flatrate_update_diff_and_14day_retention(self) -> None:
        now = datetime(2026, 11, 23, 12, 0, 0, tzinfo=timezone.utc)

        # 1. 初回登録（prev_providers=None）は差分なし
        provs, at = fetch_and_sync.compute_newly_flatrate_update(
            prev_providers=None,
            new_providers={"flatrate": ["U-NEXT"]},
            prev_newly_providers=[],
            prev_newly_at=None,
            now_dt=now,
        )
        self.assertEqual(provs, [])
        self.assertIsNone(at)

        # 2. 新しく U-NEXT が見放題に追加 -> 検知＆現在時刻セット
        provs, at = fetch_and_sync.compute_newly_flatrate_update(
            prev_providers={"flatrate": ["Netflix"]},
            new_providers={"flatrate": ["Netflix", "U-NEXT"]},
            prev_newly_providers=[],
            prev_newly_at=None,
            now_dt=now,
        )
        self.assertEqual(provs, ["U-NEXT"])
        self.assertEqual(at, now.isoformat())

        # 3. 10日後（14日未満）: 追加なしでも現在 flatrate に残っていれば保持
        ten_days_later = now + timedelta(days=10)
        provs2, at2 = fetch_and_sync.compute_newly_flatrate_update(
            prev_providers={"flatrate": ["Netflix", "U-NEXT"]},
            new_providers={"flatrate": ["Netflix", "U-NEXT"]},
            prev_newly_providers=provs,
            prev_newly_at=at,
            now_dt=ten_days_later,
        )
        self.assertEqual(provs2, ["U-NEXT"])
        self.assertEqual(at2, at)

        # 4. 10日後にさらに Amazon Prime Video が追加 -> 既存のU-NEXTとマージしてタイムスタンプ更新
        provs3, at3 = fetch_and_sync.compute_newly_flatrate_update(
            prev_providers={"flatrate": ["Netflix", "U-NEXT"]},
            new_providers={"flatrate": ["Netflix", "U-NEXT", "Amazon Prime Video"]},
            prev_newly_providers=provs2,
            prev_newly_at=at2,
            now_dt=ten_days_later,
        )
        self.assertEqual(provs3, ["U-NEXT", "Amazon Prime Video"])
        self.assertEqual(at3, ten_days_later.isoformat())

        # 5. 14日経過（>= 14日）で自動クリア
        fourteen_days_later = ten_days_later + timedelta(days=14)
        provs4, at4 = fetch_and_sync.compute_newly_flatrate_update(
            prev_providers={"flatrate": ["Netflix", "U-NEXT", "Amazon Prime Video"]},
            new_providers={"flatrate": ["Netflix", "U-NEXT", "Amazon Prime Video"]},
            prev_newly_providers=provs3,
            prev_newly_at=at3,
            now_dt=fourteen_days_later,
        )
        self.assertEqual(provs4, [])
        self.assertIsNone(at4)

    def test_select_year_candidates_rescues_cult_and_jp_discover(self) -> None:
        # 枠1(35本)＋枠2(15本)の50本が別作品で埋まっていても、
        # jp_discover_ids の日本映画と imdb_votes>=80,000 & rating>=7.0 の人気カルト候補がプールから漏れないこと
        items = [
            {
                "imdb_id": f"tt_top_{i:02d}",
                "release_year": 2016,
                "title_en": f"Top Film {i}",
                "genres": ["Drama"],
                "imdb_rating": 8.5 - i * 0.01,
                "imdb_votes": 60000 + i * 100,
            }
            for i in range(40)
        ]
        items.extend(
            [
                {
                    "imdb_id": f"tt_pop_{i:02d}",
                    "release_year": 2016,
                    "title_en": f"Popular Genre {i}",
                    "genres": ["Action", "Comedy"],
                    "imdb_rating": 6.9,
                    "imdb_votes": 300000 + i * 1000,
                }
                for i in range(18)
            ]
        )
        # 投票数控えめ(35,000票)・IMDb 6.8 の日本映画（TMDB Discoverで確保）
        items.append(
            {
                "imdb_id": "tt4262980",
                "release_year": 2016,
                "title_en": "Shin Godzilla",
                "genres": ["Action", "Drama", "Sci-Fi"],
                "imdb_rating": 6.8,
                "imdb_votes": 35000,
            }
        )
        # 80,000票以上 & IMDb 7.9 の人気カルト（ジャンル条件が枠2に漏れても枠4で救済）
        items.append(
            {
                "imdb_id": "tt_cult_drama",
                "release_year": 2016,
                "title_en": "Cult Favorite",
                "genres": ["Biography", "Music"],
                "imdb_rating": 7.9,
                "imdb_votes": 225000,
            }
        )

        selected = fetch_and_sync.select_year_candidates_multibucket(
            items,
            year=2016,
            candidates_per_year=60,
            current_year=2026,
            jp_discover_ids={"tt4262980"},
        )
        selected_ids = {m["imdb_id"] for m in selected}
        self.assertIn("tt4262980", selected_ids)
        self.assertIn("tt_cult_drama", selected_ids)
        jp_entry = next(m for m in selected if m["imdb_id"] == "tt4262980")
        self.assertEqual(jp_entry.get("original_language"), "ja")

    def test_download_imdb_candidates_relaxes_jp_votes_to_5000(self) -> None:
        ratings_tsv = (
            "tconst\taverageRating\tnumVotes\n"
            "tt_jp_6000\t7.2\t6000\n"
            "tt_other_6000\t8.5\t6000\n"
        )
        basics_tsv = (
            "tconst\ttitleType\tprimaryTitle\toriginalTitle\tisAdult\tstartYear\tendYear\truntimeMinutes\tgenres\n"
            "tt_jp_6000\tmovie\tJP Indie\tJP Indie\t0\t2016\t\\N\t110\tDrama\n"
            "tt_other_6000\tmovie\tOther Indie\tOther Indie\t0\t2016\t\\N\t110\tDrama\n"
        )
        with patch.object(
            fetch_and_sync.requests,
            "get",
            side_effect=[_make_gz_response(ratings_tsv), _make_gz_response(basics_tsv)],
        ):
            res = fetch_and_sync.download_imdb_candidates(
                2016,
                2016,
                jp_discover_by_year={2016: {"tt_jp_6000"}},
            )
        ids = {m["imdb_id"] for m in res[2016]}
        self.assertIn("tt_jp_6000", ids)
        self.assertNotIn("tt_other_6000", ids)

    def test_preserve_ai_enrichment_omits_v7_null_columns(self) -> None:
        records = [
            {
                "imdb_id": "tt0001",
                "title_ja": "作品A",
                "ai_summary": None,
                "ai_catchcopy": None,
                "vibe_scores": None,
                "similar_ids": None,
                "map_x": None,
                "map_y": None,
                "mood_tags": ["自動タグ"],
            }
        ]
        merged = fetch_and_sync.preserve_ai_enrichment(records, [])
        for col in ("ai_catchcopy", "vibe_scores", "similar_ids", "map_x", "map_y"):
            self.assertNotIn(col, merged[0])


if __name__ == "__main__":
    unittest.main()
