'use client'

import React from 'react'
import LessonTemplate from '@/components/templates/LessonTemplate'
import { Lesson } from '@/lib/types/lesson'

interface LessonDetailPageProps {
  lesson: Lesson
}

export default function LessonDetailPage({ lesson }: LessonDetailPageProps) {
  return (
    <LessonTemplate
      lessonTitle={lesson.title}
      courseTitle={`レッスン ${lesson.lessonNumber}`}
      initialFiles={lesson.initialEditorFiles || lesson.initialFiles || {}}
      lesson={lesson}
    />
  )
}