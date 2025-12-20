'use client';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';

const animalData: any = {
  elephant: { name: '大象', icon: '🐘', color: '#8E949E', note: '咚、咚、咚、咚', action: '重音踏腳' },
  rabbit: { name: '小兔子', icon: '🐰', color: '#FFB7C5', note: '蹦蹦、蹦蹦、跳、跳', action: '拍大腿' },
  snake: { name: '小蛇', icon: '🐍', color: '#88D498', note: '嘶 —— 、嘶 ——', action: '手掌互搓' },
  woodpecker: { name: '啄木鳥', icon: '🐦', color: '#FF6B6B', note: '噠噠噠、噠', action: '指尖輕敲' },
  gorilla: { name: '大猩猩', icon: '🦍', color: '#6D4C41', note: '嗚、哈、嗚嗚、哈', action: '拍打胸口' },
  lion: { name: '獅子', icon: '🦁', color: '#F9A825', note: '吼！吼！吼！', action: '向前抓吼叫' },
};

export default function AnimalPage() {
  const params = useParams();
  const animalId = params.animal as string;
  const data = animalData[animalId];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!data) return null;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) { audioRef.current.pause(); } 
      else { audioRef.current.currentTime = 0; audioRef.current.play(); }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      layoutId={`bg-${animalId}`}
      initial={{ borderRadius: '100%' }}
      animate={{ borderRadius: '0px' }}
      exit={{ borderRadius: '100%' }}
      transition={{ duration: 0.35, ease: "easeInOut" }} // 縮短時間，平滑動畫解決抽搐
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center z-[200] overflow-hidden"
      style={{ backgroundColor: data.color }}
    >
      {/* 返回鍵：左上角 12px */}
      <Link href="/" className="fixed top-3 left-3 text-6xl z-[300] drop-shadow-xl">🏠</Link>

      <div className="w-full flex flex-col items-center justify-center px-4">
        {/* 動物名稱 72px */}
        <h2 className="text-[72px] font-black text-white mb-10 italic">{data.name}</h2>

        {/* 中間主佈局：左播放、右動物 */}
        <div className="flex flex-row items-center justify-center gap-20 mb-12 w-full">
          <div className="relative">
            <AnimatePresence>
              {isPlaying && (
                <motion.div 
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-gray-600/50"
                />
              )}
            </AnimatePresence>
            <button 
              onClick={togglePlay}
              className="zoo-circle-btn relative z-10 w-48 h-48 md:w-64 md:h-64 bg-white"
            >
              <span className="text-8xl text-black">{isPlaying ? '⏸️' : '▶️'}</span>
            </button>
          </div>

          <motion.div 
            animate={isPlaying ? { y: [0, -20, 0], scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="text-[200px] md:text-[280px]"
          >
            {data.icon}
          </motion.div>
        </div>

        {/* 20px 置中文字內容 (無框線) */}
        <div className="text-center text-white space-y-2">
          <p className="text-[20px] font-medium opacity-90">動作提示：{data.action}</p>
          <p className="text-[20px] font-bold tracking-widest">{data.note}</p>
        </div>
      </div>

      <audio ref={audioRef} src={`/audio/${animalId}.mp3`} loop onEnded={() => setIsPlaying(false)} />
    </motion.div>
  );
}