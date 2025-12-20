'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimalMusicPlayer from '@/components/AnimalMusicPlayer';

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

  if (!data) return null;

  return (
    <motion.div 
      layoutId={`circle-bg-${animalId}`}
      initial={{ borderRadius: '100%' }}
      animate={{ borderRadius: '0px' }}
      exit={{ borderRadius: '100%' }} 
      transition={{ duration: 0.5 }}
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center p-6 z-[200] overflow-hidden"
      style={{ backgroundColor: data.color }}
    >
      {/* 返回鍵：絕對定位於螢幕左上角，不受容器影響 */}
      <Link 
        href="/" 
        className="fixed top-8 left-8 text-[60px] drop-shadow-2xl z-[250] hover:scale-110 active:scale-90 transition-transform"
      >
        🏠
      </Link>

      {/* 緊湊內容容器：將原本分散的內容拉近 */}
      <div className="w-full max-w-4xl flex flex-col items-center gap-6">
        
        {/* 標題與特點 */}
        <div className="text-center text-white">
          <h2 className="text-6xl md:text-8xl font-black drop-shadow-lg italic mb-2">{data.name}</h2>
          <p className="text-xl md:text-3xl font-bold bg-white/20 px-8 py-2 rounded-full inline-block border-2 border-white/50">
            {data.trait}
          </p>
        </div>

        {/* 播放器容器：大幅減少內邊距 */}
        <div className="w-full bg-white/10 p-4 rounded-[40px] border-2 border-white/20 backdrop-blur-md">
          <AnimalMusicPlayer animalName={data.name} audioFile={`/audio/${animalId}.mp3`} animalColor="bg-black/20" />
        </div>

        {/* 動作提示：一頁了然的核心區塊 */}
        <div className="bg-white/95 p-8 rounded-[50px] shadow-2xl flex flex-col md:flex-row items-center justify-between w-full border-4 border-white">
          <div className="text-center md:text-left text-amber-900">
            <p className="text-2xl font-bold opacity-50 italic mb-2">動作：{data.action}</p>
            {/* 修正：字體大小 36px 且粗體 */}
            <p className="text-[36px] font-bold tracking-widest leading-tight">{data.note}</p>
          </div>
          
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }} 
            className="text-[140px] md:text-[200px] drop-shadow-xl"
          >
            {data.icon}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}