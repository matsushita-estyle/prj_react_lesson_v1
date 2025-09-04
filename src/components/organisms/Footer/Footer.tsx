import React from 'react';

interface FooterProps {
  onCheckMaterials?: () => void;
  nextLessonId?: string;
  prevLessonId?: string;
  isNextLessonAvailable?: boolean;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  onCheckMaterials,
  nextLessonId,
  prevLessonId,
  isNextLessonAvailable = true,
  className = '',
}) => {
  return (
    <footer
      className={`flex justify-center gap-12 border-t border-gray-700 bg-black p-4 ${className}`}
    >
      {prevLessonId ? (
        <a
          href={`/lessons/${prevLessonId}`}
          className="font-medium rounded-md transition-colors focus:outline-none focus:ring-2 border-2 border-green-500 bg-black hover:bg-green-500 text-green-500 hover:text-black focus:ring-green-500 px-4 py-1.5 text-base text-center cursor-pointer w-32"
        >
          Previous
        </a>
      ) : (
        <a
          href={`/`}
          className="font-medium rounded-md transition-colors focus:outline-none focus:ring-2 border-2 border-green-500 bg-black hover:bg-green-500 text-green-500 hover:text-black focus:ring-green-500 px-4 py-1.5 text-base text-center cursor-pointer w-32"
        >
          Back Home
        </a>
      )}
      <button
        onClick={onCheckMaterials}
        className="font-medium rounded-md transition-colors focus:outline-none focus:ring-2 border-2 border-white bg-transparent hover:bg-white hover:text-black text-white focus:ring-white px-4 py-1.5 text-base cursor-pointer w-32"
      >
        Text Book
      </button>
      {nextLessonId ? (
        isNextLessonAvailable ? (
          <a
            href={`/lessons/${nextLessonId}`}
            className="font-medium rounded-md transition-colors focus:outline-none focus:ring-2 border-2 border-cyan-500 bg-black hover:bg-cyan-500 text-cyan-500 hover:text-black focus:ring-cyan-500 px-4 py-1.5 text-base text-center cursor-pointer w-32"
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
          className="font-medium rounded-md transition-colors focus:outline-none focus:ring-2 border-2 border-cyan-500 bg-black hover:bg-cyan-500 text-cyan-500 hover:text-black focus:ring-cyan-500 px-4 py-1.5 text-base text-center cursor-pointer w-32"
        >
          Back Home
        </a>
      )}
    </footer>
  );
};

export default Footer;
