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
    <div className="w-full h-screen flex flex-col items-center justify-center p-6 sm:p-10">
      {/* 標題 */}
      <h1 className="text-4xl sm:text-6xl font-black text-amber-900 mb-8 sm:mb-12 drop-shadow-xl tracking-widest text-center">
        音樂動物園 🎵
      </h1>

      {/* 響應式網格容器：根據裝置寬度自動變換排列順序 */}
      <div className="grid 
        grid-cols-1        /* 手機：1x6 */
        sm:grid-cols-2     /* 平板：2x3 */
        md:grid-cols-3     /* 小筆電：3x2 */
        lg:grid-cols-6     /* 大螢幕：6x1 */
        gap-6 sm:gap-8 lg:gap-10 
        w-full max-w-7xl max-h-[70vh] items-center justify-items-center">
        
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center w-full max-w-[180px] sm:max-w-[220px]">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push(`/${a.id}`)}
              /* aspect-square 確保寬高相等，rounded-full 確保正圓 */
              className="relative w-full aspect-square rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.25)] flex items-center justify-center border-none outline-none overflow-hidden"
              style={{ backgroundColor: a.color }}
            >
              {/* 圖示大小隨容器自動縮放 */}
              <span className="text-[60px] sm:text-[80px] md:text-[100px] leading-none select-none">
                {a.icon}
              </span>
              
              <motion.div
                layoutId={`circle-${a.id}`}
                className="absolute inset-0 rounded-full z-[-1]"
                style={{ backgroundColor: a.color }}
              />
            </motion.button>

            {/* 動物名稱：粗體 */}
            <span className="mt-3 sm:mt-5 text-xl sm:text-2xl font-black text-amber-900 drop-shadow-sm whitespace-nowrap">
              {a.name}
            </span>
          </div>
        ))}
      </div>

      {/* 右上角選單鍵 */}
      <button className="absolute top-6 right-6 sm:top-10 sm:right-10 flex flex-col gap-1.5 sm:gap-2 p-4 sm:p-5 bg-white/30 hover:bg-white/50 rounded-2xl sm:rounded-3xl transition-all shadow-lg backdrop-blur-md">
        <div className="w-8 h-1.5 sm:w-10 sm:h-2 bg-amber-900 rounded-full"></div>
        <div className="w-8 h-1.5 sm:w-10 sm:h-2 bg-amber-900 rounded-full"></div>
        <div className="w-8 h-1.5 sm:w-10 sm:h-2 bg-amber-900 rounded-full"></div>
      </button>
    </div>
  );
}