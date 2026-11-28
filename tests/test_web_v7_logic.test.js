const test = require("node:test");
const assert = require("node:assert/strict");
const logic = require("../web/v7_logic.js");

test("vibe filter inactive includes movies with null vibe_scores", () => {
  const movieNoVibe = { imdb_id: "tt1", vibe_scores: null };
  assert.equal(logic.isVibeFilterActive(logic.DEFAULT_VIBE_FILTER), false);
  assert.equal(logic.matchesVibeFilter(movieNoVibe, logic.DEFAULT_VIBE_FILTER), true);
});

test("vibe filter active excludes movies with null vibe_scores and checks thresholds", () => {
  const filter = {
    paceMin: 4,
    mindMin: 1,
    immersionMin: 1,
    heavinessMax: 3,
    familyOk: true,
  };
  assert.equal(logic.isVibeFilterActive(filter), true);
  assert.equal(logic.matchesVibeFilter({ imdb_id: "tt_null", vibe_scores: null }, filter), false);
  assert.equal(
    logic.matchesVibeFilter(
      { imdb_id: "tt_pass", vibe_scores: { pace: 4, mind: 2, immersion: 3, heaviness: 3, family: 4 } },
      filter
    ),
    true
  );
  assert.equal(
    logic.matchesVibeFilter(
      { imdb_id: "tt_fail_family", vibe_scores: { pace: 5, mind: 2, immersion: 5, heaviness: 2, family: 3 } },
      filter
    ),
    false
  );
  assert.equal(
    logic.matchesVibeFilter(
      { imdb_id: "tt_fail_heavy", vibe_scores: { pace: 5, mind: 2, immersion: 5, heaviness: 4, family: 5 } },
      filter
    ),
    false
  );
});

test("renderVibeStarText formats 1-5 stars", () => {
  assert.equal(logic.renderVibeStarText(4), "★★★★☆");
  assert.equal(logic.renderVibeStarText(1), "★☆☆☆☆");
  assert.equal(logic.renderVibeStarText(8), "★★★★★");
});

test("buildConstellationStarModel categorizes stars and skips missing coordinates", () => {
  const movies = [
    { imdb_id: "tt5", title_ja: "最高", map_x: 10, map_y: 20, composite_score: 90 },
    { imdb_id: "tt3", title_ja: "既見", map_x: 30, map_y: 40, composite_score: 80 },
    { imdb_id: "ttwl", title_ja: "観たい", map_x: 50, map_y: 60, composite_score: 85 },
    { imdb_id: "ttub", title_ja: "候補", map_x: 70, map_y: 80, composite_score: 75 },
    { imdb_id: "ttud", title_ja: "対象外", map_x: 85, map_y: 90, composite_score: 70 },
    { imdb_id: "ttnone", title_ja: "座標なし", map_x: null, map_y: null, composite_score: 88 },
  ];
  const watchMap = {
    tt5: { status: "watched", my_rating: 5, personal_rank: 1 },
    tt3: { status: "watched", my_rating: 3 },
    ttwl: { status: "watchlist" },
  };
  const filteredSet = new Set(["tt5", "tt3", "ttwl", "ttub"]);
  const matchMap = new Map([
    ["ttub", 94],
    ["ttud", 55],
  ]);

  const model = logic.buildConstellationStarModel(movies, watchMap, filteredSet, matchMap);
  assert.equal(model.totalCount, 6);
  assert.equal(model.missingCount, 1);
  assert.equal(model.stars.length, 5);

  const byId = Object.fromEntries(model.stars.map((s) => [s.imdb_id, s]));
  assert.equal(byId.tt5.category, "rating5");
  assert.equal(byId.tt3.category, "watched");
  assert.equal(byId.ttwl.category, "watchlist");
  assert.equal(byId.ttub.category, "unwatched_bright");
  assert.equal(byId.ttud.category, "unwatched_dim");
  assert.ok(byId.ttub.baseRadius > byId.ttud.baseRadius);
});

test("mergeSimilarUnwatchedMovies prioritizes unwatched similar_ids then fills with rule-based", () => {
  const target = {
    imdb_id: "tt0",
    similar_ids: ["tt_watched", "tt_sim1", "tt_sim2"],
  };
  const allMovies = [
    target,
    { imdb_id: "tt_watched", title_ja: "Watched" },
    { imdb_id: "tt_sim1", title_ja: "Sim1" },
    { imdb_id: "tt_sim2", title_ja: "Sim2" },
    { imdb_id: "tt_rule1", title_ja: "Rule1" },
    { imdb_id: "tt_rule2", title_ja: "Rule2" },
  ];
  const watchMap = {
    tt_watched: { status: "watched", my_rating: 4 },
  };
  const ruleScorer = () => [
    { movie: allMovies[2], simScore: 99, matchScore: 80, reasonLabel: "Sci-Fi" }, // duplicate tt_sim1
    { movie: allMovies[4], simScore: 70, matchScore: 85, reasonLabel: "Thriller" },
    { movie: allMovies[5], simScore: 60, matchScore: 75, reasonLabel: "Drama" },
  ];

  const merged = logic.mergeSimilarUnwatchedMovies(target, allMovies, watchMap, ruleScorer, 3);
  assert.deepEqual(
    merged.map((x) => x.movie.imdb_id),
    ["tt_sim1", "tt_sim2", "tt_rule1"]
  );
  assert.equal(merged[0].source, "embedding");
  assert.equal(merged[2].source, "rule");
});

test("normalizeSearchText normalizes NFKC, case, middle dots, hyphens, and spaces", () => {
  const targetTitle = logic.normalizeSearchText("ブルース･ブラザーズ");
  assert.equal(targetTitle, "ブルースブラザーズ");
  assert.ok(targetTitle.includes(logic.normalizeSearchText("ブルース・ブラザーズ")));
  assert.ok(targetTitle.includes(logic.normalizeSearchText("ブルース･ブラザーズ")));
  assert.ok(targetTitle.includes(logic.normalizeSearchText("ブルースブラザーズ")));
  assert.ok(targetTitle.includes(logic.normalizeSearchText("ﾌﾞﾙｰｽ･ﾌﾞﾗｻﾞｰｽﾞ")));
  assert.equal(
    logic.normalizeSearchText("スパイダーマン：アクロス・ザ・スパイダーバース"),
    logic.normalizeSearchText("スパイダーマン:アクロス･ザ･スパイダーバース")
  );
  assert.equal(logic.normalizeSearchText("Se7en / ｾﾌﾞﾝ"), "se7enセブン");
  assert.equal(logic.normalizeSearchText(null), "");
});
