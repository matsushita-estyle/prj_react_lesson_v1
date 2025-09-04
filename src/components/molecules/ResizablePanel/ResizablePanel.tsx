'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'

interface ResizablePanelProps {
  leftPanel: React.ReactNode
  rightPanel: React.ReactNode
  initialLeftWidth?: number
  minLeftWidth?: number
  maxLeftWidth?: number
  className?: string
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({
  leftPanel,
  rightPanel,
  initialLeftWidth = 50,
  minLeftWidth = 20,
  maxLeftWidth = 80,
  className = '',
}) => {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth)
  const [isResizing, setIsResizing] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

      const clampedWidth = Math.min(Math.max(newLeftWidth, minLeftWidth), maxLeftWidth)
      setLeftWidth(clampedWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
    }
  }, [isResizing, minLeftWidth, maxLeftWidth])

  return (
    <div ref={containerRef} className={`flex h-full ${className}`}>
      {/* 左パネル */}
      <div
        style={{ width: `${leftWidth}%` }}
        className="overflow-hidden transition-all duration-200"
      >
        {leftPanel}
      </div>

      {/* リサイズハンドル */}
      <div
        className="group relative flex w-1 cursor-col-resize items-center justify-center bg-gray-200 transition-all duration-200 hover:w-2 hover:bg-gray-300"
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* リサイズアイコン */}
        <div
          className={`absolute flex h-8 w-4 items-center justify-center rounded bg-gray-400 transition-all duration-200 ${
            isHovering || isResizing ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex space-x-0.5">
            <div className="h-4 w-0.5 bg-white"></div>
            <div className="h-4 w-0.5 bg-white"></div>
          </div>
        </div>
      </div>

      {/* 右パネル */}
      <div
        style={{ width: `${100 - leftWidth}%` }}
        className="overflow-hidden transition-all duration-200"
      >
        {rightPanel}
      </div>
    </div>
  )
}

export default ResizablePanel