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
    /* h-full 改為 min-h-screen 並允許 overflow-y-auto 產生捲軸 */
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-sky-100 to-green-100 py-12 px-6 overflow-y-auto">
      
      <h1 className="text-5xl md:text-7xl font-black text-amber-900 mb-16 drop-shadow-xl tracking-widest text-center">
        音樂動物園 🎵
      </h1>

      {/* 設定為固定 2 列 (手機) 或 3 列 (電腦)，確保圓圈能撐到最大 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20 w-full max-w-5xl justify-items-center">
        
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/${a.id}`)}
              /* 關鍵：使用 w-full 配合 aspect-square 撐大正圓 */
              className="relative w-full max-w-[280px] aspect-square rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center justify-center border-none outline-none overflow-hidden"
              style={{ backgroundColor: a.color }}
            >
              {/* 圖示設定為超大尺寸 */}
              <span className="text-[100px] md:text-[150px] leading-none select-none">
                {a.icon}
              </span>
              
              <motion.div
                layoutId={`circle-${a.id}`}
                className="absolute inset-0 rounded-full z-[-1]"
                style={{ backgroundColor: a.color }}
              />
            </motion.button>

            {/* 動物名稱：加粗放大 */}
            <span className="mt-6 text-3xl md:text-5xl font-black text-amber-900 drop-shadow-sm">
              {a.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* 底部預留空間，確保捲動到底部時不會被遮擋 */}
      <div className="h-20 w-full"></div>

      {/* 右上角固定選單 */}
      <button className="fixed top-8 right-8 p-5 bg-white/40 rounded-3xl shadow-xl backdrop-blur-md z-50">
        <div className="space-y-2">
          <div className="w-10 h-2 bg-amber-900 rounded-full"></div>
          <div className="w-10 h-2 bg-amber-900 rounded-full"></div>
          <div className="w-10 h-2 bg-amber-900 rounded-full"></div>
        </div>
      </button>
    </div>
  );
}