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

  const triggerVibrate = () => {
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate(60); 
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-20 px-6 overflow-y-auto">
      <h1 className="text-6xl md:text-8xl font-black text-amber-900 mb-24 drop-shadow-2xl">
        音樂動物園 🎵
      </h1>

      {/* 修正排間距：使用 gap-y-32 (非常寬的距離) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-32 gap-x-12 w-full max-w-6xl justify-items-center">
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center">
            <motion.button
              layoutId={`circle-bg-${a.id}`} 
              onClick={() => { triggerVibrate(); router.push(`/${a.id}`); }}
              /* 補回鼠標放大 (whileHover) 與 深層陰影 (shadow-2xl) */
              whileHover={{ scale: 1.15, rotate: 2 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-40 h-40 md:w-64 md:h-64 rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex items-center justify-center border-none outline-none overflow-hidden"
              style={{ backgroundColor: a.color, borderRadius: '9999px' }}
            >
              <span className="text-7xl md:text-[140px] z-10 select-none">{a.icon}</span>
            </motion.button>
            {/* 名稱也改為粗體大字 */}
            <span className="mt-8 text-3xl md:text-5xl font-black text-amber-900 drop-shadow-md">
              {a.name}
            </span>
          </div>
        ))}
      </div>

      {/* 右上角選單與紅綠燈遊戲 */}
      <button 
        onClick={() => { setIsMenuOpen(true); triggerVibrate(); }}
        className="fixed top-10 right-10 z-[100] p-6 bg-white/50 backdrop-blur-lg rounded-[30px] shadow-2xl border-4 border-white"
      >
        <div className="space-y-2">
          <div className="w-12 h-2 bg-amber-900 rounded-full"></div>
          <div className="w-12 h-2 bg-amber-900 rounded-full"></div>
          <div className="w-12 h-2 bg-amber-900 rounded-full"></div>
        </div>
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white/95 z-[110] shadow-2xl p-12 flex flex-col"
          >
            <h2 className="text-4xl font-black text-amber-900 mb-10 border-b-8 border-amber-100 pb-4">教學中心</h2>
            <div className="space-y-10 flex-grow">
              <section className="bg-red-50 p-8 rounded-[40px] border-4 border-red-200">
                <h3 className="text-3xl font-black text-red-600 mb-4">🚦 紅綠燈遊戲</h3>
                <button 
                  onClick={() => { triggerVibrate(); alert('🛑 停！不准動！'); }}
                  className="w-full py-8 bg-red-600 text-white font-black text-4xl rounded-full shadow-2xl active:scale-90"
                >
                  停！🛑
                </button>
              </section>
              <section className="bg-amber-50 p-8 rounded-[40px] text-xl font-bold text-amber-800">
                <p>💡 提示：先用語音口訣，再加入身體動作。</p>
              </section>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="mt-8 py-6 bg-amber-900 text-white font-black text-2xl rounded-3xl">關閉</button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-40 w-full" />
    </div>
  );
}