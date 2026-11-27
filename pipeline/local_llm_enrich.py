"""
Core Cinema Archive - Phase 2 ローカルLLM補完スクリプト（任意実行）

自宅PCのローカルLLM（Ollama / LM Studio / vLLM など OpenAI互換API）を使い、
Supabase上で `ai_summary` が未設定の作品に対してのみ：
  1. ネタバレなしの「観るべき理由」（2〜3行の日本語推薦文）
  2. 気分で探せるムードタグ（3〜5個）
を自動生成して Supabase へ同期します。

使い方例（Ollamaで qwen2.5:14b や gemma3:12b 等を動かしている場合）:
  export LOCAL_LLM_BASE_URL="http://localhost:11434/v1"
  export LOCAL_LLM_MODEL="gemma3:12b"
  python pipeline/local_llm_enrich.py --limit 50
"""

from __future__ import annotations

import argparse
import json
import re
import os
import sys
from typing import Any

import requests
from dotenv import load_dotenv

try:
    from mood_tagger import MOOD_TAG_CATALOG
except ImportError:
    from pipeline.mood_tagger import MOOD_TAG_CATALOG

TAG_GUIDE_EXAMPLES = " / ".join(MOOD_TAG_CATALOG)

SYSTEM_PROMPT = f"""あなたは映画キュレーターです。
与えられた映画のメタデータをもとに、以下のJSON形式のみを出力してください（余計な前置きやマークダウンは不要）。
{{
  "ai_summary": "ネタバレなしで、この映画がなぜ面白いのか・見どころは何かを日本語2〜3文（120〜180文字程度）で簡潔に書く。",
  "mood_tags": ["重厚サスペンス", "批評家絶賛", "余韻ドラマ"]
}}
mood_tags は2〜4個、日本語の短いタグにしてください。可能な限り以下の統一タグ体系を優先して使用してください：
{TAG_GUIDE_EXAMPLES}"""


def generate_enrichment(
    base_url: str,
    model: str,
    api_key: str,
    movie: dict[str, Any],
) -> dict[str, Any]:
    user_prompt = (
        f"邦題: {movie.get('title_ja')}\n"
        f"原題: {movie.get('title_en')}\n"
        f"公開年: {movie.get('release_year')}\n"
        f"監督: {movie.get('director') or '不明'}\n"
        f"ジャンル: {', '.join(movie.get('genres') or [])}\n"
        f"選出枠: {movie.get('selection_category')}\n"
        f"評価: IMDb {movie.get('imdb_rating')} / Metascore {movie.get('metascore')} / RT {movie.get('rt_score')}%\n"
        f"受賞歴: {movie.get('awards_text') or '特記なし'}\n"
        f"あらすじ: {movie.get('overview_ja') or 'なし'}"
    )
    resp = requests.post(
        f"{base_url.rstrip('/')}/chat/completions",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": model,
            "temperature": 0.4,
                        "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
        },
        timeout=120,
    )
    resp.raise_for_status()
    if resp.status_code >= 400:
        raise RuntimeError(f"LLM API {resp.status_code}: {resp.text}")
    content = resp.json()["choices"][0]["message"]["content"]
    content = re.sub(r"<think>.*?</think>", "", content, flags=re.S).strip()
    m = re.search(r"\{.*\}", content, flags=re.S)
    parsed = json.loads(m.group(0) if m else content)
    return {
        "ai_summary": str(parsed.get("ai_summary", "")).strip(),
        "mood_tags": [str(t).strip() for t in (parsed.get("mood_tags") or []) if str(t).strip()][:5],
    }


def normalize_supabase_url(url: str) -> str:
    cleaned = (url or "").strip().rstrip("/")
    if cleaned.endswith("/rest/v1"):
        cleaned = cleaned[: -len("/rest/v1")].rstrip("/")
    return cleaned


def build_supabase_headers(api_key: str) -> dict[str, str]:
    headers: dict[str, str] = {
        "apikey": api_key,
        "Content-Type": "application/json",
    }
    if not api_key.startswith("sb_"):
        headers["Authorization"] = f"Bearer {api_key}"
    return headers


def main() -> None:
    load_dotenv()
    parser = argparse.ArgumentParser(description="ローカルLLMで推薦文・ムードタグをSupabaseへ同期")
    parser.add_argument("--limit", type=int, default=30, help="1回の実行で処理する最大件数")
    args = parser.parse_args()

    sb_url = normalize_supabase_url(os.getenv("SUPABASE_URL", ""))
    sb_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()
    llm_url = os.getenv("LOCAL_LLM_BASE_URL", "http://localhost:11434/v1")
    llm_model = os.getenv("LOCAL_LLM_MODEL", "gemma3:12b")
    llm_key = os.getenv("LOCAL_LLM_API_KEY", "ollama")

    if not sb_url or not sb_key:
        raise SystemExit("エラー: SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を設定してください。")

    headers = build_supabase_headers(sb_key)

    resp = requests.get(
        f"{sb_url}/rest/v1/movies",
        headers=headers,
        params={
            "select": "imdb_id,title_ja,title_en,release_year,director,genres,selection_category,imdb_rating,metascore,rt_score,awards_text,overview_ja",
            "ai_summary": "is.null",
            "order": "release_year.desc,year_rank.asc",
            "limit": str(args.limit),
        },
        timeout=30,
    )
    resp.raise_for_status()
    targets = resp.json()
    print(f"未生成の対象映画: {len(targets)}件（モデル: {llm_model}）", flush=True)

    for idx, movie in enumerate(targets, start=1):
        try:
            enriched = generate_enrichment(llm_url, llm_model, llm_key, movie)
            patch = requests.patch(
                f"{sb_url}/rest/v1/movies",
                headers=headers,
                params={"imdb_id": f"eq.{movie['imdb_id']}"},
                json=enriched,
                timeout=30,
            )
            patch.raise_for_status()
            print(f"[{idx}/{len(targets)}] 完了: {movie['title_ja']} ({movie['release_year']})", flush=True)
        except Exception as exc:
            print(f"[{idx}/{len(targets)}] スキップ ({movie['imdb_id']}): {exc}", file=sys.stderr)


if __name__ == "__main__":
    main()
