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
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTabId)

  return (
    <div className={`flex h-full flex-col ${className}`}>
      {/* ピル型スイッチャー */}
      <div className="p-1 bg-gray-200">
        <div className="flex p-1 bg-gray-200 rounded-full relative">
          {/* スライドする背景 */}
          <div
            className="absolute top-1 bottom-1 bg-white rounded-full shadow-md transition-all duration-300 ease-out"
            style={{
              width: `calc(${100 / tabs.length}% - 8px)`,
              left: `calc(${(activeIndex * 100) / tabs.length}% + 4px)`,
            }}
          />
          
          {/* タブボタン */}
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                relative z-10 flex-1 py-2 rounded-full font-medium text-sm transition-all duration-300
                ${tab.id === activeTabId 
                  ? 'text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* タブコンテンツ */}
      <div className="flex-1 overflow-auto" role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  )
}

export default TabGroup
