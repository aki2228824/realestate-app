# CLAUDE.md

このファイルは、リポジトリ内のコードを扱う際に Claude Code (claude.ai/code) へ提供するガイダンスです。

## プロジェクト概要

不動産アプリケーション — `realestate-app`
リポジトリ: https://github.com/aki2228824/realestate-app

## Git 運用ルール

**コードを変更するたびに GitHub へプッシュすること。**

機能追加・バグ修正・リファクタ・設定変更など、意味のある変更を行ったら必ず以下を実行する:

```bash
git add <変更したファイル>
git commit -m "<変更内容を説明するメッセージ>"
git push origin main
```

- コミットメッセージは変更内容が明確に伝わるように記述する。
- 無関係な変更を1つのコミットにまとめない。
- コミット後は即座にプッシュし、未プッシュのコミットを溜めない。
- リモート: `https://github.com/aki2228824/realestate-app`
- デフォルトブランチ: `main`
