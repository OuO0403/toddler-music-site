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

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center py-20 px-4 overflow-x-hidden">
      <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl mb-20 italic">音樂動物園 🎵</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-24 w-full max-w-7xl justify-items-center">
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center w-full">
            <motion.button
              layoutId={`circle-bg-${a.id}`} 
              onClick={() => router.push(`/${a.id}`)}
              whileHover={{ scale: 1.1 }}
              className="relative w-full aspect-square max-w-[300px] rounded-full shadow-2xl flex items-center justify-center border-[12px] border-white/80"
              style={{ backgroundColor: a.color, borderRadius: '9999px' }}
            >
              <span className="text-[120px] md:text-[180px] select-none">{a.icon}</span>
            </motion.button>
            <span className="mt-8 text-[36px] font-bold text-white drop-shadow-lg">{a.name}</span>
          </div>
        ))}
      </div>

      {/* 選單按鈕：固定右上角 */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-8 right-8 z-[150] p-6 bg-amber-500 rounded-3xl shadow-2xl border-4 border-white active:scale-90"
      >
        <div className="space-y-2">
          <div className="w-10 h-2 bg-white rounded-full"></div>
          <div className="w-10 h-2 bg-white rounded-full"></div>
          <div className="w-10 h-2 bg-white rounded-full"></div>
        </div>
      </button>

      {/* 1/3 選單與暗色遮罩 */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[110] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-1/3 bg-[#f0fdf4] z-[120] shadow-2xl p-10 flex flex-col border-l-[12px] border-amber-500"
            >
              <h2 className="text-4xl font-black text-amber-900 mb-8 border-b-4 border-amber-100 pb-2">管理中心</h2>
              <div className="space-y-8 flex-grow">
                <section className="bg-red-500 p-8 rounded-[40px] shadow-lg text-center">
                  <h3 className="text-2xl font-black text-white mb-4">🚦 紅綠燈遊戲</h3>
                  <button onClick={() => alert('🛑 停！')} className="w-full py-6 bg-white text-red-600 font-bold text-[36px] rounded-full">停！🛑</button>
                </section>
                <div className="bg-green-100 p-6 rounded-3xl text-[24px] font-bold text-green-800 border-2 border-green-200">
                  <p>💡 先語音口訣，再加入身體動作。</p>
                </div>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="mt-auto py-6 bg-amber-900 text-white font-bold text-[36px] rounded-2xl">收回選單</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}