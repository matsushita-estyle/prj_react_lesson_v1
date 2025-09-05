'use client'

import React from 'react'
import LessonTemplate from '@/components/templates/LessonTemplate'
import { Lesson } from '@/lib/types/lesson'
import { normalizeProjectFiles, getDefaultFile, projectFilesToRecord } from '@/lib/utils/lessonUtils'

interface LessonDetailPageProps {
  lesson: Lesson
}

export default function LessonDetailPage({ lesson }: LessonDetailPageProps) {
  // 新形式と既存形式の両方に対応
  const projectFiles = normalizeProjectFiles(lesson)
  const defaultFile = getDefaultFile(lesson)
  const legacyFiles = projectFilesToRecord(projectFiles)

  return (
    <LessonTemplate
      lessonTitle={lesson.title}
      courseTitle={`レッスン ${lesson.lessonNumber}`}
      initialFiles={legacyFiles}
      projectFiles={projectFiles}
      defaultFile={defaultFile}
      lesson={lesson}
    />
  )
}