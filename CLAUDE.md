# CLAUDE.md

このファイルは、リポジトリ内のコードを扱う際に Claude Code (claude.ai/code) へ提供するガイダンスです。

## プロジェクト概要

Supabase認証機能付きの不動産管理Webアプリ。
React + Vite で構成し、Supabase の Email/Password 認証を使用する。

リポジトリ: https://github.com/aki2228824/realestate-app

## 開発コマンド

```bash
npm install        # 依存パッケージのインストール
npm run dev        # 開発サーバー起動（http://localhost:5173）
npm run build      # 本番ビルド（dist/ に出力）
npm run preview    # ビルド結果のプレビュー
```

## アーキテクチャ

```
src/
├── main.jsx                  # エントリーポイント
├── App.jsx                   # ルーティング定義（BrowserRouter + Routes）
├── supabase.js               # Supabaseクライアント初期化（.envから接続情報を読み込む）
├── index.css                 # グローバルスタイルリセット
├── contexts/
│   └── AuthContext.jsx       # 認証状態のグローバル管理（user, loading, signIn, signUp, signOut）
├── components/
│   └── PrivateRoute.jsx      # 未ログイン時に /login へリダイレクトする保護コンポーネント
└── pages/
    ├── Login.jsx             # ログイン画面
    ├── Register.jsx          # 会員登録画面
    ├── Auth.module.css       # Login・Register 共通スタイル
    ├── Properties.jsx        # 物件一覧画面（ダミーデータ）
    └── Properties.module.css # 物件一覧スタイル
```

### 認証フロー

1. `AuthContext` が `supabase.auth.onAuthStateChange` でセッションを監視
2. `PrivateRoute` が `user` の有無を確認し、未認証なら `/login` にリダイレクト
3. ルーティングは `/ → /login`、`/login`、`/register`、`/properties`（保護）

### 環境変数

`.env` ファイルで管理し `.gitignore` に追加済み（コミット禁止）。

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Git 運用ルール

**コードを変更するたびに GitHub へプッシュすること。**

```bash
git add <変更したファイル>
git commit -m "<変更内容を説明するメッセージ>"
git push origin main
```

- コミットメッセージは変更内容が明確に伝わるように記述する。
- 無関係な変更を1つのコミットにまとめない。
- コミット後は即座にプッシュし、未プッシュのコミットを溜めない。
- `.env` は絶対にコミットしない。
