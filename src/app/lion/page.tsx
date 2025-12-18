'use client';
import AnimalMusicPlayer from '@/components/AnimalMusicPlayer';

export default function LionPage() {
  return (
    <div className="space-y-8 text-center">
      {/* 功能文字放上排 */}
      <div className="space-y-2">
        <h2 className="text-5xl font-black text-[#E67E22]">我是威武的獅子王！</h2>
        <p className="text-2xl text-[#8D6E63] font-bold">學我慢慢走，用力跺腳：咚！咚！咚！</p>
      </div>

      {/* 視覺重心：巨大的播放器與互動圓圈 */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl transform hover:rotate-1 transition-transform">
          <AnimalMusicPlayer
            animalName="獅子"
            audioFile="/audio/lion.mp3"
            animalColor="bg-[#FF9F1C]"
          />
        </div>
      </div>

      {/* 下方輔助圖示或小貼士 */}
      <div className="bg-[#FFF3E0] p-6 rounded-3xl border-4 border-dashed border-[#FFB74D]">
        <p className="text-xl text-[#A1887F]">💡 爸媽小秘訣：當音樂響起時，帶著孩子張開爪子學獅子吼叫吧！</p>
      </div>
    </div>
  );
}
