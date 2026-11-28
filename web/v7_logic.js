/* Core Cinema Archive - v7 純粋ロジックモジュール（ブラウザ & Node.js 両対応） */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.CoreCinemaLogic = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const VIBE_AXES = [
    { key: "pace", label: "テンポ", mode: "min", minHint: "静か", maxHint: "怒涛" },
    { key: "mind", label: "頭脳度", mode: "min", minHint: "気楽", maxHint: "考察" },
    { key: "immersion", label: "映像没入", mode: "min", minHint: "会話", maxHint: "大作" },
    { key: "heaviness", label: "重さ上限", mode: "max", minHint: "爽快", maxHint: "重厚" },
    { key: "family", label: "家族OK", mode: "family", minHint: "過激", maxHint: "安心" },
  ];

  const DEFAULT_VIBE_FILTER = {
    paceMin: 1,
    mindMin: 1,
    immersionMin: 1,
    heavinessMax: 5,
    familyOk: false,
  };

  function normalizeVibeScores(raw) {
    if (!raw || typeof raw !== "object") return null;
    const keys = ["pace", "mind", "immersion", "heaviness", "family"];
    const out = {};
    let validCount = 0;
    for (const k of keys) {
      const val = raw[k];
      if (val == null || val === "" || typeof val === "boolean") {
        out[k] = null;
        continue;
      }
      const n = Number(val);
      if (!Number.isFinite(n)) {
        out[k] = null;
        continue;
      }
      out[k] = Math.max(1, Math.min(5, Math.round(n)));
      validCount += 1;
    }
    return validCount === keys.length ? out : null;
  }

  function isVibeFilterActive(filter) {
    const f = filter || DEFAULT_VIBE_FILTER;
    return (
      Number(f.paceMin ?? 1) > 1 ||
      Number(f.mindMin ?? 1) > 1 ||
      Number(f.immersionMin ?? 1) > 1 ||
      Number(f.heavinessMax ?? 5) < 5 ||
      Boolean(f.familyOk)
    );
  }

  function matchesVibeFilter(movie, filter) {
    if (!isVibeFilterActive(filter)) {
      return true;
    }
    const scores = normalizeVibeScores(movie?.vibe_scores);
    if (!scores) {
      return false;
    }
    const f = filter || DEFAULT_VIBE_FILTER;
    if (scores.pace < Number(f.paceMin ?? 1)) return false;
    if (scores.mind < Number(f.mindMin ?? 1)) return false;
    if (scores.immersion < Number(f.immersionMin ?? 1)) return false;
    if (scores.heaviness > Number(f.heavinessMax ?? 5)) return false;
    if (f.familyOk && scores.family < 4) return false;
    return true;
  }

  function renderVibeStarText(score) {
    const n = Math.max(1, Math.min(5, Math.round(Number(score) || 0)));
    return "★".repeat(n) + "☆".repeat(5 - n);
  }

  function buildConstellationStarModel(movies, watchMap = {}, filteredIdSet = null, matchScoreMap = null) {
    const list = Array.isArray(movies) ? movies : [];
    const stars = [];
    let missingCount = 0;

    for (const m of list) {
      if (!m || !m.imdb_id) continue;
      const mx = m.map_x != null ? Number(m.map_x) : NaN;
      const my = m.map_y != null ? Number(m.map_y) : NaN;
      if (!Number.isFinite(mx) || !Number.isFinite(my)) {
        missingCount += 1;
        continue;
      }

      const w = watchMap?.[m.imdb_id];
      const rating = w?.my_rating != null ? Number(w.my_rating) : null;
      const status = w?.status || "unwatched";
      const isWatched = status === "watched" || rating != null;
      const isWatchlist = !isWatched && status === "watchlist";
      const isMatchesFilter = filteredIdSet ? filteredIdSet.has(m.imdb_id) : true;
      const matchScore = matchScoreMap && matchScoreMap.has(m.imdb_id)
        ? Number(matchScoreMap.get(m.imdb_id))
        : Number(m._matchScore ?? m.composite_score ?? 70);

      let category = "unwatched_dim";
      let baseRadius = 3.2;
      let labelPriority = 0;

      if (isWatched && rating === 5) {
        category = "rating5";
        baseRadius = 6.2;
        labelPriority = 100 + (w?.personal_rank ? Math.max(0, 50 - Number(w.personal_rank)) : 0);
      } else if (isWatched) {
        category = "watched";
        baseRadius = 3.8;
        labelPriority = 20 + (rating || 0);
      } else if (isWatchlist) {
        category = "watchlist";
        baseRadius = 4.6;
        labelPriority = 50 + matchScore * 0.1;
      } else if (isMatchesFilter) {
        category = "unwatched_bright";
        // マッチ度に応じてサイズスケール (3.0 〜 5.8)
        const clampedMatch = Math.max(40, Math.min(99, matchScore));
        baseRadius = 3.0 + ((clampedMatch - 40) / 59) * 2.8;
        labelPriority = 30 + matchScore * 0.2;
      } else {
        category = "unwatched_dim";
        baseRadius = 2.1;
        labelPriority = 0;
      }

      stars.push({
        movie: m,
        imdb_id: m.imdb_id,
        mapX: mx,
        mapY: my,
        category,
        baseRadius,
        matchScore: Math.round(matchScore),
        rating,
        isWatched,
        isWatchlist,
        isMatchesFilter,
        personalRank: w?.personal_rank != null ? Number(w.personal_rank) : null,
        labelPriority,
      });
    }

    return {
      stars,
      missingCount,
      totalCount: list.length,
    };
  }

  function mergeSimilarUnwatchedMovies(targetMovie, allMovies, watchMap, ruleBasedScorer, limit = 3) {
    if (!targetMovie) return [];
    const movieMap = new Map();
    for (const m of allMovies || []) {
      if (m && m.imdb_id) movieMap.set(m.imdb_id, m);
    }

    const isUnwatched = (cand) => {
      if (!cand || cand.imdb_id === targetMovie.imdb_id) return false;
      const w = watchMap?.[cand.imdb_id];
      return !(w && (w.status === "watched" || w.my_rating != null));
    };

    const picks = [];
    const pickedIds = new Set();

    const simIds = Array.isArray(targetMovie.similar_ids) ? targetMovie.similar_ids : [];
    for (const simId of simIds) {
      if (picks.length >= limit) break;
      const cleanId = String(simId || "").trim();
      if (!cleanId || pickedIds.has(cleanId)) continue;
      const cand = movieMap.get(cleanId);
      if (!isUnwatched(cand)) continue;
      picks.push({
        movie: cand,
        source: "embedding",
        reasonLabel: "AI類似度マッチ",
      });
      pickedIds.add(cleanId);
    }

    if (picks.length < limit && typeof ruleBasedScorer === "function") {
      const fallbackList = ruleBasedScorer(targetMovie, allMovies, watchMap, limit + pickedIds.size + 3) || [];
      for (const item of fallbackList) {
        if (picks.length >= limit) break;
        const cand = item?.movie;
        if (!cand || !cand.imdb_id || pickedIds.has(cand.imdb_id)) continue;
        if (!isUnwatched(cand)) continue;
        picks.push({
          ...item,
          source: "rule",
        });
        pickedIds.add(cand.imdb_id);
      }
    }

    return picks.slice(0, limit);
  }

  function isMovieMissingColumnError(error, columnName = null) {
    if (!error) return false;
    const code = String(error.code || "");
    const msg = String(error.message || "").toLowerCase();
    const details = String(error.details || "").toLowerCase();
    const isMissingPattern =
      code === "PGRST204" ||
      code === "42703" ||
      msg.includes("does not exist") ||
      msg.includes("schema cache") ||
      msg.includes("could not find");
    if (!isMissingPattern) return false;
    if (!columnName) return true;
    const target = columnName.toLowerCase();
    return msg.includes(target) || details.includes(target);
  }

  function normalizeSearchText(str) {
    return String(str ?? "")
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[・･\-\u2010-\u2015\u2212\u30fb\uff65\s_:;,.!?/\\()[\]「」『』【】〜~]+/g, "");
  }

  return {
    VIBE_AXES,
    DEFAULT_VIBE_FILTER,
    normalizeVibeScores,
    isVibeFilterActive,
    matchesVibeFilter,
    renderVibeStarText,
    buildConstellationStarModel,
    mergeSimilarUnwatchedMovies,
    isMovieMissingColumnError,
    normalizeSearchText,
  };
});
