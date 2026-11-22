# Antigravity / ローカルエージェント向け 引き継ぎ手順書

このZIP内のコード一式は、DBスキーマ・Python自動収集パイプライン・単体テスト・GitHub Actions・Webフロントエンドまで実装・構文検証済みです。
AIサンドボックス環境からは外部インターネット通信・APIキー発行・クラウドアカウント操作ができないため、以下の**残作業のみ**を実行してください。

## 完了済み（そのまま利用可能）
- `supabase/schema.sql`（`movies`, `omdb_cache`, `user_watch_status`, RLSポリシー）
- `pipeline/scoring.py`（批評家50%＋観客40%＋映画賞10%、各年総合12＋ジャンル代表8選出）
- `pipeline/fetch_and_sync.py`（IMDb TSV → OMDbキャッシュ付き取得〔未登録も空キャッシュ保存〕→ TMDB日本語＆日本配信取得 → 既存 `ai_summary`/`mood_tags` 保持UPSERT。アニメ映画をデフォルト選出対象に含み、`--exclude-animation` で除外可）
- `pipeline/local_llm_enrich.py`（Phase 2用・Ollama等ローカルLLMからの後追い解説同期）
- `.github/workflows/sync_movies.yml`（毎週日曜自動更新＋手動バックフィル）
- `.github/workflows/deploy_pages.yml`（`main` push / 手動実行で `web/config.js` を Secrets/Variables から動的生成し GitHub Pages へ自動デプロイ）
- `web/`（ゼロビルド静的SPA：年代・年・ジャンル・U-NEXT等配信サービス・選出枠・視聴状態フィルタ＋ムードタグ検索＋詳細モーダル背景画像対応＋1,000件超ページネーション取得＋Magic Linkログイン）
- `tests/`（`test_scoring.py` ＋ `test_fetch_and_sync.py` 単体テスト全件パス済み）

## ローカル／Antigravity側で実施する残作業
1. **外部APIキー＆Supabase準備（ユーザー操作またはブラウザ操作）**
   - OMDb APIキー（無料枠）、TMDB APIキー（無料）、Supabaseプロジェクト（URL / `anon`キー / `service_role`キー）を用意。
   - `supabase/schema.sql` の `YOUR_EMAIL@example.com` をオーナーのメールアドレスに書き換えて Supabase SQL Editor で実行。
2. **ローカルでの1年分ドライラン検証**
   ```bash
   python3 -m venv .venv && source .venv/bin/activate
   pip install -r pipeline/requirements.txt
   cp .env.example .env  # APIキーを記入
   python pipeline/fetch_and_sync.py --mode backfill --start-year 2025 --end-year 2025 --dry-run
   ```
   ※出力された2025年20本に『罪人たち』等の傑作が意図通り入っているか確認し、必要なら `pipeline/scoring.py` の重み・枠数を微調整。
3. **本番初回同期（2025年〜遡って登録）**
   ```bash
   python pipeline/fetch_and_sync.py --mode backfill --max-omdb-calls 900
   ```
   ※OMDb無料枠は1日1,000件のため、1980年〜現在すべて埋めるには1日1回×3日実行（途中結果は `omdb_cache` に保存されるため重複消費なし）。
4. **GitHubリポジトリ設定 & Secrets登録**
   - `main` ブランチへ push し、`OMDB_API_KEY`, `TMDB_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY` を Actions Secrets（または `SUPABASE_URL`/`SUPABASE_ANON_KEY` を Variables）へ登録。
   - Settings → Pages → Source を **GitHub Actions** に変更すると `.github/workflows/deploy_pages.yml` で自動公開されます。
5. **フロントエンド設定（ローカル確認・他ホスティング時） & Auth設定**
   - ローカル確認や Vercel / Cloudflare Pages 利用時は `web/config.example.js` を `web/config.js` にコピーして `SUPABASE_URL` / `SUPABASE_ANON_KEY` を記入。
   - Supabase Authentication → URL Configuration の Site URL / Redirect URLs にデプロイ先URL（GitHub Pages URL 等）を追加。
6. **（任意・Phase 2）自宅PCローカルLLMでの解説補完**
   - Ollama等でモデルを起動し、`python pipeline/local_llm_enrich.py --limit 50` を実行。
