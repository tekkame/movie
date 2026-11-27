"""
build_constellation.py のコサイン類似度・PCA・座標正規化の単体テスト
"""

from __future__ import annotations

import unittest
from unittest.mock import MagicMock, patch

import numpy as np

from pipeline import build_constellation as bc


class TestBuildConstellation(unittest.TestCase):
    def test_compute_top_k_similar_ids_excludes_self_and_ranks_by_cosine(self) -> None:
        ids = ["ttA", "ttB", "ttC", "ttD"]
        embeddings = np.array(
            [
                [1.0, 0.0, 0.0],   # ttA
                [0.95, 0.05, 0.0], # ttB (closest to ttA)
                [0.5, 0.5, 0.0],   # ttC
                [-1.0, 0.0, 0.0],  # ttD (opposite)
            ],
            dtype=np.float64,
        )
        res = bc.compute_top_k_similar_ids(ids, embeddings, top_k=2)
        self.assertEqual(len(res), 4)
        self.assertEqual(res[0], ["ttB", "ttC"])
        self.assertNotIn("ttA", res[0])
        self.assertEqual(res[3][0], "ttC")
        self.assertNotIn("ttD", res[3])

    def test_compute_top_k_similar_ids_handles_small_or_zero_vectors(self) -> None:
        res_single = bc.compute_top_k_similar_ids(["tt1"], np.array([[1.0, 2.0]]), top_k=5)
        self.assertEqual(res_single, [[]])

        res_zero = bc.compute_top_k_similar_ids(
            ["tt1", "tt2"],
            np.array([[0.0, 0.0], [1.0, 0.0]]),
            top_k=5,
        )
        self.assertEqual(res_zero[0], ["tt2"])
        self.assertEqual(res_zero[1], ["tt1"])

    def test_project_pca_2d_and_normalize_and_repel_bounds(self) -> None:
        # 完全に重なった点を含む入力でも [5.0, 95.0] の範囲内に収まり、近接点が分離されること
        embeddings = np.array(
            [
                [1.0, 0.0, 0.0, 0.0],
                [1.0, 0.0, 0.0, 0.0],  # tt2 == tt1 (overlap test)
                [0.0, 1.0, 0.0, 0.0],
                [-1.0, -1.0, 0.5, 0.0],
                [0.2, -0.8, 0.9, 0.1],
            ],
            dtype=np.float64,
        )
        pca = bc.project_pca_2d(embeddings)
        self.assertEqual(pca.shape, (5, 2))

        coords = bc.normalize_and_repel_coords(pca, low=5.0, high=95.0, min_dist=2.0, iterations=30)
        self.assertEqual(coords.shape, (5, 2))
        self.assertTrue(np.all(coords >= 5.0))
        self.assertTrue(np.all(coords <= 95.0))
        dist_01 = float(np.linalg.norm(coords[0] - coords[1]))
        self.assertGreater(dist_01, 0.05)

    def test_build_constellation_payloads_end_to_end(self) -> None:
        movies = [
            {"imdb_id": f"tt{i}", "title_ja": f"映画{i}", "genres": ["Drama"]}
            for i in range(7)
        ]
        rng = np.random.default_rng(42)
        embs = rng.normal(size=(7, 16))
        payloads = bc.build_constellation_payloads(movies, embs, top_k=5)
        self.assertEqual(len(payloads), 7)
        for idx, p in enumerate(payloads):
            self.assertEqual(p["imdb_id"], f"tt{idx}")
            self.assertEqual(len(p["similar_ids"]), 5)
            self.assertNotIn(p["imdb_id"], p["similar_ids"])
            self.assertGreaterEqual(p["map_x"], 5.0)
            self.assertLessEqual(p["map_x"], 95.0)
            self.assertGreaterEqual(p["map_y"], 5.0)
            self.assertLessEqual(p["map_y"], 95.0)

    def test_fetch_all_movies_paginates_past_1000(self) -> None:
        page1 = [{"imdb_id": f"tt{i:04d}"} for i in range(1000)]
        page2 = [{"imdb_id": "tt1000"}, {"imdb_id": "tt1001"}]

        r1 = MagicMock()
        r1.raise_for_status = MagicMock()
        r1.json.return_value = page1
        r2 = MagicMock()
        r2.raise_for_status = MagicMock()
        r2.json.return_value = page2

        with patch.object(bc.requests, "get", side_effect=[r1, r2]) as mock_get:
            rows = bc.fetch_all_movies("https://demo.supabase.co", {"apikey": "k"}, page_size=1000)

        self.assertEqual(len(rows), 1002)
        self.assertEqual(mock_get.call_count, 2)


if __name__ == "__main__":
    unittest.main()
