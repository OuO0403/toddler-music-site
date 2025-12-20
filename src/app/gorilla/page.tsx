'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimalMusicPlayer from '@/components/AnimalMusicPlayer';

export default function GorillaPage() {
  return (
    <motion.div 
      layoutId="circle-gorilla"
      className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-around p-10 overflow-hidden"
      style={{ backgroundColor: '#6D4C41' }} 
    >
      <Link href="/" className="absolute top-10 left-10 text-6xl hover:scale-125 transition-all">🏠</Link>

      <div className="text-center text-white space-y-4">
        <h2 className="text-8xl font-black tracking-widest">大猩猩嗚哈</h2>
        <p className="text-4xl font-bold bg-black/10 px-10 py-4 rounded-full inline-block">胸膛的共鳴</p>
      </div>

      <div className="w-full max-w-4xl">
        <AnimalMusicPlayer animalName="大猩猩" audioFile="/audio/gorilla.mp3" animalColor="bg-orange-900" />
      </div>

      <div className="flex items-center gap-12 bg-white/20 p-10 rounded-[60px] border-4 border-white/50 backdrop-blur-lg">
        <div className="text-center space-y-4 text-white">
          <p className="text-4xl font-bold opacity-80">動作提示：交替拍打胸口</p>
          <p className="text-7xl font-black">嗚、哈、嗚嗚、哈</p>
        </div>
        <div className="flex gap-4">
          <motion.div animate={{ x: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 0.5 }} className="text-[120px]">🦍</motion.div>
        </div>
      </div>
    </motion.div>
  );
}