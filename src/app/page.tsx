'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const animals = [
  { id: 'elephant', name: '大象', icon: '🐘', color: '#8E949E' },
  { id: 'rabbit', name: '小兔子', icon: '🐰', color: '#FFB7C5' },
  { id: 'snake', name: '小蛇', icon: '🐍', color: '#88D498' },
  { id: 'woodpecker', name: '啄木鳥', icon: '🐦', color: '#FF6B6B' },
  { id: 'gorilla', name: '大猩猩', icon: '🦍', color: '#6D4C41' },
  { id: 'lion', name: '獅子', icon: '🦁', color: '#F9A825' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFCF0] flex flex-col items-center py-10 px-4">
      {/* 標題區 */}
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-black text-[#4A4A4A] mb-12 tracking-wider italic"
      >
        音樂動物園
      </motion.h1>

      {/* 按鈕網格：2x3 佈局 */}
      <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
        {animals.map((animal) => (
          <Link key={animal.id} href={`/${animal.id}`} className="flex flex-col items-center">
            <motion.div
              layoutId={`bg-${animal.id}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full aspect-square rounded-[40px] flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl transition-shadow relative overflow-hidden"
              style={{ backgroundColor: animal.color }}
            >
              <span className="text-[80px] mb-2 select-none">{animal.icon}</span>
              <span className="text-2xl font-bold text-white tracking-widest">{animal.name}</span>
            </motion.div>
          </Link>
        ))}
      </div>

      <footer className="mt-16 text-[#A0A0A0] text-sm">
        點擊動物開始練習節奏吧！
      </footer>
    </main>
  );
}