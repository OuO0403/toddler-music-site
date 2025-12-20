'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimalMusicPlayer from '@/components/AnimalMusicPlayer';

export default function RabbitPage() {
  return (
    <motion.div 
      layoutId="circle-rabbit"
      className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-around p-10 overflow-hidden"
      style={{ backgroundColor: '#FFB7C5' }} 
    >
      <Link href="/" className="absolute top-10 left-10 text-6xl hover:scale-125 transition-all">🏠</Link>

      <div className="text-center text-white space-y-4">
        <h2 className="text-8xl font-black tracking-widest">兔子蹦蹦跳</h2>
        <p className="text-4xl font-bold bg-black/10 px-10 py-4 rounded-full inline-block">輕快跳躍</p>
      </div>

      <div className="w-full max-w-4xl">
        <AnimalMusicPlayer animalName="小兔子" audioFile="/audio/rabbit.mp3" animalColor="bg-rose-400" />
      </div>

      <div className="flex items-center gap-12 bg-white/20 p-10 rounded-[60px] border-4 border-white/50 backdrop-blur-lg">
        <div className="text-center space-y-4 text-white">
          <p className="text-4xl font-bold opacity-80">動作提示：雙手拍大腿</p>
          <p className="text-7xl font-black tracking-[0.5rem]">蹦蹦、蹦蹦、跳、跳</p>
        </div>
        <motion.div animate={{ y: [0, -50, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="text-[120px]">🐰</motion.div>
      </div>
    </motion.div>
  );
}