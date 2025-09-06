import { Lesson, SolutionCode } from '@/lib/types/lesson'

export const chapter1Lesson3: Lesson = {
  id: 'chapter1-lesson3',
  title: 'JSXの中にJavaScriptを埋め込む',
  lessonNumber: 3,
  description: 'JSXの中でJavaScriptの式や変数を使う方法を学び、動的なコンテンツの表示を習得します',
  difficulty: '初級',

  textBook: `# ⚡ JSXの中にJavaScriptを埋め込む

前回lesson2では、美しいCSSスタイルを適用しました。
今度は、そのスタイリッシュなコンポーネントに**動的な機能**を追加してみましょう！

## 🎯 静的 → 動的への進化

### 📋 Before（これまで）
\`\`\`jsx
// 固定のテキストのみ
const App = () => {
  return (
    <div className="container">
      <h1 className="title">React App</h1>
      <p className="description">Reactの基本構造を学ぶ</p>
    </div>
  )
}
\`\`\`

### 🚀 After（今回のゴール）
\`\`\`jsx
// 動的データを使用した商品カード
const App = () => {
  const productName = "スマートウォッチ Pro";
  const price = 45000;
  const discountRate = 0.25; // 25%割引
  const rating = 4.5;
  
  return (
    <div className="product-card">
      <h2>{productName}</h2>                    {/* 動的な商品名 */}
      <p>¥{(price * (1 - discountRate)).toLocaleString()}</p> {/* 計算結果 */}
      <p>{getStarRating(rating)} ({rating}/5)</p>             {/* 関数実行 */}
    </div>
  )
}
\`\`\`

---

## 🔧 JSX式の魔法：波括弧 \`{}\`

JSXの中でJavaScriptを動かすには、**波括弧**を使います：

\`\`\`jsx
const magic = "JavaScript魔法"
return <div>{magic}</div>  // ← この {}が魔法の鍵！
\`\`\`

---

## 📊 4つのJavaScript埋め込みパターン

### 1️⃣ **変数の表示**

\`\`\`jsx
const ProductDemo = () => {
  const brand = "TechCorp";
  const model = "WatchPro X1";
  
  return (
    <div>
      <h3>{brand}</h3>         {/* TechCorp */}
      <p>{model}</p>           {/* WatchPro X1 */}
    </div>
  )
}
\`\`\`

**結果：**
\`\`\`
TechCorp
WatchPro X1
\`\`\`

### 2️⃣ **計算式の実行**

\`\`\`jsx
const PriceCalculator = () => {
  const originalPrice = 50000;
  const discount = 0.3; // 30%オフ
  
  return (
    <div>
      <p>通常価格: ¥{originalPrice.toLocaleString()}</p>
      <p>割引価格: ¥{(originalPrice * (1 - discount)).toLocaleString()}</p>
      <p>お得額: ¥{(originalPrice * discount).toLocaleString()}引き！</p>
    </div>
  )
}
\`\`\`

**結果：**
\`\`\`
通常価格: ¥50,000
割引価格: ¥35,000  
お得額: ¥15,000引き！
\`\`\`

### 3️⃣ **関数の呼び出し**

\`\`\`jsx
// 星評価を生成する関数
const getStarRating = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '');
};

const RatingDisplay = () => {
  const userRating = 4.5;
  
  return (
    <div>
      <p>評価: {getStarRating(userRating)} ({userRating}/5)</p>
    </div>
  )
}
\`\`\`

**結果：**
\`\`\`
評価: ★★★★☆ (4.5/5)
\`\`\`

### 4️⃣ **属性での変数使用**

\`\`\`jsx
const DynamicImage = () => {
  const imageUrl = "https://example.com/watch.jpg";
  const altText = "スマートウォッチの商品画像";
  
  return <img src={imageUrl} alt={altText} />
}
\`\`\`

---

## 🗂️ オブジェクトを使ったデータ管理

複数の関連データは、オブジェクトでまとめると管理が楽になります：

\`\`\`jsx
const ProductCard = () => {
  // すべての商品情報を1つのオブジェクトに
  const product = {
    name: "スマートウォッチ Elite",
    brand: "TechCorp",
    price: 48000,
    discountRate: 0.2,
    rating: 4.7,
    imageUrl: "https://example.com/watch-elite.jpg"
  };
  
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      <p className="brand">{product.brand}</p>
      <div className="price">
        <span className="discounted">
          ¥{(product.price * (1 - product.discountRate)).toLocaleString()}
        </span>
        <span className="original">¥{product.price.toLocaleString()}</span>
      </div>
      <div className="rating">
        {getStarRating(product.rating)} ({product.rating}/5)
      </div>
    </div>
  )
}
\`\`\`

---

## ⚠️ JSXで注意すること

### ❌ オブジェクトを直接表示はできない
\`\`\`jsx
const user = { name: "田中", age: 25 };
return <div>{user}</div>  // ← エラー！
\`\`\`

### ✅ プロパティを指定して表示
\`\`\`jsx
const user = { name: "田中", age: 25 };
return <div>{user.name}さん ({user.age}歳)</div>  // ← 正しい！
\`\`\`

---

## 🎯 今回のゴール

このレッスンでは、以下の順序でJavaScript機能を追加していきます：

1. **📝 商品名・ブランドの動的表示**
2. **🖼️ 画像URLの動的設定**  
3. **💰 価格計算・割引表示**
4. **⭐ 星評価システム**
5. **📦 オブジェクトによるデータ統合**

静的だったコンポーネントが、どんどん動的で実用的になっていく様子をお楽しみください！✨`,

  taskDescription: `
このレッスンでは、JSXにJavaScriptの変数や計算式を埋め込む方法について学習します。
変数の定義から始めて、最終的には商品情報を動的に表示する商品カードコンポーネントを作成しましょう！
  `,

  // 段階的な課題
  steps: [
    {
      stepNumber: 1,
      title: '商品名とブランド名を表示してみよう！',
      instruction: `商品名とブランド名を変数に保存してJSXで表示してみましょう。

JavaScriptの変数は「const 変数名 = 値;」の形式で作成します。
Reactコンポーネントでは、JSXを返すreturnより前に変数を定義しておく必要があります。
JSXの中で波括弧{}を使うと、その中のJavaScript式が実行されて結果が画面に表示されます。

以下の変数を定義して表示してください：
- productName: "スマートウォッチ"
- brandName: "TechGear"`,
      copyableCode: [
        {
          label: '📝 変数の定義',
          code: `const productName = "スマートウォッチ";
const brandName = "TechGear";`,
        },
        {
          label: '📝 JSXへの埋め込み',
          code: `<p className="brand-name">{brandName}</p>
<h1>{productName}</h1>`,
        },
      ],
      initialStepFiles: {
        'App.jsx': {
          content: `import './styles.css'

const App = () => {
  // ここに商品名とブランド名の変数を定義してください
  const productName = "???";
  const brandName = "???";
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        {/* 画像はステップ2で追加 */}
      </div>
      <div className="product-info">
        <p className="brand-name">{/* ここにブランド名を表示 */}</p>
        <h1>{/* ここに商品名を表示 */}</h1>
      </div>
    </div>
  )
}

export default App`,
          isVisible: true,
        },
        'styles.css': {
          content: `/* 全体を中央揃えするためのコンテナ */
body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
}

/* 商品カード */
.product-card {
  width: 220px;
  margin: 0;
  padding: 0;
  background: #ffffff;
  border-radius: 0;
  border: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
  overflow: visible;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: translateY(-2px);
}

.product-image-container {
  position: relative;
  width: 100%;
  padding-bottom: 133%; /* 3:4のアスペクト比 */
  background: #f8f8f8;
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  transition: opacity 0.3s ease;
}

.product-image:hover {
  opacity: 0.9;
}

/* 商品情報エリアの共通パディング */
.product-info {
  padding: 12px;
}

.brand-name {
  font-size: 12px;
  color: #333333;
  margin: 8px 0 4px 0;
  font-weight: 400;
  line-height: 1.4;
  height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-card h1 {
  font-size: 13px;
  font-weight: 400;
  color: #333333;
  margin: 0 0 8px 0;
  letter-spacing: 0;
  line-height: 1.5;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
}

.price {
  font-size: 12px;
  color: #999999;
  margin: 0;
  text-decoration: line-through;
  font-weight: 400;
}

.discount-price {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  margin: 0;
  letter-spacing: 0;
}

.discount-badge {
  display: inline-block;
  background: #ff3333;
  color: white;
  font-size: 11px;
  padding: 2px 4px;
  border-radius: 2px;
  font-weight: 500;
  margin-left: 4px;
}

.rating {
  font-size: 11px;
  color: #666666;
  margin: 4px 0 0 0;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* レビュー数表示 */
.review-count {
  color: #999999;
  font-size: 11px;
  margin-left: 2px;
}`,
          isVisible: false,
        },
      },
      solutionCodes: [
        {
          code: `import './styles.css'

const App = () => {
  const productName = "スマートウォッチ";
  const brandName = "TechGear";
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        {/* 画像はステップ2で追加 */}
      </div>
      <div className="product-info">
        <p className="brand-name">{brandName}</p>
        <h1>{productName}</h1>
      </div>
    </div>
  )
}

export default App`,
          solutionTargetFile: 'react-app/App.jsx',
          label: 'App.jsx - 解答コード',
        },
      ] as SolutionCode[],
      validation: {
        includes: ['{productName}', '{brandName}', "import './styles.css'"],
      },
    },
    {
      stepNumber: 2,
      title: '商品画像を表示しよう！',
      instruction: `今度は商品画像を表示してみましょう。
JSXでは、要素の属性値にも波括弧{}を使って変数を埋め込むことができます。

以下の変数を定義して、img要素のsrc属性とalt属性に設定し、画像を表示してください：
- imageUrl: 商品画像のURL
- altText: "スマートウォッチの商品画像"`,
      tips: [
        'HTML要素の属性（src、alt、classNameなど）にも変数を使用できます',
        '属性に変数を使う際は、属性名={変数名}の形で書きます',
        'ダブルクォートは不要です（例：src={imageUrl}）',
        'これにより、同じコンポーネントでも異なるデータを表示可能になります',
      ],
      tipsTitle: 'JSXの属性で変数を使う方法',
      copyableCode: [
        {
          label: '📝 画像URLとalt属性の変数',
          code: `const imageUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop&crop=center";
const altText = "スマートウォッチの商品画像";`,
        },
        {
          label: '📝 img要素での変数使用',
          code: `<div className="product-image-container">
  <img 
    className="product-image"
    src={imageUrl}
    alt={altText}
  />
</div>`,
        },
      ],
      initialStepFiles: {
        'App.jsx': {
          content: `import './styles.css'

const App = () => {
  const productName = "スマートウォッチ";
  const brandName = "TechGear";
  
  // ここに画像URLとalt属性の変数を追加してください
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          className="product-image"
          src={/* 画像URLを設定 */}
          alt={/* alt属性を設定 */}
        />
      </div>
      <p className="brand-name">{brandName}</p>
      <h1>{productName}</h1>
    </div>
  )
}

export default App`,
          isVisible: true,
        },
        'styles.css': {
          content: `/* 全体を中央揃えするためのコンテナ */
body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
}

/* 商品カード */
.product-card {
  width: 220px;
  margin: 0;
  padding: 0;
  background: #ffffff;
  border-radius: 0;
  border: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
  overflow: visible;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: translateY(-2px);
}

.product-image-container {
  position: relative;
  width: 100%;
  padding-bottom: 133%; /* 3:4のアスペクト比 */
  background: #f8f8f8;
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  transition: opacity 0.3s ease;
}

.product-image:hover {
  opacity: 0.9;
}

/* 商品情報エリアの共通パディング */
.product-info {
  padding: 12px;
}

.brand-name {
  font-size: 12px;
  color: #333333;
  margin: 8px 0 4px 0;
  font-weight: 400;
  line-height: 1.4;
  height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-card h1 {
  font-size: 13px;
  font-weight: 400;
  color: #333333;
  margin: 0 0 8px 0;
  letter-spacing: 0;
  line-height: 1.5;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
}

.price {
  font-size: 12px;
  color: #999999;
  margin: 0;
  text-decoration: line-through;
  font-weight: 400;
}

.discount-price {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  margin: 0;
  letter-spacing: 0;
}

.discount-badge {
  display: inline-block;
  background: #ff3333;
  color: white;
  font-size: 11px;
  padding: 2px 4px;
  border-radius: 2px;
  font-weight: 500;
  margin-left: 4px;
}

.rating {
  font-size: 11px;
  color: #666666;
  margin: 4px 0 0 0;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* レビュー数表示 */
.review-count {
  color: #999999;
  font-size: 11px;
  margin-left: 2px;
}`,
          isVisible: false,
        },
      },
      solutionCodes: [
        {
          code: `import './styles.css'

const App = () => {
  const productName = "スマートウォッチ";
  const brandName = "TechGear";
  
  const imageUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop&crop=center";
  const altText = "スマートウォッチの商品画像";
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          className="product-image"
          src={imageUrl}
          alt={altText}
        />
      </div>
      <div className="product-info">
        <p className="brand-name">{brandName}</p>
        <h1>{productName}</h1>
      </div>
    </div>
  )
}

export default App`,
          solutionTargetFile: 'react-app/App.jsx',
          label: 'App.jsx - 解答コード',
        },
      ] as SolutionCode[],
      validation: {
        includes: ['src={imageUrl}', 'alt={altText}', "import './styles.css'"],
      },
    },
    {
      stepNumber: 3,
      title: '価格と割引を計算しよう！',
      instruction: `今度は商品の価格と割引を計算して表示しましょう。
JSXの波括弧{}には、変数だけでなく計算式や関数呼び出しなど、
様々なJavaScript式を埋め込むことができます。

1. JSXより前に変数を定義

\`\`\`javascript
const price = 12000;
const discountRate = 0.20;
const discountBadge = Math.round(discountRate * 100) + '%OFF';
\`\`\`

2. JSX内で記述

\`\`\`javascript
<div className="price-container">
  {/* 計算式と関数を直接実行 */}
  <p className="discount-price">¥{(price - price * discountRate).toLocaleString()}</p>
  {/* toLocaleString()を直接実行 */}
  <p className="price">¥{price.toLocaleString()}</p>
  {/* 事前に定義した変数を直接参照 */}
  <span className="discount-badge">{discountBadge}</span>
</div>
\`\`\`

いろんなやり方がありますが、JSXより前に変数定義する方が読みやすく再利用でき、
コンポーネントが再レンダリングされても無駄な計算を避けられるので効率的です。`,
      tips: [
        '複雑な式も波括弧内に書けます：括弧を使って計算順序を制御',
        'JSXで関数チェーンが可能：数値.toLocaleString().replace(...) のような連続処理',
        'JSXより前での変数定義は再レンダリング時の計算を効率化',
        'JSX内での直接計算は動的な値や一時的な処理に適している',
      ],
      tipsTitle: 'JSXでの計算式と関数の組み合わせ',
      copyableCode: [
        {
          label: '📝 価格と割引率の変数',
          code: `const price = 12000;
const discountRate = 0.20;
const discountBadge = Math.round(discountRate * 100) + '%OFF';`,
        },
        {
          label: '📝 価格の表示',
          code: `<div className="price-container">
  <p className="discount-price">¥{(price - price * discountRate).toLocaleString()}</p>
  <p className="price">¥{price.toLocaleString()}</p>
  <span className="discount-badge">{discountBadge}</span>
</div>`,
        },
      ],
      initialStepFiles: {
        'App.jsx': {
          content: `import './styles.css'

const App = () => {
  const productName = "スマートウォッチ";
  const brandName = "TechGear";
  
  const imageUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop&crop=center";
  const altText = "スマートウォッチの商品画像";
  
  // ここに価格と割引率の変数を追加してください
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          className="product-image"
          src={imageUrl}
          alt={altText}
        />
      </div>
      <p className="brand-name">{brandName}</p>
      <h1>{productName}</h1>
      <div className="price-container">
        <p className="discount-price">{/* 割引価格を表示 */}</p>
        <p className="price">{/* 定価を表示 */}</p>
        <span className="discount-badge">{/* 割引率を表示 */}</span>
      </div>
    </div>
  )
}

export default App`,
          isVisible: true,
        },
        'styles.css': {
          content: `/* 全体を中央揃えするためのコンテナ */
body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
}

/* 商品カード */
.product-card {
  width: 220px;
  margin: 0;
  padding: 0;
  background: #ffffff;
  border-radius: 0;
  border: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
  overflow: visible;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: translateY(-2px);
}

.product-image-container {
  position: relative;
  width: 100%;
  padding-bottom: 133%; /* 3:4のアスペクト比 */
  background: #f8f8f8;
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  transition: opacity 0.3s ease;
}

.product-image:hover {
  opacity: 0.9;
}

/* 商品情報エリアの共通パディング */
.product-info {
  padding: 12px;
}

.brand-name {
  font-size: 12px;
  color: #333333;
  margin: 8px 0 4px 0;
  font-weight: 400;
  line-height: 1.4;
  height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-card h1 {
  font-size: 13px;
  font-weight: 400;
  color: #333333;
  margin: 0 0 8px 0;
  letter-spacing: 0;
  line-height: 1.5;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
}

.price {
  font-size: 12px;
  color: #999999;
  margin: 0;
  text-decoration: line-through;
  font-weight: 400;
}

.discount-price {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  margin: 0;
  letter-spacing: 0;
}

.discount-badge {
  display: inline-block;
  background: #ff3333;
  color: white;
  font-size: 11px;
  padding: 2px 4px;
  border-radius: 2px;
  font-weight: 500;
  margin-left: 4px;
}

.rating {
  font-size: 11px;
  color: #666666;
  margin: 4px 0 0 0;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* レビュー数表示 */
.review-count {
  color: #999999;
  font-size: 11px;
  margin-left: 2px;
}`,
          isVisible: false,
        },
      },
      solutionCodes: [
        {
          code: `import './styles.css'

const App = () => {
  const productName = "スマートウォッチ";
  const brandName = "TechGear";
  
  const imageUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop&crop=center";
  const altText = "スマートウォッチの商品画像";
  
  const price = 12000;
  const discountRate = 0.20;
  const discountBadge = Math.round(discountRate * 100) + '%OFF';
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          className="product-image"
          src={imageUrl}
          alt={altText}
        />
      </div>
      <div className="product-info">
        <p className="brand-name">{brandName}</p>
        <h1>{productName}</h1>
        <div className="price-container">
          <p className="discount-price">¥{(price - price * discountRate).toLocaleString()}</p>
          <p className="price">¥{price.toLocaleString()}</p>
          <span className="discount-badge">{discountBadge}</span>
        </div>
      </div>
    </div>
  )
}

export default App`,
          solutionTargetFile: 'react-app/App.jsx',
          label: 'App.jsx - 解答コード',
        },
      ] as SolutionCode[],
      validation: {
        includes: ['{price}', '{price - price * discountRate}', "import './styles.css'"],
      },
    },
    {
      stepNumber: 4,
      title: '星評価の関数を作ろう',
      instruction: `今度は、商品の評価を星で表示する関数を作ってみましょう。

関数は、決まった処理を実行して結果を返す仕組みです。
値を受け取って何らかの処理を行い、結果を返します。

関数は以下の形式で作成します：
\`\`\`javascript
const 関数名 = (引数) => {
  return 関数の中身;
}
\`\`\`

では、「getStarRating」という関数を定義し、
塗りつぶし星（★）と空の星（☆）で5段階評価を表示しましょう。

\`\`\`javascript
const getStarRating = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}
\`\`\`

この関数は、rating（評価数）を受け取って、その数だけ★を表示し、残りは☆で埋めて5段階評価を作ります。
では、評価4つ星とレビュー数を表示してください。`,
      copyableCode: [
        {
          label: '📝 星評価を返す関数',
          code: `const getStarRating = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

const reviewCount = 128;`,
        },
        {
          label: '📝 関数の呼び出し',
          code: `<p className="rating">
  {getStarRating(4)}
  <span className="review-count">({reviewCount})</span>
</p>`,
        },
      ],
      initialStepFiles: {
        'App.jsx': {
          content: `import './styles.css'

const App = () => {
  const productName = "スマートウォッチ";
  const brandName = "TechGear";
  
  const imageUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop&crop=center";
  const altText = "スマートウォッチの商品画像";
  
  const price = 12000;
  const discountRate = 0.20;
  const discountBadge = Math.round(discountRate * 100) + '%OFF';
  
  // ここに星評価を返す関数を作ってください
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          className="product-image"
          src={imageUrl}
          alt={altText}
        />
      </div>
      <div className="product-info">
        <p className="brand-name">{brandName}</p>
        <h1>{productName}</h1>
        <div className="price-container">
          <p className="discount-price">¥{(price - price * discountRate).toLocaleString()}</p>
          <p className="price">¥{price.toLocaleString()}</p>
          <span className="discount-badge">{discountBadge}</span>
        </div>
        <p className="rating">{/* 星評価関数を呼び出してください */}</p>
      </div>
    </div>
  )
}

export default App`,
          isVisible: true,
        },
        'styles.css': {
          content: `/* 全体を中央揃えするためのコンテナ */
body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
}

/* 商品カード */
.product-card {
  width: 220px;
  margin: 0;
  padding: 0;
  background: #ffffff;
  border-radius: 0;
  border: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
  overflow: visible;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: translateY(-2px);
}

.product-image-container {
  position: relative;
  width: 100%;
  padding-bottom: 133%; /* 3:4のアスペクト比 */
  background: #f8f8f8;
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  transition: opacity 0.3s ease;
}

.product-image:hover {
  opacity: 0.9;
}

/* 商品情報エリアの共通パディング */
.product-info {
  padding: 12px;
}

.brand-name {
  font-size: 12px;
  color: #333333;
  margin: 8px 0 4px 0;
  font-weight: 400;
  line-height: 1.4;
  height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-card h1 {
  font-size: 13px;
  font-weight: 400;
  color: #333333;
  margin: 0 0 8px 0;
  letter-spacing: 0;
  line-height: 1.5;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
}

.price {
  font-size: 12px;
  color: #999999;
  margin: 0;
  text-decoration: line-through;
  font-weight: 400;
}

.discount-price {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  margin: 0;
  letter-spacing: 0;
}

.discount-badge {
  display: inline-block;
  background: #ff3333;
  color: white;
  font-size: 11px;
  padding: 2px 4px;
  border-radius: 2px;
  font-weight: 500;
  margin-left: 4px;
}

.rating {
  font-size: 11px;
  color: #666666;
  margin: 4px 0 0 0;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* レビュー数表示 */
.review-count {
  color: #999999;
  font-size: 11px;
  margin-left: 2px;
}`,
          isVisible: false,
        },
      },
      solutionCodes: [
        {
          code: `import './styles.css'

const App = () => {
  const productName = "スマートウォッチ";
  const brandName = "TechGear";
  
  const imageUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop&crop=center";
  const altText = "スマートウォッチの商品画像";
  
  const price = 12000;
  const discountRate = 0.20;
  const discountBadge = Math.round(discountRate * 100) + '%OFF';
  
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  
  const reviewCount = 128;
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          className="product-image"
          src={imageUrl}
          alt={altText}
        />
      </div>
      <div className="product-info">
        <p className="brand-name">{brandName}</p>
        <h1>{productName}</h1>
        <div className="price-container">
          <p className="discount-price">¥{(price - price * discountRate).toLocaleString()}</p>
          <p className="price">¥{price.toLocaleString()}</p>
          <span className="discount-badge">{discountBadge}</span>
        </div>
        <p className="rating">
          {getStarRating(4)}
          <span className="review-count">({reviewCount})</span>
        </p>
      </div>
    </div>
  )
}

export default App`,
          solutionTargetFile: 'react-app/App.jsx',
          label: 'App.jsx - 解答コード',
        },
      ] as SolutionCode[],
      validation: {
        includes: ['{getStarRating(4)}', "import './styles.css'"],
      },
    },
    {
      stepNumber: 5,
      title: '商品オブジェクトをまとめよう！',
      instruction: `最後に、すべての商品情報を1つのオブジェクトにまとめてみましょう。

オブジェクトにまとめることで、関連するデータを整理して管理しやすくなり、
プロパティ名でアクセスするためコードが読みやすく、データの受け渡しも簡単になります。

オブジェクトの使い方：
\`\`\`javascript
const product = {
  name: "商品名",
  price: 12000
};
// ドット記法でアクセス
console.log(product.name); // "商品名"
console.log(product.price); // 12000
\`\`\`

「product」オブジェクトを作成し、name、brand、price、discountRate、rating、reviewCount、imageUrl、altTextプロパティを持たせてください。
そして、すべてのプロパティを使って商品カードを表示してください。`,
      copyableCode: [
        {
          label: '📝 商品オブジェクトの作成',
          code: `const product = {
  name: "スマートウォッチ",
  brand: "TechGear",
  price: 12000,
  discountRate: 0.20,
  rating: 4,
  reviewCount: 128,
  imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop&crop=center",
  altText: "スマートウォッチの商品画像"
};

const discountBadge = Math.round(product.discountRate * 100) + '%OFF';
const discountedPrice = product.price - product.price * product.discountRate;
const getStarRating = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}
`,
        },
        {
          label: '📝 オブジェクトのプロパティを使った表示',
          code: `return (
  <div className="product-card">
    <div className="product-image-container">
      <img 
        className="product-image"
        src={product.imageUrl}
        alt={product.altText}
      />
    </div>
    <div className="product-info">
      <p className="brand-name">{product.brand}</p>
      <h1>{product.name}</h1>
      <div className="price-container">
        <p className="discount-price">¥{discountedPrice.toLocaleString()}</p>
        <p className="price">¥{product.price.toLocaleString()}</p>
        <span className="discount-badge">{discountBadge}</span>
      </div>
      <p className="rating">
        {getStarRating(product.rating)}
        <span className="review-count">({product.reviewCount})</span>
      </p>
    </div>
  </div>
)`,
        },
      ],
      initialStepFiles: {
        'App.jsx': {
          content: `import './styles.css'

const App = () => {
  
  // ここにproductオブジェクトを作成してください

  const discountBadge = Math.round(product.discountRate * 100) + '%OFF';
  const discountedPrice = product.price - product.price * product.discountRate;
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  } 
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          className="product-image"
          src={/* product.imageUrl */}
          alt={/* product.altText */}
        />
      </div>
      <p className="brand-name">{/* product.brand */}</p>
      <h1>{/* product.name */}</h1>
      <div className="price-container">
        <p className="discount-price">{/* 割引価格 */}</p>
        <p className="price">{/* 定価 */}</p>
        <span className="discount-badge">{/* 割引率 */}</span>
      </div>
      <p className="rating">{/* getStarRatingとレビュー数 */}</p>
    </div>
  )
}

export default App`,
          isVisible: true,
        },
        'styles.css': {
          content: `/* 全体を中央揃えするためのコンテナ */
body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
}

/* 商品カード */
.product-card {
  width: 220px;
  margin: 0;
  padding: 0;
  background: #ffffff;
  border-radius: 0;
  border: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
  overflow: visible;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: translateY(-2px);
}

.product-image-container {
  position: relative;
  width: 100%;
  padding-bottom: 133%; /* 3:4のアスペクト比 */
  background: #f8f8f8;
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  transition: opacity 0.3s ease;
}

.product-image:hover {
  opacity: 0.9;
}

/* 商品情報エリアの共通パディング */
.product-info {
  padding: 12px;
}

.brand-name {
  font-size: 12px;
  color: #333333;
  margin: 8px 0 4px 0;
  font-weight: 400;
  line-height: 1.4;
  height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-card h1 {
  font-size: 13px;
  font-weight: 400;
  color: #333333;
  margin: 0 0 8px 0;
  letter-spacing: 0;
  line-height: 1.5;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
}

.price {
  font-size: 12px;
  color: #999999;
  margin: 0;
  text-decoration: line-through;
  font-weight: 400;
}

.discount-price {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  margin: 0;
  letter-spacing: 0;
}

.discount-badge {
  display: inline-block;
  background: #ff3333;
  color: white;
  font-size: 11px;
  padding: 2px 4px;
  border-radius: 2px;
  font-weight: 500;
  margin-left: 4px;
}

.rating {
  font-size: 11px;
  color: #666666;
  margin: 4px 0 0 0;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* レビュー数表示 */
.review-count {
  color: #999999;
  font-size: 11px;
  margin-left: 2px;
}`,
          isVisible: false,
        },
      },
      solutionCodes: [
        {
          code: `import './styles.css'

const App = () => {
  
  const product = {
    name: "スマートウォッチ",
    brand: "TechGear",
    price: 12000,
    discountRate: 0.20,
    rating: 4,
    reviewCount: 128,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop&crop=center",
    altText: "スマートウォッチの商品画像"
  };
  
  const discountBadge = Math.round(product.discountRate * 100) + '%OFF';
  const discountedPrice = product.price - product.price * product.discountRate;
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          className="product-image"
          src={product.imageUrl}
          alt={product.altText}
        />
      </div>
      <div className="product-info">
        <p className="brand-name">{product.brand}</p>
        <h1>{product.name}</h1>
        <div className="price-container">
          <p className="discount-price">¥{discountedPrice.toLocaleString()}</p>
          <p className="price">¥{product.price.toLocaleString()}</p>
          <span className="discount-badge">{discountBadge}</span>
        </div>
        <p className="rating">
          {getStarRating(product.rating)}
          <span className="review-count">({product.reviewCount})</span>
        </p>
      </div>
    </div>
  )
}

export default App`,
          solutionTargetFile: 'react-app/App.jsx',
          label: 'App.jsx - 解答コード',
        },
      ] as SolutionCode[],
      validation: {
        includes: [
          '{product.name}',
          '{product.brand}',
          '{discountedPrice.toLocaleString()}',
          '{getStarRating(product.rating)}',
          "import './styles.css'",
        ],
      },
    },
  ],

  projectStructure: {
    files: [
      {
        path: 'react-app/App.jsx',
        content: `import './styles.css'

const App = () => {
  // ここに商品名とブランド名の変数を定義してください
  const productName = "???";
  const brandName = "???";
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        {/* 画像はステップ2で追加 */}
      </div>
      <div className="product-info">
        <p className="brand-name">{/* ここにブランド名を表示 */}</p>
        <h1>{/* ここに商品名を表示 */}</h1>
      </div>
    </div>
  )
}

export default App`,
        language: 'javascript',
        description: 'JavaScript変数学習用のReactコンポーネント',
        order: 1,
      },
      {
        path: 'react-app/styles.css',
        content: `/* 全体を中央揃えするためのコンテナ */
body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
}

/* 商品カード */
.product-card {
  width: 220px;
  margin: 0;
  padding: 0;
  background: #ffffff;
  border-radius: 0;
  border: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
  overflow: visible;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: translateY(-2px);
}

.product-image-container {
  position: relative;
  width: 100%;
  padding-bottom: 133%; /* 3:4のアスペクト比 */
  background: #f8f8f8;
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  transition: opacity 0.3s ease;
}

.product-image:hover {
  opacity: 0.9;
}

/* 商品情報エリアの共通パディング */
.product-info {
  padding: 12px;
}

.brand-name {
  font-size: 12px;
  color: #333333;
  margin: 8px 0 4px 0;
  font-weight: 400;
  line-height: 1.4;
  height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-card h1 {
  font-size: 13px;
  font-weight: 400;
  color: #333333;
  margin: 0 0 8px 0;
  letter-spacing: 0;
  line-height: 1.5;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
}

.price {
  font-size: 12px;
  color: #999999;
  margin: 0;
  text-decoration: line-through;
  font-weight: 400;
}

.discount-price {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  margin: 0;
  letter-spacing: 0;
}

.discount-badge {
  display: inline-block;
  background: #ff3333;
  color: white;
  font-size: 11px;
  padding: 2px 4px;
  border-radius: 2px;
  font-weight: 500;
  margin-left: 4px;
}

.rating {
  font-size: 11px;
  color: #666666;
  margin: 4px 0 0 0;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* レビュー数表示 */
.review-count {
  color: #999999;
  font-size: 11px;
  margin-left: 2px;
}
`,
        language: 'css',
        description: '商品カード用のスタイルシート',
        order: 2,
      },
    ],
    defaultFile: 'react-app/App.jsx',
    folderConfig: {
      displayOrder: ['react-app'],
    },
  },

  previousLessonId: 'chapter1-lesson2',
  nextLessonId: 'chapter1-lesson4',
}
