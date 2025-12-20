'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const animals = [
  { id: 'elephant', name: '大象', icon: '🐘', color: '#8E949E', desc: '沉穩的大地之聲' },
  { id: 'rabbit', name: '小兔子', icon: '🐰', color: '#FFB7C5', desc: '輕快跳躍' },
  { id: 'snake', name: '小蛇', icon: '🐍', color: '#88D498', desc: '流動的長音' },
  { id: 'woodpecker', name: '啄木鳥', icon: '🐦', color: '#FF6B6B', desc: '快速切分感' },
  { id: 'gorilla', name: '大猩猩', icon: '🦍', color: '#6D4C41', desc: '胸膛的共鳴' },
  { id: 'lion', name: '獅子', icon: '🦁', color: '#F9A825', desc: '爆發力的強音' },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#FFFBEB] overflow-hidden">
      {/* 右上角隱藏選單鍵 */}
      <button className="absolute top-8 right-8 z-50 group">
        <div className="space-y-2">
          <div className="w-10 h-1.5 bg-amber-800 rounded-full group-hover:bg-amber-600 transition-colors"></div>
          <div className="w-10 h-1.5 bg-amber-800 rounded-full group-hover:bg-amber-600 transition-colors"></div>
          <div className="w-10 h-1.5 bg-amber-800 rounded-full group-hover:bg-amber-600 transition-colors"></div>
        </div>
      </button>

      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-black text-amber-900 mb-16 tracking-widest"
      >
        音樂動物園 🎵
      </motion.h1>

      <div className="grid grid-cols-3 gap-16">
        {animals.map((animal) => (
          <motion.button
            key={animal.id}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push(`/${animal.id}`)}
            className="group relative flex flex-col items-center"
          >
            <motion.div
              layoutId={`bg-${animal.id}`}
              className="w-44 h-44 rounded-full shadow-2xl flex items-center justify-center text-7xl mb-4"
              style={{ backgroundColor: animal.color }}
            >
              {animal.icon}
            </motion.div>
            <span className="text-2xl font-bold text-amber-900">{animal.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
