"""
scoring.py の単体テスト（サンドボックス内で実行・検証済み）
"""

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "pipeline"))

from scoring import compute_composite_score, parse_awards_bonus, select_yearly_top20


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


if __name__ == "__main__":
    unittest.main()
