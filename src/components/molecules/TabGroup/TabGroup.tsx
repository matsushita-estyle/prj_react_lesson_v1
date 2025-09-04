'use client'

import React, { useState } from 'react'
import Tab from '@/components/atoms/Tab'

interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

interface TabGroupProps {
  tabs: TabItem[]
  defaultActiveId?: string
  className?: string
  onTabChange?: (tabId: string) => void
}

const TabGroup: React.FC<TabGroupProps> = ({
  tabs,
  defaultActiveId,
  className = '',
  onTabChange,
}) => {
  const [activeTabId, setActiveTabId] = useState(defaultActiveId || tabs[0]?.id)

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId)
    onTabChange?.(tabId)
  }

  const activeTab = tabs.find((tab) => tab.id === activeTabId)

  return (
    <div className={`flex h-full flex-col ${className}`}>
      {/* タブヘッダー */}
      <div className="flex border-b border-gray-200 bg-gray-50" role="tablist">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            isActive={tab.id === activeTabId}
            onClick={() => handleTabClick(tab.id)}
          />
        ))}
      </div>

      {/* タブコンテンツ */}
      <div className="flex-1 overflow-auto" role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  )
}

export default TabGroup
