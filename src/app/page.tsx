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
    <main className="min-h-screen bg-[#FDFCF0] flex flex-col items-center py-[40px] px-[20px]">
      <h1 className="text-[48px] font-black text-[#4A4A4A] mb-[40px] tracking-wider">
        音樂動物園
      </h1>

      {/* 這裡設定一排 2 個 (grid-cols-2) 以及按鈕間距 */}
      <div className="grid grid-cols-2 gap-[24px] w-full max-w-[600px]">
        {animals.map((animal) => (
          <Link key={animal.id} href={`/${animal.id}`} className="w-full">
            <motion.div
              layoutId={`bg-${animal.id}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full aspect-square rounded-[40px] flex flex-col items-center justify-center cursor-pointer shadow-lg"
              style={{ backgroundColor: animal.color }}
            >
              <span className="text-[80px] select-none">{animal.icon}</span>
              <span className="text-[24px] font-bold text-white mt-[8px]">{animal.name}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </main>
  );
}