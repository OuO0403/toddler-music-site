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
      /* 關鍵：使用 layoutId 配合圓角動畫 */
      layoutId={`circle-bg-${animalId}`}
      initial={{ borderRadius: '100%' }}
      animate={{ borderRadius: '0px' }}
      exit={{ borderRadius: '100%' }} 
      transition={{ duration: 0.5 }}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-start py-8 px-6 z-[200] overflow-y-auto no-scrollbar"
      style={{ backgroundColor: data.color }}
    >
      {/* 修正：返回鍵絕對定位於左上角 */}
      <Link href="/" className="absolute top-8 left-8 text-[60px] drop-shadow-xl z-[210] hover:scale-110">🏠</Link>

      {/* 縮小容器間距達成一頁了然 */}
      <div className="text-center text-white mb-6 mt-12">
        <h2 className="text-6xl md:text-8xl font-black drop-shadow-lg italic">{data.name}</h2>
        <p className="text-xl md:text-2xl font-bold bg-white/20 px-6 py-1 rounded-full inline-block border-2 border-white/50">{data.trait}</p>
      </div>

      {/* 播放器容器縮小 */}
      <div className="w-full max-w-4xl bg-white/10 p-4 rounded-[40px] border-2 border-white/20 backdrop-blur-md mb-6">
        <AnimalMusicPlayer animalName={data.name} audioFile={`/audio/${animalId}.mp3`} animalColor="bg-black/20" />
      </div>

      {/* 內容拉近：動作指示區塊 */}
      <div className="bg-white p-6 rounded-[50px] shadow-2xl flex flex-col md:flex-row items-center gap-8 w-full max-w-4xl">
        <div className="flex-grow text-center md:text-left text-amber-900">
          <p className="text-2xl font-bold opacity-50 italic">動作：{data.action} [cite: 3, 9, 15, 21, 27, 33]</p>
          {/* 修正：字體大小 36px 且粗體 */}
          <p className="text-[36px] font-bold tracking-widest leading-tight">{data.note} </p>
        </div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} 
          className="text-[120px] md:text-[180px]"
        >
          {data.icon}
        </motion.div>
      </div>
    </motion.div>
  );
}