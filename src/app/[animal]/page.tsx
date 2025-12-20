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
      transition={{ duration: 0.4 }}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-start pt-16 z-[200] overflow-hidden"
      style={{ backgroundColor: data.color }}
    >
      {/* 修正：返回鍵固定左上角，距離邊框 12px */}
      <Link href="/" className="fixed top-[12px] left-[12px] text-7xl z-[300] drop-shadow-2xl">🏠</Link>

      {/* 動物名稱 72px */}
      <h2 className="text-[72px] font-black text-white italic mb-10">{data.name}</h2>

      {/* 主區域：左播放鍵、右動物圖示 (播放鍵加大至與動物一樣大) */}
      <div className="flex flex-row items-center justify-center gap-12 md:gap-24 w-full px-10">
        <div className="relative">
          <AnimatePresence>
            {isPlaying && (
              <motion.div 
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-gray-600/40"
              />
            )}
          </AnimatePresence>
          {/* 修正：播放鍵 w-48 h-48 與動物圖示比例一致 */}
          <button 
            onClick={togglePlay}
            className="zoo-circle-btn relative z-10 w-48 h-48 md:w-64 md:h-64 bg-white"
          >
            <span className="text-8xl md:text-[140px] text-black ml-4">{isPlaying ? '⏸️' : '▶️'}</span>
          </button>
        </div>

        {/* 修正：動物圖示位置上移 */}
        <motion.div 
          animate={isPlaying ? { y: [0, -30, 0], scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="text-[180px] md:text-[280px]"
        >
          {data.icon}
        </motion.div>
      </div>

      {/* 修正：文字內容上移，避免被螢幕底部切到 */}
      <div className="mt-12 text-center text-white space-y-4 px-6">
        <p className="text-[20px] font-bold opacity-90">動作提示：{data.action}</p>
        <p className="text-[24px] font-black tracking-widest leading-relaxed">
          {data.note}
        </p>
      </div>

      <audio ref={audioRef} src={`/audio/${animalId}.mp3`} loop onEnded={() => setIsPlaying(false)} />
    </motion.div>
  );
}