import React from 'react'
import Modal from '@/components/molecules/Modal'
import { Lesson } from '@/lib/types/lesson'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface LessonMaterialModalProps {
  isOpen: boolean
  onClose: () => void
  lesson: Lesson | null
}

const LessonMaterialModal: React.FC<LessonMaterialModalProps> = ({ isOpen, onClose, lesson }) => {
  if (!lesson) return null

  const renderMarkdownContent = (content: string) => {
    const lines = content.trim().split('\n')
    const elements: React.ReactNode[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="mt-6 mb-4 text-2xl font-bold text-gray-900">
            {line.slice(2)}
          </h1>
        )
        i++
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="mt-5 mb-3 text-xl font-semibold text-gray-800">
            {line.slice(3)}
          </h2>
        )
        i++
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="mt-4 mb-2 text-lg font-medium text-gray-700">
            {line.slice(4)}
          </h3>
        )
        i++
      } else if (line.startsWith('```')) {
        // コードブロックの開始
        const codeLines = []
        const language = line.slice(3).trim() // 言語指定を取得
        i++ // ```行をスキップ

        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i])
          i++
        }

        if (i < lines.length) {
          i++ // 終了の```行をスキップ
        }

        const codeContent = codeLines.join('\n')

        elements.push(
          <div key={`code-${i}`} className="mb-4 overflow-hidden rounded-lg border border-gray-700">
            <div className="bg-gray-800 px-4 py-2 text-sm text-white">
              {language ? `${language.toUpperCase()} コード例` : 'コード例'}
            </div>
            <SyntaxHighlighter
              language={language || 'javascript'}
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: '14px'
              }}
            >
              {codeContent}
            </SyntaxHighlighter>
          </div>
        )
      } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
        elements.push(
          <p key={i} className="mb-3 font-semibold text-gray-800">
            {line.slice(2, -2)}
          </p>
        )
        i++
      } else if (line.trim() === '') {
        i++
        continue
      } else {
        elements.push(
          <p key={i} className="mb-3 leading-relaxed text-gray-700">
            {line}
          </p>
        )
        i++
      }
    }

    return elements
  }

  // lessonのmaterialフィールドから教材を取得、なければデフォルトメッセージ
  const materialContent = lesson.material || '教材コンテンツが設定されていません。'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${lesson.title} - 教材`}>
      <div className="prose max-w-none">{renderMarkdownContent(materialContent)}</div>
    </Modal>
  )
}

export default LessonMaterialModal
