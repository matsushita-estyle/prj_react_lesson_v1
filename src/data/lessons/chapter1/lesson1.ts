import { Lesson, SolutionCode } from '@/lib/types/lesson'

export const chapter1Lesson1: Lesson = {
  id: 'chapter1-lesson1',
  title: 'Reactに触れてみよう',
  lessonNumber: 1,
  description: 'Reactの基本概念を理解し、最初のReactコンポーネントを作成します',
  difficulty: '初級',

  material: `# Reactって何だろう？

Reactは、ユーザーインターフェース（UI）を作るためのJavaScriptライブラリです。
ウェブサイトやアプリケーションの画面を、効率的かつ柔軟に構築できるツールとして、世界中の開発者に愛用されています。

## なぜReactが必要なの？

従来のJavaScriptだけでも画面は作れますが、アプリケーションが複雑になると、以下のような課題が出てきます：

- コードの管理が大変になる
- 同じような処理を何度も書く必要がある
- 画面の更新処理が複雑になる

Reactは、これらの問題を「コンポーネント」という考え方で解決します。

## コンポーネント - Reactの基本単位

コンポーネントは、画面を構成する独立した部品のことです。
レゴブロックのように、小さな部品を組み合わせて大きな作品を作るイメージです。

### コンポーネントの特徴
- **再利用可能**：一度作れば何度でも使える
- **独立性**：それぞれが独立して動作する
- **組み合わせ可能**：複数のコンポーネントを組み合わせて複雑な画面を作れる

## はじめてのReactコンポーネント

Reactでコンポーネントを作る最も基本的な方法は、JavaScript の関数として定義することです。

\`\`\`jsx
const Welcome = () => {
  return <h1>ようこそReactの世界へ！</h1>;
}
\`\`\`

これは \`Welcome\` という名前のコンポーネントで、画面に挨拶メッセージを表示します。

## JSX - JavaScriptの中でHTMLを書く魔法

上記のコードで、JavaScriptの中にHTMLのような記述があることに気づきましたか？
これは **JSX（JavaScript XML）** という特別な記法です。

### JSXの基本ルール

\`\`\`jsx
const MyComponent = () => {
  return (
    <div>
      <h2>JSXの例</h2>
      <p>これはJSXで書かれています</p>
    </div>
  );
}
\`\`\`

JSXを使うことで、JavaScriptの中に直感的にUIの構造を記述できます。

## JSXを書く時の重要なルール

### ルール1：すべてのタグは閉じる

HTMLでは省略できる閉じタグも、JSXでは必ず閉じる必要があります。

\`\`\`jsx
// ✅ 正しい
<input type="text" />
<br />
<img src="photo.jpg" alt="写真" />

// ❌ エラーになる
<input type="text">
<br>
<img src="photo.jpg" alt="写真">
\`\`\`

### ルール2：複数の要素は1つの親要素で包む

JSXでは、複数の要素を返す場合、必ず1つの親要素で包む必要があります。

\`\`\`jsx
// ❌ エラー：複数の要素が並んでいる
const BadExample = () => {
  return (
    <h1>見出し</h1>
    <p>段落</p>
  );
}

// ✅ 正しい：divで包んでいる
const GoodExample = () => {
  return (
    <div>
      <h1>見出し</h1>
      <p>段落</p>
    </div>
  );
}
\`\`\`

### ルール3：JavaScriptの予約語との衝突を避ける

HTMLの \`class\` 属性は、JSXでは \`className\` になります。

\`\`\`jsx
// HTMLでの書き方
// <div class="container">内容</div>

// JSXでの書き方
<div className="container">内容</div>
\`\`\`

これは \`class\` がJavaScriptの予約語（特別な意味を持つ言葉）だからです。

## コンポーネントの階層構造

Reactでは、コンポーネントを入れ子にして、より複雑な画面を構築できます。

\`\`\`jsx
const Page = () => {
  return (
    <div className="page">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

const Header = () => {
  return <header>ページのヘッダー</header>;
}

const MainContent = () => {
  return <main>メインコンテンツ</main>;
}

const Footer = () => {
  return <footer>ページのフッター</footer>;
}
\`\`\`

このように、小さなコンポーネントを組み合わせて、ページ全体を構成していきます。

## まとめ

今回学んだこと：
- Reactはコンポーネントベースのライブラリ
- コンポーネントは関数として定義できる
- JSXを使ってJavaScriptの中にHTMLのような記述ができる
- JSXには守るべきルールがある

次回は、コンポーネントに動きを加える方法を学びます！`,

  taskDescription: `
このレッスンでは、実際にReactコンポーネントを作っていきます。
段階的にコードを変更しながら、Reactコンポーネントを完成させましょう！
  `,

  // 段階的な課題
  steps: [
    {
      stepNumber: 1,
      title: 'シンプルなテキストを表示しよう',
      instruction: `最初のステップとして、シンプルなテキスト表示から始めましょう。
Appコンポーネントの中で「こんにちは」というテキストを表示してみます。`,
      tips: [
        'タグとは、HTMLやJSXで使う「要素を囲む記号」のことです',
        '例：`<div>内容</div>` のように、`<>`と`</>`で内容を囲みます',
        'ブラウザに「この部分はどんな意味か」を伝える役割があります',
      ],
      tipsTitle: 'タグとは？',
      initialStepFiles: {
        'App.jsx': `const App = () => {
  return <div>{/* ここにコードを書いてください */}</div>
}

export default App`,
      },
      copyableCode: [
        {
          label: 'こんにちはのテキスト表示',
          code: `<div>こんにちは</div>`,
        },
      ],
      solutionCodes: [
        {
          code: `const App = () => {
  return <div>こんにちは</div>
}

export default App`,
          solutionTargetFile: 'react-app/App.jsx',
          label: 'App.jsx - こんにちはの表示',
        },
      ] as SolutionCode[],
      validation: {
        includes: ['こんにちは'],
      },
    },
    {
      stepNumber: 2,
      title: '見出しタグを使ってみよう',
      instruction: `次は、h1タグを使って「ようこそReactへ！」という見出しを作りましょう。
h1タグは大きな見出しを表示するためのタグです。`,
      initialStepFiles: {
        'App.jsx': `const App = () => {
  return <div>こんにちは</div>
}

export default App`,
      },
      copyableCode: [
        {
          label: 'h1タグで見出しを表示',
          code: `<h1>ようこそReactへ！</h1>`,
        },
      ],
      solutionCodes: [
        {
          code: `const App = () => {
  return <h1>ようこそReactへ！</h1>
}

export default App`,
          solutionTargetFile: 'react-app/App.jsx',
          label: 'App.jsx - 見出しの表示',
        },
      ] as SolutionCode[],
      validation: {
        includes: ['<h1>', 'ようこそReactへ', '</h1>'],
      },
    },
    {
      stepNumber: 3,
      title: '複数の要素を表示しよう',
      instruction: `複数のタグを表示する時は、全体を1つのdivタグで囲む必要があります。
これは、JSXでは「1つのコンテナの中に複数の要素を入れる」というルールがあるためです。
h1タグで「React App」、pタグで「Reactの基本構造を学ぶ」と表示してみましょう。`,
      initialStepFiles: {
        'App.jsx': `const App = () => {
  return <h1>ようこそReactへ！</h1>
}

export default App`,
      },
      copyableCode: [
        {
          label: 'return文で親要素のdivを返す',
          code: `return (
  <div>
  </div>
)`,
        },
        {
          label: 'h1とpタグで見出しと説明文を表示',
          code: `    <h1>React App</h1>
    <p>Reactの基本構造を学ぶ</p>`,
        },
      ],
      solutionCodes: [
        {
          code: `const App = () => {
  return (
    <div>
      <h1>React App</h1>
      <p>Reactの基本構造を学ぶ</p>
    </div>
  )
}

export default App`,
          solutionTargetFile: 'react-app/App.jsx',
          label: 'App.jsx - 複数要素の表示',
        },
      ] as SolutionCode[],
      validation: {
        includes: ['<div>', '<h1>', '<p>', '</div>'],
      },
    },
    {
      stepNumber: 4,
      title: 'クラス名を追加してスタイルを適用しよう',
      instruction: `今度は、CSSでスタイルを付けるためにclassNameを追加しましょう。

各タグにクラス名を設定してください：
・divタグに「container」
・h1タグに「title」  
・pタグに「description」

また、CSSファイルを使用するために、
ファイルの先頭に \`import './styles.css'\` を追加してスタイルを読み込む必要があります。`,
      tips: [
        'styles.cssファイルに、各クラス名（.container、.titleなど）のスタイルが定義されています',
        'classNameで指定したクラス名と、CSSファイルのクラス名が一致すると、スタイルが適用されます',
        'import文でCSSファイルを読み込むことで、ReactがスタイルをWebページに反映してくれます',
      ],
      tipsTitle: 'なぜCSSが適用されるの？',
      initialStepFiles: {
        'App.jsx': `const App = () => {
  return (
    <div>
      <h1>React App</h1>
      <p>Reactの基本構造を学ぶ</p>
    </div>
  )
}

export default App`,
      },
      copyableCode: [
        {
          label: 'CSSファイルをインポート',
          code: `import './styles.css'`,
        },
        {
          label: 'classNameでスタイルを適用したJSX',
          code: `<div className="container">
  <h1 className="title">React App</h1>
  <p className="description">Reactの基本構造を学ぶ</p>
</div>`,
        },
      ],
      solutionCodes: [
        {
          code: `import './styles.css'

const App = () => {
  return (
    <div className="container">
      <h1 className="title">React App</h1>
      <p className="description">Reactの基本構造を学ぶ</p>
    </div>
  )
}

export default App`,
          solutionTargetFile: 'react-app/App.jsx',
          label: 'App.jsx - スタイル適用',
        },
      ] as SolutionCode[],
      validation: {
        includes: ['className="container"', 'className="title"', 'className="description"'],
      },
    },
    {
      stepNumber: 5,
      title: '画像を表示しよう',
      instruction: `画像を表示するimgタグを追加しましょう。

imgタグはsrc属性で画像のパスを指定し、JSXでは<img />のように最後に/を付けて閉じます。
これを「セルフクロージング」と呼び、間にテキストやコンポーネントが入らないタグで使います。`,
      initialStepFiles: {
        'App.jsx': `import './styles.css'

const App = () => {
  return (
    <div className="container">
      <h1 className="title">React App</h1>
      <p className="description">Reactの基本構造を学ぶ</p>
    </div>
  )
}

export default App`,
      },
      copyableCode: [
        {
          label: 'React学習画像の表示',
          code: `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/200px-React-icon.svg.png" alt="React学習画像" />`,
        },
      ],
      solutionCodes: [
        {
          code: `import './styles.css'

const App = () => {
  return (
    <div className="container">
      <h1 className="title">React App</h1>
      <p className="description">Reactの基本構造を学ぶ</p>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/200px-React-icon.svg.png" alt="React学習画像" />
    </div>
  )
}

export default App`,
          solutionTargetFile: 'react-app/App.jsx',
          label: 'App.jsx - 画像の追加',
        },
      ] as SolutionCode[],
      validation: {
        includes: ['<img', '/>'],
      },
    },
  ],

  // 右のコードエディタの初期ファイル
  initialEditorFiles: {
    'react-app/App.jsx': `const App = () => {
  return <div>{/* ここにコードを書いてください */}</div>
}

export default App`,
    'react-app/styles.css': `/* React学習用のスタイル */
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: white;
}

.description {
  font-size: 1.2rem;
  font-weight: 300;
  margin: 0 0 2rem 0;
  opacity: 0.9;
  line-height: 1.6;
}

.container img {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

`,
  },

  nextLessonId: 'chapter1-lesson2',
}
