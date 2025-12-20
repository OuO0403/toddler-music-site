'use client';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';

// ... animalData 資料保持不變 ...

export default function AnimalPage() {
  const params = useParams();
  const animalId = params.animal as string;
  const data = animalData[animalId];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!data) return null;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      layoutId={`bg-${animalId}`}
      initial={{ borderRadius: '100%' }}
      animate={{ borderRadius: '0px' }}
      exit={{ borderRadius: '100%' }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-start pt-[40px] z-[200] overflow-hidden"
      style={{ backgroundColor: data.color }}
    >
      {/* 1. 🏠 返回鍵：縮小到 80px，無邊框 */}
      <Link 
        href="/" 
        className="fixed top-[16px] left-[16px] z-[300] transition-transform hover:scale-110 active:scale-90"
      >
        <div className="zoo-circle-btn w-[80px] h-[80px] bg-white border-none shadow-lg">
          <span className="text-[40px] select-none">🏠</span>
        </div>
      </Link>

      <div className="w-full max-w-6xl flex flex-col items-center">
        {/* 動物名稱 */}
        <h2 className="text-[72px] font-black text-white italic mb-[30px] drop-shadow-lg">
          {data.name}
        </h2>

        {/* 主內容區：兩個 200px 圓圈橫向排列 */}
        <div className="flex flex-row items-center justify-center gap-[60px] mb-[40px] w-full px-[40px]">
          
          {/* 2. ▶️ 播放鍵：加大到 200px，無邊框 */}
          <div className="relative flex-shrink-0">
            <AnimatePresence>
              {isPlaying && (
                <motion.div 
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-gray-600/30 z-0"
                />
              )}
            </AnimatePresence>
            <button 
              onClick={togglePlay}
              className="zoo-circle-btn relative z-10 w-[200px] h-[200px] bg-white border-none active:scale-95 transition-all shadow-xl"
            >
              <span className="text-[100px] text-black ml-[10px] select-none">
                {isPlaying ? '⏸️' : '▶️'}
              </span>
            </button>
          </div>

          {/* 3. 🐘 動物圖示：加大到 200px，與播放鍵一樣大，無邊框 */}
          <motion.div 
            animate={isPlaying ? { y: [0, -20, 0], rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="zoo-circle-btn w-[200px] h-[200px] bg-white flex items-center justify-center text-[140px] shadow-xl border-none select-none"
          >
            {data.icon}
          </motion.div>
        </div>

        {/* 底部文字：20px */}
        <div className="text-center text-white space-y-2 px-6 max-w-2xl">
          <p className="text-[20px] font-medium opacity-90 leading-snug">
            動作提示：{data.action}
          </p>
          <p className="text-[20px] font-bold tracking-[0.2em]">
            {data.note}
          </p>
        </div>
      </div>

      <audio ref={audioRef} src={`/audio/${animalId}.mp3`} loop onEnded={() => setIsPlaying(false)} />
    </motion.div>
  );
}