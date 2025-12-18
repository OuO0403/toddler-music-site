'use client';
import Link from 'next/link';

const animals = [
  { name: '獅子 🦁', path: '/lion', color: 'bg-[#FF9F1C]' },
  { name: '小鳥 🐦', path: '/bird', color: 'bg-[#4361EE]' },
  { name: '烏龜 🐢', path: '/turtle', color: 'bg-[#2EC4B6]' },
  { name: '小象 🐘', path: '/elephant', color: 'bg-[#A5A5A5]' },
  { name: '兔子 🐰', path: '/rabbit', color: 'bg-[#FF99C8]' },
  { name: '青蛙 🐸', path: '/frog', color: 'bg-[#7FB069]' },
];

export default function AnimalNavbar() {
  return (
    <nav className="flex flex-col items-center">
      <h1 className="text-3xl font-black text-[#6d4c41] mb-6 tracking-widest">
        ✨ 我的音樂動物園 ✨
      </h1>
      <div className="flex gap-4 flex-wrap justify-center">
        {animals.map((a) => (
          <Link 
            key={a.path} 
            href={a.path}
            className={`${a.color} px-6 py-3 rounded-full text-white font-bold text-xl shadow-lg hover:scale-110 transition-transform active:scale-95`}
          >
            {a.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
