// src/components/AnimalSidebar.tsx
'use client'; // <-- 新增此行
import Link from 'next/link';

const animals = [
  { name: '獅子 🦁', path: '/lion', color: 'bg-amber-600' },
  { name: '小鳥 🐦', path: '/bird', color: 'bg-sky-400' },
  { name: '烏龜 🐢', path: '/turtle', color: 'bg-lime-600' },
  // 請在這裡補齊剩下的三種動物
];

const AnimalSidebar: React.FC = () => {
  return (
    <nav className="p-4 w-64 bg-gray-100 h-full fixed top-0 left-0 overflow-y-auto shadow-xl">
      <h2 className="text-2xl font-black mb-6 text-gray-800">音樂動物園</h2>
      <ul>
        {animals.map((animal) => (
          <li key={animal.path} className="mb-4">
            <Link 
              href={animal.path}
              className={`block p-3 rounded-lg text-white font-bold text-lg text-center transition-all hover:scale-105 ${animal.color}`}
            >
              {animal.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AnimalSidebar;