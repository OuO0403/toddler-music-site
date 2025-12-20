'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const animals = [
  { id: 'elephant', name: '大象', icon: '🐘', color: '#8E949E', note: '咚咚踏腳' },
  { id: 'rabbit', name: '小兔子', icon: '🐰', color: '#FFB7C5', note: '蹦蹦拍腿' },
  { id: 'snake', name: '小蛇', icon: '🐍', color: '#88D498', note: '嘶嘶互搓' },
  { id: 'woodpecker', name: '啄木鳥', icon: '🐦', color: '#FF6B6B', note: '噠噠敲手' },
  { id: 'gorilla', name: '大猩猩', icon: '🦍', color: '#6D4C41', note: '嗚哈拍胸' },
  { id: 'lion', name: '獅子', icon: '🦁', color: '#F9A825', note: '吼叫爆發' },
];

export default function HomePage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 震動反饋函數
  const triggerVibrate = () => {
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate(50); // 震動 50 毫秒
    }
  };

  const handleNavigate = (id: string) => {
    triggerVibrate();
    router.push(`/${id}`);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-100 to-amber-50 flex flex-col items-center py-12 px-4">
      
      <motion.h1 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl md:text-7xl font-black text-amber-900 mb-12 drop-shadow-xl"
      >
        音樂動物園 🎵
      </motion.h1>

      {/* 2x3 固定網格，gap 縮小讓它們靠近 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-4xl justify-items-center">
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center">
            <motion.button
              layoutId={`circle-${a.id}`} // 關鍵：換頁過場 ID
              onClick={() => handleNavigate(a.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              /* 固定圓圈大小為 220px (手機) / 280px (電腦) */
              className="w-40 h-40 md:w-64 md:h-64 rounded-full shadow-2xl flex items-center justify-center border-8 border-white overflow-hidden relative"
              style={{ backgroundColor: a.color }}
            >
              <span className="text-7xl md:text-[140px] z-10">{a.icon}</span>
            </motion.button>
            <span className="mt-4 text-2xl md:text-4xl font-black text-amber-900 tracking-wider">
              {a.name}
            </span>
          </div>
        ))}
      </div>

      {/* 右上角選單鍵 */}
      <button 
        onClick={() => { setIsMenuOpen(!isMenuOpen); triggerVibrate(); }}
        className="fixed top-6 right-6 z-[100] p-4 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border-2 border-amber-500"
      >
        <div className="space-y-1.5">
          <div className="w-8 h-1.5 bg-amber-700 rounded-full"></div>
          <div className="w-8 h-1.5 bg-amber-700 rounded-full"></div>
          <div className="w-8 h-1.5 bg-amber-700 rounded-full"></div>
        </div>
      </button>

      {/* 教學選單面板 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="fixed top-0 right-0 h-full w-full md:w-80 bg-white/95 backdrop-blur-xl z-[90] shadow-2xl p-8 flex flex-col border-l-4 border-amber-400"
          >
            <h2 className="text-3xl font-black text-amber-900 mb-8 border-b-4 border-amber-200 pb-2">家長/老師教學</h2>
            
            <div className="space-y-6 overflow-y-auto flex-grow">
              <section className="bg-red-100 p-4 rounded-3xl border-4 border-red-400">
                <h3 className="text-xl font-black text-red-700 mb-2">🚦 紅綠燈遊戲</h3>
                [cite_start]<p className="text-sm font-bold">隨時點擊「停！」，訓練孩子瞬間安靜與自律能力 [cite: 39]。</p>
                <button 
                  onClick={() => alert('🛑 暫停！大家不要動！')}
                  className="mt-4 w-full py-4 bg-red-600 text-white font-black text-2xl rounded-full shadow-lg active:scale-95"
                >
                  停！🛑
                </button>
              </section>

              <section className="bg-amber-100 p-4 rounded-3xl">
                <h3 className="text-xl font-black text-amber-700 mb-2">💡 教學小撇步</h3>
                <ul className="text-sm font-bold space-y-2 list-disc pl-4">
                  [cite_start]<li>先語音口訣，再加入身體動作 [cite: 37]。</li>
                  [cite_start]<li>配合動物情緒演戲，增加帶入感 [cite: 38]。</li>
                </ul>
              </section>
            </div>

            <button onClick={() => setIsMenuOpen(false)} className="mt-8 py-4 bg-amber-500 text-white font-black rounded-2xl">關閉選單</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}