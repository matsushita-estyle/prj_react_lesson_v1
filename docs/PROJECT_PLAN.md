# React研修プラットフォーム 開発計画書

## プロジェクト概要

### 目的

社内でのReact研修を行うことを目的としたWebアプリケーション

### 参考URL

https://mosya.dev/react/lessons/react-basic/challenge

### 最重要機能

- 右側でソースコードを修正しながら左側でプレビューを表示する機能
- 認証機能は不要

## ページ構成

### 必要なページ一覧

1. **ホームページ** (`/`)
   - React研修プラットフォームの概要
   - 利用可能なコース一覧
   - 各レッスンへの直接リンク

2. **コース一覧ページ** (`/courses`)
   - React基礎コース
   - React応用コース
   - Hooks入門コース
   - 各コースのシンプルなカード表示

3. **レッスン一覧ページ** (`/courses/[courseId]`)
   - 特定コース内のレッスン一覧
   - 各レッスンの概要と難易度表示

4. **レッスン詳細ページ** (`/courses/[courseId]/lessons/[lessonId]`)
   - **メイン学習画面**（最重要）
   - 左側：問題とプレビューをタブで切り替え
   - 右側：コードエディタ（複数タブ対応）
   - 下部：実行・リセットボタン

5. **チャレンジページ** (`/courses/[courseId]/challenges/[challengeId]`)
   - レッスン応用の演習問題
   - 自動採点機能
   - ヒント表示機能

### レッスン詳細ページのレイアウト

```
┌─────────────────────────────────────────────────────┐
│                   ヘッダー（レッスンタイトル）            │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────┬─────────────────────────┐   │
│  │ [問題] [プレビュー] │  [App.jsx][style.css]   │   │
│  ├─────────────────┼─────────────────────────┤   │
│  │                 │                         │   │
│  │  問題タブ:        │                         │   │
│  │  - レッスン説明   │     コードエディタ        │   │
│  │  - 課題内容      │                         │   │
│  │  - ヒント        │      （右側）            │   │
│  │                 │                         │   │
│  │  プレビュータブ:   │                         │   │
│  │  - 実行結果表示   │                         │   │
│  │  - コンソール     │                         │   │
│  │  - エラー表示     │                         │   │
│  │                 │                         │   │
│  │   （左側）        │                         │   │
│  │                 │                         │   │
│  ├─────────────────┼─────────────────────────┤   │
│  │                 │  [実行] [リセット]       │   │
│  │                 │  [テスト実行]           │   │
│  └─────────────────┴─────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### 左側パネル（タブ切り替え）

1. **問題タブ**
   - レッスンの説明
   - 実装すべき課題
   - ヒントや参考情報
   - Markdown形式で記述

2. **プレビュータブ**
   - Reactコンポーネントの実行結果
   - コンソール出力
   - エラーメッセージ
   - テスト結果

#### 右側パネル（コードエディタ）

- 複数ファイルのタブ切り替え
- シンタックスハイライト
- リアルタイム編集

## 技術スタック

- **フレームワーク**: Next.js 14+ (App Router)
- **言語**: TypeScript
- **エディタ**: Monaco Editor（VSCodeのエディタ）
- **実行環境**: @codesandbox/sandpack-react（コード実行環境）
- **スタイリング**: Tailwind CSS
- **コード整形**: Prettier + ESLint

## ディレクトリ構造（アトミックデザイン）

```
react-training-platform/
├── app/                        # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── courses/
│   │   ├── page.tsx
│   │   └── [courseId]/
│   │       ├── page.tsx
│   │       └── lessons/
│   │           └── [lessonId]/
│   │               └── page.tsx
│   └── api/
│       └── execute/
│           └── route.ts
├── components/
│   ├── atoms/                 # 最小単位のコンポーネント
│   │   ├── Button/
│   │   ├── Tab/
│   │   ├── Icon/
│   │   ├── Badge/
│   │   └── Card/
│   ├── molecules/             # 複数のatomsを組み合わせ
│   │   ├── TabGroup/
│   │   ├── FileTab/
│   │   ├── ActionBar/
│   │   ├── ConsoleOutput/
│   │   └── CourseCard/
│   ├── organisms/             # 独立した機能を持つ複雑なコンポーネント
│   │   ├── CodeEditor/
│   │   ├── PreviewPanel/
│   │   ├── LessonPanel/
│   │   ├── Header/
│   │   └── CourseList/
│   ├── templates/             # ページのレイアウト構造
│   │   ├── LessonTemplate/
│   │   ├── CourseListTemplate/
│   │   └── HomeTemplate/
│   └── pages/                 # 完全なページコンポーネント
│       ├── LessonPage/
│       ├── CoursesPage/
│       └── HomePage/
├── lib/
│   ├── types/
│   │   ├── course.ts
│   │   ├── lesson.ts
│   │   └── index.ts
│   └── utils/
│       ├── codeTemplates.ts
│       └── index.ts
├── data/
│   └── courses/
│       ├── react-basic/
│       │   ├── index.ts
│       │   └── lessons/
│       │       ├── 01-jsx.ts
│       │       ├── 02-components.ts
│       │       └── 03-props.ts
│       └── index.ts
├── hooks/
│   ├── useCodeExecution.ts
│   ├── useLesson.ts
│   └── index.ts
├── styles/
│   ├── editor-theme.ts
│   └── variables.css
├── public/
│   └── assets/
├── package.json
├── tsconfig.json
└── next.config.js
```

## データ構造

```typescript
interface Course {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  description: string
  initialCode: CodeFiles
  solution?: CodeFiles
}

interface CodeFiles {
  'App.jsx': string
  'index.css'?: string
  [key: string]: string | undefined
}
```

## CSS設計方針

### 最終決定事項

**エディタ部分: CSS Variables + style属性**  
**その他すべて: Tailwind CSS**

### CSS Variables vs style属性の使い分け

#### CSS Variables使用（推奨）

```css
/* 共通テーマ色の定義 */
:root {
  --editor-bg: #1e1e1e;
  --editor-text: #d4d4d4;
  --editor-border: #333333;
}
```

```tsx
/* CSS変数を参照 */
<div
  style={{
    backgroundColor: 'var(--editor-bg)',
    color: 'var(--editor-text)',
    border: '1px solid var(--editor-border)',
  }}
>
  エディタ
</div>
```

**メリット:**

- ✅ 再利用性: 一箇所で定義、どこでも使用
- ✅ 保守性: 変数値だけ変更すればOK
- ✅ テーマ切り替え: 変数値を変更するだけ

#### 実装例

```tsx
// components/organisms/CodeEditor/CodeEditor.tsx
const CodeEditor = () => {
  return (
    <div
      className="h-full overflow-hidden rounded-lg"
      style={{
        backgroundColor: 'var(--editor-bg)',
        border: '1px solid var(--editor-border)',
        fontFamily: 'var(--editor-font)',
      }}
    >
      <MonacoEditor theme="vs-dark" />
    </div>
  )
}

// components/templates/LessonTemplate/LessonTemplate.tsx
const LessonTemplate = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Tailwind CSSで統一されたUI */}
      <div className="w-1/2 border-r border-gray-200 bg-white">
        <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          実行
        </button>
      </div>
    </div>
  )
}
```

### CSS Variables設定

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* エディタ専用変数 */
  --editor-bg: #1e1e1e;
  --editor-text: #d4d4d4;
  --editor-border: #333333;
  --editor-font: 'Fira Code', 'Monaco', 'Consolas', monospace;
  --editor-line-height: 1.5;

  /* Monaco Editor テーマ色 */
  --editor-selection: #264f78;
  --editor-highlight: #2d2d30;
  --editor-comment: #6a9955;
  --editor-keyword: #569cd6;
  --editor-string: #ce9178;
}
```

## 開発環境設定

### Prettier設定 (.prettierrc.json)

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "jsxSingleQuote": false,
  "jsxBracketSameLine": false,
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindConfig": "./tailwind.config.ts"
}
```

### .prettierignore

```
# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage

# next.js
.next/
out/
build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env.local
.env.development.local
.env.test.local
.env.production.local

# turbo
.turbo

# typescript
*.tsbuildinfo
next-env.d.ts

# cache
.eslintcache
.prettierignore
```

### package.json に追加するスクリプト

```json
{
  "scripts": {
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,css,md}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,css,md}\""
  },
  "devDependencies": {
    "prettier": "^3.3.3",
    "prettier-plugin-tailwindcss": "^0.6.5"
  }
}
```

### .vscode/settings.json (VSCode用)

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### ESLint設定 (.eslintrc.json)

```json
{
  "extends": ["next/core-web-vitals", "@typescript-eslint/recommended", "prettier"],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "react/display-name": "off",
    "react/prop-types": "off"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module"
  }
}
```

### package.json 追加依存関係

```json
{
  "devDependencies": {
    "prettier": "^3.3.3",
    "prettier-plugin-tailwindcss": "^0.6.5",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.5",
    "eslint-config-prettier": "^9.1.0",
    "@typescript-eslint/eslint-plugin": "^7.18.0",
    "@typescript-eslint/parser": "^7.18.0"
  },
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,css,md}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,css,md}\"",
    "check": "npm run lint && npm run format:check"
  }
}
```

## 実装手順

1. Next.jsプロジェクトの初期セットアップ（TypeScript対応）
2. 基本レイアウトコンポーネントの作成（左右分割画面）
3. コードエディタの実装（Monaco Editor）
4. プレビュー機能の実装（iframe/sandpack）
5. レッスンデータ構造とサンプルレッスンの作成
6. コードのリアルタイム実行・プレビュー更新機能
7. UIの調整とスタイリング
8. エラーハンドリングと開発者体験の改善

## 重要な仕様

- データは保存しないため、進捗状況の永続化は不要
- 認証機能は必要なし
- リアルタイムでのコード実行とプレビュー更新が最重要機能
- レスポンシブデザイン対応
- アクセシビリティ対応

## 実装進捗と技術的な課題

### 実装完了項目

1. ✅ **Next.jsプロジェクトの初期セットアップ**
   - TypeScript対応
   - Prettier、ESLint設定
   - Tailwind CSS導入

2. ✅ **基本レイアウトコンポーネント**
   - アトミックデザインパターンでの構造化
   - 左右分割レイアウト（50%ずつ）
   - タブグループによる問題/プレビュー切り替え

3. ✅ **Monaco Editorの実装**
   - VSCode風のコードエディタ
   - 複数ファイルタブ（App.jsx, index.css）
   - ダークテーマとシンタックスハイライト
   - CSS Variables使用でテーマ統一

4. ✅ **Sandpackプレビュー機能**
   - SSR/ハイドレーションエラーの解決
   - dynamic importによるクライアントサイドレンダリング
   - プレビューのみ表示の実装

### 技術的な課題と解決策

#### 1. Sandpack SSR/ハイドレーションエラー

**問題**: 
- Sandpackコンポーネントがサーバーサイドレンダリングでエラー
- "A tree hydrated but some attributes..." エラー

**解決策**:
```typescript
// Next.js dynamic importでSSR無効化
const Sandpack = dynamic(
  () => import('@codesandbox/sandpack-react').then(mod => mod.Sandpack),
  { ssr: false }
)
```

#### 2. Sandpackプレビューオプション設定

**問題**: 
- `editorHeight: 0`, `editorWidthPercentage: 0` で表示されない
- エディター部分の非表示化が困難

**解決策**:
```typescript
// 動作する安全なオプション設定
options={{
  showNavigator: false,
  showTabs: false,
  showLineNumbers: false,
  showEditor: false,     // エディター非表示
  layout: 'preview',     // プレビューレイアウト
}}
```

#### 3. ブラウザ拡張機能によるハイドレーションエラー

**問題**: 
- ColorZilla等の拡張機能が `cz-shortcut-listen="true"` 属性を追加
- SSRとクライアントのHTML不整合でエラー

**解決策**:
```tsx
// layout.tsx でハイドレーション警告を抑制
<body suppressHydrationWarning={true}>
  {children}
</body>
```

### 現在の実装状況

#### コンポーネント構造
```
src/components/
├── atoms/           # Button, Tab等
├── molecules/       # TabGroup, ActionBar等  
├── organisms/       # CodeEditor, PreviewPanel等
├── templates/       # LessonTemplate
└── pages/          # (未実装)
```

#### 動作中の機能
- ✅ Monaco Editorでのコード編集
- ✅ Sandpackプレビュー表示
- ✅ 問題/プレビュータブ切り替え
- ✅ 複数ファイル編集（App.jsx, index.css）
- ✅ リアルタイムプレビュー更新

### 失敗した実装アプローチ

#### 1. カスタムiframe実装
- Cross-originエラーで断念
- data URLアプローチも試したが複雑

#### 2. SandpackProvider + SandpackPreview
- コンポーネント分離での表示エラー
- dynamic importの組み合わせで問題

#### 3. 複雑なSSR回避手法
- useEffect + useState の組み合わせ
- Next.js dynamic importがシンプルで確実

### 学んだベストプラクティス

1. **SSR問題の対処**: dynamic import with `ssr: false`
2. **Sandpackオプション**: 段階的にオプション追加、エラー確認
3. **ハイドレーション**: 外部要因は `suppressHydrationWarning` で対処
4. **デバッグ**: 最小構成から徐々に機能追加

### 最新の変更履歴（2025-08-16）

#### ActionBar削除（完了）
- ✅ `/src/components/molecules/ActionBar/` ディレクトリ削除
- ✅ LessonTemplateからActionBarのimport削除
- ✅ ActionBarコンポーネントの使用箇所削除
- ✅ 不要な状態管理コード削除（`isRunning`, `handleRun`, `handleReset`, `handleTest`）

#### フッター追加（完了）
- ✅ `/src/components/organisms/Footer/` コンポーネント作成
- ✅ 3つのボタン実装：
  - 「レッスン一覧」（secondary）
  - 「教材を確認」（secondary）
  - 「答えを見る」（primary）
- ✅ LessonTemplateにフッター統合（メインコンテンツ下部）
- ✅ 中央揃えレイアウトとスタイリング

#### 現在のレイアウト構造
```
┌─────────────────────────────────────────────┐
│               ヘッダー                      │
├─────────────────────────────────────────────┤
│ ┌─────────────────┬─────────────────────────┐ │
│ │ [問題] [プレビュー] │  [App.jsx][style.css]   │ │
│ ├─────────────────┼─────────────────────────┤ │
│ │     左側パネル     │      右側パネル         │ │
│ │   (問題/プレビュー) │    (コードエディタ)      │ │
│ └─────────────────┴─────────────────────────┘ │
├─────────────────────────────────────────────┤
│        [レッスン一覧] [教材を確認] [答えを見る]    │
│                   フッター                   │
└─────────────────────────────────────────────┘
```

### 次の実装予定

1. **レッスンデータ構造の作成**
   - TypeScript型定義
   - サンプルレッスンデータ
   
2. **動的ファイル読み込み**
   - MonacoエディタからSandpackへのファイル連携
   
3. **フッターボタン機能実装**
   - レッスン一覧ナビゲーション
   - 教材確認モーダル/ページ
   - 答え表示機能
   
4. **UIの調整**
   - レスポンシブ対応
   - エラー表示の改善
