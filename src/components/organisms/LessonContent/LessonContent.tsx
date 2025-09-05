'use client'

import React, { useState } from 'react'
import { LessonStep } from '@/lib/types/lesson'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

interface LessonContentProps {
  lessonTitle?: string
  lessonNumber?: number
  taskDescription?: string
  steps: LessonStep[]
  onApplyCode?: (fileName: string, code: string) => void
  nextLessonId?: string
}

export default function LessonContent({
  lessonTitle,
  lessonNumber,
  taskDescription,
  steps,
  onApplyCode,
  nextLessonId,
}: LessonContentProps) {
  const [showSolutions, setShowSolutions] = useState<Record<number, boolean>>({})
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)

  const toggleSolution = (stepIndex: number) => {
    setShowSolutions((prev) => ({ ...prev, [stepIndex]: !prev[stepIndex] }))
  }

  const renderMarkdownText = (text: string) => {
    const lines = text.trim().split('\n')
    const elements: React.ReactNode[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith('# ')) {
        elements.push(
          <div key={i} className="relative mt-6 mb-5 overflow-hidden">
            {/* 背景グラデーションエフェクト */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-2xl" />

            {/* タイトルコンテナ */}
            <div className="relative">
              <h1 className="inline-block text-2xl font-bold md:text-3xl">
                <span className="relative inline-block pb-2">
                  <span className="animate-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {line.slice(2)}
                  </span>
                  {/* 下線 */}
                  <span className="absolute right-0 bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                </span>
              </h1>
            </div>
          </div>
        )
      } else if (line.startsWith('## ')) {
        const title = line.slice(3)
        if (title.includes('ハンズオンタスク') || title.includes('課題')) {
          elements.push(
            <div key={i} className="relative mt-5 mb-3">
              <h2 className="inline-block text-lg font-semibold">
                <span className="flex items-center gap-2">
                  <span className="animate-bounce">🎯</span>
                  <span className="relative inline-block pb-1.5">
                    <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                      {title}
                    </span>
                    <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-gradient-to-r from-green-400 to-teal-400" />
                  </span>
                </span>
              </h2>
            </div>
          )
        } else {
          elements.push(
            <div key={i} className="relative mt-5 mb-3">
              <h2 className="inline-block text-lg font-semibold text-gray-800">
                <span className="relative inline-block pb-1.5">
                  {title}
                  <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-gradient-to-r from-gray-400 to-gray-300" />
                </span>
              </h2>
            </div>
          )
        }
      } else if (line.startsWith('### ')) {
        elements.push(
          <div key={i} className="relative mt-4 mb-2">
            <h3 className="inline-block text-base font-medium text-gray-700">
              <span className="relative flex items-center gap-2">
                <span className="inline-block h-4 w-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
                <span className="relative inline-block pb-1">
                  {line.slice(4)}
                  <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-gray-300" />
                </span>
              </span>
            </h3>
          </div>
        )
      } else if (line.match(/^\d+\./)) {
        const listItems = []
        let j = i
        while (j < lines.length && lines[j].match(/^\d+\./)) {
          listItems.push(lines[j].replace(/^\d+\.\s*/, ''))
          j++
        }

        elements.push(
          <div key={i} className="mb-4 border-l-4 border-green-400 bg-green-50 p-4">
            <h4 className="mb-2 font-medium text-green-800">実装タスク</h4>
            <ol className="space-y-2">
              {listItems.map((item, idx) => (
                <li key={idx} className="flex items-start text-green-700">
                  <span className="mr-2 font-bold">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        )
        i = j - 1
      } else if (line.startsWith('- ')) {
        const listItems = []
        let j = i
        while (j < lines.length && lines[j].startsWith('- ')) {
          listItems.push(lines[j].slice(2))
          j++
        }

        elements.push(
          <ul key={i} className="mb-4 list-disc pl-5 text-gray-700">
            {listItems.map((item, idx) => (
              <li key={idx} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        )
        i = j - 1
      } else if (line.trim() === '') {
        continue
      } else {
        elements.push(
          <p key={i} className="mb-3 leading-relaxed text-gray-700">
            {line}
          </p>
        )
      }
    }

    return elements
  }

  return (
    <div className="prose max-w-none">
      {/* レッスンタイトル */}
      {lessonTitle && (
        <div className="relative mt-2 mb-6 overflow-hidden">
          {/* 背景グラデーションエフェクト */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-2xl" />

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
        </div>
      )}

      {/* 全体の説明 */}
      {taskDescription && <div className="mb-8">{renderMarkdownText(taskDescription)}</div>}

      {/* 全ステップを縦に表示 */}
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* ステップヘッダー */}
            <div className="mb-4 flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                {step.stepNumber}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{step.title}</h2>
            </div>

            {/* 課題内容 */}
            <div className="mb-4 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
              <p className="whitespace-pre-line text-gray-700">{step.instruction}</p>
            </div>

            {/* 初期コード（あれば） */}
            {(step.initialCode || step.initialFiles || step.initialStepFiles) && (
              <div className="mb-4">
                {/* 新しいinitialStepFilesを優先的に表示 */}
                {step.initialStepFiles &&
                  Object.entries(step.initialStepFiles).map(([fileName, fileContent]) => (
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
