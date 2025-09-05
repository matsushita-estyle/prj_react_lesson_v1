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
前のレッスンで作った商品カードを、再利用可能な小さなコンポーネントに分割していきます。
段階的に分割作業を進めて、モジュール化されたコンポーネント設計を体験しましょう！
  `,

  // 段階的な課題
  steps: [
    {
      stepNumber: 1,
      title: 'ProductCardコンポーネントを別ファイルに分割しよう',
      instruction: `最初のステップとして、商品カード全体を別ファイルに分割します。
ProductCard.jsxファイルを作成し、App.jsxから商品カードの部分を移動させてください。

重要なポイント：
- export defaultでProductCardをエクスポート
- App.jsxでimportして使用
- getStarRating関数も一緒に移動`,
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
        'App.jsx': `import './styles.css'

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
        'ProductCard.jsx': `// ここにProductCardコンポーネントを作成してください`,
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
      title: 'ProductImageコンポーネントを作成しよう',
      instruction: `次に、商品画像の部分を専用のコンポーネントに分割します。
ProductImage.jsxファイルを作成し、画像表示の責任を持たせます。

実装する内容：
- 商品画像を表示するProductImageコンポーネント
- ProductCard.jsxから呼び出す
- 画像関連のスタイルも適用`,
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
          label: '📦 ProductCardでのProductImage使用',
          code: `import ProductImage from './ProductImage'

// ProductCardコンポーネント内で
<ProductImage />`,
        },
      ],
      initialStepFiles: {
        'App.jsx': `import ProductCard from './ProductCard'

const App = () => {
  return (
    <div>
      <ProductCard />
    </div>
  )
}

export default App`,
        'ProductCard.jsx': `import './styles.css'

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
        'ProductImage.jsx': `// ここにProductImageコンポーネントを作成してください`,
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
      title: 'ProductInfoコンポーネントを作成しよう',
      instruction: `商品情報（名前、価格、評価）を表示する専用のコンポーネントを作成します。
ProductInfo.jsxファイルを作成し、商品情報表示の責任を持たせましょう。

実装する内容：
- 商品名、価格、割引価格、評価を表示
- getStarRating関数をProductInfo内に移動
- ProductCard.jsxから呼び出す`,
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
          code: `import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'

const ProductCard = () => {
  return (
    <div className="product-card">
      <ProductImage />
      <ProductInfo />
    </div>
  )
}`,
        },
      ],
      initialStepFiles: {
        'App.jsx': `import ProductCard from './ProductCard'

const App = () => {
  return (
    <div>
      <ProductCard />
    </div>
  )
}

export default App`,
        'ProductCard.jsx': `import './styles.css'
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
        'ProductImage.jsx': `const ProductImage = () => {
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
        'ProductInfo.jsx': `// ここにProductInfoコンポーネントを作成してください`,
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
      title: 'ProductCardで分割したコンポーネントを組み合わせよう',
      instruction: `ProductCardコンポーネントで、ProductImageとProductInfoを組み合わせて使用しましょう。
これでコンポーネントの分割が完成します。

実装する内容：
- ProductCard.jsxでProductImageとProductInfoをimport
- 不要になったロジックを削除
- きれいなレイアウトコンポーネントとして完成`,
      copyableCode: [
        {
          label: '🏗️ 完成したProductCardの構造',
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
        'App.jsx': `import ProductCard from './ProductCard'

const App = () => {
  return (
    <div>
      <ProductCard />
    </div>
  )
}

export default App`,
        'ProductCard.jsx': `import './styles.css'
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
        'ProductImage.jsx': `const ProductImage = () => {
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
        'ProductInfo.jsx': `const ProductInfo = () => {
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
      solutionCodes: [
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
          label: 'ProductCard.jsx - 完成版',
        },
      ] as SolutionCode[],
      validation: {
        includes: [
          'import ProductImage',
          'import ProductInfo',
          '<ProductImage />',
          '<ProductInfo />',
        ],
      },
    },
    {
      stepNumber: 5,
      title: 'コンポーネントの再利用性を確認しよう',
      instruction: `最後に、作成したコンポーネントの再利用性を確認します。
App.jsxで複数のProductCardを表示して、コンポーネント分割の効果を体感しましょう。

実装する内容：
- App.jsxで4つのProductCardを表示
- 各ProductCardが独立して動作することを確認
- レイアウトの調整`,
      copyableCode: [
        {
          label: '🔄 複数のProductCardを表示',
          code: `import ProductCard from './ProductCard'

const App = () => {
  return (
    <div className="app-container">
      <p className="category-path">All › 電化製品 › スマートデバイス</p>
      <div className="product-grid">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  )
}

export default App`,
        },
        {
          label: '🎨 レイアウト用のCSS追加',
          code: `.app-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem;
}

.category-path {
  font-size: 14px;
  color: #666666;
  margin-bottom: 24px;
}

.product-grid {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: start;
  flex-wrap: wrap;
  padding: 1.5rem 1rem;
  max-width: fit-content;
  margin: 0 auto;
}`,
        },
      ],
      initialStepFiles: {
        'App.jsx': `import ProductCard from './ProductCard'

const App = () => {
  return (
    <div>
      <ProductCard />
    </div>
  )
}

export default App`,
        'ProductCard.jsx': `import './styles.css'
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
        'ProductImage.jsx': `const ProductImage = () => {
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
        'ProductInfo.jsx': `const ProductInfo = () => {
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
        path: 'react-app/ProductCard.jsx',
        content: `// ここにProductCardコンポーネントを作成してください`,
        language: 'javascript',
        description: 'ProductCardコンポーネント（作成予定）',
        order: 2,
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
        order: 3,
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
