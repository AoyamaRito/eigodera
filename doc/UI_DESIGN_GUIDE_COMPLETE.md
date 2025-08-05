# UI設計ガイド完全版 - パキッとしたフラットデザイン

## 🎯 基本哲学

### 核心原則
1. **フラットデザイン**: 装飾を完全排除し、純粋な色面で構成
2. **くっきりした色使い**: 中間色を避け、はっきりした色を使用
3. **迷わせない**: 目立つUIは一つだけ、明確な視覚的階層
4. **スマホファースト**: 片手操作を前提とした設計

---

## 🎨 カラーシステム

### 3色構成の法則
```css
/* 基本3色 */
--base-color: #2C3E50;        /* ベースカラー（60-70%） */
--secondary-color: #ECF0F1;   /* セカンダリーカラー（20-30%） */
--accent-color: #E74C3C;      /* アクセントカラー（5-10%） */

/* 機能別カラー（最小限） */
--success: #27AE60;           /* 成功時のみ */
--error: #C0392B;             /* エラー時のみ */
```

### カラースキームのバリエーション

#### パターン1: 無彩色系 + 差し色（推奨）
```css
/* グレー系 + 赤 */
--base-color: #2C3E50;        /* ダークグレー */
--secondary-color: #ECF0F1;   /* ライトグレー */
--accent-color: #E74C3C;      /* 鮮やかな赤 */

/* グレー系 + 青 */
--base-color: #34495E;        /* ダークグレー */
--secondary-color: #F8F9FA;   /* ホワイトグレー */
--accent-color: #3498DB;      /* 鮮やかな青 */

/* グレー系 + 緑 */
--base-color: #2C3E50;        /* ダークグレー */
--secondary-color: #ECEFF1;   /* クールグレー */
--accent-color: #2ECC71;      /* 鮮やかな緑 */
```

#### パターン2: 同系色 + 反対色
```css
/* 青系 + オレンジ */
--base-color: #2980B9;        /* ダークブルー */
--secondary-color: #EBF3FD;   /* ライトブルー */
--accent-color: #F39C12;      /* オレンジ（青の反対色） */

/* 緑系 + 赤 */
--base-color: #27AE60;        /* ダークグリーン */
--secondary-color: #E8F5E8;   /* ライトグリーン */
--accent-color: #E74C3C;      /* 赤（緑の反対色） */
```

#### パターン3: 同系色 + 明度差
```css
/* 青系（明度差大） */
--base-color: #1A237E;        /* 濃い青 */
--secondary-color: #E3F2FD;   /* 薄い青 */
--accent-color: #00BCD4;      /* 鮮やかなシアン */

/* 紫系（明度差大） */
--base-color: #4A148C;        /* 濃い紫 */
--secondary-color: #F3E5F5;   /* 薄い紫 */
--accent-color: #FF4081;      /* 鮮やかなピンク */
```

### 色の選び方
1. **ベースカラー**: 落ち着いた主要色（画面の基調）
2. **セカンダリーカラー**: ベースと相性の良い補助色
3. **アクセントカラー**: 注目を集める差し色

### 配色の原則
- **無彩色系**: 最も安全で使いやすい。差し色を変えるだけで印象が変わる
- **反対色**: 色相環で正反対の色。強いコントラストが生まれる
- **明度差**: 同じ色相で明るさを大きく変える。統一感がありながら区別しやすい

### 高度な配色テクニック：「完全反対色を避ける」

#### 問題：完全反対色は子供っぽく見える
完全に反対の色（赤-緑、青-オレンジ）は色構成が単純すぎて幼稚な印象を与えがち。

#### 解決策：微妙にずらす
```css
/* ❌ 完全反対色（子供っぽい） */
--base-color: #2980B9;    /* 青 */
--accent-color: #FF6600;  /* 完全なオレンジ */

/* ✅ 微妙にずらした反対色（洗練された印象） */
--base-color: #2980B9;    /* 青 */
--accent-color: #E67E22;  /* 若干赤寄りのオレンジ */

/* ✅ 明度を変えた反対色 */
--base-color: #2980B9;    /* 青 */
--accent-color: #D35400;  /* 暗めのオレンジ */

/* ✅ 彩度を下げた反対色 */
--base-color: #2980B9;    /* 青 */
--accent-color: #E08A5B;  /* 彩度を下げたオレンジ */
```

#### 調整方法
1. **色相をずらす**: 完全反対色から15-30度ずらす
2. **明度を調整**: 少し暗く/明るくする
3. **彩度を下げる**: 少しくすませる

#### 重要な考え方
- **目立たせたいUIは異質でOK**: 主役ボタンは不規則性があっても構わない
- **全体の調和より機能性**: 見つけやすさを優先

---

## 📱 レイアウト原則

### 上下配置の法則
```
┌─────────────────┐
│  ヘッダー（低頻度）  │ ← 設定、ロゴなど
├─────────────────┤
│                 │
│  メインコンテンツ    │ ← スクロール可能領域
│                 │
├─────────────────┤
│ アクション（高頻度）  │ ← 主要ボタン、ナビ
└─────────────────┘
```

### スマホ最適化
- **最小タップ領域**: 48x48px
- **要素間隔**: 8px以上（誤タップ防止）
- **画面幅制限**: 480px max-width + 中央寄せ

---

## 🎬 アニメーション設計

### パキッとした動きの法則
```css
/* ❌NG: ふんわりした動き */
.soft-animation {
  animation: fade 2s ease-in-out;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
}

/* ✅OK: パキッとした動き */
.sharp-animation {
  animation: sharpPulse 3s linear infinite;
}

@keyframes sharpPulse {
  0%, 90%, 100% { 
    transform: scale(1);
    background: #E74C3C;
  }
  95% { 
    transform: scale(1.15);
    background: #FFB3BA; /* 薄いピンク */
  }
}
```

### アニメーションの目的
1. **生存確認**: アプリが動いていることを示す
2. **誘導**: 押すべきボタンを明確に示す
3. **フィードバック**: タップ時の反応

---

## 🎭 視覚的階層の法則

### 「目立つ機能は一つだけ」原則

#### 基本原則
- **迷わせたら終わり**: ユーザーが次に何をすべきか瞬時に分かること
- **主役機能は一つ**: 画面内で目立つ機能は一つに絞る（複数ボタンの場合もある）
- **その他は控えめに**: 主役以外は輪郭線や文字だけで表現

#### パターン1: 単一ボタンが主役
```css
/* 主役：単一の重要ボタン */
.primary-action {
  background: var(--accent-color);
  color: white;
  animation: sharpPulse 3s infinite;
  /* 例: フローティングアクションボタン */
}

/* 脇役：その他のボタン */
.secondary-action {
  background: transparent;
  border: 2px solid var(--base-color);
  color: var(--base-color);
}
```

#### パターン2: ボタングループが主役
```css
/* 主役：ボタングループ（例：アルファベット入力） */
.alphabet-group .letter-btn {
  background: var(--accent-color);
  color: white;
  border: 2px solid var(--accent-color);
  /* グループ全体が主役として統一デザイン */
}

/* 脇役：その他の機能 */
.utility-btn {
  background: transparent;
  border: 1px solid var(--base-color);
  color: var(--base-color);
}
```

#### グループが主役の例
1. **単語学習ゲーム**: アルファベットボタン群（A, B, C, D...）
2. **電卓アプリ**: 数字ボタン群（1, 2, 3, 4...）
3. **クイズアプリ**: 選択肢ボタン群（選択肢A, B, C, D）
4. **音楽プレイヤー**: 再生コントロール群（前の曲、再生、次の曲）

#### グループデザインの原則
- **統一性**: グループ内のボタンは同じデザイン
- **近接性**: グループ内のボタンは近くに配置
- **区別性**: 他の機能とは明確に区別

### 目立たせる要素とバランス

#### 目立つ要素の3つの軸
1. **色**: アクセントカラーで目立たせる
2. **大きさ**: 他より大きくして目立たせる
3. **形**: 特殊な形（角丸、円形）で目立たせる

#### バランスの重要性
```css
/* ❌ やりすぎ例：色・大きさ・形すべて目立つ */
.over-emphasized {
  background: var(--accent-color);  /* 目立つ色 */
  width: 200px;                     /* 大きなサイズ */
  border-radius: 50%;               /* 特殊な形 */
  /* → うるさい印象になる */
}

/* ✅ バランス良い例：大きさで目立つなら色は控えめ */
.balanced-group {
  background: var(--accent-color);  /* 目立つ色 */
  width: 70px;                      /* 既に大きい */
  border-radius: 8px;               /* 普通の角丸 */
  /* → 色は少し控えめでも十分目立つ */
}
```

#### 実例での調整
```css
/* 単語学習ゲーム：アルファベットボタン */
.letter-btn {
  /* 既に大きい（70px）+ 画面の大半を占める → さらに控えめに */
  background: #8E44AD;              /* 薄い同系色 */
  color: white;
  border: 3px solid var(--base-color); /* 太い縁取り */
  /* 大きさ + 面積で目立つので色・縁取りで調整 */
}

/* 音楽プレイヤー：再生ボタン */
.play-button {
  /* 単体なので色・大きさ・形すべて活用 */
  background: var(--accent-color);  /* 目立つ色 */
  width: 80px;                      /* 大きなサイズ */
  border-radius: 50%;               /* 円形 */
  /* 単体の主役なので全要素で目立たせる */
}
```

### 数値設定の原則：「意図が伝わる変化」

#### 問題：中途半端な数値はミスに見える
```css
/* ❌ ミスっぽく見える例 */
.border-thin { border: 2px solid black; }
.border-thick { border: 3px solid black; }
/* → 1px差は偶然やミスに見える */
```

#### 解決策：フィボナッチ数列か倍数を使用
```css
/* ✅ フィボナッチ数列（1, 1, 2, 3, 5, 8, 13...） */
.border-xs { border: 1px solid black; }
.border-sm { border: 2px solid black; }
.border-md { border: 3px solid black; }
.border-lg { border: 5px solid black; }
.border-xl { border: 8px solid black; }

/* ✅ 倍数系列（2, 4, 8, 16, 32...） */
.spacing-xs { margin: 2px; }
.spacing-sm { margin: 4px; }
.spacing-md { margin: 8px; }
.spacing-lg { margin: 16px; }
.spacing-xl { margin: 32px; }

/* ✅ 薄い色の例（同系色で薄く ≒ ほぼ白） */
.color-base { background: #4A148C; }     /* 濃い紫 */
.color-light { background: #8E44AD; }    /* 薄い紫 */
.color-pale { background: #F3E5F5; }     /* ほぼ白の薄い紫 */
```

#### 実例での適用
```css
/* 単語学習ゲーム：意図的な数値設定 */
.letter-btn {
  background: #8E44AD;              /* 薄い同系色（ほぼ白） */
  border: 3px solid var(--base-color); /* 3px（フィボナッチ） */
  padding: 20px;                    /* 意図的に大きな値 */
  font-size: 24px;                  /* 8の倍数 */
  height: 70px;                     /* 意図的に大きな値 */
}
```

### 錯視補正の例外：「ユーザーは同じだと勘違いしている」

#### 基本原則
- **意図的な変化**: フィボナッチ・倍数で明確に変える
- **錯視補正**: 物理的には違うが、視覚的に同じに見せる

#### 錯視補正が必要なケース
```css
/* 1. 小さい文字の可読性向上 */
.text-large {
  font-size: 24px;
  font-weight: 600;
  color: #2C3E50;
}

.text-small {
  font-size: 14px;
  font-weight: 700;        /* 微妙に太く */
  color: #1A252F;          /* 微妙に濃く */
  /* ユーザーは同じ見た目だと感じる */
}

/* 2. 背景色による文字の見え方調整 */
.text-on-white {
  color: #2C3E50;
  font-weight: 600;
}

.text-on-colored {
  color: #34495E;          /* 微妙に濃く */
  font-weight: 700;        /* 微妙に太く */
  /* 色付き背景でも同じ見た目になる */
}

/* 3. ボタンサイズと視覚的バランス */
.button-large {
  padding: 24px 32px;
  font-size: 18px;
  border: 2px solid #2C3E50;
}

.button-small {
  padding: 12px 16px;
  font-size: 14px;
  border: 1.5px solid #2C3E50;  /* 微妙に細く */
  /* 比例を保って「同じ太さ」に見せる */
}
```

#### 重要な考え方
- **物理的な数値**: 実際は違う
- **視覚的な印象**: ユーザーには同じに見える
- **目的**: 一貫性のある見た目を保つ

#### 適用タイミング
1. **文字サイズが小さい時**: 太さ・色を微調整
2. **背景色が違う時**: コントラストを微調整
3. **要素のサイズが違う時**: 比例関係を微調整

---

## 🏗️ コンポーネント設計

### ボタンの階層
```css
/* Lv.1: 最重要（画面に1つだけ） */
.btn-primary {
  background: var(--accent-color);
  color: white;
  animation: sharpPulse 3s infinite;
}

/* Lv.2: 重要（複数可） */
.btn-secondary {
  background: transparent;
  border: 2px solid var(--base-color);
  color: var(--base-color);
}

/* Lv.3: 補助（多数可） */
.btn-tertiary {
  background: transparent;
  border: none;
  color: var(--base-color);
  text-decoration: underline;
}
```

### カードコンポーネント
```css
.card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(44, 62, 80, 0.1);
  /* 影は使わない（フラットデザイン） */
}
```

---

## 🖥️ レスポンシブ設計

### 画面幅の制御
```css
body {
  max-width: 480px;      /* スマホ幅に制限 */
  margin: 0 auto;        /* 中央寄せ */
}

/* 固定要素も同様に制御 */
.header, .action-area {
  left: 50%;
  transform: translateX(-50%);
  max-width: 480px;
  width: 100%;
}

.fab {
  right: calc(50% - 240px + 16px); /* 480px幅内の右端 */
}
```

---

## ✅ 実装チェックリスト

### デザイン確認
- [ ] 使用色は3色以内（＋機能色2色）
- [ ] 目立つ要素は画面に1つだけ
- [ ] 装飾要素（影、グラデーション）を排除
- [ ] 重要なボタンは画面下部に配置

### アニメーション確認
- [ ] 主要ボタンにパキッとしたアニメーション
- [ ] ease-in-outではなくlinear使用
- [ ] 色の変化は明確（薄い色への変化）
- [ ] アニメーション頻度は控えめ（3秒に1回程度）

### レスポンシブ確認
- [ ] 画面幅480px制限
- [ ] 固定要素も幅制限適用
- [ ] 最小タップ領域48px確保
- [ ] 要素間隔8px以上確保

---

## 🎨 サンプルコード

### 完全な実装例
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    :root {
      --base-color: #2C3E50;
      --secondary-color: #ECF0F1;
      --accent-color: #E74C3C;
    }
    
    body {
      max-width: 480px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    
    /* 主役: 目立つボタン */
    .fab {
      position: fixed;
      bottom: 160px;
      right: calc(50% - 240px + 16px);
      width: 56px;
      height: 56px;
      background: var(--accent-color);
      color: white;
      border: none;
      border-radius: 50%;
      animation: sharpPulse 3s linear infinite;
    }
    
    /* 脇役: 控えめなボタン */
    .btn-secondary {
      background: transparent;
      border: 2px solid var(--base-color);
      color: var(--base-color);
      padding: 16px 32px;
      border-radius: 8px;
    }
    
    @keyframes sharpPulse {
      0%, 90%, 100% { 
        transform: scale(1);
        background: var(--accent-color);
      }
      95% { 
        transform: scale(1.15);
        background: #FFB3BA;
      }
    }
  </style>
</head>
<body>
  <button class="btn-secondary">普通のボタン</button>
  <button class="fab">+</button>
</body>
</html>
```

---

## 🎯 まとめ

このUIデザインガイドは以下を実現します：

1. **迷わない UI**: 主役は一つだけ、明確な視覚的階層
2. **パキッとした印象**: フラットデザイン + くっきりした動き
3. **スマホ最適化**: 片手操作を前提とした設計
4. **実装しやすさ**: 明確なルールと具体的なコード例

**重要**: このガイドは「ユーザーを迷わせない」ことを最優先に設計されています。
美しさよりも機能性、複雑さよりもシンプルさを重視した実用的なUIデザインです。