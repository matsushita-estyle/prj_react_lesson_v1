import React from 'react'
import Modal from '@/components/molecules/Modal'
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
  if (!lesson) return null

  // lessonのmaterialフィールドから教材を取得、なければデフォルトメッセージ
  const materialContent = lesson.material || '教材コンテンツが設定されていません。'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${lesson.title} - 教材`}>
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
    </Modal>
  )
}

export default LessonMaterialModal
