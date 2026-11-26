"""
Core Cinema Archive - 統一ムードタグ自動生成モジュール（追加APIゼロ / Phase 2互換）

映画メタデータ（ジャンル・監督・受賞歴・上映時間・言語・製作国・評価・日本語あらすじ）から、
18種類の統一ムードタグ体系（MOOD_TAG_CATALOG）に沿って 2〜4個の日本語ムードタグを自動付与する。
"""

from __future__ import annotations

import re
from typing import Any, Mapping

# 統一ムードタグ体系（18種・優先表示順のタイブレーク基準にも使用）
MOOD_TAG_CATALOG: tuple[str, ...] = (
    "重厚サスペンス",
    "SF・世界観没入",
    "不穏・ホラー",
    "頭脳戦・ミステリー",
    "爽快アクション",
    "痛快・ブラックコメディ",
    "余韻ドラマ",
    "音楽・ミュージカル",
    "本格アニメ",
    "オスカー受賞",
    "批評家絶賛",
    "観客熱狂",
    "アジア傑作",
    "欧州シネマ",
    "サクッと短尺",
    "大作じっくり",
    "社会派・実話",
    "泣ける・感動",
)

ASIAN_LANG_CODES = {"ja", "ko", "zh", "cn", "hi", "ta", "te", "ml", "kn", "th", "vi", "id", "tl", "fa"}
ASIAN_COUNTRIES = {
    "japan",
    "south korea",
    "korea",
    "china",
    "hong kong",
    "taiwan",
    "india",
    "thailand",
    "vietnam",
    "indonesia",
    "philippines",
    "iran",
}

EUROPEAN_LANG_CODES = {
    "fr",
    "de",
    "es",
    "it",
    "da",
    "sv",
    "no",
    "fi",
    "nl",
    "pl",
    "pt",
    "el",
    "hu",
    "cs",
    "ro",
    "ru",
    "uk",
    "tr",
    "is",
}
EUROPEAN_COUNTRIES = {
    "france",
    "germany",
    "italy",
    "spain",
    "denmark",
    "sweden",
    "norway",
    "finland",
    "netherlands",
    "belgium",
    "poland",
    "portugal",
    "greece",
    "hungary",
    "czech",
    "romania",
    "austria",
    "switzerland",
    "ireland",
    "iceland",
    "russia",
    "ukraine",
    "turkey",
    "united kingdom",
}

SUSPENSE_DIRECTORS = {
    "david fincher",
    "christopher nolan",
    "denis villeneuve",
    "martin scorsese",
    "bong joon ho",
    "park chan-wook",
    "quentin tarantino",
    "michael mann",
    "brian de palma",
    "coen brothers",
    "joel coen",
    "ethan coen",
    "paul thomas anderson",
    "safdie",
}
HORROR_DIRECTORS = {
    "ari aster",
    "jordan peele",
    "robert eggers",
    "john carpenter",
    "guillermo del toro",
    "sam raimi",
    "david cronenberg",
    "stanley kubrick",
    "coralie fargeat",
    "zach cregger",
}
SCIFI_DIRECTORS = {
    "christopher nolan",
    "denis villeneuve",
    "ridley scott",
    "james cameron",
    "neill blomkamp",
    "alex garland",
    "george miller",
    "the wachowskis",
    "lana wachowski",
    "lilly wachowski",
    "alfonso cuarón",
    "alfonso cuaron",
}
ANIME_DIRECTORS = {
    "hayao miyazaki",
    "isao takahata",
    "satoshi kon",
    "makoto shinkai",
    "mamoru hosoda",
    "hideaki anno",
    "mamoru oshii",
    "katsuhiro otomo",
    "takehiko inoue",
    "naoko yamada",
}

OVERVIEW_KEYWORDS: dict[str, tuple[str, ...]] = {
    "重厚サスペンス": (
        "殺人",
        "犯罪",
        "事件",
        "刑事",
        "マフィア",
        "復讐",
        "陰謀",
        "潜入",
        "誘拐",
        "監禁",
        "脅迫",
        "麻薬",
        "逃亡",
        "暗殺",
        "裏社会",
        "連続殺人",
        "極限",
    ),
    "SF・世界観没入": (
        "宇宙",
        "地球",
        "惑星",
        "異星",
        "ai",
        "人工知能",
        "未来",
        "時空",
        "タイム",
        "次元",
        "ロボット",
        "サイバー",
        "仮想",
        "アンドロイド",
        "人類",
        "滅亡",
        "終末",
    ),
    "不穏・ホラー": (
        "恐怖",
        "呪い",
        "幽霊",
        "悪魔",
        "悪霊",
        "怪物",
        "ゾンビ",
        "惨劇",
        "不気味",
        "狂気",
        "カルト",
        "儀式",
        "感染",
        "悪夢",
        "血",
        "ホラー",
    ),
    "頭脳戦・ミステリー": (
        "謎",
        "ミステリー",
        "推理",
        "トリック",
        "捜査",
        "探偵",
        "真実",
        "記憶",
        "暗号",
        "詐欺",
        "心理",
        "偽装",
        "容疑",
        "真相",
    ),
    "爽快アクション": (
        "戦い",
        "戦闘",
        "バトル",
        "ヒーロー",
        "スパイ",
        "ミッション",
        "救出",
        "部隊",
        "決闘",
        "暗殺者",
        "傭兵",
        "冒険",
        "対決",
        "爆破",
        "アクション",
    ),
    "痛快・ブラックコメディ": (
        "笑い",
        "コメディ",
        "風刺",
        "皮肉",
        "騒動",
        "ドタバタ",
        "ユーモア",
        "破天荒",
        "痛快",
        "珍道中",
        "ブラック",
    ),
    "余韻ドラマ": (
        "人生",
        "孤独",
        "喪失",
        "青春",
        "葛藤",
        "再生",
        "歳月",
        "日常",
        "静か",
        "記憶",
        "運命",
        "魂",
    ),
    "音楽・ミュージカル": (
        "音楽",
        "バンド",
        "ミュージカル",
        "ジャズ",
        "ロック",
        "ピアノ",
        "歌",
        "歌手",
        "ライブ",
        "ブルース",
        "演奏",
        "ダンス",
        "作曲",
    ),
    "本格アニメ": (
        "アニメ",
        "少女",
        "少年",
        "魔法",
        "異世界",
        "妖",
        "神々",
        "冒険",
    ),
    "社会派・実話": (
        "実話",
        "実在",
        "歴史",
        "戦争",
        "政治",
        "社会",
        "差別",
        "報道",
        "ジャーナリスト",
        "貧困",
        "労働",
        "裁判",
        "事件",
        "ホロコースト",
        "ナチス",
        "大統領",
    ),
    "泣ける・感動": (
        "感動",
        "涙",
        "奇跡",
        "希望",
        "友情",
        "親子",
        "家族",
        "絆",
        "再会",
        "成長",
        "純愛",
        "夢",
    ),
}

# コア表現（テーマ・体験）タグとメタ属性（受賞・地域・尺・評価）タグをバランス良く組み合わせる
CORE_EXPERIENCE_TAGS = {
    "重厚サスペンス",
    "SF・世界観没入",
    "不穏・ホラー",
    "頭脳戦・ミステリー",
    "爽快アクション",
    "痛快・ブラックコメディ",
    "余韻ドラマ",
    "音楽・ミュージカル",
    "本格アニメ",
    "社会派・実話",
    "泣ける・感動",
}


def _to_float(value: Any) -> float | None:
    if value is None or value == "":
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _to_int(value: Any) -> int | None:
    if value is None or value == "":
        return None
    try:
        return int(float(value))
    except (TypeError, ValueError):
        return None


def _split_csv_lower(value: Any) -> list[str]:
    if not value:
        return []
    if isinstance(value, (list, tuple, set)):
        return [str(v).strip().lower() for v in value if str(v).strip()]
    return [part.strip().lower() for part in str(value).split(",") if part.strip()]


def generate_mood_tags(movie: Mapping[str, Any]) -> list[str]:
    """
    映画のメタデータ辞書を受け取り、MOOD_TAG_CATALOG から 2〜4個の日本語ムードタグを返す純粋関数。
    """
    scores: dict[str, float] = {tag: 0.0 for tag in MOOD_TAG_CATALOG}

    genres_raw = movie.get("genres") or []
    genres = {str(g).strip().lower() for g in genres_raw if str(g).strip()}
    director_lower = str(movie.get("director") or "").strip().lower()
    awards_lower = str(movie.get("awards_text") or "").strip().lower()
    runtime = _to_int(movie.get("runtime_minutes"))
    orig_lang = str(movie.get("original_language") or "").strip().lower().split(",")[0].strip()
    countries = _split_csv_lower(movie.get("country"))
    imdb_rating = _to_float(movie.get("imdb_rating"))
    imdb_votes = _to_int(movie.get("imdb_votes"))
    metascore = _to_int(movie.get("metascore"))
    rt_score = _to_int(movie.get("rt_score"))
    overview = str(movie.get("overview_ja") or "").lower()

    # 1. ジャンルベースの強いシグナル
    if genres & {"thriller", "crime", "film-noir"}:
        scores["重厚サスペンス"] += 4.2
        if "drama" in genres and "comedy" not in genres:
            scores["重厚サスペンス"] += 0.8

    if "sci-fi" in genres:
        scores["SF・世界観没入"] += 5.0
    elif "fantasy" in genres and "animation" not in genres:
        scores["SF・世界観没入"] += 2.6

    if "horror" in genres:
        scores["不穏・ホラー"] += 5.2
    elif "thriller" in genres and any(kw in overview for kw in ("恐怖", "呪い", "狂気", "悪夢", "怪物")):
        scores["不穏・ホラー"] += 3.2

    if "mystery" in genres:
        scores["頭脳戦・ミステリー"] += 4.8
    elif "crime" in genres and "thriller" in genres:
        scores["頭脳戦・ミステリー"] += 2.2

    if "action" in genres:
        if genres & {"war", "history", "biography"} and "adventure" not in genres and "sci-fi" not in genres:
            scores["爽快アクション"] += 2.2
        else:
            scores["爽快アクション"] += 4.2
    if "adventure" in genres and "animation" not in genres:
        scores["爽快アクション"] += 2.0

    if "comedy" in genres:
        if genres & {"crime", "thriller", "horror", "drama"}:
            scores["痛快・ブラックコメディ"] += 4.3
        else:
            scores["痛快・ブラックコメディ"] += 3.4

    if genres & {"music", "musical"}:
        scores["音楽・ミュージカル"] += 5.4

    if "animation" in genres:
        scores["本格アニメ"] += 5.8

    if genres & {"history", "biography", "war"}:
        scores["社会派・実話"] += 4.2

    if "drama" in genres:
        scores["余韻ドラマ"] += 2.8
        if genres & {"romance", "family"}:
            scores["泣ける・感動"] += 3.0

    if "romance" in genres and "drama" in genres:
        scores["泣ける・感動"] += 1.8

    # 2. 監督シグナル
    if director_lower:
        if any(d in director_lower for d in SUSPENSE_DIRECTORS):
            scores["重厚サスペンス"] += 1.8
        if any(d in director_lower for d in HORROR_DIRECTORS):
            scores["不穏・ホラー"] += 1.8
        if any(d in director_lower for d in SCIFI_DIRECTORS):
            scores["SF・世界観没入"] += 1.6
        if any(d in director_lower for d in ANIME_DIRECTORS):
            scores["本格アニメ"] += 2.0

    # 3. 映画賞・評価シグナル
    if awards_lower and awards_lower != "n/a":
        if re.search(r"won\s+\d+\s+oscar", awards_lower):
            scores["オスカー受賞"] += 4.5
        if any(kw in awards_lower for kw in ("palme d'or", "golden lion", "golden bear")):
            scores["批評家絶賛"] += 2.6

    if (metascore is not None and metascore >= 82) or (rt_score is not None and rt_score >= 92):
        scores["批評家絶賛"] += 3.2
    elif metascore is not None and rt_score is not None and metascore >= 75 and rt_score >= 85:
        scores["批評家絶賛"] += 2.0

    if (imdb_rating is not None and imdb_rating >= 8.3) or (
        imdb_votes is not None and imdb_votes >= 500000 and (imdb_rating or 0) >= 7.8
    ):
        scores["観客熱狂"] += 3.3
    elif imdb_votes is not None and imdb_votes >= 250000 and (imdb_rating or 0) >= 7.6:
        scores["観客熱狂"] += 2.1

    # 4. 言語・製作国シグナル
    is_asian = orig_lang in ASIAN_LANG_CODES or any(
        any(ac == c or ac in c for ac in ASIAN_COUNTRIES) for c in countries
    )
    if is_asian:
        # ハリウッド製アジア要素混在ではなく、非英語またはアジア主製作を優先
        if orig_lang != "en" or (countries and countries[0] in ASIAN_COUNTRIES):
            scores["アジア傑作"] += 3.6

    is_non_en_euro = orig_lang in EUROPEAN_LANG_CODES
    is_euro_primary_country = bool(countries) and (
        countries[0] in EUROPEAN_COUNTRIES and (countries[0] != "united kingdom" or orig_lang != "en" or len(countries) == 1)
    )
    if is_non_en_euro or is_euro_primary_country:
        # 英語の純UK/US大作ばかりに欧州シネマが付きすぎないよう、非英語欧州語に重みを置く
        scores["欧州シネマ"] += 3.7 if is_non_en_euro else 2.6

    # 5. 上映時間シグナル
    if runtime is not None:
        if 40 <= runtime <= 100:
            scores["サクッと短尺"] += 3.5
        elif runtime >= 140:
            scores["大作じっくり"] += 3.6

    # 6. 日本語あらすじキーワード補強
    if overview:
        for tag, keywords in OVERVIEW_KEYWORDS.items():
            hits = sum(1 for kw in keywords if kw in overview)
            if hits > 0:
                bonus = min(2.8, hits * 1.1)
                if tag == "本格アニメ" and "animation" not in genres:
                    # 非アニメ実写の「少年」「冒険」だけで本格アニメが付かないようにガード
                    if "アニメ" not in overview:
                        bonus = 0.0
                scores[tag] += bonus

    # 7. 2〜4個の選抜（最低1つは体験・内容系コアタグを含め、メタタグばかりにならないように調整）
    catalog_index = {tag: idx for idx, tag in enumerate(MOOD_TAG_CATALOG)}
    ranked = sorted(
        MOOD_TAG_CATALOG,
        key=lambda t: (-scores[t], catalog_index[t]),
    )

    selected: list[str] = []

    # まず最もスコアが高いコア表現タグ（閾値 >= 2.0）を優先採用
    core_candidates = [t for t in ranked if t in CORE_EXPERIENCE_TAGS and scores[t] >= 2.0]
    for t in core_candidates[:2]:
        selected.append(t)

    # 残りの高スコアタグ（閾値 >= 2.6）を4個まで追加
    for t in ranked:
        if len(selected) >= 4:
            break
        if t in selected:
            continue
        if scores[t] >= 2.6:
            selected.append(t)

    # まだ2個未満なら、スコア > 0 の上位から補充
    if len(selected) < 2:
        for t in ranked:
            if len(selected) >= 2:
                break
            if t not in selected and scores[t] > 0:
                selected.append(t)

    # メタデータ完全欠損時の安全なフォールバック（必ず2〜4個を保証）
    fallback_order = ("余韻ドラマ", "批評家絶賛", "観客熱狂")
    for fb in fallback_order:
        if len(selected) >= 2:
            break
        if fb not in selected:
            selected.append(fb)

    return selected[:4]
