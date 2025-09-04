import { Lesson, SolutionCode } from '@/lib/types/lesson';

export const chapter1Lesson4: Lesson = {
  id: 'chapter1-lesson4',
  title: 'コンポーネントを分割して再利用しよう',
  lessonNumber: 4,
  description: 'コンポーネントを小さな部品に分割して、再利用性を高める方法を学びます',
  difficulty: '中級',
  estimatedMinutes: 45,

  material: `# コンポーネントを分割して再利用しよう

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
# コンポーネント分割の実践

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
      hint: 'export default文とimport文を正しく記述することが重要です',
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
    return '⭐'.repeat(rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    price: 12000,
    discountRate: 0.20,
    rating: 4,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
    altText: "スマートウォッチの商品画像"
  };
  
  return (
    <div className="product-card">
      <img 
        className="product-image"
        src={product.imageUrl}
        alt={product.altText}
      />
      <h1>{product.name}</h1>
      <p className="price">定価: {product.price}円</p>
      <p className="discount-price">割引価格: {product.price - product.price * product.discountRate}円</p>
      <p className="rating">評価: {getStarRating(product.rating)}</p>
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
    return '⭐'.repeat(rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    price: 12000,
    discountRate: 0.20,
    rating: 4,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
    altText: "スマートウォッチの商品画像"
  };
  
  return (
    <div className="product-card">
      <img 
        className="product-image"
        src={product.imageUrl}
        alt={product.altText}
      />
      <h1>{product.name}</h1>
      <p className="price">定価: {product.price}円</p>
      <p className="discount-price">割引価格: {product.price - product.price * product.discountRate}円</p>
      <p className="rating">評価: {getStarRating(product.rating)}</p>
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
      hint: 'imgタグの部分をProductImageコンポーネントに移動します',
      copyableCode: [
        {
          label: '🖼️ ProductImageコンポーネントの基本構造',
          code: `const ProductImage = () => {
  const product = {
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
    altText: "スマートウォッチの商品画像"
  };

  return (
    <img 
      className="product-image"
      src={product.imageUrl}
      alt={product.altText}
    />
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
    return '⭐'.repeat(rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    price: 12000,
    discountRate: 0.20,
    rating: 4,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
    altText: "スマートウォッチの商品画像"
  };
  
  return (
    <div className="product-card">
      <img 
        className="product-image"
        src={product.imageUrl}
        alt={product.altText}
      />
      <h1>{product.name}</h1>
      <p className="price">定価: {product.price}円</p>
      <p className="discount-price">割引価格: {product.price - product.price * product.discountRate}円</p>
      <p className="rating">評価: {getStarRating(product.rating)}</p>
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
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
    altText: "スマートウォッチの商品画像"
  };

  return (
    <img 
      className="product-image"
      src={product.imageUrl}
      alt={product.altText}
    />
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
    return '⭐'.repeat(rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    price: 12000,
    discountRate: 0.20,
    rating: 4
  };
  
  return (
    <div className="product-card">
      <ProductImage />
      <h1>{product.name}</h1>
      <p className="price">定価: {product.price}円</p>
      <p className="discount-price">割引価格: {product.price - product.price * product.discountRate}円</p>
      <p className="rating">評価: {getStarRating(product.rating)}</p>
    </div>
  )
}

export default ProductCard`,
          solutionTargetFile: 'react-app/ProductCard.jsx',
          label: 'ProductCard.jsx - ProductImageを使用',
        },
      ] as SolutionCode[],
      validation: {
        includes: [
          '<img',
          'className="product-image"',
          'export default ProductImage',
        ],
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
      hint: 'h1, p要素と価格計算ロジック、星評価関数をまとめて移動します',
      copyableCode: [
        {
          label: '📋 ProductInfoコンポーネントの基本構造',
          code: `const ProductInfo = () => {
  const getStarRating = (rating) => {
    return '⭐'.repeat(rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    price: 12000,
    discountRate: 0.20,
    rating: 4
  };

  return (
    <>
      <h1>{product.name}</h1>
      <p className="price">定価: {product.price}円</p>
      <p className="discount-price">割引価格: {product.price - product.price * product.discountRate}円</p>
      <p className="rating">評価: {getStarRating(product.rating)}</p>
    </>
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
    return '⭐'.repeat(rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    price: 12000,
    discountRate: 0.20,
    rating: 4
  };
  
  return (
    <div className="product-card">
      <ProductImage />
      <h1>{product.name}</h1>
      <p className="price">定価: {product.price}円</p>
      <p className="discount-price">割引価格: {product.price - product.price * product.discountRate}円</p>
      <p className="rating">評価: {getStarRating(product.rating)}</p>
    </div>
  )
}

export default ProductCard`,
        'ProductImage.jsx': `const ProductImage = () => {
  const product = {
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
    altText: "スマートウォッチの商品画像"
  };

  return (
    <img 
      className="product-image"
      src={product.imageUrl}
      alt={product.altText}
    />
  );
}

export default ProductImage`,
        'ProductInfo.jsx': `// ここにProductInfoコンポーネントを作成してください`,
      },
      solutionCodes: [
        {
          code: `const ProductInfo = () => {
  const getStarRating = (rating) => {
    return '⭐'.repeat(rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    price: 12000,
    discountRate: 0.20,
    rating: 4
  };

  return (
    <>
      <h1>{product.name}</h1>
      <p className="price">定価: {product.price}円</p>
      <p className="discount-price">割引価格: {product.price - product.price * product.discountRate}円</p>
      <p className="rating">評価: {getStarRating(product.rating)}</p>
    </>
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
        includes: [
          '<h1>',
          '<p className="price">',
          'getStarRating',
          'export default ProductInfo',
        ],
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
      hint: 'ProductCardは他のコンポーネントを組み合わせるレイアウト専用になります',
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
    return '⭐'.repeat(rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    price: 12000,
    discountRate: 0.20,
    rating: 4
  };
  
  return (
    <div className="product-card">
      <ProductImage />
      <h1>{product.name}</h1>
      <p className="price">定価: {product.price}円</p>
      <p className="discount-price">割引価格: {product.price - product.price * product.discountRate}円</p>
      <p className="rating">評価: {getStarRating(product.rating)}</p>
    </div>
  )
}

export default ProductCard`,
        'ProductImage.jsx': `const ProductImage = () => {
  const product = {
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
    altText: "スマートウォッチの商品画像"
  };

  return (
    <img 
      className="product-image"
      src={product.imageUrl}
      alt={product.altText}
    />
  );
}

export default ProductImage`,
        'ProductInfo.jsx': `const ProductInfo = () => {
  const getStarRating = (rating) => {
    return '⭐'.repeat(rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    price: 12000,
    discountRate: 0.20,
    rating: 4
  };

  return (
    <>
      <h1>{product.name}</h1>
      <p className="price">定価: {product.price}円</p>
      <p className="discount-price">割引価格: {product.price - product.price * product.discountRate}円</p>
      <p className="rating">評価: {getStarRating(product.rating)}</p>
    </>
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
      hint: '同じProductCardコンポーネントを複数回使うだけで、複数の商品カードが表示されます',
      copyableCode: [
        {
          label: '🔄 複数のProductCardを表示',
          code: `import ProductCard from './ProductCard'

const App = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">商品一覧</h1>
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

.app-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2d3748;
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
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
    altText: "スマートウォッチの商品画像"
  };

  return (
    <img 
      className="product-image"
      src={product.imageUrl}
      alt={product.altText}
    />
  );
}

export default ProductImage`,
        'ProductInfo.jsx': `const ProductInfo = () => {
  const getStarRating = (rating) => {
    return '⭐'.repeat(rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    price: 12000,
    discountRate: 0.20,
    rating: 4
  };

  return (
    <>
      <h1>{product.name}</h1>
      <p className="price">定価: {product.price}円</p>
      <p className="discount-price">割引価格: {product.price - product.price * product.discountRate}円</p>
      <p className="rating">評価: {getStarRating(product.rating)}</p>
    </>
  );
}

export default ProductInfo`,
      },
      solutionCodes: [
        {
          code: `import ProductCard from './ProductCard'
import './styles.css'

const App = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">商品一覧</h1>
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
          solutionTargetFile: 'react-app/App.jsx',
          label: 'App.jsx - 複数の商品カード表示',
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
          label: 'ProductCard.jsx - 完成版（変更不要）',
        },
        {
          code: `const ProductImage = () => {
  // 複数の商品画像をランダムに選択する機能を追加
  const products = [
    {
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
      altText: "スマートウォッチの商品画像"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop&crop=center",
      altText: "サングラスの商品画像"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&crop=center",
      altText: "スニーカーの商品画像"
    }
  ];
  
  // ランダムに商品を選択
  const product = products[Math.floor(Math.random() * products.length)];

  return (
    <img 
      className="product-image"
      src={product.imageUrl}
      alt={product.altText}
    />
  );
}

export default ProductImage`,
          solutionTargetFile: 'react-app/ProductImage.jsx',
          label: 'ProductImage.jsx - ランダム画像表示機能（オプション）',
        },
        {
          code: `const ProductInfo = () => {
  const getStarRating = (rating) => {
    return '⭐'.repeat(rating);
  }
  
  // 複数の商品情報をランダムに選択
  const products = [
    {
      name: "スマートウォッチ",
      price: 12000,
      discountRate: 0.20,
      rating: 4
    },
    {
      name: "ワイヤレスイヤホン",
      price: 8000,
      discountRate: 0.15,
      rating: 5
    },
    {
      name: "ポータブル充電器",
      price: 5000,
      discountRate: 0.10,
      rating: 3
    }
  ];
  
  // ランダムに商品を選択
  const product = products[Math.floor(Math.random() * products.length)];

  return (
    <>
      <h1>{product.name}</h1>
      <p className="price">定価: {product.price}円</p>
      <p className="discount-price">割引価格: {product.price - product.price * product.discountRate}円</p>
      <p className="rating">評価: {getStarRating(product.rating)}</p>
    </>
  );
}

export default ProductInfo`,
          solutionTargetFile: 'react-app/ProductInfo.jsx',
          label: 'ProductInfo.jsx - ランダム商品情報（オプション）',
        },
      ] as SolutionCode[],
      validation: {
        includes: ['<ProductCard />', 'product-grid', 'app-title'],
      },
    },
  ],

  // 右のコードエディタの初期ファイル
  initialEditorFiles: {
    'react-app/App.jsx': `import './styles.css'

const App = () => {
  const getStarRating = (rating) => {
    return '⭐'.repeat(rating);
  }
  
  const product = {
    name: "スマートウォッチ",
    price: 12000,
    discountRate: 0.20,
    rating: 4,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
    altText: "スマートウォッチの商品画像"
  };
  
  return (
    <div className="product-card">
      <img 
        className="product-image"
        src={product.imageUrl}
        alt={product.altText}
      />
      <h1>{product.name}</h1>
      <p className="price">定価: {product.price}円</p>
      <p className="discount-price">割引価格: {product.price - product.price * product.discountRate}円</p>
      <p className="rating">評価: {getStarRating(product.rating)}</p>
    </div>
  )
}

export default App`,
    'react-app/ProductCard.jsx': `// ここにProductCardコンポーネントを作成してください`,
    'react-app/styles.css': `/* 商品カード用のスタイル */
.product-card {
  width: 280px;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 20px;
  border: none;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 1px 8px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 0;
  margin-bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.product-card h1 {
  font-size: 1.25rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 1rem 1rem 0.75rem 1rem;
  letter-spacing: -0.02em;
}

.price {
  font-size: 0.875rem;
  color: #a0aec0;
  margin: 0.25rem 1rem;
  text-decoration: line-through;
  font-weight: 500;
}

.discount-price {
  font-size: 1.125rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0.25rem 1rem;
  letter-spacing: -0.01em;
}

.rating {
  font-size: 1rem;
  color: #4a5568;
  margin: 0.5rem 1rem 1rem 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rating::before {
  content: '';
  width: 4px;
  height: 4px;
  background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
  border-radius: 50%;
}

/* アプリ全体のレイアウト */
.app-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.app-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: -0.02em;
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
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .product-grid {
    justify-content: flex-start;
    padding: 1rem 0;
  }
  
  .product-card {
    width: 260px;
  }
  
  .app-container {
    padding: 1rem;
  }
  
  .app-title {
    font-size: 2rem;
  }
}`,
  },

  previousLessonId: 'chapter1-lesson3',
  nextLessonId: 'chapter1-lesson5',
};
