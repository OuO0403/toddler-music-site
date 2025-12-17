'use client'; // <-- 新增此行
import React, { useRef, useState, useEffect } from 'react';
import * as Tone from 'tone';

// 定義組件的輸入屬性
interface PlayerProps {
  animalName: string; // 動物名稱 (例如: 'lion')
  audioFile: string; // 音檔路徑 (例如: '/audio/lion.mp3')
  animalColor: string; // 視覺化顏色 (例如: 'bg-yellow-500')
}

// AnimalMusicPlayer 組件
const AnimalMusicPlayer: React.FC<PlayerProps> = ({ animalName, audioFile, animalColor }) => {
  
  // 設置狀態: 播放器實例、是否正在播放
  const playerRef = useRef<Tone.Player | null>(null);
  const analyserRef = useRef<Tone.Analyser | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. 初始化與載入邏輯 (組件載入時執行)
  useEffect(() => {
    // 建立 Tone.Player 實例
    playerRef.current = new Tone.Player(audioFile, () => {
      // 載入完成後執行
      console.log(`${animalName} audio loaded!`);
      setIsLoaded(true);
    }).toDestination();
    
    // 建立 Analyser (用於視覺化)
    analyserRef.current = new Tone.Analyser('fft', 32); // FFT Size 32 適用於簡單節奏分析
    playerRef.current.connect(analyserRef.current);

    // 清理函數 (組件卸載時釋放資源，防止記憶體洩漏)
    return () => {
      playerRef.current?.dispose();
      analyserRef.current?.dispose();
    };
  }, [audioFile, animalName]); // 依賴項: 檔案路徑或動物名稱改變時，重新初始化

  // 2. 播放/暫停邏輯
  const togglePlayback = async () => {
    if (!isLoaded) return;

    if (Tone.context.state !== 'running') {
      await Tone.context.resume(); // 確保 Tone.js 啟動 (處理瀏覽器限制)
    }

    if (isPlaying) {
      playerRef.current?.stop();
      setIsPlaying(false);
    } else {
      playerRef.current?.start();
      setIsPlaying(true);
      // 開始繪製視覺化
      drawVisualizer();
    }
  };

  // 3. 節奏視覺化繪製邏輯
  const drawVisualizer = () => {
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // 繪製函數
    const draw = () => {
      // 獲取頻率數據 (用於分析低頻節奏，如獅子的重拍)
      const buffer = analyserRef.current!.getValue();
      // 我們只關注前幾個頻率桶 (通常是低音)
      const bassValue = buffer.slice(0, 4).reduce((a, b) => a + b, 0) / 4;
      
      // 將數據映射到視覺大小 (例如: 圓形大小或節奏條高度)
      // bassValue 的範圍約在 -100 到 0 之間 (分貝)
      const normalizedValue = 1 - (bassValue / -100); // 映射到 0 到 1
      const sizeScale = 1 + normalizedValue * 0.5; // 圓形大小縮放 100% 到 150%

      context.clearRect(0, 0, canvas.width, canvas.height);

      // 繪製一個隨著低音跳動的圓形 (模擬幼兒的肢體律動)
      context.beginPath();
      context.arc(
        canvas.width / 2, 
        canvas.height / 2, 
        canvas.width / 4 * sizeScale, // 圓形大小隨音樂變化
        0, 
        2 * Math.PI
      );
      context.fillStyle = 'rgba(255, 255, 255, 0.5)'; // 白色半透明
      context.fill();

      // 如果還在播放，則持續繪製
      if (isPlaying) {
        requestAnimationFrame(draw);
      }
    };

    draw();
  };

  // 4. 渲染介面 (使用 Tailwind CSS 模擬樣式)
  return (
    <div className={`p-4 rounded-lg shadow-lg ${animalColor} text-white transition-all`}>
      <h2 className="text-3xl font-bold mb-4">{animalName} 探險音樂</h2>
      
      <button
        onClick={togglePlayback}
        disabled={!isLoaded}
        className={`w-full p-4 mb-4 text-2xl font-extrabold rounded-full transition-transform transform 
                    ${isLoaded ? 'hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'} 
                    ${isPlaying ? 'bg-red-500' : 'bg-green-500'}`}
      >
        {isLoaded ? (isPlaying ? '暫停 ⏸' : '播放 ▶') : '載入中...'}
      </button>

      {/* 視覺化 Canvas 區塊 */}
      <div className="flex justify-center items-center h-40 bg-gray-700 rounded-md">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={400} 
          className="w-full h-full"
        />
        <p className="absolute text-xl pointer-events-none">
           {/* 提示文字，隨動物變化 */}
          {isPlaying ? '跟著節奏跳動！' : `點擊播放 ${animalName} 音樂`}
        </p>
      </div>
      
      {/* 補充說明 */}
      <p className="mt-4 text-sm opacity-80">
        音樂節奏快慢：{animalName === 'lion' ? '慢而穩重' : '輕快跳躍'}
      </p>
    </div>
  );
};

export default AnimalMusicPlayer;