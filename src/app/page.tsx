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
    <div className="w-full h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* 標題 */}
      <h1 className="text-4xl md:text-6xl font-black text-amber-900 mb-8 md:mb-12 drop-shadow-xl tracking-widest text-center">
        音樂動物園 🎵
      </h1>

      {/* 關鍵：響應式網格 (手機 1欄, 平板 2或3欄, 大螢幕 6欄) */}
      <div className="grid 
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 
        gap-6 md:gap-10 
        w-full max-w-7xl max-h-[75vh] items-center justify-items-center">
        
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center w-full max-w-[150px] md:max-w-[200px]">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push(`/${a.id}`)}
              /* 使用 aspect-square 確保寬高 1:1，rounded-full 確保正圓 */
              className="relative w-full aspect-square rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.25)] flex items-center justify-center border-none outline-none overflow-hidden"
              style={{ backgroundColor: a.color }}
            >
              <span className="text-[60px] md:text-[90px] leading-none select-none">
                {a.icon}
              </span>
              
              <motion.div
                layoutId={`circle-${a.id}`}
                className="absolute inset-0 rounded-full z-[-1]"
                style={{ backgroundColor: a.color }}
              />
            </motion.button>

            {/* 動物名稱 */}
            <span className="mt-4 text-xl md:text-2xl font-black text-amber-900 whitespace-nowrap">
              {a.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* 右上角選單 */}
      <button className="absolute top-6 right-6 p-4 bg-white/30 rounded-2xl shadow-lg backdrop-blur-md">
        <div className="space-y-1.5">
          <div className="w-8 h-1.5 bg-amber-900 rounded-full"></div>
          <div className="w-8 h-1.5 bg-amber-900 rounded-full"></div>
          <div className="w-8 h-1.5 bg-amber-900 rounded-full"></div>
        </div>
      </button>
    </div>
  );
}