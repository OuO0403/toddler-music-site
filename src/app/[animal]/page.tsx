'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimalMusicPlayer from '@/components/AnimalMusicPlayer';

const animalData: any = {
  elephant: { name: '大象', icon: '🐘', color: '#8E949E', note: '咚、咚、咚、咚', action: '用腳大力踏地', trait: '強調第一、三拍重音' },
  rabbit: { name: '小兔子', icon: '🐰', color: '#FFB7C5', note: '蹦蹦、蹦蹦、跳、跳', action: '雙手拍大腿', trait: '感受八分音符輕快感' },
  snake: { name: '小蛇', icon: '🐍', color: '#88D498', note: '嘶 —— 、嘶 ——', action: '雙手掌心互搓', trait: '練習長音與空間感' },
  woodpecker: { name: '啄木鳥', icon: '🐦', color: '#FF6B6B', note: '噠噠噠、噠', action: '指尖輕敲另一手心', trait: '訓練指尖靈活度' },
  gorilla: { name: '大猩猩', icon: '🦍', color: '#6D4C41', note: '嗚、哈、嗚嗚、哈', action: '雙手交替拍打胸口', trait: '訓練身體中軸認知' },
  lion: { name: '獅子', icon: '🦁', color: '#F9A825', note: '吼！', action: '雙手向前抓＋吼叫', trait: '練習靜止與爆發對比' },
};

export default function AnimalPage() {
  const params = useParams();
  const animalId = params.animal as string;
  const data = animalData[animalId];

  if (!data) return null;

  return (
    <motion.div 
      layoutId={`circle-bg-${animalId}`}
      initial={{ borderRadius: '9999px' }}
      animate={{ borderRadius: '0px' }}
      exit={{ borderRadius: '9999px' }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-around p-10 z-[200] overflow-y-auto"
      style={{ backgroundColor: data.color }}
    >
      <Link href="/" className="absolute top-12 left-12 text-7xl drop-shadow-2xl hover:scale-110">🏠</Link>

      <div className="text-center text-white">
        <h2 className="text-8xl font-black mb-4 drop-shadow-2xl tracking-tighter">{data.name}</h2>
        <p className="text-3xl font-bold bg-black/20 px-10 py-4 rounded-full inline-block border-2 border-white/30">{data.trait}</p>
      </div>

      <div className="w-full max-w-5xl bg-white/10 p-8 rounded-[60px] border-4 border-white/20 backdrop-blur-md">
        <AnimalMusicPlayer animalName={data.name} audioFile={`/audio/${animalId}.mp3`} animalColor="bg-black/30" />
      </div>

      <div className="bg-white/95 p-12 rounded-[80px] shadow-2xl flex flex-col md:flex-row items-center gap-16 w-full max-w-5xl">
        <div className="flex-grow text-center md:text-left text-green-900">
          <p className="text-3xl font-bold opacity-60 mb-2">動作提示：{data.action} [cite: 3, 9, 15, 21, 27, 33]</p>
          <p className="text-8xl font-black tracking-widest">{data.note} [cite: 4, 10, 16, 22, 28, 34]</p>
        </div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }} 
          className="text-[180px] drop-shadow-2xl"
        >
          {data.icon}
        </motion.div>
      </div>
    </motion.div>
  );
}