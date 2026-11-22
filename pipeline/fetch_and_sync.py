"""
Core Cinema Archive - Phase 1 自動データ収集・Supabase同期バッチ

使い方:
  # 週次自動更新（直近2年のランキング再計算 ＋ 全収録作品の日本配信状況を最新化）
  python pipeline/fetch_and_sync.py --mode weekly

  # 初回バックフィル（1980年〜現在。OMDb無料枠1日1,000件に収めるため自動チェックポイント付き）
  python pipeline/fetch_and_sync.py --mode backfill --max-omdb-calls 900

  # 特定1年分のドライラン確認（Supabaseへ書き込まず標準出力で確認）
  python pipeline/fetch_and_sync.py --mode backfill --start-year 2025 --end-year 2025 --dry-run
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import gzip
import io
import json
import os
import sys
import time
from collections import defaultdict
from pathlib import Path
from typing import Any

import requests
from dotenv import load_dotenv

try:
    from scoring import parse_awards_bonus, select_yearly_top20
except ImportError:
    from pipeline.scoring import parse_awards_bonus, select_yearly_top20

IMDB_BASICS_URL = "https://datasets.imdbws.com/title.basics.tsv.gz"
IMDB_RATINGS_URL = "https://datasets.imdbws.com/title.ratings.tsv.gz"
OMDB_API_URL = "https://www.omdbapi.com/"
TMDB_API_BASE = "https://api.themoviedb.org/3"
TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w500"
TMDB_BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"

DEFAULT_EXCLUDED_GENRES = {"Documentary", "Short", "Reality-TV", "Talk-Show", "News"}
EXCLUDED_GENRES_DEFAULT = DEFAULT_EXCLUDED_GENRES


def preserve_ai_enrichment(
    records: list[dict[str, Any]],
    existing_rows: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """
    movies テーブルへの UPSERT 前に既存の ai_summary / mood_tags を引き継ぎ、
    Phase 2 ローカルLLMで生成済みの解説やタグが上書き消失しないようにする。
    PostgREST のバルク UPSERT 要件を満たすため全レコードでキーを統一する。
    """
    existing_map = {row["imdb_id"]: row for row in existing_rows if row.get("imdb_id")}
    merged_records: list[dict[str, Any]] = []
    for rec in records:
        item = dict(rec)
        existing = existing_map.get(item["imdb_id"], {})
        if not item.get("ai_summary"):
            item["ai_summary"] = existing.get("ai_summary") or None
        if not item.get("mood_tags"):
            item["mood_tags"] = existing.get("mood_tags") or []
        merged_records.append(item)
    return merged_records


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


class SupabaseClient:
    """依存を最小限にするための軽量 Supabase REST クライアント"""

    def __init__(self, url: str, service_role_key: str) -> None:
        self.base_url = normalize_supabase_url(url) + "/rest/v1"
        self.headers = build_supabase_headers(
            service_role_key,
            extra={"Prefer": "resolution=merge-duplicates"},
        )

    def select_all(self, table: str, select: str = "*", page_size: int = 1000) -> list[dict[str, Any]]:
        rows: list[dict[str, Any]] = []
        offset = 0
        while True:
            headers = {
                **self.headers,
                "Range-Unit": "items",
                "Range": f"{offset}-{offset + page_size - 1}",
            }
            resp = requests.get(
                f"{self.base_url}/{table}",
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

    def upsert(self, table: str, records: list[dict[str, Any]], chunk_size: int = 200) -> None:
        if not records:
            return
        for i in range(0, len(records), chunk_size):
            chunk = records[i : i + chunk_size]
            resp = requests.post(
                f"{self.base_url}/{table}",
                headers=self.headers,
                json=chunk,
                timeout=60,
            )
            resp.raise_for_status()


def build_excluded_genres(include_animation: bool = True) -> set[str]:
    excluded = set(DEFAULT_EXCLUDED_GENRES)
    if not include_animation:
        excluded.add("Animation")
    return excluded


def download_imdb_candidates(
    start_year: int,
    end_year: int,
    candidates_per_year: int = 50,
    include_animation: bool = True,
) -> dict[int, list[dict[str, Any]]]:
    """
    IMDb非商用TSVデータセットをストリーミング読み込みし、
    各年ごとの一次候補（投票数下限クリア × IMDb評価上位）を抽出する。
    """
    current_year = dt.date.today().year
    print("[1/4] IMDb ratings データセットを取得中...", flush=True)
    ratings_map: dict[str, tuple[float, int]] = {}
    with requests.get(IMDB_RATINGS_URL, stream=True, timeout=120) as resp:
        resp.raise_for_status()
        with gzip.GzipFile(fileobj=resp.raw) as gz:
            reader = csv.DictReader(io.TextIOWrapper(gz, encoding="utf-8"), delimiter="\t")
            for row in reader:
                votes = int(row["numVotes"])
                if votes < 3000:
                    continue
                ratings_map[row["tconst"]] = (float(row["averageRating"]), votes)

    print(f"  -> 投票数3,000以上の作品: {len(ratings_map):,}件", flush=True)
    print("[1/4] IMDb basics データセットから対象年代の長編映画を抽出中...", flush=True)

    excluded_genres = build_excluded_genres(include_animation=include_animation)

    by_year: dict[int, list[dict[str, Any]]] = defaultdict(list)
    with requests.get(IMDB_BASICS_URL, stream=True, timeout=180) as resp:
        resp.raise_for_status()
        with gzip.GzipFile(fileobj=resp.raw) as gz:
            reader = csv.DictReader(io.TextIOWrapper(gz, encoding="utf-8"), delimiter="\t")
            for row in reader:
                if row["titleType"] != "movie" or row["isAdult"] != "0":
                    continue
                tconst = row["tconst"]
                if tconst not in ratings_map:
                    continue
                year_str = row["startYear"]
                if not year_str.isdigit():
                    continue
                year = int(year_str)
                if year < start_year or year > end_year:
                    continue

                rating, votes = ratings_map[tconst]
                # 最新年・前年のみ投票数下限を緩め、過去年は1万票以上でノイズを除去
                min_votes = 3000 if year >= current_year - 1 else 10000
                if votes < min_votes:
                    continue

                raw_genres = row["genres"]
                genres = [] if raw_genres == "\\N" else [g.strip() for g in raw_genres.split(",")]
                if any(g in excluded_genres for g in genres):
                    continue

                runtime_str = row["runtimeMinutes"]
                runtime = int(runtime_str) if runtime_str.isdigit() else None
                if runtime is not None and runtime < 60:
                    continue

                by_year[year].append(
                    {
                        "imdb_id": tconst,
                        "release_year": year,
                        "title_en": row["primaryTitle"],
                        "original_title": row["originalTitle"],
                        "runtime_minutes": runtime,
                        "genres": genres,
                        "imdb_rating": rating,
                        "imdb_votes": votes,
                    }
                )

    pruned: dict[int, list[dict[str, Any]]] = {}
    for year in range(start_year, end_year + 1):
        items = by_year.get(year, [])
        # IMDb評価降順（同点時は投票数降順）で上位50本に絞る
        items.sort(key=lambda x: (x["imdb_rating"], x["imdb_votes"]), reverse=True)
        pruned[year] = items[:candidates_per_year]

    total = sum(len(v) for v in pruned.values())
    print(f"  -> 一次候補抽出完了: {len(pruned)}年分 / 計 {total:,}本", flush=True)
    return pruned


def _parse_int_or_none(val: str | None) -> int | None:
    if not val or val.strip().upper() == "N/A":
        return None
    digits = "".join(ch for ch in val if ch.isdigit())
    return int(digits) if digits else None


def fetch_omdb_detail(imdb_id: str, omdb_api_key: str) -> dict[str, Any] | None:
    resp = requests.get(
        OMDB_API_URL,
        params={"i": imdb_id, "apikey": omdb_api_key},
        timeout=20,
    )
    if resp.status_code == 401:
        raise RuntimeError("OMDb APIキーが無効、または本日の無料枠（1,000件）に到達しました。")
    resp.raise_for_status()
    data = resp.json()
    if data.get("Response") != "True":
        error_msg = str(data.get("Error") or "")
        if "limit" in error_msg.lower():
            raise RuntimeError(f"OMDb APIのレート制限に到達しました: {error_msg}")
        # 作品未登録などの正常な「該当なし」レスポンスも空キャッシュとして保存し、次回以降のAPI消費を防ぐ
        return {
            "imdb_id": imdb_id,
            "metascore": None,
            "rt_score": None,
            "awards_text": "",
            "director": "",
            "country": "",
            "language": "",
            "fetched_at": dt.datetime.now(dt.timezone.utc).isoformat(),
        }

    rt_score = None
    for r in data.get("Ratings") or []:
        if r.get("Source") == "Rotten Tomatoes":
            rt_score = _parse_int_or_none(r.get("Value"))
            break

    return {
        "imdb_id": imdb_id,
        "metascore": _parse_int_or_none(data.get("Metascore")),
        "rt_score": rt_score,
        "awards_text": None if data.get("Awards") == "N/A" else data.get("Awards"),
        "director": None if data.get("Director") == "N/A" else data.get("Director"),
        "country": None if data.get("Country") == "N/A" else data.get("Country"),
        "language": None if data.get("Language") == "N/A" else data.get("Language"),
        "fetched_at": dt.datetime.now(dt.timezone.utc).isoformat(),
    }


def fetch_tmdb_jp_metadata(imdb_id: str, tmdb_api_key: str) -> dict[str, Any]:
    headers = {"accept": "application/json"}
    params: dict[str, Any] = {"external_source": "imdb_id", "language": "ja-JP"}
    if tmdb_api_key.startswith("eyJ"):
        headers["Authorization"] = f"Bearer {tmdb_api_key}"
    else:
        params["api_key"] = tmdb_api_key

    find_resp = requests.get(
        f"{TMDB_API_BASE}/find/{imdb_id}",
        headers=headers,
        params=params,
        timeout=20,
    )
    find_resp.raise_for_status()
    movie_results = find_resp.json().get("movie_results") or []
    if not movie_results:
        return {}

    m = movie_results[0]
    tmdb_id = m["id"]

    # 日本の配信サービス情報（JustWatch連携）を取得
    prov_params = {} if tmdb_api_key.startswith("eyJ") else {"api_key": tmdb_api_key}
    prov_resp = requests.get(
        f"{TMDB_API_BASE}/movie/{tmdb_id}/watch/providers",
        headers=headers,
        params=prov_params,
        timeout=20,
    )
    prov_resp.raise_for_status()
    jp = (prov_resp.json().get("results") or {}).get("JP") or {}

    def _extract_names(key: str) -> list[str]:
        return [p["provider_name"] for p in (jp.get(key) or []) if p.get("provider_name")]

    return {
        "tmdb_id": tmdb_id,
        "title_ja": m.get("title") or m.get("original_title"),
        "original_language": m.get("original_language"),
        "overview_ja": m.get("overview") or None,
        "poster_url": f"{TMDB_IMG_BASE}{m['poster_path']}" if m.get("poster_path") else None,
        "backdrop_url": f"{TMDB_BACKDROP_BASE}{m['backdrop_path']}" if m.get("backdrop_path") else None,
        "jp_providers": {
            "flatrate": _extract_names("flatrate"),
            "rent": _extract_names("rent"),
            "buy": _extract_names("buy"),
            "link": jp.get("link"),
        },
    }


def refresh_all_jp_providers(sb: SupabaseClient, tmdb_api_key: str) -> None:
    """Supabaseに収録済みの全映画の日本配信状況（JP Watch Providers）を最新化する"""
    print("[4/4] 収録済み全作品の日本配信状況を最新化中...", flush=True)
    existing = sb.select_all("movies", select="imdb_id,tmdb_id")
    headers = {"accept": "application/json"}
    prov_params = {}
    if tmdb_api_key.startswith("eyJ"):
        headers["Authorization"] = f"Bearer {tmdb_api_key}"
    else:
        prov_params["api_key"] = tmdb_api_key

    now_iso = dt.datetime.now(dt.timezone.utc).isoformat()
    updates: list[dict[str, Any]] = []
    for row in existing:
        tmdb_id = row.get("tmdb_id")
        if not tmdb_id:
            continue
        try:
            resp = requests.get(
                f"{TMDB_API_BASE}/movie/{tmdb_id}/watch/providers",
                headers=headers,
                params=prov_params,
                timeout=20,
            )
            resp.raise_for_status()
            jp = (resp.json().get("results") or {}).get("JP") or {}
            updates.append(
                {
                    "imdb_id": row["imdb_id"],
                    "jp_providers": {
                        "flatrate": [p["provider_name"] for p in (jp.get("flatrate") or [])],
                        "rent": [p["provider_name"] for p in (jp.get("rent") or [])],
                        "buy": [p["provider_name"] for p in (jp.get("buy") or [])],
                        "link": jp.get("link"),
                    },
                    "updated_at": now_iso,
                }
            )
            time.sleep(0.04)  # TMDBレート制限に優しい間隔
        except Exception as exc:
            print(f"  [WARN] 配信取得スキップ ({row['imdb_id']}): {exc}", file=sys.stderr)

    # 部分更新（PATCH）またはupsert用: ここではimdb_idごとにjp_providersだけ安全にPATCH
    for item in updates:
        imdb_id = item.pop("imdb_id")
        resp = requests.patch(
            f"{sb.base_url}/movies",
            params={"imdb_id": f"eq.{imdb_id}"},
            headers=sb.headers,
            json=item,
            timeout=20,
        )
        resp.raise_for_status()
    print(f"  -> 配信状況の更新完了: {len(updates):,}件", flush=True)


def main() -> None:
    load_dotenv()
    current_year = dt.date.today().year

    parser = argparse.ArgumentParser(description="Core Cinema Archive データ自動同期バッチ")
    parser.add_argument("--mode", choices=["weekly", "backfill"], default="weekly")
    parser.add_argument("--start-year", type=int, default=None)
    parser.add_argument("--end-year", type=int, default=current_year)
    parser.add_argument("--max-omdb-calls", type=int, default=900, help="1回の実行で叩くOMDb上限")
    anim_group = parser.add_mutually_exclusive_group()
    anim_group.add_argument(
        "--include-animation",
        dest="include_animation",
        action="store_true",
        help="アニメ映画を選出対象に含める（デフォルト有効）",
    )
    anim_group.add_argument(
        "--exclude-animation",
        dest="include_animation",
        action="store_false",
        help="アニメ映画を選出対象から除外する",
    )
    parser.set_defaults(include_animation=True)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    start_year = args.start_year
    if start_year is None:
        start_year = 1980 if args.mode == "backfill" else current_year - 1

    omdb_key = os.getenv("OMDB_API_KEY", "")
    tmdb_key = os.getenv("TMDB_API_KEY", "")
    sb_url = os.getenv("SUPABASE_URL", "")
    sb_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

    if not omdb_key or not tmdb_key:
        raise SystemExit("エラー: OMDB_API_KEY と TMDB_API_KEY を環境変数に設定してください。")
    if not args.dry_run and (not sb_url or not sb_key):
        raise SystemExit("エラー: SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を設定してください。")

    sb = None if args.dry_run else SupabaseClient(sb_url, sb_key)

    # 1. IMDb一次候補抽出
    candidates_by_year = download_imdb_candidates(
        start_year=start_year,
        end_year=args.end_year,
        candidates_per_year=50,
        include_animation=args.include_animation,
    )

    # 2. OMDbキャッシュ読み込み & 未取得分のみ取得
    print("[2/4] OMDb キャッシュ照合・未取得分の批評家スコア／受賞歴を取得中...", flush=True)
    omdb_cache: dict[str, dict[str, Any]] = {}
    if sb is not None:
        for row in sb.select_all("omdb_cache"):
            omdb_cache[row["imdb_id"]] = row

    omdb_calls = 0
    new_cache_rows: list[dict[str, Any]] = []
    quota_reached = False

    # 新しい年から順に処理することで、初回バックフィル中でも直近年代からすぐサイトに並ぶ
    for year in sorted(candidates_by_year.keys(), reverse=True):
        if quota_reached:
            break
        for cand in candidates_by_year[year]:
            iid = cand["imdb_id"]
            if iid in omdb_cache:
                continue
            if omdb_calls >= args.max_omdb_calls:
                print(
                    f"  -> 本日のOMDb上限 ({args.max_omdb_calls}件) に到達。途中キャッシュを保存して終了します。",
                    flush=True,
                )
                quota_reached = True
                break
            try:
                detail = fetch_omdb_detail(iid, omdb_key)
                omdb_calls += 1
                if detail:
                    omdb_cache[iid] = detail
                    new_cache_rows.append(detail)
                time.sleep(0.05)
            except Exception as exc:
                print(f"  [WARN] OMDb取得エラー ({iid}): {exc}", file=sys.stderr)
                if "無料枠" in str(exc) or "レート制限" in str(exc):
                    quota_reached = True
                    break

    if sb is not None and new_cache_rows:
        sb.upsert("omdb_cache", new_cache_rows)
        print(f"  -> OMDb新規キャッシュ保存: {len(new_cache_rows)}件", flush=True)

    # 3. 年ごとのスコアリング & ハイブリッド20本選出 + TMDB日本語・配信取得
    print("[3/4] 年別ハイブリッド20本選出 & TMDB日本語・配信情報を取得中...", flush=True)
    all_selected_records: list[dict[str, Any]] = []
    now_iso = dt.datetime.now(dt.timezone.utc).isoformat()

    for year in sorted(candidates_by_year.keys(), reverse=True):
        year_cands = candidates_by_year[year]
        # OMDbキャッシュが揃っていない年は次回実行に回す（初回3日分割時の不完全データ防止）
        cached_count = sum(1 for c in year_cands if c["imdb_id"] in omdb_cache)
        if year_cands and cached_count < len(year_cands) * 0.8:
            print(f"  - {year}年: OMDb取得途中 ({cached_count}/{len(year_cands)}) のためスキップ", flush=True)
            continue

        enriched = []
        for c in year_cands:
            od = omdb_cache.get(c["imdb_id"], {})
            merged = {
                **c,
                "metascore": od.get("metascore"),
                "rt_score": od.get("rt_score"),
                "awards_text": od.get("awards_text") or None,
                "awards_bonus": parse_awards_bonus(od.get("awards_text")),
                "director": od.get("director") or None,
                "language": od.get("language") or None,
            }
            enriched.append(merged)

        top20 = select_yearly_top20(enriched, target_count=20, top_n=12)
        for item in top20:
            tmdb_info = fetch_tmdb_jp_metadata(item["imdb_id"], tmdb_key)
            time.sleep(0.04)
            record = {
                "imdb_id": item["imdb_id"],
                "tmdb_id": tmdb_info.get("tmdb_id"),
                "release_year": item["release_year"],
                "year_rank": item["year_rank"],
                "title_ja": tmdb_info.get("title_ja") or item["title_en"],
                "title_en": item["title_en"],
                "original_title": item.get("original_title"),
                "original_language": tmdb_info.get("original_language") or item.get("language"),
                "poster_url": tmdb_info.get("poster_url"),
                "backdrop_url": tmdb_info.get("backdrop_url"),
                "runtime_minutes": item.get("runtime_minutes"),
                "genres": item["genres"],
                "director": item.get("director"),
                "selection_slot": item["selection_slot"],
                "selection_category": item["selection_category"],
                "composite_score": item["composite_score"],
                "imdb_rating": item["imdb_rating"],
                "imdb_votes": item["imdb_votes"],
                "metascore": item.get("metascore"),
                "rt_score": item.get("rt_score"),
                "awards_text": item.get("awards_text"),
                "awards_bonus": item["awards_bonus"],
                "jp_providers": tmdb_info.get("jp_providers")
                or {"flatrate": [], "rent": [], "buy": [], "link": None},
                "overview_ja": tmdb_info.get("overview_ja"),
                "updated_at": now_iso,
            }
            all_selected_records.append(record)

        print(f"  - {year}年: {len(top20)}本確定", flush=True)

    if args.dry_run:
        print(json.dumps(all_selected_records[:10], ensure_ascii=False, indent=2))
        print(f"[DRY-RUN] 合計 {len(all_selected_records)}本を選出しました。")
        return

    assert sb is not None
    existing_ai_rows = sb.select_all("movies", select="imdb_id,ai_summary,mood_tags")
    upsert_rows = preserve_ai_enrichment(all_selected_records, existing_ai_rows)
    sb.upsert("movies", upsert_rows)
    print(f"  -> Supabase movies 同期完了: {len(upsert_rows)}本", flush=True)

    # 4. 週次モード時は全収録作品の配信状況も一括最新化（＋Supabase無料枠スリープ防止）
    if args.mode == "weekly":
        refresh_all_jp_providers(sb, tmdb_key)

    print("すべての処理が正常に完了しました。", flush=True)


if __name__ == "__main__":
    main()
