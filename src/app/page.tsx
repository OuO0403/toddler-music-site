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
    /* 1. 確保 min-h-screen 並移除 overflow-hidden，改用 overflow-y-auto 允許下滑 */
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-sky-100 to-green-100 py-10 px-4 overflow-y-auto">
      
      <h1 className="text-5xl md:text-6xl font-black text-amber-900 mb-10 drop-shadow-xl tracking-widest text-center">
        音樂動物園 🎵
      </h1>

      {/* 2. 調小 gap (間距)，並讓 max-w 集中，使圓圈靠得更近 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-4xl justify-items-center">
        
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/${a.id}`)}
              /* 3. w-full 搭配 aspect-square，加上 max-w 限制防止過大 */
              className="relative w-full max-w-[220px] aspect-square rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.2)] flex items-center justify-center border-none outline-none overflow-hidden"
              style={{ backgroundColor: a.color }}
            >
              {/* 圖示依然維持超大 */}
              <span className="text-[100px] md:text-[130px] leading-none select-none">
                {a.icon}
              </span>
              
              <motion.div
                layoutId={`circle-${a.id}`}
                className="absolute inset-0 rounded-full z-[-1]"
                style={{ backgroundColor: a.color }}
              />
            </motion.button>

            {/* 動物名稱：加粗 */}
            <span className="mt-4 text-2xl md:text-3xl font-black text-amber-900 drop-shadow-sm">
              {a.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* 底部留白，讓最後一排也能完全滑出來 */}
      <div className="h-24 w-full"></div>

      {/* 右上角選單改為 fixed 固定位置 */}
      <button className="fixed top-6 right-6 p-4 bg-white/40 rounded-3xl shadow-lg backdrop-blur-md z-50">
        <div className="space-y-1.5">
          <div className="w-8 h-1.5 bg-amber-900 rounded-full"></div>
          <div className="w-8 h-1.5 bg-amber-900 rounded-full"></div>
          <div className="w-8 h-1.5 bg-amber-900 rounded-full"></div>
        </div>
      </button>
    </div>
  );
}