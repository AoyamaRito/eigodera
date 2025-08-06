# 英語の駆け込み寺

TOEIC 400点で困っている方のための英語学習プラットフォーム

## セットアップ

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定

`.env` ファイルを作成し、以下の内容を設定：

```env
# Gemini API設定
GEMINI_API_KEY=your_actual_api_key_here
GEMINI_MODEL_NAME=gemini-2.5-flash
```

### 3. 開発サーバーの起動
```bash
npm run dev
```

### 4. 本番ビルド
```bash
npm run build
```

## テストモード

Gemini APIが利用できない場合は、テストモードで動作確認ができます：

```
/lesson/writing?lesson=1&test=true
```

## デプロイ（Railway）

1. Railway ダッシュボードで環境変数を設定
   - `GEMINI_API_KEY`: Gemini APIキー
   - `GEMINI_MODEL_NAME`: gemini-2.5-flash

2. デプロイは自動的に実行されます

## トラブルシューティング

### APIエラーが発生する場合

1. `/test` ページにアクセスして診断情報を確認
2. コンソールログでエラーの詳細を確認
3. 環境変数が正しく設定されているか確認

### アイコンが表示されない場合

- `/public/icon/` ディレクトリにアイコンファイルが存在するか確認
- ファイル名が正しいか確認（日本語ファイル名含む）