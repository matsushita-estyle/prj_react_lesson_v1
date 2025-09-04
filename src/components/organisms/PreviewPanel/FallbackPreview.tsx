'use client'

import React from 'react'

interface FallbackPreviewProps {
  files: Record<string, string>
  className?: string
}

const FallbackPreview: React.FC<FallbackPreviewProps> = ({ files, className = '' }) => {
  const appCode = files['App.jsx'] || ''
  const cssCode = files['index.css'] || ''

  // 簡易的なJSX解析（デモ用）
  const extractJSXContent = (code: string) => {
    try {
      // returnの後の内容を取得（簡易版）
      const returnMatch = code.match(/return\s*\(([\s\S]*?)\);/)
      if (returnMatch) {
        return returnMatch[1].trim()
      }
      return code
    } catch {
      return code
    }
  }

  extractJSXContent(appCode)

  return (
    <div className={`h-full ${className}`}>
      <div className="flex h-full flex-col">
        <div className="flex-1 bg-white p-4">
          <div className="mb-4 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
            <strong>プレビューモード:</strong> Sandpack読み込み中の代替表示
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700">App.jsx の内容:</h3>
              <div className="rounded bg-gray-100 p-3 font-mono text-sm">
                <pre className="whitespace-pre-wrap text-xs text-gray-800">{appCode}</pre>
              </div>
            </div>

            {cssCode && (
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-700">CSS の内容:</h3>
                <div className="rounded bg-gray-100 p-3 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-xs text-gray-800">{cssCode}</pre>
                </div>
              </div>
            )}

            <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900">React プレビュー</h3>
                <p className="text-gray-600">Sandpackを読み込み中...</p>
                <p className="mt-2 text-sm text-gray-500">
                  実際のReactコンポーネントはSandpackで実行されます
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FallbackPreview