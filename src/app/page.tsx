'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const animals = [
  { id: 'elephant', name: '大象', icon: '🐘', color: '#94a3b8' },
  { id: 'rabbit', name: '小兔子', icon: '🐰', color: '#fda4af' },
  { id: 'snake', name: '小蛇', icon: '🐍', color: '#4ade80' },
  { id: 'woodpecker', name: '啄木鳥', icon: '🐦', color: '#f87171' },
  { id: 'gorilla', name: '大猩猩', icon: '🦍', color: '#78350f' },
  { id: 'lion', name: '獅子', icon: '🦁', color: '#fbbf24' },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      {/* 標題 */}
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl md:text-6xl font-black text-green-900 mb-12 drop-shadow-md"
      >
        音樂動物園 🎵
      </motion.h1>

      {/* 2x3 巨大按鈕網格 */}
      <div className="grid grid-cols-3 grid-rows-2 gap-8 md:gap-12">
        {animals.map((animal) => (
          <motion.button
            key={animal.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push(`/${animal.id}`)}
            className="flex flex-col items-center justify-center group"
          >
            {/* 巨大的圓形 */}
            <motion.div
              layoutId={`circle-${animal.id}`}
              className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-xl flex items-center justify-center text-6xl md:text-8xl border-8 border-white transition-all group-hover:shadow-2xl"
              style={{ backgroundColor: animal.color }}
            >
              {animal.icon}
            </motion.div>
            
            {/* 動物名稱卡片 */}
            <span className="mt-4 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full text-xl md:text-2xl font-bold text-green-900 shadow-sm">
              {animal.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* 右上角選單鍵 */}
      <button className="absolute top-10 right-10 flex flex-col gap-2 p-4 bg-white/40 hover:bg-white/60 rounded-3xl transition-all shadow-sm">
        <div className="w-10 h-1.5 bg-green-900 rounded-full"></div>
        <div className="w-10 h-1.5 bg-green-900 rounded-full"></div>
        <div className="w-10 h-1.5 bg-green-900 rounded-full"></div>
      </button>
    </div>
  );
}