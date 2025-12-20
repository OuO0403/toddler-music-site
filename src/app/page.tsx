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

  // 觸覺反饋 (震動)
  const triggerVibrate = () => {
    if (typeof window !== 'undefined' && window.navigator.vibrate) {
      window.navigator.vibrate(60); 
    }
  };

  const handleNavigate = (id: string) => {
    triggerVibrate();
    router.push(`/${id}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-12 px-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-black text-amber-900 mb-16 drop-shadow-xl"
      >
        音樂動物園 🎵
      </motion.h1>

      {/* 2x3 固定比例大網格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20 w-full max-w-5xl justify-items-center">
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center w-full">
            <motion.button
              layoutId={`circle-${a.id}`} // 確保過場動畫連接
              onClick={() => handleNavigate(a.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              /* 強制固定為正圓，比例 1:1 */
              className="relative w-full aspect-square max-w-[280px] rounded-full shadow-[0_25px_50px_rgba(0,0,0,0.2)] flex items-center justify-center border-none outline-none overflow-hidden"
              style={{ backgroundColor: a.color }}
            >
              <span className="text-[100px] md:text-[150px] leading-none select-none z-10">
                {a.icon}
              </span>
            </motion.button>
            <span className="mt-6 text-3xl md:text-5xl font-black text-amber-900 drop-shadow-sm">
              {a.name}
            </span>
          </div>
        ))}
      </div>

      {/* 右上角選單 */}
      <button 
        onClick={() => { setIsMenuOpen(true); triggerVibrate(); }}
        className="fixed top-8 right-8 z-[100] p-6 bg-white/40 backdrop-blur-md rounded-[30px] shadow-2xl"
      >
        <div className="space-y-2">
          <div className="w-12 h-2 bg-amber-900 rounded-full"></div>
          <div className="w-12 h-2 bg-amber-900 rounded-full"></div>
          <div className="w-12 h-2 bg-amber-900 rounded-full"></div>
        </div>
      </button>

      {/* 教學面板與紅綠燈遊戲 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white/95 backdrop-blur-2xl z-[110] shadow-2xl p-10 flex flex-col"
          >
            <h2 className="text-4xl font-black text-amber-900 mb-10">教學中心</h2>
            <div className="space-y-8 flex-grow overflow-y-auto">
              <section className="bg-red-50 p-6 rounded-[40px] border-4 border-red-200">
                <h3 className="text-2xl font-black text-red-600 mb-4 tracking-wider">🚦 紅綠燈遊戲</h3>
                [cite_start]<p className="font-bold text-gray-700 mb-6">隨時喊「停！」，訓練孩子的自制力 [cite: 39]。</p>
                <button 
                  onClick={() => { triggerVibrate(); alert('🛑 暫停！大家不要動！'); }}
                  className="w-full py-6 bg-red-500 text-white font-black text-3xl rounded-full shadow-xl active:scale-90"
                >
                  停！🛑
                </button>
              </section>
              <section className="bg-amber-50 p-6 rounded-[40px]">
                <h3 className="text-2xl font-black text-amber-700 mb-4">💡 教學小撇步</h3>
                <ul className="space-y-4 font-bold text-amber-900 list-disc pl-5">
                  [cite_start]<li>先用語音口訣，再加入身體動作 [cite: 37]。</li>
                  [cite_start]<li>配合動物情緒演戲，增加帶入感 [cite: 38]。</li>
                </ul>
              </section>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="mt-8 py-5 bg-amber-800 text-white font-black text-xl rounded-3xl">返回動物園</button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-20 w-full" /> {/* 底部留白確保滑動到底 */}
    </div>
  );
}