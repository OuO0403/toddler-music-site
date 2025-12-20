'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimalMusicPlayer from '@/components/AnimalMusicPlayer';

export default function ElephantPage() {
  return (
    <motion.div 
      layoutId="circle-elephant"
      className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-around p-10 overflow-hidden"
      style={{ backgroundColor: '#8E949E' }} 
    >
      <Link href="/" className="absolute top-10 left-10 text-6xl hover:scale-125 transition-all">🏠</Link>

      <div className="text-center text-white space-y-4">
        <h2 className="text-8xl font-black tracking-widest">大象咚咚咚</h2>
        <p className="text-4xl font-bold bg-black/10 px-10 py-4 rounded-full inline-block">沉穩的大地之聲</p>
      </div>

      <div className="w-full max-w-4xl">
        <AnimalMusicPlayer animalName="大象" audioFile="/audio/elephant.mp3" animalColor="bg-slate-700" />
      </div>

      <div className="flex items-center gap-12 bg-white/20 p-10 rounded-[60px] border-4 border-white/50 backdrop-blur-lg">
        <div className="text-center space-y-4">
          <p className="text-4xl font-bold text-white opacity-80">動作提示：用腳大力踏地</p>
          <p className="text-7xl font-black text-white tracking-[1.5rem]">咚、咚、咚、咚</p>
        </div>
        <motion.div animate={{ y: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-[120px]">🐘</motion.div>
      </div>
    </motion.div>
  );
}