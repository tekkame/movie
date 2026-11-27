"""
Core Cinema Archive - 映画星座マップ（Embedding類似度 & 2D座標）生成スクリプト

LM Studio / OpenAI互換 `/embeddings` エンドポイントを使用して、
Supabase `public.movies` の全作品の埋め込みベクトルを取得し、
  1. コサイン類似度上位5件の `similar_ids`
  2. numpy のみの PCA（2次元射影）＋ 5.0〜95.0 正規化 ＋ 軽い反発(de-overlap) による `map_x`, `map_y`
を計算して Supabase に保存します。

使い方例（LM Studio）:
  export LOCAL_LLM_BASE_URL="http://localhost:1234/v1"
  export LOCAL_EMBED_MODEL="text-embedding-nomic-embed-text-v1.5"
  python pipeline/build_constellation.py
"""

from __future__ import annotations

import argparse
import os
import sys
from typing import Any, Mapping, Sequence

import numpy as np
import requests
from dotenv import load_dotenv

DEFAULT_EMBED_MODEL = "text-embedding-nomic-embed-text-v1.5"
SELECT_FIELDS = (
    "imdb_id,title_ja,title_en,director,genres,mood_tags,"
    "ai_catchcopy,ai_summary,overview_ja"
)


def normalize_supabase_url(url: str) -> str:
    cleaned = (url or "").strip().rstrip("/")
    if cleaned.endswith("/rest/v1"):
        cleaned = cleaned[: -len("/rest/v1")].rstrip("/")
    return cleaned


def build_supabase_headers(api_key: str, extra: dict[str, str] | None = None) -> dict[str, str]:
    headers: dict[str, str] = {
        "apikey": api_key,
        "Content-Type": "application/json",
    }
    if not api_key.startswith("sb_"):
        headers["Authorization"] = f"Bearer {api_key}"
    if extra:
        headers.update(extra)
    return headers


def build_embedding_text(movie: Mapping[str, Any]) -> str:
    """
    映画1本分の埋め込み入力テキストを組み立てる純粋関数。
    """
    title_ja = str(movie.get("title_ja") or "").strip()
    title_en = str(movie.get("title_en") or "").strip()
    director = str(movie.get("director") or "").strip()
    genres = ", ".join(str(g).strip() for g in (movie.get("genres") or []) if str(g).strip())
    mood_tags = ", ".join(str(t).strip() for t in (movie.get("mood_tags") or []) if str(t).strip())
    catchcopy = str(movie.get("ai_catchcopy") or "").strip()
    summary = str(movie.get("ai_summary") or "").strip()
    overview = str(movie.get("overview_ja") or "").strip()

    parts = [
        f"Title: {title_ja} ({title_en})" if title_ja or title_en else "",
        f"Director: {director}" if director else "",
        f"Genres: {genres}" if genres else "",
        f"Mood: {mood_tags}" if mood_tags else "",
        f"Catchcopy: {catchcopy}" if catchcopy else "",
        f"Review: {summary}" if summary else "",
        f"Overview: {overview}" if overview else "",
    ]
    text = "\n".join(p for p in parts if p)
    return text or str(movie.get("imdb_id") or "movie")


def compute_top_k_similar_ids(
    imdb_ids: Sequence[str],
    embeddings: np.ndarray,
    top_k: int = 5,
) -> list[list[str]]:
    """
    各映画の埋め込みベクトルからコサイン類似度上位 top_k 件の imdb_id リストを返す純粋関数（自己除外）。
    """
    n = len(imdb_ids)
    if n == 0:
        return []
    mat = np.asarray(embeddings, dtype=np.float64)
    if mat.ndim != 2 or mat.shape[0] != n:
        raise ValueError("embeddings shape does not match imdb_ids length")
    if n == 1 or top_k <= 0:
        return [[] for _ in range(n)]

    norms = np.linalg.norm(mat, axis=1, keepdims=True)
    safe_norms = np.where(norms > 1e-12, norms, 1.0)
    unit = mat / safe_norms
    # ノルム0の行は0ベクトルにする
    zero_mask = (norms[:, 0] <= 1e-12)
    if np.any(zero_mask):
        unit[zero_mask] = 0.0

    sim_matrix = unit @ unit.T
    np.fill_diagonal(sim_matrix, -np.inf)

    k = min(top_k, n - 1)
    result: list[list[str]] = []
    for i in range(n):
        row = sim_matrix[i]
        # 高スコア順（同点時はインデックス順で決定的）
        order = np.argsort(-row, kind="mergesort")[:k]
        result.append([str(imdb_ids[int(j)]) for j in order])
    return result


def project_pca_2d(embeddings: np.ndarray) -> np.ndarray:
    """
    numpy の SVD を用いた決定的な 2D PCA 射影（(N, D) -> (N, 2)）。
    """
    mat = np.asarray(embeddings, dtype=np.float64)
    if mat.ndim != 2:
        raise ValueError("embeddings must be a 2D array")
    n, d = mat.shape
    if n == 0:
        return np.zeros((0, 2), dtype=np.float64)
    if n == 1:
        return np.array([[50.0, 50.0]], dtype=np.float64)

    centered = mat - np.mean(mat, axis=0, keepdims=True)
    if d == 0 or np.allclose(centered, 0.0):
        return np.zeros((n, 2), dtype=np.float64)

    u, s, _vt = np.linalg.svd(centered, full_matrices=False)
    coords = np.zeros((n, 2), dtype=np.float64)
    dims = min(2, u.shape[1], len(s))
    for k in range(dims):
        col = u[:, k] * s[k]
        # 符号の不定性を決定的（最大絶対値要素が正）に固定
        max_idx = int(np.argmax(np.abs(col)))
        if col[max_idx] < 0:
            col = -col
        coords[:, k] = col
    return coords


def normalize_and_repel_coords(
    coords: np.ndarray,
    low: float = 5.0,
    high: float = 95.0,
    min_dist: float = 1.6,
    iterations: int = 24,
) -> np.ndarray:
    """
    2次元座標を [low, high] に正規化し、近接点の重なりを軽く反発させて見やすく配置する純粋関数。
    """
    pts = np.asarray(coords, dtype=np.float64).copy()
    if pts.ndim != 2 or pts.shape[1] != 2:
        raise ValueError("coords must have shape (N, 2)")
    n = pts.shape[0]
    if n == 0:
        return pts
    mid = (low + high) * 0.5
    if n == 1:
        return np.array([[mid, mid]], dtype=np.float64)

    def _rescale(arr: np.ndarray) -> np.ndarray:
        out = arr.copy()
        for axis in (0, 1):
            col = out[:, axis]
            c_min = float(np.min(col))
            c_max = float(np.max(col))
            span = c_max - c_min
            if span <= 1e-12:
                out[:, axis] = mid
            else:
                out[:, axis] = low + (col - c_min) / span * (high - low)
        return out

    pts = _rescale(pts)

    # 軽い反発ステップ（O(N^2) でも N~1000 で数ミリ秒）
    for _ in range(max(0, iterations)):
        diff = pts[:, None, :] - pts[None, :, :]  # (N, N, 2)
        dist_sq = np.sum(diff ** 2, axis=-1)
        np.fill_diagonal(dist_sq, np.inf)
        dist = np.sqrt(dist_sq)

        close_mask = dist < min_dist
        if not np.any(close_mask):
            break

        # 完全一致する点には微小な決定論的オフセットを与える
        zero_mask = close_mask & (dist <= 1e-9)
        if np.any(zero_mask):
            ii, jj = np.where(zero_mask)
            for idx_i, idx_j in zip(ii.tolist(), jj.tolist()):
                if idx_i < idx_j:
                    angle = ((idx_i * 7 + idx_j * 13) % 360) * (np.pi / 180.0)
                    diff[idx_i, idx_j, 0] = np.cos(angle) * 1e-3
                    diff[idx_i, idx_j, 1] = np.sin(angle) * 1e-3
                    diff[idx_j, idx_i, 0] = -diff[idx_i, idx_j, 0]
                    diff[idx_j, idx_i, 1] = -diff[idx_i, idx_j, 1]
                    dist[idx_i, idx_j] = 1e-3
                    dist[idx_j, idx_i] = 1e-3

        safe_dist = np.where(np.isfinite(dist) & (dist > 1e-6), dist, 1.0)
        overlap = np.where(close_mask, (min_dist - dist) / safe_dist, 0.0)
        push = np.sum(diff * overlap[:, :, None], axis=1) * 0.25
        pts = np.clip(pts + push, low, high)

    pts = _rescale(pts)
    return np.clip(pts, low, high)


def fetch_all_movies(sb_url: str, headers: dict[str, str], page_size: int = 1000) -> list[dict[str, Any]]:
    """
    Supabase から全映画をページネーションして取得する（1000件超対応）。
    """
    rows: list[dict[str, Any]] = []
    offset = 0
    while True:
        req_headers = {
            **headers,
            "Range-Unit": "items",
            "Range": f"{offset}-{offset + page_size - 1}",
        }
        resp = requests.get(
            f"{sb_url}/rest/v1/movies",
            headers=req_headers,
            params={
                "select": SELECT_FIELDS,
                "order": "release_year.desc,year_rank.asc",
            },
            timeout=30,
        )
        resp.raise_for_status()
        batch = resp.json()
        if not batch:
            break
        rows.extend(batch)
        if len(batch) < page_size:
            break
        offset += len(batch)
    return rows


def fetch_embeddings_batched(
    llm_url: str,
    embed_model: str,
    api_key: str,
    texts: Sequence[str],
    batch_size: int = 32,
) -> np.ndarray:
    """
    OpenAI互換 `{LOCAL_LLM_BASE_URL}/embeddings` をバッチ呼び出しして (N, D) 配列を返す。
    """
    vectors: list[list[float]] = []
    endpoint = f"{llm_url.rstrip('/')}/embeddings"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    total = len(texts)
    for start in range(0, total, batch_size):
        chunk = list(texts[start : start + batch_size])
        resp = requests.post(
            endpoint,
            headers=headers,
            json={
                "model": embed_model,
                "input": chunk,
            },
            timeout=120,
        )
        resp.raise_for_status()
        data = resp.json().get("data") or []
        # OpenAI互換仕様では index 順とは限らないため index でソート
        data_sorted = sorted(data, key=lambda item: int(item.get("index", 0)))
        if len(data_sorted) != len(chunk):
            raise RuntimeError(
                f"Embedding count mismatch: expected {len(chunk)}, got {len(data_sorted)}"
            )
        for item in data_sorted:
            vectors.append([float(x) for x in item["embedding"]])
        print(f"  -> Embeddings 取得進捗: {min(start + len(chunk), total)}/{total}件", flush=True)

    return np.asarray(vectors, dtype=np.float64)


def save_constellation_updates(
    sb_url: str,
    headers: dict[str, str],
    updates: Sequence[dict[str, Any]],
) -> int:
    """
    映画ごとに `similar_ids`, `map_x`, `map_y` を PATCH で保存する（全行一様キーで PGRST102 回避）。
    """
    saved = 0
    with requests.Session() as session:
        session.headers.update(headers)
        for idx, row in enumerate(updates, start=1):
            imdb_id = row["imdb_id"]
            payload = {
                "similar_ids": list(row["similar_ids"]),
                "map_x": round(float(row["map_x"]), 4),
                "map_y": round(float(row["map_y"]), 4),
            }
            resp = session.patch(
                f"{sb_url}/rest/v1/movies",
                params={"imdb_id": f"eq.{imdb_id}"},
                json=payload,
                timeout=30,
            )
            resp.raise_for_status()
            saved += 1
            if saved % 100 == 0 or saved == len(updates):
                print(f"  -> Supabase 保存進捗: {saved}/{len(updates)}件", flush=True)
    return saved


def build_constellation_payloads(
    movies: Sequence[Mapping[str, Any]],
    embeddings: np.ndarray,
    top_k: int = 5,
) -> list[dict[str, Any]]:
    """
    映画一覧と埋め込み行列から、保存用ペイロード（imdb_id, similar_ids, map_x, map_y）を組み立てる純粋関数。
    """
    if not movies:
        return []
    imdb_ids = [str(m["imdb_id"]) for m in movies]
    similar_lists = compute_top_k_similar_ids(imdb_ids, embeddings, top_k=top_k)
    projected = project_pca_2d(embeddings)
    coords = normalize_and_repel_coords(projected, low=5.0, high=95.0)

    payloads: list[dict[str, Any]] = []
    for i, imdb_id in enumerate(imdb_ids):
        payloads.append(
            {
                "imdb_id": imdb_id,
                "similar_ids": similar_lists[i],
                "map_x": round(float(coords[i, 0]), 4),
                "map_y": round(float(coords[i, 1]), 4),
            }
        )
    return payloads


def main() -> None:
    load_dotenv()
    parser = argparse.ArgumentParser(description="映画のEmbeddingから類似作品IDと2D星座マップ座標を生成・保存")
    parser.add_argument("--batch-size", type=int, default=32, help="Embedding API 1回のバッチ件数")
    parser.add_argument("--top-k", type=int, default=5, help="保存する類似映画の件数")
    parser.add_argument("--dry-run", action="store_true", help="Supabaseへ保存せず先頭数件のみ表示")
    args = parser.parse_args()

    sb_url = normalize_supabase_url(os.getenv("SUPABASE_URL", ""))
    sb_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()
    llm_url = os.getenv("LOCAL_LLM_BASE_URL", "http://localhost:11434/v1")
    embed_model = os.getenv("LOCAL_EMBED_MODEL", DEFAULT_EMBED_MODEL).strip() or DEFAULT_EMBED_MODEL
    llm_key = os.getenv("LOCAL_LLM_API_KEY", "ollama")

    if not sb_url or not sb_key:
        raise SystemExit("エラー: SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を設定してください。")

    headers = build_supabase_headers(sb_key)
    movies = fetch_all_movies(sb_url, headers)
    print(f"対象映画取得完了: {len(movies)}件（Embeddingモデル: {embed_model}）", flush=True)
    if not movies:
        return

    texts = [build_embedding_text(m) for m in movies]
    embeddings = fetch_embeddings_batched(
        llm_url=llm_url,
        embed_model=embed_model,
        api_key=llm_key,
        texts=texts,
        batch_size=max(1, args.batch_size),
    )

    payloads = build_constellation_payloads(movies, embeddings, top_k=max(1, args.top_k))

    if args.dry_run:
        for item in payloads[:5]:
            print(f"[DRY-RUN] {item}", flush=True)
        print(f"[DRY-RUN] 合計 {len(payloads)}件の星座座標・類似IDを計算しました。", flush=True)
        return

    saved = save_constellation_updates(sb_url, headers, payloads)
    print(f"星座マップの同期が完了しました: {saved}件", flush=True)


if __name__ == "__main__":
    if sys.stdout.encoding != "utf-8":
        sys.stdout.reconfigure(encoding="utf-8")
    main()
