/* Core Cinema Archive - フロントエンドロジック（ゼロビルド静的SPA） */

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
    jp_providers: {
      flatrate: ["U-NEXT"],
      rent: ["Amazon Prime Video", "Apple TV"],
      buy: ["Apple TV"],
      link: "https://www.justwatch.com/jp",
    },
    overview_ja:
      "双子の兄弟が故郷でダンスホールを開こうとした夜、音楽と恐怖が交錯するサバイバルを描くライアン・クーグラー監督のオリジナル作。",
    ai_summary: "ブルースの熱量とゴシックホラーが凄まじい密度で融合した快作。音響設計と緊張感の緩急が抜群で、ジャンル映画の枠を超えた没入感がある。",
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
    jp_providers: {
      flatrate: ["U-NEXT", "Amazon Prime Video", "Netflix"],
      rent: ["Apple TV"],
      buy: [],
      link: "https://www.justwatch.com/jp",
    },
    overview_ja:
      "半地下で暮らす貧しい家族が、高台の豪邸に住む裕福な一家に次々と入り込んでいくブラック・スリラー。",
    ai_summary: "社会風刺と予測不能なサスペンスが完璧なテンポで噛み合う現代の傑作。笑いと戦慄が瞬時に反転する脚本の切れ味が圧巻。",
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
    jp_providers: {
      flatrate: ["U-NEXT", "Netflix"],
      rent: ["Amazon Prime Video"],
      buy: [],
      link: "https://www.justwatch.com/jp",
    },
    overview_ja:
      "世界各地に突如現れた巨大な宇宙船。言語学者ルイーズが異星人の文字解読に挑む知的なSFドラマ。",
    ai_summary: "異星人との対話を「言語学」から描く静謐で知的なSF。終盤の視点転換によって物語全体の意味が深く胸に迫る。",
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
    jp_providers: {
      flatrate: [],
      rent: [],
      buy: [],
      link: "https://www.justwatch.com/jp",
    },
    overview_ja:
      "不思議な異世界に迷い込んだ少女・千尋が、八百万の神々が集う油屋で働きながら成長し元の世界へ戻る道を探す。",
    ai_summary: "圧倒的なイマジネーションと緻密な生活描写が同居するアニメ映画の金字塔。久石譲の音楽とノスタルジックな色彩が忘れがたい。",
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
    jp_providers: {
      flatrate: ["U-NEXT", "Netflix", "Amazon Prime Video"],
      rent: ["Apple TV"],
      buy: [],
      link: "https://www.justwatch.com/jp",
    },
    overview_ja:
      "新たなスパイダーマンとなった少年マイルスが、別次元から集まった仲間たちと共に巨大な危機へ立ち向かう。",
    ai_summary: "コミックの質感と最新CGを融合させた革新的なアニメーション表現に目を奪われる。王道ヒーロー映画としての熱さも最高峰。",
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
    jp_providers: {
      flatrate: ["U-NEXT"],
      rent: ["Amazon Prime Video", "Apple TV"],
      buy: [],
      link: "https://www.justwatch.com/jp",
    },
    overview_ja:
      "退職間際のベテラン刑事と血気盛んな新人刑事が、七つの大罪になぞらえた連続猟奇事件を追う。",
    ai_summary: "降り続く雨と退廃的な街並みが不穏さを極限まで高める暗黒サスペンス。ラストまで一切の妥協がない展開は圧巻。",
    mood_tags: ["重厚サスペンス", "衝撃の結末", "ダークノワール"],
  },
];

const state = {
  supabase: null,
  isDemo: true,
  user: null,
  movies: [],
  watchMap: {}, // imdb_id -> { status, my_rating, memo }
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

function loadDemoWatchMap() {
  try {
    return JSON.parse(localStorage.getItem("core_cinema_demo_watch") || "{}");
  } catch {
    return {};
  }
}

function saveDemoWatchMap() {
  localStorage.setItem("core_cinema_demo_watch", JSON.stringify(state.watchMap));
}

function activateDemoMode(customMessageHtml = null) {
  state.isDemo = true;
  state.movies = DEMO_MOVIES;
  state.watchMap = loadDemoWatchMap();
  const banner = document.getElementById("demo-banner");
  if (customMessageHtml) {
    banner.innerHTML = `<span>${customMessageHtml}</span>`;
  }
  banner.classList.remove("hidden");
}

async function initApp() {
  const cfg = getConfig();
  if (cfg && window.supabase) {
    state.supabase = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    state.isDemo = false;

    const { data: sessionData } = await state.supabase.auth.getSession();
    state.user = sessionData?.session?.user || null;
    state.supabase.auth.onAuthStateChange((_event, session) => {
      state.user = session?.user || null;
      updateAuthUI();
    });

    await loadSupabaseData();
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
  for (const row of watchRes.data || []) {
    state.watchMap[row.imdb_id] = row;
  }
}

function updateAuthUI() {
  const badge = document.getElementById("auth-status-badge");
  const btn = document.getElementById("auth-btn");
  if (state.isDemo) {
    badge.textContent = "デモ保存（ブラウザ）";
    btn.textContent = "Supabase未接続";
    btn.disabled = true;
    return;
  }
  btn.disabled = false;
  if (state.user) {
    badge.textContent = `ログイン中: ${state.user.email}`;
    badge.className = "badge badge-flatrate";
    btn.textContent = "ログアウト";
  } else {
    badge.textContent = "閲覧モード";
    badge.className = "badge badge-muted";
    btn.textContent = "🔒 記録用ログイン";
  }
}

function populateYearFilter() {
  const select = document.getElementById("filter-year");
  const years = [...new Set(state.movies.map((m) => m.release_year))].sort((a, b) => b - a);
  select.innerHTML = `<option value="all">すべての年</option>` + years.map((y) => `<option value="${y}">${y}年</option>`).join("");
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

function getFilteredMovies() {
  const decade = document.getElementById("filter-decade").value;
  const year = document.getElementById("filter-year").value;
  const provider = document.getElementById("filter-provider").value;
  const slot = document.getElementById("filter-slot").value;
  const genre = document.getElementById("filter-genre").value;
  const watch = document.getElementById("filter-watch").value;
  const flatrateOnly = document.getElementById("filter-flatrate-only").checked;
  const query = document.getElementById("filter-query").value.trim().toLowerCase();
  const sort = document.getElementById("filter-sort").value;

  const filtered = state.movies.filter((m) => {
    if (decade !== "all") {
      const start = parseInt(decade.slice(0, 4), 10);
      if (m.release_year < start || m.release_year > start + 9) return false;
    }
    if (year !== "all" && String(m.release_year) !== year) return false;
    if (slot !== "all" && m.selection_slot !== slot) return false;
    if (genre !== "all" && !(m.genres || []).includes(genre)) return false;

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

  filtered.sort((a, b) => {
    if (sort === "score_desc") return (b.composite_score || 0) - (a.composite_score || 0);
    if (sort === "imdb_desc") return (b.imdb_rating || 0) - (a.imdb_rating || 0);
    if (sort === "meta_desc") return (b.metascore || 0) - (a.metascore || 0);
    if (b.release_year !== a.release_year) return b.release_year - a.release_year;
    return (a.year_rank || 99) - (b.year_rank || 99);
  });

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

function renderMovies() {
  const list = getFilteredMovies();
  const grid = document.getElementById("movies-grid");
  document.getElementById("results-count").textContent = `${list.length}本表示中（全${state.movies.length}本）`;

  if (list.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-muted)">条件に一致する映画がありません。フィルタを緩めてお試しください。</p>`;
    return;
  }

  grid.innerHTML = list
    .map((m) => {
      const w = state.watchMap[m.imdb_id];
      const isWatched = w?.status === "watched";
      const flatrate = (m.jp_providers?.flatrate || []).slice(0, 2);
      const slotClass = m.selection_slot === "top12" ? "slot-top12" : "slot-genre";
      const statusBadge =
        w?.status === "watched"
          ? `<span class="badge badge-status">視聴済み${w.my_rating ? ` ★${w.my_rating}` : ""}</span>`
          : w?.status === "watchlist"
            ? `<span class="badge badge-status">観たい</span>`
            : "";

      return `
        <article class="movie-card ${isWatched ? "is-watched" : ""}" data-imdb-id="${escapeHtml(m.imdb_id)}">
          <div class="poster-wrap">
            ${
              m.poster_url
                ? `<img src="${escapeHtml(m.poster_url)}" alt="${escapeHtml(m.title_ja)}" loading="lazy" />`
                : `<div class="poster-fallback"><strong>${escapeHtml(m.title_ja)}</strong><span>${escapeHtml(m.title_en)}</span></div>`
            }
            <span class="score-pill">${Number(m.composite_score).toFixed(1)}点</span>
            <span class="slot-pill ${slotClass}">${escapeHtml(m.selection_category)}</span>
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span>${m.release_year}年 #${m.year_rank}</span>
              <span>${m.runtime_minutes ? `${m.runtime_minutes}分` : ""}</span>
            </div>
            <h2 class="card-title">${escapeHtml(m.title_ja)}</h2>
            <div class="card-en">${escapeHtml(m.title_en)}</div>
            <div class="metrics-row">
              <span class="metric-chip">IMDb ${m.imdb_rating ?? "-"}</span>
              ${m.metascore != null ? `<span class="metric-chip">Meta ${m.metascore}</span>` : ""}
              ${m.rt_score != null ? `<span class="metric-chip">RT ${m.rt_score}%</span>` : ""}
            </div>
            ${renderMoodTags(m.mood_tags, 3)}
            <div class="providers-row">
              ${flatrate.map((p) => `<span class="badge badge-flatrate">${escapeHtml(p)}</span>`).join("")}
              ${statusBadge}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function openMovieModal(imdbId) {
  const m = state.movies.find((x) => x.imdb_id === imdbId);
  if (!m) return;
  const w = state.watchMap[imdbId] || { status: "unwatched", my_rating: "", memo: "" };
  const jp = m.jp_providers || { flatrate: [], rent: [], buy: [], link: null };
  const canWrite = state.isDemo || Boolean(state.user);

  const modal = document.getElementById("movie-modal");
  const hasBackdrop = Boolean(m.backdrop_url);
  const backdropBanner = hasBackdrop
    ? `<div class="modal-backdrop-banner" style="background-image:url('${escapeHtml(m.backdrop_url)}')"><button type="button" class="icon-close" data-close-modal="movie-modal">✕</button></div>`
    : "";

  document.getElementById("modal-body").innerHTML = `
    ${backdropBanner}
    <div style="${hasBackdrop ? "padding:16px 20px 20px" : ""}">
      <div class="modal-header">
        <div>
          <h2>${escapeHtml(m.title_ja)} <span style="color:var(--text-muted);font-size:0.9rem">(${m.release_year})</span></h2>
          <div class="card-en">${escapeHtml(m.title_en)} ｜ 監督: ${escapeHtml(m.director || "不明")}</div>
        </div>
        ${hasBackdrop ? "" : `<button type="button" class="icon-close" data-close-modal="movie-modal">✕</button>`}
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
            <p style="margin:0;font-size:0.88rem;color:var(--text-muted)">${escapeHtml(m.overview_ja || "日本語あらすじ未登録")}</p>
          </div>

          <div class="detail-section">
            <h3>日本の配信状況</h3>
            <div class="providers-row">
              ${(jp.flatrate || []).map((p) => `<span class="badge badge-flatrate">見放題: ${escapeHtml(p)}</span>`).join("")}
              ${(jp.rent || []).map((p) => `<span class="badge badge-rent">レンタル: ${escapeHtml(p)}</span>`).join("")}
              ${!jp.flatrate?.length && !jp.rent?.length ? `<span class="badge badge-muted">現在配信情報なし</span>` : ""}
            </div>
            ${jp.link ? `<p style="margin:8px 0 0;font-size:0.82rem"><a href="${escapeHtml(jp.link)}" target="_blank" rel="noopener noreferrer" style="color:var(--teal)">配信ページ（TMDB/JustWatch）を開く ↗</a></p>` : ""}
          </div>
        </div>
      </div>

      <div class="watch-controls">
        <strong>視聴ステータス・自分メモ ${canWrite ? "" : "（保存するには右上からログインしてください）"}</strong>
        <div class="status-buttons">
          <button type="button" class="btn btn-secondary ${w.status === "unwatched" ? "active" : ""}" data-status="unwatched" ${canWrite ? "" : "disabled"}>未視聴</button>
          <button type="button" class="btn btn-secondary ${w.status === "watchlist" ? "active" : ""}" data-status="watchlist" ${canWrite ? "" : "disabled"}>観たい</button>
          <button type="button" class="btn btn-secondary ${w.status === "watched" ? "active" : ""}" data-status="watched" ${canWrite ? "" : "disabled"}>視聴済み</button>
          <select id="modal-rating" style="width:auto" ${canWrite ? "" : "disabled"}>
            <option value="">自分評価なし</option>
            ${[5, 4, 3, 2, 1].map((n) => `<option value="${n}" ${Number(w.my_rating) === n ? "selected" : ""}>★${n}</option>`).join("")}
          </select>
        </div>
        <textarea id="modal-memo" rows="2" placeholder="感想やメモ..." ${canWrite ? "" : "disabled"}>${escapeHtml(w.memo || "")}</textarea>
        ${canWrite ? `<div><button id="save-watch-btn" type="button" class="btn btn-primary" data-imdb-id="${escapeHtml(imdbId)}">記録を保存</button></div>` : ""}
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

  const saveBtn = document.getElementById("save-watch-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      const ratingVal = document.getElementById("modal-rating").value;
      const payload = {
        imdb_id: imdbId,
        status: selectedStatus,
        my_rating: ratingVal ? Number(ratingVal) : null,
        memo: document.getElementById("modal-memo").value.trim() || null,
        updated_at: new Date().toISOString(),
      };

      if (state.isDemo) {
        state.watchMap[imdbId] = payload;
        saveDemoWatchMap();
      } else {
        const { error } = await state.supabase.from("user_watch_status").upsert(payload);
        if (error) {
          alert(`保存エラー: ${error.message}`);
          return;
        }
        state.watchMap[imdbId] = payload;
      }
      modal.close();
      renderMovies();
    });
  }

  modal.showModal();
}

function bindEvents() {
  [
    "filter-decade",
    "filter-year",
    "filter-provider",
    "filter-slot",
    "filter-genre",
    "filter-watch",
    "filter-flatrate-only",
    "filter-sort",
  ].forEach((id) => {
    document.getElementById(id).addEventListener("change", renderMovies);
  });

  document.getElementById("filter-query").addEventListener("input", renderMovies);

  document.getElementById("reset-filters-btn").addEventListener("click", () => {
    document.getElementById("filter-decade").value = "all";
    document.getElementById("filter-year").value = "all";
    document.getElementById("filter-provider").value = "all";
    document.getElementById("filter-slot").value = "all";
    document.getElementById("filter-genre").value = "all";
    document.getElementById("filter-watch").value = "all";
    document.getElementById("filter-flatrate-only").checked = false;
    document.getElementById("filter-query").value = "";
    document.getElementById("filter-sort").value = "year_desc";
    renderMovies();
  });

  document.getElementById("movies-grid").addEventListener("click", (e) => {
    const tagBtn = e.target.closest("[data-mood-tag]");
    if (tagBtn) {
      e.stopPropagation();
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
      document.getElementById("filter-query").value = tagBtn.dataset.moodTag;
      document.getElementById("movie-modal").close();
      renderMovies();
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
    document.getElementById("auth-message").textContent = "";
    document.getElementById("auth-modal").showModal();
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
