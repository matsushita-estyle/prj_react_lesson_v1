import { Lesson, SolutionCode } from '@/lib/types/lesson'

export const chapter1Lesson4: Lesson = {
  id: 'chapter1-lesson4',
  title: 'コンポーネント分割の実践',
  lessonNumber: 4,
  description: 'コンポーネントを小さな部品に分割して、再利用性を高める方法を学びます',
  difficulty: '中級',

  material: `# コンポーネント分割の実践

前のレッスンでは、商品カード全体を1つのコンポーネント内で作成しました。
今度は、このコンポーネントをより小さな部品に分割して、再利用性を高める方法を学びます。

## なぜコンポーネントを分割するのか？

大きなコンポーネント1つで全てを管理するよりも、小さなコンポーネントに分割することで以下のメリットがあります：

### 1. 再利用性の向上
一度作った小さなコンポーネントは、別の場所でも簡単に使い回せます。

\`\`\`jsx
// 商品画像コンポーネントは色々な場所で使える
<ProductImage src="image1.jpg" alt="商品1" />
<ProductImage src="image2.jpg" alt="商品2" />
\`\`\`

### 2. 保守性の向上
問題が発生した時に、どの部分を修正すれば良いかが明確になります。

### 3. 理解しやすいコード
各コンポーネントが1つの役割に集中するため、コードが読みやすくなります。

## React コンポーネント分割の基本ルール

### ルール1: 1ファイル1コンポーネント

\`\`\`jsx
// ProductCard.jsx
const ProductCard = () => {
  return <div className="product-card">...</div>
}

export default ProductCard
\`\`\`

### ルール2: import/export でモジュール化

\`\`\`jsx
// App.jsx
import ProductCard from './ProductCard'

const App = () => {
  return (
    <div>
      <ProductCard />
    </div>
  )
}
\`\`\`

### ルール3: 役割ごとにコンポーネントを分ける

商品カードの例：
- **ProductCard**: 全体のレイアウト
- **ProductImage**: 商品画像の表示
- **ProductInfo**: 商品情報の表示

## コンポーネント分割の戦略

今回は以下のような構造に分割していきます：

\`\`\`
App (親コンポーネント)
└── ProductCard (商品カード)
    ├── ProductImage (商品画像)
    └── ProductInfo (商品情報)
\`\`\`

各コンポーネントの役割：

### ProductImage
- 商品画像の表示
- 画像のスタイリング
- alt属性の管理

### ProductInfo  
- 商品名、価格、評価の表示
- 価格計算ロジック
- 星評価の生成

### ProductCard
- 全体のレイアウト
- 他のコンポーネントの組み合わせ

## 分割作業の流れ

1. **元の大きなコンポーネントを理解する**
2. **責任範囲でコンポーネントを分ける**
3. **各コンポーネントを別ファイルに作成**
4. **import/export でつなげる**
5. **動作確認とテスト**

この流れで、保守性が高く再利用可能なコンポーネント設計を学んでいきましょう！`,

  taskDescription: `
前のレッスンで作った商品カードを、再利用可能なコンポーネントに分割していきます。
少しずつ機能を切り分けて、保守しやすいコンポーネント構造を作りましょう！
  `,

  // 段階的な課題
  steps: [
    {
      stepNumber: 1,
      title: '商品カードコンポーネントを別ファイルに分割しよう！',
      instruction: `最初のステップとして、商品カードを別ファイルに分割しましょう。
現在App.jsxに書かれている商品カードのコードを、新しく作るProductCard.jsxファイルに移動させます。

手順：
1. 下の「ProductCard.jsxを作成」ボタンを押して空のファイルを作成する
2. ProductCardコンポーネントとしてexport defaultする
3. App.jsxから商品カードに関連するコードをコピーする
4. App.jsxでProductCardをimportして使用する`,
      addFile: {
        fileName: 'ProductCard.jsx',
        label: '📁 ProductCard.jsxを作成',
        initialContent: '',
      },
      copyableCode: [
        {
          label: '📦 ProductCard.jsxの基本構造',
          code: `import './styles.css'

const ProductCard = () => {
  // ここに商品カードのロジックを移動
  return (
    // ここに商品カードのJSXを移動
  )
}

export default ProductCard`,
        },
        {
          label: '⚙️ 商品カードの関数・データ',
          code: `const getStarRating = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

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

const discountPercent = Math.round(product.discountRate * 100);
const discountedPrice = product.price - product.price * product.discountRate;`,
        },
        {
          label: '🎨 商品カード表示のJSX',
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
        <span className="discount-badge">{discountPercent}%OFF</span>
      </div>
      <p className="rating">
        {getStarRating(product.rating)}
        <span className="review-count">({product.reviewCount})</span>
      </p>
    </div>
  </div>
)`,
        },
        {
          label: '📥 App.jsxでのimport文',
          code: `import ProductCard from './ProductCard'

const App = () => {
  return (
    <div>
      <ProductCard />
    </div>
  )
}

export default App`,
        },
      ],
      initialStepFiles: {
        'App.jsx': {
          content: `import './styles.css'

const App = () => {
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  
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

  const discountPercent = Math.round(product.discountRate * 100);
  const discountedPrice = product.price - product.price * product.discountRate;
  
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
          <span className="discount-badge">{discountPercent}%OFF</span>
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
          isVisible: true,
        },
        'styles.css': {
          content: `/* 全体の基本設定 */
body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
}

/* app-containerがある場合は通常のレイアウト */
.app-container {
  width: 100%;
  max-width: 1200px;
}

/* 商品カード */
.product-card {
  width: 200px;
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
  padding: 0 10px 10px 10px;
}

.brand-name {
  font-size: 11px;
  color: #333333;
  margin: 6px 0 3px 0;
  font-weight: 400;
  line-height: 1.3;
  height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-card h1 {
  font-size: 12px;
  font-weight: 400;
  color: #333333;
  margin: 0 0 6px 0;
  letter-spacing: 0;
  line-height: 1.4;
  height: 34px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin-bottom: 3px;
  flex-wrap: wrap;
}

.price {
  font-size: 11px;
  color: #999999;
  margin: 0;
  text-decoration: line-through;
  font-weight: 400;
}

.discount-price {
  font-size: 13px;
  font-weight: 500;
  color: #333333;
  margin: 0;
  letter-spacing: 0;
}

.discount-badge {
  display: inline-block;
  background: #ff3333;
  color: white;
  font-size: 10px;
  padding: 1px 3px;
  border-radius: 2px;
  font-weight: 500;
  margin-left: 2px;
}

.rating {
  font-size: 10px;
  color: #666666;
  margin: 3px 0 0 0;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 3px;
}

/* レビュー数表示 */
.review-count {
  color: #999999;
  font-size: 10px;
  margin-left: 1px;
}

/* アプリ全体のレイアウト */
.app-container {
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.category-path {
  font-size: 14px;
  color: #666666;
  margin-bottom: 24px;
}

.product-grid {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  align-items: start;
  flex-wrap: wrap;
  padding: 0;
  margin: 0 auto;
  max-width: 416px; /* 200px × 2 + gap 16px = 416px */
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .product-card {
    width: 160px;
  }
  
  .product-grid {
    gap: 12px;
  }
  
  .app-container {
    padding: 16px;
  }
  
  .app-title {
    font-size: 18px;
    margin-bottom: 20px;
  }
}`,
          isVisible: false,
        },
      },
      solutionCodes: [
        {
          code: `import ProductCard from './ProductCard'

const App = () => {
  return (
    <div>
      <ProductCard />
    </div>
  )
}

export default App`,
          solutionTargetFile: 'react-app/App.jsx',
          label: 'App.jsx - ProductCardのインポート',
        },
        {
          code: `import './styles.css'

const ProductCard = () => {
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  
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

  const discountPercent = Math.round(product.discountRate * 100);
  const discountedPrice = product.price - product.price * product.discountRate;
  
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
          <span className="discount-badge">{discountPercent}%OFF</span>
        </div>
        <p className="rating">
          {getStarRating(product.rating)}
          <span className="review-count">({product.reviewCount})</span>
        </p>
      </div>
    </div>
  )
}

export default ProductCard`,
          solutionTargetFile: 'react-app/ProductCard.jsx',
          label: 'ProductCard.jsx - 完全なコンポーネント',
        },
      ] as SolutionCode[],
      validation: {
        includes: ['import ProductCard', "from './ProductCard'"],
      },
    },
    {
      stepNumber: 2,
      title: '画像部分を別コンポーネント化しよう！',
      instruction: `次に、商品画像部分を別コンポーネントに分割します。
ProductImage.jsxファイルを作成しましょう。

実装する内容：
- 商品画像を表示するProductImageコンポーネント
- ProductCard.jsxから呼び出す
- 画像関連のスタイルも適用`,
      addFile: {
        fileName: 'ProductImage.jsx',
        label: '📁 ProductImage.jsxを作成',
        initialContent: '',
      },
      copyableCode: [
        {
          label: '🖼️ ProductImageコンポーネントの基本構造',
          code: `const ProductImage = () => {
  const product = {
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop&crop=center",
    altText: "スマートウォッチの商品画像"
  };

  return (
    <div className="product-image-container">
      <img
        className="product-image"
        src={product.imageUrl}
        alt={product.altText}
      />
    </div>
  );
}

export default ProductImage`,
        },
        {
          label: '📦 ProductCardでのProductImageインポート',
          code: `import ProductImage from './ProductImage'`,
        },
        {
          label: '📦 ProductCardでのProductImageの使用',
          code: `<ProductImage />`,
        },
      ],
      initialStepFiles: {
        'App.jsx': {
          content: `import ProductCard from './ProductCard'

const App = () => {
  return (
    <div>
      <ProductCard />
    </div>
  )
}

export default App`,
          isVisible: false,
        },
        'ProductCard.jsx': {
          content: `import './styles.css'

const ProductCard = () => {
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  
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

  const discountPercent = Math.round(product.discountRate * 100);
  const discountedPrice = product.price - product.price * product.discountRate;
  
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
          <span className="discount-badge">{discountPercent}%OFF</span>
        </div>
        <p className="rating">
          {getStarRating(product.rating)}
          <span className="review-count">({product.reviewCount})</span>
        </p>
      </div>
    </div>
  )
}

export default ProductCard`,
          isVisible: true,
        },
        'ProductImage.jsx': {
          content: `// ここにProductImageコンポーネントを作成してください`,
          isVisible: false,
        },
        'styles.css': {
          content: `/* 全体の基本設定 */
body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
}

/* app-containerがある場合は通常のレイアウト */
.app-container {
  width: 100%;
  max-width: 1200px;
}

/* 商品カード */
.product-card {
  width: 200px;
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
  padding: 0 10px 10px 10px;
}

.brand-name {
  font-size: 11px;
  color: #333333;
  margin: 6px 0 3px 0;
  font-weight: 400;
  line-height: 1.3;
  height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-card h1 {
  font-size: 12px;
  font-weight: 400;
  color: #333333;
  margin: 0 0 6px 0;
  letter-spacing: 0;
  line-height: 1.4;
  height: 34px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin-bottom: 3px;
  flex-wrap: wrap;
}

.price {
  font-size: 11px;
  color: #999999;
  margin: 0;
  text-decoration: line-through;
  font-weight: 400;
}

.discount-price {
  font-size: 13px;
  font-weight: 500;
  color: #333333;
  margin: 0;
  letter-spacing: 0;
}

.discount-badge {
  display: inline-block;
  background: #ff3333;
  color: white;
  font-size: 10px;
  padding: 1px 3px;
  border-radius: 2px;
  font-weight: 500;
  margin-left: 2px;
}

.rating {
  font-size: 10px;
  color: #666666;
  margin: 3px 0 0 0;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 3px;
}

/* レビュー数表示 */
.review-count {
  color: #999999;
  font-size: 10px;
  margin-left: 1px;
}

/* アプリ全体のレイアウト */
.app-container {
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.category-path {
  font-size: 14px;
  color: #666666;
  margin-bottom: 24px;
}

.product-grid {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  align-items: start;
  flex-wrap: wrap;
  padding: 0;
  margin: 0 auto;
  max-width: 416px; /* 200px × 2 + gap 16px = 416px */
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .product-card {
    width: 160px;
  }
  
  .product-grid {
    gap: 12px;
  }
  
  .app-container {
    padding: 16px;
  }
  
  .app-title {
    font-size: 18px;
    margin-bottom: 20px;
  }
}`,
          isVisible: false,
        },
      },
      solutionCodes: [
        {
          code: `const ProductImage = () => {
  const product = {
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop&crop=center",
    altText: "スマートウォッチの商品画像"
  };

  return (
    <div className="product-image-container">
      <img 
        className="product-image"
        src={product.imageUrl}
        alt={product.altText}
      />
    </div>
  );
}

export default ProductImage`,
          solutionTargetFile: 'react-app/ProductImage.jsx',
          label: 'ProductImage.jsx - 画像コンポーネント',
        },
        {
          code: `import './styles.css'
import ProductImage from './ProductImage'

const ProductCard = () => {
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    brand: "TechGear",
    price: 12000,
    discountRate: 0.20,
    rating: 4,
    reviewCount: 128
  };

  const discountPercent = Math.round(product.discountRate * 100);
  const discountedPrice = product.price - product.price * product.discountRate;
  
  return (
    <div className="product-card">
      <ProductImage />
      <div className="product-info">
        <p className="brand-name">{product.brand}</p>
        <h1>{product.name}</h1>
        <div className="price-container">
          <p className="discount-price">¥{discountedPrice.toLocaleString()}</p>
          <p className="price">¥{product.price.toLocaleString()}</p>
          <span className="discount-badge">{discountPercent}%OFF</span>
        </div>
        <p className="rating">
          {getStarRating(product.rating)}
          <span className="review-count">({product.reviewCount})</span>
        </p>
      </div>
    </div>
  )
}

export default ProductCard`,
          solutionTargetFile: 'react-app/ProductCard.jsx',
          label: 'ProductCard.jsx - ProductImageを使用',
        },
      ] as SolutionCode[],
      validation: {
        includes: ['<img', 'className="product-image"', 'export default ProductImage'],
      },
    },
    {
      stepNumber: 3,
      title: '商品情報部分を別コンポーネント化しよう！',
      instruction: `次に、商品情報部分を別コンポーネントに分割します。
ProductInfo.jsxファイルを作成して、商品情報表示の責任を持たせましょう。

手順：
1. 下の「ProductInfo.jsxを作成」ボタンを押して空のファイルを作成する
2. ProductInfoコンポーネントとしてexport defaultする
3. ProductCard.jsxから商品情報に関連するコードをコピーする
4. getStarRating関数もProductInfo内に移動する
5. ProductCard.jsxでProductInfoをimportして使用する`,
      addFile: {
        fileName: 'ProductInfo.jsx',
        label: '📁 ProductInfo.jsxを作成',
        initialContent: '',
      },
      copyableCode: [
        {
          label: '📋 ProductInfoコンポーネントの基本構造',
          code: `const ProductInfo = () => {
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    brand: "TechGear",
    price: 12000,
    discountRate: 0.20,
    rating: 4,
    reviewCount: 128
  };

  const discountPercent = Math.round(product.discountRate * 100);
  const discountedPrice = product.price - product.price * product.discountRate;

  return (
    <div className="product-info">
      <p className="brand-name">{product.brand}</p>
      <h1>{product.name}</h1>
      <div className="price-container">
        <p className="discount-price">¥{discountedPrice.toLocaleString()}</p>
        <p className="price">¥{product.price.toLocaleString()}</p>
        <span className="discount-badge">{discountPercent}%OFF</span>
      </div>
      <p className="rating">
        {getStarRating(product.rating)}
        <span className="review-count">({product.reviewCount})</span>
      </p>
    </div>
  );
}

export default ProductInfo`,
        },
        {
          label: '📦 ProductCardでのProductInfo使用',
          code: `import './styles.css'
import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'

const ProductCard = () => {
  return (
    <div className="product-card">
      <ProductImage />
      <ProductInfo />
    </div>
  )
}

export default ProductCard`,
        },
      ],
      initialStepFiles: {
        'App.jsx': {
          content: `import ProductCard from './ProductCard'

const App = () => {
  return (
    <div>
      <ProductCard />
    </div>
  )
}

export default App`,
          isVisible: false,
        },
        'ProductCard.jsx': {
          content: `import './styles.css'
import ProductImage from './ProductImage'

const ProductCard = () => {
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    brand: "TechGear",
    price: 12000,
    discountRate: 0.20,
    rating: 4,
    reviewCount: 128
  };

  const discountPercent = Math.round(product.discountRate * 100);
  const discountedPrice = product.price - product.price * product.discountRate;
  
  return (
    <div className="product-card">
      <ProductImage />
      <div className="product-info">
        <p className="brand-name">{product.brand}</p>
        <h1>{product.name}</h1>
        <div className="price-container">
          <p className="discount-price">¥{discountedPrice.toLocaleString()}</p>
          <p className="price">¥{product.price.toLocaleString()}</p>
          <span className="discount-badge">{discountPercent}%OFF</span>
        </div>
        <p className="rating">
          {getStarRating(product.rating)}
          <span className="review-count">({product.reviewCount})</span>
        </p>
      </div>
    </div>
  )
}

export default ProductCard`,
          isVisible: true,
        },
        'ProductImage.jsx': {
          content: `const ProductImage = () => {
  const product = {
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop&crop=center",
    altText: "スマートウォッチの商品画像"
  };

  return (
    <div className="product-image-container">
      <img 
        className="product-image"
        src={product.imageUrl}
        alt={product.altText}
      />
    </div>
  );
}

export default ProductImage`,
          isVisible: false,
        },
        'ProductInfo.jsx': {
          content: `// ここにProductInfoコンポーネントを作成してください`,
          isVisible: false,
        },
        'styles.css': {
          content: `/* 全体の基本設定 */
body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
}

/* app-containerがある場合は通常のレイアウト */
.app-container {
  width: 100%;
  max-width: 1200px;
}

/* 商品カード */
.product-card {
  width: 200px;
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
  padding: 0 10px 10px 10px;
}

.brand-name {
  font-size: 11px;
  color: #333333;
  margin: 6px 0 3px 0;
  font-weight: 400;
  line-height: 1.3;
  height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-card h1 {
  font-size: 12px;
  font-weight: 400;
  color: #333333;
  margin: 0 0 6px 0;
  letter-spacing: 0;
  line-height: 1.4;
  height: 34px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin-bottom: 3px;
  flex-wrap: wrap;
}

.price {
  font-size: 11px;
  color: #999999;
  margin: 0;
  text-decoration: line-through;
  font-weight: 400;
}

.discount-price {
  font-size: 13px;
  font-weight: 500;
  color: #333333;
  margin: 0;
  letter-spacing: 0;
}

.discount-badge {
  display: inline-block;
  background: #ff3333;
  color: white;
  font-size: 10px;
  padding: 1px 3px;
  border-radius: 2px;
  font-weight: 500;
  margin-left: 2px;
}

.rating {
  font-size: 10px;
  color: #666666;
  margin: 3px 0 0 0;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 3px;
}

/* レビュー数表示 */
.review-count {
  color: #999999;
  font-size: 10px;
  margin-left: 1px;
}

/* アプリ全体のレイアウト */
.app-container {
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.category-path {
  font-size: 14px;
  color: #666666;
  margin-bottom: 24px;
}

.product-grid {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  align-items: start;
  flex-wrap: wrap;
  padding: 0;
  margin: 0 auto;
  max-width: 416px; /* 200px × 2 + gap 16px = 416px */
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .product-card {
    width: 160px;
  }
  
  .product-grid {
    gap: 12px;
  }
  
  .app-container {
    padding: 16px;
  }
  
  .app-title {
    font-size: 18px;
    margin-bottom: 20px;
  }
}`,
          isVisible: false,
        },
      },
      solutionCodes: [
        {
          code: `const ProductInfo = () => {
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    brand: "TechGear",
    price: 12000,
    discountRate: 0.20,
    rating: 4,
    reviewCount: 128
  };

  const discountPercent = Math.round(product.discountRate * 100);
  const discountedPrice = product.price - product.price * product.discountRate;

  return (
    <div className="product-info">
      <p className="brand-name">{product.brand}</p>
      <h1>{product.name}</h1>
      <div className="price-container">
        <p className="discount-price">¥{discountedPrice.toLocaleString()}</p>
        <p className="price">¥{product.price.toLocaleString()}</p>
        <span className="discount-badge">{discountPercent}%OFF</span>
      </div>
      <p className="rating">
        {getStarRating(product.rating)}
        <span className="review-count">({product.reviewCount})</span>
      </p>
    </div>
  );
}

export default ProductInfo`,
          solutionTargetFile: 'react-app/ProductInfo.jsx',
          label: 'ProductInfo.jsx - 商品情報コンポーネント',
        },
        {
          code: `import './styles.css'
import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'

const ProductCard = () => {
  return (
    <div className="product-card">
      <ProductImage />
      <ProductInfo />
    </div>
  )
}

export default ProductCard`,
          solutionTargetFile: 'react-app/ProductCard.jsx',
          label: 'ProductCard.jsx - ProductInfoを追加',
        },
      ] as SolutionCode[],
      validation: {
        includes: ['<h1>', '<p className="price">', 'getStarRating', 'export default ProductInfo'],
      },
    },
    {
      stepNumber: 4,
      title: 'Propsでデータを管理しよう',
      instruction: `コンポーネント分割ができました。次は、各コンポーネントにハードコーディングされているデータをProps（プロパティ）を使って外部から渡すように改善しましょう。

Propsを使うことで：
- コンポーネントの再利用性が向上
- データの一元管理ができる
- 異なる商品データで同じコンポーネントを使いまわせる

実装する内容：
- App.jsxで商品データを定義
- ProductCard → ProductImage, ProductInfoへpropsでデータを渡す
- 各コンポーネントのハードコーディングされたデータを削除`,
      copyableCode: [
        {
          label: '📦 App.jsxで商品データを定義し、複数のProductCardを表示',
          code: `import ProductCard from './ProductCard'
import './styles.css'

const App = () => {
  // 4つの異なる商品データを定義
  const products = [
    {
      id: 1,
      name: "スマートウォッチ",
      brand: "TechGear",
      price: 12000,
      discountRate: 0.20,
      rating: 4,
      reviewCount: 128,
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop&crop=center",
      altText: "スマートウォッチの商品画像"
    },
    {
      id: 2,
      name: "ワイヤレスイヤホン",
      brand: "SoundMax",
      price: 8000,
      discountRate: 0.15,
      rating: 5,
      reviewCount: 95,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=533&fit=crop&crop=center",
      altText: "ワイヤレスイヤホンの商品画像"
    },
    {
      id: 3,
      name: "デジタルカメラ",
      brand: "PhotoMax",
      price: 28000,
      discountRate: 0.15,
      rating: 5,
      reviewCount: 89,
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=533&fit=crop&crop=center",
      altText: "デジタルカメラの商品画像"
    },
    {
      id: 4,
      name: "Bluetoothスピーカー",
      brand: "AudioWave",
      price: 15000,
      discountRate: 0.25,
      rating: 5,
      reviewCount: 203,
      imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=533&fit=crop&crop=center",
      altText: "Bluetoothスピーカーの商品画像"
    }
  ];

  return (
    <div className="app-container">
      <p className="category-path">All › 電化製品 › スマートデバイス</p>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default App`,
        },
        {
          label: '🔧 ProductCard.jsxをProps対応に修正',
          code: `import './styles.css'
import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <ProductImage product={product} />
      <ProductInfo product={product} />
    </div>
  )
}

export default ProductCard`,
        },
        {
          label: '🖼️ ProductImage.jsxをProps対応に修正',
          code: `const ProductImage = ({ product }) => {
  return (
    <div className="product-image-container">
      <img 
        className="product-image"
        src={product.imageUrl}
        alt={product.altText}
      />
    </div>
  );
}

export default ProductImage`,
        },
        {
          label: '📋 ProductInfo.jsxをProps対応に修正',
          code: `const ProductInfo = ({ product }) => {
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  const discountPercent = Math.round(product.discountRate * 100);
  const discountedPrice = product.price - product.price * product.discountRate;

  return (
    <div className="product-info">
      <p className="brand-name">{product.brand}</p>
      <h1>{product.name}</h1>
      <div className="price-container">
        <p className="discount-price">¥{discountedPrice.toLocaleString()}</p>
        <p className="price">¥{product.price.toLocaleString()}</p>
        <span className="discount-badge">{discountPercent}%OFF</span>
      </div>
      <p className="rating">
        {getStarRating(product.rating)}
        <span className="review-count">({product.reviewCount})</span>
      </p>
    </div>
  );
}

export default ProductInfo`,
        },
      ],
      initialStepFiles: {
        'App.jsx': {
          content: `import ProductCard from './ProductCard'

const App = () => {
  return (
    <div>
      <ProductCard />
    </div>
  )
}

export default App`,
          isVisible: false,
        },
        'ProductCard.jsx': {
          content: `import './styles.css'
import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'

const ProductCard = () => {
  return (
    <div className="product-card">
      <ProductImage />
      <ProductInfo />
    </div>
  )
}

export default ProductCard`,
          isVisible: false,
        },
        'ProductImage.jsx': {
          content: `const ProductImage = () => {
  const product = {
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop&crop=center",
    altText: "スマートウォッチの商品画像"
  };

  return (
    <div className="product-image-container">
      <img 
        className="product-image"
        src={product.imageUrl}
        alt={product.altText}
      />
    </div>
  );
}

export default ProductImage`,
          isVisible: false,
        },
        'ProductInfo.jsx': {
          content: `const ProductInfo = () => {
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    brand: "TechGear",
    price: 12000,
    discountRate: 0.20,
    rating: 4,
    reviewCount: 128
  };

  const discountPercent = Math.round(product.discountRate * 100);
  const discountedPrice = product.price - product.price * product.discountRate;

  return (
    <div className="product-info">
      <p className="brand-name">{product.brand}</p>
      <h1>{product.name}</h1>
      <div className="price-container">
        <p className="discount-price">¥{discountedPrice.toLocaleString()}</p>
        <p className="price">¥{product.price.toLocaleString()}</p>
        <span className="discount-badge">{discountPercent}%OFF</span>
      </div>
      <p className="rating">
        {getStarRating(product.rating)}
        <span className="review-count">({product.reviewCount})</span>
      </p>
    </div>
  );
}

export default ProductInfo`,
          isVisible: false,
        },
        'styles.css': {
          content: `/* 全体の基本設定 */
body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
}

/* app-containerがある場合は通常のレイアウト */
.app-container {
  width: 100%;
  max-width: 1200px;
}

/* 商品カード */
.product-card {
  width: 200px;
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
  padding: 0 10px 10px 10px;
}

.brand-name {
  font-size: 11px;
  color: #333333;
  margin: 6px 0 3px 0;
  font-weight: 400;
  line-height: 1.3;
  height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-card h1 {
  font-size: 12px;
  font-weight: 400;
  color: #333333;
  margin: 0 0 6px 0;
  letter-spacing: 0;
  line-height: 1.4;
  height: 34px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin-bottom: 3px;
  flex-wrap: wrap;
}

.price {
  font-size: 11px;
  color: #999999;
  margin: 0;
  text-decoration: line-through;
  font-weight: 400;
}

.discount-price {
  font-size: 13px;
  font-weight: 500;
  color: #333333;
  margin: 0;
  letter-spacing: 0;
}

.discount-badge {
  display: inline-block;
  background: #ff3333;
  color: white;
  font-size: 10px;
  padding: 1px 3px;
  border-radius: 2px;
  font-weight: 500;
  margin-left: 2px;
}

.rating {
  font-size: 10px;
  color: #666666;
  margin: 3px 0 0 0;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 3px;
}

/* レビュー数表示 */
.review-count {
  color: #999999;
  font-size: 10px;
  margin-left: 1px;
}

/* アプリ全体のレイアウト */
.app-container {
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.category-path {
  font-size: 14px;
  color: #666666;
  margin-bottom: 24px;
}

.product-grid {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  align-items: start;
  flex-wrap: wrap;
  padding: 0;
  margin: 0 auto;
  max-width: 416px; /* 200px × 2 + gap 16px = 416px */
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .product-card {
    width: 160px;
  }
  
  .product-grid {
    gap: 12px;
  }
  
  .app-container {
    padding: 16px;
  }
  
  .app-title {
    font-size: 18px;
    margin-bottom: 20px;
  }
}`,
          isVisible: false,
        },
      },
      solutionCodes: [
        {
          code: `import ProductCard from './ProductCard'
import './styles.css'

const App = () => {
  // 4つの異なる商品データを定義
  const products = [
    {
      id: 1,
      name: "スマートウォッチ",
      brand: "TechGear",
      price: 12000,
      discountRate: 0.20,
      rating: 4,
      reviewCount: 128,
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop&crop=center",
      altText: "スマートウォッチの商品画像"
    },
    {
      id: 2,
      name: "ワイヤレスイヤホン",
      brand: "SoundMax",
      price: 8000,
      discountRate: 0.15,
      rating: 5,
      reviewCount: 95,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=533&fit=crop&crop=center",
      altText: "ワイヤレスイヤホンの商品画像"
    },
    {
      id: 3,
      name: "デジタルカメラ",
      brand: "PhotoMax",
      price: 28000,
      discountRate: 0.15,
      rating: 5,
      reviewCount: 89,
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=533&fit=crop&crop=center",
      altText: "デジタルカメラの商品画像"
    },
    {
      id: 4,
      name: "Bluetoothスピーカー",
      brand: "AudioWave",
      price: 15000,
      discountRate: 0.25,
      rating: 5,
      reviewCount: 203,
      imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=533&fit=crop&crop=center",
      altText: "Bluetoothスピーカーの商品画像"
    }
  ];

  return (
    <div className="app-container">
      <p className="category-path">All › 電化製品 › スマートデバイス</p>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default App`,
          solutionTargetFile: 'react-app/App.jsx',
          label: 'App.jsx - 複数の商品カード表示',
        },
        {
          code: `import './styles.css'
import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <ProductImage product={product} />
      <ProductInfo product={product} />
    </div>
  )
}

export default ProductCard`,
          solutionTargetFile: 'react-app/ProductCard.jsx',
          label: 'ProductCard.jsx - propsを受け取って子コンポーネントに渡す',
        },
        {
          code: `const ProductImage = ({ product }) => {
  return (
    <div className="product-image-container">
      <img 
        className="product-image"
        src={product.imageUrl}
        alt={product.altText}
      />
    </div>
  );
}

export default ProductImage`,
          solutionTargetFile: 'react-app/ProductImage.jsx',
          label: 'ProductImage.jsx - propsから商品データを受け取る',
        },
        {
          code: `const ProductInfo = ({ product }) => {
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  
  const discountPercent = Math.round(product.discountRate * 100);
  const discountedPrice = product.price - product.price * product.discountRate;

  return (
    <div className="product-info">
      <p className="brand-name">{product.brand}</p>
      <h1>{product.name}</h1>
      <div className="price-container">
        <p className="discount-price">¥{discountedPrice.toLocaleString()}</p>
        <p className="price">¥{product.price.toLocaleString()}</p>
        <span className="discount-badge">{discountPercent}%OFF</span>
      </div>
      <p className="rating">
        {getStarRating(product.rating)}
        <span className="review-count">({product.reviewCount})</span>
      </p>
    </div>
  );
}

export default ProductInfo`,
          solutionTargetFile: 'react-app/ProductInfo.jsx',
          label: 'ProductInfo.jsx - propsから商品データを受け取る',
        },
      ] as SolutionCode[],
      validation: {
        includes: ['<ProductCard />', 'product-grid', 'app-title'],
      },
    },
  ],

  projectStructure: {
    files: [
      {
        path: 'react-app/App.jsx',
        content: `import './styles.css'

const App = () => {
  const getStarRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  
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

  const discountPercent = Math.round(product.discountRate * 100);
  const discountedPrice = product.price - product.price * product.discountRate;
  
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
          <span className="discount-badge">{discountPercent}%OFF</span>
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
        language: 'javascript',
        description: 'メインアプリケーション（コンポーネント分割前）',
        order: 1,
      },
      {
        path: 'react-app/styles.css',
        content: `/* 全体の基本設定 */
body {
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', sans-serif;
}

/* app-containerがある場合は通常のレイアウト */
.app-container {
  width: 100%;
  max-width: 1200px;
}

/* 商品カード */
.product-card {
  width: 200px;
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
  padding: 0 10px 10px 10px;
}

.brand-name {
  font-size: 11px;
  color: #333333;
  margin: 6px 0 3px 0;
  font-weight: 400;
  line-height: 1.3;
  height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-card h1 {
  font-size: 12px;
  font-weight: 400;
  color: #333333;
  margin: 0 0 6px 0;
  letter-spacing: 0;
  line-height: 1.4;
  height: 34px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin-bottom: 3px;
  flex-wrap: wrap;
}

.price {
  font-size: 11px;
  color: #999999;
  margin: 0;
  text-decoration: line-through;
  font-weight: 400;
}

.discount-price {
  font-size: 13px;
  font-weight: 500;
  color: #333333;
  margin: 0;
  letter-spacing: 0;
}

.discount-badge {
  display: inline-block;
  background: #ff3333;
  color: white;
  font-size: 10px;
  padding: 1px 3px;
  border-radius: 2px;
  font-weight: 500;
  margin-left: 2px;
}

.rating {
  font-size: 10px;
  color: #666666;
  margin: 3px 0 0 0;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 3px;
}

/* レビュー数表示 */
.review-count {
  color: #999999;
  font-size: 10px;
  margin-left: 1px;
}

/* アプリ全体のレイアウト */
.app-container {
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.category-path {
  font-size: 14px;
  color: #666666;
  margin-bottom: 24px;
}

.product-grid {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  align-items: start;
  flex-wrap: wrap;
  padding: 0;
  margin: 0 auto;
  max-width: 416px; /* 200px × 2 + gap 16px = 416px */
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .product-card {
    width: 160px;
  }
  
  .product-grid {
    gap: 12px;
  }
  
  .app-container {
    padding: 16px;
  }
  
  .app-title {
    font-size: 18px;
    margin-bottom: 20px;
  }
}`,
        language: 'css',
        description: 'アプリケーション全体のスタイルシート',
        order: 2,
      },
    ],
    defaultFile: 'react-app/App.jsx',
    folderConfig: {
      displayOrder: ['react-app'],
    },
  },

  previousLessonId: 'chapter1-lesson3',
  nextLessonId: 'chapter1-lesson5',
}
