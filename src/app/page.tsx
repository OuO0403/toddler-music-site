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
    /* 1. 使用 min-h-screen 確保背景延伸，移除 overflow-hidden 改用 overflow-y-auto 啟用滑動 */
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-sky-100 to-green-100 py-12 px-4 overflow-y-auto">
      
      {/* 標題保持置中 */}
      <h1 className="text-5xl md:text-7xl font-black text-amber-900 mb-16 drop-shadow-xl tracking-widest text-center">
        音樂動物園 🎵
      </h1>

      {/* 2. 調整網格：
         - 手機版 (default): grid-cols-1 (一列排開，圓圈最大化)
         - 平板以上 (md): grid-cols-2 (兩列緊湊排列)
         - 限制 max-w 以免在大螢幕上分太開 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12 w-full max-w-[800px] justify-items-center">
        
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center w-full max-w-[320px]">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/${a.id}`)}
              /* 3. 使用 aspect-square 確保是正圓形，shadow 加深立體感 */
              className="relative w-full aspect-square rounded-full shadow-[0_25px_60px_rgba(0,0,0,0.3)] flex items-center justify-center border-none outline-none overflow-hidden"
              style={{ backgroundColor: a.color }}
            >
              {/* 圖示填滿圓圈空間 */}
              <span className="text-[120px] md:text-[160px] leading-none select-none">
                {a.icon}
              </span>
              
              <motion.div
                layoutId={`circle-${a.id}`}
                className="absolute inset-0 rounded-full z-[-1]"
                style={{ backgroundColor: a.color }}
              />
            </motion.button>

            {/* 動物名稱：使用粗體大字 */}
            <span className="mt-6 text-3xl md:text-5xl font-black text-amber-900 drop-shadow-sm">
              {a.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* 4. 底部留白，確保捲動到底部時不會被切掉 */}
      <div className="h-32 w-full"></div>

      {/* 右上角選單鍵改為 fixed，確保隨時可點擊 */}
      <button className="fixed top-8 right-8 p-6 bg-white/40 rounded-[30px] shadow-2xl backdrop-blur-md z-50">
        <div className="space-y-2">
          <div className="w-12 h-2 bg-amber-900 rounded-full"></div>
          <div className="w-12 h-2 bg-amber-900 rounded-full"></div>
          <div className="w-12 h-2 bg-amber-900 rounded-full"></div>
        </div>
      </button>
    </div>
  );
}