import React, { useState, useEffect } from 'react'
import { X, ChevronDown, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
  lessons: Array<{
    chapterTitle: string
    chapterLessons: Array<{
      id: string
      title: string
      href: string
      isAvailable?: boolean
    }>
  }>
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, lessons }) => {
  const pathname = usePathname()
  const [expandedChapters, setExpandedChapters] = useState<Record<number, boolean>>({})

  // 現在のレッスンがあるチャプターを見つけて自動で開く
  useEffect(() => {
    const currentChapterIndex = lessons.findIndex((chapter) =>
      chapter.chapterLessons.some((lesson) => lesson.href === pathname)
    )

    if (currentChapterIndex !== -1) {
      setExpandedChapters((prev) => ({
        ...prev,
        [currentChapterIndex]: true,
      }))
    }
  }, [lessons, pathname])

  const handleLessonClick = (href: string) => {
    window.location.href = href
    onClose()
  }

  const toggleChapter = (chapterIndex: number) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterIndex]: !prev[chapterIndex],
    }))
  }

  if (!isOpen) return null

  return (
    <>
      {/* オーバーレイ */}
      <div
        className="animate-fadeIn fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        onClick={onClose}
      />

      {/* サイドメニュー */}
      <div className="animate-slideInLeft fixed top-0 left-0 z-50 h-full w-80 bg-gray-900 shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-700 p-4">
          <h2 className="text-lg font-semibold text-white">Chapters</h2>
          <button onClick={onClose} className="text-gray-400 transition-colors hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-2 p-4">
          {lessons.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="space-y-1">
              <button
                onClick={() => toggleChapter(chapterIndex)}
                className="flex w-full items-center justify-between rounded-md bg-gray-800 p-3 text-left text-sm text-white transition-colors hover:bg-gray-700"
              >
                <span className="font-semibold">{chapter.chapterTitle}</span>
                {expandedChapters[chapterIndex] ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </button>
              {expandedChapters[chapterIndex] && (
                <div className="ml-4 space-y-1">
                  {chapter.chapterLessons.map((lesson) => {
                    const isCurrentLesson = lesson.href === pathname
                    const isAvailable = lesson.isAvailable !== false
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => isAvailable && handleLessonClick(lesson.href)}
                        disabled={!isAvailable}
                        className={`w-full rounded-md p-3 text-left text-sm transition-colors ${
                          !isAvailable
                            ? 'cursor-not-allowed bg-gray-800/50 text-gray-500'
                            : isCurrentLesson
                              ? 'bg-blue-600 font-semibold text-white'
                              : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{lesson.title}</span>
                          {!isAvailable && <span className="text-xs text-gray-500">準備中</span>}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SideMenu
