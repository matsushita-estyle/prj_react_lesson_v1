import React from 'react'
import MonacoCodeEditor from './MonacoCodeEditor'

interface CodeEditorProps {
  files: Record<string, string>
  activeFile: string
  onFileChange?: (fileName: string, content: string) => void
  onActiveFileChange?: (fileName: string) => void
  onDirectoryAdd?: (parentPath: string, directoryName: string) => void
  onFileAdd?: (parentPath: string, fileName: string) => void
  onRename?: (oldPath: string, newPath: string) => void
  onDelete?: (path: string) => void
  className?: string
}

const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  return <MonacoCodeEditor {...props} />
}

export default CodeEditor
