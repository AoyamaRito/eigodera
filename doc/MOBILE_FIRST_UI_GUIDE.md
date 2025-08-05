# モバイルファーストUI設計ガイド - 4コーナー理論

## 🎯 核心理念
**「スマホの狭い画面には4つの特等席しかない」**

## 📱 4コーナー理論：スマホUIの絶対法則

### 基本原則
スマホの狭い画面で、ユーザーの注意を引き、操作可能な「特等席」は**4つの角だけ**。これ以上は物理的に不可能。

```
┌─────────────────┐
│ [左上]      [右上] │ ← 上部の特等席（2席のみ）
├─────────────────┤
│                 │
│   コンテンツ領域   │ ← UI禁止区域（コンテンツ専用）
│                 │
├─────────────────┤
│ [左下]      [右下] │ ← 下部の特等席（2席のみ）
└─────────────────┘
```

### 各コーナーの役割（変更不可）
1. **左上**: 戻る/メニュー（OSとの約束）
2. **右上**: 設定/その他（補助機能）
3. **左下**: ナビ起点（親指の自然位置）
4. **右下**: 主要アクション（最重要）

### 絶対ルール
- **1コーナー1機能**: 複数機能を詰め込むな
- **中央は聖域**: コンテンツ以外置くな
- **5つ目は存在しない**: 4つで収まらないなら設計が間違い

---

## 🎯 第2階層：準特等席

### 階層構造
```
┌─────────────────┐
│   第1階層（4コーナー）  │ ← 最重要機能
├─────────────────┤
│   第2階層（上部）     │ ← タブ、サブナビ
├─────────────────┤
│   コンテンツ領域     │ ← UI禁止
├─────────────────┤
│   第2階層（下部）     │ ← 入力、追加ボタン
└─────────────────┘
```

### 第2階層の使い方
- **上部第2列**: タブバー、フィルター
- **下部第2列**: 入力フォーム、送信ボタン

---

## 🎨 実装例

### 4コーナー配置CSS
```css
/* 4つのコーナーに配置する要素 */
.corner-top-left {     /* 左上：戻る/メニュー */
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 100;
}

.corner-top-right {    /* 右上：設定/その他 */
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 100;
}

.corner-bottom-left {  /* 左下：ナビ起点 */
  position: fixed;
  bottom: 16px;
  left: 16px;
  z-index: 100;
}

.corner-bottom-right { /* 右下：主要アクション */
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 100;
  /* 最重要位置なので目立たせる */
  background: var(--accent-color);
  animation: sharpPulse 3s infinite;
}
```

### 第2階層の実装
```css
/* 上部第2階層（タブバー） */
.top-secondary-bar {
  position: fixed;
  top: 64px;  /* 第1階層の下 */
  left: 0;
  right: 0;
  height: 48px;
  display: flex;
  overflow-x: auto;
}

/* 下部第2階層（入力エリア） */
.bottom-secondary-bar {
  position: fixed;
  bottom: 64px;  /* 第1階層の上 */
  left: 0;
  right: 0;
  padding: 8px 16px;
  display: flex;
  gap: 8px;
}
```

---

## ✅ E2Eテストでの検証

### 4コーナー検証（Playwright）
```javascript
// 4コーナーの存在確認
await expect(page.locator('.corner-top-left')).toBeVisible();
await expect(page.locator('.corner-top-right')).toBeVisible();
await expect(page.locator('.corner-bottom-left')).toBeVisible();
await expect(page.locator('.corner-bottom-right')).toBeVisible();

// 右下が主要アクションか確認
const primaryAction = page.locator('.corner-bottom-right');
await expect(primaryAction).toHaveCSS('background-color', accentColor);

// 中央にUIがないことを確認
const centerUI = page.locator('.content-area button, .content-area input');
await expect(centerUI).toHaveCount(0);
```

---

## 🚀 e2eddとの統合

### なぜ4コーナー理論がe2eddに最適か

1. **明確な配置ルール** → E2Eで自動検証可能
2. **数値化可能** → テストで合否判定できる
3. **再現性100%** → 誰がやっても同じ結果

### ローカルE2E高速実行
```bash
# 4コーナー配置のみを高速チェック
npm run e2e:corners -- --headless

# 失敗時のみtmux-claude-hubで通知
tch watch "npm run e2e:corners"
```

---

## 🎯 まとめ

**4コーナー理論の価値：**
- **迷う余地がない**: 配置場所が明確
- **品質が保証される**: E2Eで自動検証
- **AIに優しい**: 明確な指示が可能

**これによりe2eddで実現できること：**
- UIの品質を自動保証
- デグレを完全防止
- 高速な開発サイクル

**覚えておくべきこと：**
1. スマホには4つの特等席しかない
2. 中央はコンテンツ専用
3. このルールを守れば「使いにくい」と言われることはない