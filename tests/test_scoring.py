"""
scoring.py の単体テスト（サンドボックス内で実行・検証済み）
"""

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "pipeline"))

from scoring import (
    compute_composite_score,
    compute_cult_score,
    compute_jp_live_score,
    compute_jp_score,
    is_animation_movie,
    is_indian_movie,
    is_japanese_movie,
    parse_awards_bonus,
    select_yearly_top20,
    select_yearly_top25,
    select_yearly_top26,
)


class TestScoringAndSelection(unittest.TestCase):
    def test_parse_awards_bonus(self) -> None:
        self.assertEqual(parse_awards_bonus("Won 4 Oscars. 38 wins & 72 nominations total"), 10.0)
        self.assertEqual(parse_awards_bonus("Nominated for 3 Oscars. 12 wins total"), 5.0)
        self.assertEqual(parse_awards_bonus("20 wins & 45 nominations"), 4.0)
        self.assertEqual(parse_awards_bonus("N/A"), 0.0)
        self.assertEqual(parse_awards_bonus(None), 0.0)

    def test_compute_composite_score_full_and_fallback(self) -> None:
        # 例: 批評家高評価(Meta 84, RT 98 -> avg 91) + IMDb 8.0 + Oscar受賞(+10)
        score = compute_composite_score(imdb_rating=8.0, metascore=84, rt_score=98, awards_bonus=10.0)
        # 91*0.5 + 80*0.4 + 10 = 45.5 + 32.0 + 10 = 87.5
        self.assertEqual(score, 87.5)

        # 批評家スコア欠損時のフォールバック
        fallback = compute_composite_score(imdb_rating=8.2, metascore=None, rt_score=None, awards_bonus=5.0)
        self.assertGreater(fallback, 70.0)
        self.assertLessEqual(fallback, 100.0)

    def test_hybrid_top20_prevents_drama_monopoly(self) -> None:
        # ドラマ18本が高スコアを占めていても、ホラー・SF・非英語圏・犯罪枠が確実に選出されることを検証
        candidates = []
        for i in range(18):
            candidates.append(
                {
                    "imdb_id": f"tt_drama_{i:02d}",
                    "release_year": 2025,
                    "title_en": f"Prestige Drama {i}",
                    "genres": ["Drama"],
                    "original_language": "en",
                    "imdb_rating": 8.0 - i * 0.02,
                    "imdb_votes": 50000,
                    "metascore": 86 - i,
                    "rt_score": 92 - i,
                    "awards_text": "Nominated for 2 Oscars.",
                }
            )

        # ドラマ勢より僅差でスコアが下だが、各ジャンルの頂点となる作品を追加
        special_picks = [
            {
                "imdb_id": "tt_horror_01",
                "release_year": 2025,
                "title_en": "Genre Masterpiece Horror",
                "genres": ["Horror", "Thriller"],
                "original_language": "en",
                "imdb_rating": 7.6,
                "imdb_votes": 80000,
                "metascore": 78,
                "rt_score": 94,
                "awards_text": "5 wins & 12 nominations",
            },
            {
                "imdb_id": "tt_scifi_01",
                "release_year": 2025,
                "title_en": "Genre Masterpiece Sci-Fi",
                "genres": ["Sci-Fi", "Action"],
                "original_language": "en",
                "imdb_rating": 7.7,
                "imdb_votes": 90000,
                "metascore": 76,
                "rt_score": 90,
                "awards_text": "3 wins",
            },
            {
                "imdb_id": "tt_jp_01",
                "release_year": 2025,
                "title_en": "Japanese Hidden Gem",
                "genres": ["Drama", "Mystery"],
                "original_language": "ja",
                "imdb_rating": 7.7,
                "imdb_votes": 20000,
                "metascore": 77,
                "rt_score": 91,
                "awards_text": "8 wins",
            },
            {
                "imdb_id": "tt_crime_01",
                "release_year": 2025,
                "title_en": "Crime Thriller Gem",
                "genres": ["Crime", "Comedy"],
                "original_language": "en",
                "imdb_rating": 7.5,
                "imdb_votes": 35000,
                "metascore": 75,
                "rt_score": 88,
                "awards_text": "2 wins",
            },
        ]
        candidates.extend(special_picks)

        selected = select_yearly_top20(candidates, target_count=20, top_n=12)
        self.assertEqual(len(selected), 20)

        top12 = [m for m in selected if m["selection_slot"] == "top12"]
        genre_picks = [m for m in selected if m["selection_slot"] == "genre_pick"]
        self.assertEqual(len(top12), 12)
        self.assertEqual(len(genre_picks), 8)

        selected_ids = {m["imdb_id"] for m in selected}
        for sp in special_picks:
            self.assertIn(sp["imdb_id"], selected_ids)

        # year_rank が 1..20 で連番になっていること
        self.assertEqual([m["year_rank"] for m in selected], list(range(1, 21)))

    def test_compute_composite_score_backward_compat_and_local_penalty(self) -> None:
        # imdb_votes 未指定時は従来通り (80 * 0.90) * 0.97 = 69.84 を返す（既存互換性）
        self.assertEqual(
            compute_composite_score(imdb_rating=8.0, metascore=None, rt_score=None, awards_bonus=0.0),
            69.84,
        )

        # 批評家スコアなし & 投票数8万未満のローカル偏重作品には信頼度ペナルティが適用される
        local_only = compute_composite_score(
            imdb_rating=8.8, metascore=None, rt_score=None, awards_bonus=0.0, imdb_votes=12000
        )
        # 世界的話題作（Sinners 相当: IMDb 7.5, Meta 84, RT 97, 41万票）が確実に上回ること
        global_hit = compute_composite_score(
            imdb_rating=7.5, metascore=84, rt_score=97, awards_bonus=0.0, imdb_votes=414298
        )
        self.assertLess(local_only, 65.0)
        self.assertGreater(global_hit, 75.0)
        self.assertGreater(global_hit, local_only)

    def test_indian_movie_cap_max_2_per_year_and_manual_pick_priority(self) -> None:
        # インド映画が10本高スコアで並んでも、1年の中で最大2本までに制限され、
        # スコアが低めでも is_manual_pick=True の作品は必ず選出されること
        self.assertTrue(is_indian_movie({"country": "India", "original_language": "en"}))
        self.assertTrue(is_indian_movie({"country": "", "original_language": "hi"}))
        self.assertTrue(is_indian_movie({"country": "", "language": "Telugu, Hindi"}))
        self.assertFalse(is_indian_movie({"country": "United States", "original_language": "en"}))

        candidates = []
        for i in range(10):
            candidates.append(
                {
                    "imdb_id": f"tt_india_{i:02d}",
                    "release_year": 2026,
                    "title_en": f"Indian Hit {i}",
                    "genres": ["Action", "Drama"],
                    "country": "India" if i % 2 == 0 else "",
                    "original_language": "hi" if i % 3 == 0 else "ta",
                    "imdb_rating": 8.9 - i * 0.05,
                    "imdb_votes": 120000,
                    "metascore": 88 - i,
                    "rt_score": 95 - i,
                    "awards_text": "10 wins",
                }
            )
        for i in range(22):
            candidates.append(
                {
                    "imdb_id": f"tt_global_{i:02d}",
                    "release_year": 2026,
                    "title_en": f"Global Film {i}",
                    "genres": ["Drama", "Thriller"] if i % 2 == 0 else ["Sci-Fi", "Action"],
                    "country": "United States",
                    "original_language": "en",
                    "imdb_rating": 7.4 - i * 0.02,
                    "imdb_votes": 90000,
                    "metascore": 76 - (i % 6),
                    "rt_score": 84 - (i % 6),
                    "awards_text": "2 wins",
                }
            )
        # スコアは低めだが manual_picks.txt 指定作品
        candidates.append(
            {
                "imdb_id": "tt1060277",
                "release_year": 2026,
                "title_en": "Manual Pick Film",
                "genres": ["Horror", "Sci-Fi"],
                "country": "United States",
                "original_language": "en",
                "imdb_rating": 7.0,
                "imdb_votes": 430000,
                "metascore": 64,
                "rt_score": 78,
                "awards_text": "10 wins",
                "is_manual_pick": True,
            }
        )

        selected = select_yearly_top20(candidates, target_count=20, top_n=12, max_indian_per_year=2)
        self.assertEqual(len(selected), 20)
        indian_selected = [m for m in selected if is_indian_movie(m)]
        self.assertEqual(len(indian_selected), 2)
        selected_ids = {m["imdb_id"] for m in selected}
        self.assertIn("tt1060277", selected_ids)

    def _build_base_non_jp_candidates(self, year: int = 1988) -> list[dict]:
        candidates = []
        # 1. 総合TOP12＋既存ジャンル8枠を埋める高Metascore作品25本（すべて英語・フランス語圏）
        for i in range(25):
            genres = ["Drama"]
            if i in (12, 13):
                genres = ["Horror", "Thriller"]
            elif i in (14, 15):
                genres = ["Sci-Fi", "Action"]
            elif i in (18, 19):
                genres = ["Crime", "Comedy"]
            candidates.append(
                {
                    "imdb_id": f"tt_prestige_{i:02d}",
                    "release_year": year,
                    "title_en": f"Prestige Film {i}",
                    "genres": genres,
                    "original_language": "fr" if i in (16, 17) else "en",
                    "country": "France" if i in (16, 17) else "United States",
                    "imdb_rating": 8.1 - i * 0.01,
                    "imdb_votes": 28000,
                    "metascore": 94 - i * 0.5,
                    "rt_score": 96 - i * 0.5,
                    "awards_text": "Won 1 Oscar." if i < 20 else "3 wins",
                }
            )

        # 2. 観客カルト枠（3本）＋ 対象外1本
        candidates.extend(
            [
                {
                    "imdb_id": "tt0080455",
                    "release_year": year,
                    "title_en": "The Blues Brothers Cult",
                    "genres": ["Action", "Comedy", "Music"],
                    "original_language": "en",
                    "country": "United States",
                    "imdb_rating": 7.9,
                    "imdb_votes": 225000,
                    "metascore": 60,
                    "rt_score": 73,
                    "awards_text": "",
                },
                {
                    "imdb_id": "tt_cult_02",
                    "release_year": year,
                    "title_en": "Cult Classic 2",
                    "genres": ["Comedy"],
                    "original_language": "en",
                    "country": "United States",
                    "imdb_rating": 7.6,
                    "imdb_votes": 180000,
                    "metascore": 52,
                    "rt_score": 68,
                    "awards_text": "",
                },
                {
                    "imdb_id": "tt_cult_03",
                    "release_year": year,
                    "title_en": "Cult Classic 3",
                    "genres": ["Action"],
                    "original_language": "en",
                    "country": "United States",
                    "imdb_rating": 7.5,
                    "imdb_votes": 120000,
                    "metascore": 48,
                    "rt_score": 65,
                    "awards_text": "",
                },
                {
                    "imdb_id": "tt_low_vote_85",
                    "release_year": year,
                    "title_en": "Low Vote Non-Cult",
                    "genres": ["Drama"],
                    "original_language": "en",
                    "country": "United States",
                    "imdb_rating": 8.5,
                    "imdb_votes": 15000,
                    "metascore": 40,
                    "rt_score": 50,
                    "awards_text": "",
                },
            ]
        )
        return candidates

    def test_select_yearly_top26_splits_jp_live_and_anime_slots(self) -> None:
        # 26本選出（TOP12 + 既存ジャンル8 + 観客カルト3 + 邦画実写2 + 日本アニメ1）を検証
        self.assertTrue(is_japanese_movie({"original_language": "ja", "country": ""}))
        self.assertTrue(is_japanese_movie({"original_language": "", "country": "Japan, United States"}))
        self.assertFalse(is_japanese_movie({"original_language": "en", "country": "United States, Japan"}))
        self.assertFalse(is_japanese_movie({"language": "English", "country": "United States, Japan"}))
        self.assertFalse(is_japanese_movie({"original_language": "en", "country": "United States"}))
        self.assertTrue(is_animation_movie({"genres": ["Animation", "Adventure"]}))
        self.assertFalse(is_animation_movie({"genres": ["Drama", "Music"]}))

        candidates = self._build_base_non_jp_candidates(year=2001)
        # アニメ豊作年でも、邦画実写2枠はアニメに食われず確保され、アニメは1枠のみ選出される
        candidates.extend(
            [
                {
                    "imdb_id": "tt_jp_anime_01",
                    "release_year": 2001,
                    "title_en": "Hit Anime 1",
                    "genres": ["Animation", "Adventure", "Fantasy"],
                    "original_language": "ja",
                    "country": "Japan",
                    "imdb_rating": 8.2,
                    "imdb_votes": 25000,
                    "metascore": 70,
                    "rt_score": 88,
                    "awards_text": "",
                },
                {
                    "imdb_id": "tt_jp_anime_02",
                    "release_year": 2001,
                    "title_en": "Hit Anime 2",
                    "genres": ["Animation", "Drama"],
                    "original_language": "ja",
                    "country": "Japan",
                    "imdb_rating": 8.0,
                    "imdb_votes": 22000,
                    "metascore": 68,
                    "rt_score": 85,
                    "awards_text": "",
                },
                {
                    "imdb_id": "tt_jp_anime_03",
                    "release_year": 2001,
                    "title_en": "Hit Anime 3",
                    "genres": ["Animation", "Action"],
                    "original_language": "ja",
                    "country": "Japan",
                    "imdb_rating": 7.9,
                    "imdb_votes": 18000,
                    "metascore": 65,
                    "rt_score": 80,
                    "awards_text": "",
                },
                {
                    "imdb_id": "tt_jp_live_01",
                    "release_year": 2001,
                    "title_en": "All About Lily Chou-Chou",
                    "genres": ["Drama", "Music"],
                    "original_language": "ja",
                    "country": "Japan",
                    "imdb_rating": 7.5,
                    "imdb_votes": 14000,
                    "metascore": 66,
                    "rt_score": 68,
                    "awards_text": "",
                },
                {
                    "imdb_id": "tt_jp_live_02",
                    "release_year": 2001,
                    "title_en": "JP Live Masterpiece 2",
                    "genres": ["Drama", "Crime"],
                    "original_language": "ja",
                    "country": "Japan",
                    "imdb_rating": 7.4,
                    "imdb_votes": 8500,
                    "metascore": None,
                    "rt_score": None,
                    "awards_text": "",
                },
            ]
        )

        selected = select_yearly_top26(candidates, target_count=26, top_n=12, max_indian_per_year=2)
        self.assertEqual(len(selected), 26)
        self.assertEqual([m["year_rank"] for m in selected], list(range(1, 27)))

        top12 = [m for m in selected if m["selection_slot"] == "top12"]
        cult_selected = [m for m in selected if m["selection_category"] == "観客カルト枠"]
        jp_live_selected = [m for m in selected if m["selection_category"] == "邦画実写枠"]
        jp_anime_selected = [m for m in selected if m["selection_category"] == "日本アニメ枠"]
        self.assertEqual(len(top12), 12)
        self.assertEqual(len(cult_selected), 3)
        self.assertEqual(len(jp_live_selected), 2)
        self.assertEqual(len(jp_anime_selected), 1)

        self.assertEqual({m["imdb_id"] for m in cult_selected}, {"tt0080455", "tt_cult_02", "tt_cult_03"})
        self.assertNotIn("tt_low_vote_85", {m["imdb_id"] for m in selected})
        self.assertEqual({m["imdb_id"] for m in jp_live_selected}, {"tt_jp_live_01", "tt_jp_live_02"})
        self.assertEqual({m["imdb_id"] for m in jp_anime_selected}, {"tt_jp_anime_01"})

        # スコア関数の単調性確認
        self.assertGreater(compute_cult_score(7.9, 225000), compute_cult_score(7.5, 120000))
        self.assertGreater(compute_jp_score(7.2, 12000), compute_jp_score(6.8, 35000) - 5.0)

    def test_select_yearly_top26_picks_1500_vote_jp_live_action_via_rating_score(self) -> None:
        # 英語圏での投票数が 1,500〜3,000 票規模（スワロウテイル型）でも、
        # 評価が高ければ投票数の多い凡作を抑えて邦画実写枠2本に選出されることを検証
        candidates = self._build_base_non_jp_candidates(year=1996)
        candidates.extend(
            [
                {
                    "imdb_id": "tt0117797",
                    "release_year": 1996,
                    "title_en": "Swallowtail Butterfly",
                    "genres": ["Crime", "Drama", "Music"],
                    "original_language": "ja",
                    "country": "Japan",
                    "imdb_rating": 7.4,
                    "imdb_votes": 2800,
                    "metascore": None,
                    "rt_score": None,
                    "awards_text": "",
                },
                {
                    "imdb_id": "tt_jp_1500_gem",
                    "release_year": 1996,
                    "title_en": "1500 Vote JP Gem",
                    "genres": ["Drama"],
                    "original_language": "ja",
                    "country": "Japan",
                    "imdb_rating": 7.5,
                    "imdb_votes": 1550,
                    "metascore": None,
                    "rt_score": None,
                    "awards_text": "",
                },
                {
                    "imdb_id": "tt_jp_highvote_mediocre",
                    "release_year": 1996,
                    "title_en": "High Vote Mediocre JP Action",
                    "genres": ["Action"],
                    "original_language": "ja",
                    "country": "Japan",
                    "imdb_rating": 6.4,
                    "imdb_votes": 45000,
                    "metascore": 50,
                    "rt_score": 55,
                    "awards_text": "",
                },
                {
                    "imdb_id": "tt_jp_anime_1996",
                    "release_year": 1996,
                    "title_en": "JP Anime 1996",
                    "genres": ["Animation", "Sci-Fi"],
                    "original_language": "ja",
                    "country": "Japan",
                    "imdb_rating": 7.6,
                    "imdb_votes": 40000,
                    "metascore": 70,
                    "rt_score": 82,
                    "awards_text": "",
                },
            ]
        )

        selected = select_yearly_top25(candidates, target_count=26, top_n=12, max_indian_per_year=2)
        jp_live = [m for m in selected if m["selection_category"] == "邦画実写枠"]
        jp_anime = [m for m in selected if m["selection_category"] == "日本アニメ枠"]

        self.assertEqual({m["imdb_id"] for m in jp_live}, {"tt0117797", "tt_jp_1500_gem"})
        self.assertEqual({m["imdb_id"] for m in jp_anime}, {"tt_jp_anime_1996"})
        self.assertGreater(compute_jp_live_score(7.4, 2800), compute_jp_live_score(6.4, 45000))


if __name__ == "__main__":
    unittest.main()
