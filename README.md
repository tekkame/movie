# Core Cinema Archive

1980年〜現在までの「規模を問わず本当に面白い映画（各年20本・約950本）」を自動抽出し、日本の動画配信サービス状況（U-NEXT、Prime Video、Netflix等）とあわせて検索・視聴管理できる個人用映画アーカイブです。

## 仕組み（月額0円・無料枠設計）

1. **一次候補抽出（無料）**：[IMDb 非商用データセット](https://help.imdb.com/article/imdb/general-information/can-i-use-imdb-data-in-my-software/G5JTRESSHJBBHTGX?ref_=helpart_nav_27)から1980年〜現在の長編映画（アニメーション映画含む・投票数下限クリア）を各年50本に絞り込み（実写のみにしたい場合は `--exclude-animation` で除外可能）。
2. **批評家・映画賞スコア取得**：[OMDb API](https://www.omdbapi.com/)で Metascore・Rotten Tomatoes・受賞歴を取得（未登録作品も含め Supabase の `omdb_cache` に保存するため、1日1,000件の無料枠を跨いで安全に初回構築可能）。
3. **年別20本ハイブリッド選出**：`批評家50% + 観客40% + 映画賞10%` で**総合TOP12**を確定し、残り**8本**を「ホラー・スリラー」「SF・アクション」「非英語圏」「犯罪・ミステリー・コメディ」の代表枠で自動補完。
4. **日本語・配信状況の自動同期**：[TMDB API](https://developer.themoviedb.org/docs/getting-started)で邦題・ポスター・背景画像・あらすじ・日本の配信状況を取得し、既存の `ai_summary` / `mood_tags` を保持したまま Supabase へ UPSERT。毎週日曜に GitHub Actions が自動実行（Supabase無料枠の7日停止も防止）。
5. **Web UI（ゼロビルド静的SPA）**：年代・公開年・ジャンル・日本の配信サービス（見放題絞り込み可）・選出枠・視聴ステータス・フリーワード＆ムードタグ検索に対応。
6. **Phase 2（任意）**：自宅PCのローカルLLM（Ollama等）から `pipeline/local_llm_enrich.py` を走らせると、ネタバレなし推薦文とムードタグを後から自動追加できます。

## 最短セットアップ手順（約10分）

1. **無料APIキーを2つ取得**
   - [OMDb API](https://www.omdbapi.com/)（Free: 1,000 req/day）
   - [TMDB API](https://developer.themoviedb.org/docs/getting-started)（無料アカウント → API Read Access Token）
2. **Supabase プロジェクト作成 & SQL実行**
   - `supabase/schema.sql` の `YOUR_EMAIL@example.com` を自分のメールアドレスに変更し、Supabase SQL Editor で実行。
3. **GitHub リポジトリへ Push & Secrets登録**
   - リポジトリの Settings → Secrets and variables → Actions に以下を登録：
     - `OMDB_API_KEY`
     - `TMDB_API_KEY`
     - `SUPABASE_URL`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `SUPABASE_ANON_KEY`（GitHub Pages 自動デプロイで `web/config.js` を生成するため）
4. **初回バックフィル実行**
   - GitHub Actions の `Sync Core Cinema Archive` → `Run workflow` → `mode: backfill` を実行（OMDb無料枠のため、1980年〜全件揃うまで1日1回×3日間クリックするだけで完了。直近年代から順に埋まります）。
5. **Webサイト公開（GitHub Pages 自動デプロイ対応）**
   - GitHub リポジトリの Settings → Pages → Source を **GitHub Actions** に設定すると、`.github/workflows/deploy_pages.yml` により `main` への push 時または手動実行時に `web/config.js` を自動生成して `./web` が公開されます（Secrets 未設定時は安全にデモモードで動作します）。
   - ローカル確認や他ホスティング利用時は `web/config.example.js` を `web/config.js` にコピーして `SUPABASE_URL` と `SUPABASE_ANON_KEY` を記入してください。
