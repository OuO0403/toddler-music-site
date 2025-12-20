'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimalMusicPlayer from '@/components/AnimalMusicPlayer';

const animalData: any = {
  elephant: { name: '大象', icon: '🐘', color: '#8E949E', note: '咚、咚、咚、咚 [cite: 4]', action: '用腳大力踏地 [cite: 3]', trait: '強調第一、三拍重音 [cite: 2]' },
  rabbit: { name: '小兔子', icon: '🐰', color: '#FFB7C5', note: '蹦蹦、蹦蹦、跳、跳 [cite: 10]', action: '雙手拍大腿 [cite: 9]', trait: '感受八分音符輕快感 [cite: 8]' },
  snake: { name: '小蛇', icon: '🐍', color: '#88D498', note: '嘶 —— 、嘶 —— [cite: 16]', action: '雙手掌心互搓 [cite: 15]', trait: '練習長音與空間感 [cite: 14]' },
  woodpecker: { name: '啄木鳥', icon: '🐦', color: '#FF6B6B', note: '噠噠噠、噠 [cite: 22]', action: '指尖輕敲手心 [cite: 21]', trait: '訓練指尖靈活性 [cite: 20]' },
  gorilla: { name: '大猩猩', icon: '🦍', color: '#6D4C41', note: '嗚、哈、嗚嗚、哈 [cite: 28]', action: '雙手交替拍打胸口 [cite: 27]', trait: '訓練中軸線認知 [cite: 26]' },
  lion: { name: '獅子', icon: '🦁', color: '#F9A825', note: '吼！ [cite: 34]', action: '雙手向前抓＋吼叫 [cite: 33]', trait: '練習爆發與靜止 [cite: 32]' },
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
      exit={{ borderRadius: '100%' }}
      transition={{ type: "spring", stiffness: 90, damping: 15 }}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-around p-10 z-[200] overflow-y-auto"
      style={{ backgroundColor: data.color }}
    >
      <Link href="/" className="absolute top-16 left-16 text-[100px] drop-shadow-2xl hover:scale-110 active:scale-90 transition-transform">🏠</Link>

      <div className="text-center text-white">
        <h2 className="text-[120px] font-black mb-6 drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] tracking-tighter italic">{data.name}</h2>
        <p className="text-5xl font-bold bg-white/20 px-14 py-6 rounded-full inline-block border-4 border-white/50">{data.trait}</p>
      </div>

      <div className="w-full max-w-6xl bg-white/10 p-12 rounded-[100px] border-8 border-white/20 backdrop-blur-xl">
        <AnimalMusicPlayer animalName={data.name} audioFile={`/audio/${animalId}.mp3`} animalColor="bg-black/40" />
      </div>

      <div className="bg-white p-16 rounded-[100px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-20 w-full max-w-7xl border-8 border-amber-200">
        <div className="flex-grow text-center md:text-left text-amber-900">
          <p className="text-5xl font-bold opacity-40 mb-6 italic">動作提示：{data.action}</p>
          <p className="text-[110px] font-black tracking-widest leading-none drop-shadow-md">{data.note}</p>
        </div>
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }} 
          className="text-[250px] drop-shadow-2xl"
        >
          {data.icon}
        </motion.div>
      </div>
    </motion.div>
  );
}