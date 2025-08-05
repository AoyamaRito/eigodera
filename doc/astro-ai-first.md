# AI-First開発におけるAstro実践ガイド

このドキュメントは、AI（特にClaude）と協働してWebアプリケーションを開発する際のAstro活用方法をまとめたものです。

## なぜAstroなのか

### ❌ 避けるべきフレームワーク
- **Next.js** - 人間のベストプラクティスが多すぎる
  - App Router、RSC、ミドルウェアなど暗黙の規約が多い
  - ファイル間の依存関係が複雑
  - AIには「魔法」が多すぎて追跡困難

### ✅ Astroを選ぶ理由
- **1ファイル = 1ページ** の直感的な対応
- サーバーサイドとクライアントサイドが明確に分離
- 共通コンポーネントを避けて局所性を保てる
- ビルド時の最適化が優秀

## AI-First開発の基本原則

### 1. すべてをインラインで書く

```astro
---
// ❌ 悪い例：外部インポート
import Header from '../components/Header.astro';
import '../styles/global.css';
---

---
// ✅ 良い例：すべて同じファイルに
const data = await loadData();
---

<html>
  <head>
    <style>
      /* インラインCSS */
      body { margin: 0; }
    </style>
  </head>
  <body>
    <header style="background: #000; color: white;">
      ヘッダー
    </header>
  </body>
</html>
```

### 2. 共通化の幻想を捨てる

人間の常識：
- DRY原則を守る
- 共通コンポーネントを作る
- グローバルテーマを定義

AI-Firstの現実：
- 重複を恐れない
- 各ファイルで完結させる
- 局所性こそが正義

## パフォーマンスの落とし穴

### SSRの罠

最初の設定：
```javascript
// astro.config.mjs
export default defineConfig({
  output: 'server',  // ← これが0.3秒の遅延の原因
  adapter: node()
});
```

症状：
- 毎回サーバーでHTMLを生成
- 静的なページでも遅延が発生
- Node.jsサーバーのオーバーヘッド

### 解決策：完全静的化

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'static'  // ← 静的サイトとして生成
  // adapterは不要
});
```

効果：
- 表示速度が劇的に改善
- CDNでキャッシュ可能
- サーバーコスト削減

## データ管理のベストプラクティス

### YAMLファイルでデータ分離

```yaml
# src/data/comments.yaml
greeting:
  - "こんにちは"
  - "ようこそ"
```

```astro
---
import fs from 'fs';
import yaml from 'js-yaml';

const data = yaml.load(fs.readFileSync('./src/data/comments.yaml', 'utf8'));
---

<script define:vars={{ data }}>
  // クライアントサイドで使用
  window.commentsData = data;
</script>
```

メリット：
- コードとデータの分離
- トークン数の削減
- AIがコード構造を理解しやすい

## Railway.appへのデプロイ

### 静的サイトの配信設定

1. `serve`パッケージをインストール：
```bash
npm install --save serve
```

2. `package.json`の設定：
```json
{
  "scripts": {
    "start": "serve dist -l 8080"  // Railway.appは8080ポートを使用
  }
}
```

注意点：
- `-s`（SPAモード）は使わない → ルーティングが壊れる
- ポート番号は環境に応じて調整

## 実装時の注意点

### 1. URLパラメータの扱い

```javascript
// ❌ サーバーサイドで取得しようとしない
const { score } = Astro.url.searchParams;

// ✅ クライアントサイドで取得
const params = new URLSearchParams(window.location.search);
const score = params.get('score');
```

### 2. 動的コンテンツ

すべてクライアントサイドで処理：
- API呼び出し
- 状態管理
- URLパラメータ
- ローカルストレージ

## まとめ

AI-First開発でAstroを使う際の鉄則：

1. **シンプルに保つ** - 人間の「きれいなコード」の概念を捨てる
2. **局所性を重視** - 1ファイルで完結させる
3. **静的化を基本** - SSRは本当に必要な時だけ
4. **データは分離** - でもロジックは分離しない

これらの原則に従うことで、AIとの協働開発が劇的に効率化されます。