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
from datetime import datetime, timedelta, timezone
import gzip
import io
import json
import math
import os
import sys
import time
from collections import defaultdict
from pathlib import Path
from typing import Any, Dict, Optional

import requests
from dotenv import load_dotenv

try:
    from scoring import parse_awards_bonus, select_yearly_top20, select_yearly_top25
except ImportError:
    from pipeline.scoring import parse_awards_bonus, select_yearly_top20, select_yearly_top25

try:
    from mood_tagger import generate_mood_tags
except ImportError:
    from pipeline.mood_tagger import generate_mood_tags

IMDB_BASICS_URL = "https://datasets.imdbws.com/title.basics.tsv.gz"
IMDB_RATINGS_URL = "https://datasets.imdbws.com/title.ratings.tsv.gz"
OMDB_API_URL = "https://www.omdbapi.com/"
TMDB_API_BASE = "https://api.themoviedb.org/3"
TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w500"
TMDB_BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"

DEFAULT_EXCLUDED_GENRES = {"Documentary", "Short", "Reality-TV", "Talk-Show", "News"}
EXCLUDED_GENRES_DEFAULT = DEFAULT_EXCLUDED_GENRES

# OMDb 無料枠到達時にも世界的傑作・重要ホラー/ジャンル代表が欠落しないよう補完する既知メタデータシード
KNOWN_OMDB_SEED_DATA: dict[str, dict[str, Any]] = {
    "tt31193180": {
        "metascore": 84,
        "rt_score": 97,
        "awards_text": "Critics Choice & Oscar Contender",
        "director": "Ryan Coogler",
        "country": "United States",
        "language": "English",
    },
    "tt26581740": {
        "metascore": 81,
        "rt_score": 94,
        "awards_text": "12 wins & 28 nominations",
        "director": "Zach Cregger",
        "country": "United States",
        "language": "English",
    },
    "tt1312221": {
        "metascore": 78,
        "rt_score": 86,
        "awards_text": "8 wins & 22 nominations",
        "director": "Guillermo del Toro",
        "country": "United States",
        "language": "English",
    },
    "tt17526714": {
        "metascore": 78,
        "rt_score": 89,
        "awards_text": "Won 1 Oscar. 45 wins & 110 nominations total",
        "director": "Coralie Fargeat",
        "country": "United Kingdom, France",
        "language": "English",
    },
    "tt5040012": {
        "metascore": 78,
        "rt_score": 85,
        "awards_text": "Nominated for 4 Oscars. 22 wins & 75 nominations total",
        "director": "Robert Eggers",
        "country": "United States",
        "language": "English",
    },
    "tt8999762": {
        "metascore": 90,
        "rt_score": 93,
        "awards_text": "Won 3 Oscars. 65 wins & 180 nominations total",
        "director": "Brady Corbet",
        "country": "United States, United Kingdom, Hungary",
        "language": "English",
    },
    "tt18412256": {
        "metascore": 64,
        "rt_score": 80,
        "awards_text": "4 wins & 18 nominations",
        "director": "Fede Alvarez",
        "country": "United Kingdom, United States",
        "language": "English",
    },
    "tt7160372": {
        "metascore": 92,
        "rt_score": 93,
        "awards_text": "Won 2 Oscars. 88 wins & 150 nominations total",
        "director": "Jonathan Glazer",
        "country": "United Kingdom, Poland, United States",
        "language": "German, Polish",
    },
    "tt1517268": {
        "metascore": 80,
        "rt_score": 88,
        "awards_text": "Won 1 Oscar. 120 wins & 350 nominations total",
        "director": "Greta Gerwig",
        "country": "United States, United Kingdom",
        "language": "English",
    },
    "tt10954984": {
        "metascore": 77,
        "rt_score": 83,
        "awards_text": "24 wins & 90 nominations",
        "director": "Jordan Peele",
        "country": "United States",
        "language": "English",
    },
    "tt9764362": {
        "metascore": 71,
        "rt_score": 88,
        "awards_text": "12 wins & 55 nominations",
        "director": "Mark Mylod",
        "country": "United States",
        "language": "English",
    },
    "tt11564570": {
        "metascore": 81,
        "rt_score": 91,
        "awards_text": "Nominated for 1 Oscar. 28 wins & 80 nominations total",
        "director": "Rian Johnson",
        "country": "United States",
        "language": "English",
    },
    "tt6857112": {
        "metascore": 81,
        "rt_score": 93,
        "awards_text": "75 wins & 120 nominations",
        "director": "Jordan Peele",
        "country": "United States",
        "language": "English",
    },
    "tt8772262": {
        "metascore": 72,
        "rt_score": 83,
        "awards_text": "25 wins & 70 nominations",
        "director": "Ari Aster",
        "country": "United States, Sweden",
        "language": "English, Swedish",
    },
    "tt5727208": {
        "metascore": 93,
        "rt_score": 91,
        "awards_text": "38 wins & 82 nominations",
        "director": "Benny Safdie, Josh Safdie",
        "country": "United States",
        "language": "English",
    },
    "tt7784604": {
        "metascore": 87,
        "rt_score": 90,
        "awards_text": "45 wins & 110 nominations",
        "director": "Ari Aster",
        "country": "United States",
        "language": "English",
    },
    "tt1396484": {
        "metascore": 69,
        "rt_score": 85,
        "awards_text": "12 wins & 44 nominations",
        "director": "Andy Muschietti",
        "country": "United States, Canada",
        "language": "English",
    },
    "tt5580390": {
        "metascore": 87,
        "rt_score": 92,
        "awards_text": "Won 4 Oscars. 138 wins & 350 nominations total",
        "director": "Guillermo del Toro",
        "country": "United States",
        "language": "English",
    },
    "tt4975722": {
        "metascore": 99,
        "rt_score": 98,
        "awards_text": "Won 3 Oscars. 220 wins & 300 nominations total",
        "director": "Barry Jenkins",
        "country": "United States",
        "language": "English",
    },
    "tt4972582": {
        "metascore": 63,
        "rt_score": 78,
        "awards_text": "10 wins & 24 nominations",
        "director": "M. Night Shyamalan",
        "country": "United States",
        "language": "English",
    },
    "tt1060277": {
        "metascore": 64,
        "rt_score": 78,
        "awards_text": "10 wins & 27 nominations",
        "director": "Matt Reeves",
        "country": "United States",
        "language": "English",
    },
}

DEFAULT_MANUAL_PICKS_PATH = Path(__file__).resolve().parent / "manual_picks.txt"
DEFAULT_COUNTRY_MAP_PATH = Path(__file__).resolve().parent.parent / "web" / "country_map.json"


def load_manual_picks(filepath: str | Path | None = None) -> set[str]:
    """
    pipeline/manual_picks.txt から手動ピックアップ対象の IMDb ID (ttXXXXXXX) を読み込む。
    `#` 以降のコメント・空行を許容する。ファイル未存在時は空集合を返す。
    """
    path = Path(filepath) if filepath is not None else DEFAULT_MANUAL_PICKS_PATH
    if not path.exists():
        return set()
    picks: set[str] = set()
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.split("#", 1)[0].strip()
        if not line:
            continue
        token = line.split()[0].strip()
        if token.startswith("tt") and token[2:].isdigit():
            picks.add(token)
    return picks


def _extract_unknown_pgrst204_column(status_code: int, body_text: str) -> Optional[str]:
    """
    PostgREST が PGRST204 ("Could not find the '<col>' column of '<table>' in the schema cache")
    を返した際、その未知カラム名を抽出して返す。該当しなければ None。
    """
    import re

    if status_code not in (400, 404):
        return None
    if "PGRST204" not in body_text and "schema cache" not in body_text.lower():
        return None
    m = re.search(r"Could not find the '([^']+)' column", body_text)
    if m:
        return m.group(1)
    return None


def preserve_ai_enrichment(
    records: list[dict[str, Any]],
    existing_rows: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """
    movies テーブルへの UPSERT 前に既存の ai_summary / mood_tags を引き継ぎ、
    Phase 2 ローカルLLMで生成済みの解説やタグ、v7 AIカラム
    (ai_catchcopy / vibe_scores / similar_ids / map_x / map_y) が NULL で上書き消失しないようにする。
    - 既存行に ai_summary が設定済み (IS NOT NULL / 非空) の場合は、既存の ai_summary と
      既存の mood_tags（非空なら）を優先して保持し、自動タグで上書きしない。
    - ai_summary が未設定の場合は、新規レコード側の自動生成 mood_tags（空なら既存）を採用する。
    - ai_catchcopy / vibe_scores / similar_ids / map_x / map_y はフェッチ側で生成しないため、
      新規レコードに明示設定されていない限りペイロードから除外してDBの既存値を保持する。
    PostgREST のバルク UPSERT 要件 (PGRST102: All object keys must match) を満たすため、
    全レコードで必ず同一キー（ai_summary / mood_tags を含む）を揃える。
    """
    v7_preserved_cols = ("ai_catchcopy", "vibe_scores", "similar_ids", "map_x", "map_y")
    existing_map = {row["imdb_id"]: row for row in existing_rows if row.get("imdb_id")}
    merged_records: list[dict[str, Any]] = []
    for rec in records:
        item = dict(rec)
        for v7_col in v7_preserved_cols:
            if item.get(v7_col) is None:
                item.pop(v7_col, None)
        existing = existing_map.get(item["imdb_id"], {})
        existing_ai_summary = existing.get("ai_summary")
        existing_mood_tags = existing.get("mood_tags") or []
        has_llm_enrichment = bool(existing_ai_summary and str(existing_ai_summary).strip())

        if has_llm_enrichment:
            item["ai_summary"] = item.get("ai_summary") or existing_ai_summary
            item["mood_tags"] = existing_mood_tags if existing_mood_tags else (item.get("mood_tags") or [])
        else:
            item["ai_summary"] = item.get("ai_summary") or None
            item["mood_tags"] = item.get("mood_tags") or existing_mood_tags or []
        merged_records.append(item)

    if merged_records:
        all_keys = sorted({k for row in merged_records for k in row.keys()})
        merged_records = [{k: row.get(k) for k in all_keys} for row in merged_records]
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
        omitted_cols: set[str] = set()
        for i in range(0, len(records), chunk_size):
            chunk = records[i : i + chunk_size]
            while True:
                payload = (
                    [{k: v for k, v in row.items() if k not in omitted_cols} for row in chunk]
                    if omitted_cols
                    else chunk
                )
                resp = requests.post(
                    f"{self.base_url}/{table}",
                    headers=self.headers,
                    json=payload,
                    timeout=60,
                )
                if resp.ok:
                    break
                unknown_col = _extract_unknown_pgrst204_column(resp.status_code, resp.text)
                if unknown_col and unknown_col not in omitted_cols:
                    print(
                        f"  [WARN] {table} にカラム '{unknown_col}' が未追加のため除外してリトライします (schema.sql要適用)",
                        file=sys.stderr,
                    )
                    omitted_cols.add(unknown_col)
                    continue
                raise RuntimeError(
                    f"Supabase upsert failed ({table}, HTTP {resp.status_code}): {resp.text[:500]}"
                )

    def patch_by_imdb_id(
        self,
        table: str,
        imdb_id: str,
        fields: dict[str, Any],
        omitted_cols: set[str] | None = None,
    ) -> None:
        skip = omitted_cols if omitted_cols is not None else set()
        while True:
            payload = {k: v for k, v in fields.items() if k not in skip}
            if not payload:
                return
            resp = requests.patch(
                f"{self.base_url}/{table}",
                params={"imdb_id": f"eq.{imdb_id}"},
                headers=self.headers,
                json=payload,
                timeout=20,
            )
            if resp.ok:
                return
            unknown_col = _extract_unknown_pgrst204_column(resp.status_code, resp.text)
            if unknown_col and unknown_col not in skip:
                print(
                    f"  [WARN] {table} PATCHでカラム '{unknown_col}' が未追加のため除外してリトライします",
                    file=sys.stderr,
                )
                skip.add(unknown_col)
                continue
            resp.raise_for_status()

    def delete_by_imdb_ids(self, table: str, imdb_ids: list[str], chunk_size: int = 100) -> None:
        if not imdb_ids:
            return
        for i in range(0, len(imdb_ids), chunk_size):
            chunk = imdb_ids[i : i + chunk_size]
            in_expr = f"({','.join(chunk)})"
            resp = requests.delete(
                f"{self.base_url}/{table}",
                params={"imdb_id": f"in.{in_expr}"},
                headers=self.headers,
                timeout=30,
            )
            resp.raise_for_status()


def build_excluded_genres(include_animation: bool = True) -> set[str]:
    excluded = set(DEFAULT_EXCLUDED_GENRES)
    if not include_animation:
        excluded.add("Animation")
    return excluded


GENRE_RESCUE_SET = {"Horror", "Sci-Fi", "Thriller", "Action", "Comedy"}


def fetch_tmdb_japanese_candidates_by_year(
    start_year: int,
    end_year: int,
    tmdb_api_key: str,
    top_n_per_year: int = 6,
) -> dict[int, set[str]]:
    """
    TMDB Discover API (/discover/movie?with_original_language=ja) で各年の日本映画上位を取得し、
    external_ids から imdb_id を引いて {year: {imdb_id, ...}} を返す。
    """
    if not tmdb_api_key:
        return {}
    headers = {"accept": "application/json"}
    use_bearer = tmdb_api_key.startswith("eyJ")
    if use_bearer:
        headers["Authorization"] = f"Bearer {tmdb_api_key}"

    result: dict[int, set[str]] = defaultdict(set)
    for year in range(start_year, end_year + 1):
        params: dict[str, Any] = {
            "with_original_language": "ja",
            "primary_release_year": year,
            "sort_by": "vote_count.desc",
            "page": 1,
        }
        if not use_bearer:
            params["api_key"] = tmdb_api_key
        try:
            resp = requests.get(
                f"{TMDB_API_BASE}/discover/movie",
                headers=headers,
                params=params,
                timeout=20,
            )
            resp.raise_for_status()
            movies = (resp.json().get("results") or [])[:top_n_per_year]
            for m in movies:
                tid = m.get("id")
                if not tid:
                    continue
                ext_params = {} if use_bearer else {"api_key": tmdb_api_key}
                try:
                    ext_resp = requests.get(
                        f"{TMDB_API_BASE}/movie/{tid}/external_ids",
                        headers=headers,
                        params=ext_params,
                        timeout=15,
                    )
                    ext_resp.raise_for_status()
                    imdb_id = ext_resp.json().get("imdb_id")
                    if imdb_id and str(imdb_id).startswith("tt"):
                        result[year].add(str(imdb_id))
                except Exception:
                    continue
                time.sleep(0.02)
            time.sleep(0.02)
        except Exception as exc:
            print(f"  [WARN] TMDB日本映画Discover取得スキップ ({year}年): {exc}", file=sys.stderr)
    return dict(result)


def select_year_candidates_multibucket(
    items: list[dict[str, Any]],
    year: int,
    candidates_per_year: int = 60,
    current_year: int | None = None,
    manual_picks: set[str] | None = None,
    jp_discover_ids: set[str] | None = None,
) -> list[dict[str, Any]]:
    """
    1年分の候補を以下の構造で抽出し、人気カルト作・日本映画・ジャンル傑作の取りこぼしを防ぐ:
      - 枠0（manual_picks.txt 無条件収録枠）: manual_picks に含まれる作品は投票数・スコア不問で無条件収録
      - 枠1（IMDb高評価・話題作枠: 上位35本）: 高評価・話題性（信頼度加重スコア）順で上位35本を選出
      - 枠2（ジャンル別人気作枠: 上位15本）: 枠1に入らなかった候補のうち、
        Horror/Sci-Fi/Thriller/Action/Comedy のいずれかを含み、
        投票数 50,000票以上（直近2年は max(15000, min_votes * 3) 以上）・IMDb 6.8以上
        （25万票以上の超大作カルトは6.5以上）の作品を投票数・人気順で上位15本選出。
      - 枠3（日本映画枠候補: TMDB Discover上位・日本語映画）: jp_discover_ids に含まれる作品
        （投票数 >= 5,000、直近2年は >= 2,000）を候補プールに必ず合流。
      - 枠4（人気カルト候補: imdb_votes >= 80,000 かつ imdb_rating >= 7.0）: 未選出の中から
        人気・評価上位枠が候補プールから漏れないように合流。
    """
    manual_set = manual_picks or set()
    jp_set = jp_discover_ids or set()
    ref_year = current_year if current_year is not None else dt.date.today().year
    min_votes = 3000 if year >= ref_year - 1 else 10000
    genre_pop_min_votes = max(15000, min_votes * 3) if year >= ref_year - 1 else 50000
    jp_min_votes = 2000 if year >= ref_year - 1 else 5000

    selected: list[dict[str, Any]] = []
    seen: set[str] = set()

    # 枠0: manual_picks.txt 指定作品を無条件で優先収録
    for x in items:
        if x["imdb_id"] in manual_set and x["imdb_id"] not in seen:
            entry = dict(x)
            entry["is_manual_pick"] = True
            selected.append(entry)
            seen.add(entry["imdb_id"])

    if len(items) <= candidates_per_year:
        rest = sorted(
            [x for x in items if x["imdb_id"] not in seen],
            key=lambda x: (float(x["imdb_rating"]), int(x["imdb_votes"])),
            reverse=True,
        )
        for x in rest:
            entry = dict(x)
            if entry["imdb_id"] in jp_set and not entry.get("original_language"):
                entry["original_language"] = "ja"
            selected.append(entry)
        return selected

    # 枠3先取り準備: TMDB Discoverで確保した日本映画候補（5,000票以上 / 直近2年は2,000票以上）
    # ※ 枠1/2/4の後でも確実に候補プールに合流できるよう、まず対象を特定しておく
    jp_candidates = [
        x
        for x in items
        if x["imdb_id"] in jp_set
        and x["imdb_id"] not in seen
        and int(x.get("imdb_votes") or 0) >= jp_min_votes
    ]
    jp_candidates.sort(
        key=lambda x: (float(x["imdb_rating"]), int(x["imdb_votes"])),
        reverse=True,
    )
    for x in jp_candidates:
        if x["imdb_id"] not in seen:
            entry = dict(x)
            if not entry.get("original_language"):
                entry["original_language"] = "ja"
            selected.append(entry)
            seen.add(entry["imdb_id"])

    # 枠1: 高評価・話題性加重スコア順（投票数信頼度を加味）で上位35本
    slot1_limit = 35
    remaining_for_slot1 = [x for x in items if x["imdb_id"] not in seen]
    remaining_for_slot1.sort(
        key=lambda x: (
            float(x["imdb_rating"]) * min(1.0, 0.85 + 0.03 * math.log10(max(int(x["imdb_votes"]), 1))),
            float(x["imdb_rating"]) + 0.35 * math.log10(max(int(x["imdb_votes"]), 1)),
            int(x["imdb_votes"]),
        ),
        reverse=True,
    )
    slot1_picked = 0
    for x in remaining_for_slot1:
        if slot1_picked >= slot1_limit:
            break
        selected.append(x)
        seen.add(x["imdb_id"])
        slot1_picked += 1

    # 枠2: ジャンル別人気作枠（上位15本）
    # Horror / Sci-Fi / Thriller / Action / Comedy を含み、投票数 >= genre_pop_min_votes かつ IMDb >= 6.8
    # （25万票以上の大ヒットカルトは 6.5 以上を救済対象）
    slot2_quota = 15
    bucket_genre = [
        x
        for x in items
        if x["imdb_id"] not in seen
        and int(x["imdb_votes"]) >= genre_pop_min_votes
        and float(x["imdb_rating"]) >= (6.5 if int(x["imdb_votes"]) >= 250000 else 6.8)
        and any(g in GENRE_RESCUE_SET for g in (x.get("genres") or []))
    ]
    bucket_genre.sort(
        key=lambda x: (
            int(x["imdb_votes"]),
            float(x["imdb_rating"]),
        ),
        reverse=True,
    )
    for x in bucket_genre[:slot2_quota]:
        selected.append(x)
        seen.add(x["imdb_id"])

    # 枠4: 人気カルト候補の確保（imdb_votes >= 80,000 かつ imdb_rating >= 7.0）
    # 従来の一次候補から漏れた人気作・カルト名作を取りこぼさない
    cult_rescue = [
        x
        for x in items
        if x["imdb_id"] not in seen
        and int(x.get("imdb_votes") or 0) >= 80000
        and float(x.get("imdb_rating") or 0.0) >= 7.0
    ]
    cult_rescue.sort(
        key=lambda x: (
            float(x["imdb_rating"]) * 10.0 + min(15.0, math.log10(max(int(x["imdb_votes"]), 1)) * 3.0),
            int(x["imdb_votes"]),
        ),
        reverse=True,
    )
    for x in cult_rescue[:10]:
        selected.append(x)
        seen.add(x["imdb_id"])

    # まだ candidates_per_year 未満なら枠1の次点で埋める
    if len(selected) < candidates_per_year:
        for x in remaining_for_slot1:
            if len(selected) >= candidates_per_year:
                break
            if x["imdb_id"] in seen:
                continue
            selected.append(x)
            seen.add(x["imdb_id"])

    return selected


def download_imdb_candidates(
    start_year: int,
    end_year: int,
    candidates_per_year: int = 60,
    include_animation: bool = True,
    manual_picks: set[str] | None = None,
    tmdb_api_key: str | None = None,
    jp_discover_by_year: dict[int, set[str]] | None = None,
) -> dict[int, list[dict[str, Any]]]:
    """
    IMDb非商用TSVデータセットをストリーミング読み込みし、
    各年ごとの一次候補をマルチバケット（枠0 manual_picks ＋ 日本映画Discover ＋ 枠1 上位35本 ＋
    枠2 ジャンル人気作15本 ＋ 人気カルト枠）で抽出する。
    """
    current_year = dt.date.today().year
    manual_set = manual_picks if manual_picks is not None else load_manual_picks()
    if jp_discover_by_year is None and tmdb_api_key:
        print("[1/4] TMDB Discover で各年の日本映画上位候補を取得中...", flush=True)
        jp_discover_by_year = fetch_tmdb_japanese_candidates_by_year(
            start_year=start_year,
            end_year=end_year,
            tmdb_api_key=tmdb_api_key,
            top_n_per_year=6,
        )
        jp_total = sum(len(v) for v in jp_discover_by_year.values())
        print(f"  -> 日本映画Discover確保: {len(jp_discover_by_year)}年分 / 計 {jp_total:,}本", flush=True)
    jp_map: dict[int, set[str]] = jp_discover_by_year or {}
    all_jp_ids = {iid for ids in jp_map.values() for iid in ids}

    print("[1/4] IMDb ratings データセットを取得中...", flush=True)
    ratings_map: dict[str, tuple[float, int]] = {}
    with requests.get(IMDB_RATINGS_URL, stream=True, timeout=120) as resp:
        resp.raise_for_status()
        with gzip.GzipFile(fileobj=resp.raw) as gz:
            reader = csv.DictReader(io.TextIOWrapper(gz, encoding="utf-8"), delimiter="\t")
            for row in reader:
                tconst = row["tconst"]
                votes = int(row["numVotes"])
                if votes < 2000 and tconst not in manual_set:
                    continue
                ratings_map[tconst] = (float(row["averageRating"]), votes)

    print(f"  -> 投票数2,000以上（＋手動指定）の作品: {len(ratings_map):,}件", flush=True)
    print("[1/4] IMDb basics データセットから対象年代の長編映画を抽出中...", flush=True)

    excluded_genres = build_excluded_genres(include_animation=include_animation)

    by_year: dict[int, list[dict[str, Any]]] = defaultdict(list)
    with requests.get(IMDB_BASICS_URL, stream=True, timeout=180) as resp:
        resp.raise_for_status()
        with gzip.GzipFile(fileobj=resp.raw) as gz:
            reader = csv.DictReader(io.TextIOWrapper(gz, encoding="utf-8"), delimiter="\t")
            for row in reader:
                tconst = row["tconst"]
                is_manual = tconst in manual_set
                is_jp_discover = tconst in all_jp_ids
                if row["titleType"] != "movie" or (row["isAdult"] != "0" and not is_manual):
                    continue
                if tconst not in ratings_map and not is_manual:
                    continue
                year_str = row["startYear"]
                if not year_str.isdigit():
                    continue
                year = int(year_str)
                if year < start_year or year > end_year:
                    continue

                rating, votes = ratings_map.get(tconst, (7.0, 0))
                # 日本映画枠候補は 5,000票以上（直近2年は 2,000票以上）に緩和
                # それ以外は従来通り 10,000票以上（直近2年は 3,000票以上）
                if is_jp_discover or tconst in jp_map.get(year, set()):
                    min_votes = 2000 if year >= current_year - 1 else 5000
                else:
                    min_votes = 3000 if year >= current_year - 1 else 10000
                if votes < min_votes and not is_manual:
                    continue

                raw_genres = row["genres"]
                genres = [] if raw_genres == "\\N" else [g.strip() for g in raw_genres.split(",")]
                if not is_manual and any(g in excluded_genres for g in genres):
                    continue

                runtime_str = row["runtimeMinutes"]
                runtime = int(runtime_str) if runtime_str.isdigit() else None
                if runtime is not None and runtime < 60 and not is_manual:
                    continue

                entry: dict[str, Any] = {
                    "imdb_id": tconst,
                    "release_year": year,
                    "title_en": row["primaryTitle"],
                    "original_title": row["originalTitle"],
                    "runtime_minutes": runtime,
                    "genres": genres,
                    "imdb_rating": rating,
                    "imdb_votes": votes,
                }
                if is_manual:
                    entry["is_manual_pick"] = True
                if is_jp_discover or tconst in jp_map.get(year, set()):
                    entry["original_language"] = "ja"
                by_year[year].append(entry)

    pruned: dict[int, list[dict[str, Any]]] = {}
    for year in range(start_year, end_year + 1):
        items = by_year.get(year, [])
        pruned[year] = select_year_candidates_multibucket(
            items,
            year=year,
            candidates_per_year=candidates_per_year,
            current_year=current_year,
            manual_picks=manual_set,
            jp_discover_ids=jp_map.get(year),
        )

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


def compute_newly_flatrate_update(
    prev_providers: Optional[Dict[str, Any]],
    new_providers: Dict[str, Any],
    prev_newly_providers: Optional[list[str]],
    prev_newly_at: Optional[str],
    now_dt: Optional[datetime] = None,
    retention_days: int = 14,
) -> tuple[list[str], Optional[str]]:
    """
    前回の jp_providers と今回の jp_providers を比較し、新しく見放題 (flatrate) に追加された
    サービスを検知して最大 retention_days 日間保持する純粋関数。
      - prev_providers が None の場合（初回登録等）は差分なし（既存値を維持するか空）とする。
      - 新規追加があれば、14日以内の既存新着リスト（現在も flatrate に含まれるもの）とマージし、
        newly_flatrate_at を現在時刻（ISO文字列）に更新する。
      - 新規追加がない場合、prev_newly_at が14日未満なら現在も flatrate に残っているサービスを保持。
        14日以上経過、または現在 flatrate から全て消えた場合は ([], None) にクリアする。
    """
    ref_now = now_dt if now_dt is not None else datetime.now(timezone.utc)
    if ref_now.tzinfo is None:
        ref_now = ref_now.replace(tzinfo=timezone.utc)
    else:
        ref_now = ref_now.astimezone(timezone.utc)

    new_flatrate = [str(p).strip() for p in ((new_providers or {}).get("flatrate") or []) if str(p).strip()]
    new_flatrate_set = set(new_flatrate)

    prev_newly_list = [str(p).strip() for p in (prev_newly_providers or []) if str(p).strip()]
    prev_newly_dt = _parse_iso_datetime_utc(prev_newly_at)
    within_retention = prev_newly_dt is not None and (ref_now - prev_newly_dt) < timedelta(days=retention_days)

    if prev_providers is None:
        if within_retention:
            kept = [p for p in prev_newly_list if p in new_flatrate_set]
            if kept:
                return kept, prev_newly_at
        return [], None

    prev_flatrate = [str(p).strip() for p in (prev_providers.get("flatrate") or []) if str(p).strip()]
    prev_flatrate_set = set(prev_flatrate)
    added = [p for p in new_flatrate if p not in prev_flatrate_set]

    if added:
        merged: list[str] = []
        seen_p: set[str] = set()
        if within_retention:
            for p in prev_newly_list:
                if p in new_flatrate_set and p not in seen_p:
                    merged.append(p)
                    seen_p.add(p)
        for p in added:
            if p not in seen_p:
                merged.append(p)
                seen_p.add(p)
        return merged, ref_now.isoformat()

    if within_retention:
        kept = [p for p in prev_newly_list if p in new_flatrate_set]
        if kept:
            return kept, prev_newly_at

    return [], None


def refresh_all_jp_providers(sb: SupabaseClient, tmdb_api_key: str) -> None:
    """Supabaseに収録済みの全映画の日本配信状況（JP Watch Providers）と新着見放題を最新化する"""
    print("[4/4] 収録済み全作品の日本配信状況を最新化中...", flush=True)
    try:
        existing = sb.select_all(
            "movies",
            select="imdb_id,tmdb_id,jp_providers,newly_flatrate_providers,newly_flatrate_at",
        )
    except Exception:
        existing = sb.select_all("movies", select="imdb_id,tmdb_id,jp_providers")

    headers = {"accept": "application/json"}
    prov_params = {}
    if tmdb_api_key.startswith("eyJ"):
        headers["Authorization"] = f"Bearer {tmdb_api_key}"
    else:
        prov_params["api_key"] = tmdb_api_key

    now_dt = dt.datetime.now(dt.timezone.utc)
    now_iso = now_dt.isoformat()
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
            new_providers = {
                "flatrate": [p["provider_name"] for p in (jp.get("flatrate") or []) if p.get("provider_name")],
                "rent": [p["provider_name"] for p in (jp.get("rent") or []) if p.get("provider_name")],
                "buy": [p["provider_name"] for p in (jp.get("buy") or []) if p.get("provider_name")],
                "link": jp.get("link"),
            }
            newly_provs, newly_at = compute_newly_flatrate_update(
                prev_providers=row.get("jp_providers"),
                new_providers=new_providers,
                prev_newly_providers=row.get("newly_flatrate_providers"),
                prev_newly_at=row.get("newly_flatrate_at"),
                now_dt=now_dt,
                retention_days=14,
            )
            updates.append(
                {
                    "imdb_id": row["imdb_id"],
                    "jp_providers": new_providers,
                    "newly_flatrate_providers": newly_provs,
                    "newly_flatrate_at": newly_at,
                    "updated_at": now_iso,
                }
            )
            time.sleep(0.04)  # TMDBレート制限に優しい間隔
        except Exception as exc:
            print(f"  [WARN] 配信取得スキップ ({row['imdb_id']}): {exc}", file=sys.stderr)

    omitted_cols: set[str] = set()
    for item in updates:
        imdb_id = item.pop("imdb_id")
        sb.patch_by_imdb_id("movies", imdb_id, item, omitted_cols=omitted_cols)
    print(f"  -> 配信状況の更新完了: {len(updates):,}件", flush=True)


def backfill_movies_country_from_cache(
    sb: SupabaseClient,
    omdb_cache: dict[str, dict[str, Any]],
    existing_movies: list[dict[str, Any]] | None = None,
) -> int:
    """
    追加の OMDb / TMDB API 消費ゼロで、既存の omdb_cache.country から
    movies.country が空の既存レコードをバックフィルする。
    """
    rows = existing_movies if existing_movies is not None else sb.select_all("movies", select="imdb_id,country")
    updated = 0
    omitted_cols: set[str] = set()
    for row in rows:
        if "country" in omitted_cols:
            break
        iid = row.get("imdb_id")
        if not iid or (row.get("country") or "").strip():
            continue
        cached_country = (omdb_cache.get(iid, {}).get("country") or "").strip()
        if not cached_country:
            continue
        sb.patch_by_imdb_id("movies", iid, {"country": cached_country}, omitted_cols=omitted_cols)
        if "country" not in omitted_cols:
            updated += 1
    return updated


def export_country_map_json(
    omdb_cache: dict[str, dict[str, Any]],
    movies_rows: list[dict[str, Any]] | None = None,
    output_path: str | Path | None = None,
) -> dict[str, str]:
    """
    web/country_map.json（{ "ttXXXX": "United States, United Kingdom" }）を生成して書き出す。
    DBに country カラムが未反映な環境でもフロントエンドが100%製作国を判定できるようにする。
    """
    country_map: dict[str, str] = {}
    for iid, row in (omdb_cache or {}).items():
        c = (row.get("country") or "").strip()
        if iid and c:
            country_map[iid] = c
    for row in movies_rows or []:
        iid = row.get("imdb_id")
        c = (row.get("country") or "").strip()
        if iid and c:
            country_map[iid] = c

    path = Path(output_path) if output_path is not None else DEFAULT_COUNTRY_MAP_PATH
    path.parent.mkdir(parents=True, exist_ok=True)
    ordered = {k: country_map[k] for k in sorted(country_map.keys())}
    path.write_text(json.dumps(ordered, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return ordered


def _parse_iso_datetime_utc(value: Any) -> Optional[datetime]:
    """ISO8601文字列をUTCのaware datetimeへパースする。失敗時は None を返す。"""
    if not value or not isinstance(value, str):
        return None
    raw = value.strip()
    if not raw:
        return None
    if raw.endswith("Z"):
        raw = raw[:-1] + "+00:00"
    try:
        parsed = datetime.fromisoformat(raw)
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    else:
        parsed = parsed.astimezone(timezone.utc)
    return parsed


def is_omdb_cache_fresh(
    cache_entry: Optional[Dict[str, Any]],
    release_year: int,
    current_year: int,
    recent_ttl_days: int = 14,
    now_dt: Optional[datetime] = None,
) -> bool:
    """
    OMDb キャッシュが有効（再取得不要）かどうかを判定する。
      - cache_entry が None（未キャッシュ） -> False
      - 直近2年（release_year >= current_year - 1） -> fetched_at から recent_ttl_days 日未満なら True、以上・欠損・不正なら False
      - 3年以上前（release_year < current_year - 1） -> 既存キャッシュが存在すれば True（API枠節約）
    """
    if cache_entry is None:
        return False

    if release_year < current_year - 1:
        return True

    fetched_dt = _parse_iso_datetime_utc(cache_entry.get("fetched_at"))
    if fetched_dt is None:
        return False

    ref_now = now_dt if now_dt is not None else datetime.now(timezone.utc)
    if ref_now.tzinfo is None:
        ref_now = ref_now.replace(tzinfo=timezone.utc)
    else:
        ref_now = ref_now.astimezone(timezone.utc)

    age = ref_now - fetched_dt
    return age < timedelta(days=recent_ttl_days)


def plan_omdb_fetch_and_sync_years(
    candidates_by_year: dict[int, list[dict[str, Any]]],
    omdb_cache: dict[str, dict[str, Any]],
    existing_movie_counts_by_year: dict[int, int],
    current_year: int,
    mode: str = "weekly",
    recent_ttl_days: int = 14,
    now_dt: Optional[datetime] = None,
    min_movies_per_year: int = 25,
) -> dict[str, Any]:
    """
    OMDb取得の優先順リストと、年ごとの「再計算・movies同期」必要性判定材料を組み立てる純粋関数。

    優先1（直近2年: current_year, current_year - 1）:
      - 未キャッシュ または TTL期限切れ（not is_omdb_cache_fresh）の候補を優先取得対象に並べる。
      - 直近2年は常にランキング再計算・movies同期の対象候補とする。
    優先2（それ以前の過去年: current_year - 2 〜 1980 へ降順）:
      - 未キャッシュ（not is_omdb_cache_fresh）の候補を新しい年順に並べる。
      - 既存の movies 収録数が min_movies_per_year 未満の年、または新規にOMDb取得が発生した年のみ
        movies 同期（TMDB再取得含む）対象とみなす。
    """
    years_desc = sorted(candidates_by_year.keys(), reverse=True)
    recent_years = [y for y in years_desc if y >= current_year - 1]
    backfill_years = [y for y in years_desc if y < current_year - 1]

    priority1_queue: list[tuple[int, dict[str, Any]]] = []
    for y in recent_years:
        for cand in candidates_by_year.get(y, []):
            iid = cand["imdb_id"]
            if not is_omdb_cache_fresh(
                omdb_cache.get(iid),
                release_year=y,
                current_year=current_year,
                recent_ttl_days=recent_ttl_days,
                now_dt=now_dt,
            ):
                priority1_queue.append((y, cand))

    priority2_queue: list[tuple[int, dict[str, Any]]] = []
    if mode in ("weekly", "backfill"):
        for y in backfill_years:
            for cand in candidates_by_year.get(y, []):
                iid = cand["imdb_id"]
                if not is_omdb_cache_fresh(
                    omdb_cache.get(iid),
                    release_year=y,
                    current_year=current_year,
                    recent_ttl_days=recent_ttl_days,
                    now_dt=now_dt,
                ):
                    priority2_queue.append((y, cand))

    ordered_years_for_sync = recent_years + backfill_years
    return {
        "recent_years": recent_years,
        "backfill_years": backfill_years,
        "priority1_queue": priority1_queue,
        "priority2_queue": priority2_queue,
        "fetch_queue": priority1_queue + priority2_queue,
        "ordered_years_for_sync": ordered_years_for_sync,
        "existing_movie_counts_by_year": dict(existing_movie_counts_by_year),
        "min_movies_per_year": min_movies_per_year,
    }


def should_sync_year_movies(
    year: int,
    current_year: int,
    mode: str,
    newly_fetched_years: set[int],
    existing_movie_counts_by_year: dict[int, int],
    min_movies_per_year: int = 25,
) -> bool:
    """
    その年の TOP25 再計算 & TMDB取得 & movies UPSERT を実行すべきかを判定する。
      - 直近2年（year >= current_year - 1）は常に同期対象（IMDbスコア・投票数変動も反映）。
      - 3年以上前の過去年は:
          * backfill 明示実行時は従来通りすべて同期対象（ただしキャッシュ閾値チェックは呼び出し側で実施）。
          * weekly 実行時は「今回新規OMDb取得があった年」または「moviesの収録数が25本未満の年」のみ同期し、
            既に25本揃っていて変更がない過去年の無駄なTMDB再取得をスキップして高速化する。
    """
    if year >= current_year - 1:
        return True
    if mode == "backfill":
        return True
    if year in newly_fetched_years:
        return True
    if existing_movie_counts_by_year.get(year, 0) < min_movies_per_year:
        return True
    return False


def main() -> None:
    load_dotenv()
    current_year = dt.date.today().year

    parser = argparse.ArgumentParser(description="Core Cinema Archive データ自動同期バッチ")
    parser.add_argument("--mode", choices=["weekly", "backfill"], default="weekly")
    parser.add_argument("--start-year", type=int, default=None)
    parser.add_argument("--end-year", type=int, default=current_year)
    parser.add_argument("--max-omdb-calls", type=int, default=800, help="1回の実行で叩くOMDb上限（無料枠1日1,000件に対する安全枠）")
    parser.add_argument("--recent-ttl-days", type=int, default=14, help="直近2年（今年・前年）のOMDbキャッシュ有効日数")
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

    # weekly モードでも余剰OMDb枠で 1980年〜現在 まで自動バックフィルできるようデフォルトは 1980
    start_year = args.start_year if args.start_year is not None else 1980

    omdb_key = os.getenv("OMDB_API_KEY", "")
    tmdb_key = os.getenv("TMDB_API_KEY", "")
    sb_url = os.getenv("SUPABASE_URL", "")
    sb_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

    if not omdb_key or not tmdb_key:
        raise SystemExit("エラー: OMDB_API_KEY と TMDB_API_KEY を環境変数に設定してください。")
    if not args.dry_run and (not sb_url or not sb_key):
        raise SystemExit("エラー: SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を設定してください。")

    sb = None if args.dry_run else SupabaseClient(sb_url, sb_key)

    # 1. IMDb一次候補抽出（TMDB日本映画Discover ＋ IMDb TSVマルチバケット）
    candidates_by_year = download_imdb_candidates(
        start_year=start_year,
        end_year=args.end_year,
        candidates_per_year=60,
        include_animation=args.include_animation,
        tmdb_api_key=tmdb_key,
    )

    # 2. OMDbキャッシュ & 既存movies状況読み込み
    print("[2/4] OMDb キャッシュ照合・新作TTL更新＆余剰枠での過去年自動バックフィルを実行中...", flush=True)
    omdb_cache: dict[str, dict[str, Any]] = {}
    existing_movie_rows: list[dict[str, Any]] = []
    existing_movie_counts_by_year: dict[int, int] = defaultdict(int)
    if sb is not None:
        for row in sb.select_all("omdb_cache"):
            omdb_cache[row["imdb_id"]] = row
        existing_movie_rows = sb.select_all(
            "movies",
            select="imdb_id,release_year,ai_summary,mood_tags,country,jp_providers,newly_flatrate_providers,newly_flatrate_at",
        )
        for row in existing_movie_rows:
            yr = row.get("release_year")
            if isinstance(yr, int):
                existing_movie_counts_by_year[yr] += 1

    existing_movies_by_id = {row["imdb_id"]: row for row in existing_movie_rows if row.get("imdb_id")}

    omdb_calls = 0
    new_cache_rows: list[dict[str, Any]] = []
    newly_fetched_years: set[int] = set()
    quota_reached = False
    now_utc = datetime.now(timezone.utc)

    # 既知シードデータをキャッシュに補完（OMDb API上限到達時でも重要作を即時反映するため）
    seed_now_iso = now_utc.isoformat()
    for seed_id, seed_info in KNOWN_OMDB_SEED_DATA.items():
        if seed_id not in omdb_cache:
            seed_row = {
                "imdb_id": seed_id,
                "metascore": seed_info.get("metascore"),
                "rt_score": seed_info.get("rt_score"),
                "awards_text": seed_info.get("awards_text"),
                "director": seed_info.get("director"),
                "country": seed_info.get("country"),
                "language": seed_info.get("language"),
                "fetched_at": seed_now_iso,
            }
            omdb_cache[seed_id] = seed_row
            new_cache_rows.append(seed_row)

    plan = plan_omdb_fetch_and_sync_years(
        candidates_by_year=candidates_by_year,
        omdb_cache=omdb_cache,
        existing_movie_counts_by_year=dict(existing_movie_counts_by_year),
        current_year=current_year,
        mode=args.mode,
        recent_ttl_days=args.recent_ttl_days,
        now_dt=now_utc,
        min_movies_per_year=25,
    )
    print(
        f"  -> 取得計画: 優先1(直近2年・TTL切れ/未取得)={len(plan['priority1_queue'])}件, "
        f"優先2(過去年自動バックフィル候補)={len(plan['priority2_queue'])}件, "
        f"OMDb上限={args.max_omdb_calls}件",
        flush=True,
    )

    for year, cand in plan["fetch_queue"]:
        if quota_reached:
            break
        iid = cand["imdb_id"]
        if omdb_calls >= args.max_omdb_calls:
            print(
                f"  -> 本日のOMDb上限 ({args.max_omdb_calls}件) に到達。途中キャッシュを保存して次の工程へ進みます。",
                flush=True,
            )
            quota_reached = True
            break
        try:
            detail = fetch_omdb_detail(iid, omdb_key)
            omdb_calls += 1
            if detail:
                detail["fetched_at"] = datetime.now(timezone.utc).isoformat()
                omdb_cache[iid] = detail
                new_cache_rows.append(detail)
                newly_fetched_years.add(year)
            time.sleep(0.05)
        except Exception as exc:
            print(f"  [WARN] OMDb取得エラー ({iid}): {exc}", file=sys.stderr)
            if "無料枠" in str(exc) or "レート制限" in str(exc):
                quota_reached = True
                break

    if sb is not None and new_cache_rows:
        sb.upsert("omdb_cache", new_cache_rows)
        print(
            f"  -> OMDb新規・再取得キャッシュ保存: {len(new_cache_rows)}件 (API呼出={omdb_calls}件)",
            flush=True,
        )

    # 3. 年ごとのスコアリング & ハイブリッド25本選出 + TMDB日本語・配信取得
    print("[3/4] 年別ハイブリッド25本選出 & TMDB日本語・配信情報を取得中...", flush=True)
    all_selected_records: list[dict[str, Any]] = []
    processed_years: dict[int, set[str]] = {}
    now_dt_sync = datetime.now(timezone.utc)
    now_iso = now_dt_sync.isoformat()

    for year in plan["ordered_years_for_sync"]:
        year_cands = candidates_by_year[year]
        if not should_sync_year_movies(
            year=year,
            current_year=current_year,
            mode=args.mode,
            newly_fetched_years=newly_fetched_years,
            existing_movie_counts_by_year=dict(existing_movie_counts_by_year),
            min_movies_per_year=25,
        ):
            continue

        # OMDbキャッシュが一定数以上揃っていれば選出を実行（30本以上または60%以上で即時同期）
        cached_count = sum(1 for c in year_cands if c["imdb_id"] in omdb_cache)
        min_required_cached = min(30, math.ceil(len(year_cands) * 0.6)) if year_cands else 0
        if year_cands and cached_count < min_required_cached:
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
                "country": od.get("country") or "",
                "language": od.get("language") or None,
            }
            enriched.append(merged)

        top25 = select_yearly_top25(enriched, target_count=25, top_n=12, max_indian_per_year=2)
        processed_years[year] = {item["imdb_id"] for item in top25}
        for item in top25:
            tmdb_info = fetch_tmdb_jp_metadata(item["imdb_id"], tmdb_key)
            time.sleep(0.04)
            new_providers = tmdb_info.get("jp_providers") or {
                "flatrate": [],
                "rent": [],
                "buy": [],
                "link": None,
            }
            prev_row = existing_movies_by_id.get(item["imdb_id"])
            newly_provs, newly_at = compute_newly_flatrate_update(
                prev_providers=prev_row.get("jp_providers") if prev_row else None,
                new_providers=new_providers,
                prev_newly_providers=prev_row.get("newly_flatrate_providers") if prev_row else None,
                prev_newly_at=prev_row.get("newly_flatrate_at") if prev_row else None,
                now_dt=now_dt_sync,
                retention_days=14,
            )
            record = {
                "imdb_id": item["imdb_id"],
                "tmdb_id": tmdb_info.get("tmdb_id"),
                "release_year": item["release_year"],
                "year_rank": item["year_rank"],
                "title_ja": tmdb_info.get("title_ja") or item["title_en"],
                "title_en": item["title_en"],
                "original_title": item.get("original_title"),
                "original_language": tmdb_info.get("original_language") or item.get("original_language") or item.get("language"),
                "poster_url": tmdb_info.get("poster_url"),
                "backdrop_url": tmdb_info.get("backdrop_url"),
                "runtime_minutes": item.get("runtime_minutes"),
                "genres": item["genres"],
                "director": item.get("director"),
                "country": item.get("country") or "",
                "selection_slot": item["selection_slot"],
                "selection_category": item["selection_category"],
                "composite_score": item["composite_score"],
                "imdb_rating": item["imdb_rating"],
                "imdb_votes": item["imdb_votes"],
                "metascore": item.get("metascore"),
                "rt_score": item.get("rt_score"),
                "awards_text": item.get("awards_text"),
                "awards_bonus": item["awards_bonus"],
                "jp_providers": new_providers,
                "newly_flatrate_providers": newly_provs,
                "newly_flatrate_at": newly_at,
                "overview_ja": tmdb_info.get("overview_ja"),
                "ai_summary": None,
                "mood_tags": [],
                "updated_at": now_iso,
            }
            record["mood_tags"] = generate_mood_tags(record)
            all_selected_records.append(record)

        print(f"  - {year}年: {len(top25)}本確定 (OMDbキャッシュ: {cached_count}/{len(year_cands)})", flush=True)

    if args.dry_run:
        print(json.dumps(all_selected_records[:10], ensure_ascii=False, indent=2))
        print(f"[DRY-RUN] 合計 {len(all_selected_records)}本を選出しました。")
        return

    assert sb is not None
    watch_status_rows = sb.select_all("user_watch_status", select="imdb_id")
    protected_watch_ids = {row["imdb_id"] for row in watch_status_rows if row.get("imdb_id")}

    # 再選出された年のうち、新しいTOP25から外れ、かつ user_watch_status で保護されていない古いレコードを掃除
    stale_ids: list[str] = []
    for row in existing_movie_rows:
        y = row.get("release_year")
        iid = row.get("imdb_id")
        if y in processed_years and iid and iid not in processed_years[y] and iid not in protected_watch_ids:
            stale_ids.append(iid)

    upsert_rows = preserve_ai_enrichment(all_selected_records, existing_movie_rows)
    if upsert_rows:
        sb.upsert("movies", upsert_rows)
    print(f"  -> Supabase movies 同期完了: {len(upsert_rows)}本", flush=True)

    if stale_ids:
        sb.delete_by_imdb_ids("movies", stale_ids)
        print(f"  -> 選出入れ替えに伴う未評価の旧レコード整理: {len(stale_ids)}本削除（視聴記録ありは保護）", flush=True)

    # 既存収録作の country 未設定行を omdb_cache からバックフィル & web/country_map.json を出力
    backfilled_country = backfill_movies_country_from_cache(sb, omdb_cache)
    if backfilled_country:
        print(f"  -> omdb_cache から既存 movies.country を補完: {backfilled_country}本", flush=True)
    exported_map = export_country_map_json(omdb_cache, upsert_rows)
    print(f"  -> web/country_map.json 更新完了: {len(exported_map)}件", flush=True)

    # 4. 週次モード時は全収録作品の配信状況も一括最新化（＋Supabase無料枠スリープ防止）
    if args.mode == "weekly":
        refresh_all_jp_providers(sb, tmdb_key)

    print("すべての処理が正常に完了しました。", flush=True)


if __name__ == "__main__":
    main()
