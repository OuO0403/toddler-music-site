'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimalMusicPlayer from '@/components/AnimalMusicPlayer';

export default function WoodpeckerPage() {
  return (
    <motion.div 
      layoutId="circle-woodpecker"
      className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-around p-10 overflow-hidden"
      style={{ backgroundColor: '#FF6B6B' }} 
    >
      <Link href="/" className="absolute top-10 left-10 text-6xl hover:scale-125 transition-all">🏠</Link>

      <div className="text-center text-white space-y-4">
        <h2 className="text-8xl font-black tracking-widest">啄木鳥噠噠噠</h2>
        <p className="text-4xl font-bold bg-black/10 px-10 py-4 rounded-full inline-block">快速切分感</p>
      </div>

      <div className="w-full max-w-4xl">
        <AnimalMusicPlayer animalName="啄木鳥" audioFile="/audio/woodpecker.mp3" animalColor="bg-red-700" />
      </div>

      <div className="flex items-center gap-12 bg-white/20 p-10 rounded-[60px] border-4 border-white/50 backdrop-blur-lg">
        <div className="text-center space-y-4 text-white">
          <p className="text-4xl font-bold opacity-80">動作提示：手指輕敲手心</p>
          <p className="text-7xl font-black">噠噠噠、噠</p>
        </div>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.3 }} className="text-[120px]">🐦</motion.div>
      </div>
    </motion.div>
  );
}