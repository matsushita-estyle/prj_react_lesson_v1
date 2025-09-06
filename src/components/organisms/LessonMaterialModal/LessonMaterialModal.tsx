import React from 'react'
import { Lesson } from '@/lib/types/lesson'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

interface LessonMaterialModalProps {
  isOpen: boolean
  onClose: () => void
  lesson: Lesson | null
}

const LessonMaterialModal: React.FC<LessonMaterialModalProps> = ({ isOpen, onClose, lesson }) => {
  if (!lesson || !isOpen) return null

  // lessonのmaterialフィールドから教材を取得、なければデフォルトメッセージ
  const materialContent = lesson.material || '教材コンテンツが設定されていません。'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* オーバーレイ */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* モーダルコンテンツ */}
      <div className="relative z-10 w-full max-w-4xl max-h-[80vh] bg-white rounded-lg shadow-xl">
        {/* カスタムヘッダー */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="relative inline-block">
            <div className="relative flex items-center gap-3 pb-2">
              {/* Favicon */}
              <img src="/favicon.svg" alt="React Logo" className="h-8 w-8" />
              
              {/* レッスンラベル */}
              {lesson.lessonNumber && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500">
                    LESSON {lesson.lessonNumber}
                  </span>
                  <span className="text-gray-400">|</span>
                </div>
              )}

              {/* タイトル */}
              <h2 className="text-xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {lesson.title}
                </span>
              </h2>
            </div>

            {/* 下線 */}
            <span className="absolute right-0 bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold px-3 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* コンテンツ */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkBreaks, remarkGfm]}
          components={{
            code({
              node,
              inline,
              className,
              children,
              ...props
            }: {
              node?: any
              inline?: boolean
              className?: string
              children?: React.ReactNode
            }) {
              const match = /language-(\w+)/.exec(className || '')
              const language = match ? match[1] : 'javascript'
              
              return !inline && match ? (
                <div className="mb-4 overflow-hidden rounded-lg border border-gray-700">
                  <div className="bg-gray-800 px-4 py-2 text-sm text-white">
                    {language.toUpperCase()} コード例
                  </div>
                  <SyntaxHighlighter
                    language={language}
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      fontSize: '14px'
                    }}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
            h1: ({ children }) => (
              <h1 className="mt-6 mb-4 text-2xl font-bold text-gray-900">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="mt-5 mb-3 text-xl font-semibold text-gray-800">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-4 mb-2 text-lg font-medium text-gray-700">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-3 leading-relaxed text-gray-700">{children}</p>
            ),
            table: ({ children }) => (
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 mb-4">
                {children}
              </table>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-50">{children}</thead>
            ),
            tbody: ({ children }) => (
              <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
            ),
            tr: ({ children }) => (
              <tr>{children}</tr>
            ),
            th: ({ children }) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {children}
              </td>
            ),
          }}
        >
          {materialContent}
        </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonMaterialModal
