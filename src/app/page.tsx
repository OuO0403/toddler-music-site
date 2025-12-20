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

  const triggerVibrate = (ms = 80) => {
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate(ms);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-20 px-4 relative">
      <h1 className="text-6xl md:text-9xl font-black text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] mb-20 tracking-tighter italic">
        音樂動物園 🎵
      </h1>

      {/* 3x2 巨大網格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 md:gap-x-20 gap-y-20 md:gap-y-32 w-full max-w-7xl justify-items-center">
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center w-full">
            <motion.button
              layoutId={`circle-bg-${a.id}`} 
              onClick={() => { triggerVibrate(); router.push(`/${a.id}`); }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              /* 強制巨大化：w-full 搭配更大的 max-w */
              className="relative w-full aspect-square max-w-[320px] rounded-full shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] flex items-center justify-center border-[12px] border-white/80 overflow-hidden z-10"
              style={{ backgroundColor: a.color }}
            >
              <span className="text-[120px] md:text-[200px] select-none pointer-events-none drop-shadow-lg">{a.icon}</span>
            </motion.button>
            <span className="mt-10 text-4xl md:text-7xl font-black text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              {a.name}
            </span>
          </div>
        ))}
      </div>

      {/* 右上角選單鍵 */}
      <button 
        onClick={() => { setIsMenuOpen(true); triggerVibrate(); }}
        className="fixed top-10 right-10 z-[100] p-8 bg-amber-500 rounded-[40px] shadow-2xl border-8 border-white hover:scale-110 transition-transform"
      >
        <div className="space-y-3">
          <div className="w-16 h-3 bg-white rounded-full"></div>
          <div className="w-16 h-3 bg-white rounded-full"></div>
          <div className="w-16 h-3 bg-white rounded-full"></div>
        </div>
      </button>

      {/* 教學與紅綠燈遊戲 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white z-[110] shadow-2xl p-12 flex flex-col border-l-[15px] border-amber-500"
          >
            <h2 className="text-5xl font-black text-amber-900 mb-10 pb-6 border-b-8 border-amber-100">管理中心</h2>
            <div className="space-y-12 flex-grow">
              <section className="bg-red-500 p-10 rounded-[60px] shadow-xl">
                <h3 className="text-4xl font-black text-white mb-6 text-center tracking-widest italic">🚦 紅綠燈遊戲 [cite: 39]</h3>
                <button 
                  onClick={() => { triggerVibrate(300); alert('🛑 停！不准動！'); }}
                  className="w-full py-10 bg-white text-red-600 font-black text-6xl rounded-full shadow-2xl active:scale-95 border-8 border-red-200"
                >
                  停！🛑
                </button>
              </section>
              <section className="bg-green-100 p-8 rounded-[50px] text-2xl font-bold text-green-900 border-4 border-green-300">
                <h3 className="text-3xl font-black mb-4">💡 教學提示 [cite: 36]</h3>
                <ul className="list-disc pl-8 space-y-4">
                  <li>先用語音口訣，再加入身體動作 [cite: 37]。</li>
                  <li>配合動物情緒演戲，增加帶入感 [cite: 38]。</li>
                </ul>
              </section>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="mt-8 py-8 bg-amber-900 text-white font-black text-4xl rounded-3xl">返回</button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-60 w-full" />
    </div>
  );
}