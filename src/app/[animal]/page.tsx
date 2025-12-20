'use client';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';

const animalData: any = {
  elephant: { name: '大象', icon: '🐘', color: '#8E949E', note: '咚、咚、咚、咚', action: '重音踏腳、強調一三拍重音' },
  rabbit: { name: '小兔子', icon: '🐰', color: '#FFB7C5', note: '蹦蹦、蹦蹦、跳、跳', action: '拍大腿、感受八分音符輕快感' },
  snake: { name: '小蛇', icon: '🐍', color: '#88D498', note: '嘶 —— 、嘶 ——', action: '手掌互搓、練習長音與空間感' },
  woodpecker: { name: '啄木鳥', icon: '🐦', color: '#FF6B6B', note: '噠噠噠、噠', action: '指尖輕敲、訓練指尖靈活性' },
  gorilla: { name: '大猩猩', icon: '🦍', color: '#6D4C41', note: '嗚、哈、嗚嗚、哈', action: '左右交替拍胸、訓練中軸線' },
  lion: { name: '獅子', icon: '🦁', color: '#F9A825', note: '吼！吼！吼！', action: '向前抓吼叫、練習爆發與靜止對比' },
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
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-start pt-[20px] z-[200] overflow-hidden"
      style={{ backgroundColor: data.color }}
    >
      {/* 1. 🏠 返回鍵：改為 140px 圓圈，固定左上角 12px */}
      <Link 
        href="/" 
        className="fixed top-[12px] left-[12px] z-[300] transition-transform hover:scale-110 active:scale-90"
      >
        <div className="zoo-circle-btn w-[140px] h-[140px] bg-white">
          <span className="text-[80px] select-none">🏠</span>
        </div>
      </Link>

      <div className="w-full max-w-6xl flex flex-col items-center">
        {/* 動物名稱：72px，間距縮小 */}
        <h2 className="text-[72px] font-black text-white italic mb-[20px] drop-shadow-lg">
          {data.name}
        </h2>

        {/* 主內容區：橫向排列兩個 140px 圓圈 */}
        <div className="flex flex-row items-center justify-center gap-[40px] mb-[30px] w-full px-[40px]">
          
          {/* 2. ▶️ 播放鍵：統一為 140px */}
          <div className="relative flex-shrink-0">
            <AnimatePresence>
              {isPlaying && (
                <motion.div 
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-gray-600/40 z-0"
                />
              )}
            </AnimatePresence>
            <button 
              onClick={togglePlay}
              className="zoo-circle-btn relative z-10 w-[140px] h-[140px] bg-white active:scale-95 transition-all"
            >
              <span className="text-[70px] text-black ml-[8px] select-none">
                {isPlaying ? '⏸️' : '▶️'}
              </span>
            </button>
          </div>

          {/* 3. 🐘 動物圖示：統一為 140px 容器 */}
          <motion.div 
            animate={isPlaying ? { 
              y: [0, -15, 0],
              rotate: [0, 3, -3, 0],
              scale: [1, 1.05, 1]
            } : {}}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="zoo-circle-btn w-[140px] h-[140px] bg-white flex items-center justify-center text-[90px] drop-shadow-2xl select-none"
          >
            {data.icon}
          </motion.div>
        </div>

        {/* 底部文字：20px 置中 */}
        <div className="text-center text-white space-y-1 px-6 max-w-2xl">
          <p className="text-[20px] font-medium opacity-90 leading-tight">
            動作提示：{data.action}
          </p>
          <p className="text-[20px] font-bold tracking-[0.2em] leading-normal">
            {data.note}
          </p>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={`/audio/${animalId}.mp3`} 
        loop 
        onEnded={() => setIsPlaying(false)} 
      />
    </motion.div>
  );
}