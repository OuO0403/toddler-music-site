'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const animals = [
  { id: 'elephant', name: '大象', icon: '🐘', color: '#8E949E' },
  { id: 'rabbit', name: '小兔子', icon: '🐰', color: '#FFB7C5' },
  { id: 'snake', name: '小蛇', icon: '🐍', color: '#88D498' },
  { id: 'woodpecker', name: '啄木鳥', icon: '🐦', color: '#FF6B6B' },
  { id: 'gorilla', name: '大猩猩', icon: '🦍', color: '#6D4C41' },
  { id: 'lion', name: '獅子', icon: '🦁', color: '#F9A825' },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center py-20 px-4">
      {/* 標題 */}
      <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl mb-24 italic tracking-widest">
        音樂動物園 🎵
      </h1>

      {/* 3x2 配置：間距固定為 72px (gap-18) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-[72px] w-full max-w-7xl justify-items-center">
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center">
            {/* 巨大正圓按鈕 */}
            <motion.button
              layoutId={`circle-bg-${a.id}`} 
              onClick={() => router.push(`/${a.id}`)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              /* 使用 globals.css 定義的 zoo-circle-btn 類名 */
              className="zoo-circle-btn relative w-44 h-44 md:w-72 md:h-72 bg-white"
              style={{ backgroundColor: a.color }}
            >
              {/* Emoji 填滿 80% */}
              <span className="text-[120px] md:text-[200px] select-none pointer-events-none drop-shadow-md">
                {a.icon}
              </span>
            </motion.button>
            
            {/* 36級粗體字名稱，間距 12px */}
            <span className="mt-[12px] text-zoo-36 text-white drop-shadow-lg text-center">
              {a.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* 底部緩衝空間 */}
      <div className="h-20 w-full" />
    </div>
  );
}