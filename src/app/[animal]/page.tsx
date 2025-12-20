'use client';
import { useParams } from 'next/navigation';
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
    // 過場動畫：圓形溢出放大
    <motion.div 
      layoutId={`circle-bg-${animalId}`}
      initial={{ borderRadius: '100%' }}
      animate={{ borderRadius: '0px' }}
      exit={{ borderRadius: '100%' }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center z-[200] overflow-hidden"
      style={{ backgroundColor: data.color }}
    >
      {/* 🏠 返回鍵：固定在左上角，離邊框 12px */}
      <Link href="/" className="fixed top-[12px] left-[12px] text-[60px] md:text-[80px] z-[300] drop-shadow-2xl hover:scale-110 active:scale-90 transition-transform">
        🏠
      </Link>

      <div className="w-full max-w-6xl flex flex-col items-center px-4">
        {/* 動物名稱：72px 粗體 */}
        <h2 className="text-zoo-72 text-white drop-shadow-lg italic mb-6 leading-none">
          {data.name}
        </h2>

        {/* 核心內容區：一頁了然，不需捲動 */}
        <div className="w-full flex flex-row items-center justify-between gap-10">
          
          {/* 左側：巨大的圓形漣漪播放鈕 */}
          <div className="relative flex-shrink-0">
            <AnimatePresence>
              {isPlaying && (
                <motion.div 
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-gray-500 z-0"
                />
              )}
            </AnimatePresence>
            <button 
              onClick={togglePlay}
              className="zoo-circle-btn relative z-10 w-44 h-44 md:w-72 md:h-72 bg-white active:scale-95"
            >
              <span className="text-[100px] md:text-[150px] ml-4 text-black">
                {isPlaying ? '⏸️' : '▶️'}
              </span>
            </button>
          </div>

          {/* 右側：連動跳動的動物圖示 */}
          <motion.div 
            animate={isPlaying ? { 
              y: [0, -40, 0],
              rotate: animalId === 'rabbit' ? [0, -10, 10, 0] : [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ repeat: Infinity, duration: animalId === 'elephant' ? 1.0 : 0.6 }}
            className="text-[180px] md:text-[300px] flex-shrink-0 drop-shadow-2xl"
          >
            {data.icon}
          </motion.div>
        </div>

        {/* 下方教學內容：36級粗體字 */}
        <div className="mt-10 w-full bg-white/10 backdrop-blur-md rounded-[40px] p-8 border-4 border-white/50 text-white">
          <p className="text-zoo-36 opacity-80 mb-4 italic">💡 動作提示：{data.action}</p>
          <div className="flex items-center gap-4">
            <span className="text-zoo-36 bg-black text-white px-6 py-2 rounded-full">節奏口訣</span>
            <span className="text-zoo-36 tracking-[10px]">{data.note}</span>
          </div>
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