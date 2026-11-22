-- ============================================================================
-- Core Cinema Archive - Supabase PostgreSQL Schema
-- ============================================================================
-- セットアップ手順:
-- 1. Supabase ダッシュボードの「SQL Editor」を開く
-- 2. 下部の `YOUR_EMAIL@example.com` をご自身のログイン用メールアドレスに書き換える
-- 3. このSQL全体を実行する
-- ============================================================================

-- 1. 映画マスターテーブル（GitHub Actions のバッチが自動更新）
CREATE TABLE IF NOT EXISTS public.movies (
  imdb_id            TEXT PRIMARY KEY,
  tmdb_id            INTEGER,
  release_year       INTEGER NOT NULL,
  year_rank          INTEGER NOT NULL,
  title_ja           TEXT NOT NULL,
  title_en           TEXT NOT NULL,
  original_title     TEXT,
  original_language  TEXT,
  poster_url         TEXT,
  backdrop_url       TEXT,
  runtime_minutes    INTEGER,
  genres             TEXT[] NOT NULL DEFAULT '{}',
  director           TEXT,
  selection_slot     TEXT NOT NULL CHECK (selection_slot IN ('top12', 'genre_pick')),
  selection_category TEXT NOT NULL,
  composite_score    NUMERIC(5, 2) NOT NULL,
  imdb_rating        NUMERIC(3, 1),
  imdb_votes         INTEGER,
  metascore          INTEGER,
  rt_score           INTEGER,
  awards_text        TEXT,
  awards_bonus       NUMERIC(4, 1) NOT NULL DEFAULT 0,
  jp_providers       JSONB NOT NULL DEFAULT '{"flatrate": [], "rent": [], "buy": [], "link": null}'::jsonb,
  overview_ja        TEXT,
  -- Phase 2: 自宅PCのローカルLLMが後から同期するカラム（Phase 1ではNULL）
  ai_summary         TEXT,
  mood_tags          TEXT[] DEFAULT '{}',
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_movies_year_rank
  ON public.movies (release_year DESC, year_rank ASC);

CREATE INDEX IF NOT EXISTS idx_movies_composite_score
  ON public.movies (composite_score DESC);

CREATE INDEX IF NOT EXISTS idx_movies_selection_slot
  ON public.movies (selection_slot);

CREATE INDEX IF NOT EXISTS idx_movies_genres_gin
  ON public.movies USING GIN (genres);

CREATE INDEX IF NOT EXISTS idx_movies_jp_providers_gin
  ON public.movies USING GIN (jp_providers);

-- 2. OMDb API キャッシュテーブル（無料枠1日1,000件制限を跨いで安全に初回構築するため）
CREATE TABLE IF NOT EXISTS public.omdb_cache (
  imdb_id      TEXT PRIMARY KEY,
  metascore    INTEGER,
  rt_score     INTEGER,
  awards_text  TEXT,
  director     TEXT,
  country      TEXT,
  language     TEXT,
  fetched_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. 視聴ステータス・個人評価テーブル（フロントエンドから自分だけが更新）
CREATE TABLE IF NOT EXISTS public.user_watch_status (
  imdb_id     TEXT PRIMARY KEY REFERENCES public.movies(imdb_id) ON DELETE CASCADE,
  status      TEXT NOT NULL DEFAULT 'unwatched' CHECK (status IN ('unwatched', 'watchlist', 'watched')),
  my_rating   SMALLINT CHECK (my_rating IS NULL OR (my_rating >= 1 AND my_rating <= 5)),
  memo        TEXT,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Row Level Security (RLS) 設定
-- ・閲覧: ログイン不要で誰でも可能（URL限定公開の個人サイト向け）
-- ・書き込み: 指定したオーナーのメールアドレスでログイン時のみ許可
-- ============================================================================

ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.omdb_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_watch_status ENABLE ROW LEVEL SECURITY;

-- movies: 誰でも閲覧可（更新はGitHub Actionsのservice_roleキーで行う）
DROP POLICY IF EXISTS "movies_public_read" ON public.movies;
CREATE POLICY "movies_public_read"
  ON public.movies
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- omdb_cache: service_roleのみ利用（RLS有効・ポリシーなし＝外部非公開）

-- user_watch_status: 閲覧はオープン、書き込みはオーナー1アカウントのみ
DROP POLICY IF EXISTS "watch_status_public_read" ON public.user_watch_status;
CREATE POLICY "watch_status_public_read"
  ON public.user_watch_status
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ▼▼▼ ここをご自身のメールアドレスに変更してください ▼▼▼
DROP POLICY IF EXISTS "watch_status_owner_write" ON public.user_watch_status;
CREATE POLICY "watch_status_owner_write"
  ON public.user_watch_status
  FOR ALL
  TO authenticated
  USING (LOWER(auth.jwt() ->> 'email') = LOWER('tekkame@gmail.com'))
  WITH CHECK (LOWER(auth.jwt() ->> 'email') = LOWER('tekkame@gmail.com'));

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT SELECT ON public.movies TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_watch_status TO anon, authenticated;
GRANT ALL ON public.movies, public.omdb_cache, public.user_watch_status TO service_role;
