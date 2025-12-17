// src/app/lion/page.tsx
import AnimalMusicPlayer from '@/components/AnimalMusicPlayer'; // 使用 @/ 導入別名

const LionPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-black mb-6 text-amber-800">🦁 獅子王音樂律動教室</h1>
      <p className="mb-8 text-lg">
        獅子的音樂節奏是**慢而穩重**的。它訓練孩子們的大肌肉和平衡感，讓他們學習控制自己的力量。
      </p>

      {/* 嵌入核心播放器組件 */}
      <AnimalMusicPlayer
        animalName="獅子"
        audioFile="/audio/lion.mp3" // 請確保此路徑正確
        animalColor="bg-amber-600"
      />

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🎵 律動指導語：</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>**動作模仿：** 讓我們像獅子一樣，慢慢地抬起腳，用力地踩下去。一步、兩步，穩穩地走！</li>
          <li>**聲音表達：** 聽到低音鼓時，試著發出一個「吼~~~」的聲音，感受聲音的振動。</li>
        </ul>
      </div>
      
    </div>
  );
};

export default LionPage;