/* Core Cinema Archive - フロントエンドロジック（ゼロビルド静的SPA / v2） */

const DEMO_MOVIES = [
  {
    imdb_id: "tt31193180",
    release_year: 2025,
    year_rank: 1,
    title_ja: "罪人たち",
    title_en: "Sinners",
    original_language: "en",
    country: "United States",
    newly_flatrate_providers: [],
    newly_flatrate_at: null,
    poster_url: null,
    backdrop_url: null,
    runtime_minutes: 137,
    genres: ["Horror", "Thriller", "Music"],
    director: "Ryan Coogler",
    selection_slot: "top12",
    selection_category: "総合TOP12",
    composite_score: 88.5,
    imdb_rating: 8.0,
    imdb_votes: 145000,
    metascore: 84,
    rt_score: 98,
    awards_text: "Won 4 Oscars. (Demo sample)",
    awards_bonus: 10,
    jp_providers: {
      flatrate: ["U-NEXT"],
      rent: ["Amazon Prime Video", "Apple TV"],
      buy: ["Apple TV"],
      link: "https://www.justwatch.com/jp",
    },
    overview_ja:
      "双子の兄弟が故郷でダンスホールを開こうとした夜、音楽と恐怖が交錯するサバイバルを描くライアン・クーグラー監督のオリジナル作。",
    ai_catchcopy: "ブルースが鳴り止む夜、闇が牙を剥く。",
    ai_summary:
      "ブルースの熱量とゴシックホラーが凄まじい密度で融合した快作。音響設計と緊張感の緩急が抜群で、ジャンル映画の枠を超えた没入感がある。",
    mood_tags: ["音楽・ミュージカル", "不穏・ホラー", "重厚サスペンス"],
    vibe_scores: { pace: 4, mind: 3, immersion: 5, heaviness: 4, family: 1 },
    similar_ids: ["tt0114369", "tt6751668", "tt2543164"],
    map_x: 24.5,
    map_y: 28.0,
  },
  {
    imdb_id: "tt6751668",
    release_year: 2019,
    year_rank: 1,
    title_ja: "パラサイト 半地下の家族",
    title_en: "Parasite",
    original_language: "ko",
    country: "South Korea",
    newly_flatrate_providers: [],
    newly_flatrate_at: null,
    poster_url: null,
    backdrop_url: null,
    runtime_minutes: 132,
    genres: ["Drama", "Thriller", "Comedy"],
    director: "Bong Joon Ho",
    selection_slot: "top12",
    selection_category: "総合TOP12",
    composite_score: 93.0,
    imdb_rating: 8.5,
    imdb_votes: 980000,
    metascore: 96,
    rt_score: 99,
    awards_text: "Won 4 Oscars. Palme d'Or winner.",
    awards_bonus: 10,
    jp_providers: {
      flatrate: ["U-NEXT", "Amazon Prime Video", "Netflix"],
      rent: ["Apple TV"],
      buy: [],
      link: "https://www.justwatch.com/jp",
    },
    overview_ja:
      "半地下で暮らす貧しい家族が、高台の豪邸に住む裕福な一家に次々と入り込んでいくブラック・スリラー。",
    ai_catchcopy: "階段を上るたび、戻れなくなる。",
    ai_summary:
      "社会風刺と予測不能なサスペンスが完璧なテンポで噛み合う現代の傑作。笑いと戦慄が瞬時に反転する脚本の切れ味が圧巻。",
    mood_tags: ["痛快・ブラックコメディ", "重厚サスペンス", "アジア傑作"],
    vibe_scores: { pace: 5, mind: 4, immersion: 4, heaviness: 4, family: 2 },
    similar_ids: ["tt0114369", "tt31193180", "tt2543164"],
    map_x: 42.0,
    map_y: 35.0,
  },
  {
    imdb_id: "tt2543164",
    release_year: 2016,
    year_rank: 13,
    title_ja: "メッセージ",
    title_en: "Arrival",
    original_language: "en",
    country: "United States, Canada",
    newly_flatrate_providers: [],
    newly_flatrate_at: null,
    poster_url: null,
    backdrop_url: null,
    runtime_minutes: 116,
    genres: ["Sci-Fi", "Drama", "Mystery"],
    director: "Denis Villeneuve",
    selection_slot: "genre_pick",
    selection_category: "SF・アクション枠",
    composite_score: 85.4,
    imdb_rating: 7.9,
    imdb_votes: 790000,
    metascore: 81,
    rt_score: 94,
    awards_text: "Won 1 Oscar. Nominated for 8 Oscars.",
    awards_bonus: 10,
    jp_providers: {
      flatrate: ["U-NEXT", "Netflix"],
      rent: ["Amazon Prime Video"],
      buy: [],
      link: "https://www.justwatch.com/jp",
    },
    overview_ja:
      "世界各地に突如現れた巨大な宇宙船。言語学者ルイーズが異星人の文字解読に挑む知的なSFドラマ。",
    ai_catchcopy: "言葉を解くたび、時間がほどけていく。",
    ai_summary:
      "異星人との対話を「言語学」から描く静謐で知的なSF。終盤の視点転換によって物語全体の意味が深く胸に迫る。",
    mood_tags: ["SF・世界観没入", "余韻ドラマ", "頭脳戦・ミステリー"],
    vibe_scores: { pace: 2, mind: 5, immersion: 5, heaviness: 3, family: 4 },
    similar_ids: ["tt0245429", "tt6751668", "tt4633694"],
    map_x: 72.0,
    map_y: 48.0,
  },
  {
    imdb_id: "tt0245429",
    release_year: 2001,
    year_rank: 1,
    title_ja: "千と千尋の神隠し",
    title_en: "Spirited Away",
    original_language: "ja",
    country: "Japan",
    newly_flatrate_providers: [],
    newly_flatrate_at: null,
    poster_url: null,
    backdrop_url: null,
    runtime_minutes: 125,
    genres: ["Animation", "Adventure", "Fantasy"],
    director: "Hayao Miyazaki",
    selection_slot: "top12",
    selection_category: "総合TOP12",
    composite_score: 94.2,
    imdb_rating: 8.6,
    imdb_votes: 880000,
    metascore: 96,
    rt_score: 96,
    awards_text: "Won 1 Oscar. Golden Bear winner.",
    awards_bonus: 10,
    jp_providers: {
      flatrate: [],
      rent: [],
      buy: [],
      link: "https://www.justwatch.com/jp",
    },
    overview_ja:
      "不思議な異世界に迷い込んだ少女・千尋が、八百万の神々が集う油屋で働きながら成長し元の世界へ戻る道を探す。",
    ai_catchcopy: "名前を奪われても、心は忘れない。",
    ai_summary:
      "圧倒的なイマジネーションと緻密な生活描写が同居するアニメ映画の金字塔。久石譲の音楽とノスタルジックな色彩が忘れがたい。",
    mood_tags: ["本格アニメ", "アジア傑作", "オスカー受賞"],
    vibe_scores: { pace: 3, mind: 3, immersion: 5, heaviness: 2, family: 5 },
    similar_ids: ["tt4633694", "tt2543164", "tt6751668"],
    map_x: 82.0,
    map_y: 74.0,
  },
  {
    imdb_id: "tt4633694",
    release_year: 2018,
    year_rank: 2,
    title_ja: "スパイダーマン：スパイダーバース",
    title_en: "Spider-Man: Into the Spider-Verse",
    original_language: "en",
    country: "United States",
    newly_flatrate_providers: [],
    newly_flatrate_at: null,
    poster_url: null,
    backdrop_url: null,
    runtime_minutes: 117,
    genres: ["Animation", "Action", "Adventure"],
    director: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    selection_slot: "top12",
    selection_category: "総合TOP12",
    composite_score: 91.6,
    imdb_rating: 8.4,
    imdb_votes: 710000,
    metascore: 87,
    rt_score: 97,
    awards_text: "Won 1 Oscar.",
    awards_bonus: 10,
    jp_providers: {
      flatrate: ["U-NEXT", "Netflix", "Amazon Prime Video"],
      rent: ["Apple TV"],
      buy: [],
      link: "https://www.justwatch.com/jp",
    },
    overview_ja:
      "新たなスパイダーマンとなった少年マイルスが、別次元から集まった仲間たちと共に巨大な危機へ立ち向かう。",
    ai_catchcopy: "跳べ、誰も見たことのない世界へ。",
    ai_summary:
      "コミックの質感と最新CGを融合させた革新的なアニメーション表現に目を奪われる。王道ヒーロー映画としての熱さも最高峰。",
    mood_tags: ["本格アニメ", "爽快アクション", "音楽・ミュージカル"],
    vibe_scores: { pace: 5, mind: 2, immersion: 5, heaviness: 1, family: 5 },
    similar_ids: ["tt0245429", "tt2543164", "tt31193180"],
    map_x: 68.0,
    map_y: 80.0,
  },
  {
    imdb_id: "tt0114369",
    release_year: 1995,
    year_rank: 14,
    title_ja: "セブン",
    title_en: "Se7en",
    original_language: "en",
    country: "United States",
    newly_flatrate_providers: [],
    newly_flatrate_at: null,
    poster_url: null,
    backdrop_url: null,
    runtime_minutes: 127,
    genres: ["Crime", "Mystery", "Thriller"],
    director: "David Fincher",
    selection_slot: "genre_pick",
    selection_category: "犯罪・ミステリー・コメディ枠",
    composite_score: 79.4,
    imdb_rating: 8.6,
    imdb_votes: 1850000,
    metascore: 65,
    rt_score: 83,
    awards_text: "Nominated for 1 Oscar.",
    awards_bonus: 5,
    jp_providers: {
      flatrate: ["U-NEXT"],
      rent: ["Amazon Prime Video", "Apple TV"],
      buy: [],
      link: "https://www.justwatch.com/jp",
    },
    overview_ja:
      "退職間際のベテラン刑事と血気盛んな新人刑事が、七つの大罪になぞらえた連続猟奇事件を追う。",
    ai_catchcopy: "雨が止まない街に、最後の箱が届く。",
    ai_summary:
      "降り続く雨と退廃的な街並みが不穏さを極限まで高める暗黒サスペンス。ラストまで一切の妥協がない展開は圧巻。",
    mood_tags: ["重厚サスペンス", "頭脳戦・ミステリー", "観客熱狂"],
    vibe_scores: { pace: 4, mind: 4, immersion: 4, heaviness: 5, family: 1 },
    similar_ids: ["tt6751668", "tt31193180", "tt2543164"],
    map_x: 18.0,
    map_y: 19.0,
  },
];

const DEFAULT_TASTE_PROFILE = {
  critics_weight: 0.4,
  audience_weight: 0.5,
  awards_weight: 0.1,
  genre_weights: {
    Thriller: 4.5,
    "Sci-Fi": 4.0,
    Horror: 4.0,
    Crime: 3.5,
    Mystery: 3.0,
    Action: 2.5,
    Adventure: 2.0,
    Musical: 1.5,
    Comedy: 0.5,
    Drama: 0.0,
    Animation: 0.0,
    Fantasy: 0.0,
    Music: 0.0,
    Romance: -1.5,
    Family: -4.0,
  },
  favorite_directors: [
    "Christopher Nolan",
    "Ryan Coogler",
    "Sean Baker",
    "Todd Phillips",
    "Neill Blomkamp",
    "Bong Joon Ho",
    "Jordan Peele",
    "Edgar Wright",
    "Paul Thomas Anderson",
    "Satoshi Kon",
    "Steven Spielberg",
    "Wes Anderson",
    "Park Chan-wook",
    "Quentin Tarantino",
    "Ryusuke Hamaguchi",
    "Hayao Miyazaki",
    "Makoto Shinkai",
    "Takashi Yamazaki",
    "Joseph Kosinski",
    "Takehiko Inoue",
  ],
  preferred_decades: [2020, 2010, 2000],
  max_preferred_runtime: null,
  summary:
    "ノーラン作品（TOP10に4本）や『罪人たち』のような、圧倒的な映像・音響・構造美で没入させる体感型SF／スリラー／ホラーや、毒気とキレのあるジャンル傑作・本格日本アニメを熱烈に支持。一方、静かな内省系ドラマ・ほろ苦い恋愛劇・王道ファミリーアニメにはシビアな観客体験重視の本格派。",
};

const IMPRESSION_TAG_GROUPS = [
  {
    key: "positive",
    label: "良かった点",
    tags: ["映像・演出", "脚本・構成", "音楽・音響", "没入感・テンポ", "余韻・テーマ", "演技"],
  },
  {
    key: "negative",
    label: "合わなかった点",
    tags: ["長い・退屈", "難解すぎ", "好みとズレた"],
  },
];

const IMPRESSION_TAGS_CACHE_KEY = "core_cinema_impression_tags_cache";
const PERSONAL_RANK_CACHE_KEY = "core_cinema_personal_rank_cache";
const WATCHED_AT_CACHE_KEY = "core_cinema_watched_at_cache";
const LOCAL_WATCH_STORAGE_KEY = "core_cinema_demo_watch";
const TASTE_PANEL_OPEN_KEY = "core_cinema_taste_panel_open_v3";
const FILTER_PREFS_STORAGE_KEY = "core_cinema_filter_prefs_v3";
const VIEW_MODE_STORAGE_KEY = "core_cinema_view_mode_v3";
const UNKNOWN_WATCHED_DATE_KEY = "core_cinema_unknown_watched_date_v1";
const MY_SUBSCRIPTIONS_STORAGE_KEY = "core_cinema_my_subscriptions_v1";

const SUBSCRIPTION_PROVIDERS = [
  { value: "U-NEXT", label: "U-NEXT" },
  { value: "Amazon Prime Video", label: "Amazon Prime Video" },
  { value: "Netflix", label: "Netflix" },
  { value: "Disney Plus", label: "Disney+" },
  { value: "Hulu", label: "Hulu" },
  { value: "Apple TV", label: "Apple TV+" },
  { value: "FOD", label: "FOD" },
];

const V7 = window.CoreCinemaLogic || {};

const state = {
  supabase: null,
  isDemo: true,
  user: null,
  userEmail: null,
  movies: [],
  filteredMovies: [],
  countryMap: {},
  watchMap: {}, // imdb_id -> { status, my_rating, personal_rank, watched_at, impression_tags, memo, updated_at }
  tasteProfile: { ...DEFAULT_TASTE_PROFILE },
  activePreset: null,
  presetGenres: null, // 例: ["Horror", "Thriller"] (プリセット用ORマッチ)
  mySubscriptions: [], // 契約中の配信サービス配列
  activeDirector: "", // 監督ディグ中の監督名
  activeMoodTag: "", // 選択中のムードタグ
  isVibePanelOpen: false,
  vibeFilter: {
    paceMin: 1,
    mindMin: 1,
    immersionMin: 1,
    heavinessMax: 5,
    familyOk: false,
  },
  newlyFlatrateFilterActive: false,
  newlyFlatrateBannerDismissed: false,
  isSyncingLocalToCloud: false,
  hasShownOfflineSaveHint: false,
  hasShownMissingColumnHint: false,
  activeTasteTab: "taste", // "taste" | "guide"
  isTastePanelOpen: false,
  viewMode: "card", // "card" | "list"
  unknownWatchedDate: false,
  activeMainView: "browse", // "browse" | "ranking" | "constellation"
  activeRankingTab: "best", // "best" | "log"
  selectedLogYear: "all",
  isMobileFiltersOpen: false,
  battle: null, // { targetMovie, ranked, low, high, step, totalEstimatedSteps, queue, phase, decidedRank, isSaving }
  constellation: {
    zoom: 1,
    panX: 0,
    panY: 0,
    mySubsOnly: false,
    hoveredId: null,
    selectedId: null,
    stars: [],
    missingCount: 0,
    eventsBound: false,
  },
};

function normalizeSupabaseUrl(url) {
  return String(url || "")
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/rest\/v1$/i, "");
}

function getConfig() {
  const cfg = window.CORE_CINEMA_CONFIG || {};
  const normalizedUrl = normalizeSupabaseUrl(cfg.SUPABASE_URL);
  const anonKey = String(cfg.SUPABASE_ANON_KEY || "").trim();
  const validUrl = Boolean(normalizedUrl) && !normalizedUrl.includes("YOUR_PROJECT_REF");
  const validKey = Boolean(anonKey) && !anonKey.includes("YOUR_SUPABASE_ANON_KEY");
  return validUrl && validKey
    ? { SUPABASE_URL: normalizedUrl, SUPABASE_ANON_KEY: anonKey }
    : null;
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttr(str) {
  return escapeHtml(str).replaceAll("'", "&#39;");
}

function buildCinemaFallbackHtml(movie, variant = "card") {
  const titleJa = movie?.title_ja || movie?.title_en || "No Title";
  const titleEn = movie?.title_en || "";
  const yearText = movie?.release_year ? `${movie.release_year}年` : "";
  if (variant === "thumb") {
    return `<div class="list-thumb-fallback cinema-thumb-fallback" title="${escapeHtml(titleJa)} (${escapeHtml(yearText)})"><span class="thumb-fb-icon" aria-hidden="true">🎬</span><span class="thumb-fb-title">${escapeHtml(titleJa.slice(0, 6))}</span></div>`;
  }
  const subText = [yearText, titleEn].filter(Boolean).join(" · ");
  const extraClass =
    variant === "battle"
      ? "battle-poster-fallback cinema-fallback"
      : variant === "similar"
        ? "similar-poster-fallback cinema-fallback"
        : variant === "gacha"
          ? "poster-fallback cinema-fallback gacha-poster-fallback-inner"
          : "poster-fallback cinema-fallback";
  return `<div class="${extraClass}"><span class="fallback-cinema-icon" aria-hidden="true">🎬</span><strong>${escapeHtml(titleJa)}</strong>${subText ? `<span>${escapeHtml(subText)}</span>` : ""}</div>`;
}

function renderPosterImageOrFallback(movie, { variant = "card", imgClass = "", extraWrapperClass = "" } = {}) {
  const url = movie?.poster_url ? String(movie.poster_url).trim() : "";
  const fallbackHtml = buildCinemaFallbackHtml(movie, variant);
  if (!url) {
    if (variant === "modal") {
      return `<div class="poster-wrap modal-poster-fallback-wrap">${fallbackHtml}</div>`;
    }
    if (variant === "gacha") {
      return `<div class="poster-wrap gacha-poster-fallback">${fallbackHtml}</div>`;
    }
    return fallbackHtml;
  }
  const clsAttr = imgClass ? ` class="${escapeHtml(imgClass)}"` : "";
  const loadingAttr = variant === "card" || variant === "thumb" || variant === "similar" ? ` loading="lazy"` : "";
  if (variant === "modal") {
    return `<div class="modal-poster-box ${escapeHtml(extraWrapperClass)}"><img${clsAttr} src="${escapeHtml(url)}" alt="${escapeHtml(movie?.title_ja || "")}" data-poster-fallback="true" />${fallbackHtml.replace('class="', 'class="is-hidden-fallback ')}</div>`;
  }
  if (variant === "gacha") {
    return `<div class="gacha-poster-box"><img${clsAttr} src="${escapeHtml(url)}" alt="${escapeHtml(movie?.title_ja || "")}" data-poster-fallback="true" />${fallbackHtml.replace('class="', 'class="is-hidden-fallback ')}</div>`;
  }
  return `<img${clsAttr} src="${escapeHtml(url)}" alt="${escapeHtml(movie?.title_ja || "")}"${loadingAttr} data-poster-fallback="true" />${fallbackHtml.replace('class="', 'class="is-hidden-fallback ')}`;
}

function attachPosterErrorHandlers(root = document) {
  if (!root) return;
  root.querySelectorAll('img[data-poster-fallback="true"]').forEach((img) => {
    if (img.dataset.fallbackBound === "1") return;
    img.dataset.fallbackBound = "1";
    const triggerFallback = () => {
      img.style.display = "none";
      const next = img.nextElementSibling;
      if (next && next.classList.contains("is-hidden-fallback")) {
        next.classList.remove("is-hidden-fallback");
      }
      const parentBox = img.closest(".modal-poster-box, .gacha-poster-box");
      if (parentBox) {
        parentBox.classList.add("is-fallback-active");
      }
    };
    img.addEventListener("error", triggerFallback, { once: true });
    if (img.complete && img.naturalWidth === 0) {
      triggerFallback();
    }
  });
}

function loadUnknownWatchedDatePref() {
  try {
    return localStorage.getItem(UNKNOWN_WATCHED_DATE_KEY) === "1";
  } catch {
    return false;
  }
}

function setUnknownWatchedDatePref(enabled, { persist = true } = {}) {
  state.unknownWatchedDate = Boolean(enabled);
  const checkbox = document.getElementById("toggle-unknown-watched-date");
  if (checkbox) {
    checkbox.checked = state.unknownWatchedDate;
    checkbox.closest(".unknown-date-toggle")?.classList.toggle("is-active", state.unknownWatchedDate);
  }
  if (persist) {
    try {
      localStorage.setItem(UNKNOWN_WATCHED_DATE_KEY, state.unknownWatchedDate ? "1" : "0");
    } catch {
      // ignore
    }
  }
}

function getTodayDateString() {
  try {
    const parts = new Intl.DateTimeFormat("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const y = parts.find((p) => p.type === "year")?.value;
    const m = parts.find((p) => p.type === "month")?.value;
    const d = parts.find((p) => p.type === "day")?.value;
    if (y && m && d) return `${y}-${m}-${d}`;
  } catch {
    // fallback below
  }
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function normalizeWatchedAt(val) {
  if (!val) return null;
  const s = String(val).trim();
  if (!s) return null;
  const match = s.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
}

function loadLocalWatchMap() {
  try {
    const raw = JSON.parse(localStorage.getItem(LOCAL_WATCH_STORAGE_KEY) || "{}");
    const result = {};
    for (const [id, entry] of Object.entries(raw || {})) {
      if (entry && typeof entry === "object") {
        result[id] = normalizeWatchEntry(entry);
      }
    }
    return result;
  } catch {
    return {};
  }
}

function saveLocalWatchMap(watchMapObj = state.watchMap) {
  try {
    localStorage.setItem(LOCAL_WATCH_STORAGE_KEY, JSON.stringify(watchMapObj || {}));
  } catch {
    // localStorage利用不可時は無視
  }
}

function saveLocalWatchEntry(imdbId, entry) {
  const localMap = loadLocalWatchMap();
  localMap[imdbId] = normalizeWatchEntry(entry);
  saveLocalWatchMap(localMap);
}

function loadImpressionTagsCache() {
  try {
    return JSON.parse(localStorage.getItem(IMPRESSION_TAGS_CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveImpressionTagsCache(imdbId, tags) {
  try {
    const cache = loadImpressionTagsCache();
    const cleaned = Array.isArray(tags) ? tags.filter(Boolean) : [];
    if (cleaned.length > 0) {
      cache[imdbId] = cleaned;
    } else {
      delete cache[imdbId];
    }
    localStorage.setItem(IMPRESSION_TAGS_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage利用不可時は無視
  }
}

function loadWatchedAtCache() {
  try {
    const raw = JSON.parse(localStorage.getItem(WATCHED_AT_CACHE_KEY) || "{}");
    const result = {};
    for (const [id, dtStr] of Object.entries(raw || {})) {
      if (dtStr === "__CLEARED__") {
        result[id] = "__CLEARED__";
        continue;
      }
      const norm = normalizeWatchedAt(dtStr);
      if (norm) result[id] = norm;
    }
    return result;
  } catch {
    return {};
  }
}

function saveWatchedAtCacheEntry(imdbId, watchedAt, { explicitClear = false } = {}) {
  try {
    const cache = loadWatchedAtCache();
    const norm = normalizeWatchedAt(watchedAt);
    if (norm) {
      cache[imdbId] = norm;
    } else if (explicitClear) {
      delete cache[imdbId];
    } else {
      delete cache[imdbId];
    }
    localStorage.setItem(WATCHED_AT_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // ignore
  }
}

function normalizePersonalRank(val) {
  if (val == null || val === "") return null;
  const num = Number(val);
  if (!Number.isInteger(num) || num <= 0) return null;
  return num;
}

function loadPersonalRankCache() {
  try {
    const raw = JSON.parse(localStorage.getItem(PERSONAL_RANK_CACHE_KEY) || "{}");
    const result = {};
    for (const [id, rank] of Object.entries(raw || {})) {
      const norm = normalizePersonalRank(rank);
      if (norm != null) result[id] = norm;
    }
    return result;
  } catch {
    return {};
  }
}

function savePersonalRankCacheEntry(imdbId, rank) {
  try {
    const cache = loadPersonalRankCache();
    const norm = normalizePersonalRank(rank);
    if (norm != null) {
      cache[imdbId] = norm;
    } else {
      delete cache[imdbId];
    }
    localStorage.setItem(PERSONAL_RANK_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage利用不可時は無視
  }
}

function syncPersonalRankCacheFromWatchMap(watchMapObj = state.watchMap) {
  try {
    const cache = {};
    for (const [id, entry] of Object.entries(watchMapObj || {})) {
      const norm = normalizePersonalRank(entry?.personal_rank);
      if (norm != null) {
        cache[id] = norm;
      }
    }
    localStorage.setItem(PERSONAL_RANK_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // ignore
  }
}

function syncLocalStorageBackupsForWatchMap(watchMapObj = state.watchMap) {
  syncPersonalRankCacheFromWatchMap(watchMapObj);
  try {
    const watchedAtCache = {};
    for (const [id, entry] of Object.entries(watchMapObj || {})) {
      const norm = normalizeWatchedAt(entry?.watched_at);
      if (norm) watchedAtCache[id] = norm;
    }
    localStorage.setItem(WATCHED_AT_CACHE_KEY, JSON.stringify(watchedAtCache));
  } catch {
    // ignore
  }
}

function normalizeWatchEntry(row) {
  if (!row) {
    return {
      status: "unwatched",
      my_rating: null,
      personal_rank: null,
      watched_at: null,
      impression_tags: [],
      memo: "",
      updated_at: null,
    };
  }
  return {
    ...row,
    status: row.status || "unwatched",
    my_rating: row.my_rating != null ? Number(row.my_rating) : null,
    personal_rank: normalizePersonalRank(row.personal_rank),
    watched_at: normalizeWatchedAt(row.watched_at),
    impression_tags: Array.isArray(row.impression_tags) ? row.impression_tags.filter(Boolean) : [],
    memo: row.memo || "",
    updated_at: row.updated_at || null,
  };
}

function isMeaningfulWatchEntry(entry) {
  if (!entry) return false;
  return (
    (entry.status && entry.status !== "unwatched") ||
    entry.my_rating != null ||
    normalizePersonalRank(entry.personal_rank) != null ||
    normalizeWatchedAt(entry.watched_at) != null ||
    (Array.isArray(entry.impression_tags) && entry.impression_tags.length > 0) ||
    Boolean(entry.memo && String(entry.memo).trim())
  );
}

function applyCachedFieldsToEntry(imdbId, entry, { tagsCache, rankCache, watchedAtCache, allowWatchedAtFallback = true }) {
  const norm = normalizeWatchEntry(entry);
  if (norm.impression_tags.length === 0 && Array.isArray(tagsCache[imdbId])) {
    norm.impression_tags = tagsCache[imdbId];
  }
  if (norm.personal_rank == null && rankCache[imdbId] != null) {
    norm.personal_rank = rankCache[imdbId];
  }
  if (allowWatchedAtFallback && norm.watched_at == null && watchedAtCache[imdbId] && watchedAtCache[imdbId] !== "__CLEARED__") {
    norm.watched_at = watchedAtCache[imdbId];
  }
  return norm;
}

function activateDemoMode(customMessageHtml = null) {
  state.isDemo = true;
  state.user = null;
  state.userEmail = null;
  state.movies = DEMO_MOVIES;
  const rawMap = loadLocalWatchMap();
  const tagsCache = loadImpressionTagsCache();
  const rankCache = loadPersonalRankCache();
  const watchedAtCache = loadWatchedAtCache();
  state.watchMap = {};
  for (const [id, entry] of Object.entries(rawMap)) {
    state.watchMap[id] = applyCachedFieldsToEntry(id, entry, { tagsCache, rankCache, watchedAtCache });
  }
  for (const [id, rank] of Object.entries(rankCache)) {
    if (!state.watchMap[id]) {
      state.watchMap[id] = normalizeWatchEntry({
        status: "watched",
        personal_rank: rank,
        watched_at: watchedAtCache[id] || null,
        impression_tags: Array.isArray(tagsCache[id]) ? tagsCache[id] : [],
      });
    }
  }
  const banner = document.getElementById("demo-banner");
  if (customMessageHtml) {
    banner.innerHTML = `<span>${customMessageHtml}</span>`;
  }
  banner.classList.remove("hidden");
}

async function loadTasteProfile() {
  try {
    const resp = await fetch("./taste_profile.json", { cache: "no-store" });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const parsed = await resp.json();
    state.tasteProfile = {
      ...DEFAULT_TASTE_PROFILE,
      ...(parsed && typeof parsed === "object" ? parsed : {}),
    };
  } catch {
    state.tasteProfile = { ...DEFAULT_TASTE_PROFILE };
  }
}

async function loadCountryMap() {
  try {
    const resp = await fetch("./country_map.json", { cache: "no-store" });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const parsed = await resp.json();
    state.countryMap = parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    state.countryMap = {};
  }
}

function getMovieCountryString(movie) {
  if (!movie) return "";
  const direct = String(movie.country || "").trim();
  if (direct && direct.toLowerCase() !== "n/a") return direct;
  const fromMap = String(state.countryMap?.[movie.imdb_id] || "").trim();
  if (fromMap && fromMap.toLowerCase() !== "n/a") return fromMap;
  return "";
}

function isIndianMovieClient(movie) {
  const countryStr = getMovieCountryString(movie).toLowerCase();
  if (countryStr) {
    const parts = countryStr.split(",").map((s) => s.trim());
    if (parts.some((p) => p === "india" || p.includes("india"))) {
      return true;
    }
  }
  const lang = String(movie?.original_language || "").trim().toLowerCase().split(",")[0].trim();
  return ["hi", "ta", "te", "ml", "kn", "bn", "pa", "mr", "gu", "hindi", "tamil", "telugu", "malayalam", "kannada", "bengali", "punjabi", "marathi"].includes(lang);
}

const ENGLISH_SPHERE_COUNTRIES = [
  "united states",
  "usa",
  "united kingdom",
  "uk",
  "canada",
  "australia",
  "new zealand",
  "ireland",
];

const EUROPEAN_COUNTRIES = [
  "france",
  "germany",
  "italy",
  "spain",
  "sweden",
  "denmark",
  "norway",
  "belgium",
  "austria",
  "poland",
  "netherlands",
  "switzerland",
  "finland",
  "portugal",
  "czech",
  "hungary",
  "greece",
  "romania",
  "russia",
  "iceland",
  "ukraine",
];

const EUROPEAN_LANGS = new Set(["fr", "de", "it", "es", "sv", "da", "no", "nl", "pl", "fi", "pt", "ru", "hu", "cs", "el", "ro", "is", "uk"]);

function getMovieCountryCategory(movie) {
  const countryStr = getMovieCountryString(movie).toLowerCase();
  const lang = String(movie?.original_language || "").trim().toLowerCase().split(",")[0].trim();

  if (countryStr) {
    const parts = countryStr.split(",").map((s) => s.trim());
    if (parts.some((p) => p === "japan" || p.includes("japan"))) return "jp";
    if (parts.some((p) => p.includes("south korea") || p === "korea")) return "kr";
    if (parts.some((p) => ENGLISH_SPHERE_COUNTRIES.some((ec) => p === ec || p.includes(ec)))) {
      return "english_sphere";
    }
    if (parts.some((p) => EUROPEAN_COUNTRIES.some((ec) => p === ec || p.includes(ec)))) {
      return "eu";
    }
    return "other";
  }

  // country 未設定時は original_language でフォールバック判定
  if (lang === "ja" || lang === "japanese") return "jp";
  if (lang === "ko" || lang === "korean") return "kr";
  if (lang === "en" || lang === "english") return "english_sphere";
  if (EUROPEAN_LANGS.has(lang)) return "eu";
  return "other";
}

function matchesCountryFilter(movie, filterValue) {
  if (!filterValue) return true;
  const countryStr = getMovieCountryString(movie).toLowerCase();
  const lang = String(movie?.original_language || "").trim().toLowerCase().split(",")[0].trim();

  if (filterValue === "english_sphere") {
    if (countryStr) {
      return ENGLISH_SPHERE_COUNTRIES.some((c) => countryStr.includes(c));
    }
    return lang === "en" || lang === "english";
  }
  if (filterValue === "jp") {
    if (countryStr) return countryStr.includes("japan");
    return lang === "ja" || lang === "japanese";
  }
  if (filterValue === "kr") {
    if (countryStr) return countryStr.includes("korea");
    return lang === "ko" || lang === "korean";
  }
  if (filterValue === "eu") {
    if (countryStr) {
      return EUROPEAN_COUNTRIES.some((c) => countryStr.includes(c));
    }
    return EUROPEAN_LANGS.has(lang);
  }
  if (filterValue === "other") {
    return (
      !matchesCountryFilter(movie, "english_sphere") &&
      !matchesCountryFilter(movie, "jp") &&
      !matchesCountryFilter(movie, "kr") &&
      !matchesCountryFilter(movie, "eu")
    );
  }
  return true;
}

function isWithinDays(isoStr, days = 14) {
  if (!isoStr) return false;
  const ts = Date.parse(isoStr);
  if (Number.isNaN(ts)) return false;
  const diffMs = Date.now() - ts;
  return diffMs >= -86400000 && diffMs < days * 86400000;
}

function getEligibleNewlyFlatrateItems() {
  const userSignals = buildUserPreferenceSignals();
  const items = [];
  for (const m of state.movies) {
    const newProvs = Array.isArray(m.newly_flatrate_providers) ? m.newly_flatrate_providers.filter(Boolean) : [];
    if (newProvs.length === 0 || !isWithinDays(m.newly_flatrate_at, 14)) continue;
    const w = state.watchMap[m.imdb_id];
    const status = w?.status || "unwatched";
    if (status === "watched") continue;
    const matchScore = computeMatchScore(m, state.tasteProfile, userSignals);
    if (status === "watchlist" || (status === "unwatched" && matchScore >= 80)) {
      items.push({ movie: m, providers: newProvs, matchScore, isWatchlist: status === "watchlist" });
    }
  }
  items.sort((a, b) => Number(b.isWatchlist) - Number(a.isWatchlist) || b.matchScore - a.matchScore);
  return items;
}

function renderNewlyFlatrateBanner() {
  const banner = document.getElementById("newly-flatrate-banner");
  if (!banner) return;

  if (state.newlyFlatrateBannerDismissed) {
    banner.classList.add("hidden");
    banner.innerHTML = "";
    return;
  }

  const items = getEligibleNewlyFlatrateItems();
  if (items.length === 0) {
    banner.classList.add("hidden");
    banner.innerHTML = "";
    return;
  }

  const first = items[0];
  const provLabel = first.providers.slice(0, 2).join("・");
  const restCount = items.length - 1;
  const restText = restCount > 0 ? ` 他 ${restCount}本` : "";
  const activeFilterClass = state.newlyFlatrateFilterActive ? "is-filtering" : "";

  banner.classList.remove("hidden");
  banner.innerHTML = `
    <div class="newly-banner-text">
      <span class="newly-banner-msg">🆕 新着見放題: 『${escapeHtml(first.movie.title_ja)}』(${escapeHtml(provLabel)})${escapeHtml(restText)}</span>
    </div>
    <div class="newly-banner-actions">
      <button type="button" class="btn btn-secondary newly-banner-view-btn ${activeFilterClass}" data-newly-action="filter">${state.newlyFlatrateFilterActive ? "一覧に戻す" : "見る"}</button>
      <button type="button" class="newly-banner-close-btn" data-newly-action="dismiss" aria-label="通知を閉じる">&times;</button>
    </div>
  `;
}

function inferAwardsBonus(movie) {
  if (movie.awards_bonus != null && !Number.isNaN(Number(movie.awards_bonus))) {
    return Math.max(0, Math.min(10, Number(movie.awards_bonus)));
  }
  const txt = String(movie.awards_text || "").toLowerCase();
  if (!txt || txt === "n/a") return 0;
  if (/won\s+\d+\s+oscar/.test(txt) || txt.includes("palme d'or") || txt.includes("golden lion") || txt.includes("golden bear")) {
    return 10;
  }
  if (/nominated\s+for\s+\d+\s+oscar/.test(txt) || /won\s+\d+\s+(bafta|golden globe)/.test(txt)) {
    return 5;
  }
  const winsMatch = txt.match(/(\d+)\s+win/);
  const wins = winsMatch ? Number(winsMatch[1]) : 0;
  if (wins >= 15) return 4;
  if (wins >= 5) return 2.5;
  if (wins >= 1) return 1;
  return 0;
}

function buildUserPreferenceSignals() {
  const movieMap = new Map(state.movies.map((m) => [m.imdb_id, m]));
  const genreAcc = {};
  const directorAcc = {};
  const decadeAcc = {};
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let watchedCount = 0;
  let watchlistCount = 0;
  let ratedCount = 0;
  let ratingSum = 0;

  for (const [imdbId, w] of Object.entries(state.watchMap)) {
    if (!w) continue;
    if (w.status === "watched" || w.my_rating != null) {
      watchedCount += 1;
    } else if (w.status === "watchlist") {
      watchlistCount += 1;
    }
    if (w.my_rating == null) continue;
    const movie = movieMap.get(imdbId);
    if (!movie) continue;

    const rating = Number(w.my_rating);
    if (Number.isNaN(rating) || rating < 1 || rating > 5) continue;

    ratedCount += 1;
    ratingSum += rating;
    ratingCounts[Math.round(rating)] = (ratingCounts[Math.round(rating)] || 0) + 1;

    // ユーザーの平均との差または★3.5基準で好悪を学習（例: ★5=+1.5, ★4=+0.5, ★2=-1.5）
    const delta = rating - 3.5;

    for (const g of movie.genres || []) {
      if (!genreAcc[g]) genreAcc[g] = { sum: 0, count: 0, deltaSum: 0 };
      genreAcc[g].sum += rating;
      genreAcc[g].count += 1;
      genreAcc[g].deltaSum += delta;
    }

    if (movie.director) {
      for (const d of String(movie.director).split(",").map((s) => s.trim()).filter(Boolean)) {
        const key = d.toLowerCase();
        if (!directorAcc[key]) directorAcc[key] = { name: d, sum: 0, count: 0, deltaSum: 0 };
        directorAcc[key].sum += rating;
        directorAcc[key].count += 1;
        directorAcc[key].deltaSum += delta;
      }
    }

    if (movie.release_year) {
      const decade = Math.floor(Number(movie.release_year) / 10) * 10;
      if (!decadeAcc[decade]) decadeAcc[decade] = { sum: 0, count: 0, deltaSum: 0 };
      decadeAcc[decade].sum += rating;
      decadeAcc[decade].count += 1;
      decadeAcc[decade].deltaSum += delta;
    }
  }

  const avgRating = ratedCount > 0 ? ratingSum / ratedCount : null;
  const genreScores = {};
  const genreStats = [];
  for (const [genre, st] of Object.entries(genreAcc)) {
    genreScores[genre] = st.deltaSum;
    genreStats.push({
      genre,
      count: st.count,
      avg: st.sum / st.count,
      deltaSum: st.deltaSum,
    });
  }

  const directorScores = {};
  const directorStats = [];
  for (const [key, st] of Object.entries(directorAcc)) {
    directorScores[key] = st.deltaSum;
    directorStats.push({
      key,
      name: st.name,
      count: st.count,
      avg: st.sum / st.count,
      deltaSum: st.deltaSum,
    });
  }

  const decadeScores = {};
  for (const [dec, st] of Object.entries(decadeAcc)) {
    decadeScores[dec] = st.deltaSum;
  }

  return {
    watchedCount,
    watchlistCount,
    ratedCount,
    avgRating,
    ratingCounts,
    genreScores,
    directorScores,
    decadeScores,
    genreStats,
    directorStats,
  };
}

function computeMatchScore(movie, tasteProfile = state.tasteProfile, userSignals = null) {
  const profile = tasteProfile || DEFAULT_TASTE_PROFILE;
  const cw = Number(profile.critics_weight ?? 0.4);
  const aw = Number(profile.audience_weight ?? 0.5);
  const ww = Number(profile.awards_weight ?? 0.1);
  const totalWeight = cw + aw + ww;
  const normCw = totalWeight > 0 ? cw / totalWeight : 0.4;
  const normAw = totalWeight > 0 ? aw / totalWeight : 0.5;
  const normWw = totalWeight > 0 ? ww / totalWeight : 0.1;

  const audience100 = movie.imdb_rating != null ? Number(movie.imdb_rating) * 10 : Number(movie.composite_score || 70);
  const criticValues = [movie.metascore, movie.rt_score]
    .filter((v) => v != null && !Number.isNaN(Number(v)))
    .map(Number);
  const critic100 = criticValues.length > 0 ? criticValues.reduce((a, b) => a + b, 0) / criticValues.length : audience100 * 0.92;
  const awards100 = inferAwardsBonus(movie) * 10; // 0〜100スケールに正規化

  let baseScore = critic100 * normCw + audience100 * normAw + awards100 * normWw;

  // 批評家スコアも少なく投票数も少ないローカル作品はマッチ度でも補正
  if (criticValues.length === 0 && movie.imdb_votes != null && Number(movie.imdb_votes) < 80000) {
    baseScore *= 0.85;
  }

  // ジャンル重み: 複数ジャンルで加算が過飽和しないよう sqrt(一致数) で正規化し上限[-10, +9]に調整
  const genreWeights = profile.genre_weights && typeof profile.genre_weights === "object" ? profile.genre_weights : {};
  const movieGenres = Array.isArray(movie.genres) ? movie.genres : [];
  const matchedGenreVals = [];
  for (const g of movieGenres) {
    if (genreWeights[g] != null && !Number.isNaN(Number(genreWeights[g]))) {
      const val = Number(genreWeights[g]);
      if (val > 0 && val <= 2.0 && !Number.isInteger(val)) {
        matchedGenreVals.push((val - 1.0) * 15);
      } else {
        matchedGenreVals.push(val);
      }
    }
  }
  const genreAdjustment =
    matchedGenreVals.length > 0
      ? matchedGenreVals.reduce((a, b) => a + b, 0) / Math.sqrt(matchedGenreVals.length)
      : 0;
  let score = baseScore * 0.92 + Math.max(-10, Math.min(9, genreAdjustment));

  // お気に入り監督一致ボーナス
  const favDirectors = Array.isArray(profile.favorite_directors)
    ? profile.favorite_directors.map((d) => String(d).trim().toLowerCase()).filter(Boolean)
    : [];
  const movieDirectorLower = String(movie.director || "").toLowerCase();
  if (movieDirectorLower && favDirectors.some((d) => movieDirectorLower.includes(d))) {
    score += 5.5;
  }

  // 好みの年代一致ボーナス
  const prefDecades = Array.isArray(profile.preferred_decades) ? profile.preferred_decades : [];
  if (movie.release_year && prefDecades.length > 0) {
    const movieDecadeStart = Math.floor(Number(movie.release_year) / 10) * 10;
    const movieDecadeStr = `${movieDecadeStart}s`;
    const matchedDecade = prefDecades.some((d) => {
      const s = String(d).trim();
      return s === movieDecadeStr || s === String(movieDecadeStart);
    });
    if (matchedDecade) {
      score += 3.0;
    }
  }

  // 上映時間の好み
  if (profile.max_preferred_runtime != null && movie.runtime_minutes != null) {
    const maxRt = Number(profile.max_preferred_runtime);
    const rt = Number(movie.runtime_minutes);
    if (!Number.isNaN(maxRt) && maxRt > 0) {
      if (rt <= maxRt) {
        score += 1.5;
      } else {
        const excess = rt - maxRt;
        score -= Math.min(8, Math.ceil(excess / 10) * 2);
      }
    }
  }

  // ユーザーがリアルタイムに付けた★評価履歴からも件数でベイズ縮小した平均偏差を加算（累積による99%飽和を防止）
  if (userSignals && userSignals.ratedCount > 0) {
    let personalDelta = 0;
    const genreCountMap = new Map((userSignals.genreStats || []).map((gs) => [gs.genre, gs]));
    const gDeltas = [];
    for (const g of movieGenres) {
      const st = genreCountMap.get(g);
      if (st) {
        gDeltas.push(st.deltaSum / (st.count + 3));
      }
    }
    if (gDeltas.length > 0) {
      const gAvg = gDeltas.reduce((a, b) => a + b, 0) / gDeltas.length;
      personalDelta += Math.max(-3.0, Math.min(3.0, gAvg * 3.0));
    }
    if (movie.director) {
      const dirCountMap = new Map((userSignals.directorStats || []).map((ds) => [ds.key, ds]));
      for (const d of String(movie.director).split(",").map((s) => s.trim().toLowerCase())) {
        const st = dirCountMap.get(d);
        if (st) {
          personalDelta += Math.max(-4.0, Math.min(4.0, (st.deltaSum / (st.count + 2)) * 4.5));
        }
      }
    }
    if (movie.release_year && userSignals.decadeScores) {
      const decKey = String(Math.floor(Number(movie.release_year) / 10) * 10);
      if (userSignals.decadeScores[decKey]) {
        const shrunk = userSignals.decadeScores[decKey] / 12;
        personalDelta += Math.max(-1.5, Math.min(1.5, shrunk * 1.5));
      }
    }
    score += Math.max(-6.0, Math.min(6.0, personalDelta));
  }

  // 上位域（91%超）をソフト圧縮して99%への張り付きを防ぐ
  if (score > 91) {
    score = 91 + (score - 91) * 0.55;
  }

  return Math.round(Math.max(0, Math.min(99, score)));
}

function buildRecommendationReason(movie, userSignals) {
  const reasons = [];
  const favDirectors = Array.isArray(state.tasteProfile?.favorite_directors)
    ? state.tasteProfile.favorite_directors.map((d) => String(d).toLowerCase())
    : [];
  const dirLower = String(movie.director || "").toLowerCase();
  if (dirLower && favDirectors.some((d) => dirLower.includes(d))) {
    reasons.push(`監督一致 (${movie.director})`);
  } else if (movie.director && userSignals?.directorScores) {
    const matchedDir = String(movie.director)
      .split(",")
      .map((s) => s.trim())
      .find((d) => (userSignals.directorScores[d.toLowerCase()] || 0) > 0);
    if (matchedDir) reasons.push(`高評価監督 (${matchedDir})`);
  }

  const genreWeights = state.tasteProfile?.genre_weights || {};
  const strongGenres = (movie.genres || []).filter((g) => Number(genreWeights[g] || 0) >= 6);
  if (strongGenres.length > 0) {
    reasons.push(`${strongGenres.slice(0, 2).join("×")}好きに直撃`);
  }

  if (movie.metascore != null && movie.rt_score != null && movie.metascore >= 80 && movie.rt_score >= 90) {
    reasons.push(`批評家絶賛 (Meta ${movie.metascore} / RT ${movie.rt_score}%)`);
  } else if (Number(movie.composite_score || 0) >= 82) {
    reasons.push(`高スコア (${Number(movie.composite_score).toFixed(1)}点)`);
  }

  return reasons.slice(0, 2).join(" ・ ") || "総合評価と好みプロファイルが高一致";
}

function setTastePanelOpen(open) {
  state.isTastePanelOpen = Boolean(open);
  const panel = document.getElementById("taste-guide-panel");
  const toggleBtn = document.getElementById("toggle-taste-panel-btn");
  if (panel) {
    panel.classList.toggle("hidden", !state.isTastePanelOpen);
  }
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-expanded", String(state.isTastePanelOpen));
    toggleBtn.classList.toggle("active", state.isTastePanelOpen);
  }
  try {
    localStorage.setItem(TASTE_PANEL_OPEN_KEY, state.isTastePanelOpen ? "1" : "0");
  } catch {
    // ignore
  }
}

function saveFilterPrefs() {
  const providerEl = document.getElementById("filter-provider");
  const flatrateEl = document.getElementById("filter-flatrate-only");
  const countryEl = document.getElementById("filter-country");
  const excludeIndiaEl = document.getElementById("filter-exclude-india");
  if (!providerEl || !flatrateEl) return;
  try {
    localStorage.setItem(
      FILTER_PREFS_STORAGE_KEY,
      JSON.stringify({
        provider: providerEl.value || "all",
        flatrateOnly: Boolean(flatrateEl.checked),
        country: countryEl ? countryEl.value || "" : "",
        excludeIndia: Boolean(excludeIndiaEl?.checked),
      })
    );
  } catch {
    // ignore
  }
}

function restoreFilterPrefs() {
  const providerEl = document.getElementById("filter-provider");
  const flatrateEl = document.getElementById("filter-flatrate-only");
  const countryEl = document.getElementById("filter-country");
  const excludeIndiaEl = document.getElementById("filter-exclude-india");
  if (!providerEl || !flatrateEl) return;
  try {
    const raw = localStorage.getItem(FILTER_PREFS_STORAGE_KEY);
    if (!raw) return;
    const prefs = JSON.parse(raw);
    if (prefs && typeof prefs === "object") {
      if (typeof prefs.provider === "string") {
        const hasOption = [...providerEl.options].some((o) => o.value === prefs.provider);
        if (hasOption) providerEl.value = prefs.provider;
      }
      if (typeof prefs.flatrateOnly === "boolean") {
        flatrateEl.checked = prefs.flatrateOnly;
      }
      if (countryEl && typeof prefs.country === "string") {
        const hasCountry = [...countryEl.options].some((o) => o.value === prefs.country);
        if (hasCountry) countryEl.value = prefs.country;
      }
      if (excludeIndiaEl && typeof prefs.excludeIndia === "boolean") {
        excludeIndiaEl.checked = prefs.excludeIndia;
      }
    }
  } catch {
    // ignore
  }
}

function clearFilterPrefs() {
  try {
    localStorage.removeItem(FILTER_PREFS_STORAGE_KEY);
  } catch {
    // ignore
  }
}

function setViewMode(mode, { persist = true, rerender = false } = {}) {
  state.viewMode = mode === "list" ? "list" : "card";
  const cardBtn = document.getElementById("view-mode-card");
  const listBtn = document.getElementById("view-mode-list");
  if (cardBtn) {
    const active = state.viewMode === "card";
    cardBtn.classList.toggle("active", active);
    cardBtn.setAttribute("aria-pressed", String(active));
  }
  if (listBtn) {
    const active = state.viewMode === "list";
    listBtn.classList.toggle("active", active);
    listBtn.setAttribute("aria-pressed", String(active));
  }
  const grid = document.getElementById("movies-grid");
  if (grid) {
    grid.classList.toggle("is-list-mode", state.viewMode === "list");
  }
  if (persist) {
    try {
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, state.viewMode);
    } catch {
      // ignore
    }
  }
  if (rerender) {
    renderMovies();
  }
}

function setMobileFiltersOpen(open) {
  state.isMobileFiltersOpen = Boolean(open);
  const collapsible = document.getElementById("filters-collapsible");
  const btn = document.getElementById("toggle-filters-btn");
  if (collapsible) {
    collapsible.classList.toggle("is-open", state.isMobileFiltersOpen);
  }
  if (btn) {
    btn.setAttribute("aria-expanded", String(state.isMobileFiltersOpen));
    btn.classList.toggle("active", state.isMobileFiltersOpen);
  }
}

function loadMySubscriptions() {
  try {
    const raw = localStorage.getItem(MY_SUBSCRIPTIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const allowed = new Set(SUBSCRIPTION_PROVIDERS.map((p) => p.value));
    return [...new Set(parsed.map((v) => String(v || "").trim()).filter((v) => allowed.has(v)))];
  } catch {
    return [];
  }
}

function saveMySubscriptions(list) {
  const allowed = new Set(SUBSCRIPTION_PROVIDERS.map((p) => p.value));
  const clean = [...new Set((list || []).map((v) => String(v || "").trim()).filter((v) => allowed.has(v)))];
  state.mySubscriptions = clean;
  try {
    localStorage.setItem(MY_SUBSCRIPTIONS_STORAGE_KEY, JSON.stringify(clean));
  } catch {
    // ignore
  }
  updateMySubscriptionsUI();
  return clean;
}

function updateMySubscriptionsUI() {
  const count = state.mySubscriptions.length;
  const btn = document.getElementById("my-subs-btn");
  if (btn) {
    btn.textContent = count > 0 ? `📺 マイサブスク (${count})` : "📺 マイサブスク";
    btn.classList.toggle("has-subs", count > 0);
    btn.setAttribute("aria-pressed", String(count > 0));
  }
  const opt = document.querySelector('#filter-provider option[value="__my_subs__"]');
  if (opt) {
    opt.textContent =
      count > 0 ? `📺 マイサブスク（登録済み${count}件）` : "📺 マイサブスク（登録済みすべて）";
  }
}

function openSubscriptionsModal() {
  const listEl = document.getElementById("subs-checkbox-list");
  if (!listEl) return;
  const selectedSet = new Set(state.mySubscriptions);
  listEl.innerHTML = SUBSCRIPTION_PROVIDERS.map((prov) => {
    const checked = selectedSet.has(prov.value);
    return `
      <label class="subs-option-item ${checked ? "is-checked" : ""}">
        <input type="checkbox" value="${escapeHtml(prov.value)}" ${checked ? "checked" : ""} />
        <span class="subs-option-name">${escapeHtml(prov.label)}</span>
      </label>
    `;
  }).join("");

  listEl.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.addEventListener("change", () => {
      cb.closest(".subs-option-item")?.classList.toggle("is-checked", cb.checked);
    });
  });

  const modal = document.getElementById("subscriptions-modal");
  if (modal && !modal.open) {
    modal.showModal();
  }
}

function setVibePanelOpen(open) {
  state.isVibePanelOpen = Boolean(open);
  const panel = document.getElementById("vibe-sliders-panel");
  const btn = document.getElementById("toggle-vibe-panel-btn");
  if (panel) panel.classList.toggle("hidden", !state.isVibePanelOpen);
  if (btn) {
    btn.classList.toggle("active", state.isVibePanelOpen);
    btn.setAttribute("aria-expanded", String(state.isVibePanelOpen));
  }
}

function isVibeFilterCurrentlyActive() {
  return V7.isVibeFilterActive
    ? V7.isVibeFilterActive(state.vibeFilter)
    : state.vibeFilter.paceMin > 1 ||
        state.vibeFilter.mindMin > 1 ||
        state.vibeFilter.immersionMin > 1 ||
        state.vibeFilter.heavinessMax < 5 ||
        state.vibeFilter.familyOk;
}

function updateVibeSliderUI() {
  const f = state.vibeFilter;
  const paceEl = document.getElementById("vibe-pace");
  const mindEl = document.getElementById("vibe-mind");
  const immEl = document.getElementById("vibe-immersion");
  const heavyEl = document.getElementById("vibe-heaviness");
  const famEl = document.getElementById("vibe-family-ok");

  if (paceEl) paceEl.value = String(f.paceMin);
  if (mindEl) mindEl.value = String(f.mindMin);
  if (immEl) immEl.value = String(f.immersionMin);
  if (heavyEl) heavyEl.value = String(f.heavinessMax);
  if (famEl) famEl.checked = Boolean(f.familyOk);

  const setText = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };
  setText("vibe-pace-val", f.paceMin > 1 ? `★${f.paceMin}以上` : "指定なし (1+)");
  setText("vibe-mind-val", f.mindMin > 1 ? `★${f.mindMin}以上` : "指定なし (1+)");
  setText("vibe-immersion-val", f.immersionMin > 1 ? `★${f.immersionMin}以上` : "指定なし (1+)");
  setText("vibe-heaviness-val", f.heavinessMax < 5 ? `★${f.heavinessMax}以下` : "指定なし (5-)");
  setText("vibe-family-val", f.familyOk ? "ON (★4+)" : "OFF");

  const active = isVibeFilterCurrentlyActive();
  const btn = document.getElementById("toggle-vibe-panel-btn");
  const dot = document.getElementById("vibe-active-dot");
  const statusEl = document.getElementById("vibe-panel-status");
  if (btn) btn.classList.toggle("has-active-vibe", active);
  if (dot) dot.classList.toggle("hidden", !active);
  if (statusEl) {
    statusEl.textContent = active ? "絞り込み中（未解析作品は除外）" : "すべて表示（未設定）";
  }
}

function resetVibeFilter() {
  state.vibeFilter = {
    paceMin: 1,
    mindMin: 1,
    immersionMin: 1,
    heavinessMax: 5,
    familyOk: false,
  };
  updateVibeSliderUI();
}

function updateActiveFiltersBadge() {
  const badge = document.getElementById("active-filters-badge");
  if (!badge) return;
  let count = 0;
  if (document.getElementById("filter-decade")?.value !== "all") count += 1;
  if (document.getElementById("filter-year")?.value !== "all") count += 1;
  if (document.getElementById("filter-provider")?.value !== "all") count += 1;
  if (document.getElementById("filter-slot")?.value !== "all") count += 1;
  if (document.getElementById("filter-genre")?.value !== "all") count += 1;
  if (document.getElementById("filter-runtime")?.value) count += 1;
  if (document.getElementById("filter-watch")?.value !== "all") count += 1;
  if (document.getElementById("filter-country")?.value) count += 1;
  if (document.getElementById("filter-flatrate-only")?.checked) count += 1;
  if (document.getElementById("filter-exclude-india")?.checked) count += 1;
  if (document.getElementById("filter-sort")?.value !== "year_desc") count += 1;
  if (Array.isArray(state.presetGenres) && state.presetGenres.length > 0) count += 1;
  if (state.newlyFlatrateFilterActive) count += 1;
  if (state.activeDirector) count += 1;
  if (state.activeMoodTag) count += 1;
  if (isVibeFilterCurrentlyActive()) count += 1;

  badge.textContent = String(count);
  badge.classList.toggle("hidden", count === 0);
}

function switchTasteTab(tabName) {
  state.activeTasteTab = tabName === "guide" ? "guide" : "taste";
  document.querySelectorAll(".tg-tab[data-tg-tab]").forEach((btn) => {
    const isActive = btn.dataset.tgTab === state.activeTasteTab;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });
  const tasteBody = document.getElementById("tg-body-taste");
  const guideBody = document.getElementById("tg-body-guide");
  if (tasteBody) tasteBody.classList.toggle("hidden", state.activeTasteTab !== "taste");
  if (guideBody) guideBody.classList.toggle("hidden", state.activeTasteTab !== "guide");
}

function renderTasteAnalyticsDashboard() {
  const container = document.getElementById("taste-analytics-content");
  const summaryPill = document.getElementById("tg-summary-pill");
  if (!container) return;

  const signals = buildUserPreferenceSignals();
  const avgStr = signals.avgRating != null ? `★${signals.avgRating.toFixed(2)}` : "-";
  if (summaryPill) {
    summaryPill.textContent = `${signals.watchedCount}本視聴済み / 平均 ${avgStr} / 観たい ${signals.watchlistCount}本`;
  }

  // 好きなジャンルTOP5（評価件数ベース、同率時は平均★順）
  const topGenres = [...signals.genreStats]
    .filter((g) => g.count >= 2 && g.avg >= 3.6)
    .sort((a, b) => b.avg - a.avg || b.count - a.count)
    .slice(0, 5);

  // シビア・苦手傾向（平均3.0以下、またはtaste_profileでマイナス重み）
  const lowGenresFromHistory = [...signals.genreStats]
    .filter((g) => g.count >= 2 && g.avg <= 3.1)
    .sort((a, b) => a.avg - b.avg);

  const profileNegativeGenres = Object.entries(state.tasteProfile?.genre_weights || {})
    .filter(([, w]) => Number(w) < 0)
    .sort((a, b) => Number(a[1]) - Number(b[1]))
    .map(([g]) => g);

  const topDirectors = [...signals.directorStats]
    .filter((d) => d.avg >= 4.0)
    .sort((a, b) => b.avg - a.avg || b.count - a.count)
    .slice(0, 6);

  // ★分布バー
  const maxStarCount = Math.max(1, ...Object.values(signals.ratingCounts));
  const starBarsHtml = [5, 4, 3, 2, 1]
    .map((star) => {
      const cnt = signals.ratingCounts[star] || 0;
      const pct = Math.round((cnt / maxStarCount) * 100);
      return `
        <div class="tg-dist-row">
          <span class="tg-dist-label">★${star}</span>
          <div class="tg-dist-track"><div class="tg-dist-fill tg-dist-star-${star}" style="width:${pct}%"></div></div>
          <span class="tg-dist-count">${cnt}</span>
        </div>
      `;
    })
    .join("");

  // 未視聴おすすめTOP5（パーソナル・レコメンド棚）
  const unwatchedScored = state.movies
    .filter((m) => {
      const w = state.watchMap[m.imdb_id];
      return !w || w.status === "unwatched";
    })
    .map((m) => ({
      movie: m,
      match: computeMatchScore(m, state.tasteProfile, signals),
      reason: buildRecommendationReason(m, signals),
    }))
    .sort((a, b) => b.match - a.match || (b.movie.composite_score || 0) - (a.movie.composite_score || 0))
    .slice(0, 5);

  const genreEmoji = {
    Thriller: "🔥",
    "Sci-Fi": "🚀",
    Horror: "👻",
    Action: "⚔️",
    Crime: "🕵️",
    Fantasy: "✨",
    Mystery: "🧩",
    Adventure: "🧭",
    Drama: "🎭",
    Comedy: "😄",
    Animation: "🎨",
    Music: "🎵",
  };

  const topGenresHtml =
    topGenres.length > 0
      ? topGenres
          .map(
            (g) =>
              `<button type="button" class="tg-chip tg-chip-good" data-filter-genre="${escapeHtml(g.genre)}" title="${escapeHtml(g.genre)}で絞り込む">${genreEmoji[g.genre] || "🎬"} ${escapeHtml(g.genre)} <strong>★${g.avg.toFixed(1)}</strong></button>`
          )
          .join("")
      : `<span class="tg-empty-hint">★評価を増やすと好きなジャンルが表示されます</span>`;

  const directorsHtml =
    topDirectors.length > 0
      ? topDirectors
          .map(
            (d) =>
              `<button type="button" class="tg-chip tg-chip-dir" data-director-dig="${escapeHtml(d.name)}" title="${escapeHtml(d.name)}の作品をディグる">🎬 ${escapeHtml(d.name)} ★${d.avg.toFixed(1)}</button>`
          )
          .join("")
      : (state.tasteProfile?.favorite_directors || [])
          .slice(0, 5)
          .map(
            (d) =>
              `<button type="button" class="tg-chip tg-chip-dir" data-director-dig="${escapeHtml(d)}" title="${escapeHtml(d)}の作品をディグる">🎬 ${escapeHtml(d)}</button>`
          )
          .join("");

  const cautiousList =
    lowGenresFromHistory.length > 0
      ? lowGenresFromHistory.slice(0, 3).map((g) => `${g.genre} (★${g.avg.toFixed(1)})`)
      : profileNegativeGenres.slice(0, 3);

  const cautiousHtml =
    cautiousList.length > 0
      ? cautiousList.map((label) => `<span class="tg-chip tg-chip-low">${escapeHtml(label)}</span>`).join("")
      : `<span class="tg-empty-hint">データ蓄積中</span>`;

  const recsHtml =
    unwatchedScored.length > 0
      ? unwatchedScored
          .map(({ movie: m, match, reason }, idx) => {
            const flatrate = (m.jp_providers?.flatrate || []).slice(0, 1);
            return `
              <button type="button" class="tg-rec-item" data-open-movie="${escapeHtml(m.imdb_id)}">
                <div class="tg-rec-rank">#${idx + 1}</div>
                <div class="tg-rec-thumb-wrap">
                  ${renderPosterImageOrFallback(m, { variant: "thumb" })}
                </div>
                <div class="tg-rec-main">
                  <div class="tg-rec-title-row">
                    <span class="tg-rec-title">${escapeHtml(m.title_ja)}</span>
                    <span class="tg-rec-year">(${m.release_year})</span>
                  </div>
                  <div class="tg-rec-reason">${escapeHtml(reason)}</div>
                </div>
                <div class="tg-rec-right">
                  <span class="tg-rec-match">マッチ ${match}%</span>
                  ${flatrate.length > 0 ? `<span class="tg-rec-prov">${escapeHtml(flatrate[0])}</span>` : ""}
                </div>
              </button>
            `;
          })
          .join("")
      : `<p class="tg-empty-hint">未視聴の推薦作品を計算中...</p>`;

  container.innerHTML = `
    <div class="tg-col-profile">
      <div class="tg-summary-box">
        <div class="tg-box-title">あなたのシネマ傾向</div>
        <p class="tg-profile-summary">${escapeHtml(state.tasteProfile?.summary || "評価を付けるほど好みが言語化されます。")}</p>
      </div>

      <div class="tg-stat-block">
        <div class="tg-box-title">好相性ジャンル（クリックで絞込）</div>
        <div class="tg-chips-wrap">${topGenresHtml}</div>
      </div>

      <div class="tg-stat-block">
        <div class="tg-box-title">高評価・相性抜群の監督（クリックで検索）</div>
        <div class="tg-chips-wrap">${directorsHtml}</div>
      </div>

      <div class="tg-bottom-split">
        <div class="tg-stat-block">
          <div class="tg-box-title">シビアに評価しがちな領域</div>
          <div class="tg-chips-wrap">${cautiousHtml}</div>
        </div>
        <div class="tg-stat-block">
          <div class="tg-box-title">★評価の分布 (${signals.ratedCount}本)</div>
          <div class="tg-dist-chart">${starBarsHtml}</div>
        </div>
      </div>
    </div>

    <div class="tg-col-recs">
      <div class="tg-recs-header">
        <div class="tg-box-title">🎯 あなたへの未視聴おすすめ TOP5</div>
        <button type="button" class="tg-see-all-btn" data-apply-preset="tonight_for_me">見放題で一覧を見る →</button>
      </div>
      <div class="tg-recs-list">${recsHtml}</div>
    </div>
  `;
  attachPosterErrorHandlers(container);
}

function openAuthModal() {
  const msg = document.getElementById("auth-message");
  if (msg) msg.textContent = "";
  const modal = document.getElementById("auth-modal");
  if (modal && !modal.open) {
    modal.showModal();
  }
}

function showToast(message, options = {}) {
  const { actionLabel = null, onAction = null, durationMs = 3200 } = options;
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "app-toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = "";

  const textSpan = document.createElement("span");
  textSpan.textContent = message;
  toast.appendChild(textSpan);

  if (actionLabel && typeof onAction === "function") {
    const actionBtn = document.createElement("button");
    actionBtn.type = "button";
    actionBtn.className = "toast-action-btn";
    actionBtn.textContent = actionLabel;
    actionBtn.addEventListener("click", () => {
      toast.classList.remove("show");
      onAction();
    });
    toast.appendChild(actionBtn);
  }

  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, durationMs);
}

async function initApp() {
  await Promise.all([loadTasteProfile(), loadCountryMap()]);

  // v3: 好み分析パネルはデフォルトで非表示（ボタンを押したときだけ開く）
  state.isTastePanelOpen = false;
  try {
    state.viewMode = localStorage.getItem(VIEW_MODE_STORAGE_KEY) === "list" ? "list" : "card";
  } catch {
    state.viewMode = "card";
  }
  state.unknownWatchedDate = loadUnknownWatchedDatePref();

  const cfg = getConfig();
  if (cfg && window.supabase) {
    state.supabase = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    state.isDemo = false;

    const { data: sessionData } = await state.supabase.auth.getSession();
    state.user = sessionData?.session?.user || null;
    state.userEmail = state.user?.email || null;

    await loadSupabaseData();
    if (state.userEmail) {
      await syncLocalWatchMapToSupabase({ silentIfEmpty: true });
    }

    state.supabase.auth.onAuthStateChange(async (event, session) => {
      const prevEmail = state.userEmail;
      state.user = session?.user || null;
      state.userEmail = state.user?.email || null;
      updateAuthUI();

      if (state.userEmail && !prevEmail && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
        await loadSupabaseData();
        await syncLocalWatchMapToSupabase({ silentIfEmpty: true });
        renderMovies();
      }
    });
  } else {
    activateDemoMode();
  }

  populateYearFilter();
  populateGenreFilter();
  state.mySubscriptions = loadMySubscriptions();
  updateMySubscriptionsUI();
  restoreFilterPrefs();
  updateAuthUI();
  setTastePanelOpen(false);
  setViewMode(state.viewMode, { persist: false, rerender: false });
  setUnknownWatchedDatePref(state.unknownWatchedDate, { persist: false });
  setMobileFiltersOpen(false);
  bindEvents();
  renderMovies();
}

const MOVIES_SELECT_V7_COLS =
  "imdb_id,tmdb_id,release_year,year_rank,title_ja,title_en,original_title,original_language," +
  "poster_url,backdrop_url,runtime_minutes,genres,director,selection_slot,selection_category," +
  "composite_score,imdb_rating,imdb_votes,metascore,rt_score,awards_text,awards_bonus," +
  "jp_providers,overview_ja,country,newly_flatrate_providers,newly_flatrate_at," +
  "ai_summary,ai_catchcopy,mood_tags,vibe_scores,similar_ids,map_x,map_y,updated_at";

const MOVIES_SELECT_LEGACY_COLS =
  "imdb_id,tmdb_id,release_year,year_rank,title_ja,title_en,original_title,original_language," +
  "poster_url,backdrop_url,runtime_minutes,genres,director,selection_slot,selection_category," +
  "composite_score,imdb_rating,imdb_votes,metascore,rt_score,awards_text,awards_bonus," +
  "jp_providers,overview_ja,country,newly_flatrate_providers,newly_flatrate_at," +
  "ai_summary,mood_tags,updated_at";

async function fetchAllMoviesPaginated() {
  const pageSize = 1000;
  let selectClause = "*";
  let attemptedLegacyFallback = false;

  while (true) {
    const allMovies = [];
    let from = 0;
    let lastError = null;

    while (true) {
      const to = from + pageSize - 1;
      const { data, error } = await state.supabase
        .from("movies")
        .select(selectClause)
        .order("release_year", { ascending: false })
        .order("year_rank", { ascending: true })
        .range(from, to);

      if (error) {
        lastError = error;
        break;
      }

      const batch = data || [];
      allMovies.push(...batch);
      if (batch.length < pageSize) {
        break;
      }
      from += pageSize;
    }

    if (!lastError) {
      return { data: allMovies, error: null };
    }

    const isMissingCol = V7.isMovieMissingColumnError
      ? V7.isMovieMissingColumnError(lastError)
      : String(lastError.code || "") === "PGRST204" || String(lastError.code || "") === "42703";

    if (!attemptedLegacyFallback && isMissingCol) {
      attemptedLegacyFallback = true;
      selectClause = selectClause === "*" ? MOVIES_SELECT_LEGACY_COLS : "imdb_id,release_year,year_rank,title_ja,title_en,poster_url,runtime_minutes,genres,director,selection_slot,selection_category,composite_score,imdb_rating,imdb_votes,metascore,rt_score,awards_text,awards_bonus,jp_providers,overview_ja,ai_summary,mood_tags,updated_at";
      continue;
    }

    return { data: null, error: lastError };
  }
}

function mergeWatchEntry(remoteEntry, localEntry) {
  if (!remoteEntry && !localEntry) return null;
  if (!remoteEntry) return normalizeWatchEntry(localEntry);
  if (!localEntry) return normalizeWatchEntry(remoteEntry);

  const remoteNorm = normalizeWatchEntry(remoteEntry);
  const localNorm = normalizeWatchEntry(localEntry);
  const remoteTime = remoteNorm.updated_at ? Date.parse(remoteNorm.updated_at) : 0;
  const localTime = localNorm.updated_at ? Date.parse(localNorm.updated_at) : 0;

  if (localTime > remoteTime) {
    return {
      ...localNorm,
      personal_rank: localNorm.personal_rank != null ? localNorm.personal_rank : remoteNorm.personal_rank,
      watched_at: localNorm.watched_at ?? null,
      impression_tags:
        localNorm.impression_tags.length > 0 ? localNorm.impression_tags : remoteNorm.impression_tags,
      memo: localNorm.memo || remoteNorm.memo,
    };
  }
  return {
    ...remoteNorm,
    personal_rank: remoteNorm.personal_rank != null ? remoteNorm.personal_rank : localNorm.personal_rank,
    watched_at: remoteNorm.watched_at ?? null,
    impression_tags:
      remoteNorm.impression_tags.length > 0 ? remoteNorm.impression_tags : localNorm.impression_tags,
  };
}

async function loadSupabaseData() {
  const [moviesRes, watchRes] = await Promise.all([
    fetchAllMoviesPaginated(),
    state.supabase.from("user_watch_status").select("*"),
  ]);

  if (moviesRes.error) {
    console.error("movies取得エラー:", moviesRes.error);
    const errMsg = String(moviesRes.error.message || "");
    const errCode = String(moviesRes.error.code || "");
    if (errCode === "PGRST205" || errMsg.includes("Could not find the table")) {
      activateDemoMode(
        "<strong>デモ表示中（DBテーブル未作成）：</strong>Supabaseに接続済みですが、<code>supabase/schema.sql</code> が未実行のためサンプルデータを表示しています。"
      );
      return;
    }
    activateDemoMode(
      "<strong>デモ表示中（Supabase接続エラー）：</strong>データ取得に失敗したためサンプルデータを表示しています。"
    );
    return;
  }

  state.movies = moviesRes.data || [];
  state.watchMap = {};
  const tagsCache = loadImpressionTagsCache();
  const rankCache = loadPersonalRankCache();
  const watchedAtCache = loadWatchedAtCache();
  const remoteMap = {};

  if (watchRes.error) {
    console.warn("user_watch_status取得警告:", watchRes.error);
  }

  for (const row of watchRes.data || []) {
    // DB上で watched_at カラムが明示的に null の行はそのまま「日付未設定」として扱う（キャッシュで上書きしない）
    const hasWatchedAtCol = Object.prototype.hasOwnProperty.call(row, "watched_at");
    const norm = applyCachedFieldsToEntry(row.imdb_id, row, {
      tagsCache,
      rankCache,
      watchedAtCache,
      allowWatchedAtFallback: !hasWatchedAtCol,
    });
    remoteMap[row.imdb_id] = norm;
  }

  const localMap = loadLocalWatchMap();
  const validMovieIds = new Set(state.movies.map((m) => m.imdb_id));

  for (const [id, remoteEntry] of Object.entries(remoteMap)) {
    state.watchMap[id] = remoteEntry;
  }

  // ブラウザ(localStorage)へ保存された記録・順位・視聴日をマージして確実に復元
  for (const [id, localEntry] of Object.entries(localMap)) {
    if (!validMovieIds.has(id)) continue;
    const enrichedLocal = applyCachedFieldsToEntry(id, localEntry, {
      tagsCache,
      rankCache,
      watchedAtCache,
      allowWatchedAtFallback: !Object.prototype.hasOwnProperty.call(localEntry, "watched_at"),
    });
    if (!remoteMap[id]) {
      if (isMeaningfulWatchEntry(enrichedLocal)) {
        state.watchMap[id] = enrichedLocal;
      }
      continue;
    }
    state.watchMap[id] = mergeWatchEntry(remoteMap[id], enrichedLocal);
  }

  // personal_rank / watched_at キャッシュにあってremote/localどちらにも未登録・未設定のIDも復元
  for (const [id, rank] of Object.entries(rankCache)) {
    if (!validMovieIds.has(id)) continue;
    if (!state.watchMap[id]) {
      state.watchMap[id] = normalizeWatchEntry({
        status: "watched",
        personal_rank: rank,
        watched_at: watchedAtCache[id] || null,
        impression_tags: Array.isArray(tagsCache[id]) ? tagsCache[id] : [],
      });
    } else if (state.watchMap[id].personal_rank == null) {
      state.watchMap[id].personal_rank = rank;
    }
  }

  // 未登録の行のみ watchedAtCache を補完（remoteに存在し watched_at: null の行は日付未設定を尊重）
  for (const [id, dtStr] of Object.entries(watchedAtCache)) {
    if (!validMovieIds.has(id)) continue;
    if (dtStr === "__CLEARED__") continue;
    if (!remoteMap[id] && state.watchMap[id] && !state.watchMap[id].watched_at) {
      state.watchMap[id].watched_at = dtStr;
    }
  }

  // Supabase側から返ってきた最新の personal_rank / watched_at もキャッシュと双方向同期
  syncLocalStorageBackupsForWatchMap(state.watchMap);
}

async function upsertWatchRowsWithColumnFallback(rows) {
  let currentRows = rows.map((r) => ({ ...r }));
  let res = await state.supabase
    .from("user_watch_status")
    .upsert(currentRows, { onConflict: "imdb_id" });

  const fallbackCols = ["personal_rank", "watched_at", "impression_tags"];
  const omitted = [];

  for (let attempt = 0; attempt < fallbackCols.length; attempt += 1) {
    if (!res.error) break;
    const missingCol = fallbackCols.find(
      (col) => !omitted.includes(col) && isMissingColumnError(res.error, col)
    );
    if (!missingCol) break;
    omitted.push(missingCol);
    currentRows = currentRows.map((row) => {
      const copy = { ...row };
      delete copy[missingCol];
      return copy;
    });
    res = await state.supabase
      .from("user_watch_status")
      .upsert(currentRows, { onConflict: "imdb_id" });
  }

  return { ...res, omittedColumns: omitted };
}

async function syncLocalWatchMapToSupabase({ silentIfEmpty = false } = {}) {
  if (state.isDemo || !state.supabase || !state.userEmail || state.isSyncingLocalToCloud) {
    return;
  }
  const localMap = loadLocalWatchMap();
  const validMovieIds = new Set(state.movies.map((m) => m.imdb_id));
  const pendingPayloads = [];

  for (const [imdbId, localEntry] of Object.entries(localMap)) {
    if (!validMovieIds.has(imdbId)) continue;
    if (!isMeaningfulWatchEntry(localEntry)) continue;
    pendingPayloads.push({
      imdb_id: imdbId,
      status: localEntry.status || "unwatched",
      my_rating: localEntry.my_rating != null ? Number(localEntry.my_rating) : null,
      personal_rank: normalizePersonalRank(localEntry.personal_rank),
      watched_at: normalizeWatchedAt(localEntry.watched_at),
      impression_tags: Array.isArray(localEntry.impression_tags) ? localEntry.impression_tags : [],
      memo: localEntry.memo ? String(localEntry.memo) : null,
      updated_at: localEntry.updated_at || new Date().toISOString(),
    });
  }

  if (pendingPayloads.length === 0) {
    if (!silentIfEmpty) {
      showToast("クラウド同期完了：未同期のローカル記録はありません。");
    }
    return;
  }

  state.isSyncingLocalToCloud = true;
  try {
    const { error, omittedColumns } = await upsertWatchRowsWithColumnFallback(pendingPayloads);
    if (!error) {
      if (!omittedColumns || omittedColumns.length === 0) {
        saveLocalWatchMap({});
      }
      for (const p of pendingPayloads) {
        state.watchMap[p.imdb_id] = normalizeWatchEntry(p);
      }
      syncLocalStorageBackupsForWatchMap(state.watchMap);
      showToast(`ブラウザに保存されていた ${pendingPayloads.length} 件の記録をクラウドへ同期しました`);
    } else {
      console.error("ローカル記録の同期エラー:", error);
      showToast(`クラウド同期エラー: ${error.message || "権限または通信エラー"}`);
    }
  } finally {
    state.isSyncingLocalToCloud = false;
  }
}

function updateAuthUI() {
  const badge = document.getElementById("auth-status-badge");
  const btn = document.getElementById("auth-btn");
  if (state.isDemo) {
    badge.textContent = "ブラウザ保存";
    badge.className = "badge badge-muted";
    btn.textContent = "Demo";
    btn.disabled = true;
    return;
  }
  btn.disabled = false;
  if (state.user) {
    badge.textContent = `同期中: ${state.userEmail || state.user.email}`;
    badge.className = "badge badge-flatrate";
    btn.textContent = "ログアウト";
  } else {
    badge.textContent = "ブラウザ保存モード";
    badge.className = "badge badge-muted";
    btn.textContent = "🔒 同期ログイン";
  }
}

function populateYearFilter() {
  const select = document.getElementById("filter-year");
  const years = [...new Set(state.movies.map((m) => m.release_year))].sort((a, b) => b - a);
  select.innerHTML =
    `<option value="all">すべての年</option>` + years.map((y) => `<option value="${y}">${y}年</option>`).join("");
}

function populateGenreFilter() {
  const select = document.getElementById("filter-genre");
  const preferredOrder = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
  ];
  const presentGenres = new Set(state.movies.flatMap((m) => m.genres || []).filter(Boolean));
  const merged = [...new Set([...preferredOrder, ...[...presentGenres].sort()])];
  select.innerHTML =
    `<option value="all">すべてのジャンル</option>` +
    merged.map((g) => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join("");
}

function resetAllFilterControls({ keepPreset = false, preserveSavedPrefs = false } = {}) {
  document.getElementById("filter-decade").value = "all";
  document.getElementById("filter-year").value = "all";
  if (!preserveSavedPrefs) {
    document.getElementById("filter-provider").value = "all";
    document.getElementById("filter-flatrate-only").checked = false;
    const countryEl = document.getElementById("filter-country");
    if (countryEl) countryEl.value = "";
    const excludeIndiaEl = document.getElementById("filter-exclude-india");
    if (excludeIndiaEl) excludeIndiaEl.checked = false;
  }
  document.getElementById("filter-slot").value = "all";
  document.getElementById("filter-genre").value = "all";
  document.getElementById("filter-runtime").value = "";
  document.getElementById("filter-watch").value = "all";
  document.getElementById("filter-query").value = "";
  document.getElementById("filter-sort").value = "year_desc";
  state.newlyFlatrateFilterActive = false;
  state.activeDirector = "";
  state.activeMoodTag = "";
  resetVibeFilter();
  if (!keepPreset) {
    state.activePreset = null;
    state.presetGenres = null;
    updatePresetUI();
  }
}

function clearActivePreset() {
  if (state.activePreset || state.presetGenres) {
    state.activePreset = null;
    state.presetGenres = null;
    updatePresetUI();
  }
}

function updatePresetUI() {
  document.querySelectorAll(".preset-btn[data-preset]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.preset === state.activePreset);
  });
}

function applyPreset(presetName) {
  if (state.activePreset === presetName) {
    resetAllFilterControls({ preserveSavedPrefs: true });
    renderMovies();
    return;
  }

  resetAllFilterControls({ keepPreset: true, preserveSavedPrefs: true });
  state.activePreset = presetName;
  state.presetGenres = null;

  if (presetName === "tonight_for_me") {
    document.getElementById("filter-flatrate-only").checked = true;
    document.getElementById("filter-provider").value =
      state.mySubscriptions.length > 0 ? "__my_subs__" : "all";
    document.getElementById("filter-watch").value = "unwatched";
    document.getElementById("filter-sort").value = "match_desc";
  } else if (presetName === "weekday_short") {
    document.getElementById("filter-flatrate-only").checked = true;
    document.getElementById("filter-provider").value =
      state.mySubscriptions.length > 0 ? "__my_subs__" : "all";
    document.getElementById("filter-watch").value = "unwatched";
    document.getElementById("filter-runtime").value = "115";
    document.getElementById("filter-sort").value = "match_desc";
  } else if (presetName === "holiday_masterpiece") {
    document.getElementById("filter-watch").value = "unwatched";
    document.getElementById("filter-sort").value = "score_desc";
  } else if (presetName === "horror_thriller") {
    document.getElementById("filter-watch").value = "unwatched";
    state.presetGenres = ["Horror", "Thriller"];
  }

  updatePresetUI();
  renderMovies();
}

function movieMatchesDirector(movie, directorName) {
  const target = String(directorName || "").trim().toLowerCase();
  if (!target || !movie?.director) return false;
  return String(movie.director)
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .some((d) => d === target);
}

function activateDirectorDig(directorName) {
  const clean = String(directorName || "").trim();
  if (!clean || clean === "不明") return;
  resetAllFilterControls({ preserveSavedPrefs: false });
  state.activeDirector = clean;
  setActiveMainView("browse");
  const modal = document.getElementById("movie-modal");
  if (modal && modal.open) {
    modal.close();
  }
  renderMovies();
}

function clearDirectorDig() {
  state.activeDirector = "";
  renderMovies();
}

function activateMoodTagFilter(tagName) {
  const clean = String(tagName || "").trim();
  if (!clean) return;
  clearActivePreset();
  state.activeMoodTag = state.activeMoodTag === clean ? "" : clean;
  setActiveMainView("browse");
  const modal = document.getElementById("movie-modal");
  if (modal && modal.open) {
    modal.close();
  }
  renderMovies();
}

function clearMoodTagFilter() {
  state.activeMoodTag = "";
  renderMovies();
}

function renderDirectorDigBanner() {
  const banner = document.getElementById("director-dig-banner");
  if (!banner) return;
  const dirName = String(state.activeDirector || "").trim();
  if (!dirName) {
    banner.innerHTML = "";
    banner.classList.add("hidden");
    return;
  }

  const directorMovies = state.movies.filter((m) => movieMatchesDirector(m, dirName));
  let watchedCount = 0;
  let ratingSum = 0;
  let ratedCount = 0;
  for (const m of directorMovies) {
    const w = state.watchMap[m.imdb_id];
    const isWatched = Boolean(w && (w.status === "watched" || w.my_rating != null));
    if (isWatched) watchedCount += 1;
    if (w?.my_rating != null) {
      ratingSum += Number(w.my_rating);
      ratedCount += 1;
    }
  }
  const avgText = ratedCount > 0 ? `（平均 ★${(ratingSum / ratedCount).toFixed(1)}）` : "";

  banner.innerHTML = `
    <div class="active-banner-text">
      <span>🎬 <strong>${escapeHtml(dirName)}</strong> の作品：視聴済み <strong>${watchedCount} / ${directorMovies.length}本</strong>${escapeHtml(avgText)}</span>
    </div>
    <button id="clear-director-dig-btn" type="button" class="btn btn-secondary active-banner-clear-btn">絞り込み解除</button>
  `;
  banner.classList.remove("hidden");
}

function renderMoodTagBanner(matchedCount) {
  const banner = document.getElementById("mood-tag-banner");
  if (!banner) return;
  const tag = String(state.activeMoodTag || "").trim();
  if (!tag) {
    banner.innerHTML = "";
    banner.classList.add("hidden");
    return;
  }

  banner.innerHTML = `
    <div class="active-banner-text">
      <span>🏷️ タグ絞り込み：<strong>#${escapeHtml(tag)}</strong>（${matchedCount}本）</span>
    </div>
    <button id="clear-mood-tag-btn" type="button" class="btn btn-secondary active-banner-clear-btn">解除</button>
  `;
  banner.classList.remove("hidden");
}

function getFilteredMovies() {
  const decade = document.getElementById("filter-decade").value;
  const year = document.getElementById("filter-year").value;
  const provider = document.getElementById("filter-provider").value;
  const slot = document.getElementById("filter-slot").value;
  const genre = document.getElementById("filter-genre").value;
  const runtimeMaxRaw = document.getElementById("filter-runtime").value;
  const runtimeMax = runtimeMaxRaw ? Number(runtimeMaxRaw) : null;
  const watch = document.getElementById("filter-watch").value;
  const countryFilter = document.getElementById("filter-country")?.value || "";
  const excludeIndia = Boolean(document.getElementById("filter-exclude-india")?.checked);
  const flatrateOnly = document.getElementById("filter-flatrate-only").checked;
  const query = document.getElementById("filter-query").value.trim().toLowerCase();
  const sort = document.getElementById("filter-sort").value;

  const newlyEligibleIds = state.newlyFlatrateFilterActive
    ? new Set(getEligibleNewlyFlatrateItems().map((x) => x.movie.imdb_id))
    : null;

  const userSignals = buildUserPreferenceSignals();

  const filtered = state.movies.filter((m) => {
    if (newlyEligibleIds && !newlyEligibleIds.has(m.imdb_id)) return false;

    if (state.activeDirector && !movieMatchesDirector(m, state.activeDirector)) return false;
    if (state.activeMoodTag) {
      const tags = Array.isArray(m.mood_tags) ? m.mood_tags : [];
      if (!tags.includes(state.activeMoodTag)) return false;
    }

    if (decade !== "all") {
      const start = parseInt(decade.slice(0, 4), 10);
      if (m.release_year < start || m.release_year > start + 9) return false;
    }
    if (year !== "all" && String(m.release_year) !== year) return false;
    if (slot !== "all") {
      if (slot.startsWith("cat:")) {
        if (m.selection_category !== slot.slice(4)) return false;
      } else if (m.selection_slot !== slot) {
        return false;
      }
    }

    if (excludeIndia && isIndianMovieClient(m)) return false;
    if (countryFilter && !matchesCountryFilter(m, countryFilter)) return false;

    const genres = m.genres || [];
    if (genre !== "all" && !genres.includes(genre)) return false;
    if (Array.isArray(state.presetGenres) && state.presetGenres.length > 0) {
      if (!state.presetGenres.some((pg) => genres.includes(pg))) return false;
    }

    if (runtimeMax != null) {
      if (m.runtime_minutes == null || Number(m.runtime_minutes) > runtimeMax) return false;
    }

    const jp = m.jp_providers || { flatrate: [], rent: [], buy: [] };
    const flatrate = jp.flatrate || [];
    const allProv = [...flatrate, ...(jp.rent || []), ...(jp.buy || [])];
    if (flatrateOnly && flatrate.length === 0) return false;
    if (provider === "__my_subs__") {
      if (state.mySubscriptions.length > 0) {
        const targetList = flatrateOnly ? flatrate : allProv;
        const mySubsLower = state.mySubscriptions.map((s) => s.toLowerCase());
        const matched = targetList.some((p) => {
          const pl = String(p || "").toLowerCase();
          return mySubsLower.some((sub) => pl.includes(sub));
        });
        if (!matched) return false;
      }
    } else if (provider !== "all") {
      const targetList = flatrateOnly ? flatrate : allProv;
      if (!targetList.some((p) => p.toLowerCase().includes(provider.toLowerCase()))) return false;
    }

    const wStatus = state.watchMap[m.imdb_id]?.status || "unwatched";
    if (watch !== "all" && wStatus !== watch) return false;

    if (V7.matchesVibeFilter && !V7.matchesVibeFilter(m, state.vibeFilter)) {
      return false;
    }

    if (query) {
      const haystack = [
        m.title_ja,
        m.title_en,
        m.director,
        m.ai_catchcopy,
        getMovieCountryString(m),
        ...(m.genres || []),
        ...(m.mood_tags || []),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  // マッチ度をキャッシュ付与
  for (const m of filtered) {
    m._matchScore = computeMatchScore(m, state.tasteProfile, userSignals);
  }

  filtered.sort((a, b) => {
    if (sort === "match_desc") {
      if ((b._matchScore ?? 0) !== (a._matchScore ?? 0)) {
        return (b._matchScore ?? 0) - (a._matchScore ?? 0);
      }
      return (b.composite_score || 0) - (a.composite_score || 0);
    }
    if (sort === "score_desc") return (b.composite_score || 0) - (a.composite_score || 0);
    if (sort === "imdb_desc") return (b.imdb_rating || 0) - (a.imdb_rating || 0);
    if (sort === "meta_desc") return (b.metascore || 0) - (a.metascore || 0);
    if (b.release_year !== a.release_year) return b.release_year - a.release_year;
    return (a.year_rank || 99) - (b.year_rank || 99);
  });

  state.filteredMovies = filtered;
  return filtered;
}

function renderMoodTags(tags, limit = null, { compact = false } = {}) {
  const list = Array.isArray(tags) ? tags.filter(Boolean) : [];
  if (list.length === 0) return "";
  const shown = limit ? list.slice(0, limit) : list;
  const activeTag = state.activeMoodTag;
  return `<div class="mood-tags-row ${compact ? "is-compact" : ""}">${shown
    .map(
      (tag) =>
        `<button type="button" class="mood-tag ${activeTag === tag ? "is-active" : ""}" data-mood-tag="${escapeHtml(tag)}" title="「${escapeHtml(tag)}」で絞り込む">#${escapeHtml(tag)}</button>`
    )
    .join("")}</div>`;
}

function renderQuickBar(movie, watchEntry, { compact = false } = {}) {
  const status = watchEntry?.status || "unwatched";
  const myRating = watchEntry?.my_rating != null ? Number(watchEntry.my_rating) : 0;
  const isWatchlist = status === "watchlist";
  const isWatched = status === "watched";

  const starsHtml = [1, 2, 3, 4, 5]
    .map((n) => {
      const filled = myRating >= n;
      return `<button type="button" class="quick-star-btn ${filled ? "filled" : ""}" data-quick-action="rate" data-rating="${n}" data-imdb-id="${escapeHtml(movie.imdb_id)}" aria-label="★${n}を付ける" title="★${n}（視聴済み）">★</button>`;
    })
    .join("");

  return `
    <div class="card-quick-bar ${compact ? "is-compact" : ""}" data-quick-bar="true">
      <div class="quick-status-group">
        <button type="button" class="quick-btn ${isWatchlist ? "active-watchlist" : ""}" data-quick-action="watchlist" data-imdb-id="${escapeHtml(movie.imdb_id)}" title="観たいリストをトグル">🔖${compact ? "" : " 観たい"}</button>
        <button type="button" class="quick-btn ${isWatched ? "active-watched" : ""}" data-quick-action="watched" data-imdb-id="${escapeHtml(movie.imdb_id)}" title="視聴済みをトグル">👁${compact ? "" : " 観た"}</button>
      </div>
      <div class="quick-stars-group" role="group" aria-label="ワンタッチ星評価">
        ${starsHtml}
      </div>
    </div>
  `;
}

function renderYearTabsBar() {
  const bar = document.getElementById("year-tabs-bar");
  if (!bar) return;

  const yearStats = new Map();
  let totalMovies = 0;
  let totalWatched = 0;

  for (const m of state.movies) {
    const yr = m.release_year;
    if (!yr) continue;
    totalMovies += 1;
    const w = state.watchMap[m.imdb_id];
    const isWatched = Boolean(w && (w.status === "watched" || w.my_rating != null));
    if (isWatched) totalWatched += 1;

    if (!yearStats.has(yr)) {
      yearStats.set(yr, { total: 0, watched: 0 });
    }
    const st = yearStats.get(yr);
    st.total += 1;
    if (isWatched) st.watched += 1;
  }

  const years = [...yearStats.keys()].sort((a, b) => b - a);
  const activeYear = document.getElementById("filter-year")?.value || "all";

  const tabsHtml = [
    `<button type="button" class="year-tab ${activeYear === "all" ? "active" : ""}" data-year-tab="all" aria-pressed="${activeYear === "all"}">すべて <span class="year-tab-count">(${totalWatched}/${totalMovies})</span></button>`,
    ...years.map((yr) => {
      const st = yearStats.get(yr);
      const isActive = activeYear === String(yr);
      return `<button type="button" class="year-tab ${isActive ? "active" : ""}" data-year-tab="${yr}" aria-pressed="${isActive}">${yr} <span class="year-tab-count">(${st.watched}/${st.total})</span></button>`;
    }),
  ].join("");

  bar.innerHTML = tabsHtml;
}

function getRankedMoviesList({ excludeImdbId = null } = {}) {
  const movieMap = new Map(state.movies.map((m) => [m.imdb_id, m]));
  const items = [];
  for (const [imdbId, rawEntry] of Object.entries(state.watchMap)) {
    if (excludeImdbId && imdbId === excludeImdbId) continue;
    const entry = normalizeWatchEntry(rawEntry);
    if (entry.personal_rank == null) continue;
    const movie = movieMap.get(imdbId);
    if (!movie) continue;
    items.push({ movie, watch: entry, rank: entry.personal_rank });
  }
  items.sort((a, b) => a.rank - b.rank || (b.movie.release_year || 0) - (a.movie.release_year || 0));
  return items;
}

function getUnrankedFiveStarMovies() {
  const movieMap = new Map(state.movies.map((m) => [m.imdb_id, m]));
  const items = [];
  for (const [imdbId, rawEntry] of Object.entries(state.watchMap)) {
    const entry = normalizeWatchEntry(rawEntry);
    if (Number(entry.my_rating) === 5 && entry.personal_rank == null) {
      const movie = movieMap.get(imdbId);
      if (movie) items.push(movie);
    }
  }
  items.sort((a, b) => (b.release_year || 0) - (a.release_year || 0) || (b.composite_score || 0) - (a.composite_score || 0));
  return items;
}

function updateRankingNavBadges() {
  const rankedCount = getRankedMoviesList().length;
  const headerBadge = document.getElementById("header-ranking-count");
  const resultsBadge = document.getElementById("results-ranking-count");
  if (headerBadge) headerBadge.textContent = String(rankedCount);
  if (resultsBadge) resultsBadge.textContent = String(rankedCount);

  const headerRankBtn = document.getElementById("toggle-ranking-btn");
  const headerConstBtn = document.getElementById("toggle-constellation-btn");
  const listSwitchBtn = document.getElementById("main-view-list-btn");
  const resultsRankBtn = document.getElementById("results-ranking-btn");
  const resultsConstBtn = document.getElementById("results-constellation-btn");

  const isBrowse = state.activeMainView === "browse";
  const isRanking = state.activeMainView === "ranking";
  const isConst = state.activeMainView === "constellation";

  if (headerRankBtn) {
    headerRankBtn.classList.toggle("active", isRanking);
    headerRankBtn.setAttribute("aria-pressed", String(isRanking));
  }
  if (headerConstBtn) {
    headerConstBtn.classList.toggle("active", isConst);
    headerConstBtn.setAttribute("aria-pressed", String(isConst));
  }
  if (listSwitchBtn) {
    listSwitchBtn.classList.toggle("active", isBrowse);
    listSwitchBtn.setAttribute("aria-pressed", String(isBrowse));
  }
  if (resultsRankBtn) {
    resultsRankBtn.classList.toggle("active", isRanking);
    resultsRankBtn.setAttribute("aria-pressed", String(isRanking));
  }
  if (resultsConstBtn) {
    resultsConstBtn.classList.toggle("active", isConst);
    resultsConstBtn.setAttribute("aria-pressed", String(isConst));
  }
}

function setActiveMainView(viewName) {
  if (viewName === "ranking" || viewName === "constellation") {
    state.activeMainView = viewName;
  } else {
    state.activeMainView = "browse";
  }
  const browseView = document.getElementById("browse-view");
  const rankingView = document.getElementById("ranking-view");
  const constView = document.getElementById("constellation-view");
  if (browseView) browseView.classList.toggle("hidden", state.activeMainView !== "browse");
  if (rankingView) rankingView.classList.toggle("hidden", state.activeMainView !== "ranking");
  if (constView) constView.classList.toggle("hidden", state.activeMainView !== "constellation");

  updateRankingNavBadges();
  if (state.activeMainView === "ranking") {
    renderRankingView();
  } else if (state.activeMainView === "constellation") {
    renderConstellationView();
  } else {
    renderMovies();
  }
}

function updateLastUpdatedLabel() {
  const el = document.getElementById("last-updated-label");
  if (!el) return;

  let maxTs = -Infinity;
  for (const m of state.movies) {
    if (!m || !m.updated_at) continue;
    const ts = Date.parse(m.updated_at);
    if (!Number.isNaN(ts) && ts > maxTs) {
      maxTs = ts;
    }
  }

  if (!Number.isFinite(maxTs)) {
    el.textContent = "";
    el.classList.add("hidden");
    return;
  }

  const d = new Date(maxTs);
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const y = parts.find((p) => p.type === "year")?.value || String(d.getFullYear());
  const mo = parts.find((p) => p.type === "month")?.value || String(d.getMonth() + 1).padStart(2, "0");
  const day = parts.find((p) => p.type === "day")?.value || String(d.getDate()).padStart(2, "0");

  el.textContent = `最終更新: ${y}/${mo}/${day}`;
  el.title = `最新同期日時: ${d.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`;
  el.classList.remove("hidden");
}

function updateWatchStatsSummary() {
  const el = document.getElementById("watch-stats-pill");
  if (!el) return;
  let watchedCount = 0;
  let watchlistCount = 0;
  for (const entry of Object.values(state.watchMap)) {
    if (!entry) continue;
    if (entry.status === "watched" || entry.my_rating != null) {
      watchedCount += 1;
    } else if (entry.status === "watchlist") {
      watchlistCount += 1;
    }
  }
  el.innerHTML = `
    <span class="watch-stat-chip watched">✓ 観た ${watchedCount}</span>
    <span class="watch-stat-chip watchlist">🔖 観たい ${watchlistCount}</span>
  `;
}

function renderListRow(m) {
  const w = state.watchMap[m.imdb_id];
  const isWatched = w?.status === "watched";
  const isWatchlist = w?.status === "watchlist";
  const personalRank = normalizePersonalRank(w?.personal_rank);
  const flatrate = (m.jp_providers?.flatrate || []).slice(0, 2);
  const matchScore = m._matchScore != null ? m._matchScore : computeMatchScore(m);
  const isHighMatch = matchScore >= 85;
  const catchcopyText = m.ai_catchcopy ? String(m.ai_catchcopy).trim() : "";
  const rowClasses = [
    "movie-list-row",
    isWatched ? "is-watched" : "",
    isWatchlist ? "is-watchlist" : "",
    isHighMatch ? "is-high-match" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return `
    <article class="${rowClasses}" data-imdb-id="${escapeHtml(m.imdb_id)}">
      <div class="list-thumb-wrap">
        ${renderPosterImageOrFallback(m, { variant: "thumb" })}
      </div>
      <div class="list-main">
        <div class="list-meta-line">
          <span class="list-year-rank">${m.release_year} · #${m.year_rank}</span>
          <span class="list-match-chip">マッチ ${matchScore}%</span>
          ${personalRank != null ? `<span class="badge badge-personal-rank">🏆 歴代${personalRank}位</span>` : ""}
          ${flatrate.map((p) => `<span class="badge badge-flatrate">${escapeHtml(p)}</span>`).join("")}
        </div>
        <h2 class="list-title">${escapeHtml(m.title_ja)}</h2>
        ${catchcopyText ? `<div class="card-catchcopy">${escapeHtml(catchcopyText)}</div>` : ""}
        <div class="list-sub">${escapeHtml(m.title_en)}${m.runtime_minutes ? ` · ${m.runtime_minutes}分` : ""} · 総合 ${Number(m.composite_score).toFixed(1)}</div>
        ${renderMoodTags(m.mood_tags, 2, { compact: true })}
      </div>
      <div class="list-quick-col">
        ${renderQuickBar(m, w, { compact: true })}
      </div>
    </article>
  `;
}

function renderMovies() {
  const list = getFilteredMovies();
  const grid = document.getElementById("movies-grid");
  document.getElementById("results-count").textContent = `${list.length}本表示中（全${state.movies.length}本）`;
  renderNewlyFlatrateBanner();
  renderDirectorDigBanner();
  renderMoodTagBanner(list.length);
  updateWatchStatsSummary();
  updateLastUpdatedLabel();
  updateRankingNavBadges();
  updateActiveFiltersBadge();
  renderYearTabsBar();
  renderTasteAnalyticsDashboard();
  if (state.activeMainView === "ranking") {
    renderRankingView();
  } else if (state.activeMainView === "constellation") {
    renderConstellationView();
  }

  grid.classList.toggle("is-list-mode", state.viewMode === "list");

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty-state">条件に一致する映画がありません。フィルタを緩めてお試しください。</p>`;
    return;
  }

  if (state.viewMode === "list") {
    grid.innerHTML = list.map(renderListRow).join("");
    attachPosterErrorHandlers(grid);
    return;
  }

  grid.innerHTML = list
    .map((m) => {
      const w = state.watchMap[m.imdb_id];
      const isWatched = w?.status === "watched";
      const isWatchlist = w?.status === "watchlist";
      const personalRank = normalizePersonalRank(w?.personal_rank);
      const flatrate = (m.jp_providers?.flatrate || []).slice(0, 2);
      const slotClass =
        m.selection_slot === "top12"
          ? "slot-top12"
          : m.selection_category === "観客カルト枠"
            ? "slot-cult"
            : m.selection_category === "日本映画枠"
              ? "slot-japan"
              : "slot-genre";
      const slotLabel =
        m.selection_category === "観客カルト枠"
          ? "🔥 観客カルト枠"
          : m.selection_category === "日本映画枠"
            ? "🇯🇵 日本映画枠"
            : m.selection_category;
      const matchScore = m._matchScore != null ? m._matchScore : computeMatchScore(m);
      const isHighMatch = matchScore >= 85;
      const catchcopyText = m.ai_catchcopy ? String(m.ai_catchcopy).trim() : "";

      const ribbonHtml = isWatched
        ? `<span class="watched-ribbon">✓ WATCHED${w?.my_rating ? ` ★${w.my_rating}` : ""}</span>`
        : isWatchlist
          ? `<span class="watchlist-ribbon">🔖 観たい</span>`
          : "";

      const statusBadge = isWatched
        ? `<span class="badge badge-status">視聴済み${w.my_rating ? ` ★${w.my_rating}` : ""}</span>`
        : isWatchlist
          ? `<span class="badge badge-status-watchlist">観たい</span>`
          : "";

      const rankBadge = personalRank != null ? `<span class="badge badge-personal-rank">🏆 ${personalRank}位</span>` : "";

      const cardClasses = [
        "movie-card",
        isWatched ? "is-watched" : "",
        isWatchlist ? "is-watchlist" : "",
        isHighMatch ? "is-high-match" : "",
      ]
        .filter(Boolean)
        .join(" ");

      return `
        <article class="${cardClasses}" data-imdb-id="${escapeHtml(m.imdb_id)}">
          <div class="poster-wrap">
            ${renderPosterImageOrFallback(m, { variant: "card", imgClass: "card-poster" })}
            <span class="score-pill">${Number(m.composite_score).toFixed(1)}</span>
            <span class="slot-pill ${slotClass}">${escapeHtml(slotLabel)}</span>
            <div class="poster-bottom-badges">
              <span class="match-pill" title="あなたへのマッチ度">マッチ ${matchScore}%</span>
              ${ribbonHtml}
            </div>
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span>${m.release_year}年 · #${m.year_rank}</span>
              <span>${m.runtime_minutes ? `${m.runtime_minutes}分` : ""}</span>
            </div>
            <h2 class="card-title">${escapeHtml(m.title_ja)}</h2>
            ${catchcopyText ? `<div class="card-catchcopy" title="${escapeHtml(catchcopyText)}">${escapeHtml(catchcopyText)}</div>` : ""}
            <div class="card-en">${escapeHtml(m.title_en)}</div>
            <div class="metrics-row">
              <span class="metric-chip">IMDb ${m.imdb_rating ?? "-"}</span>
              ${m.metascore != null ? `<span class="metric-chip">Meta ${m.metascore}</span>` : ""}
              ${m.rt_score != null ? `<span class="metric-chip">RT ${m.rt_score}%</span>` : ""}
            </div>
            ${renderMoodTags(m.mood_tags, 2)}
            <div class="providers-row">
              ${rankBadge}
              ${flatrate.map((p) => `<span class="badge badge-flatrate">${escapeHtml(p)}</span>`).join("")}
              ${statusBadge}
            </div>
          </div>
          ${renderQuickBar(m, w)}
        </article>
      `;
    })
    .join("");
  attachPosterErrorHandlers(grid);
}

function isMissingColumnError(error, columnName) {
  if (!error) return false;
  const code = String(error.code || "");
  const msg = String(error.message || "").toLowerCase();
  const details = String(error.details || "").toLowerCase();
  const target = columnName.toLowerCase();
  if (code === "PGRST204" || code === "42703") {
    return msg.includes(target) || details.includes(target);
  }
  return msg.includes(target) && (msg.includes("column") || msg.includes("schema cache"));
}

function notifyMissingColumnHintOnce(omittedColumns) {
  if (!Array.isArray(omittedColumns) || omittedColumns.length === 0) return;
  if (state.hasShownMissingColumnHint) return;
  state.hasShownMissingColumnHint = true;
  showToast(
    "※DBに新カラム未追加のため順位/視聴日はブラウザに保存しました（schema.sqlのALTER文でDB同期可）",
    { durationMs: 5200 }
  );
}

function requireLoginForRankingAction() {
  if (!state.isDemo && !state.userEmail) {
    showToast("順位を保存するにはログインしてください", {
      actionLabel: "ログイン",
      onAction: openAuthModal,
      durationMs: 4200,
    });
    openAuthModal();
    return false;
  }
  return true;
}

async function upsertWatchStatus(payload) {
  const normalized = normalizeWatchEntry(payload);
  saveImpressionTagsCache(payload.imdb_id, normalized.impression_tags);
  savePersonalRankCacheEntry(payload.imdb_id, normalized.personal_rank);
  saveWatchedAtCacheEntry(payload.imdb_id, normalized.watched_at);
  state.watchMap[payload.imdb_id] = normalized;

  if (state.isDemo) {
    saveLocalWatchMap(state.watchMap);
    return { error: null, mode: "local", omittedColumns: [] };
  }

  // 未ログイン時は即座にブラウザ(localStorage)へ保存して操作を止めない
  if (!state.userEmail) {
    saveLocalWatchEntry(payload.imdb_id, normalized);
    return { error: null, mode: "local", omittedColumns: [] };
  }

  const rowPayload = {
    imdb_id: payload.imdb_id,
    status: normalized.status,
    my_rating: normalized.my_rating,
    personal_rank: normalized.personal_rank,
    watched_at: normalized.watched_at,
    impression_tags: normalized.impression_tags,
    memo: normalized.memo ? String(normalized.memo) : null,
    updated_at: normalized.updated_at || new Date().toISOString(),
  };

  const { error, omittedColumns } = await upsertWatchRowsWithColumnFallback([rowPayload]);

  if (error) {
    // クラウド失敗時もローカルバックアップは保持
    saveLocalWatchEntry(payload.imdb_id, normalized);
    return { error, mode: "error", omittedColumns: omittedColumns || [] };
  }

  if (omittedColumns && omittedColumns.length > 0) {
    // DBに新カラム未追加時はブラウザキャッシュ・ローカルにも確実に保持
    saveLocalWatchEntry(payload.imdb_id, normalized);
    notifyMissingColumnHintOnce(omittedColumns);
  } else {
    // クラウド保存が完全成功したらローカル未同期キューから対象IDを除去
    const localMap = loadLocalWatchMap();
    if (localMap[payload.imdb_id]) {
      delete localMap[payload.imdb_id];
      saveLocalWatchMap(localMap);
    }
  }
  return { error: null, mode: "cloud", omittedColumns: omittedColumns || [] };
}

async function persistWatchEntriesBatch(entries) {
  if (!Array.isArray(entries) || entries.length === 0) {
    return { error: null, mode: "local", omittedColumns: [] };
  }

  const nowIso = new Date().toISOString();
  const normalizedList = entries.map((item) => {
    const norm = normalizeWatchEntry({ ...item, updated_at: item.updated_at || nowIso });
    saveImpressionTagsCache(norm.imdb_id, norm.impression_tags);
    savePersonalRankCacheEntry(norm.imdb_id, norm.personal_rank);
    saveWatchedAtCacheEntry(norm.imdb_id, norm.watched_at);
    state.watchMap[norm.imdb_id] = norm;
    return norm;
  });

  if (state.isDemo) {
    saveLocalWatchMap(state.watchMap);
    return { error: null, mode: "local", omittedColumns: [] };
  }

  if (!state.userEmail) {
    const localMap = loadLocalWatchMap();
    for (const norm of normalizedList) {
      localMap[norm.imdb_id] = norm;
    }
    saveLocalWatchMap(localMap);
    return { error: null, mode: "local", omittedColumns: [] };
  }

  const payloads = normalizedList.map((norm) => ({
    imdb_id: norm.imdb_id,
    status: norm.status,
    my_rating: norm.my_rating,
    personal_rank: norm.personal_rank,
    watched_at: norm.watched_at,
    impression_tags: norm.impression_tags,
    memo: norm.memo ? String(norm.memo) : null,
    updated_at: norm.updated_at,
  }));

  const { error, omittedColumns } = await upsertWatchRowsWithColumnFallback(payloads);
  if (error) {
    const localMap = loadLocalWatchMap();
    for (const norm of normalizedList) {
      localMap[norm.imdb_id] = norm;
    }
    saveLocalWatchMap(localMap);
    return { error, mode: "error", omittedColumns: omittedColumns || [] };
  }

  if (omittedColumns && omittedColumns.length > 0) {
    const localMap = loadLocalWatchMap();
    for (const norm of normalizedList) {
      localMap[norm.imdb_id] = norm;
    }
    saveLocalWatchMap(localMap);
    notifyMissingColumnHintOnce(omittedColumns);
  } else {
    const localMap = loadLocalWatchMap();
    let modifiedLocal = false;
    for (const norm of normalizedList) {
      if (localMap[norm.imdb_id]) {
        delete localMap[norm.imdb_id];
        modifiedLocal = true;
      }
    }
    if (modifiedLocal) {
      saveLocalWatchMap(localMap);
    }
  }
  return { error: null, mode: "cloud", omittedColumns: omittedColumns || [] };
}

async function applyRankedOrder(orderedImdbIds, removedImdbIds = []) {
  const movieMap = new Map(state.movies.map((m) => [m.imdb_id, m]));
  const updatedEntries = [];
  const nowIso = new Date().toISOString();
  const todayStr = getTodayDateString();

  orderedImdbIds.forEach((imdbId, idx) => {
    if (!movieMap.has(imdbId)) return;
    const prev = normalizeWatchEntry(state.watchMap[imdbId]);
    const nextStatus = "watched";
    const nextRank = idx + 1;
    const nextWatchedAt = prev.watched_at || (state.unknownWatchedDate ? null : todayStr);
    updatedEntries.push({
      ...prev,
      imdb_id: imdbId,
      status: nextStatus,
      personal_rank: nextRank,
      watched_at: nextWatchedAt,
      updated_at: nowIso,
    });
  });

  for (const imdbId of removedImdbIds) {
    const prev = normalizeWatchEntry(state.watchMap[imdbId]);
    updatedEntries.push({
      ...prev,
      imdb_id: imdbId,
      personal_rank: null,
      updated_at: nowIso,
    });
  }

  for (const entry of updatedEntries) {
    state.watchMap[entry.imdb_id] = normalizeWatchEntry(entry);
    savePersonalRankCacheEntry(entry.imdb_id, entry.personal_rank);
    saveWatchedAtCacheEntry(entry.imdb_id, entry.watched_at);
  }

  renderMovies();
  return persistWatchEntriesBatch(updatedEntries);
}

function notifyLocalSaveOnce() {
  if (state.isDemo) {
    if (!state.hasShownOfflineSaveHint) {
      state.hasShownOfflineSaveHint = true;
      showToast("ブラウザに保存しました");
    }
    return;
  }
  showToast("ブラウザに保存しました（クラウド同期するにはログイン）", {
    actionLabel: "ログイン",
    onAction: openAuthModal,
    durationMs: 3600,
  });
}

async function handleQuickAction(action, imdbId, ratingValue = null) {
  const prev = normalizeWatchEntry(state.watchMap[imdbId]);
  let nextStatus = prev.status;
  let nextRating = prev.my_rating;
  let nextWatchedAt = prev.watched_at;

  if (action === "watchlist") {
    nextStatus = prev.status === "watchlist" ? "unwatched" : "watchlist";
    if (nextStatus === "unwatched") {
      nextRating = prev.my_rating;
    }
  } else if (action === "watched") {
    if (prev.status === "watched") {
      nextStatus = "unwatched";
      nextRating = null;
      nextWatchedAt = null;
    } else {
      nextStatus = "watched";
      if (state.unknownWatchedDate) {
        nextWatchedAt = prev.watched_at || null;
      } else {
        nextWatchedAt = prev.watched_at || getTodayDateString();
      }
    }
  } else if (action === "rate") {
    nextStatus = "watched";
    nextRating = Number(ratingValue);
    if (state.unknownWatchedDate) {
      nextWatchedAt = prev.watched_at || null;
    } else {
      nextWatchedAt = prev.watched_at || getTodayDateString();
    }
  }

  const payload = {
    imdb_id: imdbId,
    status: nextStatus,
    my_rating: nextRating,
    personal_rank: prev.personal_rank,
    watched_at: nextWatchedAt,
    impression_tags: prev.impression_tags || [],
    memo: prev.memo ? prev.memo : null,
    updated_at: new Date().toISOString(),
  };

  // Optimistic UI: 先にローカル状態を更新して即座に再描画
  state.watchMap[imdbId] = normalizeWatchEntry(payload);
  if (state.isDemo || !state.userEmail) {
    saveLocalWatchEntry(imdbId, payload);
  }
  savePersonalRankCacheEntry(imdbId, payload.personal_rank);
  saveWatchedAtCacheEntry(imdbId, payload.watched_at, { explicitClear: payload.watched_at == null });
  renderMovies();

  const { error, mode } = await upsertWatchStatus(payload);
  if (error) {
    // クラウド保存に失敗した場合はローカルには保持しつつエラー内容を明示通知
    showToast(`クラウド保存エラー（ブラウザに一時保存済み）: ${error.message || "RLS権限/通信エラー"}`, {
      actionLabel: "ログイン",
      onAction: openAuthModal,
      durationMs: 4500,
    });
    return;
  }

  // ★5ワンタッチ評価時は控えめなアクション付きトーストで2択バトルへの導線を表示
  if (action === "rate" && nextRating === 5) {
    const movie = state.movies.find((m) => m.imdb_id === imdbId);
    const title = movie ? movie.title_ja : "この作品";
    showToast(`『${title}』を★5にしました`, {
      actionLabel: "⚔️ 順位を決める",
      onAction: () => startBattleForMovie(imdbId),
      durationMs: 6000,
    });
    return;
  }

  if (mode === "local") {
    notifyLocalSaveOnce();
  }
}

/* ============================================================================
   ⚔️ 2択バトル（二分探索）ランキングモーダル
   ============================================================================ */

function buildBattleCardHtml(movie, roleLabel, roleSub, sideKey, rankBadgeText = null) {
  const posterHtml = renderPosterImageOrFallback(movie, { variant: "battle", imgClass: "battle-poster" });

  const w = normalizeWatchEntry(state.watchMap[movie.imdb_id]);
  const ratingChip = w.my_rating != null ? `<span class="battle-star-chip">★${w.my_rating}</span>` : "";

  return `
    <div class="battle-card ${sideKey === "challenger" ? "battle-card-challenger" : "battle-card-opponent"}">
      <div class="battle-card-role-row">
        <span class="battle-role-badge">${escapeHtml(roleLabel)}</span>
        ${rankBadgeText ? `<span class="battle-rank-pill">${escapeHtml(rankBadgeText)}</span>` : ""}
      </div>
      <div class="battle-poster-box">${posterHtml}</div>
      <div class="battle-card-info">
        <h3 class="battle-card-title">${escapeHtml(movie.title_ja)}</h3>
        <div class="battle-card-meta">${movie.release_year || ""}年${movie.director ? ` / ${escapeHtml(movie.director)}` : ""}</div>
        <div class="battle-card-sub">
          ${ratingChip}
          ${roleSub ? `<span class="battle-role-sub">${escapeHtml(roleSub)}</span>` : ""}
        </div>
      </div>
      <button type="button" class="btn btn-primary battle-pick-btn" data-battle-pick="${sideKey}">👆 こっちが上！</button>
    </div>
  `;
}

function renderBattleModal() {
  const b = state.battle;
  const body = document.getElementById("battle-modal-body");
  if (!b || !body) return;

  const target = b.targetMovie;
  const queueRemaining = b.queue.length;

  if (b.phase === "result") {
    const nextMovie = queueRemaining > 0 ? b.queue[0] : null;
    const posterHtml = renderPosterImageOrFallback(target, { variant: "battle", imgClass: "battle-result-poster" });

    body.innerHTML = `
      <div class="modal-header battle-modal-header">
        <div>
          <h2>⚔️ 2択バトル結果</h2>
          <p class="battle-subtitle">歴代マイランキングを更新しました</p>
        </div>
        <button type="button" class="icon-close" data-close-modal="battle-modal" aria-label="閉じる">&times;</button>
      </div>
      <div class="battle-result-box">
        <div class="battle-result-crown">🏆 歴代 ${b.decidedRank}位 に決定！</div>
        <div class="battle-result-movie">
          <div class="battle-result-poster-wrap">${posterHtml}</div>
          <div class="battle-result-info">
            <h3>${escapeHtml(target.title_ja)}</h3>
            <p>${target.release_year}年 / 監督: ${escapeHtml(target.director || "不明")}</p>
            <p class="battle-result-total">現在 ${getRankedMoviesList().length}作品がランクイン中</p>
          </div>
        </div>
        <div class="battle-result-actions">
          ${
            nextMovie
              ? `<button type="button" class="btn btn-primary" data-battle-next="true">⚔️ 次の作品の順位を決める (残り${queueRemaining}本)</button>`
              : ""
          }
          <button type="button" class="btn btn-secondary" data-battle-open-ranking="true">🏆 マイランキングを見る</button>
          <button type="button" class="btn btn-ghost" data-close-modal="battle-modal">閉じる</button>
        </div>
      </div>
    `;
    attachPosterErrorHandlers(body);
    return;
  }

  const mid = Math.floor((b.low + b.high) / 2);
  const opponentEntry = b.ranked[mid];
  const opponent = opponentEntry.movie;
  const estRemaining = Math.max(1, Math.ceil(Math.log2(b.high - b.low + 1)));

  body.innerHTML = `
    <div class="modal-header battle-modal-header">
      <div>
        <h2>⚔️ 2択バトル（どっちが上？）</h2>
        <div class="battle-progress-bar">
          <span class="battle-progress-chip">第 ${b.step} 戦</span>
          <span class="battle-progress-chip battle-progress-remain">あと最大 ${estRemaining} 回で決定</span>
          ${queueRemaining > 0 ? `<span class="battle-progress-chip battle-progress-queue">連続待機 残り${queueRemaining}本</span>` : ""}
        </div>
      </div>
      <button type="button" class="icon-close" data-close-modal="battle-modal" aria-label="閉じる">&times;</button>
    </div>

    <div class="battle-arena">
      ${buildBattleCardHtml(target, "挑戦者", "今回順位を決める", "challenger", `現在 ${b.low + 1}〜${b.high + 1}位 付近`)}
      <div class="battle-vs-divider" aria-hidden="true"><span>VS</span></div>
      ${buildBattleCardHtml(opponent, "対戦相手", "ランク済み作品", "opponent", `暫定 ${mid + 1}位`)}
    </div>

    <div class="battle-modal-footer">
      <span class="battle-hint">※ 選んだ方がより上位（1位側）になります</span>
      <button type="button" class="btn btn-ghost" data-close-modal="battle-modal">中断して閉じる</button>
    </div>
  `;
  attachPosterErrorHandlers(body);
}

async function finalizeBattlePlacement(insertIndex) {
  const b = state.battle;
  if (!b || b.isSaving) return;
  b.isSaving = true;

  const newOrderIds = b.ranked.map((item) => item.movie.imdb_id);
  newOrderIds.splice(insertIndex, 0, b.targetMovie.imdb_id);

  b.decidedRank = insertIndex + 1;
  b.phase = "result";

  // 参加時にwatchedでなければ自動でwatched & watched_atをセット（視聴日不明モード時はnullのまま）
  const prevTarget = normalizeWatchEntry(state.watchMap[b.targetMovie.imdb_id]);
  const nextWatchedAt = prevTarget.watched_at || (state.unknownWatchedDate ? null : getTodayDateString());
  state.watchMap[b.targetMovie.imdb_id] = normalizeWatchEntry({
    ...prevTarget,
    imdb_id: b.targetMovie.imdb_id,
    status: "watched",
    personal_rank: b.decidedRank,
    watched_at: nextWatchedAt,
  });

  renderBattleModal();
  const { error } = await applyRankedOrder(newOrderIds);
  b.isSaving = false;
  if (error) {
    showToast(`クラウド保存エラー（ブラウザに保存済み）: ${error.message || "RLS権限/通信エラー"}`, {
      durationMs: 4500,
    });
  }
}

async function handleBattleChoice(sideKey) {
  const b = state.battle;
  if (!b || b.phase !== "compare" || b.isSaving) return;

  const mid = Math.floor((b.low + b.high) / 2);
  if (sideKey === "challenger") {
    b.high = mid;
  } else if (sideKey === "opponent") {
    b.low = mid + 1;
  } else {
    return;
  }

  if (b.low >= b.high) {
    await finalizeBattlePlacement(b.low);
  } else {
    b.step += 1;
    renderBattleModal();
  }
}

function startBattleForMovie(imdbId, queueIds = []) {
  if (!requireLoginForRankingAction()) return;

  const targetMovie = state.movies.find((m) => m.imdb_id === imdbId);
  if (!targetMovie) return;

  // 既存のランク済み作品（対象映画自身を除く）を昇順取得し、1..Nとして扱う
  const ranked = getRankedMoviesList({ excludeImdbId: imdbId });
  const remainingQueue = (Array.isArray(queueIds) ? queueIds : [])
    .filter((id) => id && id !== imdbId)
    .map((id) => state.movies.find((m) => m.imdb_id === id))
    .filter(Boolean);

  const n = ranked.length;
  state.battle = {
    targetMovie,
    ranked,
    low: 0,
    high: n,
    step: 1,
    totalEstimatedSteps: n > 0 ? Math.max(1, Math.ceil(Math.log2(n + 1))) : 0,
    queue: remainingQueue,
    phase: n === 0 ? "result" : "compare",
    decidedRank: 1,
    isSaving: false,
  };

  const modal = document.getElementById("battle-modal");
  if (modal && !modal.open) {
    modal.showModal();
  }

  if (n === 0) {
    finalizeBattlePlacement(0);
  } else {
    renderBattleModal();
  }
}

function startBatchFiveStarBattle() {
  if (!requireLoginForRankingAction()) return;

  const unranked = getUnrankedFiveStarMovies();
  if (unranked.length === 0) {
    showToast("未ランクの★5作品はありません。");
    return;
  }
  const [first, ...rest] = unranked;
  startBattleForMovie(
    first.imdb_id,
    rest.map((m) => m.imdb_id)
  );
}

/* ============================================================================
   🏆 マイランキング & 📅 年間鑑賞ログ ビュー
   ============================================================================ */

function getEffectiveWatchedDate(watchEntry) {
  if (!watchEntry) return null;
  return normalizeWatchedAt(watchEntry.watched_at);
}

function renderAnnualLogView() {
  const container = document.getElementById("annual-log-content");
  if (!container) return;

  const movieMap = new Map(state.movies.map((m) => [m.imdb_id, m]));
  const watchedLogs = [];

  for (const [imdbId, rawEntry] of Object.entries(state.watchMap)) {
    const entry = normalizeWatchEntry(rawEntry);
    if (entry.status !== "watched" && entry.my_rating == null) continue;
    const movie = movieMap.get(imdbId);
    if (!movie) continue;
    const effectiveDate = getEffectiveWatchedDate(entry);
    const logYear = effectiveDate ? effectiveDate.slice(0, 4) : "不明";
    watchedLogs.push({
      movie,
      watch: entry,
      effectiveDate,
      logYear,
    });
  }

  // 年ごとの集計
  const yearCounts = new Map();
  for (const item of watchedLogs) {
    yearCounts.set(item.logYear, (yearCounts.get(item.logYear) || 0) + 1);
  }
  const sortedYears = [...yearCounts.keys()].sort((a, b) => {
    if (a === "不明") return 1;
    if (b === "不明") return -1;
    return Number(b) - Number(a);
  });

  if (
    state.selectedLogYear !== "all" &&
    !yearCounts.has(state.selectedLogYear)
  ) {
    state.selectedLogYear = "all";
  }

  const targetLogs = watchedLogs
    .filter((item) => state.selectedLogYear === "all" || item.logYear === state.selectedLogYear)
    .sort((a, b) => {
      const da = a.effectiveDate || "0000-00-00";
      const db = b.effectiveDate || "0000-00-00";
      if (db !== da) return db.localeCompare(da);
      return (b.watch.my_rating || 0) - (a.watch.my_rating || 0);
    });

  // サマリー集計
  const totalWatched = targetLogs.length;
  const ratedItems = targetLogs.filter((x) => x.watch.my_rating != null);
  const avgStar =
    ratedItems.length > 0
      ? (ratedItems.reduce((acc, x) => acc + Number(x.watch.my_rating), 0) / ratedItems.length).toFixed(2)
      : "-";
  const fiveStarCount = ratedItems.filter((x) => Number(x.watch.my_rating) === 5).length;

  const genreCounts = new Map();
  for (const item of targetLogs) {
    for (const g of item.movie.genres || []) {
      genreCounts.set(g, (genreCounts.get(g) || 0) + 1);
    }
  }
  const topGenres = [...genreCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3);

  const yearTabsHtml = [
    `<button type="button" class="log-year-tab ${state.selectedLogYear === "all" ? "active" : ""}" data-log-year="all">すべて <span>(${watchedLogs.length}本)</span></button>`,
    ...sortedYears.map((yr) => {
      const cnt = yearCounts.get(yr) || 0;
      const label = yr === "不明" ? "日付未設定" : `${yr}年`;
      const active = state.selectedLogYear === yr;
      return `<button type="button" class="log-year-tab ${active ? "active" : ""}" data-log-year="${escapeHtml(yr)}">${escapeHtml(label)} <span>(${cnt}本)</span></button>`;
    }),
  ].join("");

  const yearSelectOptionsHtml = [
    `<option value="all" ${state.selectedLogYear === "all" ? "selected" : ""}>すべて (${watchedLogs.length}本)</option>`,
    ...sortedYears.map((yr) => {
      const cnt = yearCounts.get(yr) || 0;
      const label = yr === "不明" ? `日付未設定 (${cnt}本)` : `${yr}年 (${cnt}本)`;
      return `<option value="${escapeHtml(yr)}" ${state.selectedLogYear === yr ? "selected" : ""}>${escapeHtml(label)}</option>`;
    }),
  ].join("");

  const topGenresHtml =
    topGenres.length > 0
      ? topGenres.map(([g, c]) => `<span class="log-genre-chip">${escapeHtml(g)} (${c})</span>`).join("")
      : `<span class="tg-empty-hint">-</span>`;

  const logsListHtml =
    targetLogs.length > 0
      ? targetLogs
          .map(({ movie: m, watch: w, effectiveDate }) => {
            const dateBadge = effectiveDate ? effectiveDate.replaceAll("-", "/") : "📅 日付未設定";
            const isUnset = !effectiveDate;
            const tags = w.impression_tags || [];
            const memoPreview = w.memo ? String(w.memo).trim() : "";
            return `
              <article class="annual-log-row" data-ranking-detail="${escapeHtml(m.imdb_id)}">
                <div class="log-date-col">
                  <span class="log-date-badge ${isUnset ? "is-unset" : ""}" title="${isUnset ? "視聴日未設定（タップして日付を設定できます）" : "視聴日"}">${escapeHtml(dateBadge)}</span>
                </div>
                <div class="log-thumb-wrap">
                  ${renderPosterImageOrFallback(m, { variant: "thumb" })}
                </div>
                <div class="log-row-main">
                  <div class="log-row-title-line">
                    <h3 class="log-row-title">${escapeHtml(m.title_ja)}</h3>
                    <span class="log-release-year">(${m.release_year})</span>
                    ${w.my_rating != null ? `<span class="ranking-star-pill">★${w.my_rating}</span>` : ""}
                    ${w.personal_rank != null ? `<span class="badge badge-personal-rank">🏆 ${w.personal_rank}位</span>` : ""}
                  </div>
                  ${
                    tags.length > 0
                      ? `<div class="log-row-chips">${tags.map((t) => `<span class="ranking-imp-chip">${escapeHtml(t)}</span>`).join("")}</div>`
                      : ""
                  }
                  ${memoPreview ? `<p class="log-row-memo">${escapeHtml(memoPreview)}</p>` : ""}
                </div>
              </article>
            `;
          })
          .join("")
      : `
        <div class="ranking-empty-card">
          <div class="ranking-empty-icon">📅</div>
          <h3>この期間の鑑賞ログはまだありません</h3>
          <p>映画を「👁 観た」や「★1〜5」で記録すると、視聴日が自動で記録されてここに時系列で並びます。</p>
        </div>
      `;

  container.innerHTML = `
    <div class="log-filter-bar">
      <div class="log-year-tabs">${yearTabsHtml}</div>
      <div class="log-year-select-wrap">
        <select id="log-year-select" aria-label="鑑賞年で絞り込み">${yearSelectOptionsHtml}</select>
      </div>
    </div>
    <div class="log-summary-grid">
      <div class="log-stat-card">
        <div class="log-stat-label">視聴本数</div>
        <div class="log-stat-value">${totalWatched}<span>本</span></div>
      </div>
      <div class="log-stat-card">
        <div class="log-stat-label">平均★評価</div>
        <div class="log-stat-value">${avgStar === "-" ? "-" : `★${avgStar}`}</div>
      </div>
      <div class="log-stat-card">
        <div class="log-stat-label">★5 傑作</div>
        <div class="log-stat-value">${fiveStarCount}<span>本</span></div>
      </div>
      <div class="log-stat-card log-stat-genres">
        <div class="log-stat-label">よく観たジャンル TOP3</div>
        <div class="log-top-genres">${topGenresHtml}</div>
      </div>
    </div>
    <div class="annual-log-list">${logsListHtml}</div>
  `;
  attachPosterErrorHandlers(container);
}

function switchRankingTab(tabName) {
  state.activeRankingTab = tabName === "log" ? "log" : "best";
  document.querySelectorAll(".ranking-subtab[data-ranking-tab]").forEach((btn) => {
    const active = btn.dataset.rankingTab === state.activeRankingTab;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", String(active));
  });
  const bestPanel = document.getElementById("ranking-best-panel");
  const logPanel = document.getElementById("ranking-log-panel");
  if (bestPanel) bestPanel.classList.toggle("hidden", state.activeRankingTab !== "best");
  if (logPanel) logPanel.classList.toggle("hidden", state.activeRankingTab !== "log");

  const titleEl = document.getElementById("ranking-page-title");
  if (titleEl) {
    titleEl.textContent =
      state.activeRankingTab === "log" ? "📅 年間鑑賞ログ" : "🏆 マイランキング（歴代ベスト）";
  }
  renderRankingView();
}

function renderRankingView() {
  const rankedList = getRankedMoviesList();
  const unrankedFiveStars = getUnrankedFiveStarMovies();

  const subtitleEl = document.getElementById("ranking-subtitle");
  if (subtitleEl) {
    if (state.activeRankingTab === "log") {
      subtitleEl.textContent = "視聴日ごとの鑑賞履歴・サマリー（行をタップして視聴日やメモを編集できます）";
    } else {
      subtitleEl.textContent =
        rankedList.length > 0
          ? `現在 ${rankedList.length}作品を順位付け済み（↑↓で微調整・⚔️ 再戦で順位を決め直せます）`
          : "まだランクインした作品がありません。★5評価や詳細画面から2択バトルで順位を決めましょう！";
    }
  }

  if (state.activeRankingTab === "log") {
    renderAnnualLogView();
    return;
  }

  const bannerEl = document.getElementById("ranking-unranked-banner");
  if (bannerEl) {
    if (unrankedFiveStars.length > 0) {
      bannerEl.classList.remove("hidden");
      bannerEl.innerHTML = `
        <div class="ranking-banner-text">
          <span class="ranking-banner-badge">★5</span>
          <span>未ランクの★5が <strong>${unrankedFiveStars.length}本</strong> あります</span>
        </div>
        <button id="start-batch-battle-btn" type="button" class="btn btn-primary">⚔️ まとめて順位を決める</button>
      `;
    } else {
      bannerEl.classList.add("hidden");
      bannerEl.innerHTML = "";
    }
  }

  const listEl = document.getElementById("ranking-list");
  if (!listEl) return;

  if (rankedList.length === 0) {
    listEl.innerHTML = `
      <div class="ranking-empty-card">
        <div class="ranking-empty-icon">🏆</div>
        <h3>マイランキングはまだ空です</h3>
        <p>映画カードで <strong>★5</strong> をタップしてトーストの <code>⚔️ 順位を決める</code> を押すか、詳細モーダルから任意の映画をランキングに参加させられます。</p>
        <button type="button" class="btn btn-secondary" data-ranking-go-browse="true">← 映画一覧で★5を付ける</button>
      </div>
    `;
    return;
  }

  listEl.innerHTML = rankedList
    .map(({ movie: m, watch: w }, idx) => {
      const displayRank = idx + 1;
      const tierClass =
        displayRank === 1 ? "rank-tier-1" : displayRank === 2 ? "rank-tier-2" : displayRank === 3 ? "rank-tier-3" : "rank-tier-other";
      const rankText = displayRank === 1 ? "👑 1位" : `${displayRank}位`;
      const flatrate = (m.jp_providers?.flatrate || []).slice(0, 2);
      const tags = w.impression_tags || [];
      const isFirst = idx === 0;
      const isLast = idx === rankedList.length - 1;

      return `
        <article class="ranking-row ${tierClass}" data-imdb-id="${escapeHtml(m.imdb_id)}">
          <div class="ranking-rank-badge ${tierClass}">${rankText}</div>
          <button type="button" class="ranking-thumb-btn" data-ranking-detail="${escapeHtml(m.imdb_id)}" aria-label="${escapeHtml(m.title_ja)}の詳細を開く">
            ${renderPosterImageOrFallback(m, { variant: "thumb" })}
          </button>
          <div class="ranking-row-main" data-ranking-detail="${escapeHtml(m.imdb_id)}">
            <div class="ranking-row-title-line">
              <h3 class="ranking-row-title">${escapeHtml(m.title_ja)}</h3>
              ${w.my_rating != null ? `<span class="ranking-star-pill">★${w.my_rating}</span>` : ""}
            </div>
            <div class="ranking-row-meta">${m.release_year}年${m.director ? ` / 監督: ${escapeHtml(m.director)}` : ""}${m.runtime_minutes ? ` / ${m.runtime_minutes}分` : ""}</div>
            <div class="ranking-row-chips">
              ${tags.map((t) => `<span class="ranking-imp-chip">${escapeHtml(t)}</span>`).join("")}
              ${flatrate.map((p) => `<span class="badge badge-flatrate">${escapeHtml(p)}</span>`).join("")}
            </div>
          </div>
          <div class="ranking-row-actions">
            <div class="ranking-move-btns">
              <button type="button" class="btn btn-secondary ranking-act-btn" data-rank-action="up" data-imdb-id="${escapeHtml(m.imdb_id)}" ${isFirst ? "disabled" : ""} title="1つ上へ">↑</button>
              <button type="button" class="btn btn-secondary ranking-act-btn" data-rank-action="down" data-imdb-id="${escapeHtml(m.imdb_id)}" ${isLast ? "disabled" : ""} title="1つ下へ">↓</button>
            </div>
            <button type="button" class="btn btn-secondary ranking-act-btn" data-rank-action="rebattle" data-imdb-id="${escapeHtml(m.imdb_id)}" title="2択バトルで順位を決め直す">⚔️ 再戦</button>
            <button type="button" class="btn btn-ghost ranking-act-btn ranking-remove-btn" data-rank-action="remove" data-imdb-id="${escapeHtml(m.imdb_id)}" title="ランキングから外す（★評価は保持）">外す</button>
          </div>
        </article>
      `;
    })
    .join("");
  attachPosterErrorHandlers(listEl);
}

async function handleRankingRowAction(action, imdbId) {
  if (!requireLoginForRankingAction()) return;

  const rankedList = getRankedMoviesList();
  const orderedIds = rankedList.map((item) => item.movie.imdb_id);
  const idx = orderedIds.indexOf(imdbId);

  if (action === "up") {
    if (idx <= 0) return;
    [orderedIds[idx - 1], orderedIds[idx]] = [orderedIds[idx], orderedIds[idx - 1]];
    const { error } = await applyRankedOrder(orderedIds);
    if (error) {
      showToast(`クラウド保存エラー（ブラウザに保存済み）: ${error.message || "RLS権限/通信エラー"}`);
    }
    return;
  }

  if (action === "down") {
    if (idx < 0 || idx >= orderedIds.length - 1) return;
    [orderedIds[idx], orderedIds[idx + 1]] = [orderedIds[idx + 1], orderedIds[idx]];
    const { error } = await applyRankedOrder(orderedIds);
    if (error) {
      showToast(`クラウド保存エラー（ブラウザに保存済み）: ${error.message || "RLS権限/通信エラー"}`);
    }
    return;
  }

  if (action === "rebattle") {
    startBattleForMovie(imdbId);
    return;
  }

  if (action === "remove") {
    if (idx < 0) return;
    orderedIds.splice(idx, 1);
    const { error } = await applyRankedOrder(orderedIds, [imdbId]);
    if (error) {
      showToast(`クラウド保存エラー（ブラウザに保存済み）: ${error.message || "RLS権限/通信エラー"}`);
    } else {
      showToast("マイランキングから外しました（★評価と視聴済みステータスは保持）");
    }
  }
}

/* ============================================================================
   🎭 似ている未視聴映画3本レコメンド
   ============================================================================ */

function getRuleBasedSimilarUnwatchedMovies(
  targetMovie,
  allMovies = state.movies,
  watchMap = state.watchMap,
  tasteProfile = state.tasteProfile,
  limit = 3
) {
  if (!targetMovie) return [];
  const targetGenres = new Set(targetMovie.genres || []);
  const targetDirectors = new Set(
    String(targetMovie.director || "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
  const targetLang = String(targetMovie.original_language || "").trim().toLowerCase();
  const targetMainCountry = getMovieCountryString(targetMovie)
    .split(",")[0]
    ?.trim()
    .toLowerCase();
  const targetMoods = new Set(targetMovie.mood_tags || []);
  const targetYear = Number(targetMovie.release_year) || 0;
  const userSignals = buildUserPreferenceSignals();

  const scored = [];
  for (const cand of allMovies || []) {
    if (!cand || cand.imdb_id === targetMovie.imdb_id) continue;
    const w = watchMap?.[cand.imdb_id];
    if (w && (w.status === "watched" || w.my_rating != null)) continue;

    let simScore = 0;
    const commonPoints = [];

    // 1. 共通ジャンル数
    const candGenres = cand.genres || [];
    const sharedGenres = candGenres.filter((g) => targetGenres.has(g));
    if (sharedGenres.length > 0) {
      simScore += sharedGenres.length * 18 + (sharedGenres.length >= 2 ? 8 : 0);
      commonPoints.push(sharedGenres.slice(0, 2).join("・"));
    }

    // 2. 同監督
    const candDirectors = String(cand.director || "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const sameDirector = candDirectors.some((d) => targetDirectors.has(d));
    if (sameDirector) {
      simScore += 25;
      commonPoints.unshift("同監督");
    }

    // 3. 同原語 / 同製作国
    const candLang = String(cand.original_language || "").trim().toLowerCase();
    if (targetLang && candLang && targetLang === candLang) {
      simScore += 8;
    }
    const candMainCountry = getMovieCountryString(cand).split(",")[0]?.trim().toLowerCase();
    if (targetMainCountry && candMainCountry && targetMainCountry === candMainCountry) {
      simScore += 5;
    }

    // 4. 公開年の近さ
    const candYear = Number(cand.release_year) || 0;
    if (targetYear && candYear) {
      const diff = Math.abs(targetYear - candYear);
      if (diff <= 3) simScore += 10;
      else if (diff <= 7) simScore += 6;
      else if (diff <= 12) simScore += 3;
    }

    // 5. 共通ムードタグ
    const sharedMoods = (cand.mood_tags || []).filter((t) => targetMoods.has(t));
    if (sharedMoods.length > 0) {
      simScore += sharedMoods.length * 10;
      if (commonPoints.length < 2) commonPoints.push(`#${sharedMoods[0]}`);
    }

    // 6. 自分マッチ度
    const matchScore = computeMatchScore(cand, tasteProfile, userSignals);
    simScore += matchScore * 0.25;

    const flatrate = cand.jp_providers?.flatrate || [];
    if (flatrate.length > 0 && commonPoints.length < 2) {
      commonPoints.push("見放題あり");
    }

    scored.push({
      movie: cand,
      simScore,
      matchScore,
      reasonLabel: commonPoints.slice(0, 2).join(" / ") || `${cand.release_year}年作品`,
    });
  }

  scored.sort(
    (a, b) =>
      b.simScore - a.simScore ||
      b.matchScore - a.matchScore ||
      (b.movie.composite_score || 0) - (a.movie.composite_score || 0)
  );
  return scored.slice(0, limit);
}

function getSimilarUnwatchedMovies(
  targetMovie,
  allMovies = state.movies,
  watchMap = state.watchMap,
  tasteProfile = state.tasteProfile,
  limit = 3
) {
  if (!targetMovie) return [];
  const userSignals = buildUserPreferenceSignals();
  const merged = V7.mergeSimilarUnwatchedMovies
    ? V7.mergeSimilarUnwatchedMovies(
        targetMovie,
        allMovies,
        watchMap,
        (tMovie, moviesList, wMap, lim) =>
          getRuleBasedSimilarUnwatchedMovies(tMovie, moviesList, wMap, tasteProfile, lim),
        limit
      )
    : getRuleBasedSimilarUnwatchedMovies(targetMovie, allMovies, watchMap, tasteProfile, limit);

  return merged.map((item) => ({
    ...item,
    matchScore:
      item.matchScore != null
        ? item.matchScore
        : computeMatchScore(item.movie, tasteProfile, userSignals),
  }));
}

function renderModalVibeBarsHtml(movie) {
  const scores = V7.normalizeVibeScores ? V7.normalizeVibeScores(movie?.vibe_scores) : null;
  if (!scores) return "";
  const axes = [
    { key: "pace", label: "テンポ" },
    { key: "mind", label: "頭脳度" },
    { key: "immersion", label: "映像没入" },
    { key: "heaviness", label: "重厚・重さ" },
    { key: "family", label: "家族OK" },
  ];
  const rowsHtml = axes
    .map((ax) => {
      const val = scores[ax.key];
      const starText = V7.renderVibeStarText ? V7.renderVibeStarText(val) : "★".repeat(val) + "☆".repeat(5 - val);
      return `<div class="modal-vibe-row"><span class="modal-vibe-label">${escapeHtml(ax.label)}</span><span class="modal-vibe-stars" aria-label="${escapeHtml(ax.label)} 5点満点中${val}点">${escapeHtml(starText)}</span></div>`;
    })
    .join("");
  return `<div class="detail-section"><h3>作品の体感バランス</h3><div class="modal-vibe-grid">${rowsHtml}</div></div>`;
}

function renderClickableDirectorLinks(directorStr) {
  const raw = String(directorStr || "").trim();
  if (!raw || raw === "不明") return escapeHtml("不明");
  const names = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (names.length === 0) return escapeHtml("不明");
  return names
    .map(
      (name) =>
        `<button type="button" class="director-link" data-director-dig="${escapeHtml(name)}" title="${escapeHtml(name)}の監督作品で絞り込む">${escapeHtml(name)}</button>`
    )
    .join('<span class="director-sep">, </span>');
}

function openMovieModal(imdbId) {
  const m = state.movies.find((x) => x.imdb_id === imdbId);
  if (!m) return;
  const w = normalizeWatchEntry(state.watchMap[imdbId]);
  const jp = m.jp_providers || { flatrate: [], rent: [], buy: [], link: null };
  const isCloudLoggedIn = !state.isDemo && Boolean(state.userEmail);
  const canWrite = true;
  const userSignals = buildUserPreferenceSignals();
  const matchScore = computeMatchScore(m, state.tasteProfile, userSignals);
  const currentRank = normalizePersonalRank(w.personal_rank);
  const countryDisplay = getMovieCountryString(m);

  const modal = document.getElementById("movie-modal");
  const backdropUrl = m.backdrop_url ? String(m.backdrop_url).trim() : "";
  const hasBackdrop = Boolean(backdropUrl);
  const backdropBanner = hasBackdrop
    ? `<div id="modal-backdrop-banner" class="modal-backdrop-banner"><img id="modal-backdrop-img" class="modal-backdrop-img" src="${escapeHtml(backdropUrl)}" alt="" /><button type="button" class="icon-close" data-close-modal="movie-modal" aria-label="閉じる">&times;</button></div>`
    : "";

  const selectedImpressionSet = new Set(w.impression_tags || []);
  const impressionGroupsHtml = IMPRESSION_TAG_GROUPS.map((group) => {
    const chips = group.tags
      .map((tag) => {
        const isSelected = selectedImpressionSet.has(tag);
        return `<button type="button" class="impression-chip impression-${group.key} ${isSelected ? "selected" : ""}" data-impression-tag="${escapeHtml(tag)}" ${canWrite ? "" : "disabled"}>${escapeHtml(tag)}</button>`;
      })
      .join("");
    return `
      <div class="impression-group">
        <span class="impression-group-label impression-label-${group.key}">${escapeHtml(group.label)}</span>
        <div class="impression-chips-row">${chips}</div>
      </div>
    `;
  }).join("");

  const syncHintHtml = isCloudLoggedIn
    ? `<span class="watch-sync-hint">☁️ クラウド同期ON</span>`
    : `<span class="watch-sync-hint">💾 ブラウザ保存（ログインでクラウド同期）</span>`;

  const battleBtnLabel =
    currentRank != null ? `🏆 現在 ${currentRank}位（⚔️ 再戦する）` : "⚔️ 順位を決める";

  const similarPicks = getSimilarUnwatchedMovies(m, state.movies, state.watchMap, state.tasteProfile, 3);
  const similarSectionHtml =
    similarPicks.length > 0
      ? `
      <div class="similar-movies-section">
        <h3 class="similar-section-title">🎭 この映画に似ている未視聴のおすすめ（${similarPicks.length}本）</h3>
        <div class="similar-movies-grid">
          ${similarPicks
            .map(({ movie: sim, matchScore: simMatch, reasonLabel }) => {
              return `
                <button type="button" class="similar-movie-card" data-open-similar="${escapeHtml(sim.imdb_id)}">
                  <div class="similar-poster-wrap">
                    ${renderPosterImageOrFallback(sim, { variant: "similar", imgClass: "similar-card-poster" })}
                    <span class="similar-match-badge">マッチ ${simMatch}%</span>
                  </div>
                  <div class="similar-card-body">
                    <div class="similar-card-title">${escapeHtml(sim.title_ja)}</div>
                    <div class="similar-card-meta">${sim.release_year}年</div>
                    <div class="similar-card-reason">${escapeHtml(reasonLabel)}</div>
                  </div>
                </button>
              `;
            })
            .join("")}
        </div>
      </div>
    `
      : "";

  const catchcopyLeadHtml = m.ai_catchcopy
    ? `<p class="modal-catchcopy-lead">${escapeHtml(m.ai_catchcopy)}</p>`
    : "";
  const vibeBarsHtml = renderModalVibeBarsHtml(m);

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    ${backdropBanner}
    <div id="modal-content-inner" class="modal-content-inner ${hasBackdrop ? "has-backdrop" : "is-compact-header"}">
      <div class="modal-header">
        <div>
          <h2>${escapeHtml(m.title_ja)} <span style="color:var(--text-secondary);font-size:0.9rem">(${m.release_year})</span></h2>
          <div class="card-en">${escapeHtml(m.title_en)} ｜ 監督: ${renderClickableDirectorLinks(m.director)}${m.runtime_minutes ? ` ｜ ${m.runtime_minutes}分` : ""}${countryDisplay ? ` ｜ ${escapeHtml(countryDisplay)}` : ""}</div>
        </div>
        <button id="modal-header-close-btn" type="button" class="icon-close ${hasBackdrop ? "hidden" : ""}" data-close-modal="movie-modal" aria-label="閉じる">&times;</button>
      </div>
      ${catchcopyLeadHtml}

      <div class="modal-grid">
        <div>
          ${renderPosterImageOrFallback(m, { variant: "modal", imgClass: "modal-poster" })}
        </div>
        <div>
          <div class="metrics-row">
            <span class="metric-chip metric-match">自分マッチ度 ${matchScore}%</span>
            ${currentRank != null ? `<span class="metric-chip metric-rank">🏆 歴代 ${currentRank}位</span>` : ""}
            <span class="metric-chip">総合 ${Number(m.composite_score).toFixed(1)}点</span>
            <span class="metric-chip">IMDb ${m.imdb_rating ?? "-"}</span>
            <span class="metric-chip">Metascore ${m.metascore ?? "-"}</span>
            <span class="metric-chip">RT ${m.rt_score != null ? `${m.rt_score}%` : "-"}</span>
            <span class="metric-chip">${escapeHtml(m.selection_category)}</span>
          </div>

          ${(m.genres || []).length ? `<div class="detail-section"><h3>ジャンル</h3><div class="metrics-row">${m.genres.map((g) => `<span class="metric-chip">${escapeHtml(g)}</span>`).join("")}</div></div>` : ""}
          ${(m.mood_tags || []).length ? `<div class="detail-section"><h3>ムードタグ（タップで絞り込み）</h3>${renderMoodTags(m.mood_tags)}</div>` : ""}
          ${vibeBarsHtml}
          ${m.awards_text ? `<div class="detail-section"><h3>受賞・ノミネート</h3><p style="margin:0;font-size:0.88rem">${escapeHtml(m.awards_text)}</p></div>` : ""}
          ${m.ai_summary ? `<div class="detail-section"><h3>観るべき理由（AI解説）</h3><p style="margin:0;font-size:0.9rem">${escapeHtml(m.ai_summary)}</p></div>` : ""}
          <div class="detail-section">
            <h3>あらすじ</h3>
            <p style="margin:0;font-size:0.88rem;color:var(--text-secondary)">${escapeHtml(m.overview_ja || "日本語あらすじ未登録")}</p>
          </div>

          <div class="detail-section">
            <h3>日本の配信状況</h3>
            <div class="providers-row">
              ${(jp.flatrate || []).map((p) => `<span class="badge badge-flatrate">見放題: ${escapeHtml(p)}</span>`).join("")}
              ${(jp.rent || []).map((p) => `<span class="badge badge-rent">レンタル: ${escapeHtml(p)}</span>`).join("")}
              ${!jp.flatrate?.length && !jp.rent?.length ? `<span class="badge badge-muted">現在配信情報なし</span>` : ""}
            </div>
          </div>

          <div class="detail-section">
            <h3>外部リンク（新規タブ）</h3>
            <div class="external-links-row">
              <a class="ext-link-btn ext-link-yt" href="https://www.youtube.com/results?search_query=${encodeURIComponent(`${m.title_ja} 映画 予告`)}" target="_blank" rel="noopener noreferrer">▶ 予告編（YouTube検索）</a>
              <a class="ext-link-btn ext-link-filmarks" href="https://filmarks.com/search/movies?q=${encodeURIComponent(m.title_ja)}" target="_blank" rel="noopener noreferrer">📝 Filmarksで評判を見る</a>
              ${
                jp.link
                  ? `<a class="ext-link-btn ext-link-stream" href="${escapeHtml(jp.link)}" target="_blank" rel="noopener noreferrer">🎬 配信先を開く</a>`
                  : ""
              }
            </div>
          </div>
        </div>
      </div>

      <div class="watch-controls">
        <div class="watch-controls-header">
          <strong>あなたの視聴記録</strong>
          ${syncHintHtml}
        </div>
        <div class="status-buttons">
          <button type="button" class="btn btn-secondary ${w.status === "unwatched" ? "active" : ""}" data-status="unwatched">未視聴</button>
          <button type="button" class="btn btn-secondary ${w.status === "watchlist" ? "active" : ""}" data-status="watchlist">観たい</button>
          <button type="button" class="btn btn-secondary ${w.status === "watched" ? "active" : ""}" data-status="watched">視聴済み</button>
          <select id="modal-rating" style="width:auto">
            <option value="">自分評価なし</option>
            ${[5, 4, 3, 2, 1].map((n) => `<option value="${n}" ${Number(w.my_rating) === n ? "selected" : ""}>★${n}</option>`).join("")}
          </select>
          <button id="modal-battle-btn" type="button" class="btn btn-secondary modal-battle-btn" data-imdb-id="${escapeHtml(imdbId)}">${escapeHtml(battleBtnLabel)}</button>
        </div>

        <div class="modal-watched-at-row">
          <label for="modal-watched-at">📅 視聴日</label>
          <div class="modal-watched-at-inputs">
            <input id="modal-watched-at" type="date" value="${escapeHtml(w.watched_at || "")}" />
            <button id="modal-clear-watched-at-btn" type="button" class="btn btn-ghost btn-sm">クリア</button>
          </div>
        </div>

        <div class="impression-section">
          <div class="impression-title">印象チップ（複数選択可・任意）</div>
          ${impressionGroupsHtml}
        </div>

        <textarea id="modal-memo" rows="2" placeholder="感想やメモ...">${escapeHtml(w.memo || "")}</textarea>
        <div><button id="save-watch-btn" type="button" class="btn btn-primary" data-imdb-id="${escapeHtml(imdbId)}">記録を保存</button></div>
      </div>

      ${similarSectionHtml}
    </div>
  `;

  modalBody.style.padding = hasBackdrop ? "0" : "20px";
  attachPosterErrorHandlers(modalBody);

  const backdropImg = document.getElementById("modal-backdrop-img");
  const backdropBannerEl = document.getElementById("modal-backdrop-banner");
  const modalInnerEl = document.getElementById("modal-content-inner");
  const modalHeaderCloseBtn = document.getElementById("modal-header-close-btn");
  const switchToCompactHeader = () => {
    if (backdropBannerEl) backdropBannerEl.classList.add("hidden");
    if (modalInnerEl) {
      modalInnerEl.classList.remove("has-backdrop");
      modalInnerEl.classList.add("is-compact-header");
    }
    if (modalHeaderCloseBtn) modalHeaderCloseBtn.classList.remove("hidden");
    modalBody.style.padding = "20px";
  };
  if (backdropImg) {
    backdropImg.addEventListener("error", switchToCompactHeader, { once: true });
    if (backdropImg.complete && backdropImg.naturalWidth === 0) {
      switchToCompactHeader();
    }
  }

  let selectedStatus = w.status || "unwatched";
  const watchedAtInput = document.getElementById("modal-watched-at");
  let watchedAtExplicitlyCleared = false;

  modal.querySelectorAll("[data-status]").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedStatus = btn.dataset.status;
      modal.querySelectorAll("[data-status]").forEach((b) => b.classList.toggle("active", b === btn));
      if (selectedStatus === "watched" && watchedAtInput && !watchedAtInput.value && !watchedAtExplicitlyCleared && !state.unknownWatchedDate) {
        watchedAtInput.value = getTodayDateString();
      }
    });
  });

  const ratingSelect = document.getElementById("modal-rating");
  if (ratingSelect) {
    ratingSelect.addEventListener("change", () => {
      if (ratingSelect.value && selectedStatus !== "watched") {
        selectedStatus = "watched";
        modal.querySelectorAll("[data-status]").forEach((b) => b.classList.toggle("active", b.dataset.status === "watched"));
        if (watchedAtInput && !watchedAtInput.value && !watchedAtExplicitlyCleared && !state.unknownWatchedDate) {
          watchedAtInput.value = getTodayDateString();
        }
      }
    });
  }

  watchedAtInput?.addEventListener("input", () => {
    if (watchedAtInput.value) {
      watchedAtExplicitlyCleared = false;
    }
  });

  document.getElementById("modal-clear-watched-at-btn")?.addEventListener("click", () => {
    watchedAtExplicitlyCleared = true;
    if (watchedAtInput) watchedAtInput.value = "";
  });

  modal.querySelectorAll("[data-impression-tag]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const tag = chip.dataset.impressionTag;
      if (selectedImpressionSet.has(tag)) {
        selectedImpressionSet.delete(tag);
        chip.classList.remove("selected");
      } else {
        selectedImpressionSet.add(tag);
        chip.classList.add("selected");
      }
    });
  });

  modal.querySelectorAll("[data-open-similar]").forEach((simBtn) => {
    simBtn.addEventListener("click", () => {
      const targetId = simBtn.dataset.openSimilar;
      if (targetId) {
        openMovieModal(targetId);
      }
    });
  });

  const battleBtn = document.getElementById("modal-battle-btn");
  if (battleBtn) {
    battleBtn.addEventListener("click", async () => {
      if (!requireLoginForRankingAction()) return;

      const ratingVal = document.getElementById("modal-rating").value;
      const ensuredStatus = "watched";
      const inputDate = normalizeWatchedAt(watchedAtInput?.value);
      const watchedAtVal = watchedAtExplicitlyCleared
        ? null
        : inputDate || (state.unknownWatchedDate ? w.watched_at || null : w.watched_at || getTodayDateString());
      const payload = {
        imdb_id: imdbId,
        status: ensuredStatus,
        my_rating: ratingVal ? Number(ratingVal) : w.my_rating,
        personal_rank: currentRank,
        watched_at: watchedAtVal,
        impression_tags: [...selectedImpressionSet],
        memo: document.getElementById("modal-memo").value.trim() || null,
        updated_at: new Date().toISOString(),
      };
      await upsertWatchStatus(payload);
      modal.close();
      renderMovies();
      startBattleForMovie(imdbId);
    });
  }

  const saveBtn = document.getElementById("save-watch-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      const ratingVal = document.getElementById("modal-rating").value;
      const latestEntry = normalizeWatchEntry(state.watchMap[imdbId]);
      const inputDate = normalizeWatchedAt(watchedAtInput?.value);
      const resolvedWatchedAt = inputDate || null;
      const payload = {
        imdb_id: imdbId,
        status: selectedStatus,
        my_rating: ratingVal ? Number(ratingVal) : null,
        personal_rank: latestEntry.personal_rank,
        watched_at: resolvedWatchedAt,
        impression_tags: [...selectedImpressionSet],
        memo: document.getElementById("modal-memo").value.trim() || null,
        updated_at: new Date().toISOString(),
      };

      saveWatchedAtCacheEntry(imdbId, resolvedWatchedAt, { explicitClear: resolvedWatchedAt == null });
      const { error, mode } = await upsertWatchStatus(payload);
      if (error) {
        showToast(`クラウド保存エラー（ブラウザに一時保存済み）: ${error.message || "RLS権限/通信エラー"}`, {
          durationMs: 4500,
        });
      } else if (mode === "local") {
        notifyLocalSaveOnce();
      } else {
        showToast("視聴記録をクラウドに保存しました");
      }
      modal.close();
      renderMovies();
    });
  }

  if (!modal.open) {
    modal.showModal();
  } else {
    modal.scrollTop = 0;
  }
}

function drawGachaPicks() {
  const sourceList = state.filteredMovies && state.filteredMovies.length > 0 ? state.filteredMovies : getFilteredMovies();
  const pool = sourceList.slice(0, 20);
  const subtitle = document.getElementById("gacha-subtitle");
  const container = document.getElementById("gacha-results");

  if (pool.length === 0) {
    subtitle.textContent = "現在の絞り込み条件に一致する作品がありません。";
    container.innerHTML = `<p style="color:var(--text-muted);margin:0">フィルタ条件を緩めてから再度お試しください。</p>`;
    return;
  }

  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const picks = shuffled.slice(0, Math.min(3, shuffled.length));
  const userSignals = buildUserPreferenceSignals();

  subtitle.textContent = `現在の絞り込み上位${pool.length}本からランダムに${picks.length}本を提案します`;

  container.innerHTML = picks
    .map((m) => {
      const matchScore = m._matchScore != null ? m._matchScore : computeMatchScore(m, state.tasteProfile, userSignals);
      const flatrate = m.jp_providers?.flatrate || [];
      const summaryText = m.ai_summary || m.overview_ja || "あらすじ情報はありません。";
      return `
        <article class="gacha-card">
          <div class="gacha-poster-col">
            ${renderPosterImageOrFallback(m, { variant: "gacha", imgClass: "gacha-poster" })}
          </div>
          <div class="gacha-info-col">
            <div class="gacha-card-top">
              <h3 class="gacha-title">${escapeHtml(m.title_ja)}</h3>
              <div class="gacha-meta">
                <span>${m.release_year}年</span>
                ${m.runtime_minutes ? `<span>${m.runtime_minutes}分</span>` : ""}
              </div>
            </div>
            <div class="metrics-row">
              <span class="metric-chip metric-match">自分マッチ ${matchScore}%</span>
              <span class="metric-chip">総合 ${Number(m.composite_score).toFixed(1)}点</span>
              <span class="metric-chip">IMDb ${m.imdb_rating ?? "-"}</span>
            </div>
            <div class="providers-row">
              ${
                flatrate.length > 0
                  ? flatrate.map((p) => `<span class="badge badge-flatrate">見放題: ${escapeHtml(p)}</span>`).join("")
                  : `<span class="badge badge-muted">見放題情報なし</span>`
              }
            </div>
            <p class="gacha-summary">${escapeHtml(summaryText)}</p>
            <div class="gacha-actions">
              <button type="button" class="btn btn-secondary gacha-open-detail" data-gacha-detail="${escapeHtml(m.imdb_id)}">詳細を開く</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
  attachPosterErrorHandlers(container);
}

function openGachaModal() {
  drawGachaPicks();
  const modal = document.getElementById("gacha-modal");
  if (modal && !modal.open) {
    modal.showModal();
  }
}

function buildTasteExportText() {
  const movieMap = new Map(state.movies.map((m) => [m.imdb_id, m]));
  const watchedItems = [];
  const watchlistItems = [];
  const rankedItems = getRankedMoviesList();

  for (const [imdbId, rawEntry] of Object.entries(state.watchMap)) {
    const entry = normalizeWatchEntry(rawEntry);
    const m = movieMap.get(imdbId);
    if (!m) continue;
    if (entry.status === "watched" || entry.my_rating != null) {
      watchedItems.push({ movie: m, watch: entry });
    } else if (entry.status === "watchlist") {
      watchlistItems.push({ movie: m, watch: entry });
    }
  }

  watchedItems.sort((a, b) => (b.watch.my_rating || 0) - (a.watch.my_rating || 0));

  const formatLine = ({ movie, watch }) => {
    const ratingStr = watch.my_rating != null ? `★${watch.my_rating}` : "未評価";
    const genresStr = (movie.genres || []).join(", ") || "不明";
    const tagsStr = watch.impression_tags?.length ? ` | 印象: ${watch.impression_tags.join("・")}` : "";
    const memoStr = watch.memo ? ` | メモ: ${watch.memo}` : "";
    return `- ${movie.title_ja} (${movie.release_year}) / 監督: ${movie.director || "不明"} / ジャンル: ${genresStr} / ${ratingStr}${tagsStr}${memoStr}`;
  };

  const formatRankLine = ({ movie, watch }, idx) => {
    const rankNum = idx + 1;
    const ratingStr = watch.my_rating != null ? `★${watch.my_rating}` : "未評価";
    const tagsStr = watch.impression_tags?.length ? ` [${watch.impression_tags.join("・")}]` : "";
    return `${rankNum}位: 『${movie.title_ja}』 (${movie.release_year} / ${movie.director || "不明"}) ${ratingStr}${tagsStr}`;
  };

  const lines = [
    "あなたは私の映画の好みを深く理解するパーソナル映画キュレーターです。",
    "以下の「マイランキング」「現在の視聴・評価履歴」「現在の taste_profile.json」を分析し、",
    "1) 私の好みの傾向（刺さる演出・ジャンル・監督・避けがちな要素）の言語化",
    "2) 次に観るべきおすすめ作品の提案",
    "3) 更新版 web/taste_profile.json の提案（そのままコピペできるJSON形式）",
    "を出力してください。",
    "",
    `## 🏆 マイランキング（歴代ベスト順位 / ${rankedItems.length}件）`,
    rankedItems.length > 0 ? rankedItems.map(formatRankLine).join("\n") : "- （まだ順位付けされた作品はありません）",
    "",
    `## 視聴済み・評価済み作品（${watchedItems.length}件）`,
    watchedItems.length > 0 ? watchedItems.map(formatLine).join("\n") : "- （まだ記録がありません）",
    "",
    `## 観たいリスト（${watchlistItems.length}件）`,
    watchlistItems.length > 0 ? watchlistItems.map(formatLine).join("\n") : "- （まだ登録がありません）",
    "",
    "## 現在の web/taste_profile.json",
    "```json",
    JSON.stringify(state.tasteProfile || DEFAULT_TASTE_PROFILE, null, 2),
    "```",
  ];

  return lines.join("\n");
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // フォールバックへ
    }
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

async function handleCopyTasteData() {
  const btn = document.getElementById("copy-taste-btn");
  const text = buildTasteExportText();
  const ok = await copyTextToClipboard(text);
  if (ok) {
    const orig = btn.textContent;
    btn.textContent = "✅ コピーしました！";
    showToast("好みデータ（AI相談用プロンプト）をクリップボードにコピーしました！");
    setTimeout(() => {
      btn.textContent = orig;
    }, 2000);
  } else {
    alert("クリップボードへのコピーに失敗しました。ブラウザの権限を確認してください。");
  }
}

function bindEvents() {
  [
    "filter-decade",
    "filter-year",
    "filter-provider",
    "filter-slot",
    "filter-genre",
    "filter-runtime",
    "filter-watch",
    "filter-country",
    "filter-flatrate-only",
    "filter-exclude-india",
    "filter-sort",
  ].forEach((id) => {
    document.getElementById(id)?.addEventListener("change", () => {
      clearActivePreset();
      if (id === "filter-provider" && document.getElementById(id)?.value === "__my_subs__" && state.mySubscriptions.length === 0) {
        showToast("マイサブスクが未登録のため全サービスを表示中（「📺 マイサブスク」から登録できます）", {
          actionLabel: "登録する",
          onAction: openSubscriptionsModal,
          durationMs: 4200,
        });
      }
      if (
        id === "filter-provider" ||
        id === "filter-flatrate-only" ||
        id === "filter-country" ||
        id === "filter-exclude-india"
      ) {
        saveFilterPrefs();
      }
      renderMovies();
    });
  });

  document.getElementById("filter-query").addEventListener("input", () => {
    clearActivePreset();
    renderMovies();
  });

  document.getElementById("reset-filters-btn").addEventListener("click", () => {
    clearFilterPrefs();
    resetAllFilterControls();
    renderMovies();
  });

  document.getElementById("my-subs-btn")?.addEventListener("click", openSubscriptionsModal);

  document.getElementById("subs-save-btn")?.addEventListener("click", () => {
    const checked = [
      ...document.querySelectorAll('#subs-checkbox-list input[type="checkbox"]:checked'),
    ].map((cb) => cb.value);
    saveMySubscriptions(checked);
    document.getElementById("subscriptions-modal")?.close();
    if (checked.length > 0) {
      showToast(`マイサブスクを ${checked.length} 件保存しました`);
    } else {
      showToast("マイサブスク登録をクリアしました");
    }
    renderMovies();
  });

  document.getElementById("subs-clear-btn")?.addEventListener("click", () => {
    document.querySelectorAll('#subs-checkbox-list input[type="checkbox"]').forEach((cb) => {
      cb.checked = false;
      cb.closest(".subs-option-item")?.classList.remove("is-checked");
    });
  });

  document.getElementById("director-dig-banner")?.addEventListener("click", (e) => {
    if (e.target.closest("#clear-director-dig-btn")) {
      clearDirectorDig();
    }
  });

  document.getElementById("mood-tag-banner")?.addEventListener("click", (e) => {
    if (e.target.closest("#clear-mood-tag-btn")) {
      clearMoodTagFilter();
    }
  });

  document.getElementById("newly-flatrate-banner")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-newly-action]");
    if (!btn) return;
    const action = btn.dataset.newlyAction;
    if (action === "dismiss") {
      state.newlyFlatrateBannerDismissed = true;
      state.newlyFlatrateFilterActive = false;
      renderMovies();
      return;
    }
    if (action === "filter") {
      state.newlyFlatrateFilterActive = !state.newlyFlatrateFilterActive;
      if (state.newlyFlatrateFilterActive) {
        clearActivePreset();
        setActiveMainView("browse");
      }
      renderMovies();
    }
  });

  const toggleFiltersBtn = document.getElementById("toggle-filters-btn");
  if (toggleFiltersBtn) {
    toggleFiltersBtn.addEventListener("click", () => {
      setMobileFiltersOpen(!state.isMobileFiltersOpen);
    });
  }

  const toggleRankingView = () => {
    setActiveMainView(state.activeMainView === "ranking" ? "browse" : "ranking");
  };
  document.getElementById("toggle-ranking-btn")?.addEventListener("click", toggleRankingView);
  document.getElementById("results-ranking-btn")?.addEventListener("click", toggleRankingView);
  document.getElementById("ranking-back-btn")?.addEventListener("click", () => setActiveMainView("browse"));

  const rankingView = document.getElementById("ranking-view");
  if (rankingView) {
    rankingView.addEventListener("click", (e) => {
      const subTab = e.target.closest(".ranking-subtab[data-ranking-tab]");
      if (subTab) {
        switchRankingTab(subTab.dataset.rankingTab);
        return;
      }
      const logYearBtn = e.target.closest("[data-log-year]");
      if (logYearBtn) {
        state.selectedLogYear = logYearBtn.dataset.logYear;
        state._logYearUserChosen = true;
        renderAnnualLogView();
        return;
      }
      if (e.target.closest("#start-batch-battle-btn")) {
        startBatchFiveStarBattle();
        return;
      }
      if (e.target.closest("[data-ranking-go-browse]")) {
        setActiveMainView("browse");
        return;
      }
      const actionBtn = e.target.closest("[data-rank-action]");
      if (actionBtn) {
        e.stopPropagation();
        handleRankingRowAction(actionBtn.dataset.rankAction, actionBtn.dataset.imdbId);
        return;
      }
      const detailTarget = e.target.closest("[data-ranking-detail]");
      if (detailTarget) {
        openMovieModal(detailTarget.dataset.rankingDetail);
      }
    });

    rankingView.addEventListener("change", (e) => {
      const select = e.target.closest("#log-year-select");
      if (select) {
        state.selectedLogYear = select.value;
        state._logYearUserChosen = true;
        renderAnnualLogView();
      }
    });
  }

  document.getElementById("toggle-unknown-watched-date")?.addEventListener("change", (e) => {
    setUnknownWatchedDatePref(Boolean(e.target.checked), { persist: true });
  });

  const battleModalBody = document.getElementById("battle-modal-body");
  if (battleModalBody) {
    battleModalBody.addEventListener("click", (e) => {
      const pickBtn = e.target.closest("[data-battle-pick]");
      if (pickBtn) {
        handleBattleChoice(pickBtn.dataset.battlePick);
        return;
      }
      const nextBtn = e.target.closest("[data-battle-next]");
      if (nextBtn && state.battle?.queue?.length > 0) {
        const [nextMovie, ...rest] = state.battle.queue;
        startBattleForMovie(
          nextMovie.imdb_id,
          rest.map((m) => m.imdb_id)
        );
        return;
      }
      const openRankingBtn = e.target.closest("[data-battle-open-ranking]");
      if (openRankingBtn) {
        document.getElementById("battle-modal")?.close();
        state.activeRankingTab = "best";
        setActiveMainView("ranking");
      }
    });
  }

  const yearTabsBar = document.getElementById("year-tabs-bar");
  if (yearTabsBar) {
    yearTabsBar.addEventListener("click", (e) => {
      const tab = e.target.closest("[data-year-tab]");
      if (!tab) return;
      const yearVal = tab.dataset.yearTab;
      clearActivePreset();
      document.getElementById("filter-decade").value = "all";
      document.getElementById("filter-year").value = yearVal;
      renderMovies();
      const activeBtn = yearTabsBar.querySelector(`[data-year-tab="${CSS.escape(yearVal)}"]`);
      if (activeBtn && typeof activeBtn.scrollIntoView === "function") {
        activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
  }

  document.querySelectorAll(".view-mode-btn[data-view-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setViewMode(btn.dataset.viewMode, { persist: true, rerender: true });
    });
  });

  document.querySelectorAll(".preset-btn[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyPreset(btn.dataset.preset);
    });
  });

  document.getElementById("gacha-btn").addEventListener("click", openGachaModal);
  document.getElementById("gacha-reroll-btn").addEventListener("click", drawGachaPicks);
  document.getElementById("copy-taste-btn").addEventListener("click", handleCopyTasteData);

  const toggleTasteBtn = document.getElementById("toggle-taste-panel-btn");
  if (toggleTasteBtn) {
    toggleTasteBtn.addEventListener("click", () => {
      setTastePanelOpen(!state.isTastePanelOpen);
    });
  }

  const collapseBtn = document.getElementById("tg-collapse-btn");
  if (collapseBtn) {
    collapseBtn.addEventListener("click", () => {
      setTastePanelOpen(false);
    });
  }

  document.querySelectorAll(".tg-tab[data-tg-tab]").forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      if (!state.isTastePanelOpen) {
        setTastePanelOpen(true);
      }
      switchTasteTab(tabBtn.dataset.tgTab);
    });
  });

  const tastePanel = document.getElementById("taste-guide-panel");
  if (tastePanel) {
    tastePanel.addEventListener("click", (e) => {
      const recBtn = e.target.closest("[data-open-movie]");
      if (recBtn) {
        openMovieModal(recBtn.dataset.openMovie);
        return;
      }

      const dirBtn = e.target.closest("[data-director-dig]");
      if (dirBtn) {
        activateDirectorDig(dirBtn.dataset.directorDig);
        return;
      }

      const genreBtn = e.target.closest("[data-filter-genre]");
      if (genreBtn) {
        setActiveMainView("browse");
        resetAllFilterControls({ preserveSavedPrefs: true });
        document.getElementById("filter-genre").value = genreBtn.dataset.filterGenre;
        document.getElementById("filter-sort").value = "match_desc";
        renderMovies();
        return;
      }

      const queryBtn = e.target.closest("[data-filter-query]");
      if (queryBtn) {
        setActiveMainView("browse");
        resetAllFilterControls({ preserveSavedPrefs: true });
        document.getElementById("filter-query").value = queryBtn.dataset.filterQuery;
        renderMovies();
        return;
      }

      const presetLinkBtn = e.target.closest("[data-apply-preset]");
      if (presetLinkBtn) {
        setActiveMainView("browse");
        const preset = presetLinkBtn.dataset.applyPreset;
        if (state.activePreset !== preset) {
          applyPreset(preset);
        } else {
          renderMovies();
        }
      }
    });
  }

  document.getElementById("movies-grid").addEventListener("click", (e) => {
    // ワンタッチ評価バー内部のクリックはモーダルを開かない
    const quickBar = e.target.closest("[data-quick-bar]");
    if (quickBar) {
      e.stopPropagation();
      const actionBtn = e.target.closest("[data-quick-action]");
      if (actionBtn) {
        const action = actionBtn.dataset.quickAction;
        const imdbId = actionBtn.dataset.imdbId;
        const rating = actionBtn.dataset.rating ? Number(actionBtn.dataset.rating) : null;
        handleQuickAction(action, imdbId, rating);
      }
      return;
    }

    const tagBtn = e.target.closest("[data-mood-tag]");
    if (tagBtn) {
      e.stopPropagation();
      activateMoodTagFilter(tagBtn.dataset.moodTag);
      return;
    }

    const card = e.target.closest(".movie-card, .movie-list-row");
    if (card) openMovieModal(card.dataset.imdbId);
  });

  document.body.addEventListener("click", (e) => {
    const dirBtn = e.target.closest("#movie-modal [data-director-dig]");
    if (dirBtn) {
      activateDirectorDig(dirBtn.dataset.directorDig);
      return;
    }

    const tagBtn = e.target.closest("#movie-modal [data-mood-tag]");
    if (tagBtn) {
      activateMoodTagFilter(tagBtn.dataset.moodTag);
      return;
    }

    const gachaDetailBtn = e.target.closest("[data-gacha-detail]");
    if (gachaDetailBtn) {
      const imdbId = gachaDetailBtn.dataset.gachaDetail;
      document.getElementById("gacha-modal").close();
      openMovieModal(imdbId);
      return;
    }

    const closeBtn = e.target.closest("[data-close-modal]");
    if (closeBtn) {
      document.getElementById(closeBtn.dataset.closeModal).close();
    }
  });

  // v7: 気分スライダー トグル & リアルタイム絞り込み
  document.getElementById("toggle-vibe-panel-btn")?.addEventListener("click", () => {
    setVibePanelOpen(!state.isVibePanelOpen);
  });
  document.getElementById("reset-vibe-btn")?.addEventListener("click", () => {
    resetVibeFilter();
    renderMovies();
  });
  const bindVibeRange = (elId, key) => {
    document.getElementById(elId)?.addEventListener("input", (e) => {
      state.vibeFilter[key] = Number(e.target.value);
      updateVibeSliderUI();
      renderMovies();
    });
  };
  bindVibeRange("vibe-pace", "paceMin");
  bindVibeRange("vibe-mind", "mindMin");
  bindVibeRange("vibe-immersion", "immersionMin");
  bindVibeRange("vibe-heaviness", "heavinessMax");
  document.getElementById("vibe-family-ok")?.addEventListener("change", (e) => {
    state.vibeFilter.familyOk = Boolean(e.target.checked);
    updateVibeSliderUI();
    renderMovies();
  });

  // v7: 星座マップ トグル & 戻る & ズーム
  document.getElementById("main-view-list-btn")?.addEventListener("click", () => setActiveMainView("browse"));
  document.getElementById("toggle-constellation-btn")?.addEventListener("click", () => {
    setActiveMainView(state.activeMainView === "constellation" ? "browse" : "constellation");
  });
  document.getElementById("results-constellation-btn")?.addEventListener("click", () => {
    setActiveMainView("constellation");
  });
  document.getElementById("constellation-back-btn")?.addEventListener("click", () => {
    setActiveMainView("browse");
  });
  document.getElementById("constellation-my-subs-only")?.addEventListener("change", (e) => {
    const checked = Boolean(e.target.checked);
    if (checked && state.mySubscriptions.length === 0) {
      e.target.checked = false;
      state.constellation.mySubsOnly = false;
      showToast("マイサブスクが未登録です（「📺 マイサブスク」から登録できます）", {
        actionLabel: "登録する",
        onAction: openSubscriptionsModal,
        durationMs: 4200,
      });
      return;
    }
    state.constellation.mySubsOnly = checked;
    renderConstellationView();
  });
  document.getElementById("constellation-zoom-in")?.addEventListener("click", () => zoomConstellationBy(1.32));
  document.getElementById("constellation-zoom-out")?.addEventListener("click", () => zoomConstellationBy(1 / 1.32));
  document.getElementById("constellation-zoom-reset")?.addEventListener("click", () => {
    state.constellation.zoom = 1;
    state.constellation.panX = 0;
    state.constellation.panY = 0;
    state.constellation.selectedId = null;
    updateConstellationTooltip(null);
    drawConstellationCanvas();
  });

  document.getElementById("auth-btn").addEventListener("click", async () => {
    if (state.isDemo) return;
    if (state.user) {
      await state.supabase.auth.signOut();
      return;
    }
    openAuthModal();
  });

  document.getElementById("auth-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("auth-email").value.trim();
    const msg = document.getElementById("auth-message");
    msg.textContent = "送信中...";
    const { error } = await state.supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.href },
    });
    msg.textContent = error
      ? `エラー: ${error.message}`
      : "ログイン用リンクをメール送信しました。受信箱のリンクをクリックしてください。";
  });
}

/* ============================================================================
   🌌 v7: 映画星座マップ（HTML5 Canvas + ズーム・パン・ツールチップ）
   ============================================================================ */

function buildConstellationFilteredIdSet() {
  const baseList = getFilteredMovies();
  const baseSet = new Set(baseList.map((m) => m.imdb_id));
  if (!state.constellation.mySubsOnly || state.mySubscriptions.length === 0) {
    return baseSet;
  }
  const mySubsLower = state.mySubscriptions.map((s) => s.toLowerCase());
  const narrowed = new Set();
  for (const m of baseList) {
    const flatrate = m.jp_providers?.flatrate || [];
    if (flatrate.some((p) => mySubsLower.some((sub) => String(p || "").toLowerCase().includes(sub)))) {
      narrowed.add(m.imdb_id);
    }
  }
  return narrowed;
}

function getConstellationCanvasMetrics() {
  const canvas = document.getElementById("constellation-canvas");
  const stage = document.getElementById("constellation-stage");
  if (!canvas || !stage) return null;
  const rect = stage.getBoundingClientRect();
  const width = Math.max(280, Math.round(rect.width || stage.clientWidth || 640));
  const height = Math.max(280, Math.round(rect.height || stage.clientHeight || 420));
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
  }
  return { canvas, width, height, dpr };
}

function projectStarToScreen(star, width, height) {
  const c = state.constellation;
  const padX = 24;
  const padY = 24;
  const usableW = Math.max(40, width - padX * 2);
  const usableH = Math.max(40, height - padY * 2);
  const normX = (star.mapX - 5) / 90;
  const normY = (star.mapY - 5) / 90;
  const baseX = padX + normX * usableW;
  const baseY = padY + normY * usableH;
  const cx = width / 2;
  const cy = height / 2;
  return {
    x: cx + (baseX - cx) * c.zoom + c.panX,
    y: cy + (baseY - cy) * c.zoom + c.panY,
  };
}

function zoomConstellationBy(factor, anchorX = null, anchorY = null) {
  const metrics = getConstellationCanvasMetrics();
  if (!metrics) return;
  const c = state.constellation;
  const oldZoom = c.zoom;
  const nextZoom = Math.max(0.7, Math.min(8.0, oldZoom * factor));
  if (Math.abs(nextZoom - oldZoom) < 1e-4) return;
  const cx = metrics.width / 2;
  const cy = metrics.height / 2;
  const ax = anchorX != null ? anchorX : cx;
  const ay = anchorY != null ? anchorY : cy;
  const ratio = nextZoom / oldZoom;
  c.panX = ax - cx - (ax - cx - c.panX) * ratio;
  c.panY = ay - cy - (ay - cy - c.panY) * ratio;
  c.zoom = nextZoom;
  drawConstellationCanvas();
}

function updateConstellationTooltip(star) {
  const el = document.getElementById("constellation-tooltip");
  if (!el) return;
  if (!star || !star.movie) {
    el.classList.add("hidden");
    el.innerHTML = "";
    return;
  }
  const m = star.movie;
  const flatrate = (m.jp_providers?.flatrate || []).slice(0, 2);
  const streamText = flatrate.length > 0 ? flatrate.join("・") : "見放題情報なし";
  const catchText = m.ai_catchcopy ? String(m.ai_catchcopy).trim() : "";
  const statusTag =
    star.rating != null
      ? `★${star.rating}`
      : star.isWatchlist
        ? "🔖 観たい"
        : "未視聴";

  el.innerHTML = `
    <div class="const-tt-title">${escapeHtml(m.title_ja)} <span style="color:var(--text-secondary);font-weight:600">(${m.release_year})</span></div>
    ${catchText ? `<div class="const-tt-catch">${escapeHtml(catchText)}</div>` : ""}
    <div class="const-tt-meta">
      <span class="metric-chip metric-match">マッチ ${star.matchScore}%</span>
      <span class="metric-chip">${escapeHtml(statusTag)}</span>
      <span class="metric-chip">📺 ${escapeHtml(streamText)}</span>
    </div>
    <button type="button" class="btn btn-primary btn-sm const-tt-open-btn" data-const-open="${escapeHtml(m.imdb_id)}">詳細を開く</button>
  `;
  el.classList.remove("hidden");
}

function findStarAtCanvasPoint(px, py) {
  const metrics = getConstellationCanvasMetrics();
  if (!metrics) return null;
  let best = null;
  let bestDist = Infinity;
  const hitThreshold = 16;
  for (const star of state.constellation.stars) {
    const pos = projectStarToScreen(star, metrics.width, metrics.height);
    const dist = Math.hypot(pos.x - px, pos.y - py);
    const r = star.baseRadius * Math.min(1.5, Math.sqrt(state.constellation.zoom)) + 7;
    if (dist <= Math.max(hitThreshold, r) && dist < bestDist) {
      bestDist = dist;
      best = star;
    }
  }
  return best;
}

function drawConstellationCanvas() {
  const metrics = getConstellationCanvasMetrics();
  if (!metrics) return;
  const { canvas, width, height, dpr } = metrics;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);

  // 背景星雲グラデーション & 微細背景星
  const grad = ctx.createRadialGradient(width * 0.5, height * 0.45, 10, width * 0.5, height * 0.5, Math.max(width, height) * 0.72);
  grad.addColorStop(0, "rgba(22, 33, 62, 0.52)");
  grad.addColorStop(0.55, "rgba(9, 13, 26, 0.85)");
  grad.addColorStop(1, "rgba(3, 5, 10, 0.98)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 60; i += 1) {
    const bx = ((i * 197 + 31) % 997) / 997 * width;
    const by = ((i * 313 + 73) % 991) / 991 * height;
    const alpha = 0.08 + (i % 5) * 0.04;
    ctx.fillStyle = `rgba(226, 232, 240, ${alpha})`;
    ctx.fillRect(bx, by, 1.3, 1.3);
  }

  const stars = state.constellation.stars || [];
  if (stars.length === 0) {
    ctx.fillStyle = "rgba(148, 163, 184, 0.85)";
    ctx.font = "600 13px 'Noto Sans JP', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("星座座標（map_x, map_y）が設定された映画がありません", width / 2, height / 2);
    ctx.restore();
    return;
  }

  const zoomScale = Math.min(1.65, 0.82 + 0.25 * state.constellation.zoom);
  const drawOrder = {
    unwatched_dim: 0,
    watched: 1,
    unwatched_bright: 2,
    watchlist: 3,
    rating5: 4,
  };
  const sorted = [...stars].sort((a, b) => (drawOrder[a.category] || 0) - (drawOrder[b.category] || 0));

  // ★5の星同士やアクティブ星へのほのかな星座線（選択/ホバー時）
  const activeId = state.constellation.selectedId || state.constellation.hoveredId;
  if (activeId) {
    const activeStar = stars.find((s) => s.imdb_id === activeId);
    if (activeStar) {
      const p1 = projectStarToScreen(activeStar, width, height);
      const simSet = new Set(Array.isArray(activeStar.movie.similar_ids) ? activeStar.movie.similar_ids : []);
      ctx.save();
      ctx.strokeStyle = "rgba(34, 211, 238, 0.35)";
      ctx.lineWidth = 1;
      for (const other of stars) {
        if (simSet.has(other.imdb_id)) {
          const p2 = projectStarToScreen(other, width, height);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
      ctx.restore();
    }
  }

  const screenPts = new Map();
  for (const s of sorted) {
    const pos = projectStarToScreen(s, width, height);
    screenPts.set(s.imdb_id, pos);
    if (pos.x < -30 || pos.x > width + 30 || pos.y < -30 || pos.y > height + 30) continue;

    const r = s.baseRadius * zoomScale;
    const isHighlighted = s.imdb_id === activeId;

    ctx.save();
    if (s.category === "rating5") {
      ctx.shadowColor = "rgba(251, 191, 36, 0.9)";
      ctx.shadowBlur = isHighlighted ? 20 : 14;
      ctx.fillStyle = "#fbbf24";
    } else if (s.category === "watchlist") {
      ctx.shadowColor = "rgba(34, 211, 238, 0.85)";
      ctx.shadowBlur = isHighlighted ? 16 : 11;
      ctx.fillStyle = "#22d3ee";
    } else if (s.category === "watched") {
      ctx.shadowColor = "rgba(203, 213, 225, 0.35)";
      ctx.shadowBlur = 4;
      ctx.fillStyle = "rgba(203, 213, 225, 0.72)";
    } else if (s.category === "unwatched_bright") {
      ctx.shadowColor = "rgba(52, 211, 153, 0.65)";
      ctx.shadowBlur = isHighlighted ? 14 : 8;
      ctx.fillStyle = "#34d399";
    } else {
      ctx.fillStyle = "rgba(100, 116, 139, 0.34)";
    }

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, isHighlighted ? r + 2 : r, 0, Math.PI * 2);
    ctx.fill();

    if (isHighlighted) {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, r + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // ★5上位タイトルなどを重ねずにラベル表示
  const labelCandidates = stars
    .filter((s) => s.category === "rating5" || (state.constellation.zoom >= 1.6 && s.category === "watchlist") || (state.constellation.zoom >= 2.2 && s.category === "unwatched_bright"))
    .sort((a, b) => b.labelPriority - a.labelPriority)
    .slice(0, state.constellation.zoom >= 2.0 ? 22 : 12);

  const placedBoxes = [];
  ctx.font = "600 11px 'Noto Sans JP', sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  for (const s of labelCandidates) {
    const pos = screenPts.get(s.imdb_id);
    if (!pos || pos.x < 10 || pos.x > width - 40 || pos.y < 14 || pos.y > height - 14) continue;
    const title = String(s.movie.title_ja || "").slice(0, 16);
    const tx = pos.x + s.baseRadius * zoomScale + 5;
    const ty = pos.y;
    const tw = ctx.measureText(title).width;
    const box = { x1: tx - 2, y1: ty - 8, x2: tx + tw + 4, y2: ty + 8 };
    const overlaps = placedBoxes.some(
      (b) => !(box.x2 < b.x1 || box.x1 > b.x2 || box.y2 < b.y1 || box.y1 > b.y2)
    );
    if (overlaps) continue;
    placedBoxes.push(box);

    ctx.fillStyle = "rgba(5, 8, 16, 0.72)";
    ctx.fillRect(box.x1, box.y1, box.x2 - box.x1, box.y2 - box.y1);
    ctx.fillStyle = s.category === "rating5" ? "#fde68a" : "#e2e8f0";
    ctx.fillText(title, tx, ty);
  }

  ctx.restore();
}

function bindConstellationCanvasEvents() {
  if (state.constellation.eventsBound) return;
  const canvas = document.getElementById("constellation-canvas");
  const tooltip = document.getElementById("constellation-tooltip");
  if (!canvas) return;
  state.constellation.eventsBound = true;

  let dragging = false;
  let dragMoved = false;
  let lastX = 0;
  let lastY = 0;
  let pinchStartDist = 0;

  const getLocalXY = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  canvas.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging = true;
    dragMoved = false;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture?.(e.pointerId);
  });

  canvas.addEventListener("pointermove", (e) => {
    const pt = getLocalXY(e.clientX, e.clientY);
    if (dragging) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.hypot(dx, dy) > 3) dragMoved = true;
      state.constellation.panX += dx;
      state.constellation.panY += dy;
      lastX = e.clientX;
      lastY = e.clientY;
      drawConstellationCanvas();
      return;
    }
    const hit = findStarAtCanvasPoint(pt.x, pt.y);
    const nextHoverId = hit ? hit.imdb_id : null;
    if (nextHoverId !== state.constellation.hoveredId) {
      state.constellation.hoveredId = nextHoverId;
      canvas.style.cursor = hit ? "pointer" : "grab";
      if (!state.constellation.selectedId) {
        updateConstellationTooltip(hit);
      }
      drawConstellationCanvas();
    }
  });

  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    if (!dragMoved) {
      const pt = getLocalXY(e.clientX, e.clientY);
      const hit = findStarAtCanvasPoint(pt.x, pt.y);
      if (hit) {
        if (state.constellation.selectedId === hit.imdb_id) {
          openMovieModal(hit.imdb_id);
        } else {
          state.constellation.selectedId = hit.imdb_id;
          updateConstellationTooltip(hit);
          drawConstellationCanvas();
        }
      } else {
        state.constellation.selectedId = null;
        updateConstellationTooltip(null);
        drawConstellationCanvas();
      }
    }
  };
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", () => {
    dragging = false;
  });

  canvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const pt = getLocalXY(e.clientX, e.clientY);
      const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      zoomConstellationBy(factor, pt.x, pt.y);
    },
    { passive: false }
  );

  canvas.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 2) {
        pinchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    },
    { passive: true }
  );

  canvas.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length === 2 && pinchStartDist > 0) {
        e.preventDefault();
        const curDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = curDist / pinchStartDist;
        if (Math.abs(factor - 1) > 0.03) {
          const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
          const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
          const pt = getLocalXY(midX, midY);
          zoomConstellationBy(factor, pt.x, pt.y);
          pinchStartDist = curDist;
        }
      }
    },
    { passive: false }
  );

  if (tooltip) {
    tooltip.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-const-open]");
      if (btn) {
        openMovieModal(btn.dataset.constOpen);
      }
    });
  }

  window.addEventListener("resize", () => {
    if (state.activeMainView === "constellation") {
      drawConstellationCanvas();
    }
  });
}

function renderConstellationView() {
  bindConstellationCanvasEvents();

  const userSignals = buildUserPreferenceSignals();
  const matchMap = new Map();
  for (const m of state.movies) {
    matchMap.set(m.imdb_id, computeMatchScore(m, state.tasteProfile, userSignals));
  }
  const filteredSet = buildConstellationFilteredIdSet();
  const model = V7.buildConstellationStarModel
    ? V7.buildConstellationStarModel(state.movies, state.watchMap, filteredSet, matchMap)
    : { stars: [], missingCount: state.movies.length, totalCount: state.movies.length };

  state.constellation.stars = model.stars;
  state.constellation.missingCount = model.missingCount;

  const hintEl = document.getElementById("constellation-missing-hint");
  if (hintEl) {
    if (model.stars.length === 0) {
      hintEl.textContent =
        "星座マップの座標（map_x / map_y）がまだ生成されていません。自宅PCで `python pipeline/build_constellation.py` を実行すると星空が点灯します。";
      hintEl.classList.remove("hidden");
    } else if (model.missingCount > 0) {
      hintEl.textContent = `${model.stars.length}本を星座に配置中（座標未生成の ${model.missingCount}本はスキップ中）`;
      hintEl.classList.remove("hidden");
    } else {
      hintEl.classList.add("hidden");
      hintEl.textContent = "";
    }
  }

  const activeStar = state.constellation.selectedId
    ? model.stars.find((s) => s.imdb_id === state.constellation.selectedId) || null
    : null;
  updateConstellationTooltip(activeStar);
  requestAnimationFrame(drawConstellationCanvas);
}

initApp();
