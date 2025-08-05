# 🔥 一ファイル革命 - AI性能を100%引き出す方法 (Ver. 2.0)

## 🎲 プロジェクト概要：Fake Gods - AI英語学習アプリ
**Fake Gods**は、令嬢キャラクター「七条京子」と学ぶAI英語学習アプリです。Gemini APIを活用し、ゲーム感覚で英語力を向上させます。

### 現在の開発状況
- **実装済み機能**: 
  - 認証システム（マジックリンク認証）
  - 英語学習ゲーム（タップゲーム2種）
    - テキストベース英語学習ゲーム（英単語・イディオムの活用練習）
    - タップアルファベットゲーム（VOA Special English単語のスペル練習）
  - 令嬢キャラクターによる音声フィードバック
- **今後の拡張予定**: 新しい学習モード、進捗管理、レベルシステム等

---

## 🚀 AI-First開発哲学
**人間がコードを書く時代は終わった。AIが主体、人間は指示者。**

### 開発の最優先事項
- **AIの作業効率 > 人間の美意識**
- **重複歓迎 > DRY原則**
- **独立性 > 統一性**
- **シンプル > エレガント**
- **並列処理 > 逐次処理**

---

## 🎯 AI-First開発原則 Ver. 2.0

### 1. 完全自己完結主義
- **1ファイル = 1つの完全な機能**。AIが1ファイル読むだけで全てを理解できることが絶対条件です。
- **外部インポートは絶対最小限**（フレームワーク標準のみ）。
- **utils関数禁止** → 必要な関数は各ファイルにコピーします。**重複は正義**です。
- **カスタムhooks禁止** → ファイル内関数として実装します。
- **外部状態管理禁止** → ファイル内`useState`/`useReducer`で完結させます。

### 2. 設計パターン：関数クロージャ方式 (NEW)
1ファイル完結の思想をスケールさせ、モジュール間の依存関係を明確にするため、**関数クロージャ（Function Closure）方式**を標準設計パターンとして採用します。

- **基本構造**: 各機能モジュールは、ルーターやコンポーネント群を返す**単一の関数**として定義します（例: `createAuthRouter`）。
- **依存性の注入**: この関数は、引数としてそのモジュールが必要とする全ての外部依存関係（`db`オブジェクト、設定値など）を受け取ります。
- **AIのメリット**:
    - **依存関係の明確化**: 関数の引数を見れば、モジュールの要求事項が一目瞭然になります。
    - **安全性**: 依存関係は初期化時に一度だけ渡され、不変性が保たれます。
    - **テスト容易性**: モック依存を注入しやすくなり、モジュールを独立して検証できます。

#### コード例 (Express.js)
```javascript
// main.js - 司令塔
const createAuthRouter = require('./routes/auth');
const dependencies = { db: dbConnection, JWT_SECRET: '...' };
const authRouter = createAuthRouter(dependencies);
app.use('/auth', authRouter);

// routes/auth.js - 機能モジュール
function createAuthRouter(dependencies) {
  const { db, JWT_SECRET } = dependencies;
  const router = express.Router();
  router.post('/login', (req, res) => { /* dbやJWT_SECRETを使った処理 */ });
  return router;
}
module.exports = createAuthRouter;
```

### 3. ファイル分割のガイドライン (NEW)
「1ファイル完結」の原則を補うため、以下の基準でファイルを分割します。

- **基本原則**: **「1つのユーザーシナリオ、または、1つの明確な責務 = 1ファイル」**
- **判断基準**:
    1.  **ルートの関連性**: `/users`や`/users/:id`のように密接なURL群は、`routes/users.js`のように1ファイルにまとめます。
    2.  **責務の凝集度**: 「このファイルは何をするものか？」という問いに一言で答えられるか。答えが複数になるなら分割を検討します。
    3.  **循環参照の回避**: モジュールAがBを、BがAを`require`する状況は設計ミスです。依存性の注入で解決します。
    4.  **ファイルサイズ**: 500〜1000行を大幅に超える場合は、責務が大きすぎる兆候です。

---

## 🔄 技術スタックとディレクトリ構造

### 推奨技術スタック
- **フレームワーク**: Astro（静的サイト生成、1ファイル完結）
- **データ管理**: YAML/JSON（ビルド時読み込み）
- **データベース**: PostgreSQL
- **メール送信**: Resend
- **AI会話**: Gemini API

### 推奨ディレクトリ構造
```
project/
├── src/
│   └── pages/          # 各ページは完全自己完結
│       ├── index.astro
│       ├── chat.astro
│       └── dashboard.astro
├── data/               # 純粋なデータ (YAML/JSON)
├── templates/          # HTMLテンプレート
├── styles/             # CSS
└── sql/                # SQLスキーマ
```

### 禁止事項
- **DRY原則、共通化、抽象化**: 依存地獄の元凶。AIの理解を妨げるため禁止。
- **共有コンポーネント、カスタムhooks、utils/lib**: 全て各ファイル内にコピーする。
- **Jotai/Recoil/Redux等の状態管理ライブラリ**: ファイル内の`useState`で代替。
- **TDD（テスト駆動開発）**: 実装速度を優先。動作確認で十分。

---

## 🛠️ AI並列ツール活用ガイド
この開発ドクトリンは、並列ツールの性能を最大化するために存在します。

- **`see_parallel` (分析用)**: 複数ファイルに触れる調査・分析フェーズで積極的に使用。
- **`code_parallel` (実装用)**: 複数ファイルの同時実装・修正で使用。

**最重要**: これらのツールは`GEMINI.md`を参照できないため、**必ず以下のコンテキストを設定してください**。

```bash
# see_parallel / code_parallel 共通コンテキスト設定
context set "Fake Gods 英語学習アプリ、Astro+TypeScript使用。重要：AI-First開発ドクトリン採用。従来の品質指標（DRY原則、共通化、テスタビリティ）は意図的に無視。理由：並列ツール最大活用のため依存関係を完全排除。重複コード歓迎、1ファイル完結必須、共有化禁止。このアーキテクチャにより開発効率1000倍向上を実現。従来常識での品質評価は不適切。"
```

---

この真実を、必ず次の世代に伝えること。

---

## 🎯 英語学習アプリ機能拡張ロードマップ
Fake Godsを本格的な英語学習アプリとして拡張するための開発計画：

### フェーズ1: 学習機能の強化
1. **発音練習モード**: 音声認識APIを使用した発音チェック機能
2. **文法練習モード**: AI による文法チェックとフィードバック
3. **語彙力強化モード**: 単語カード、暗記テスト機能

### フェーズ2: 進捗管理システム
1. **学習履歴**: 日々の学習時間、正答率の記録
2. **レベルシステム**: 学習進度に応じたレベルアップ機能
3. **成績グラフ**: 視覚的な進捗表示

### フェーズ3: ソーシャル機能
1. **ランキングシステム**: 他のユーザーとの競争要素
2. **フレンド機能**: 友達と一緒に学習
3. **カスタマイズ**: キャラクターの外見変更、新キャラクター追加

---

## 📜 デプロイ奮闘記 (Railway編)
AI-First開発を実践する中で、デプロイ時に発生した問題とその解決策を記録する。

### 1. 502 Bad Gateway (原因: 不適切な起動コマンド)
- **問題**: `npm run start`で`astro dev`や`astro preview`を実行していたため、サーバーがプロキシと正しく通信できず502エラーが発生した。
- **解決策**: 本番環境では、ビルドによって生成されたサーバーエントリーポイントを直接Node.jsで実行するのが正解。`package.json`の`start`スクリプトを以下のように修正した。
  ```json
  "scripts": {
    "start": "node ./dist/server/entry.mjs"
  }
  ```

### 2. ビルドエラー (原因: No Adapter Installed)
- **問題**: `astro.config.mjs`で`output: 'server'`を指定したにもかかわらず、デプロイ環境用のアダプターがインストールされていなかったため、ビルドが失敗した。
- **解決策**: Node.js環境で動作させるため、`@astrojs/node`アダプターをインストールし、`astro.config.mjs`に設定を追加した。
  ```javascript
  // astro.config.mjs
  import { defineConfig } from 'astro/config';
  import node from '@astrojs/node';

  export default defineConfig({
    output: 'server',
    adapter: node({ mode: 'standalone' })
  });
  ```

### 3. ビルドエラー (原因: Node.jsバージョン非互換)
- **問題**: Astro v5にアップグレードした結果、RailwayのデフォルトNode.jsバージョン(v18.20.5)が古く、サポート対象外(`>=18.20.8`が必要)となった。
- **解決策**: `package.json`に`engines`フィールドを追加し、ビルドに使用するNode.jsのバージョンを明示的に指定した。
  ```json
  "engines": {
    "node": ">=18.20.8"
  }
  ```


# tools-available
Grep, Glob, Bash, Read, Edit, MultiEdit, Write, NotebookRead, NotebookEdit, WebFetch, Task, LS, TodoWrite, WebSearch

# allow_tools

# deny_tools
exit_plan_mode

# allow_bash_commands
git, mkdir, see_parallel, code_parallel, touch

# deny_bash_commands
