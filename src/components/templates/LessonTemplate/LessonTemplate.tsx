'use client'

import React, { useState } from 'react'
import Header from '@/components/organisms/Header'
import LessonPanel from '@/components/organisms/LessonPanel'
import CodeEditor from '@/components/organisms/CodeEditor'
import PreviewPanel from '@/components/organisms/PreviewPanel'
import Footer from '@/components/organisms/Footer'
import LessonMaterialModal from '@/components/organisms/LessonMaterialModal'
import LessonContent from '@/components/organisms/LessonContent'
import ResizablePanel from '@/components/molecules/ResizablePanel'
import SideMenu from '@/components/molecules/SideMenu'
import ConfirmModal from '@/components/molecules/ConfirmModal'
import { useSideMenu } from '@/hooks/useSideMenu'
import { Lesson } from '@/lib/types/lesson'
import { allLessons, getAvailableLessons } from '@/data/lessons'

interface LessonTemplateProps {
  lessonTitle: string
  courseTitle: string
  initialFiles: Record<string, string>
  lesson?: Lesson
}

const LessonTemplate: React.FC<LessonTemplateProps> = ({
  lessonTitle,
  courseTitle,
  initialFiles,
  lesson,
}) => {
  const [files, setFiles] = useState(initialFiles)
  const [activeFile, setActiveFile] = useState(
    lesson?.defaultFile && lesson.defaultFile in initialFiles 
      ? lesson.defaultFile 
      : Object.keys(initialFiles)[0] || ''
  )
  const [originalFiles] = useState(initialFiles)
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false)
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false)
  const [editorInstance, setEditorInstance] = useState<import('monaco-editor').editor.IStandaloneCodeEditor | null>(null)
  const { isOpen: isSideMenuOpen, closeSideMenu } = useSideMenu()

  const handleFileChange = (fileName: string, content: string) => {
    setFiles((prev) => ({
      ...prev,
      [fileName]: content,
    }))
  }

  const handleDirectoryAdd = (parentPath: string, directoryName: string) => {
    // 空のディレクトリを表示するため.gitkeepファイルを作成
    const directoryPath = parentPath ? `${parentPath}/${directoryName}` : directoryName
    const gitkeepPath = `${directoryPath}/.gitkeep`
    setFiles((prev) => ({
      ...prev,
      [gitkeepPath]: '',
    }))
  }

  const handleFileAdd = (parentPath: string, fileName: string) => {
    const filePath = parentPath ? `${parentPath}/${fileName}` : fileName
    setFiles((prev) => ({
      ...prev,
      [filePath]: '',
    }))
    setActiveFile(filePath)
  }

  const handleRename = (oldPath: string, newPath: string) => {
    if (oldPath === newPath) return
    
    setFiles((prev) => {
      const newFiles = { ...prev }
      
      // oldPathがディレクトリの場合、そのディレクトリ内のすべてのファイルの名前を変更
      const filesToRename = Object.keys(newFiles).filter(path => 
        path === oldPath || path.startsWith(oldPath + '/')
      )
      
      filesToRename.forEach(filePath => {
        const relativePath = filePath.substring(oldPath.length)
        const newFilePath = newPath + relativePath
        newFiles[newFilePath] = newFiles[filePath]
        delete newFiles[filePath]
        
        // アクティブファイルが変更されたファイルの場合、新しいパスに更新
        if (filePath === activeFile) {
          setActiveFile(newFilePath)
        }
      })
      
      return newFiles
    })
  }

  const handleDelete = (path: string) => {
    setFiles((prev) => {
      const newFiles = { ...prev }
      
      // pathがディレクトリの場合、そのディレクトリ内のすべてのファイルを削除
      const filesToDelete = Object.keys(newFiles).filter(filePath => 
        filePath === path || filePath.startsWith(path + '/')
      )
      
      filesToDelete.forEach(filePath => {
        delete newFiles[filePath]
        
        // 削除されたファイルがアクティブファイルの場合、別のファイルをアクティブにする
        if (filePath === activeFile) {
          const remainingFiles = Object.keys(newFiles).filter(f => !f.endsWith('/.gitkeep'))
          setActiveFile(remainingFiles.length > 0 ? remainingFiles[0] : '')
        }
      })
      
      return newFiles
    })
  }


  const handleCheckMaterials = () => {
    setIsMaterialModalOpen(true)
  }

  const handleApplyCode = (fileName: string, code: string) => {
    setFiles((prev) => ({
      ...prev,
      [fileName]: code,
    }))
    // 反映したファイルをアクティブにする
    setActiveFile(fileName)
  }

  const handleReset = () => {
    setFiles(originalFiles)
    setActiveFile(
      lesson?.defaultFile && lesson.defaultFile in originalFiles
        ? lesson.defaultFile
        : Object.keys(originalFiles)[0] || ''
    )
  }

  const handleResetRequest = () => {
    setIsResetConfirmOpen(true)
  }

  const handleFormatCode = () => {
    if (editorInstance) {
      editorInstance.getAction('editor.action.formatDocument')?.run();
    }
  }


  const lessonContent = lesson ? (
    <LessonContent
      lessonTitle={lessonTitle}
      taskDescription={lesson.taskDescription}
      steps={lesson.steps}
      onApplyCode={handleApplyCode}
      nextLessonId={lesson.nextLessonId}
    />
  ) : null

  const previewContent = <PreviewPanel code={files} />

  // 全レッスンをチャプターごとにグループ化
  const availableLessons = getAvailableLessons()
  const availableIds = new Set(availableLessons.map(l => l.id))
  
  const lessons = [
    {
      chapterTitle: 'チャプター１',
      chapterLessons: allLessons.map((lesson, index) => ({
        id: lesson.id,
        title: `${String(index + 1).padStart(2, '0')}. ${lesson.title}`,
        href: `/lessons/${lesson.id}`,
        isAvailable: availableIds.has(lesson.id),
      })),
    },
  ]

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* ヘッダー */}
      <Header lessonTitle={lessonTitle} courseTitle={courseTitle} lessons={lessons} />

      {/* メインコンテンツ */}
      <ResizablePanel
        className="h-[calc(100vh-128px)] flex-1 overflow-hidden"
        leftPanel={<LessonPanel lessonContent={lessonContent} previewContent={previewContent} />}
        rightPanel={
          <CodeEditor
            files={files}
            activeFile={activeFile}
            onFileChange={handleFileChange}
            onActiveFileChange={setActiveFile}
            onDirectoryAdd={handleDirectoryAdd}
            onFileAdd={handleFileAdd}
            onRename={handleRename}
            onDelete={handleDelete}
            onEditorReady={setEditorInstance}
            className="h-full"
          />
        }
        initialLeftWidth={50}
        minLeftWidth={25}
        maxLeftWidth={75}
      />

      {/* フッター */}
      <Footer
        onCheckMaterials={handleCheckMaterials}
        nextLessonId={lesson?.nextLessonId}
        prevLessonId={lesson?.previousLessonId}
        isNextLessonAvailable={lesson?.nextLessonId ? availableIds.has(lesson.nextLessonId) : true}
        onReset={handleResetRequest}
        onFormat={handleFormatCode}
      />

      {/* サイドメニュー */}
      <SideMenu isOpen={isSideMenuOpen} onClose={closeSideMenu} lessons={lessons} />

      {/* 教材確認モーダル */}
      <LessonMaterialModal
        isOpen={isMaterialModalOpen}
        onClose={() => setIsMaterialModalOpen(false)}
        lesson={lesson || null}
      />

      {/* リセット確認モーダル */}
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleReset}
        title="コードをリセット"
        message={`編集したコードを初期状態に戻します。
この操作は元に戻すことができません。`}
        confirmText="リセット"
        cancelText="キャンセル"
      />
    </div>
  )
}

export default LessonTemplate
