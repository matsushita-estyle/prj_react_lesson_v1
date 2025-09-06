'use client'

import React, { useState } from 'react'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: string
}

const AIChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'こんにちは！React学習をお手伝いします。何について知りたいですか？',
      isUser: false,
      timestamp: '14:30',
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const predefinedResponses = [
    'Reactのコンポーネントについて説明しますね。コンポーネントとは...',
    'useState フックを使うと、コンポーネントの状態を管理できます。',
    'JSXについてお答えします。JSXはJavaScriptの拡張記法で...',
    'その質問にお答えするには、もう少し詳細を教えていただけますか？',
  ]

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputText('')
    setIsTyping(true)

    // AIの応答をシミュレート（1.5秒後）
    setTimeout(() => {
      const randomResponse =
        predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)]
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const themeClasses =
    theme === 'dark'
      ? {
          container: 'bg-gray-900 border-gray-700',
          messageArea: 'bg-gray-800',
          userMessage: 'bg-blue-600 text-white',
          aiMessage: 'bg-gray-700 text-gray-100',
          input: 'bg-gray-700 border-gray-600 text-white placeholder-gray-400',
          button: 'bg-blue-600 hover:bg-blue-700',
        }
      : {
          container: 'bg-white border-gray-200',
          messageArea: 'bg-gray-50',
          userMessage: 'bg-blue-500 text-white',
          aiMessage: 'bg-white border border-gray-200',
          input: 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
          button: 'bg-blue-500 hover:bg-blue-600',
        }

  return (
    <div className="space-y-4">
      {/* テーマ切り替え */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-700">生成AIチャット</h4>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">テーマ:</span>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              theme === 'light'
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {theme === 'light' ? '🌙 ダーク' : '☀️ ライト'}
          </button>
        </div>
      </div>

      {/* チャットエリア */}
      <div className={`flex h-80 flex-col rounded-lg border p-4 ${themeClasses.container}`}>
        {/* メッセージエリア */}
        <div
          className={`mb-3 flex-1 space-y-3 overflow-y-auto rounded-md p-3 ${themeClasses.messageArea}`}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-lg px-3 py-2 text-sm ${
                  message.isUser ? themeClasses.userMessage : themeClasses.aiMessage
                }`}
              >
                <div>{message.text}</div>
                <div
                  className={`mt-1 text-xs ${
                    message.isUser
                      ? 'text-blue-100'
                      : theme === 'dark'
                        ? 'text-gray-400'
                        : 'text-gray-500'
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}

          {/* タイピングインジケーター */}
          {isTyping && (
            <div className="flex justify-start">
              <div className={`rounded-lg px-3 py-2 ${themeClasses.aiMessage}`}>
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 入力エリア */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="メッセージを入力..."
            className={`flex-1 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${themeClasses.input}`}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${themeClasses.button}`}
          >
            送信
          </button>
        </div>
      </div>

      <div className="rounded border-l-4 border-yellow-400 bg-yellow-50 p-2 text-xs text-gray-500">
        💡 Reactなら: ダークモード切り替え、リアルタイム更新、カスタムアニメーションなど、
        ユーザーの好みに合わせてチャット体験を自由にカスタマイズできます！
      </div>
    </div>
  )
}

export default AIChatDemo
