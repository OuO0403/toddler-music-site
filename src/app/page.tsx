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
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-6xl font-black text-amber-900 mb-12 drop-shadow-lg">
        音樂動物園 🎵
      </h1>

      {/* 2x3 網格 */}
      <div className="grid grid-cols-3 gap-16">
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push(`/${a.id}`)}
              /* 關鍵：使用 aspect-square 確保是正方形，rounded-full 確保是圓形 */
              className="w-48 h-48 rounded-full shadow-2xl flex items-center justify-center text-8xl border-none outline-none"
              style={{ backgroundColor: a.color }}
            >
              <motion.span layoutId={`icon-${a.id}`}>{a.icon}</motion.span>
              
              {/* 過場用的背景層 */}
              <motion.div
                layoutId={`circle-${a.id}`}
                className="absolute inset-0 rounded-full z-[-1]"
                style={{ backgroundColor: a.color }}
              />
            </motion.button>
            <span className="mt-4 text-2xl font-black text-amber-900 tracking-widest">
              {a.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}