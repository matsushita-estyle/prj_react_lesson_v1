import React from 'react'

interface BrowserFrameProps {
  url?: string
  children: React.ReactNode
  className?: string
}

const BrowserFrame: React.FC<BrowserFrameProps> = ({
  url = 'localhost:3000',
  children,
  className = '',
}) => {
  return (
    <div className={`h-full flex flex-col ${className}`}>
      <div className="flex items-center bg-gray-100 border-b border-gray-300 px-2 py-1">
        <div className="flex items-center gap-1.5 mr-3">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer"></div>
        </div>
        <div className="flex-1 flex items-center">
          <div className="flex items-center bg-white rounded-md px-3 py-1 text-sm shadow-sm">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-gray-600">{url}</span>
          </div>
        </div>
        <div className="flex gap-2 ml-2">
          <svg className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <svg className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </div>
      </div>
      <div className="flex-1 bg-white">{children}</div>
    </div>
  )
}

export default BrowserFrame