'use client';

import React, { useMemo, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import FileTree from '../../molecules/FileTree/FileTree';

interface MonacoCodeEditorProps {
  files: Record<string, string>;
  activeFile: string;
  onFileChange?: (fileName: string, content: string) => void;
  onActiveFileChange?: (fileName: string) => void;
  onDirectoryAdd?: (parentPath: string, directoryName: string) => void;
  onFileAdd?: (parentPath: string, fileName: string) => void;
  onRename?: (oldPath: string, newPath: string) => void;
  onDelete?: (path: string) => void;
  className?: string;
}

const MonacoCodeEditor: React.FC<MonacoCodeEditorProps> = ({
  files,
  activeFile,
  onFileChange,
  onActiveFileChange,
  onDirectoryAdd,
  onFileAdd,
  onRename,
  onDelete,
  className = '',
}) => {
  const [openTabs, setOpenTabs] = useState<string[]>([activeFile]);
  const [isFileTreeOpen, setIsFileTreeOpen] = useState<boolean>(false);

  // ファイル拡張子から言語を判定
  const getLanguageFromFileName = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      default:
        return 'javascript';
    }
  };

  const currentLanguage = useMemo(
    () => getLanguageFromFileName(activeFile),
    [activeFile]
  );

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onFileChange?.(activeFile, value);
    }
  };

  const handleFileSelect = (fileName: string) => {
    // タブに追加（重複を避ける）
    if (!openTabs.includes(fileName)) {
      setOpenTabs([...openTabs, fileName]);
    }
    // アクティブファイルを変更
    onActiveFileChange?.(fileName);
  };

  const handleTabClose = (fileName: string) => {
    const newTabs = openTabs.filter((tab) => tab !== fileName);
    setOpenTabs(newTabs);

    // 閉じるタブがアクティブファイルの場合、別のタブをアクティブにする
    if (fileName === activeFile && newTabs.length > 0) {
      onActiveFileChange?.(newTabs[newTabs.length - 1]);
    } else if (fileName === activeFile && newTabs.length === 0) {
      // 全てのタブが閉じられた場合、activeFileをクリア
      onActiveFileChange?.('');
    }
  };

  const handleTabClick = (fileName: string) => {
    onActiveFileChange?.(fileName);
  };

  const handleEditorDidMount = (
    editor: import('monaco-editor').editor.IStandaloneCodeEditor,
    monaco: typeof import('monaco-editor')
  ) => {
    // カスタムダークテーマの設定
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6a9955' },
        { token: 'keyword', foreground: '569cd6' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'number', foreground: 'b5cea8' },
        { token: 'type', foreground: '4ec9b0' },
        { token: 'function', foreground: 'dcdcaa' },
        { token: 'variable', foreground: '9cdcfe' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#264f78',
        'editorCursor.foreground': '#aeafad',
        'editor.lineHighlightBackground': '#2d2d30',
      },
    });

    monaco.editor.setTheme('custom-dark');

    // JSX/TSX用の基本設定
    if (monaco.languages?.typescript?.javascriptDefaults) {
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.Latest,
        allowNonTsExtensions: true,
        jsx: monaco.languages.typescript.JsxEmit.React,
        allowJs: true,
      });
    }
  };

  const editorOptions = {
    fontSize: 14,
    fontFamily:
      'var(--editor-font, "Consolas", "Monaco", "Courier New", monospace)',
    lineHeight: 1.5,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'off' as const,
    automaticLayout: true,
    tabSize: 2,
    insertSpaces: true,
    formatOnPaste: true,
    formatOnType: true,
    lineNumbers: 'on' as const,
    renderLineHighlight: 'line' as const,
    selectOnLineNumbers: true,
    readOnly: false,
    cursorStyle: 'line' as const,
    cursorBlinking: 'blink' as const,
    scrollbar: {
      horizontal: 'visible' as const,
      vertical: 'visible' as const,
    },
  };

  return (
    <div className={`flex h-full ${className}`}>
      {/* ファイルツリー */}
      {isFileTreeOpen && (
        <div className="min-w-[200px] border-r border-gray-600">
          <FileTree
            files={files}
            activeFile={activeFile}
            onFileSelect={handleFileSelect}
            onDirectoryAdd={onDirectoryAdd}
            onFileAdd={onFileAdd}
            onRename={onRename}
            onDelete={onDelete}
          />
        </div>
      )}

      {/* エディター部分 */}
      <div className="flex flex-1 flex-col bg-gray-900">
        {/* ファイルタブとトグルボタン */}
        <div className="flex items-center justify-between overflow-x-auto border-b border-gray-700 bg-gray-800">
          <div className="flex overflow-x-auto">
            {/* ファイルツリートグルボタン */}
            <button
              onClick={() => setIsFileTreeOpen(!isFileTreeOpen)}
              className="flex items-center border-r border-gray-600 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-gray-100"
              title={
                isFileTreeOpen
                  ? 'ファイルツリーを閉じる'
                  : 'ファイルツリーを開く'
              }
            >
              {isFileTreeOpen ? '<' : '>'}
            </button>
            {openTabs.map((fileName) => (
              <div
                key={fileName}
                className={`flex min-w-0 items-center border-r border-gray-600 ${
                  fileName === activeFile
                    ? 'border-b-2 border-blue-400 bg-gray-700'
                    : 'hover:bg-gray-700'
                }`}
              >
                <button
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-gray-100"
                  onClick={() => handleTabClick(fileName)}
                >
                  <span className="max-w-32 truncate">
                    {fileName.split('/').pop()}
                  </span>
                </button>
                <button
                  className="rounded px-1 py-2 text-gray-500 hover:bg-gray-600 hover:text-gray-300"
                  onClick={() => handleTabClose(fileName)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 relative">
          {openTabs.length > 0 && activeFile ? (
            <div
              className="h-full"
              style={{
                backgroundColor: 'var(--editor-bg)',
                border: '1px solid var(--editor-border)',
              }}
            >
              <Editor
                height="100%"
                language={currentLanguage}
                value={files[activeFile] || ''}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                theme="custom-dark"
                options={editorOptions}
                loading={
                  <div className="flex h-full items-center justify-center text-white">
                    <div className="text-center">
                      <div className="mb-2">Loading Monaco Editor...</div>
                      <div className="h-1 w-48 overflow-hidden rounded-full bg-gray-700">
                        <div className="h-full w-1/3 animate-pulse bg-blue-500"></div>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-900 text-gray-400">
              <div className="text-center">
                <div className="text-sm">ファイルを選択してください</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonacoCodeEditor;
