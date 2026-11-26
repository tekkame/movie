"""
mood_tagger.py の単体テスト
"""

from __future__ import annotations

import unittest

from pipeline.mood_tagger import MOOD_TAG_CATALOG, generate_mood_tags


class TestMoodTagger(unittest.TestCase):
    def _assert_valid_tags(self, tags: list[str]) -> None:
        self.assertGreaterEqual(len(tags), 2)
        self.assertLessEqual(len(tags), 4)
        self.assertEqual(len(tags), len(set(tags)))
        for t in tags:
            self.assertIn(t, MOOD_TAG_CATALOG)

    def test_catalog_size_within_target_range(self) -> None:
        self.assertEqual(len(MOOD_TAG_CATALOG), 18)

    def test_scifi_thriller_oscar_long_film(self) -> None:
        movie = {
            "title_ja": "オッペンハイマー",
            "genres": ["Biography", "Drama", "History"],
            "director": "Christopher Nolan",
            "awards_text": "Won 7 Oscars. 335 wins & 352 nominations total",
            "runtime_minutes": 180,
            "original_language": "en",
            "country": "United States, United Kingdom",
            "imdb_rating": 8.3,
            "imdb_votes": 800000,
            "metascore": 90,
            "rt_score": 93,
            "overview_ja": "原子爆弾の開発を主導した科学者の苦悩と政治的裁判を描く歴史大作。",
        }
        tags = generate_mood_tags(movie)
        self._assert_valid_tags(tags)
        self.assertIn("社会派・実話", tags)
        self.assertTrue(any(t in tags for t in ("オスカー受賞", "大作じっくり", "批評家絶賛")))

    def test_korean_thriller_black_comedy_parasite(self) -> None:
        movie = {
            "title_ja": "パラサイト 半地下の家族",
            "genres": ["Comedy", "Drama", "Thriller"],
            "director": "Bong Joon Ho",
            "awards_text": "Won 4 Oscars. Another 300 wins",
            "runtime_minutes": 132,
            "original_language": "ko",
            "country": "South Korea",
            "imdb_rating": 8.5,
            "imdb_votes": 980000,
            "metascore": 96,
            "rt_score": 99,
            "overview_ja": "貧しい家族が裕福な一家へ潜入する社会風刺のブラックコメディ。",
        }
        tags = generate_mood_tags(movie)
        self._assert_valid_tags(tags)
        self.assertIn("アジア傑作", tags)
        self.assertTrue(any(t in tags for t in ("重厚サスペンス", "痛快・ブラックコメディ")))

    def test_anime_short_or_japanese(self) -> None:
        movie = {
            "title_ja": "パーフェクトブルー",
            "genres": ["Animation", "Crime", "Mystery"],
            "director": "Satoshi Kon",
            "awards_text": "3 wins",
            "runtime_minutes": 81,
            "original_language": "ja",
            "country": "Japan",
            "imdb_rating": 8.0,
            "imdb_votes": 110000,
            "metascore": 67,
            "rt_score": 83,
            "overview_ja": "アイドルから女優へ転身した少女が謎のストーカーと狂気に追い詰められる心理サスペンス。",
        }
        tags = generate_mood_tags(movie)
        self._assert_valid_tags(tags)
        self.assertIn("本格アニメ", tags)
        self.assertTrue(any(t in tags for t in ("サクッと短尺", "アジア傑作", "頭脳戦・ミステリー")))

    def test_horror_mystery_film(self) -> None:
        movie = {
            "title_ja": "ヘレディタリー/継承",
            "genres": ["Drama", "Horror", "Mystery"],
            "director": "Ari Aster",
            "awards_text": "45 wins & 110 nominations",
            "runtime_minutes": 127,
            "original_language": "en",
            "country": "United States",
            "imdb_rating": 7.3,
            "imdb_votes": 400000,
            "metascore": 87,
            "rt_score": 90,
            "overview_ja": "祖母の死をきっかけに家族を襲う呪いと恐怖の儀式。",
        }
        tags = generate_mood_tags(movie)
        self._assert_valid_tags(tags)
        self.assertIn("不穏・ホラー", tags)

    def test_european_music_film(self) -> None:
        movie = {
            "title_ja": "ONCE ダブリンの街角で",
            "genres": ["Drama", "Music", "Musical"],
            "director": "John Carney",
            "awards_text": "Won 1 Oscar.",
            "runtime_minutes": 86,
            "original_language": "en",
            "country": "Ireland, United States",
            "imdb_rating": 7.8,
            "imdb_votes": 120000,
            "metascore": 88,
            "rt_score": 97,
            "overview_ja": "音楽と歌を通して心を通わせる二人の物語。",
        }
        tags = generate_mood_tags(movie)
        self._assert_valid_tags(tags)
        self.assertIn("音楽・ミュージカル", tags)

    def test_european_non_english_cinema(self) -> None:
        movie = {
            "title_ja": "アメリ",
            "genres": ["Comedy", "Romance"],
            "director": "Jean-Pierre Jeunet",
            "awards_text": "Nominated for 5 Oscars.",
            "runtime_minutes": 122,
            "original_language": "fr",
            "country": "France, Germany",
            "imdb_rating": 8.3,
            "imdb_votes": 800000,
            "metascore": 70,
            "rt_score": 90,
            "overview_ja": "パリの街で周囲を少し幸せにする少女の日常。",
        }
        tags = generate_mood_tags(movie)
        self._assert_valid_tags(tags)
        self.assertIn("欧州シネマ", tags)

    def test_scifi_action_overview_keywords(self) -> None:
        movie = {
            "title_ja": "マッドマックス 怒りのデス・ロード",
            "genres": ["Action", "Adventure", "Sci-Fi"],
            "director": "George Miller",
            "awards_text": "Won 6 Oscars.",
            "runtime_minutes": 120,
            "original_language": "en",
            "country": "Australia, United States",
            "imdb_rating": 8.1,
            "imdb_votes": 1100000,
            "metascore": 90,
            "rt_score": 97,
            "overview_ja": "荒廃した未来世界で壮絶な戦闘と逃亡のアクションが繰り広げられる。",
        }
        tags = generate_mood_tags(movie)
        self._assert_valid_tags(tags)
        self.assertIn("SF・世界観没入", tags)
        self.assertIn("爽快アクション", tags)

    def test_sparse_metadata_edge_case_still_returns_2_to_4_tags(self) -> None:
        tags = generate_mood_tags({})
        self._assert_valid_tags(tags)

        tags_partial = generate_mood_tags({"genres": [], "runtime_minutes": None, "overview_ja": None})
        self._assert_valid_tags(tags_partial)


if __name__ == "__main__":
    unittest.main()
