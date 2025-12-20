'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimalMusicPlayer from '@/components/AnimalMusicPlayer';

const animalData: any = {
  elephant: { name: '大象', icon: '🐘', color: '#8E949E', note: '咚、咚、咚、咚', action: '用腳大力踏地', trait: '強調第一、三拍重音' },
  rabbit: { name: '小兔子', icon: '🐰', color: '#FFB7C5', note: '蹦蹦、蹦蹦、跳、跳', action: '雙手拍大腿', trait: '感受八分音符輕快感' },
  snake: { name: '小蛇', icon: '🐍', color: '#88D498', note: '嘶 —— 、嘶 ——', action: '雙手掌心互搓', trait: '練習長音與空間感' },
  woodpecker: { name: '啄木鳥', icon: '🐦', color: '#FF6B6B', note: '噠噠噠、噠', action: '指尖輕敲手心', trait: '訓練指尖靈活性' },
  gorilla: { name: '大猩猩', icon: '🦍', color: '#6D4C41', note: '嗚、哈、嗚嗚、哈', action: '雙手交替拍打胸口', trait: '訓練中軸線認知' },
  lion: { name: '獅子', icon: '🦁', color: '#F9A825', note: '吼！', action: '雙手向前抓＋吼叫', trait: '練習爆發與靜止' },
};

export default function AnimalPage() {
  const params = useParams();
  const animalId = params.animal as string;
  const data = animalData[animalId];

  if (!data) return null;

  return (
    <motion.div 
      layoutId={`circle-bg-${animalId}`}
      initial={{ borderRadius: '100%' }}
      animate={{ borderRadius: '0px' }}
      exit={{ borderRadius: '100%' }} // 關鍵：確保返回時縮回圓形
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-start py-12 px-8 z-[200] overflow-y-auto"
      style={{ backgroundColor: data.color }}
    >
      {/* 返回鍵：絕對定位於左上角 */}
      <Link href="/" className="absolute top-8 left-8 text-6xl md:text-8xl drop-shadow-xl hover:scale-110 z-[210]">🏠</Link>

      {/* 標題與特點：縮小垂直間距 */}
      <div className="text-center text-white mb-8 mt-16">
        <h2 className="text-6xl md:text-9xl font-black drop-shadow-lg italic">{data.name}</h2>
        <p className="text-2xl md:text-4xl font-bold bg-white/20 px-8 py-2 rounded-full inline-block border-2 border-white/50">{data.trait}</p>
      </div>

      {/* 音樂播放器：精簡容器 */}
      <div className="w-full max-w-5xl bg-white/10 p-6 rounded-[50px] border-4 border-white/20 backdrop-blur-md mb-8">
        <AnimalMusicPlayer animalName={data.name} audioFile={`/audio/${animalId}.mp3`} animalColor="bg-black/30" />
      </div>

      {/* 動作指示：一頁了然，減少冗餘框佔位 */}
      <div className="bg-white p-8 rounded-[60px] shadow-2xl flex flex-col md:flex-row items-center gap-10 w-full max-w-5xl">
        <div className="flex-grow text-center md:text-left text-amber-900">
          <p className="text-3xl font-bold opacity-50 mb-2 italic">動作：{data.action}</p>
          <p className="text-6xl md:text-8xl font-black tracking-widest">{data.note}</p>
        </div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} 
          className="text-[150px] md:text-[220px]"
        >
          {data.icon}
        </motion.div>
      </div>
    </motion.div>
  );
}