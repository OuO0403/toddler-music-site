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
    <div className="w-full min-h-screen flex flex-col items-center py-12 px-6 relative">
      <h1 className="text-5xl md:text-7xl font-black text-amber-900 mb-16 drop-shadow-xl tracking-widest">
        音樂動物園 🎵
      </h1>

      {/* 2x3 網格：移除所有中間容器 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20 w-full max-w-5xl justify-items-center">
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center w-full">
            <motion.button
              layoutId={`bg-${a.id}`} // 與分頁對應
              onClick={() => { triggerVibrate(); router.push(`/${a.id}`); }}
              className="relative w-full aspect-square max-w-[260px] rounded-full shadow-2xl flex items-center justify-center border-none outline-none overflow-hidden"
              style={{ backgroundColor: a.color, borderRadius: '9999px' }}
            >
              <motion.span 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                className="text-[100px] md:text-[140px] z-10 select-none"
              >
                {a.icon}
              </motion.span>
            </motion.button>
            <span className="mt-6 text-3xl md:text-5xl font-black text-amber-900 drop-shadow-sm">
              {a.name}
            </span>
          </div>
        ))}
      </div>

      {/* 右上角功能選單 */}
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

      {/* 教學面板：包含紅綠燈遊戲  */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white/95 backdrop-blur-2xl z-[110] shadow-2xl p-10 flex flex-col"
          >
            <h2 className="text-4xl font-black text-amber-900 mb-10">教學中心</h2>
            <div className="space-y-8 flex-grow overflow-y-auto">
              {/* 紅綠燈遊戲區  */}
              <section className="bg-red-50 p-6 rounded-[40px] border-4 border-red-200">
                <h3 className="text-2xl font-black text-red-600 mb-2">🚦 紅綠燈遊戲</h3>
                <p className="font-bold text-gray-700 mb-6 italic">隨時大喊「停！」訓練自律能力 。</p>
                <button 
                  onClick={() => { triggerVibrate(); alert('🛑 暫停！大家不要動！'); }}
                  className="w-full py-6 bg-red-600 text-white font-black text-4xl rounded-full shadow-xl active:scale-95"
                >
                  停！🛑
                </button>
              </section>
              {/* 教學小撇步 [cite: 36, 37, 38] */}
              <section className="bg-amber-50 p-6 rounded-[40px]">
                <h3 className="text-2xl font-black text-amber-700 mb-4">💡 教學小撇步</h3>
                <ul className="space-y-4 font-bold text-amber-900 list-disc pl-5 text-lg">
                  <li>先唸狀聲詞口訣，再加入身體動作 [cite: 37]。</li>
                  <li>配合動物情緒演戲，增加帶入感 [cite: 38]。</li>
                </ul>
              </section>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="mt-8 py-5 bg-amber-800 text-white font-black text-xl rounded-3xl">返回動物園</button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-24 w-full" />
    </div>
  );
}