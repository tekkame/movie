"""
Core Cinema Archive - Phase 2 ローカルLLM補完スクリプト（LM Studio / Ollama 互換）

自宅PCのローカルLLM（LM Studio / Ollama / vLLM など OpenAI互換API）を使い、
Supabase上で `ai_catchcopy IS NULL OR vibe_scores IS NULL` の作品に対して：
  1. ai_catchcopy: 雑誌風の短いキャッチコピー（12〜20文字・ネタバレなし）
  2. ai_summary: ネタバレなしの「観るべき理由」（日本語2〜3文・120〜180文字）
  3. mood_tags: 統一タグ体系（MOOD_TAG_CATALOG）に沿った日本語ムードタグ（3〜4個）
  4. vibe_scores: 5軸スコア（pace, mind, immersion, heaviness, family 各1〜5整数）
  5. overview_ja: 空または英語中心の場合のみ日本語あらすじを生成（既存の良い日本語は保持）
を1回の推論で生成し、1件ごとに即座に Supabase へ PATCH 同期します（中断・再開安全）。

使い方例（LM Studio の場合）:
  export LOCAL_LLM_BASE_URL="http://localhost:1234/v1"
  export LOCAL_LLM_MODEL="qwen2.5-14b-instruct"
  python pipeline/local_llm_enrich.py --limit 50
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from typing import Any, Mapping

import requests
from dotenv import load_dotenv

try:
    from mood_tagger import MOOD_TAG_CATALOG, generate_mood_tags
except ImportError:
    from pipeline.mood_tagger import MOOD_TAG_CATALOG, generate_mood_tags

TAG_GUIDE_EXAMPLES = " / ".join(MOOD_TAG_CATALOG)
VIBE_KEYS: tuple[str, ...] = ("pace", "mind", "immersion", "heaviness", "family")

SYSTEM_PROMPT = f"""あなたは映画雑誌の編集者兼シネマキュレーターです。
与えられた映画のメタデータをもとに、以下のJSONオブジェクトのみを出力してください。
前置き、解説、Markdownコードフェンス（```）、思考ログは一切出力しないでください。

出力JSONスキーマ:
{{
  "ai_catchcopy": "12〜20文字の雑誌風キャッチコピー（ネタバレ厳禁、体言止めや余韻のある短い一文）",
  "ai_summary": "ネタバレなしで、この映画がなぜ面白いのか・見どころは何かを日本語2〜3文（120〜180文字程度）で書く。",
  "mood_tags": ["重厚サスペンス", "批評家絶賛", "余韻ドラマ"],
  "vibe_scores": {{
    "pace": 3,
    "mind": 3,
    "immersion": 4,
    "heaviness": 3,
    "family": 2
  }},
  "overview_ja": "既存のあらすじが空または英語の場合のみ、ネタバレなしの日本語あらすじを2〜3文で書く。すでに十分な日本語あらすじがある場合は空文字 \"\" にする。"
}}

ルール:
1. mood_tags は3〜4個、以下の統一タグ体系から優先して選んでください:
   {TAG_GUIDE_EXAMPLES}
2. vibe_scores は各項目を必ず 1〜5 の整数で評価してください:
   - pace: 1=静か・スロー 〜 5=怒涛の展開・ノンストップ
   - mind: 1=頭を空っぽにして楽しめる 〜 5=考察必須・難解・緻密
   - immersion: 1=会話劇中心 〜 5=映画館級の映像・音響没入感
   - heaviness: 1=爽快・軽やか 〜 5=重厚・ヘビー・衝撃的
   - family: 1=暴力/ホラー/過激描写あり 〜 5=家族で安心して観られる
3. ai_catchcopy と ai_summary に結末のネタバレを含めないでください。"""


def strip_thinking_and_fences(raw_text: str) -> str:
    """
    LM Studio / 推論モデルが出力する <think>...</think> ブロックや
    Markdown コードフェンス（```json ... ```）を取り除く純粋関数。
    """
    text = str(raw_text or "")
    # <think>...</think>（複数・改行含む・大文字小文字問わず）を除去
    text = re.sub(r"<think\b[^>]*>.*?</think>", "", text, flags=re.IGNORECASE | re.DOTALL)
    # 閉じタグが途切れた場合の <think>... も最初の '{' 直前まで除去
    if re.search(r"<think\b", text, flags=re.IGNORECASE):
        text = re.sub(r"<think\b[^>]*>.*?(?=\{|$)", "", text, flags=re.IGNORECASE | re.DOTALL)

    text = text.strip()
    # ```json ... ``` や ``` ... ``` のフェンスを除去
    fence_match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text, flags=re.IGNORECASE)
    if fence_match:
        text = fence_match.group(1).strip()
    else:
        text = re.sub(r"^```(?:json)?\s*", "", text, flags=re.IGNORECASE)
        text = re.sub(r"\s*```$", "", text)
    return text.strip()


def extract_json_object(raw_text: str) -> dict[str, Any]:
    """
    LLM出力文字列から JSON オブジェクトを堅牢に抽出して dict を返す純粋関数。
    """
    cleaned = strip_thinking_and_fences(raw_text)
    if not cleaned:
        raise ValueError("LLM response is empty after stripping")

    try:
        parsed = json.loads(cleaned)
        if isinstance(parsed, dict):
            return parsed
    except json.JSONDecodeError:
        pass

    decoder = json.JSONDecoder()
    for idx, ch in enumerate(cleaned):
        if ch != "{":
            continue
        try:
            obj, _end = decoder.raw_decode(cleaned[idx:])
            if isinstance(obj, dict):
                return obj
        except json.JSONDecodeError:
            continue

    raise ValueError(f"Valid JSON object not found in LLM response: {cleaned[:160]}")


def clamp_vibe_score(value: Any, default: int = 3) -> int:
    """
    1〜5の整数に丸め＆クランプする純粋関数（boolや不正値はdefaultを返す）。
    """
    if isinstance(value, bool) or value is None:
        return default
    if isinstance(value, str):
        s = value.strip()
        if not s:
            return default
        # "4/5" や "★4" のような表記にも一応耐える
        m = re.search(r"-?\d+(?:\.\d+)?", s)
        if not m:
            return default
        s = m.group(0)
        try:
            num = float(s)
        except ValueError:
            return default
    elif isinstance(value, (int, float)):
        num = float(value)
    else:
        return default

    if num != num or num in (float("inf"), float("-inf")):
        return default
    rounded = int(round(num))
    return max(1, min(5, rounded))


def validate_vibe_scores(raw: Any, default: int = 3) -> dict[str, int]:
    """
    5軸の vibe_scores を検証し、必ず全キーが 1..5 の整数になった辞書を返す純粋関数。
    """
    src = raw if isinstance(raw, Mapping) else {}
    return {key: clamp_vibe_score(src.get(key), default=default) for key in VIBE_KEYS}


def _count_ja_and_ascii_chars(text: str) -> tuple[int, int]:
    ja_count = len(re.findall(r"[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]", text))
    ascii_letters = len(re.findall(r"[A-Za-z]", text))
    return ja_count, ascii_letters


def needs_japanese_overview(overview: Any) -> bool:
    """
    overview_ja が空・未設定・または英語中心で日本語補完が必要かを判定する純粋関数。
    すでに十分な日本語あらすじがある場合は False を返す。
    """
    text = str(overview or "").strip()
    if not text:
        return True
    ja_count, ascii_letters = _count_ja_and_ascii_chars(text)
    if ja_count == 0:
        return True
    total = ja_count + ascii_letters
    if ascii_letters >= 20 and total > 0 and (ja_count / total) < 0.25:
        return True
    if ja_count < 10 and ascii_letters > ja_count * 2:
        return True
    return False


def validate_catchcopy(value: Any, max_len: int = 40) -> str | None:
    """
    ai_catchcopy を正規化・検証する純粋関数。空なら None を返す。
    """
    if value is None or isinstance(value, (bool, dict, list)):
        return None
    text = re.sub(r"\s+", " ", str(value)).strip()
    # 先頭・末尾の不要な括弧や引用符のみ軽く除去
    if len(text) >= 2 and (
        (text[0] == '"' and text[-1] == '"')
        or (text[0] == "'" and text[-1] == "'")
        or (text[0] == "「" and text[-1] == "」")
        or (text[0] == "『" and text[-1] == "』")
    ):
        text = text[1:-1].strip()
    if not text:
        return None
    if max_len > 0 and len(text) > max_len:
        text = text[:max_len].rstrip("、。・ ")
    return text or None


def validate_summary(value: Any, max_len: int = 320) -> str | None:
    """
    ai_summary を正規化・検証する純粋関数。短すぎる・空なら None を返す。
    """
    if value is None or isinstance(value, (bool, dict, list)):
        return None
    text = re.sub(r"\s+", " ", str(value)).strip()
    if len(text) < 10:
        return None
    if max_len > 0 and len(text) > max_len:
        text = text[:max_len].rstrip()
    return text


def validate_mood_tags(raw_tags: Any, movie: Mapping[str, Any] | None = None) -> list[str]:
    """
    ムードタグを MOOD_TAG_CATALOG と整合させつつ 3〜4個に正規化する純粋関数。
    """
    if isinstance(raw_tags, str):
        candidates = [p.strip() for p in re.split(r"[,、/]+", raw_tags) if p.strip()]
    elif isinstance(raw_tags, (list, tuple)):
        candidates = [str(t).strip() for t in raw_tags if str(t).strip()]
    else:
        candidates = []

    cleaned: list[str] = []
    for tag in candidates:
        t = tag.lstrip("#").strip()
        if t and t not in cleaned:
            cleaned.append(t)

    catalog_set = set(MOOD_TAG_CATALOG)
    selected: list[str] = [t for t in cleaned if t in catalog_set][:4]

    if len(selected) < 3 and movie is not None:
        for fallback_tag in generate_mood_tags(movie):
            if len(selected) >= 4:
                break
            if fallback_tag not in selected:
                selected.append(fallback_tag)

    # movie なしテスト等でカタログ一致が少ない場合は、日本語タグを補充
    if len(selected) < 3:
        for t in cleaned:
            if len(selected) >= 4:
                break
            if t not in selected and len(t) <= 20:
                selected.append(t)

    return selected[:4]


def validate_enrichment_payload(
    parsed: Mapping[str, Any],
    movie: Mapping[str, Any],
) -> dict[str, Any]:
    """
    LLM が返した JSON 辞書を検証し、Supabase PATCH 用の安全なペイロードを組み立てる純粋関数。
    """
    catchcopy = validate_catchcopy(parsed.get("ai_catchcopy"))
    if not catchcopy:
        raise ValueError("ai_catchcopy is empty or invalid")

    summary = validate_summary(parsed.get("ai_summary"))
    existing_summary = validate_summary(movie.get("ai_summary"))
    final_summary = summary or existing_summary
    if not final_summary:
        raise ValueError("ai_summary is empty or invalid")

    mood_tags = validate_mood_tags(parsed.get("mood_tags"), movie=movie)
    vibe_scores = validate_vibe_scores(parsed.get("vibe_scores"))

    payload: dict[str, Any] = {
        "ai_catchcopy": catchcopy,
        "ai_summary": final_summary,
        "mood_tags": mood_tags,
        "vibe_scores": vibe_scores,
    }

    if needs_japanese_overview(movie.get("overview_ja")):
        candidate_overview = validate_summary(parsed.get("overview_ja"), max_len=600)
        if candidate_overview and not needs_japanese_overview(candidate_overview):
            payload["overview_ja"] = candidate_overview

    return payload


def generate_enrichment(
    base_url: str,
    model: str,
    api_key: str,
    movie: Mapping[str, Any],
) -> dict[str, Any]:
    """
    OpenAI互換 `/chat/completions` を1回呼び出して v7 拡張メタデータを生成する。
    LM Studio 互換性のため `response_format` は絶対に送信しない。
    """
    existing_overview = str(movie.get("overview_ja") or "").strip()
    overview_note = (
        f"あらすじ（日本語補完が必要）: {existing_overview or 'なし'}"
        if needs_japanese_overview(existing_overview)
        else f"あらすじ（既存の日本語を保持するため overview_ja は空文字で可）: {existing_overview}"
    )

    user_prompt = (
        f"邦題: {movie.get('title_ja')}\n"
        f"原題: {movie.get('title_en')}\n"
        f"公開年: {movie.get('release_year')}\n"
        f"上映時間: {movie.get('runtime_minutes') or '不明'}分\n"
        f"監督: {movie.get('director') or '不明'}\n"
        f"ジャンル: {', '.join(movie.get('genres') or [])}\n"
        f"選出枠: {movie.get('selection_category')}\n"
        f"評価: IMDb {movie.get('imdb_rating')} / Metascore {movie.get('metascore')} / RT {movie.get('rt_score')}%\n"
        f"受賞歴: {movie.get('awards_text') or '特記なし'}\n"
        f"{overview_note}"
    )

    request_body = {
        "model": model,
        "temperature": 0.4,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
    }

    resp = requests.post(
        f"{base_url.rstrip('/')}/chat/completions",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json=request_body,
        timeout=180,
    )
    resp.raise_for_status()
    content = resp.json()["choices"][0]["message"]["content"]
    parsed = extract_json_object(content)
    return validate_enrichment_payload(parsed, movie)


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


def fetch_target_movies(
    sb_url: str,
    headers: dict[str, str],
    limit: int = 30,
) -> list[dict[str, Any]]:
    """
    `ai_catchcopy IS NULL OR vibe_scores IS NULL` の対象映画を取得する。
    limit <= 0 の場合は全件ページネーションで取得する。
    """
    select_fields = (
        "imdb_id,title_ja,title_en,release_year,runtime_minutes,director,genres,"
        "original_language,country,selection_category,imdb_rating,imdb_votes,"
        "metascore,rt_score,awards_text,overview_ja,ai_summary,ai_catchcopy,mood_tags,vibe_scores"
    )
    results: list[dict[str, Any]] = []
    seen_ids: set[str] = set()
    page_size = 500 if limit <= 0 else min(500, limit)
    offset = 0

    while True:
        batch_limit = page_size if limit <= 0 else min(page_size, limit - len(results))
        if batch_limit <= 0:
            break
        resp = requests.get(
            f"{sb_url}/rest/v1/movies",
            headers={
                **headers,
                "Range-Unit": "items",
                "Range": f"{offset}-{offset + batch_limit - 1}",
            },
            params={
                "select": select_fields,
                "or": "(ai_catchcopy.is.null,vibe_scores.is.null)",
                "order": "release_year.desc,year_rank.asc",
            },
            timeout=30,
        )
        resp.raise_for_status()
        batch = resp.json()
        if not batch:
            break
        for row in batch:
            iid = row.get("imdb_id")
            if iid and iid not in seen_ids:
                seen_ids.add(iid)
                results.append(row)
        if len(batch) < batch_limit:
            break
        offset += len(batch)

    return results


def main() -> None:
    load_dotenv()
    parser = argparse.ArgumentParser(description="ローカルLLMでキャッチコピー・推薦文・5軸vibeをSupabaseへ同期")
    parser.add_argument("--limit", type=int, default=30, help="1回の実行で処理する最大件数（0で全件）")
    parser.add_argument("--dry-run", action="store_true", help="SupabaseへPATCHせず推論結果のみ標準出力に表示")
    args = parser.parse_args()

    sb_url = normalize_supabase_url(os.getenv("SUPABASE_URL", ""))
    sb_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()
    llm_url = os.getenv("LOCAL_LLM_BASE_URL", "http://localhost:11434/v1")
    llm_model = os.getenv("LOCAL_LLM_MODEL", "gemma3:12b")
    llm_key = os.getenv("LOCAL_LLM_API_KEY", "ollama")

    if not sb_url or not sb_key:
        raise SystemExit("エラー: SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を設定してください。")

    headers = build_supabase_headers(sb_key)
    targets = fetch_target_movies(sb_url, headers, limit=args.limit)
    print(f"未生成の対象映画: {len(targets)}件（モデル: {llm_model}）", flush=True)

    done = 0
    for idx, movie in enumerate(targets, start=1):
        try:
            enriched = generate_enrichment(llm_url, llm_model, llm_key, movie)
            if args.dry_run:
                print(
                    f"[DRY-RUN {idx}/{len(targets)}] {movie['title_ja']} ({movie['release_year']}) -> "
                    f"{json.dumps(enriched, ensure_ascii=False)}",
                    flush=True,
                )
                done += 1
                continue

            patch = requests.patch(
                f"{sb_url}/rest/v1/movies",
                headers=headers,
                params={"imdb_id": f"eq.{movie['imdb_id']}"},
                json=enriched,
                timeout=30,
            )
            patch.raise_for_status()
            done += 1
            print(
                f"[{idx}/{len(targets)}] 完了: {movie['title_ja']} ({movie['release_year']}) | {enriched['ai_catchcopy']}",
                flush=True,
            )
        except Exception as exc:
            print(f"[{idx}/{len(targets)}] スキップ ({movie.get('imdb_id')}): {exc}", file=sys.stderr)

    print(f"処理完了: {done}/{len(targets)}件", flush=True)


if __name__ == "__main__":
    if sys.stdout.encoding != "utf-8":
        sys.stdout.reconfigure(encoding="utf-8")
    main()
