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
    <div className="w-full h-screen flex flex-col items-center justify-center p-4">
      {/* 標題：使用更粗的字體 */}
      <h1 className="text-6xl font-black text-amber-900 mb-16 drop-shadow-xl tracking-widest">
        音樂動物園 🎵
      </h1>

      {/* 2x3 巨大圓形網格 */}
      <div className="grid grid-cols-3 gap-x-20 gap-y-16">
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push(`/${a.id}`)}
              /* 關鍵修正：w-64 h-64 確保足夠大，rounded-full 確保正圓，overflow-hidden 確保圖示不超出 */
              className="relative w-56 h-56 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center border-none outline-none overflow-hidden"
              style={{ backgroundColor: a.color }}
            >
              {/* 圖示放大到接近圓形的大小 */}
              <span className="text-[140px] leading-none select-none">
                {a.icon}
              </span>
              
              {/* 動畫過場層 */}
              <motion.div
                layoutId={`circle-${a.id}`}
                className="absolute inset-0 rounded-full z-[-1]"
                style={{ backgroundColor: a.color }}
              />
            </motion.button>

            {/* 動物名稱：粗體大字 */}
            <span className="mt-8 text-4xl font-black text-amber-900 drop-shadow-sm">
              {a.name}
            </span>
          </div>
        ))}
      </div>

      {/* 右上角選單鍵：改為更可愛的設計 */}
      <button className="absolute top-12 right-12 flex flex-col gap-2.5 p-6 bg-white/30 hover:bg-white/50 rounded-[30px] transition-all shadow-lg backdrop-blur-md">
        <div className="w-12 h-2 bg-amber-900 rounded-full"></div>
        <div className="w-12 h-2 bg-amber-900 rounded-full"></div>
        <div className="w-12 h-2 bg-amber-900 rounded-full"></div>
      </button>
    </div>
  );
}