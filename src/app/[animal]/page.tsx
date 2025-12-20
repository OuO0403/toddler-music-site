'use client';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) { audioRef.current.pause(); } 
      else { audioRef.current.currentTime = 0; audioRef.current.play(); }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      layoutId={`circle-bg-${animalId}`}
      initial={{ borderRadius: '100%' }}
      animate={{ borderRadius: '0px' }}
      exit={{ borderRadius: '100%' }}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center z-[200] overflow-hidden"
      style={{ backgroundColor: data.color }}
    >
      {/* 🏠 返回鍵：絕對定位左上角，脫離容器 */}
      <Link href="/" className="fixed top-10 left-10 text-[70px] drop-shadow-2xl z-[300] hover:scale-110 active:scale-90 transition-transform">🏠</Link>

      <div className="w-full max-w-5xl flex flex-col items-center gap-6 px-6">
        <div className="text-center text-white">
          <h2 className="text-8xl md:text-[120px] font-black drop-shadow-lg italic mb-2">{data.name}</h2>
          <div className="px-12 py-3 rounded-full border-4 border-white inline-block bg-white/20">
            <p className="text-3xl md:text-5xl font-bold">{data.trait}</p>
          </div>
        </div>

        {/* 🔘 巨大的圓形播放鈕 + 漣漪動畫 */}
        <div className="relative my-6 flex items-center justify-center">
          <AnimatePresence>
            {isPlaying && (
              <motion.div 
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2.8, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-white z-0"
              />
            )}
          </AnimatePresence>
          <button 
            onClick={togglePlay}
            className="relative z-10 w-48 h-48 md:w-64 md:h-64 bg-white rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-all"
          >
            <span className="text-8xl md:text-[120px] ml-4 text-amber-600">{isPlaying ? '⏸️' : '▶️'}</span>
          </button>
        </div>

        {/* 📝 動作指示：白底、36級粗體、一頁了然 */}
        <div className="bg-white p-10 rounded-[60px] shadow-2xl flex flex-col md:flex-row items-center justify-between w-full border-8 border-white/50">
          <div className="text-center md:text-left text-amber-900">
            <p className="text-3xl font-bold opacity-40 italic mb-2">動作提示：{data.action}</p>
            <p className="text-zoo-36 tracking-widest leading-tight">{data.note}</p>
          </div>
          <motion.div 
            animate={isPlaying ? { y: [0, -30, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="text-[180px] md:text-[250px] drop-shadow-xl"
          >
            {data.icon}
          </motion.div>
        </div>
      </div>
      <audio ref={audioRef} src={`/audio/${animalId}.mp3`} loop onEnded={() => setIsPlaying(false)} />
    </motion.div>
  );
}