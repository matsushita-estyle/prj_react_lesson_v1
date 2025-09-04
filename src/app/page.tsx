import Link from 'next/link';
import { BookOpen, Edit, RefreshCw } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black py-8">
      <div className="mx-auto max-w-4xl px-4">
        <header className="mb-0 flex items-center justify-center min-h-[75vh]">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-6 mb-6">
              <img
                src="/favicon.svg"
                alt="ReacTouch Logo"
                className="w-20 h-20"
              />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                ReacTouch
              </h1>
            </div>
            <p className="text-2xl text-gray-300 mb-16">
              Interactive React Learning Platform
            </p>
            <div className="w-full flex justify-center">
              <Link
                href="/chapters"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-2 text-lg font-semibold text-white transition-transform hover:scale-105"
              >
                START →
              </Link>
            </div>
          </div>
        </header>

        <section className="text-center mb-12 -mt-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <BookOpen size={48} className="text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Step-by-Step Learning
              </h3>
              <p className="text-gray-400">
                From basics to advanced, learn progressively
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Edit size={48} className="text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Hands-On Experience
              </h3>
              <p className="text-gray-400">
                Learn by actually coding in the editor
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <RefreshCw size={48} className="text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Real-Time Preview
              </h3>
              <p className="text-gray-400">See your code results instantly</p>
            </div>
          </div>
        </section>

        <footer className="text-center text-gray-400">
          <p>© 2025 ReacTouch</p>
        </footer>
      </div>
    </div>
  );
}
