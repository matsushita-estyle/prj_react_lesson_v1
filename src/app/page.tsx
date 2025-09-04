import Link from 'next/link'
import { getAvailableLessons, getUpcomingLessons } from '@/data/lessons'

export default function Home() {
  const availableLessons = getAvailableLessons()
  const upcomingLessons = getUpcomingLessons()

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case '初級':
        return 'bg-green-100 text-green-800'
      case '中級':
        return 'bg-yellow-100 text-yellow-800'
      case '上級':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">React研修プラットフォーム</h1>
          <p className="text-xl text-gray-600">Reactの基礎から応用まで、段階的に学習しましょう</p>
        </header>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">React基礎コース</h2>

          <div className="grid gap-4">
            {/* 利用可能なレッスン */}
            {availableLessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      レッスン {lesson.lessonNumber}: {lesson.title}
                    </h3>
                    <p className="mb-3 text-gray-600">
                      {lesson.description || 'レッスンの説明がありません'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className={`rounded px-2 py-1 ${getDifficultyColor(lesson.difficulty)}`}>
                        {lesson.difficulty || '難易度未設定'}
                      </span>
                    </div>
                  </div>
                  <div className="text-blue-600">→</div>
                </div>
              </Link>
            ))}

            {/* 準備中のレッスン */}
            {upcomingLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="rounded-lg border border-gray-200 bg-gray-100 p-6 opacity-60"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-gray-500">
                      レッスン {lesson.lessonNumber}: {lesson.title}
                    </h3>
                    <p className="mb-3 text-gray-400">
                      {lesson.description || 'レッスンの説明がありません'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="rounded bg-gray-200 px-2 py-1 text-gray-600">
                        {lesson.difficulty || '難易度未設定'}
                      </span>
                      {lesson.estimatedMinutes && (
                        <span>約{lesson.estimatedMinutes}分</span>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-400">準備中</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center text-gray-500">
          <p>© 2024 React研修プラットフォーム</p>
        </footer>
      </div>
    </div>
  )
}
