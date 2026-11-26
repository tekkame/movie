"""
Core Cinema Archive - 既存映画データへの統一ムードタグ一括反映スクリプト（追加APIゼロ / Phase 2互換）

使い方:
  # ドライラン（DB更新せず件数とサンプルを確認）
  python3 pipeline/backfill_mood_tags.py --dry-run

  # 未設定レコードのみ本番反映（ai_summary IS NULL かつ mood_tags が空/NULL）
  python3 pipeline/backfill_mood_tags.py

  # ai_summary IS NULL の全件に対して統一ムードタグを再計算して反映
  python3 pipeline/backfill_mood_tags.py --force
"""

from __future__ import annotations

import argparse
import os
import sys
from typing import Any

from dotenv import load_dotenv
import requests

try:
    from fetch_and_sync import SupabaseClient
    from mood_tagger import generate_mood_tags
except ImportError:
    from pipeline.fetch_and_sync import SupabaseClient
    from pipeline.mood_tagger import generate_mood_tags


MOVIE_SELECT_FIELDS = (
    "imdb_id,title_ja,title_en,release_year,genres,director,awards_text,"
    "runtime_minutes,original_language,country,imdb_rating,imdb_votes,"
    "metascore,rt_score,overview_ja,ai_summary,mood_tags"
)


def is_eligible_for_mood_backfill(row: dict[str, Any], force: bool = False) -> bool:
    """
    Phase 2 ローカルLLM生成済み行（ai_summary が非空）は上書きしない。
    それ以外について、force=True または mood_tags が空/NULL の行のみ対象にする。
    """
    ai_summary = row.get("ai_summary")
    if ai_summary is not None and str(ai_summary).strip():
        return False
    if force:
        return True
    current_tags = row.get("mood_tags")
    return not current_tags or len(current_tags) == 0


def backfill_mood_tags(
    sb: SupabaseClient,
    *,
    dry_run: bool = False,
    force: bool = False,
) -> dict[str, int]:
    rows = sb.select_all("movies", select=MOVIE_SELECT_FIELDS, page_size=1000)
    total = len(rows)
    skipped_llm = 0
    skipped_existing = 0
    updated = 0

    with requests.Session() as session:
        session.headers.update(sb.headers)
        for idx, row in enumerate(rows, start=1):
            iid = row.get("imdb_id")
            if not iid:
                continue
            ai_summary = row.get("ai_summary")
            if ai_summary is not None and str(ai_summary).strip():
                skipped_llm += 1
                continue
            if not is_eligible_for_mood_backfill(row, force=force):
                skipped_existing += 1
                continue

            tags = generate_mood_tags(row)
            if dry_run:
                if updated < 10:
                    print(
                        f"[DRY-RUN] {iid} | {row.get('title_ja')} ({row.get('release_year')}) -> {tags}",
                        flush=True,
                    )
                updated += 1
                continue

            resp = session.patch(
                f"{sb.base_url}/movies",
                params={"imdb_id": f"eq.{iid}"},
                json={"mood_tags": tags},
                timeout=20,
            )
            resp.raise_for_status()
            updated += 1
            if updated % 100 == 0:
                print(f"  -> 進捗: {updated}件更新済み (全{total}件中 {idx}件確認)", flush=True)

    return {
        "total": total,
        "updated": updated,
        "skipped_llm": skipped_llm,
        "skipped_existing": skipped_existing,
    }


def main() -> None:
    load_dotenv()
    parser = argparse.ArgumentParser(description="既存moviesテーブルのmood_tagsを一括補完（追加APIゼロ）")
    parser.add_argument("--dry-run", action="store_true", help="DBを更新せずに結果のみ確認")
    parser.add_argument(
        "--force",
        action="store_true",
        help="ai_summary IS NULL の行について既存の mood_tags も再生成で上書きする",
    )
    args = parser.parse_args()

    sb_url = os.getenv("SUPABASE_URL", "").strip()
    sb_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()
    if not sb_url or not sb_key:
        raise SystemExit("エラー: SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を設定してください。")

    sb = SupabaseClient(sb_url, sb_key)
    stats = backfill_mood_tags(sb, dry_run=args.dry_run, force=args.force)
    mode_label = "DRY-RUN" if args.dry_run else "完了"
    print(
        f"[{mode_label}] total={stats['total']}, updated={stats['updated']}, "
        f"skipped_llm={stats['skipped_llm']}, skipped_existing={stats['skipped_existing']}",
        flush=True,
    )


if __name__ == "__main__":
    if sys.stdout.encoding != "utf-8":
        sys.stdout.reconfigure(encoding="utf-8")
    main()
