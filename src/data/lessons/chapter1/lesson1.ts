import { Lesson, SolutionCode } from '@/lib/types/lesson'

export const chapter1Lesson1: Lesson = {
  id: 'chapter1-lesson1',
  title: 'Reactに触れてみよう',
  lessonNumber: 1,
  description: 'Reactの基本概念を理解し、最初のReactコンポーネントを作成します',
  difficulty: '初級',

  material: `# 🚀 Reactって何だろう？

**React**は、ウェブアプリの画面を作るJavaScriptライブラリです。
Facebook（現Meta）が開発し、Netflix、Airbnb、Instagram など世界中のサービスで使われています。

## 💡 なぜReactが必要なの？

従来のJavaScriptでの開発と、Reactを使った開発を比べてみましょう：

### 📝 従来のJavaScript
\`\`\`javascript
// ユーザー情報を表示する処理（従来方式）
const users = ['田中', '佐藤', '鈴木'];

// 1. HTML要素を取得
const userListElement = document.getElementById('user-list');

// 2. HTMLを文字列で作成
let html = '<ul>';
users.forEach(user => {
  html += \`<li>\${user}</li>\`;
});
html += '</ul>';

// 3. 要素に挿入
userListElement.innerHTML = html;
\`\`\`

### ⚡️ Reactを使った場合
\`\`\`jsx
// 同じ処理をReactで書くと...
const UserList = () => {
  const users = ['田中', '佐藤', '鈴木'];
  
  return (
    <ul>
      {users.map(user => <li key={user}>{user}</li>)}
    </ul>
  );
}
\`\`\`

**Reactの方がシンプル！** HTMLの構造が直感的にわかりますね。

---

## 🧱 コンポーネント - Reactの基本単位

Reactでは、画面を「**コンポーネント**」という部品に分けて作ります。
コンポーネントは、**JavaScript関数**として定義します：

\`\`\`jsx
// 基本的なコンポーネント
const Welcome = () => {
  return <h1>ようこそReactの世界へ！</h1>;
}
\`\`\`

### 🎯 レゴブロックのイメージ
\`\`\`
🏠 完成したWebページ
├── 🧱 Header (ヘッダー部品)
├── 📄 Content (コンテンツ部品)
└── 🦶 Footer (フッター部品)
\`\`\`

小さな部品を組み合わせて、完全なWebページを作ります。

---

## 🎭 JSX - JavaScriptの中でHTMLを書く技術

JSXは**JavaScript + XML**の略で、JavaScriptの中にHTMLのような記述ができます。

### 🆚 JSXと普通のJavaScriptの比較

#### 従来のJavaScript
\`\`\`javascript
// createElement を使って要素を作成（読みにくい...）
const element = React.createElement(
  'div',
  { className: 'greeting' },
  React.createElement('h1', null, 'Hello World!')
);
\`\`\`

#### JSX
\`\`\`jsx
// HTMLのように直感的に書ける！
const element = (
  <div className="greeting">
    <h1>Hello World!</h1>
  </div>
);
\`\`\`

---

## 📋 JSXの基本ルール

### ⚠️ ルール1：すべてのタグは閉じる

\`\`\`jsx
// ✅ 正しい - セルフクローズタグを使用
<input type="text" />
<img src="photo.jpg" alt="写真" />

// ❌ エラーになる - タグが閉じられていない
<input type="text">
<img src="photo.jpg" alt="写真">
\`\`\`

### 📦 ルール2：複数要素は1つの親で包む

\`\`\`jsx
// ❌ エラー：複数要素が並んでいる
const BadExample = () => {
  return (
    <h1>見出し</h1>
    <p>段落</p>
  );
}

// ✅ 正しい：親要素で包む
const GoodExample = () => {
  return (
    <div>
      <h1>見出し</h1>
      <p>段落</p>
    </div>
  );
}
\`\`\`

### 🔤 ルール3：JavaScriptの予約語を避ける

\`\`\`jsx
// ❌ HTMLの書き方
<div class="container">内容</div>

// ✅ JSXの書き方  
<div className="container">内容</div>
\`\`\`

**理由：** \`class\` はJavaScriptの予約語のため、\`className\` を使います。

---

## 🎯 今日のレッスンまとめ

### ✅ 学んだこと

| 概念 | 説明 |
|------|------|
| **React** | UIを作るJavaScriptライブラリ |
| **コンポーネント** | JavaScript関数で定義する画面部品 |
| **JSX** | JavaScript内にHTMLを書く記法 |
| **JSXルール** | タグを閉じる、親要素で包む、classNameを使う |

### 🚀 実際に作ってみましょう！

それでは、今回学んだReactとJSXの基本を活用して、実際にReactコンポーネントを作ってみましょう！
段階的にコードを書きながら、Reactの基本構造を体験していきます。`,

  taskDescription: `
このレッスンでは、実際にReactコンポーネントを作っていきます。
段階的にコードを変更しながら、Reactコンポーネントを完成させましょう！
  `,

  // 段階的な課題
  steps: [
    {
      stepNumber: 1,
      title: 'シンプルなテキストを表示しよう！',
      instruction: `最初のステップとして、シンプルなテキスト表示から始めましょう。
Appコンポーネントの中で「こんにちは」というテキストを表示してみます。`,
      tips: [
        'タグとは、HTMLやJSXで使う「要素を囲む記号」のことです',
        '例：`<div>内容</div>` のように、`<>`と`</>`で内容を囲みます',
        'ブラウザに「この部分はどんな意味か」を伝える役割があります',
      ],
      tipsTitle: 'タグとは？',
      initialStepFiles: {
        'App.jsx': {
          content: `const App = () => {
  return <div>{/* ここにコードを書いてください */}</div>
}

export default App`,
          isVisible: true,
        },
        'styles.css': {
          content: `/* React学習用のスタイル */
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}`,
          isVisible: false,
        },
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
      title: '見出しタグを使ってみよう！',
      instruction: `次は、h1タグを使って「ようこそReactへ！」という見出しを作りましょう。
h1タグは大きな見出しを表示するためのタグです。`,
      initialStepFiles: {
        'App.jsx': {
          content: `const App = () => {
  return <div>こんにちは</div>
}

export default App`,
          isVisible: true,
        },
        'styles.css': {
          content: `/* React学習用のスタイル */
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}`,
          isVisible: false,
        },
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
      title: '複数の要素を表示しよう！',
      instruction: `複数のタグを表示する時は、全体を1つのdivタグで囲む必要があります。
これは、JSXでは「1つのコンテナの中に複数の要素を入れる」というルールがあるためです。
h1タグで「React App」、pタグで「Reactの基本構造を学ぶ」と表示してみましょう。`,
      initialStepFiles: {
        'App.jsx': {
          content: `const App = () => {
  return <h1>ようこそReactへ！</h1>
}

export default App`,
          isVisible: true,
        },
        'styles.css': {
          content: `/* React学習用のスタイル */
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}`,
          isVisible: false,
        },
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
      title: 'クラス名を追加してスタイルを適用しよう！',
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
        'App.jsx': {
          content: `const App = () => {
  return (
    <div>
      <h1>React App</h1>
      <p>Reactの基本構造を学ぶ</p>
    </div>
  )
}

export default App`,
          isVisible: true,
        },
        'styles.css': {
          content: `/* React学習用のスタイル */
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}`,
          isVisible: false,
        },
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
      title: '画像を表示しよう！',
      instruction: `画像を表示するimgタグを追加しましょう。

imgタグはsrc属性で画像のパスを指定し、JSXでは<img />のように最後に/を付けて閉じます。
これを「セルフクロージング」と呼び、間にテキストやコンポーネントが入らないタグで使います。`,
      initialStepFiles: {
        'App.jsx': {
          content: `import './styles.css'

const App = () => {
  return (
    <div className="container">
      <h1 className="title">React App</h1>
      <p className="description">Reactの基本構造を学ぶ</p>
    </div>
  )
}

export default App`,
          isVisible: true,
        },
        'styles.css': {
          content: `/* React学習用のスタイル */
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}`,
          isVisible: false,
        },
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

  // 新しいプロジェクト構造形式
  projectStructure: {
    files: [
      {
        path: 'react-app/App.jsx',
        content: `const App = () => {
  return <div>{/* ここにコードを書いてください */}</div>
}

export default App`,
        language: 'javascript',
        description: 'メインのReactコンポーネント',
        order: 1,
      },
      {
        path: 'react-app/styles.css',
        content: `/* React学習用のスタイル */
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

`,
        language: 'css',
        description: 'Reactアプリのスタイルシート',
        order: 2,
      },
    ],
    defaultFile: 'react-app/App.jsx',
    folderConfig: {
      displayOrder: ['react-app'],
    },
  },

  nextLessonId: 'chapter1-lesson2',
}
