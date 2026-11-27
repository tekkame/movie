"""
local_llm_enrich.py の純粋関数・LM Studio互換・Supabaseターゲット取得の単体テスト
"""

from __future__ import annotations

import unittest
from unittest.mock import MagicMock, patch

from pipeline import local_llm_enrich as lle


class TestLocalLlmEnrich(unittest.TestCase):
    def test_strip_thinking_and_fences(self) -> None:
        raw = '<think>\n長い思考ログ...\n{"dummy": 1}\n</think>\n```json\n{"ai_catchcopy": "静寂が叫ぶ夜。"}\n```'
        cleaned = lle.strip_thinking_and_fences(raw)
        self.assertEqual(cleaned, '{"ai_catchcopy": "静寂が叫ぶ夜。"}')

        # 閉じタグが欠けたケースでもJSON開始位置まで安全に除去できること
        unclosed = '<think>途中まで考えた\n{"ai_catchcopy": "光と影の迷宮"}'
        parsed = lle.extract_json_object(unclosed)
        self.assertEqual(parsed["ai_catchcopy"], "光と影の迷宮")

    def test_extract_json_object_with_surrounding_prose(self) -> None:
        raw = (
            "承知しました。以下がJSONです。\n"
            '{"ai_catchcopy": "運命を撃ち抜く120分", "vibe_scores": {"pace": 5}}\n'
            "以上です。"
        )
        parsed = lle.extract_json_object(raw)
        self.assertEqual(parsed["ai_catchcopy"], "運命を撃ち抜く120分")
        self.assertEqual(parsed["vibe_scores"]["pace"], 5)

    def test_clamp_vibe_score_and_validate_vibe_scores(self) -> None:
        self.assertEqual(lle.clamp_vibe_score(0), 1)
        self.assertEqual(lle.clamp_vibe_score(-3), 1)
        self.assertEqual(lle.clamp_vibe_score(6), 5)
        self.assertEqual(lle.clamp_vibe_score(4.6), 5)
        self.assertEqual(lle.clamp_vibe_score(2.2), 2)
        self.assertEqual(lle.clamp_vibe_score("4/5"), 4)
        self.assertEqual(lle.clamp_vibe_score(None, default=3), 3)
        self.assertEqual(lle.clamp_vibe_score(True, default=3), 3)
        self.assertEqual(lle.clamp_vibe_score("invalid", default=2), 2)

        scores = lle.validate_vibe_scores(
            {"pace": 9, "mind": "1", "immersion": 4.4, "heaviness": 0}
        )
        self.assertEqual(
            scores,
            {"pace": 5, "mind": 1, "immersion": 4, "heaviness": 1, "family": 3},
        )

    def test_needs_japanese_overview(self) -> None:
        self.assertTrue(lle.needs_japanese_overview(None))
        self.assertTrue(lle.needs_japanese_overview(""))
        self.assertTrue(
            lle.needs_japanese_overview(
                "A thief who steals corporate secrets through dream-sharing technology."
            )
        )
        self.assertFalse(
            lle.needs_japanese_overview(
                "人の夢に潜入してアイデアを盗む特殊スパイが、最後の危険な任務に挑む。"
            )
        )

    def test_validate_catchcopy_and_summary(self) -> None:
        self.assertEqual(lle.validate_catchcopy("「闇が微笑む、衝撃の127分」"), "闇が微笑む、衝撃の127分")
        self.assertIsNone(lle.validate_catchcopy("   "))
        long_copy = "あ" * 60
        self.assertEqual(len(lle.validate_catchcopy(long_copy, max_len=40) or ""), 40)

        self.assertIsNone(lle.validate_summary("短い"))
        valid_sum = "音響と緊張感の緩急が凄まじく、一瞬も目が離せない傑作サスペンス。"
        self.assertEqual(lle.validate_summary(valid_sum), valid_sum)

    def test_validate_enrichment_payload_preserves_good_japanese_overview(self) -> None:
        movie_with_ja = {
            "imdb_id": "tt0114369",
            "genres": ["Crime", "Mystery", "Thriller"],
            "overview_ja": "七つの大罪になぞらえた連続猟奇事件を二人の刑事が追う。",
            "ai_summary": None,
        }
        parsed = {
            "ai_catchcopy": "雨が暴く、人間の七つの罪。",
            "ai_summary": "降り続く雨と退廃的な映像が観る者を支配する暗黒サスペンスの金字塔。二人の刑事の対比が物語に圧倒的な緊張感を生む。",
            "mood_tags": ["重厚サスペンス", "頭脳戦・ミステリー", "存在しないタグ"],
            "vibe_scores": {"pace": 4, "mind": 5, "immersion": 5, "heaviness": 6, "family": 0},
            "overview_ja": "上書きされてはいけないあらすじテキスト。",
        }
        res = lle.validate_enrichment_payload(parsed, movie_with_ja)
        self.assertEqual(res["ai_catchcopy"], "雨が暴く、人間の七つの罪。")
        self.assertEqual(
            res["vibe_scores"],
            {"pace": 4, "mind": 5, "immersion": 5, "heaviness": 5, "family": 1},
        )
        self.assertGreaterEqual(len(res["mood_tags"]), 3)
        self.assertLessEqual(len(res["mood_tags"]), 4)
        self.assertNotIn("overview_ja", res)

        # 英語あらすじの場合は日本語overview_jaが採用される
        movie_with_en = {
            **movie_with_ja,
            "overview_ja": "Two detectives hunt a serial killer who uses the seven deadly sins.",
        }
        res_en = lle.validate_enrichment_payload(parsed, movie_with_en)
        self.assertEqual(res_en["overview_ja"], "上書きされてはいけないあらすじテキスト。")

    def test_generate_enrichment_never_sends_response_format(self) -> None:
        mock_resp = MagicMock()
        mock_resp.raise_for_status = MagicMock()
        mock_resp.json.return_value = {
            "choices": [
                {
                    "message": {
                        "content": (
                            "<think>reasoning</think>\n```json\n"
                            '{"ai_catchcopy": "言語が未来を書き換える", '
                            '"ai_summary": "静謐な映像美と知的なSF設定が融合し、物語の構造そのものが深い感動へと繋がる傑作。", '
                            '"mood_tags": ["SF・世界観没入", "余韻ドラマ", "批評家絶賛"], '
                            '"vibe_scores": {"pace": 2, "mind": 5, "immersion": 5, "heaviness": 3, "family": 4}, '
                            '"overview_ja": ""}'
                            "\n```"
                        )
                    }
                }
            ]
        }

        movie = {
            "imdb_id": "tt2543164",
            "title_ja": "メッセージ",
            "title_en": "Arrival",
            "release_year": 2016,
            "genres": ["Sci-Fi", "Drama"],
            "overview_ja": "宇宙船の言語解読に挑む言語学者の物語。",
        }
        with patch.object(lle.requests, "post", return_value=mock_resp) as mock_post:
            result = lle.generate_enrichment("http://localhost:1234/v1", "qwen2.5", "lm-studio", movie)

        sent_json = mock_post.call_args.kwargs["json"]
        self.assertNotIn("response_format", sent_json)
        self.assertEqual(result["ai_catchcopy"], "言語が未来を書き換える")
        self.assertEqual(result["vibe_scores"]["mind"], 5)

    def test_fetch_target_movies_queries_missing_catchcopy_or_vibe_scores(self) -> None:
        mock_resp = MagicMock()
        mock_resp.raise_for_status = MagicMock()
        mock_resp.json.return_value = [
            {"imdb_id": "tt1", "ai_summary": "existing", "ai_catchcopy": None, "vibe_scores": None}
        ]

        with patch.object(lle.requests, "get", return_value=mock_resp) as mock_get:
            rows = lle.fetch_target_movies("https://demo.supabase.co", {"apikey": "k"}, limit=10)

        self.assertEqual(len(rows), 1)
        params = mock_get.call_args.kwargs["params"]
        self.assertEqual(params["or"], "(ai_catchcopy.is.null,vibe_scores.is.null)")


if __name__ == "__main__":
    unittest.main()
