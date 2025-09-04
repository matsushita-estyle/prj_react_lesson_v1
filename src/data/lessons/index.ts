import { chapter1Lesson1 } from './chapter1/lesson1';
import { chapter1Lesson2 } from './chapter1/lesson2';
import { chapter1Lesson3 } from './chapter1/lesson3';
import { chapter1Lesson4 } from './chapter1/lesson4';
import { Lesson } from '@/lib/types/lesson';

// 章ごとにレッスンをグループ化
export const chapter1Lessons: Lesson[] = [
  chapter1Lesson1,
  chapter1Lesson2,
  chapter1Lesson3,
  chapter1Lesson4,
];

// 全レッスン（将来的に他の章も追加）
export const allLessons: Lesson[] = [...chapter1Lessons];

export const getLessonById = (id: string): Lesson | undefined => {
  return allLessons.find((lesson) => lesson.id === id);
};

// 章1の利用可能なレッスンを取得
export const getAvailableChapter1Lessons = (): Lesson[] => {
  const availableCount = parseInt(
    process.env.NEXT_PUBLIC_CHAPTER1_AVAILABLE_LESSONS || '2',
    10
  );

  const validCount = Math.max(
    1,
    Math.min(availableCount, chapter1Lessons.length)
  );
  return chapter1Lessons.slice(0, validCount);
};

// 後方互換性のために残す（現在は章1のみ）
export const getAvailableLessons = (): Lesson[] => {
  return getAvailableChapter1Lessons();
};

// 章1の準備中レッスンを取得
export const getUpcomingChapter1Lessons = (): Lesson[] => {
  const availableCount = parseInt(
    process.env.NEXT_PUBLIC_CHAPTER1_AVAILABLE_LESSONS || '2',
    10
  );

  const validCount = Math.max(
    1,
    Math.min(availableCount, chapter1Lessons.length)
  );
  return chapter1Lessons.slice(validCount);
};

export const getUpcomingLessons = (): Lesson[] => {
  return getUpcomingChapter1Lessons();
};
