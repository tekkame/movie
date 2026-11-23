/* Core Cinema Archive - フロントエンドロジック（ゼロビルド静的SPA / v2） */

const DEMO_MOVIES = [
  {
    imdb_id: "tt31193180",
    release_year: 2025,
    year_rank: 1,
    title_ja: "罪人たち",
    title_en: "Sinners",
    original_language: "en",
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
    ai_summary:
      "ブルースの熱量とゴシックホラーが凄まじい密度で融合した快作。音響設計と緊張感の緩急が抜群で、ジャンル映画の枠を超えた没入感がある。",
    mood_tags: ["音楽が圧巻", "不穏サバイバル", "映像美"],
  },
  {
    imdb_id: "tt6751668",
    release_year: 2019,
    year_rank: 1,
    title_ja: "パラサイト 半地下の家族",
    title_en: "Parasite",
    original_language: "ko",
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
    ai_summary:
      "社会風刺と予測不能なサスペンスが完璧なテンポで噛み合う現代の傑作。笑いと戦慄が瞬時に反転する脚本の切れ味が圧巻。",
    mood_tags: ["予測不能", "ブラックユーモア", "社会派スリラー"],
  },
  {
    imdb_id: "tt2543164",
    release_year: 2016,
    year_rank: 13,
    title_ja: "メッセージ",
    title_en: "Arrival",
    original_language: "en",
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
    ai_summary:
      "異星人との対話を「言語学」から描く静謐で知的なSF。終盤の視点転換によって物語全体の意味が深く胸に迫る。",
    mood_tags: ["知的SF", "静謐で美しい", "余韻が深い"],
  },
  {
    imdb_id: "tt0245429",
    release_year: 2001,
    year_rank: 1,
    title_ja: "千と千尋の神隠し",
    title_en: "Spirited Away",
    original_language: "ja",
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
    ai_summary:
      "圧倒的なイマジネーションと緻密な生活描写が同居するアニメ映画の金字塔。久石譲の音楽とノスタルジックな色彩が忘れがたい。",
    mood_tags: ["幻想世界", "映像美", "成長物語"],
  },
  {
    imdb_id: "tt4633694",
    release_year: 2018,
    year_rank: 2,
    title_ja: "スパイダーマン：スパイダーバース",
    title_en: "Spider-Man: Into the Spider-Verse",
    original_language: "en",
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
    ai_summary:
      "コミックの質感と最新CGを融合させた革新的なアニメーション表現に目を奪われる。王道ヒーロー映画としての熱さも最高峰。",
    mood_tags: ["視覚革命", "熱い王道", "音楽が圧巻"],
  },
  {
    imdb_id: "tt0114369",
    release_year: 1995,
    year_rank: 14,
    title_ja: "セブン",
    title_en: "Se7en",
    original_language: "en",
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
    ai_summary:
      "降り続く雨と退廃的な街並みが不穏さを極限まで高める暗黒サスペンス。ラストまで一切の妥協がない展開は圧巻。",
    mood_tags: ["重厚サスペンス", "衝撃の結末", "ダークノワール"],
  },
];

const DEFAULT_TASTE_PROFILE = {
  critics_weight: 0.5,
  audience_weight: 0.4,
  awards_weight: 0.1,
  genre_weights: {},
  favorite_directors: [],
  preferred_decades: [],
  max_preferred_runtime: null,
  summary: "初期設定",
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
const LOCAL_WATCH_STORAGE_KEY = "core_cinema_demo_watch";
const TASTE_PANEL_OPEN_KEY = "core_cinema_taste_panel_open_v3";
const FILTER_PREFS_STORAGE_KEY = "core_cinema_filter_prefs_v3";
const VIEW_MODE_STORAGE_KEY = "core_cinema_view_mode_v3";

const state = {
  supabase: null,
  isDemo: true,
  user: null,
  userEmail: null,
  movies: [],
  filteredMovies: [],
  watchMap: {}, // imdb_id -> { status, my_rating, personal_rank, impression_tags, memo, updated_at }
  tasteProfile: { ...DEFAULT_TASTE_PROFILE },
  activePreset: null,
  presetGenres: null, // 例: ["Horror", "Thriller"] (プリセット用ORマッチ)
  isSyncingLocalToCloud: false,
  hasShownOfflineSaveHint: false,
  activeTasteTab: "taste", // "taste" | "guide"
  isTastePanelOpen: false,
  viewMode: "card", // "card" | "list"
  activeMainView: "browse", // "browse" | "ranking"
  isMobileFiltersOpen: false,
  battle: null, // { targetMovie, ranked, low, high, step, totalEstimatedSteps, queue, phase, decidedRank, isSaving }
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

function normalizeWatchEntry(row) {
  if (!row) {
    return {
      status: "unwatched",
      my_rating: null,
      personal_rank: null,
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
    (Array.isArray(entry.impression_tags) && entry.impression_tags.length > 0) ||
    Boolean(entry.memo && String(entry.memo).trim())
  );
}

function activateDemoMode(customMessageHtml = null) {
  state.isDemo = true;
  state.user = null;
  state.userEmail = null;
  state.movies = DEMO_MOVIES;
  const rawMap = loadLocalWatchMap();
  const tagsCache = loadImpressionTagsCache();
  const rankCache = loadPersonalRankCache();
  state.watchMap = {};
  for (const [id, entry] of Object.entries(rawMap)) {
    const norm = normalizeWatchEntry(entry);
    if (norm.impression_tags.length === 0 && Array.isArray(tagsCache[id])) {
      norm.impression_tags = tagsCache[id];
    }
    if (norm.personal_rank == null && rankCache[id] != null) {
      norm.personal_rank = rankCache[id];
    }
    state.watchMap[id] = norm;
  }
  for (const [id, rank] of Object.entries(rankCache)) {
    if (!state.watchMap[id]) {
      state.watchMap[id] = normalizeWatchEntry({
        status: "watched",
        personal_rank: rank,
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
  const cw = Number(profile.critics_weight ?? 0.5);
  const aw = Number(profile.audience_weight ?? 0.4);
  const ww = Number(profile.awards_weight ?? 0.1);
  const totalWeight = cw + aw + ww;
  const normCw = totalWeight > 0 ? cw / totalWeight : 0.5;
  const normAw = totalWeight > 0 ? aw / totalWeight : 0.4;
  const normWw = totalWeight > 0 ? ww / totalWeight : 0.1;

  const audience100 = movie.imdb_rating != null ? Number(movie.imdb_rating) * 10 : Number(movie.composite_score || 70);
  const criticValues = [movie.metascore, movie.rt_score]
    .filter((v) => v != null && !Number.isNaN(Number(v)))
    .map(Number);
  const critic100 = criticValues.length > 0 ? criticValues.reduce((a, b) => a + b, 0) / criticValues.length : audience100 * 0.92;
  const awards100 = inferAwardsBonus(movie) * 10; // 0〜100スケールに正規化

  let score = critic100 * normCw + audience100 * normAw + awards100 * normWw;

  // 批評家スコアも少なく投票数も少ないローカル作品はマッチ度でも補正
  if (criticValues.length === 0 && movie.imdb_votes != null && Number(movie.imdb_votes) < 80000) {
    score *= 0.85;
  }

  // ジャンル重み (genre_weights: 加減点数値 例: +8 / -10、または倍率 1.15 の両方を安全にサポート)
  const genreWeights = profile.genre_weights && typeof profile.genre_weights === "object" ? profile.genre_weights : {};
  const movieGenres = Array.isArray(movie.genres) ? movie.genres : [];
  let genreAdjustment = 0;
  for (const g of movieGenres) {
    if (genreWeights[g] != null && !Number.isNaN(Number(genreWeights[g]))) {
      const val = Number(genreWeights[g]);
      if (val > 0 && val <= 2.0 && !Number.isInteger(val)) {
        genreAdjustment += (val - 1.0) * 15;
      } else {
        genreAdjustment += val;
      }
    }
  }
  score += Math.max(-20, Math.min(20, genreAdjustment));

  // お気に入り監督一致ボーナス
  const favDirectors = Array.isArray(profile.favorite_directors)
    ? profile.favorite_directors.map((d) => String(d).trim().toLowerCase()).filter(Boolean)
    : [];
  const movieDirectorLower = String(movie.director || "").toLowerCase();
  if (movieDirectorLower && favDirectors.some((d) => movieDirectorLower.includes(d))) {
    score += 8;
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
      score += 5;
    }
  }

  // 上映時間の好み
  if (profile.max_preferred_runtime != null && movie.runtime_minutes != null) {
    const maxRt = Number(profile.max_preferred_runtime);
    const rt = Number(movie.runtime_minutes);
    if (!Number.isNaN(maxRt) && maxRt > 0) {
      if (rt <= maxRt) {
        score += 2;
      } else {
        const excess = rt - maxRt;
        score -= Math.min(10, Math.ceil(excess / 10) * 2);
      }
    }
  }

  // ユーザーがリアルタイムに付けた★評価履歴（ジャンル・監督・年代）からも動的に学習して加算
  if (userSignals && userSignals.ratedCount > 0) {
    let personalDelta = 0;
    for (const g of movieGenres) {
      if (userSignals.genreScores[g]) {
        personalDelta += Math.max(-4.5, Math.min(4.5, userSignals.genreScores[g] * 1.1));
      }
    }
    if (movie.director) {
      for (const d of String(movie.director).split(",").map((s) => s.trim().toLowerCase())) {
        if (userSignals.directorScores[d]) {
          personalDelta += Math.max(-6, Math.min(6, userSignals.directorScores[d] * 2.5));
        }
      }
    }
    if (movie.release_year && userSignals.decadeScores) {
      const decKey = String(Math.floor(Number(movie.release_year) / 10) * 10);
      if (userSignals.decadeScores[decKey]) {
        personalDelta += Math.max(-2.5, Math.min(2.5, userSignals.decadeScores[decKey] * 0.4));
      }
    }
    score += Math.max(-10, Math.min(10, personalDelta));
  }

  return Math.round(Math.max(0, Math.min(100, score)));
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
  if (!providerEl || !flatrateEl) return;
  try {
    localStorage.setItem(
      FILTER_PREFS_STORAGE_KEY,
      JSON.stringify({
        provider: providerEl.value || "all",
        flatrateOnly: Boolean(flatrateEl.checked),
      })
    );
  } catch {
    // ignore
  }
}

function restoreFilterPrefs() {
  const providerEl = document.getElementById("filter-provider");
  const flatrateEl = document.getElementById("filter-flatrate-only");
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
  if (document.getElementById("filter-flatrate-only")?.checked) count += 1;
  if (document.getElementById("filter-sort")?.value !== "year_desc") count += 1;
  if (Array.isArray(state.presetGenres) && state.presetGenres.length > 0) count += 1;

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
              `<button type="button" class="tg-chip tg-chip-dir" data-filter-query="${escapeHtml(d.name)}" title="${escapeHtml(d.name)}の作品を検索">🎬 ${escapeHtml(d.name)} ★${d.avg.toFixed(1)}</button>`
          )
          .join("")
      : (state.tasteProfile?.favorite_directors || [])
          .slice(0, 5)
          .map(
            (d) =>
              `<button type="button" class="tg-chip tg-chip-dir" data-filter-query="${escapeHtml(d)}" title="${escapeHtml(d)}の作品を検索">🎬 ${escapeHtml(d)}</button>`
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
  await loadTasteProfile();

  // v3: 好み分析パネルはデフォルトで非表示（ボタンを押したときだけ開く）
  state.isTastePanelOpen = false;
  try {
    state.viewMode = localStorage.getItem(VIEW_MODE_STORAGE_KEY) === "list" ? "list" : "card";
  } catch {
    state.viewMode = "card";
  }

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
  restoreFilterPrefs();
  updateAuthUI();
  setTastePanelOpen(false);
  setViewMode(state.viewMode, { persist: false, rerender: false });
  setMobileFiltersOpen(false);
  bindEvents();
  renderMovies();
}

async function fetchAllMoviesPaginated() {
  const pageSize = 1000;
  const allMovies = [];
  let from = 0;

  while (true) {
    const to = from + pageSize - 1;
    const { data, error } = await state.supabase
      .from("movies")
      .select("*")
      .order("release_year", { ascending: false })
      .order("year_rank", { ascending: true })
      .range(from, to);

    if (error) {
      return { data: null, error };
    }

    const batch = data || [];
    allMovies.push(...batch);
    if (batch.length < pageSize) {
      break;
    }
    from += pageSize;
  }

  return { data: allMovies, error: null };
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
      impression_tags:
        localNorm.impression_tags.length > 0 ? localNorm.impression_tags : remoteNorm.impression_tags,
      memo: localNorm.memo || remoteNorm.memo,
    };
  }
  return {
    ...remoteNorm,
    personal_rank: remoteNorm.personal_rank != null ? remoteNorm.personal_rank : localNorm.personal_rank,
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
  const remoteMap = {};

  for (const row of watchRes.data || []) {
    const norm = normalizeWatchEntry(row);
    if (norm.impression_tags.length === 0 && Array.isArray(tagsCache[row.imdb_id])) {
      norm.impression_tags = tagsCache[row.imdb_id];
    }
    if (norm.personal_rank == null && rankCache[row.imdb_id] != null) {
      norm.personal_rank = rankCache[row.imdb_id];
    }
    remoteMap[row.imdb_id] = norm;
  }

  const localMap = loadLocalWatchMap();
  const validMovieIds = new Set(state.movies.map((m) => m.imdb_id));

  for (const [id, remoteEntry] of Object.entries(remoteMap)) {
    state.watchMap[id] = remoteEntry;
  }

  // 未ログイン時にブラウザ(localStorage)へ保存された記録をマージして即時反映
  for (const [id, localEntry] of Object.entries(localMap)) {
    if (!validMovieIds.has(id)) continue;
    if (!remoteMap[id]) {
      if (isMeaningfulWatchEntry(localEntry)) {
        state.watchMap[id] = localEntry;
      }
      continue;
    }
    state.watchMap[id] = mergeWatchEntry(remoteMap[id], localEntry);
  }

  // personal_rankキャッシュにあってremote/localどちらにも未登録のIDも復元
  for (const [id, rank] of Object.entries(rankCache)) {
    if (!validMovieIds.has(id)) continue;
    if (!state.watchMap[id]) {
      state.watchMap[id] = normalizeWatchEntry({
        status: "watched",
        personal_rank: rank,
        impression_tags: Array.isArray(tagsCache[id]) ? tagsCache[id] : [],
      });
    } else if (state.watchMap[id].personal_rank == null) {
      state.watchMap[id].personal_rank = rank;
    }
  }
}

async function upsertWatchRowsWithColumnFallback(rows) {
  let currentRows = rows.map((r) => ({ ...r }));
  let res = await state.supabase.from("user_watch_status").upsert(currentRows);

  if (res.error && isMissingColumnError(res.error, "personal_rank")) {
    currentRows = currentRows.map(({ personal_rank: _omitRank, ...rest }) => rest);
    res = await state.supabase.from("user_watch_status").upsert(currentRows);
  }
  if (res.error && isMissingColumnError(res.error, "impression_tags")) {
    currentRows = currentRows.map(({ impression_tags: _omitTags, ...rest }) => rest);
    res = await state.supabase.from("user_watch_status").upsert(currentRows);
  }
  if (res.error && (isMissingColumnError(res.error, "personal_rank") || isMissingColumnError(res.error, "impression_tags"))) {
    currentRows = currentRows.map(({ personal_rank: _r, impression_tags: _t, ...rest }) => rest);
    res = await state.supabase.from("user_watch_status").upsert(currentRows);
  }
  return res;
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
    const { error } = await upsertWatchRowsWithColumnFallback(pendingPayloads);
    if (!error) {
      saveLocalWatchMap({});
      for (const p of pendingPayloads) {
        state.watchMap[p.imdb_id] = normalizeWatchEntry(p);
      }
      syncPersonalRankCacheFromWatchMap(state.watchMap);
      showToast(`ブラウザに保存されていた ${pendingPayloads.length} 件の記録をクラウドへ同期しました`);
    } else {
      console.error("ローカル記録の同期エラー:", error);
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
  }
  document.getElementById("filter-slot").value = "all";
  document.getElementById("filter-genre").value = "all";
  document.getElementById("filter-runtime").value = "";
  document.getElementById("filter-watch").value = "all";
  document.getElementById("filter-query").value = "";
  document.getElementById("filter-sort").value = "year_desc";
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
    document.getElementById("filter-watch").value = "unwatched";
    document.getElementById("filter-sort").value = "match_desc";
  } else if (presetName === "weekday_short") {
    document.getElementById("filter-flatrate-only").checked = true;
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

function getFilteredMovies() {
  const decade = document.getElementById("filter-decade").value;
  const year = document.getElementById("filter-year").value;
  const provider = document.getElementById("filter-provider").value;
  const slot = document.getElementById("filter-slot").value;
  const genre = document.getElementById("filter-genre").value;
  const runtimeMaxRaw = document.getElementById("filter-runtime").value;
  const runtimeMax = runtimeMaxRaw ? Number(runtimeMaxRaw) : null;
  const watch = document.getElementById("filter-watch").value;
  const flatrateOnly = document.getElementById("filter-flatrate-only").checked;
  const query = document.getElementById("filter-query").value.trim().toLowerCase();
  const sort = document.getElementById("filter-sort").value;

  const userSignals = buildUserPreferenceSignals();

  const filtered = state.movies.filter((m) => {
    if (decade !== "all") {
      const start = parseInt(decade.slice(0, 4), 10);
      if (m.release_year < start || m.release_year > start + 9) return false;
    }
    if (year !== "all" && String(m.release_year) !== year) return false;
    if (slot !== "all" && m.selection_slot !== slot) return false;

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
    if (provider !== "all") {
      const targetList = flatrateOnly ? flatrate : allProv;
      if (!targetList.some((p) => p.toLowerCase().includes(provider.toLowerCase()))) return false;
    }

    const wStatus = state.watchMap[m.imdb_id]?.status || "unwatched";
    if (watch !== "all" && wStatus !== watch) return false;

    if (query) {
      const haystack = [
        m.title_ja,
        m.title_en,
        m.director,
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

function renderMoodTags(tags, limit = null) {
  const list = Array.isArray(tags) ? tags.filter(Boolean) : [];
  if (list.length === 0) return "";
  const shown = limit ? list.slice(0, limit) : list;
  return `<div class="mood-tags-row">${shown
    .map(
      (tag) =>
        `<button type="button" class="mood-tag" data-mood-tag="${escapeHtml(tag)}" title="「${escapeHtml(tag)}」で絞り込む">#${escapeHtml(tag)}</button>`
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

  const headerBtn = document.getElementById("toggle-ranking-btn");
  const resultsBtn = document.getElementById("results-ranking-btn");
  const isRanking = state.activeMainView === "ranking";
  if (headerBtn) {
    headerBtn.classList.toggle("active", isRanking);
    headerBtn.setAttribute("aria-pressed", String(isRanking));
  }
  if (resultsBtn) {
    resultsBtn.classList.toggle("active", isRanking);
    resultsBtn.setAttribute("aria-pressed", String(isRanking));
  }
}

function setActiveMainView(viewName) {
  state.activeMainView = viewName === "ranking" ? "ranking" : "browse";
  const browseView = document.getElementById("browse-view");
  const rankingView = document.getElementById("ranking-view");
  if (browseView) browseView.classList.toggle("hidden", state.activeMainView !== "browse");
  if (rankingView) rankingView.classList.toggle("hidden", state.activeMainView !== "ranking");
  updateRankingNavBadges();
  if (state.activeMainView === "ranking") {
    renderRankingView();
  } else {
    renderMovies();
  }
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
        ${
          m.poster_url
            ? `<img src="${escapeHtml(m.poster_url)}" alt="${escapeHtml(m.title_ja)}" loading="lazy" />`
            : `<div class="list-thumb-fallback">${escapeHtml(m.title_ja.slice(0, 2))}</div>`
        }
      </div>
      <div class="list-main">
        <div class="list-meta-line">
          <span class="list-year-rank">${m.release_year} · #${m.year_rank}</span>
          <span class="list-match-chip">マッチ ${matchScore}%</span>
          ${personalRank != null ? `<span class="badge badge-personal-rank">🏆 歴代${personalRank}位</span>` : ""}
          ${flatrate.map((p) => `<span class="badge badge-flatrate">${escapeHtml(p)}</span>`).join("")}
        </div>
        <h2 class="list-title">${escapeHtml(m.title_ja)}</h2>
        <div class="list-sub">${escapeHtml(m.title_en)}${m.runtime_minutes ? ` · ${m.runtime_minutes}分` : ""} · 総合 ${Number(m.composite_score).toFixed(1)}</div>
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
  updateWatchStatsSummary();
  updateRankingNavBadges();
  updateActiveFiltersBadge();
  renderYearTabsBar();
  renderTasteAnalyticsDashboard();
  if (state.activeMainView === "ranking") {
    renderRankingView();
  }

  grid.classList.toggle("is-list-mode", state.viewMode === "list");

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty-state">条件に一致する映画がありません。フィルタを緩めてお試しください。</p>`;
    return;
  }

  if (state.viewMode === "list") {
    grid.innerHTML = list.map(renderListRow).join("");
    return;
  }

  grid.innerHTML = list
    .map((m) => {
      const w = state.watchMap[m.imdb_id];
      const isWatched = w?.status === "watched";
      const isWatchlist = w?.status === "watchlist";
      const personalRank = normalizePersonalRank(w?.personal_rank);
      const flatrate = (m.jp_providers?.flatrate || []).slice(0, 2);
      const slotClass = m.selection_slot === "top12" ? "slot-top12" : "slot-genre";
      const matchScore = m._matchScore != null ? m._matchScore : computeMatchScore(m);
      const isHighMatch = matchScore >= 85;

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
            ${
              m.poster_url
                ? `<img src="${escapeHtml(m.poster_url)}" alt="${escapeHtml(m.title_ja)}" loading="lazy" />`
                : `<div class="poster-fallback"><strong>${escapeHtml(m.title_ja)}</strong><span>${escapeHtml(m.title_en)}</span></div>`
            }
            <span class="score-pill">${Number(m.composite_score).toFixed(1)}</span>
            <span class="slot-pill ${slotClass}">${escapeHtml(m.selection_category)}</span>
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
}

function isMissingColumnError(error, columnName) {
  if (!error) return false;
  const code = String(error.code || "");
  const msg = String(error.message || "").toLowerCase();
  const details = String(error.details || "").toLowerCase();
  return (
    code === "PGRST204" ||
    code === "42703" ||
    (msg.includes(columnName.toLowerCase()) && (msg.includes("column") || msg.includes("schema cache"))) ||
    details.includes(columnName.toLowerCase())
  );
}

async function upsertWatchStatus(payload) {
  const normalized = normalizeWatchEntry(payload);
  saveImpressionTagsCache(payload.imdb_id, normalized.impression_tags);
  savePersonalRankCacheEntry(payload.imdb_id, normalized.personal_rank);
  state.watchMap[payload.imdb_id] = normalized;

  if (state.isDemo) {
    saveLocalWatchMap(state.watchMap);
    return { error: null, mode: "local" };
  }

  // 未ログイン時は即座にブラウザ(localStorage)へ保存して操作を止めない
  if (!state.userEmail) {
    saveLocalWatchEntry(payload.imdb_id, normalized);
    return { error: null, mode: "local" };
  }

  const rowPayload = {
    imdb_id: payload.imdb_id,
    status: normalized.status,
    my_rating: normalized.my_rating,
    personal_rank: normalized.personal_rank,
    impression_tags: normalized.impression_tags,
    memo: normalized.memo ? String(normalized.memo) : null,
    updated_at: normalized.updated_at || new Date().toISOString(),
  };

  const { error } = await upsertWatchRowsWithColumnFallback([rowPayload]);

  if (error) {
    // クラウド失敗時もローカルバックアップは保持
    saveLocalWatchEntry(payload.imdb_id, normalized);
    return { error, mode: "error" };
  }

  // クラウド保存が成功したらローカル未同期キューから対象IDを除去
  const localMap = loadLocalWatchMap();
  if (localMap[payload.imdb_id]) {
    delete localMap[payload.imdb_id];
    saveLocalWatchMap(localMap);
  }
  return { error: null, mode: "cloud" };
}

async function persistWatchEntriesBatch(entries) {
  if (!Array.isArray(entries) || entries.length === 0) {
    return { error: null, mode: "local" };
  }

  const nowIso = new Date().toISOString();
  const normalizedList = entries.map((item) => {
    const norm = normalizeWatchEntry({ ...item, updated_at: item.updated_at || nowIso });
    saveImpressionTagsCache(norm.imdb_id, norm.impression_tags);
    savePersonalRankCacheEntry(norm.imdb_id, norm.personal_rank);
    state.watchMap[norm.imdb_id] = norm;
    return norm;
  });

  if (state.isDemo) {
    saveLocalWatchMap(state.watchMap);
    return { error: null, mode: "local" };
  }

  if (!state.userEmail) {
    const localMap = loadLocalWatchMap();
    for (const norm of normalizedList) {
      localMap[norm.imdb_id] = norm;
    }
    saveLocalWatchMap(localMap);
    return { error: null, mode: "local" };
  }

  const payloads = normalizedList.map((norm) => ({
    imdb_id: norm.imdb_id,
    status: norm.status,
    my_rating: norm.my_rating,
    personal_rank: norm.personal_rank,
    impression_tags: norm.impression_tags,
    memo: norm.memo ? String(norm.memo) : null,
    updated_at: norm.updated_at,
  }));

  const { error } = await upsertWatchRowsWithColumnFallback(payloads);
  if (error) {
    const localMap = loadLocalWatchMap();
    for (const norm of normalizedList) {
      localMap[norm.imdb_id] = norm;
    }
    saveLocalWatchMap(localMap);
    return { error, mode: "error" };
  }

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
  return { error: null, mode: "cloud" };
}

async function applyRankedOrder(orderedImdbIds, removedImdbIds = []) {
  const movieMap = new Map(state.movies.map((m) => [m.imdb_id, m]));
  const updatedEntries = [];
  const nowIso = new Date().toISOString();

  orderedImdbIds.forEach((imdbId, idx) => {
    if (!movieMap.has(imdbId)) return;
    const prev = normalizeWatchEntry(state.watchMap[imdbId]);
    const nextStatus = prev.status === "watched" ? "watched" : "watched";
    const nextRank = idx + 1;
    updatedEntries.push({
      ...prev,
      imdb_id: imdbId,
      status: nextStatus,
      personal_rank: nextRank,
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

  if (action === "watchlist") {
    nextStatus = prev.status === "watchlist" ? "unwatched" : "watchlist";
    if (nextStatus === "unwatched") {
      nextRating = prev.my_rating;
    }
  } else if (action === "watched") {
    if (prev.status === "watched") {
      nextStatus = "unwatched";
      nextRating = null;
    } else {
      nextStatus = "watched";
    }
  } else if (action === "rate") {
    nextStatus = "watched";
    nextRating = Number(ratingValue);
  }

  const payload = {
    imdb_id: imdbId,
    status: nextStatus,
    my_rating: nextRating,
    personal_rank: prev.personal_rank,
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
  renderMovies();

  const { error, mode } = await upsertWatchStatus(payload);
  if (error) {
    // クラウド保存に失敗した場合はローカルには保持しつつ通知
    showToast(`クラウド同期に失敗（ブラウザに一時保存済み）: ${error.message}`, {
      actionLabel: "ログイン",
      onAction: openAuthModal,
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
  const posterHtml = movie.poster_url
    ? `<img class="battle-poster" src="${escapeHtml(movie.poster_url)}" alt="${escapeHtml(movie.title_ja)}" />`
    : `<div class="battle-poster-fallback"><strong>${escapeHtml(movie.title_ja)}</strong><span>${escapeHtml(movie.title_en)}</span></div>`;

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
    const posterHtml = target.poster_url
      ? `<img class="battle-result-poster" src="${escapeHtml(target.poster_url)}" alt="${escapeHtml(target.title_ja)}" />`
      : `<div class="battle-poster-fallback battle-result-poster"><strong>${escapeHtml(target.title_ja)}</strong></div>`;

    body.innerHTML = `
      <div class="modal-header battle-modal-header">
        <div>
          <h2>⚔️ 2択バトル結果</h2>
          <p class="battle-subtitle">歴代マイランキングを更新しました</p>
        </div>
        <button type="button" class="icon-close" data-close-modal="battle-modal" aria-label="閉じる">✕</button>
      </div>
      <div class="battle-result-box">
        <div class="battle-result-crown">🏆 歴代 ${b.decidedRank}位 に決定！</div>
        <div class="battle-result-movie">
          ${posterHtml}
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
      <button type="button" class="icon-close" data-close-modal="battle-modal" aria-label="閉じる">✕</button>
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
}

async function finalizeBattlePlacement(insertIndex) {
  const b = state.battle;
  if (!b || b.isSaving) return;
  b.isSaving = true;

  const newOrderIds = b.ranked.map((item) => item.movie.imdb_id);
  newOrderIds.splice(insertIndex, 0, b.targetMovie.imdb_id);

  b.decidedRank = insertIndex + 1;
  b.phase = "result";

  // 参加時にwatchedでなければ自動でwatchedに昇格させたうえで連番保存
  const prevTarget = normalizeWatchEntry(state.watchMap[b.targetMovie.imdb_id]);
  state.watchMap[b.targetMovie.imdb_id] = normalizeWatchEntry({
    ...prevTarget,
    imdb_id: b.targetMovie.imdb_id,
    status: "watched",
    personal_rank: b.decidedRank,
  });

  renderBattleModal();
  const { error } = await applyRankedOrder(newOrderIds);
  b.isSaving = false;
  if (error) {
    showToast(`クラウド同期に失敗（ブラウザに保存済み）: ${error.message}`);
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
   🏆 マイランキング ビュー
   ============================================================================ */

function renderRankingView() {
  const rankedList = getRankedMoviesList();
  const unrankedFiveStars = getUnrankedFiveStarMovies();

  const subtitleEl = document.getElementById("ranking-subtitle");
  if (subtitleEl) {
    subtitleEl.textContent =
      rankedList.length > 0
        ? `現在 ${rankedList.length}作品を順位付け済み（↑↓で微調整・⚔️ 再戦で順位を決め直せます）`
        : "まだランクインした作品がありません。★5評価や詳細画面から2択バトルで順位を決めましょう！";
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
            ${
              m.poster_url
                ? `<img src="${escapeHtml(m.poster_url)}" alt="${escapeHtml(m.title_ja)}" loading="lazy" />`
                : `<div class="list-thumb-fallback">${escapeHtml(m.title_ja.slice(0, 2))}</div>`
            }
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
}

async function handleRankingRowAction(action, imdbId) {
  const rankedList = getRankedMoviesList();
  const orderedIds = rankedList.map((item) => item.movie.imdb_id);
  const idx = orderedIds.indexOf(imdbId);

  if (action === "up") {
    if (idx <= 0) return;
    [orderedIds[idx - 1], orderedIds[idx]] = [orderedIds[idx], orderedIds[idx - 1]];
    await applyRankedOrder(orderedIds);
    return;
  }

  if (action === "down") {
    if (idx < 0 || idx >= orderedIds.length - 1) return;
    [orderedIds[idx], orderedIds[idx + 1]] = [orderedIds[idx + 1], orderedIds[idx]];
    await applyRankedOrder(orderedIds);
    return;
  }

  if (action === "rebattle") {
    startBattleForMovie(imdbId);
    return;
  }

  if (action === "remove") {
    if (idx < 0) return;
    orderedIds.splice(idx, 1);
    await applyRankedOrder(orderedIds, [imdbId]);
    showToast("マイランキングから外しました（★評価と視聴済みステータスは保持）");
  }
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

  const modal = document.getElementById("movie-modal");
  const hasBackdrop = Boolean(m.backdrop_url);
  const backdropBanner = hasBackdrop
    ? `<div class="modal-backdrop-banner" style="background-image:url('${escapeHtml(m.backdrop_url)}')"><button type="button" class="icon-close" data-close-modal="movie-modal" aria-label="閉じる">✕</button></div>`
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

  document.getElementById("modal-body").innerHTML = `
    ${backdropBanner}
    <div style="${hasBackdrop ? "padding:16px 20px 20px" : ""}">
      <div class="modal-header">
        <div>
          <h2>${escapeHtml(m.title_ja)} <span style="color:var(--text-secondary);font-size:0.9rem">(${m.release_year})</span></h2>
          <div class="card-en">${escapeHtml(m.title_en)} ｜ 監督: ${escapeHtml(m.director || "不明")}${m.runtime_minutes ? ` ｜ ${m.runtime_minutes}分` : ""}</div>
        </div>
        ${hasBackdrop ? "" : `<button type="button" class="icon-close" data-close-modal="movie-modal" aria-label="閉じる">✕</button>`}
      </div>

      <div class="modal-grid">
        <div>
          ${
            m.poster_url
              ? `<img class="modal-poster" src="${escapeHtml(m.poster_url)}" alt="${escapeHtml(m.title_ja)}" />`
              : `<div class="poster-wrap" style="border-radius:10px"><div class="poster-fallback"><strong>${escapeHtml(m.title_ja)}</strong><span>${escapeHtml(m.title_en)}</span></div></div>`
          }
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
          ${(m.mood_tags || []).length ? `<div class="detail-section"><h3>ムードタグ（クリックで検索）</h3>${renderMoodTags(m.mood_tags)}</div>` : ""}
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

        <div class="impression-section">
          <div class="impression-title">印象チップ（複数選択可・任意）</div>
          ${impressionGroupsHtml}
        </div>

        <textarea id="modal-memo" rows="2" placeholder="感想やメモ...">${escapeHtml(w.memo || "")}</textarea>
        <div><button id="save-watch-btn" type="button" class="btn btn-primary" data-imdb-id="${escapeHtml(imdbId)}">記録を保存</button></div>
      </div>
    </div>
  `;

  const modalBody = document.getElementById("modal-body");
  modalBody.style.padding = hasBackdrop ? "0" : "20px";

  let selectedStatus = w.status || "unwatched";
  modal.querySelectorAll("[data-status]").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedStatus = btn.dataset.status;
      modal.querySelectorAll("[data-status]").forEach((b) => b.classList.toggle("active", b === btn));
    });
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

  const battleBtn = document.getElementById("modal-battle-btn");
  if (battleBtn) {
    battleBtn.addEventListener("click", async () => {
      const ratingVal = document.getElementById("modal-rating").value;
      const ensuredStatus = "watched";
      const payload = {
        imdb_id: imdbId,
        status: ensuredStatus,
        my_rating: ratingVal ? Number(ratingVal) : w.my_rating,
        personal_rank: currentRank,
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
      const payload = {
        imdb_id: imdbId,
        status: selectedStatus,
        my_rating: ratingVal ? Number(ratingVal) : null,
        personal_rank: latestEntry.personal_rank,
        impression_tags: [...selectedImpressionSet],
        memo: document.getElementById("modal-memo").value.trim() || null,
        updated_at: new Date().toISOString(),
      };

      const { error, mode } = await upsertWatchStatus(payload);
      if (error) {
        showToast(`クラウド同期に失敗（ブラウザに一時保存済み）: ${error.message}`);
      } else if (mode === "local") {
        notifyLocalSaveOnce();
      } else {
        showToast("視聴記録をクラウドに保存しました");
      }
      modal.close();
      renderMovies();
    });
  }

  modal.showModal();
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
            ${
              m.poster_url
                ? `<img src="${escapeHtml(m.poster_url)}" alt="${escapeHtml(m.title_ja)}" class="gacha-poster" />`
                : `<div class="poster-wrap gacha-poster-fallback"><div class="poster-fallback"><strong>${escapeHtml(m.title_ja)}</strong><span>${escapeHtml(m.title_en)}</span></div></div>`
            }
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
    "filter-flatrate-only",
    "filter-sort",
  ].forEach((id) => {
    document.getElementById(id).addEventListener("change", () => {
      clearActivePreset();
      if (id === "filter-provider" || id === "filter-flatrate-only") {
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
  }

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
      clearActivePreset();
      document.getElementById("filter-query").value = tagBtn.dataset.moodTag;
      renderMovies();
      return;
    }

    const card = e.target.closest(".movie-card, .movie-list-row");
    if (card) openMovieModal(card.dataset.imdbId);
  });

  document.body.addEventListener("click", (e) => {
    const tagBtn = e.target.closest("#movie-modal [data-mood-tag]");
    if (tagBtn) {
      clearActivePreset();
      document.getElementById("filter-query").value = tagBtn.dataset.moodTag;
      document.getElementById("movie-modal").close();
      renderMovies();
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

initApp();
