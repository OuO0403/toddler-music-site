'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimalMusicPlayer from '@/components/AnimalMusicPlayer';

export default function LionPage() {
  return (
    <motion.div 
      layoutId="circle-lion"
      className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-around p-10 overflow-hidden"
      style={{ backgroundColor: '#F9A825' }} 
    >
      <Link href="/" className="absolute top-10 left-10 text-6xl hover:scale-125 transition-all">🏠</Link>

      <div className="text-center text-white space-y-4">
        <h2 className="text-8xl font-black tracking-widest">獅子王大吼</h2>
        <p className="text-4xl font-bold bg-black/10 px-10 py-4 rounded-full inline-block">爆發力的強音</p>
      </div>

      <div className="w-full max-w-4xl">
        <AnimalMusicPlayer animalName="獅子" audioFile="/audio/lion.mp3" animalColor="bg-amber-700" />
      </div>

      <div className="flex items-center gap-12 bg-white/20 p-10 rounded-[60px] border-4 border-white/50 backdrop-blur-lg">
        <div className="text-center space-y-4 text-white">
          <p className="text-4xl font-bold opacity-80">動作提示：用力向前抓吼叫</p>
          <p className="text-7xl font-black">吼！吼！吼！</p>
        </div>
        <motion.div whileTap={{ scale: 2 }} animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-[120px]">🦁</motion.div>
      </div>
    </motion.div>
  );
}