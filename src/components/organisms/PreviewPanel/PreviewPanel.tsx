'use client'

import React, { useState } from 'react'
import FallbackPreview from './FallbackPreview'
import SimpleSandpack from './SimpleSandpack'

interface PreviewPanelProps {
  code: Record<string, string>
  className?: string
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ code, className = '' }) => {
  const [showCode] = useState(false)

  return (
    <div className={`flex h-full flex-col ${className}`}>
      <div className="flex-1">
        {showCode ? <FallbackPreview files={code} /> : <SimpleSandpack files={code} />}
      </div>
    </div>
  )
}

export default PreviewPanel
