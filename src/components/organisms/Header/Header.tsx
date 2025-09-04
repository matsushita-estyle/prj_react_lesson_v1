import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
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
            <h1 className="text-xl font-semibold">
              <span className={lessonTitle ? "text-white" : "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]"}>
                {lessonTitle || 'ReacTouch'}
              </span>
            </h1>
          </div>
        </div>
        <div 
          className="text-s bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => router.push('/')}
        >
          ReacTouch
        </div>
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
