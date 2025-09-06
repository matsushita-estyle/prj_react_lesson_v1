'use client'

import React, { useState } from 'react'
import { LessonStep, AddFileButton } from '@/lib/types/lesson'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkBreaks from 'remark-breaks'

interface LessonContentProps {
  lessonTitle?: string
  lessonNumber?: number
  taskDescription?: string
  steps: LessonStep[]
  onApplyCode?: (fileName: string, code: string) => void
  onAddFile?: (fileName: string, initialContent?: string) => void
  nextLessonId?: string
}

export default function LessonContent({
  lessonTitle,
  lessonNumber,
  taskDescription,
  steps,
  onApplyCode,
  onAddFile,
  nextLessonId,
}: LessonContentProps) {
  const [showSolutions, setShowSolutions] = useState<Record<number, boolean>>({})
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)
  const [showTips, setShowTips] = useState<Record<number, boolean>>({})

  const toggleSolution = (stepIndex: number) => {
    setShowSolutions((prev) => ({ ...prev, [stepIndex]: !prev[stepIndex] }))
  }

  // 全ステップの解答コードを一度に適用
  const applyAllSolutions = () => {
    if (!onApplyCode) return

    steps.forEach((step) => {
      if (step.solutionCodes && step.solutionCodes.length > 0) {
        step.solutionCodes.forEach((solution) => {
          onApplyCode(solution.solutionTargetFile, solution.code)
        })
      }
    })
  }

  return (
    <div className="prose max-w-none">
      {/* レッスンタイトル */}
      {lessonTitle && (
        <div className="relative mt-2 overflow-hidden">
          {/* 背景グラデーションエフェクト */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-2xl" />

          {/* タイトルコンテナとデバッグボタン */}
          <div className="relative flex items-start justify-between">
            {/* タイトルコンテナ */}
            <div className="relative inline-block">
              <div className="relative flex items-center gap-3 pr-6 pb-2">
                {/* Favicon */}
                <img src="/favicon.svg" alt="React Logo" className="h-10 w-10 md:h-12 md:w-12" />

                {/* レッスン番号 */}
                {lessonNumber && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 md:text-base">
                      LESSON {lessonNumber}
                    </span>
                    <span className="text-gray-400">|</span>
                  </div>
                )}

                {/* タイトル */}
                <h1 className="text-2xl font-bold md:text-3xl">
                  <span className="animate-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {lessonTitle}
                  </span>
                </h1>
              </div>

              {/* 下線 - アイコンとタイトル全体にかかる */}
              <span className="absolute right-0 bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            </div>

            {/* デバッグボタン */}
            {onApplyCode && (
              <button
                onClick={applyAllSolutions}
                className="mt-2 flex cursor-pointer items-center gap-2 rounded-lg border-2 border-orange-400 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600 transition-all hover:bg-orange-100 hover:shadow-md"
                title="全ステップの解答コードを一度に適用します"
              >
                Debug
              </button>
            )}
          </div>
        </div>
      )}

      {/* 全体の説明 */}
      {taskDescription && (
        <div
          className="mb-8 leading-relaxed whitespace-pre-line text-gray-700"
          style={{ letterSpacing: '-0.02em' }}
        >
          {taskDescription}
        </div>
      )}

      {/* 全ステップを縦に表示 */}
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* ステップヘッダー */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-1.5 shadow-sm">
                  <span className="text-base font-semibold text-white">Step {step.stepNumber}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{step.title}</h2>
              </div>
            </div>

            {/* 課題内容 */}
            <div className="mb-4">
              <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
                {step.instruction && step.instruction.includes('```') ? (
                  /* コードブロックがある場合はReactMarkdownを使用 */
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <ReactMarkdown
                      remarkPlugins={[remarkBreaks]}
                      components={{
                        code({
                          className,
                          children,
                          ...props
                        }: {
                          className?: string
                          children?: React.ReactNode
                          inline?: boolean
                        }) {
                          const match = /language-(\w+)/.exec(className || '')
                          const isBlock = match && !props.inline
                          return isBlock ? (
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{
                                fontSize: '14px',
                                margin: '1rem 2rem 1rem 0',
                                maxWidth: 'calc(100% - 2rem)',
                              }}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          )
                        },
                        p({ children }) {
                          return <p className="mb-4">{children}</p>
                        }
                      }}
                    >
                      {step.instruction}
                    </ReactMarkdown>
                  </div>
                ) : (
                  /* コードブロックがない場合は従来通りの表示で改行を保持 */
                  <p className="whitespace-pre-line text-gray-700">{step.instruction}</p>
                )}
              </div>

              {/* Tips ボタン */}
              {step.tips && step.tips.length > 0 && (
                <div className="relative mt-1 flex justify-end">
                  <div
                    className="inline-block"
                    onMouseEnter={() => setShowTips((prev) => ({ ...prev, [index]: true }))}
                    onMouseLeave={() => setShowTips((prev) => ({ ...prev, [index]: false }))}
                  >
                    <div className="flex cursor-help items-center gap-1 rounded-full border border-purple-200 bg-white px-2 py-1 text-xs text-purple-600 shadow-sm transition-colors hover:bg-white hover:text-purple-800">
                      💡
                      <span className="hidden sm:inline">{step.tipsTitle || 'Tips'}</span>
                    </div>

                    {/* Tips ポップオーバー */}
                    {showTips[index] && (
                      <div className="absolute right-0 bottom-full z-50 mb-2 w-[500px] max-w-[95vw] rounded-lg border border-purple-200 bg-white shadow-lg">
                        <div className="rounded-lg border-l-4 border-purple-400 bg-purple-50 p-4">
                          <div className="mb-3 flex items-center gap-2">
                            <span className="text-base font-semibold text-purple-600">
                              💡 {step.tipsTitle || 'Tips'}
                            </span>
                          </div>
                          <ul className="space-y-2 text-base text-gray-700">
                            {step.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start gap-3">
                                <span className="font-bold text-purple-500">{tipIndex + 1}.</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 初期コード（あれば） */}
            {(step.initialCode || step.initialFiles || step.initialStepFiles) && (
              <div className="mb-4">
                {/* 新しいinitialStepFilesを優先的に表示 */}
                {step.initialStepFiles &&
                  Object.entries(step.initialStepFiles)
                    .filter(([, fileContent]) => {
                      // string の場合は表示、StepFile の場合は isVisible をチェック
                      return typeof fileContent === 'string' || fileContent.isVisible !== false
                    })
                    .map(([fileName, fileContent]) => (
                      <div key={fileName} className="mb-2">
                        <h4 className="mb-1 text-xs font-semibold text-gray-500">{fileName}</h4>
                        <div className="overflow-hidden rounded-lg border border-gray-300">
                          <div className="bg-gray-100 p-4">
                            <pre className="overflow-x-auto text-xs text-gray-700">
                              <code>{typeof fileContent === 'string' ? fileContent : fileContent.content}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))}

                {/* 後方互換性のためinitialFilesもサポート */}
                {!step.initialStepFiles &&
                  step.initialFiles &&
                  Object.entries(step.initialFiles).map(([fileName, fileContent]) => (
                    <div key={fileName} className="mb-2">
                      <h4 className="mb-1 text-xs font-semibold text-gray-500">{fileName}</h4>
                      <div className="overflow-hidden rounded-lg border border-gray-300">
                        <div className="bg-gray-100 p-4">
                          <pre className="overflow-x-auto text-xs text-gray-700">
                            <code>{fileContent}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* ファイル作成ボタン */}
                {step.addFile && onAddFile && (
                  <div className="mt-2">
                    {Array.isArray(step.addFile) ? (
                      <div className="space-y-1">
                        {step.addFile.map((fileButton, idx) => (
                          <button
                            key={idx}
                            onClick={() => onAddFile(fileButton.fileName, fileButton.initialContent || '')}
                            className="flex w-full cursor-pointer items-center gap-3 rounded border border-yellow-200 bg-yellow-50 p-3 text-left transition-colors hover:bg-yellow-100"
                            title={`${fileButton.fileName}を作成します`}
                          >
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-700">{fileButton.label}</div>
                              <div className="text-xs text-gray-500">{fileButton.fileName}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      (() => {
                        const fileButton = step.addFile as AddFileButton
                        return (
                          <button
                            onClick={() => onAddFile(fileButton.fileName, fileButton.initialContent || '')}
                            className="flex w-full cursor-pointer items-center gap-3 rounded border border-yellow-200 bg-yellow-50 p-3 text-left transition-colors hover:bg-yellow-100"
                            title={`${fileButton.fileName}を作成します`}
                          >
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-700">{fileButton.label}</div>
                              <div className="text-xs text-gray-500">{fileButton.fileName}</div>
                            </div>
                          </button>
                        )
                      })()
                    )}
                  </div>
                )}

                {/* コピー可能なコードスニペット */}
                {step.copyableCode && (
                  <div className="mt-2">
                    {Array.isArray(step.copyableCode) ? (
                      <div className="space-y-1">
                        {step.copyableCode.map((code, idx) => {
                          const isObject = typeof code === 'object' && 'label' in code
                          const codeText = isObject ? code.code : code
                          const label = isObject ? code.label : undefined

                          const copyId = `${index}-${idx}`
                          const isCopied = copiedIndex === copyId

                          return (
                            <div
                              key={idx}
                              className="relative cursor-pointer rounded border border-yellow-200 bg-yellow-50 p-2 transition-colors hover:bg-yellow-100"
                              onClick={() => {
                                navigator.clipboard.writeText(codeText)
                                setCopiedIndex(copyId)
                                setTimeout(() => setCopiedIndex(null), 2000)
                              }}
                              title="クリックでコピー"
                            >
                              {isCopied && (
                                <div className="absolute top-2 right-2 z-10 animate-pulse rounded bg-green-500 px-2 py-1 text-xs text-white shadow-md">
                                  ✓ コピーしました！
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <ContentCopyIcon
                                  className={isCopied ? 'text-green-500' : 'text-gray-600'}
                                  fontSize="small"
                                />
                                <div className="flex-1">
                                  {label && (
                                    <div className="mb-1 text-xs text-gray-500">{label}</div>
                                  )}
                                  <pre className="overflow-x-auto text-xs break-all whitespace-pre-wrap text-gray-700">
                                    <code>{codeText}</code>
                                  </pre>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div
                        className="relative cursor-pointer rounded border border-yellow-200 bg-yellow-50 p-2 transition-colors hover:bg-yellow-100"
                        onClick={() => {
                          navigator.clipboard.writeText(step.copyableCode as string)
                          setCopiedIndex(`${index}-single`)
                          setTimeout(() => setCopiedIndex(null), 2000)
                        }}
                        title="クリックでコピー"
                      >
                        {copiedIndex === `${index}-single` && (
                          <div className="absolute top-2 right-2 z-10 animate-pulse rounded bg-green-500 px-2 py-1 text-xs text-white shadow-md">
                            ✓ コピーしました！
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <ContentCopyIcon
                            className={
                              copiedIndex === `${index}-single` ? 'text-green-500' : 'text-gray-600'
                            }
                            fontSize="small"
                          />
                          <div className="flex-1">
                            <pre className="overflow-x-auto text-xs break-all whitespace-pre-wrap text-gray-700">
                              <code>{step.copyableCode}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ボタンエリア */}
            <div className="flex gap-3">
              {/* 解答例ボタン */}
              <button
                onClick={() => toggleSolution(index)}
                className="flex cursor-pointer items-center gap-2 rounded bg-green-500 px-4 py-2 text-sm text-white transition-colors hover:bg-green-600"
              >
                {showSolutions[index] ? (
                  <>
                    解答例を隠す
                    <VisibilityOffIcon fontSize="small" />
                  </>
                ) : (
                  <>
                    解答例を見る
                    <VisibilityIcon fontSize="small" />
                  </>
                )}
              </button>

              {/* 全てコードに反映ボタン（解答例表示時かつ複数の解答コードがある場合のみ） */}
              {showSolutions[index] &&
                step.solutionCodes &&
                step.solutionCodes.length > 1 &&
                onApplyCode && (
                  <button
                    onClick={() => {
                      step.solutionCodes?.forEach((solution) => {
                        onApplyCode(solution.solutionTargetFile, solution.code)
                      })
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600"
                  >
                    全てコードに反映
                    <IntegrationInstructionsIcon fontSize="small" />
                  </button>
                )}
            </div>

            {/* 解答例表示 */}
            {showSolutions[index] && step.solutionCodes && step.solutionCodes.length > 0 && (
              <div className="mt-4">
                <div className="space-y-3">
                  {step.solutionCodes.map((solution, solutionIdx) => (
                    <div
                      key={solutionIdx}
                      className="overflow-hidden rounded-lg border border-green-300"
                    >
                      <div className="bg-green-600 px-4 py-2 font-mono text-sm text-white">
                        {solution.label || `解答例 ${solutionIdx + 1}`}
                      </div>
                      <div className="relative bg-green-50 p-4">
                        {onApplyCode && (
                          <button
                            onClick={() => {
                              onApplyCode(solution.solutionTargetFile, solution.code)
                            }}
                            className="absolute top-2 right-2 z-10 flex cursor-pointer items-center gap-2 rounded bg-blue-500 px-3 py-2 text-xs text-white transition-colors hover:bg-blue-600"
                          >
                            コードに反映
                            <IntegrationInstructionsIcon fontSize="small" />
                          </button>
                        )}
                        <pre className="overflow-x-auto text-xs text-gray-700">
                          <code>{solution.code}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 完了メッセージ - シンプルで洗練されたデザイン */}
      <div className="relative mt-8 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 p-0.5 shadow-lg">
        {/* メインコンテンツ */}
        <div className="rounded-xl bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-800">
              お疲れ様でした。次のステップへ進みましょう！
            </p>
            {nextLessonId ? (
              <a
                href={`/lessons/${nextLessonId}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2.5 font-semibold text-white shadow-md transition-all hover:from-purple-600 hover:to-blue-500"
              >
                <span>次のレッスンへ</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            ) : (
              <span className="rounded-full bg-gradient-to-r from-green-500 to-teal-500 px-5 py-2.5 text-white shadow-md">
                🎓 すべて完了！
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
