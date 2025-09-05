import { Lesson, ProjectFile } from '@/lib/types/lesson'

/**
 * ファイルパスから言語を推測する
 */
function getLanguageFromPath(path: string): string {
  const extension = path.split('.').pop()?.toLowerCase()
  
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'javascript'
    case 'ts':
    case 'tsx':
      return 'typescript'
    case 'css':
      return 'css'
    case 'html':
      return 'html'
    case 'json':
      return 'json'
    case 'md':
      return 'markdown'
    default:
      return 'text'
  }
}

/**
 * レッスンのファイル構造を正規化する
 * 新形式（projectStructure）優先、後方互換性も保つ
 */
export function normalizeProjectFiles(lesson: Lesson): ProjectFile[] {
  // 新形式がある場合はそれを使用
  if (lesson.projectStructure) {
    return lesson.projectStructure.files
  }
  
  // 既存形式から変換
  const legacyFiles = lesson.initialEditorFiles || lesson.initialFiles || {}
  
  return Object.entries(legacyFiles).map(([path, content], index) => ({
    path,
    content,
    language: getLanguageFromPath(path),
    order: index
  }))
}

/**
 * デフォルトファイルを取得する
 */
export function getDefaultFile(lesson: Lesson): string {
  // 新形式のデフォルトファイル
  if (lesson.projectStructure?.defaultFile) {
    return lesson.projectStructure.defaultFile
  }
  
  // レッスンレベルのデフォルトファイル
  if (lesson.defaultFile) {
    return lesson.defaultFile
  }
  
  // 既存形式から最初のファイルを取得
  const legacyFiles = lesson.initialEditorFiles || lesson.initialFiles || {}
  const firstFile = Object.keys(legacyFiles)[0]
  
  return firstFile || ''
}

/**
 * ProjectFile配列をRecord<string, string>形式に変換する（後方互換性）
 */
export function projectFilesToRecord(files: ProjectFile[]): Record<string, string> {
  return files.reduce((acc, file) => {
    acc[file.path] = file.content
    return acc
  }, {} as Record<string, string>)
}