'use client';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimalMusicPlayer from '@/components/AnimalMusicPlayer';

const animalData: any = {
  elephant: { name: '大象', icon: '🐘', color: '#8E949E', note: '咚、咚、咚、咚', action: '用腳大力踏地 [cite: 3]', trait: '強調第一、三拍重音 [cite: 2]' },
  rabbit: { name: '小兔子', icon: '🐰', color: '#FFB7C5', note: '蹦蹦、蹦蹦、跳、跳', action: '雙手拍大腿 [cite: 9]', trait: '感受八分音符的輕快感 [cite: 8]' },
  snake: { name: '小蛇', icon: '🐍', color: '#88D498', note: '嘶 —— 、嘶 ——', action: '雙手掌心互搓 [cite: 15]', trait: '練習長音與空間感 [cite: 14]' },
  woodpecker: { name: '啄木鳥', icon: '🐦', color: '#FF6B6B', note: '噠噠噠、噠', action: '手指輕敲另一手心 [cite: 21]', trait: '訓練指尖靈活度 [cite: 20]' },
  gorilla: { name: '大猩猩', icon: '🦍', color: '#6D4C41', note: '嗚、哈、嗚嗚、哈', action: '雙手交替拍打胸口 [cite: 27]', trait: '訓練身體中軸線認知 [cite: 26]' },
  lion: { name: '獅子', icon: '🦁', color: '#F9A825', note: '吼！吼！吼！', action: '雙手向前抓＋吼叫 [cite: 33]', trait: '練習爆發力與強音 [cite: 31, 32]' },
};

export default function AnimalPage() {
  const params = useParams();
  const router = useRouter();
  const animalId = params.animal as string;
  const data = animalData[animalId];

  if (!data) return null;

  return (
    <motion.div 
      layoutId={`bg-${animalId}`} // 關鍵：與首頁 layoutId 相同
      initial={{ borderRadius: '9999px' }} // 初始為圓形
      animate={{ borderRadius: '0px' }} // 放大後變矩形填滿
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-around p-8 z-50 overflow-y-auto"
      style={{ backgroundColor: data.color }}
    >
      <Link href="/" className="absolute top-10 left-10 text-6xl drop-shadow-lg hover:scale-110 transition-transform">🏠</Link>

      <div className="text-center text-white space-y-4">
        <h2 className="text-7xl font-black drop-shadow-xl">{data.name}</h2>
        <div className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-full text-2xl font-bold border-2 border-white/50 inline-block">
          {data.trait}
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white/10 p-6 rounded-[50px] border-4 border-white/20">
        <AnimalMusicPlayer animalName={data.name} audioFile={`/audio/${animalId}.mp3`} animalColor="bg-black/20" />
      </div>

      <div className="bg-white/95 p-10 rounded-[60px] shadow-2xl flex flex-col md:flex-row items-center gap-12 w-full max-w-4xl">
        <div className="flex-grow text-center md:text-left">
          <p className="text-3xl font-bold text-amber-800 opacity-60 mb-2">動作：{data.action}</p>
          <p className="text-7xl font-black text-amber-900 tracking-wider">{data.note}</p>
        </div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }} 
          className="text-[140px]"
        >
          {data.icon}
        </motion.div>
      </div>
    </motion.div>
  );
}