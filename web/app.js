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
const LOCAL_WATCH_STORAGE_KEY = "core_cinema_demo_watch";

const state = {
  supabase: null,
  isDemo: true,
  user: null,
  userEmail: null,
  movies: [],
  filteredMovies: [],
  watchMap: {}, // imdb_id -> { status, my_rating, impression_tags, memo, updated_at }
  tasteProfile: { ...DEFAULT_TASTE_PROFILE },
  activePreset: null,
  presetGenres: null, // 例: ["Horror", "Thriller"] (プリセット用ORマッチ)
  isSyncingLocalToCloud: false,
  hasShownOfflineSaveHint: false,
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

function normalizeWatchEntry(row) {
  if (!row) {
    return { status: "unwatched", my_rating: null, impression_tags: [], memo: "", updated_at: null };
  }
  return {
    ...row,
    status: row.status || "unwatched",
    my_rating: row.my_rating != null ? Number(row.my_rating) : null,
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
  const cache = loadImpressionTagsCache();
  state.watchMap = {};
  for (const [id, entry] of Object.entries(rawMap)) {
    const norm = normalizeWatchEntry(entry);
    if (norm.impression_tags.length === 0 && Array.isArray(cache[id])) {
      norm.impression_tags = cache[id];
    }
    state.watchMap[id] = norm;
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
  const genreScores = {};
  const directorScores = {};
  let ratedCount = 0;

  for (const [imdbId, w] of Object.entries(state.watchMap)) {
    if (!w || w.my_rating == null) continue;
    const movie = state.movies.find((m) => m.imdb_id === imdbId);
    if (!movie) continue;
    ratedCount += 1;
    // ★3を基準(0)に、★5=+2, ★4=+1, ★2=-1, ★1=-2
    const delta = Number(w.my_rating) - 3;
    for (const g of movie.genres || []) {
      genreScores[g] = (genreScores[g] || 0) + delta;
    }
    if (movie.director) {
      for (const d of String(movie.director).split(",").map((s) => s.trim()).filter(Boolean)) {
        directorScores[d.toLowerCase()] = (directorScores[d.toLowerCase()] || 0) + delta;
      }
    }
  }

  return { ratedCount, genreScores, directorScores };
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

  // ジャンル重み (genre_weights: 加減点数値 例: +8 / -10、または倍率 1.15 の両方を安全にサポート)
  const genreWeights = profile.genre_weights && typeof profile.genre_weights === "object" ? profile.genre_weights : {};
  const movieGenres = Array.isArray(movie.genres) ? movie.genres : [];
  let genreAdjustment = 0;
  for (const g of movieGenres) {
    if (genreWeights[g] != null && !Number.isNaN(Number(genreWeights[g]))) {
      const val = Number(genreWeights[g]);
      // 0 < val <= 2 かつ 整数でないか倍率指定風の場合は倍率換算、それ以外は±ポイント加算
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

  // ユーザーが付けた過去の★評価傾向を軽く反映（評価が溜まるほどパーソナライズ）
  if (userSignals && userSignals.ratedCount > 0) {
    let personalDelta = 0;
    for (const g of movieGenres) {
      if (userSignals.genreScores[g]) {
        personalDelta += Math.max(-4, Math.min(4, userSignals.genreScores[g] * 1.2));
      }
    }
    if (movie.director) {
      for (const d of String(movie.director).split(",").map((s) => s.trim().toLowerCase())) {
        if (userSignals.directorScores[d]) {
          personalDelta += Math.max(-5, Math.min(5, userSignals.directorScores[d] * 2));
        }
      }
    }
    score += Math.max(-8, Math.min(8, personalDelta));
  }

  return Math.round(Math.max(0, Math.min(100, score)));
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
  updateAuthUI();
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
      impression_tags:
        localNorm.impression_tags.length > 0 ? localNorm.impression_tags : remoteNorm.impression_tags,
      memo: localNorm.memo || remoteNorm.memo,
    };
  }
  return remoteNorm;
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
  const cache = loadImpressionTagsCache();
  const remoteMap = {};

  for (const row of watchRes.data || []) {
    const norm = normalizeWatchEntry(row);
    if (norm.impression_tags.length === 0 && Array.isArray(cache[row.imdb_id])) {
      norm.impression_tags = cache[row.imdb_id];
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
    let { error } = await state.supabase.from("user_watch_status").upsert(pendingPayloads);
    if (error && isMissingColumnError(error, "impression_tags")) {
      const fallback = pendingPayloads.map(({ impression_tags: _omit, ...rest }) => rest);
      const retry = await state.supabase.from("user_watch_status").upsert(fallback);
      error = retry.error;
    }
    if (!error) {
      saveLocalWatchMap({});
      for (const p of pendingPayloads) {
        state.watchMap[p.imdb_id] = normalizeWatchEntry(p);
      }
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

function resetAllFilterControls({ keepPreset = false } = {}) {
  document.getElementById("filter-decade").value = "all";
  document.getElementById("filter-year").value = "all";
  document.getElementById("filter-provider").value = "all";
  document.getElementById("filter-slot").value = "all";
  document.getElementById("filter-genre").value = "all";
  document.getElementById("filter-runtime").value = "";
  document.getElementById("filter-watch").value = "all";
  document.getElementById("filter-flatrate-only").checked = false;
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
    resetAllFilterControls();
    renderMovies();
    return;
  }

  resetAllFilterControls({ keepPreset: true });
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

function renderQuickBar(movie, watchEntry) {
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
    <div class="card-quick-bar" data-quick-bar="true">
      <div class="quick-status-group">
        <button type="button" class="quick-btn ${isWatchlist ? "active-watchlist" : ""}" data-quick-action="watchlist" data-imdb-id="${escapeHtml(movie.imdb_id)}" title="観たいリストをトグル">🔖 観たい</button>
        <button type="button" class="quick-btn ${isWatched ? "active-watched" : ""}" data-quick-action="watched" data-imdb-id="${escapeHtml(movie.imdb_id)}" title="視聴済みをトグル">👁 観た</button>
      </div>
      <div class="quick-stars-group" role="group" aria-label="ワンタッチ星評価">
        ${starsHtml}
      </div>
    </div>
  `;
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

function renderMovies() {
  const list = getFilteredMovies();
  const grid = document.getElementById("movies-grid");
  document.getElementById("results-count").textContent = `${list.length}本表示中（全${state.movies.length}本）`;
  updateWatchStatsSummary();

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty-state">条件に一致する映画がありません。フィルタを緩めてお試しください。</p>`;
    return;
  }

  grid.innerHTML = list
    .map((m) => {
      const w = state.watchMap[m.imdb_id];
      const isWatched = w?.status === "watched";
      const isWatchlist = w?.status === "watchlist";
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
  saveImpressionTagsCache(payload.imdb_id, payload.impression_tags);
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

  let { error } = await state.supabase.from("user_watch_status").upsert(payload);
  if (error && isMissingColumnError(error, "impression_tags")) {
    const fallbackPayload = { ...payload };
    delete fallbackPayload.impression_tags;
    const retryRes = await state.supabase.from("user_watch_status").upsert(fallbackPayload);
    error = retryRes.error;
  }

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
    impression_tags: prev.impression_tags || [],
    memo: prev.memo ? prev.memo : null,
    updated_at: new Date().toISOString(),
  };

  // Optimistic UI: 先にローカル状態を更新して即座に再描画
  state.watchMap[imdbId] = normalizeWatchEntry(payload);
  if (state.isDemo || !state.userEmail) {
    saveLocalWatchEntry(imdbId, payload);
  }
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

  if (mode === "local") {
    notifyLocalSaveOnce();
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
            ${jp.link ? `<p style="margin:8px 0 0;font-size:0.82rem"><a href="${escapeHtml(jp.link)}" target="_blank" rel="noopener noreferrer" style="color:var(--cyan-bright)">配信ページ（TMDB/JustWatch）を開く ↗</a></p>` : ""}
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

  const saveBtn = document.getElementById("save-watch-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      const ratingVal = document.getElementById("modal-rating").value;
      const payload = {
        imdb_id: imdbId,
        status: selectedStatus,
        my_rating: ratingVal ? Number(ratingVal) : null,
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

  const lines = [
    "あなたは私の映画の好みを深く理解するパーソナル映画キュレーターです。",
    "以下の「現在の視聴・評価履歴」と「現在の taste_profile.json」を分析し、",
    "1) 私の好みの傾向（刺さる演出・ジャンル・監督・避けがちな要素）の言語化",
    "2) 次に観るべきおすすめ作品の提案",
    "3) 更新版 web/taste_profile.json の提案（そのままコピペできるJSON形式）",
    "を出力してください。",
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
      renderMovies();
    });
  });

  document.getElementById("filter-query").addEventListener("input", () => {
    clearActivePreset();
    renderMovies();
  });

  document.getElementById("reset-filters-btn").addEventListener("click", () => {
    resetAllFilterControls();
    renderMovies();
  });

  document.querySelectorAll(".preset-btn[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyPreset(btn.dataset.preset);
    });
  });

  document.getElementById("gacha-btn").addEventListener("click", openGachaModal);
  document.getElementById("gacha-reroll-btn").addEventListener("click", drawGachaPicks);
  document.getElementById("copy-taste-btn").addEventListener("click", handleCopyTasteData);

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

    const card = e.target.closest(".movie-card");
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
