"""
Core Cinema Archive - スコアリング & 年別ハイブリッド20本選出ロジック
"""

from __future__ import annotations

import re
from typing import Any


# 各年20本のうち、総合上位12本を除いた残り8本を割り当てるジャンル・地域代表枠
GENRE_PICK_BUCKETS: list[tuple[str, int]] = [
    ("ホラー・スリラー枠", 2),
    ("SF・アクション枠", 2),
    ("非英語圏枠", 2),
    ("犯罪・ミステリー・コメディ枠", 2),
]

HORROR_THRILLER_GENRES = {"Horror", "Thriller"}
SCIFI_ACTION_GENRES = {"Sci-Fi", "Action", "Adventure", "Fantasy"}
CRIME_MYSTERY_COMEDY_GENRES = {"Crime", "Mystery", "Comedy"}


def parse_awards_bonus(awards_text: str | None) -> float:
    """
    OMDb API の Awards 文字列から映画賞ボーナス（0.0〜10.0点）を算出する。
    例: "Won 4 Oscars. 38 wins & 72 nominations total"
    """
    if not awards_text or awards_text.strip().upper() == "N/A":
        return 0.0

    text = awards_text.strip()
    lower = text.lower()

    # アカデミー賞・三大映画祭（カンヌ/ヴェネツィア/ベルリン）受賞
    if re.search(r"won\s+\d+\s+oscar", lower) or any(
        kw in lower for kw in ("palme d'or", "golden lion", "golden bear")
    ):
        return 10.0

    # アカデミー賞ノミネート・BAFTA受賞・ゴールデングローブ受賞
    if re.search(r"nominated\s+for\s+\d+\s+oscar", lower) or re.search(
        r"won\s+\d+\s+(bafta|golden globe)", lower
    ):
        return 5.0

    # 総受賞数による加点
    wins_match = re.search(r"(\d+)\s+win", lower)
    total_wins = int(wins_match.group(1)) if wins_match else 0
    if total_wins >= 15:
        return 4.0
    if total_wins >= 5:
        return 2.5
    if total_wins >= 1:
        return 1.0

    return 0.0


def compute_composite_score(
    imdb_rating: float | None,
    metascore: int | None,
    rt_score: int | None,
    awards_bonus: float = 0.0,
    imdb_votes: int | None = None,
) -> float:
    """
    批評家評価（最大50点）＋観客評価（最大40点）＋映画賞ボーナス（最大10点）
    の100点満点合成スコアを返す。
    - 批評家スコアが両方欠損している作品のうち、投票数が 80,000 未満のローカル偏重作品は
      信頼度ペナルティ（×0.82）を適用して不当な上位独占を防ぐ。
    - 逆に世界的ヒット（25万票以上）や批評家絶賛作（RT>=90 かつ Meta>=80）には
      僅かな浸透・完成度ボーナス（最大+2.5点、imdb_votes 指定時のみ）を加味する。
    """
    audience_100 = float(imdb_rating) * 10.0 if imdb_rating is not None else 0.0
    awards = max(0.0, min(10.0, float(awards_bonus)))

    critic_scores = [float(s) for s in (metascore, rt_score) if s is not None]
    if critic_scores:
        critic_100 = sum(critic_scores) / len(critic_scores)
        base_score = critic_100 * 0.50 + audience_100 * 0.40
    else:
        # 批評家スコア欠損時のフォールバック（極端な過大評価を防ぎつつ名作を救済）
        base_score = (audience_100 * 0.90) * 0.97
        if imdb_votes is not None and int(imdb_votes) < 80000:
            # 国際的な批評家スコアが一切なく投票数も少ないローカル偏重作品の偏りを抑制
            base_score *= 0.82

    # 世界的ヒット・批評家絶賛の浸透ボーナス（既存単体テストの後方互換性のため imdb_votes 指定時のみ）
    reach_bonus = 0.0
    if imdb_votes is not None:
        votes = int(imdb_votes)
        if votes >= 500000:
            reach_bonus += 1.5
        elif votes >= 250000:
            reach_bonus += 1.0
        if metascore is not None and rt_score is not None and metascore >= 80 and rt_score >= 90:
            reach_bonus += 1.0

    score = base_score + awards + reach_bonus
    return round(min(100.0, max(0.0, score)), 2)


def _is_non_english(movie: dict[str, Any]) -> bool:
    lang = (movie.get("original_language") or movie.get("language") or "").strip().lower()
    if not lang or lang == "n/a":
        return False
    # TMDBのISOコード（ja, ko, fr等）またはOMDbの言語文字列（"Japanese, English"等）両対応
    first_lang = lang.split(",")[0].strip()
    return first_lang not in ("en", "english")


def _matches_bucket(movie: dict[str, Any], bucket_name: str) -> bool:
    genres = set(movie.get("genres") or [])
    if bucket_name == "ホラー・スリラー枠":
        return bool(genres & HORROR_THRILLER_GENRES)
    if bucket_name == "SF・アクション枠":
        return bool(genres & SCIFI_ACTION_GENRES)
    if bucket_name == "非英語圏枠":
        return _is_non_english(movie)
    if bucket_name == "犯罪・ミステリー・コメディ枠":
        return bool(genres & CRIME_MYSTERY_COMEDY_GENRES)
    return False


def select_yearly_top20(
    candidates: list[dict[str, Any]],
    target_count: int = 20,
    top_n: int = 12,
) -> list[dict[str, Any]]:
    """
    1年分の候補リストから、総合上位12本＋ジャンル・非英語圏代表枠8本の
    ハイブリッド編成で最大20本を選出し、year_rank (1..20) を付与して返す。
    """
    scored: list[dict[str, Any]] = []
    for item in candidates:
        m = dict(item)
        if "awards_bonus" not in m or m["awards_bonus"] is None:
            m["awards_bonus"] = parse_awards_bonus(m.get("awards_text"))
        if "composite_score" not in m or m["composite_score"] is None:
            m["composite_score"] = compute_composite_score(
                imdb_rating=m.get("imdb_rating"),
                metascore=m.get("metascore"),
                rt_score=m.get("rt_score"),
                awards_bonus=m["awards_bonus"],
                imdb_votes=m.get("imdb_votes"),
            )
        scored.append(m)

    # 総合スコア降順（同点時は投票数降順）
    scored.sort(
        key=lambda x: (float(x["composite_score"]), int(x.get("imdb_votes") or 0)),
        reverse=True,
    )

    selected: list[dict[str, Any]] = []
    selected_ids: set[str] = set()

    # 1. 総合上位12本を確定
    for movie in scored[:top_n]:
        entry = dict(movie)
        entry["selection_slot"] = "top12"
        entry["selection_category"] = "総合TOP12"
        selected.append(entry)
        selected_ids.add(entry["imdb_id"])

    # 2. 残り8本をジャンル・非英語圏代表枠から補完
    remaining_pool = [m for m in scored if m["imdb_id"] not in selected_ids]

    for bucket_name, quota in GENRE_PICK_BUCKETS:
        picked_in_bucket = 0
        for movie in remaining_pool:
            if len(selected) >= target_count or picked_in_bucket >= quota:
                break
            if movie["imdb_id"] in selected_ids:
                continue
            if _matches_bucket(movie, bucket_name):
                entry = dict(movie)
                entry["selection_slot"] = "genre_pick"
                entry["selection_category"] = bucket_name
                selected.append(entry)
                selected_ids.add(entry["imdb_id"])
                picked_in_bucket += 1

    # 3. もし枠に空きが残った場合は総合スコア次点から補充
    for movie in remaining_pool:
        if len(selected) >= target_count:
            break
        if movie["imdb_id"] in selected_ids:
            continue
        entry = dict(movie)
        entry["selection_slot"] = "genre_pick"
        entry["selection_category"] = "総合次点枠"
        selected.append(entry)
        selected_ids.add(entry["imdb_id"])

    # 最終表示順: 総合TOP12をスコア順 → ジャンル代表枠をスコア順
    selected.sort(
        key=lambda x: (
            0 if x["selection_slot"] == "top12" else 1,
            -float(x["composite_score"]),
            -int(x.get("imdb_votes") or 0),
        )
    )
    for idx, entry in enumerate(selected, start=1):
        entry["year_rank"] = idx

    return selected
