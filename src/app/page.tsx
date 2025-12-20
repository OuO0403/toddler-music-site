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
    <div className="w-full min-h-screen flex flex-col items-center py-10 px-4">
      <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl mb-12 italic">音樂動物園 🎵</h1>

      {/* 修改處：grid-cols-2 (一排 2 個)，max-w 稍微縮小讓 2 列佈局視覺更集中 */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-[48px] w-full max-w-4xl justify-items-center">
        {animals.map((a) => (
          <div key={a.id} className="flex flex-col items-center w-full">
            <motion.button
              layoutId={`bg-${a.id}`}
              onClick={() => router.push(`/${a.id}`)}
              whileHover={{ scale: 1.1 }}
              className="zoo-circle-btn relative w-full aspect-square max-w-[280px]"
              style={{ backgroundColor: a.color }}
            >
              <span className="text-[80px] md:text-[240px] select-none pointer-events-none">{a.icon}</span>
            </motion.button>
            <span className="mt-[12px] text-zoo-36 text-white drop-shadow-lg">{a.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}