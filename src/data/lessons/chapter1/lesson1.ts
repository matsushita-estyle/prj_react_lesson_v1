import React from 'react'
import { Lesson, SolutionCode, TextBookSection } from '@/lib/types/lesson'
import AIChatDemo from '@/components/demos/AIChatDemo'

export const chapter1Lesson1: Lesson = {
  id: 'chapter1-lesson1',
  title: 'Reactに触れてみよう',
  lessonNumber: 1,
  description: 'Reactの基本概念を理解し、最初のReactコンポーネントを作成します',
  difficulty: '初級',

  textBookSections: [
    {
      id: 'intro',
      title: 'Reactとは',
      content: `**React**は、ウェブアプリの画面を作るJavaScriptライブラリです。
Facebook（現Meta）が開発し、Netflix、Airbnb、Instagram など世界中のサービスで使われています。`,
      visualStyle: 'info',
      order: 1,
    },
    {
      id: 'ai-era',
      title: 'AI時代になぜReactを学ぶのか？',
      content: `**「ChatGPTやCopilotがコードを書いてくれるなら、React学習は不要では？」**

この疑問、とても理解できます！
しかし、実際は**AIを使いこなすためにもReact学習が重要**になります。

実際、このアプリも生成AIに手伝ってもらいながら作りましたが、
雑に指示しただけでは思うように作ってくれないことが多々ありました・・・

### AI時代のReact学習の3つの価値

---

#### 1. **AIが作ったコードを理解・判断できる**

\`\`\`jsx
// AIが生成したコード例
const UserProfile = ({ userId, filterType }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    fetchUser(userId).then(userData => {
      setUser(userData);
      fetchUserPosts(userData.id, filterType).then(postsData => {
        setPosts(postsData.filter(post => post.status === 'published'));
        setLoading(false);
      });
    });
  }, []); // 🚨 依存配列が空！
  
  return (
    <div>
      {loading ? '読み込み中...' : (
        <>
          <h2>{user?.name}</h2>
          <p>投稿数: {posts.length}</p>
        </>
      )}
    </div>
  );
}
\`\`\`

**→ このコードの問題点が分かりますか？**
- **依存配列が空**：\`userId\`や\`filterType\`が変わっても古いデータのまま表示される
- **エラーハンドリング不備**：\`userData.id\`が\`undefined\`の場合、2番目のAPI呼び出しでエラー
- **loading状態の問題**：ネットワークエラー時に\`loading\`がずっと\`true\`のまま

---

#### 2. **作りたいものを正確にAIに指示できる**

**NG例（曖昧な指示）**: 「ユーザー情報を表示する画面を作って」

**OK例（具体的な指示）**: 「UserCardコンポーネントを作成。propsでuserオブジェクト（name、email、avatarUrl）を受け取り、TypeScriptで型定義も作成して。左にアバター画像、右に名前（太字）とメール（グレー）を縦並びで表示するカード形式のレイアウトで」

---

#### 3. **AIでは対応できない細かい調整を自分でできる**
- デザインの微調整
- エラーハンドリングの追加
- パフォーマンスの最適化
- 既存コードとの統合`,
      visualStyle: 'highlight',
      order: 2,
    },
    {
      id: 'why-react',
      title: 'なぜReactなのか？',
      content: `Reactを使うと、**ユーザーにとって使いやすいUI**を作ることができます。

例えば生成AIチャットも、Reactなら自分好みにカスタマイズ可能。
テーマ変更、アニメーション、レイアウトなど、
ユーザーの使いやすさを考えた独自の体験を提供できます！
`,
      visualStyle: 'success',
      visualDemo: React.createElement(AIChatDemo),
      order: 3,
    },
    {
      id: 'components',
      title: 'コンポーネント - Reactの基本単位',
      content: `Reactでは、画面を「**コンポーネント**」という部品に分けて作ります。
コンポーネントは、**JavaScript関数**として定義します：

\`\`\`jsx
// 基本的なコンポーネント
const Welcome = () => {
  return <h1>ようこそReactの世界へ！</h1>;
}
\`\`\`

### レゴブロックのイメージ
小さな部品を組み合わせて、完全なWebページを作ります：
- Header（ヘッダー部品）
- Content（コンテンツ部品）
- Footer（フッター部品）`,
      visualStyle: 'default',
      order: 4,
    },
    {
      id: 'jsx-intro',
      title: 'JSX - JavaScriptの中でHTMLを書く技術',
      content: `JSXは**JavaScript + XML**の略で、JavaScriptの中にHTMLのような記述ができます。

### JSXと普通のJavaScriptの比較

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
\`\`\``,
      visualStyle: 'info',
      order: 5,
    },
    {
      id: 'jsx-rules',
      title: 'JSXの基本ルール',
      content: `### ルール1：すべてのタグは閉じる

\`\`\`jsx
// ✅ 正しい - セルフクローズタグを使用
<input type="text" />
<img src="photo.jpg" alt="写真" />

// ❌ エラーになる - タグが閉じられていない
<input type="text">
<img src="photo.jpg" alt="写真">
\`\`\`

### ルール2：複数要素は1つの親で包む

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

### ルール3：JavaScriptの予約語を避ける

\`\`\`jsx
// ❌ HTMLの書き方
<div class="container">内容</div>

// ✅ JSXの書き方  
<div className="container">内容</div>
\`\`\`

**理由：** \`class\` はJavaScriptの予約語のため、\`className\` を使います。`,
      visualStyle: 'warning',
      order: 6,
    },
    {
      id: 'summary',
      title: 'レッスンまとめ',
      content: `| 概念 | 説明 |
|------|------|
| **React** | UIを作るJavaScriptライブラリ |
| **コンポーネント** | JavaScript関数で定義する画面部品 |
| **JSX** | JavaScript内にHTMLを書く記法 |
| **JSXルール** | タグを閉じる、親要素で包む、classNameを使う |

それでは、今回学んだReactとJSXの基本を活用して、実際にReactコンポーネントを作ってみましょう！`,
      visualStyle: 'success',
      order: 7,
    },
  ] as TextBookSection[],

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
