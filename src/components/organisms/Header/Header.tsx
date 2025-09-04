import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import SideMenu from '@/components/molecules/SideMenu/SideMenu';

interface HeaderProps {
  lessonTitle?: string;
  courseTitle?: string;
  className?: string;
  lessons?: Array<{
    chapterTitle: string;
    chapterLessons: Array<{
      id: string;
      title: string;
      href: string;
    }>;
  }>;
}

const Header: React.FC<HeaderProps> = ({
  lessonTitle,
  courseTitle,
  className = '',
  lessons = [],
}) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  return (
    <header
      className={`border-b border-gray-700 bg-black px-6 py-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsSideMenuOpen(true)}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="レッスン一覧を開く"
          >
            <Menu size={24} />
          </button>
          <div>
            {courseTitle && (
              <p className="text-sm text-gray-300">{courseTitle}</p>
            )}
            <h1 className="text-xl font-semibold text-white">
              {lessonTitle || 'React研修プラットフォーム'}
            </h1>
          </div>
        </div>
        <div className="text-s text-gray-400">React Training Platform</div>
      </div>

      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        lessons={lessons}
      />
    </header>
  );
};

export default Header;
