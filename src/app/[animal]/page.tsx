'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';

const animalData: any = {
  elephant: { name: '大象', icon: '🐘', color: '#8E949E', note: '咚、咚、咚、咚', action: '用腳大力踏地', trait: '強調第一、三拍重音' },
  rabbit: { name: '小兔子', icon: '🐰', color: '#FFB7C5', note: '蹦蹦、蹦蹦、跳、跳', action: '雙手拍大腿', trait: '感受八分音符輕快感' },
  snake: { name: '小蛇', icon: '🐍', color: '#88D498', note: '嘶 —— 、嘶 ——', action: '雙手掌心互搓', trait: '練習長音與空間感' },
  woodpecker: { name: '啄木鳥', icon: '🐦', color: '#FF6B6B', note: '噠噠噠、噠', action: '手指輕敲手心', trait: '訓練指尖靈活性' },
  gorilla: { name: '大猩猩', icon: '🦍', color: '#6D4C41', note: '嗚、哈、嗚嗚、哈', action: '雙手交替拍打胸口', trait: '訓練中軸線認知' },
  lion: { name: '獅子', icon: '🦁', color: '#F9A825', note: '吼！', action: '雙手向前抓＋吼叫', trait: '練習爆發與靜止' },
};

export default function AnimalPage() {
  const params = useParams();
  const animalId = params.animal as string;
  const data = animalData[animalId];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!data) return null;

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 2000); // 漣漪動畫持續時間
    }
  };

  return (
    <motion.div 
      layoutId={`circle-bg-${animalId}`}
      initial={{ borderRadius: '100%' }}
      animate={{ borderRadius: '0px' }}
      exit={{ borderRadius: '100%' }} 
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center p-6 z-[200] overflow-hidden"
      style={{ backgroundColor: data.color }}
    >
      {/* 修正：返回鍵絕對固定在左上角 */}
      <Link href="/" className="fixed top-8 left-8 text-[60px] drop-shadow-2xl z-[250] hover:scale-110 active:scale-90 transition-transform">
        🏠
      </Link>

      <div className="w-full max-w-4xl flex flex-col items-center gap-4 text-white">
        <h2 className="text-7xl md:text-9xl font-black drop-shadow-lg italic">{data.name}</h2>
        <p className="text-xl md:text-2xl font-bold bg-white/20 px-8 py-2 rounded-full border-2 border-white/50 mb-4">
          {data.trait}
        </p>

        {/* 修正：巨大的圓形播放鍵與漣漪效果 */}
        <div className="relative mb-8">
          <AnimatePresence>
            {isPlaying && (
              <motion.div 
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-full bg-white z-0"
              />
            )}
          </AnimatePresence>
          
          <button 
            onClick={handlePlay}
            className="relative z-10 w-40 h-40 md:w-56 md:h-56 bg-white rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            <span className="text-7xl md:text-9xl ml-4">▶️</span>
          </button>
          
          <audio ref={audioRef} src={`/audio/${animalId}.mp3`} onEnded={() => setIsPlaying(false)} />
        </div>

        {/* 動作卡片：拉近內容，一頁了然 */}
        <div className="bg-white/95 p-8 rounded-[60px] shadow-2xl flex flex-col md:flex-row items-center justify-between w-full border-4 border-white text-amber-900">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold opacity-50 italic mb-2">動作：{data.action}</p>
            <p className="text-[36px] font-bold tracking-widest">{data.note}</p>
          </div>
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }} 
            className="text-[140px] md:text-[200px]"
          >
            {data.icon}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}