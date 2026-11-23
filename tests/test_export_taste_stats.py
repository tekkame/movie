"""
export_taste_stats.py の集計・Markdown生成・Supabaseクライアント正規化の単体テスト
"""

from __future__ import annotations

import sys
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "pipeline"))

import export_taste_stats


class TestExportTasteStats(unittest.TestCase):
    def test_normalize_url_and_build_headers(self) -> None:
        self.assertEqual(
            export_taste_stats.normalize_supabase_url("https://demo.supabase.co/rest/v1/"),
            "https://demo.supabase.co",
        )
        self.assertEqual(
            export_taste_stats.normalize_supabase_url("https://demo.supabase.co/rest/v1"),
            "https://demo.supabase.co",
        )
        sb_headers = export_taste_stats.build_supabase_headers("sb_secret_xyz")
        self.assertEqual(sb_headers["apikey"], "sb_secret_xyz")
        self.assertNotIn("Authorization", sb_headers)

        jwt_headers = export_taste_stats.build_supabase_headers("eyJabc.def")
        self.assertEqual(jwt_headers["apikey"], "eyJabc.def")
        self.assertEqual(jwt_headers["Authorization"], "Bearer eyJabc.def")

    def test_fetch_table_all_paginates(self) -> None:
        page1 = [{"imdb_id": f"tt{i}"} for i in range(2)]
        page2 = [{"imdb_id": "tt2"}]

        resp1 = MagicMock()
        resp1.raise_for_status = MagicMock()
        resp1.json.return_value = page1

        resp2 = MagicMock()
        resp2.raise_for_status = MagicMock()
        resp2.json.return_value = page2

        with patch.object(export_taste_stats.requests, "get", side_effect=[resp1, resp2]) as mock_get:
            rows = export_taste_stats.fetch_table_all(
                "https://demo.supabase.co/rest/v1/",
                "sb_secret_xyz",
                "movies",
                page_size=2,
            )

        self.assertEqual(len(rows), 3)
        self.assertEqual(mock_get.call_count, 2)
        first_call_url = mock_get.call_args_list[0].args[0]
        self.assertEqual(first_call_url, "https://demo.supabase.co/rest/v1/movies")

    def test_aggregate_taste_stats_and_render_markdown(self) -> None:
        movies = [
            {
                "imdb_id": "tt001",
                "title_ja": "パラサイト",
                "title_en": "Parasite",
                "release_year": 2019,
                "runtime_minutes": 132,
                "genres": ["Drama", "Thriller"],
                "director": "Bong Joon Ho",
                "composite_score": 93.0,
            },
            {
                "imdb_id": "tt002",
                "title_ja": "セブン",
                "title_en": "Se7en",
                "release_year": 1995,
                "runtime_minutes": 127,
                "genres": ["Crime", "Thriller"],
                "director": "David Fincher",
                "composite_score": 82.0,
            },
            {
                "imdb_id": "tt003",
                "title_ja": "メッセージ",
                "title_en": "Arrival",
                "release_year": 2016,
                "runtime_minutes": 116,
                "genres": ["Sci-Fi", "Drama"],
                "director": "Denis Villeneuve",
                "composite_score": 85.4,
            },
            {
                "imdb_id": "tt004",
                "title_ja": "長すぎた作品",
                "title_en": "Long Movie",
                "release_year": 2020,
                "runtime_minutes": 180,
                "genres": ["Drama"],
                "director": "Bong Joon Ho",
                "composite_score": 78.0,
            },
        ]
        watch_rows = [
            {
                "imdb_id": "tt001",
                "status": "watched",
                "my_rating": 5,
                "impression_tags": ["脚本・構成", "没入感・テンポ"],
                "memo": "構成が完璧",
            },
            {
                "imdb_id": "tt002",
                "status": "watched",
                "my_rating": 4,
                "impression_tags": ["映像・演出", "脚本・構成"],
                "memo": None,
            },
            {
                "imdb_id": "tt003",
                "status": "watchlist",
                "my_rating": None,
                "impression_tags": [],
                "memo": "週末に観る",
            },
            {
                "imdb_id": "tt004",
                "status": "watched",
                "my_rating": 2,
                "impression_tags": ["長い・退屈"],
                "memo": "",
            },
        ]

        stats = export_taste_stats.aggregate_taste_stats(movies, watch_rows)

        self.assertEqual(stats["summary"]["total_movies_in_db"], 4)
        self.assertEqual(stats["summary"]["watched_count"], 3)
        self.assertEqual(stats["summary"]["rated_count"], 3)
        self.assertEqual(stats["summary"]["watchlist_count"], 1)
        self.assertEqual(stats["summary"]["avg_rating"], 3.67)

        # ★別集計
        dist_map = {r["stars"]: r for r in stats["rating_distribution"]}
        self.assertEqual(dist_map[5]["count"], 1)
        self.assertEqual(dist_map[4]["count"], 1)
        self.assertEqual(dist_map[2]["count"], 1)
        self.assertEqual(dist_map[1]["count"], 0)
        self.assertAlmostEqual(dist_map[5]["percentage"], 33.3)

        # ジャンル別（Thriller は tt001(5) と tt002(4) -> 4.5）
        genre_map = {r["genre"]: r for r in stats["by_genre"]}
        self.assertEqual(genre_map["Thriller"]["watch_count"], 2)
        self.assertEqual(genre_map["Thriller"]["avg_rating"], 4.5)
        self.assertEqual(genre_map["Drama"]["watch_count"], 2)
        self.assertEqual(genre_map["Drama"]["avg_rating"], 3.5)

        # 印象チップ別（脚本・構成 は 5 と 4 -> 4.5）
        tag_map = {r["tag"]: r for r in stats["by_impression_tag"]}
        self.assertEqual(tag_map["脚本・構成"]["watch_count"], 2)
        self.assertEqual(tag_map["脚本・構成"]["avg_rating"], 4.5)
        self.assertEqual(tag_map["長い・退屈"]["avg_rating"], 2.0)

        # 監督別（Bong Joon Ho は 5 と 2 -> 3.5）
        dir_map = {r["director"]: r for r in stats["by_director"]}
        self.assertEqual(dir_map["Bong Joon Ho"]["watch_count"], 2)
        self.assertEqual(dir_map["Bong Joon Ho"]["avg_rating"], 3.5)
        self.assertEqual(dir_map["David Fincher"]["avg_rating"], 4.0)

        # Markdown出力
        md = export_taste_stats.render_markdown_report(stats)
        self.assertIn("# Core Cinema Archive - 視聴・評価傾向レポート", md)
        self.assertIn("視聴済み（または評価済み）: 3本", md)
        self.assertIn("★5 | 1件 | 33.3%", md)
        self.assertIn("| Thriller | 2 | 2 | 4.50 |", md)
        self.assertIn("| 脚本・構成 | 2 | 2 | 4.50 |", md)
        self.assertIn("パラサイト (2019)", md)
        self.assertIn("メッセージ (2016)", md)
        self.assertIn("## 🏆 マイランキング（1位〜）", md)
        self.assertIn("マイランキングはまだありません", md)

    def test_my_ranking_aggregation_and_markdown(self) -> None:
        movies = [
            {
                "imdb_id": "tt001",
                "title_ja": "パラサイト",
                "title_en": "Parasite",
                "release_year": 2019,
                "genres": ["Drama", "Thriller"],
                "director": "Bong Joon Ho",
                "composite_score": 93.0,
            },
            {
                "imdb_id": "tt002",
                "title_ja": "セブン",
                "title_en": "Se7en",
                "release_year": 1995,
                "genres": ["Crime", "Thriller"],
                "director": "David Fincher",
                "composite_score": 82.0,
            },
            {
                "imdb_id": "tt003",
                "title_ja": "メッセージ",
                "title_en": "Arrival",
                "release_year": 2016,
                "genres": ["Sci-Fi", "Drama"],
                "director": "Denis Villeneuve",
                "composite_score": 85.4,
            },
        ]
        watch_rows = [
            {
                "imdb_id": "tt002",
                "status": "watched",
                "my_rating": 5,
                "personal_rank": 2,
                "impression_tags": ["映像・演出"],
                "memo": "雨が不穏",
            },
            {
                "imdb_id": "tt001",
                "status": "watched",
                "my_rating": 5,
                "personal_rank": 1,
                "impression_tags": ["脚本・構成", "没入感・テンポ"],
                "memo": "",
            },
            {
                "imdb_id": "tt003",
                "status": "watched",
                "my_rating": 4,
                "personal_rank": None,
                "impression_tags": [],
                "memo": "",
            },
        ]

        stats = export_taste_stats.aggregate_taste_stats(movies, watch_rows)
        self.assertEqual(stats["summary"]["ranked_count"], 2)
        self.assertEqual([r["imdb_id"] for r in stats["ranked_items"]], ["tt001", "tt002"])

        md = export_taste_stats.render_markdown_report(stats)
        self.assertIn("マイランキング登録済み: 2本", md)
        self.assertIn("## 🏆 マイランキング（1位〜）", md)
        idx_1 = md.index("- 1位: 『パラサイト』 (2019 / Bong Joon Ho) ★5 [脚本・構成・没入感・テンポ]")
        idx_2 = md.index("- 2位: 『セブン』 (1995 / David Fincher) ★5 [映像・演出] | メモ: 雨が不穏")
        self.assertLess(idx_1, idx_2)


if __name__ == "__main__":
    unittest.main()
