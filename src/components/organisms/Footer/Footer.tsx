import React from 'react';

interface FooterProps {
  onCheckTextBook?: () => void;
  nextLessonId?: string;
  prevLessonId?: string;
  isNextLessonAvailable?: boolean;
  onReset?: () => void;
  onFormat?: () => void;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  onCheckTextBook,
  nextLessonId,
  prevLessonId,
  isNextLessonAvailable = true,
  onReset,
  onFormat,
  className = '',
}) => {
  return (
    <footer
      className={`flex justify-between items-center border-t border-gray-700 bg-black p-4 ${className}`}
    >
      {/* 左側のスペース */}
      <div className="w-32"></div>
      
      {/* 中央のナビゲーションボタン */}
      <div className="flex justify-center gap-12">
      {prevLessonId ? (
        <a
          href={`/lessons/${prevLessonId}`}
          className="font-medium rounded-md transition-colors focus:outline-none focus:ring-2 border-2 border-emerald-200 bg-black hover:bg-emerald-200 text-emerald-200 hover:text-black focus:ring-emerald-200 px-4 py-1.5 text-base text-center cursor-pointer w-32"
        >
          Previous
        </a>
      ) : (
        <a
          href={`/`}
          className="font-medium rounded-md transition-colors focus:outline-none focus:ring-2 border-2 border-emerald-200 bg-black hover:bg-emerald-200 text-emerald-200 hover:text-black focus:ring-emerald-200 px-4 py-1.5 text-base text-center cursor-pointer w-32"
        >
          Back Home
        </a>
      )}
      <button
        onClick={onCheckTextBook}
        className="font-medium rounded-md transition-colors focus:outline-none focus:ring-2 border-2 border-gray-300 bg-transparent hover:bg-gray-300 hover:text-black text-gray-300 focus:ring-gray-300 px-4 py-1.5 text-base cursor-pointer w-32"
      >
        Text Book
      </button>
      {nextLessonId ? (
        isNextLessonAvailable ? (
          <a
            href={`/lessons/${nextLessonId}`}
            className="font-medium rounded-md transition-colors focus:outline-none focus:ring-2 border-2 border-blue-300 bg-black hover:bg-blue-300 text-blue-300 hover:text-black focus:ring-blue-300 px-4 py-1.5 text-base text-center cursor-pointer w-32"
          >
            Next
          </a>
        ) : (
          <button
            disabled
            className="font-medium rounded-md border-2 border-gray-600 bg-black text-gray-600 px-4 py-1.5 text-base text-center cursor-not-allowed w-32"
            title="次のレッスンは準備中です"
          >
            Next
          </button>
        )
      ) : (
        <a
          href={`/`}
          className="font-medium rounded-md transition-colors focus:outline-none focus:ring-2 border-2 border-teal-300 bg-black hover:bg-teal-300 text-teal-300 hover:text-black focus:ring-teal-300 px-4 py-1.5 text-base text-center cursor-pointer w-32"
        >
          Back Home
        </a>
      )}
      </div>
      
      {/* 右側のボタン */}
      <div className="w-32 flex justify-end gap-6">
        {onFormat && (
          <button
            onClick={onFormat}
            className="font-medium rounded-md transition-colors focus:outline-none focus:ring-2 border-2 border-indigo-300 bg-black hover:bg-indigo-300 text-indigo-300 hover:text-black focus:ring-indigo-300 px-4 py-1.5 text-base cursor-pointer"
          >
            Format
          </button>
        )}
        {onReset && (
          <button
            onClick={onReset}
            className="font-medium rounded-md transition-colors focus:outline-none focus:ring-2 border-2 border-stone-400 bg-black hover:bg-stone-400 text-stone-400 hover:text-black focus:ring-stone-400 px-4 py-1.5 text-base cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
