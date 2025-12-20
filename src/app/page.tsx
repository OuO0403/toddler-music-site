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
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#FFFBEB] overflow-hidden">
      {/* 右上角選單鍵 */}
      <button className="absolute top-8 right-8 z-50 p-4 bg-white/50 rounded-2xl shadow-sm">
        <div className="space-y-2">
          <div className="w-10 h-1.5 bg-amber-900 rounded-full"></div>
          <div className="w-10 h-1.5 bg-amber-900 rounded-full"></div>
          <div className="w-10 h-1.5 bg-amber-900 rounded-full"></div>
        </div>
      </button>

      <h1 className="text-5xl font-black text-amber-900 mb-16">選一個動物玩音樂 🎵</h1>

      <div className="grid grid-cols-3 gap-16">
        {animals.map((a) => (
          <motion.button
            key={a.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push(`/${a.id}`)}
            className="flex flex-col items-center group"
          >
            {/* 圓圈放大過場動畫的核心 */}
            <motion.div
              layoutId={`circle-${a.id}`}
              className="w-48 h-48 rounded-full shadow-2xl flex items-center justify-center text-8xl mb-4"
              style={{ backgroundColor: a.color }}
            >
              {a.icon}
            </motion.div>
            <span className="text-2xl font-bold text-amber-900">{a.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}