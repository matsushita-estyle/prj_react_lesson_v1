'use client'

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Sandpackコンポーネントの型定義
interface SandpackProps {
  template: string
  files: Record<string, string>
  options?: {
    showNavigator?: boolean
    showTabs?: boolean
    showLineNumbers?: boolean
    showEditor?: boolean
    showConsole?: boolean
    showInlineErrors?: boolean
    showRefreshButton?: boolean
    editorHeight?: number
    editorWidthPercentage?: number
    layout?: string
    [key: string]: string | number | boolean | string[] | undefined
  }
}

// 完全にSSRを無効化してSandpackをインポート
const Sandpack = dynamic(
  () =>
    import('@codesandbox/sandpack-react').then(
      (mod) => mod.Sandpack as ComponentType<SandpackProps>
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">プレビューを読み込み中...</div>
      </div>
    ),
  }
)

interface SimpleSandpackProps {
  files: Record<string, string>
  className?: string
}

const SimpleSandpack: React.FC<SimpleSandpackProps> = ({ files, className = '' }) => {
  // ファイルパスの形式を統一（先頭に"/"を追加）
  const normalizeFiles = (inputFiles: Record<string, string>): Record<string, string> => {
    const normalized: Record<string, string> = {}
    for (const [key, value] of Object.entries(inputFiles)) {
      const normalizedKey = key.startsWith('/') ? key : `/${key}`
      normalized[normalizedKey] = value
    }

    // App.jsxをメインエントリーとして使用

    return normalized
  }

  // スクロール制御のためのカスタムスタイル
  const styleOverride = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`

  // 渡されたfilesを正規化し、空の場合はデフォルトを使用
  const normalizedFiles =
    Object.keys(files).length > 0
      ? normalizeFiles(files)
      : {
          '/App.jsx': `export default function App() {
  return <div>コードエディタで編集してください</div>;
}`,
        }

  // Sandpackに渡すファイル群
  const sandpackFiles: Record<string, string> = {
    ...normalizedFiles,
    // styles.cssがレッスンファイルに含まれていない場合のみデフォルトを使用
    ...(normalizedFiles['/styles.css'] ? {} : { '/styles.css': styleOverride }),
    // App.jsxをエントリーポイントとして使用するためのindex.js
    '/index.js': `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './react-app/App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
  }

  return (
    <>
      <style jsx global>{`
        /* Sandpack全体の高さ設定 */
        .sp-wrapper {
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
        }

        .sp-layout {
          height: 100% !important;
          flex: 1 !important;
        }

        .sp-stack {
          height: 100% !important;
        }

        .sp-preview-container {
          height: 100% !important;
          overflow: hidden !important;
        }

        .sp-preview-iframe {
          width: 100% !important;
          height: 100% !important;
          border: none !important;
          display: block !important;
        }

        /* スクロールバーを無効化 */
        .sp-preview-container > div {
          height: 100% !important;
          overflow: hidden !important;
        }

        /* preview-actionsを非表示 */
        [class*='sp-preview-actions'] {
          display: none !important;
        }
      `}</style>

      <div className={`h-full ${className}`}>
        <Sandpack
          template="react"
          files={sandpackFiles}
          options={{
            showNavigator: false,
            showTabs: false,
            showLineNumbers: false,
            showEditor: false,
            showConsole: false,
            showInlineErrors: false,
            showRefreshButton: false,
            editorWidthPercentage: 1,
            layout: 'preview',
            externalResources: [],
          }}
        />
      </div>
    </>
  )
}

export default SimpleSandpack
