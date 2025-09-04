'use client'

import React, { useState } from 'react'
import {
  Folder,
  FolderOpen,
  File,
  FileText,
  FileCode,
  Braces,
  Hash,
  Globe,
  FolderPlus,
  FilePlus
} from 'lucide-react'

interface FileTreeNode {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: FileTreeNode[]
}

interface FileTreeProps {
  files: Record<string, string>
  activeFile: string
  onFileSelect: (fileName: string) => void
  onDirectoryAdd?: (parentPath: string, directoryName: string) => void
  onFileAdd?: (parentPath: string, fileName: string) => void
  onRename?: (oldPath: string, newPath: string) => void
  onDelete?: (path: string) => void
  className?: string
}

const FileTree: React.FC<FileTreeProps> = ({
  files,
  activeFile,
  onFileSelect,
  onDirectoryAdd,
  onFileAdd,
  onRename,
  onDelete,
  className = '',
}) => {
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(['', 'react-app']))
  const [showAddDirInput, setShowAddDirInput] = useState<string | null>(null)
  const [showAddFileInput, setShowAddFileInput] = useState<string | null>(null)
  const [showContextMenu, setShowContextMenu] = useState<{ path: string; x: number; y: number; type: 'file' | 'directory' } | null>(null)
  const [showRenameInput, setShowRenameInput] = useState<string | null>(null)
  const [newDirName, setNewDirName] = useState('')
  const [newFileName, setNewFileName] = useState('')
  const [renameValue, setRenameValue] = useState('')

  const buildFileTree = (filePaths: string[]): FileTreeNode[] => {
    const pathMap = new Map<string, FileTreeNode>()

    // ルートディレクトリを作成
    pathMap.set('', { name: '', path: '', type: 'directory', children: [] })

    filePaths.forEach((filePath) => {
      const parts = filePath.split('/')
      let currentPath = ''

      parts.forEach((part, index) => {
        const parentPath = currentPath
        currentPath = currentPath ? `${currentPath}/${part}` : part
        
        if (!pathMap.has(currentPath)) {
          const isFile = index === parts.length - 1
          const node: FileTreeNode = {
            name: part,
            path: currentPath,
            type: isFile ? 'file' : 'directory',
            children: isFile ? undefined : []
          }
          
          pathMap.set(currentPath, node)
          
          // 親ディレクトリに追加
          const parent = pathMap.get(parentPath)
          if (parent && parent.children) {
            parent.children.push(node)
          }
        }
      })
    })

    return pathMap.get('')?.children || []
  }

  const ReactIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89zM7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96zm.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51zm6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47zM12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72zm0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72zM16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96zm-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51zm1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z"
        fill="#61DAFB"
      />
    </svg>
  )

  const getFileIcon = (fileName: string): React.ReactNode => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    const iconProps = { size: 16, className: 'text-gray-400' }
    
    switch (extension) {
      case 'jsx':
      case 'tsx':
        return <ReactIcon />
      case 'js':
        return <FileCode {...iconProps} className="text-yellow-400" />
      case 'ts':
        return <FileCode {...iconProps} className="text-blue-500" />
      case 'css':
        return <Hash {...iconProps} className="text-blue-600" />
      case 'html':
        return <Globe {...iconProps} className="text-orange-500" />
      case 'json':
        return <Braces {...iconProps} className="text-yellow-500" />
      case 'md':
        return <FileText {...iconProps} className="text-blue-300" />
      default:
        return <File {...iconProps} />
    }
  }

  const getDirectoryIcon = (isExpanded: boolean): React.ReactNode => {
    const iconProps = { size: 16, className: 'text-yellow-500' }
    return isExpanded ? <FolderOpen {...iconProps} /> : <Folder {...iconProps} />
  }

  const toggleDirectory = (path: string) => {
    const newExpanded = new Set(expandedDirs)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedDirs(newExpanded)
  }

  const handleAddDirectory = (parentPath: string) => {
    setShowAddDirInput(parentPath)
    setShowAddFileInput(null)
    setNewDirName('')
  }

  const handleAddFile = (parentPath: string) => {
    setShowAddFileInput(parentPath)
    setShowAddDirInput(null)
    setNewFileName('')
  }

  const handleSubmitNewDirectory = (parentPath: string) => {
    if (newDirName.trim() && onDirectoryAdd) {
      onDirectoryAdd(parentPath, newDirName.trim())
      setShowAddDirInput(null)
      setNewDirName('')
    }
  }

  const handleSubmitNewFile = (parentPath: string) => {
    if (newFileName.trim() && onFileAdd) {
      onFileAdd(parentPath, newFileName.trim())
      setShowAddFileInput(null)
      setNewFileName('')
    }
  }

  const handleCancelAddDirectory = () => {
    setShowAddDirInput(null)
    setNewDirName('')
  }

  const handleCancelAddFile = () => {
    setShowAddFileInput(null)
    setNewFileName('')
  }

  const handleRightClick = (e: React.MouseEvent, path: string, type: 'file' | 'directory') => {
    e.preventDefault()
    e.stopPropagation()
    setShowContextMenu({
      path,
      x: e.clientX,
      y: e.clientY,
      type
    })
  }

  const handleRename = (path: string) => {
    const pathParts = path.split('/')
    const currentName = pathParts[pathParts.length - 1]
    setRenameValue(currentName)
    setShowRenameInput(path)
    setShowContextMenu(null)
  }

  const handleRenameSubmit = (oldPath: string) => {
    if (renameValue.trim() && onRename) {
      const pathParts = oldPath.split('/')
      pathParts[pathParts.length - 1] = renameValue.trim()
      const newPath = pathParts.join('/')
      onRename(oldPath, newPath)
    }
    setShowRenameInput(null)
    setRenameValue('')
  }

  const handleRenameCancel = () => {
    setShowRenameInput(null)
    setRenameValue('')
  }

  const handleDelete = (path: string) => {
    if (onDelete) {
      onDelete(path)
    }
    setShowContextMenu(null)
  }

  const handleClickOutside = () => {
    setShowContextMenu(null)
  }

  // グローバルクリックでコンテキストメニューを閉じる
  React.useEffect(() => {
    if (showContextMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showContextMenu])

  const renderNode = (node: FileTreeNode, depth: number = 0): React.ReactNode => {
    const indentStyle = { paddingLeft: `${depth * 16 + 12}px` }
    
    if (node.type === 'directory') {
      const isExpanded = expandedDirs.has(node.path)
      
      return (
        <div key={node.path}>
          <div className="flex items-center">
            {showRenameInput === node.path ? (
              <div className="flex w-full items-center gap-2" style={indentStyle}>
                <span className="flex items-center">{getDirectoryIcon(isExpanded)}</span>
                <input
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleRenameSubmit(node.path)
                    } else if (e.key === 'Escape') {
                      handleRenameCancel()
                    }
                  }}
                  onBlur={() => handleRenameCancel()}
                  autoFocus
                  className="flex-1 rounded border border-gray-600 bg-gray-800 text-gray-200 px-2 py-1 text-xs"
                />
              </div>
            ) : (
              <button
                className="flex w-full items-center gap-2 py-1.5 text-left text-sm transition-colors hover:bg-gray-700"
                style={indentStyle}
                onClick={() => toggleDirectory(node.path)}
                onContextMenu={(e) => handleRightClick(e, node.path, 'directory')}
              >
                <span className="flex items-center">{getDirectoryIcon(isExpanded)}</span>
                <span className="truncate text-gray-200">{node.name || 'root'}</span>
              </button>
            )}
            <div className="flex gap-1 mr-2">
              <button
                className="rounded p-1 text-gray-500 hover:bg-gray-600 hover:text-gray-300"
                onClick={() => handleAddFile(node.path)}
                title="新しいファイルを追加"
              >
                <FilePlus size={16} />
              </button>
              <button
                className="rounded p-1 text-gray-500 hover:bg-gray-600 hover:text-gray-300"
                onClick={() => handleAddDirectory(node.path)}
                title="新しいフォルダを追加"
              >
                <FolderPlus size={16} />
              </button>
            </div>
          </div>
          
          {showAddDirInput === node.path && (
            <div style={{ paddingLeft: `${(depth + 1) * 16 + 12}px` }} className="py-1">
              <div className="flex items-center gap-1">
                <span className="flex items-center"><Folder size={16} className="text-yellow-500" /></span>
                <input
                  type="text"
                  value={newDirName}
                  onChange={(e) => setNewDirName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmitNewDirectory(node.path)
                    } else if (e.key === 'Escape') {
                      handleCancelAddDirectory()
                    }
                  }}
                  onBlur={handleCancelAddDirectory}
                  autoFocus
                  className="flex-1 rounded border border-gray-600 bg-gray-800 text-gray-200 px-2 py-1 text-xs"
                  placeholder="フォルダ名を入力"
                />
              </div>
            </div>
          )}
          
          {showAddFileInput === node.path && (
            <div style={{ paddingLeft: `${(depth + 1) * 16 + 12}px` }} className="py-1">
              <div className="flex items-center gap-1">
                <span className="flex items-center"><File size={16} className="text-gray-400" /></span>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmitNewFile(node.path)
                    } else if (e.key === 'Escape') {
                      handleCancelAddFile()
                    }
                  }}
                  onBlur={handleCancelAddFile}
                  autoFocus
                  className="flex-1 rounded border border-gray-600 bg-gray-800 text-gray-200 px-2 py-1 text-xs"
                  placeholder="ファイル名を入力"
                />
              </div>
            </div>
          )}
          
          {isExpanded && node.children && (
            <div>
              {node.children.map((child) => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      )
    } else {
      // .gitkeepファイルは非表示にする
      if (node.name === '.gitkeep') {
        return null
      }
      
      return (
        <div key={node.path}>
          {showRenameInput === node.path ? (
            <div className="flex w-full items-center gap-2 py-1.5" style={indentStyle}>
              <span className="flex items-center">{getFileIcon(node.name)}</span>
              <input
                type="text"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRenameSubmit(node.path)
                  } else if (e.key === 'Escape') {
                    handleRenameCancel()
                  }
                }}
                onBlur={() => handleRenameCancel()}
                autoFocus
                className="flex-1 rounded border border-gray-600 bg-gray-800 text-gray-200 px-2 py-1 text-xs"
              />
            </div>
          ) : (
            <button
              className={`flex w-full items-center gap-2 py-1.5 text-left text-sm transition-colors hover:bg-gray-700 ${
                node.path === activeFile
                  ? 'bg-blue-900 border-r-2 border-blue-400 text-blue-300'
                  : 'text-gray-200'
              }`}
              style={indentStyle}
              onClick={() => onFileSelect(node.path)}
              onContextMenu={(e) => handleRightClick(e, node.path, 'file')}
            >
              <span className="flex items-center">{getFileIcon(node.name)}</span>
              <span className="truncate">{node.name}</span>
            </button>
          )}
        </div>
      )
    }
  }

  const fileTree = buildFileTree(Object.keys(files))

  return (
    <div className={`relative flex h-full flex-col bg-gray-900 ${className}`}>
      <div className="border-b border-gray-700 px-3 py-2 text-xs font-semibold text-gray-300">
        FILES
      </div>
      <div className="flex-1 overflow-y-auto">
        {fileTree.map((node) => renderNode(node))}
      </div>
      
      {/* コンテキストメニュー */}
      {showContextMenu && (
        <div
          className="fixed z-50 rounded-md border border-gray-600 bg-gray-800 shadow-lg"
          style={{
            left: showContextMenu.x,
            top: showContextMenu.y,
          }}
        >
          <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700"
            onClick={() => handleRename(showContextMenu.path)}
          >
            名前を変更
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700"
            onClick={() => handleDelete(showContextMenu.path)}
          >
            削除
          </button>
        </div>
      )}
    </div>
  )
}

export default FileTree