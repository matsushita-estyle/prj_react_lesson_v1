import React from 'react'
import { TextBookSection as TextBookSectionType } from '@/lib/types/lesson'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
interface TextBookSectionProps {
  section: TextBookSectionType
}

const getStyleClasses = (style: TextBookSectionType['visualStyle'], customBgColor?: string) => {
  if (customBgColor) {
    return {
      container: `border-l-4 border-gray-300 p-6 mb-6 rounded-lg shadow-sm`,
      background: { backgroundColor: customBgColor }
    }
  }

  switch (style) {
    case 'info':
      return {
        container: 'border-l-4 border-blue-500 bg-blue-50 p-6 mb-6 rounded-lg shadow-sm',
        background: {}
      }
    case 'highlight':
      return {
        container: 'border-l-4 border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 mb-6 rounded-lg shadow-sm',
        background: {}
      }
    case 'warning':
      return {
        container: 'border-l-4 border-orange-500 bg-orange-50 p-6 mb-6 rounded-lg shadow-sm',
        background: {}
      }
    case 'success':
      return {
        container: 'border-l-4 border-green-500 bg-green-50 p-6 mb-6 rounded-lg shadow-sm',
        background: {}
      }
    default:
      return {
        container: 'border-l-4 border-gray-300 bg-white p-6 mb-6 rounded-lg shadow-sm',
        background: {}
      }
  }
}

const TextBookSection: React.FC<TextBookSectionProps> = ({ section }) => {
  const styles = getStyleClasses(section.visualStyle, section.backgroundColor)

  return (
    <div 
      className={styles.container}
      style={styles.background}
    >
      {/* セクションヘッダー */}
      <div className="mb-6">
        <div className="relative pb-3">
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
            {section.title}
          </h3>
          {/* タイトル全体にかかるアンダーバー */}
          <div className={`absolute bottom-0 left-0 h-1 w-full rounded-full ${
            section.visualStyle === 'info' ? 'bg-gradient-to-r from-blue-500 to-blue-300' :
            section.visualStyle === 'highlight' ? 'bg-gradient-to-r from-yellow-500 to-orange-400' :
            section.visualStyle === 'warning' ? 'bg-gradient-to-r from-orange-500 to-red-400' :
            section.visualStyle === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
            'bg-gradient-to-r from-gray-500 to-gray-300'
          }`} />
        </div>
      </div>

      {/* セクションコンテンツ */}
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkBreaks, remarkGfm]}
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }: {
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
              <h3 className="mt-4 mb-2 text-lg font-semibold text-gray-900">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="mt-3 mb-2 text-base font-medium text-gray-700">{children}</h4>
            ),
            p: ({ children }) => (
              <p className="mb-3 leading-relaxed text-gray-700">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="mb-3 pl-4 space-y-1">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="text-gray-700 leading-relaxed">{children}</li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900">{children}</strong>
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
          {section.content}
        </ReactMarkdown>
      </div>

      {/* 視覚的なデモ */}
      {section.visualDemo && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="text-sm font-medium text-gray-600 mb-3">デモ：</div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            {section.visualDemo}
          </div>
        </div>
      )}
    </div>
  )
}

export default TextBookSection