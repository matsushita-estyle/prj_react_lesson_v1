import React from 'react'
import TabGroup from '@/components/molecules/TabGroup'

interface LessonPanelProps {
  lessonContent: React.ReactNode
  previewContent: React.ReactNode
  className?: string
}

const LessonPanel: React.FC<LessonPanelProps> = ({
  lessonContent,
  previewContent,
  className = '',
}) => {
  const tabs = [
    {
      id: 'lesson',
      label: 'レッスン',
      content: (
        <div className="p-6 h-full overflow-y-auto">
          <div className="max-w-none">
            {lessonContent}
          </div>
        </div>
      ),
    },
    {
      id: 'preview',
      label: 'プレビュー',
      content: (
        <div className="h-full">
          <div className="p-3 bg-gray-100 border-b border-gray-200">
            <p className="text-sm text-gray-700">
              あなたのコードの実行結果
            </p>
          </div>
          <div className="h-[calc(100%-3rem)]">{previewContent}</div>
        </div>
      ),
    },
  ]

  return (
    <div className={`flex h-full flex-col bg-white ${className}`}>
      <TabGroup tabs={tabs} defaultActiveId="lesson" />
    </div>
  )
}

export default LessonPanel
