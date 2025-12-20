'use client';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimalMusicPlayer from '@/components/AnimalMusicPlayer';

const animalData: any = {
  [cite_start]elephant: { name: '大象', icon: '🐘', color: '#8E949E', note: '咚、咚、咚、咚', action: '用腳大力踏地', trait: '強調第一、三拍重音 [cite: 1, 2, 3, 5]' },
  [cite_start]rabbit: { name: '小兔子', icon: '🐰', color: '#FFB7C5', note: '蹦蹦、蹦蹦、跳、跳', action: '雙手拍大腿', trait: '感受八分音符的輕快感 [cite: 7, 8, 9, 11]' },
  [cite_start]snake: { name: '小蛇', icon: '🐍', color: '#88D498', note: '嘶 —— 、嘶 ——', action: '雙手掌心互搓', trait: '練習長音與空間感 [cite: 13, 14, 15, 17]' },
  [cite_start]woodpecker: { name: '啄木鳥', icon: '🐦', color: '#FF6B6B', note: '噠噠噠、噠', action: '指尖輕敲另一手心', trait: '訓練指尖靈活與反應 [cite: 19, 20, 21, 23]' },
  [cite_start]gorilla: { name: '大猩猩', icon: '🦍', color: '#6D4C41', note: '嗚、哈、嗚嗚、哈', action: '交替拍打胸口', trait: '訓練身體中軸線認知 [cite: 25, 26, 27, 29]' },
  [cite_start]lion: { name: '獅子', icon: '🦁', color: '#F9A825', note: '吼！吼！吼！', action: '雙手向前抓＋吼叫', trait: '練習靜止與爆發的對比 [cite: 31, 32, 33, 35]' },
};

export default function AnimalPage() {
  const params = useParams();
  const router = useRouter();
  const animalId = params.animal as string;
  const data = animalData[animalId];

  if (!data) return <div>找不到動物</div>;

  return (
    <motion.div 
      layoutId={`circle-${animalId}`} // 承接首頁圓圈的 ID，達成放大過場
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-around p-8 z-50 overflow-y-auto"
      style={{ backgroundColor: data.color }}
    >
      <Link href="/" className="absolute top-10 left-10 text-6xl drop-shadow-lg">🏠</Link>

      <div className="text-center text-white space-y-4">
        <h2 className="text-7xl font-black drop-shadow-xl tracking-tighter">{data.name}</h2>
        <div className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-full text-2xl font-bold border-2 border-white/50 inline-block">
          {data.trait}
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white/10 p-6 rounded-[50px] backdrop-blur-sm shadow-inner">
        <AnimalMusicPlayer animalName={data.name} audioFile={`/audio/${animalId}.mp3`} animalColor="bg-black/20" />
      </div>

      <div className="bg-white/90 p-8 rounded-[60px] shadow-2xl flex flex-col md:flex-row items-center gap-8 w-full max-w-3xl">
        <div className="flex-grow text-center md:text-left">
          <p className="text-2xl font-bold text-amber-800 opacity-60">動作口訣：{data.action}</p>
          <p className="text-6xl font-black text-amber-900 tracking-wider mt-2">{data.note}</p>
        </div>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-[120px]">
          {data.icon}
        </motion.div>
      </div>
    </motion.div>
  );
}