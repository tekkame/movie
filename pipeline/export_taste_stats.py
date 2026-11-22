"""
Core Cinema Archive - 蓄積視聴・評価データ集計スクリプト (Antigravity / AI分析用)

Supabase の `user_watch_status` と `movies` テーブルを取得・結合し、
以下の集計結果を Markdown 形式で出力します。
  - 評価済み・視聴済み・観たい映画のサマリー＆一覧
  - ★別集計（★5〜★1の件数・割合）
  - ジャンル別平均★・視聴本数
  - 印象チップ（impression_tags）別の出現回数・平均★
  - 監督別平均★・視聴本数

使い方:
  python pipeline/export_taste_stats.py
  python pipeline/export_taste_stats.py --output taste_stats.md
"""

from __future__ import annotations

import argparse
import os
import sys
from collections import defaultdict
from pathlib import Path
from typing import Any

import requests
from dotenv import load_dotenv


def normalize_supabase_url(url: str) -> str:
    """末尾のスラッシュや誤って付与された /rest/v1 サフィックスを取り除きベースURLを返す"""
    cleaned = (url or "").strip().rstrip("/")
    if cleaned.endswith("/rest/v1"):
        cleaned = cleaned[: -len("/rest/v1")].rstrip("/")
    return cleaned


def build_supabase_headers(api_key: str, extra: dict[str, str] | None = None) -> dict[str, str]:
    """従来JWTキーと新形式(sb_secret_ / sb_publishable_)の両方に対応するヘッダーを組み立てる"""
    headers: dict[str, str] = {
        "apikey": api_key,
        "Content-Type": "application/json",
    }
    if not api_key.startswith("sb_"):
        headers["Authorization"] = f"Bearer {api_key}"
    if extra:
        headers.update(extra)
    return headers


def fetch_table_all(
    base_url: str,
    api_key: str,
    table: str,
    select: str = "*",
    page_size: int = 1000,
) -> list[dict[str, Any]]:
    """PostgREST からページネーション付きで全件取得する"""
    rest_base = normalize_supabase_url(base_url) + "/rest/v1"
    base_headers = build_supabase_headers(api_key)
    rows: list[dict[str, Any]] = []
    offset = 0

    while True:
        headers = {
            **base_headers,
            "Range-Unit": "items",
            "Range": f"{offset}-{offset + page_size - 1}",
        }
        resp = requests.get(
            f"{rest_base}/{table}",
            params={"select": select},
            headers=headers,
            timeout=30,
        )
        resp.raise_for_status()
        batch = resp.json()
        rows.extend(batch)
        if len(batch) < page_size:
            break
        offset += page_size

    return rows


def aggregate_taste_stats(
    movies: list[dict[str, Any]],
    watch_rows: list[dict[str, Any]],
) -> dict[str, Any]:
    """movies と user_watch_status を結合し、各種傾向を集計する"""
    movie_map = {m["imdb_id"]: m for m in movies if m.get("imdb_id")}

    watched_items: list[dict[str, Any]] = []
    watchlist_items: list[dict[str, Any]] = []
    rated_items: list[dict[str, Any]] = []

    rating_counts: dict[int, int] = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}
    genre_acc: dict[str, dict[str, Any]] = defaultdict(lambda: {"count": 0, "rated_count": 0, "rating_sum": 0})
    tag_acc: dict[str, dict[str, Any]] = defaultdict(lambda: {"count": 0, "rated_count": 0, "rating_sum": 0})
    director_acc: dict[str, dict[str, Any]] = defaultdict(lambda: {"count": 0, "rated_count": 0, "rating_sum": 0})

    for row in watch_rows:
        imdb_id = row.get("imdb_id")
        movie = movie_map.get(imdb_id)
        if not movie:
            continue

        status = row.get("status") or "unwatched"
        raw_rating = row.get("my_rating")
        rating = int(raw_rating) if raw_rating is not None else None
        tags = [str(t).strip() for t in (row.get("impression_tags") or []) if str(t).strip()]
        memo = (row.get("memo") or "").strip()

        entry = {
            "imdb_id": imdb_id,
            "title_ja": movie.get("title_ja") or movie.get("title_en") or imdb_id,
            "title_en": movie.get("title_en") or "",
            "release_year": movie.get("release_year"),
            "runtime_minutes": movie.get("runtime_minutes"),
            "genres": list(movie.get("genres") or []),
            "director": movie.get("director") or "",
            "composite_score": movie.get("composite_score"),
            "status": status,
            "my_rating": rating,
            "impression_tags": tags,
            "memo": memo,
            "updated_at": row.get("updated_at") or "",
        }

        if status == "watched" or rating is not None:
            watched_items.append(entry)
        elif status == "watchlist":
            watchlist_items.append(entry)

        if rating is not None and 1 <= rating <= 5:
            rated_items.append(entry)
            rating_counts[rating] += 1

        # ジャンル・印象チップ・監督集計は視聴済みまたは評価済み作品を対象
        if status == "watched" or rating is not None:
            for g in entry["genres"]:
                genre_acc[g]["count"] += 1
                if rating is not None:
                    genre_acc[g]["rated_count"] += 1
                    genre_acc[g]["rating_sum"] += rating

            for t in tags:
                tag_acc[t]["count"] += 1
                if rating is not None:
                    tag_acc[t]["rated_count"] += 1
                    tag_acc[t]["rating_sum"] += rating

            if entry["director"]:
                directors = [d.strip() for d in str(entry["director"]).split(",") if d.strip()]
                for d in directors:
                    director_acc[d]["count"] += 1
                    if rating is not None:
                        director_acc[d]["rated_count"] += 1
                        director_acc[d]["rating_sum"] += rating

    watched_items.sort(
        key=lambda x: (x["my_rating"] if x["my_rating"] is not None else -1, x["release_year"] or 0),
        reverse=True,
    )
    watchlist_items.sort(key=lambda x: (x["release_year"] or 0, x["composite_score"] or 0), reverse=True)

    total_rated = len(rated_items)
    avg_rating = round(sum(r["my_rating"] for r in rated_items) / total_rated, 2) if total_rated > 0 else None

    rating_distribution = []
    for stars in (5, 4, 3, 2, 1):
        cnt = rating_counts[stars]
        pct = round((cnt / total_rated) * 100, 1) if total_rated > 0 else 0.0
        rating_distribution.append({"stars": stars, "count": cnt, "percentage": pct})

    def _finalize_bucket(acc: dict[str, dict[str, Any]], key_name: str) -> list[dict[str, Any]]:
        results: list[dict[str, Any]] = []
        for k, v in acc.items():
            avg = round(v["rating_sum"] / v["rated_count"], 2) if v["rated_count"] > 0 else None
            results.append(
                {
                    key_name: k,
                    "watch_count": v["count"],
                    "rated_count": v["rated_count"],
                    "avg_rating": avg,
                }
            )
        results.sort(
            key=lambda x: (x["avg_rating"] if x["avg_rating"] is not None else -1.0, x["watch_count"]),
            reverse=True,
        )
        return results

    return {
        "summary": {
            "total_movies_in_db": len(movies),
            "watched_count": len(watched_items),
            "rated_count": total_rated,
            "watchlist_count": len(watchlist_items),
            "avg_rating": avg_rating,
        },
        "rating_distribution": rating_distribution,
        "by_genre": _finalize_bucket(genre_acc, "genre"),
        "by_impression_tag": _finalize_bucket(tag_acc, "tag"),
        "by_director": _finalize_bucket(director_acc, "director"),
        "watched_items": watched_items,
        "watchlist_items": watchlist_items,
    }


def render_markdown_report(stats: dict[str, Any]) -> str:
    """集計結果辞書を Markdown レポート文字列へ整形する"""
    s = stats["summary"]
    avg_str = f"★{s['avg_rating']:.2f}" if s["avg_rating"] is not None else "-"

    lines: list[str] = [
        "# Core Cinema Archive - 視聴・評価傾向レポート",
        "",
        "## サマリー",
        f"- DB収録作品数: {s['total_movies_in_db']}本",
        f"- 視聴済み（または評価済み）: {s['watched_count']}本",
        f"- ★評価済み: {s['rated_count']}本（平均: {avg_str}）",
        f"- 観たいリスト: {s['watchlist_count']}本",
        "",
        "## ★別集計",
        "| 評価 | 件数 | 割合 |",
        "| --- | ---: | ---: |",
    ]

    for row in stats["rating_distribution"]:
        lines.append(f"| ★{row['stars']} | {row['count']}件 | {row['percentage']:.1f}% |")

    lines.extend(["", "## ジャンル別平均★・視聴本数"])
    if stats["by_genre"]:
        lines.extend(["| ジャンル | 視聴本数 | 評価件数 | 平均★ |", "| --- | ---: | ---: | ---: |"])
        for row in stats["by_genre"]:
            avg = f"{row['avg_rating']:.2f}" if row["avg_rating"] is not None else "-"
            lines.append(f"| {row['genre']} | {row['watch_count']} | {row['rated_count']} | {avg} |")
    else:
        lines.append("- データなし")

    lines.extend(["", "## 印象チップ別集計"])
    if stats["by_impression_tag"]:
        lines.extend(["| 印象チップ | 出現回数 | 評価件数 | 平均★ |", "| --- | ---: | ---: | ---: |"])
        for row in stats["by_impression_tag"]:
            avg = f"{row['avg_rating']:.2f}" if row["avg_rating"] is not None else "-"
            lines.append(f"| {row['tag']} | {row['watch_count']} | {row['rated_count']} | {avg} |")
    else:
        lines.append("- データなし")

    lines.extend(["", "## 監督別平均★・視聴本数"])
    if stats["by_director"]:
        lines.extend(["| 監督 | 視聴本数 | 評価件数 | 平均★ |", "| --- | ---: | ---: | ---: |"])
        for row in stats["by_director"]:
            avg = f"{row['avg_rating']:.2f}" if row["avg_rating"] is not None else "-"
            lines.append(f"| {row['director']} | {row['watch_count']} | {row['rated_count']} | {avg} |")
    else:
        lines.append("- データなし")

    lines.extend(["", "## 視聴済み・評価済み一覧"])
    if stats["watched_items"]:
        for item in stats["watched_items"]:
            rating_str = f"★{item['my_rating']}" if item["my_rating"] is not None else "未評価"
            genres_str = ", ".join(item["genres"]) if item["genres"] else "不明"
            tags_str = f" | 印象: {'・'.join(item['impression_tags'])}" if item["impression_tags"] else ""
            memo_str = f" | メモ: {item['memo']}" if item["memo"] else ""
            lines.append(
                f"- {item['title_ja']} ({item['release_year']}) / 監督: {item['director'] or '不明'} / {genres_str} / {rating_str}{tags_str}{memo_str}"
            )
    else:
        lines.append("- 視聴済み・評価済み作品はまだありません")

    lines.extend(["", "## 観たいリスト一覧"])
    if stats["watchlist_items"]:
        for item in stats["watchlist_items"]:
            genres_str = ", ".join(item["genres"]) if item["genres"] else "不明"
            memo_str = f" | メモ: {item['memo']}" if item["memo"] else ""
            lines.append(
                f"- {item['title_ja']} ({item['release_year']}) / 監督: {item['director'] or '不明'} / {genres_str}{memo_str}"
            )
    else:
        lines.append("- 観たいリストはまだありません")

    return "\n".join(lines) + "\n"


def main() -> None:
    load_dotenv()
    parser = argparse.ArgumentParser(description="Core Cinema Archive 視聴・評価傾向集計スクリプト")
    parser.add_argument("--output", "-o", type=str, default=None, help="Markdownファイルの出力先パス")
    args = parser.parse_args()

    sb_url = normalize_supabase_url(os.getenv("SUPABASE_URL", ""))
    sb_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()
    if not sb_url or not sb_key:
        raise SystemExit("エラー: SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を環境変数に設定してください。")

    movies = fetch_table_all(
        sb_url,
        sb_key,
        "movies",
        select="imdb_id,title_ja,title_en,release_year,runtime_minutes,genres,director,composite_score",
    )
    watch_rows = fetch_table_all(sb_url, sb_key, "user_watch_status", select="*")

    stats = aggregate_taste_stats(movies, watch_rows)
    report = render_markdown_report(stats)

    if args.output:
        out_path = Path(args.output)
        out_path.write_text(report, encoding="utf-8")
        print(f"集計レポートを {out_path} に出力しました。", file=sys.stderr)
    print(report)


if __name__ == "__main__":
    main()
