'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const triggerVibrate = (ms = 60) => {
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate(ms);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-20 px-4 relative">
      <h1 className="text-5xl md:text-7xl font-black text-green-900 mb-20 drop-shadow-2xl tracking-widest">
        音樂動物園 🎵
      </h1>

      {/* 3x2 配置：gap-x 與 gap-y 設為一致（12/16）達成對稱美感 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 md:gap-x-16 gap-y-16 md:gap-y-24 w-full max-w-5xl justify-items-center">
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center">
            <motion.button
              layoutId={`circle-bg-${a.id}`} 
              onClick={() => { triggerVibrate(); router.push(`/${a.id}`); }}
              whileHover={{ scale: 1.12, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              /* 固定大小的大圓圈 + 深層陰影 */
              className="relative w-36 h-36 md:w-60 md:h-60 rounded-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] flex items-center justify-center border-none outline-none overflow-hidden z-10"
              style={{ backgroundColor: a.color, borderRadius: '100%' }}
            >
              <span className="text-6xl md:text-[120px] select-none pointer-events-none">{a.icon}</span>
            </motion.button>
            {/* 動物名稱：粗體大字 */}
            <span className="mt-6 text-2xl md:text-4xl font-black text-green-900 drop-shadow-sm tracking-wide">
              {a.name}
            </span>
          </div>
        ))}
      </div>

      {/* 右上角選單 */}
      <button 
        onClick={() => { setIsMenuOpen(true); triggerVibrate(); }}
        className="fixed top-10 right-10 z-[100] p-5 bg-white/40 backdrop-blur-md rounded-[25px] shadow-2xl border-4 border-white/50"
      >
        <div className="space-y-2">
          <div className="w-10 h-1.5 bg-green-900 rounded-full"></div>
          <div className="w-10 h-1.5 bg-green-900 rounded-full"></div>
          <div className="w-10 h-1.5 bg-green-900 rounded-full"></div>
        </div>
      </button>

      {/* 教學與紅綠燈遊戲 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-white/95 backdrop-blur-xl z-[110] shadow-2xl p-10 flex flex-col"
          >
            <h2 className="text-4xl font-black text-green-900 mb-10 border-b-8 border-green-100 pb-4">教學中心</h2>
            <div className="space-y-8 flex-grow">
              <section className="bg-red-50 p-6 rounded-[35px] border-4 border-red-200">
                <h3 className="text-2xl font-black text-red-600 mb-2 tracking-widest text-center">🚦 紅綠燈遊戲</h3>
                <button 
                  onClick={() => { triggerVibrate(200); alert('🛑 停！不准動！'); }}
                  className="w-full py-6 bg-red-600 text-white font-black text-4xl rounded-full shadow-xl active:scale-95"
                >
                  停！🛑
                </button>
              </section>
              <section className="bg-green-50 p-6 rounded-[35px] text-lg font-bold text-green-800">
                <h3 className="text-xl font-black mb-3">💡 教學小撇步</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>先語音口訣，再加入身體動作。</li>
                  <li>配合動物情緒演戲，增加帶入感。</li>
                </ul>
              </section>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="mt-8 py-5 bg-green-900 text-white font-black text-2xl rounded-2xl">返回</button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-32 w-full" />
    </div>
  );
}