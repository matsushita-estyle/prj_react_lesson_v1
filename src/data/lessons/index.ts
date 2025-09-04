import { chapter1Lesson1 } from './chapter1/lesson1';
import { chapter1Lesson2 } from './chapter1/lesson2';
import { chapter1Lesson3 } from './chapter1/lesson3';
import { chapter1Lesson4 } from './chapter1/lesson4';
import { Lesson } from '@/lib/types/lesson';

export const allLessons: Lesson[] = [
  chapter1Lesson1,
  chapter1Lesson2,
  chapter1Lesson3,
  chapter1Lesson4,
];

export const getLessonById = (id: string): Lesson | undefined => {
  return allLessons.find(lesson => lesson.id === id);
};

export const getAvailableLessons = (): Lesson[] => {
  // 環境変数から利用可能なレッスン数を取得（デフォルト: 2）
  const availableCount = parseInt(
    process.env.NEXT_PUBLIC_AVAILABLE_LESSONS_COUNT || '2',
    10
  );
  
  // 有効な範囲内に制限（最小1、最大: 全レッスン数）
  const validCount = Math.max(1, Math.min(availableCount, allLessons.length));
  
  return allLessons.slice(0, validCount);
};

export const getUpcomingLessons = (): Lesson[] => {
  // 3つ目以降のレッスンは準備中
  return allLessons.slice(2);
};