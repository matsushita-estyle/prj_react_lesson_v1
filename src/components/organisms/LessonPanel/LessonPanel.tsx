import React from 'react'
import TabGroup from '@/components/molecules/TabGroup'
import BrowserFrame from '@/components/molecules/BrowserFrame'

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
      label: 'LESSON',
      content: (
        <div className="h-full overflow-y-auto p-6">
          <div className="max-w-none">{lessonContent}</div>
        </div>
      ),
    },
    {
      id: 'preview',
      label: 'PREVIEW',
      content: <BrowserFrame>{previewContent}</BrowserFrame>,
    },
  ]

  return (
    <div className={`flex h-full flex-col bg-white ${className}`}>
      <TabGroup tabs={tabs} defaultActiveId="lesson" />
    </div>
  )
}

export default LessonPanel
