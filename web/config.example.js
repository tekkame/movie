// ============================================================================
// Core Cinema Archive - フロントエンド接続設定
// ============================================================================
// 1. このファイルを `config.js` にコピーしてください（例: cp web/config.example.js web/config.js）
// 2. Supabase ダッシュボード → Project Settings → API から URL と anon key を転記してください
//    ※ anon key はブラウザ公開前提のキーです（書き込みはRLSでオーナー1人に制限されます）
// ============================================================================

window.CORE_CINEMA_CONFIG = {
  SUPABASE_URL: "https://YOUR_PROJECT_REF.supabase.co",
  SUPABASE_ANON_KEY: "YOUR_SUPABASE_ANON_KEY",
};
