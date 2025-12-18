'use client'; 

import React, { useRef, useState, useEffect } from 'react';
import * as Tone from 'tone';

interface PlayerProps {
  animalName: string;
  audioFile: string;
  animalColor: string;
}

// 直接在這裡使用 export default
export default function AnimalMusicPlayer({ animalName, audioFile, animalColor }: PlayerProps) {
  const playerRef = useRef<Tone.Player | null>(null);
  const analyserRef = useRef<Tone.Analyser | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    playerRef.current = new Tone.Player(audioFile, () => {
      setIsLoaded(true);
    }).toDestination();
    
    analyserRef.current = new Tone.Analyser('fft', 32);
    playerRef.current.connect(analyserRef.current);

    return () => {
      playerRef.current?.dispose();
      analyserRef.current?.dispose();
    };
  }, [audioFile, animalName]);

  const togglePlayback = async () => {
    if (!isLoaded) return;
    if (Tone.context.state !== 'running') await Tone.context.resume();

    if (isPlaying) {
      playerRef.current?.stop();
      setIsPlaying(false);
    } else {
      playerRef.current?.start();
      setIsPlaying(true);
      drawVisualizer();
    }
  };

  const drawVisualizer = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const draw = () => {
      const buffer = analyserRef.current!.getValue();
      let sum = 0;
      const numBins = 4; // 我們取前 4 個頻率桶
      for (let i = 0; i < numBins; i++) {
        sum += buffer[i] as number; 
      }
      const bassValue = sum / numBins;
      const normalizedValue = 1 - (bassValue / -100); 
      const sizeScale = 1 + normalizedValue * 0.5;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, (canvas.width / 4) * sizeScale, 0, 2 * Math.PI);
      context.fillStyle = 'rgba(255, 255, 255, 0.5)';
      context.fill();

      if (isPlaying) requestAnimationFrame(draw);
    };
    draw();
  };

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

      <div className="flex justify-center items-center h-40 bg-gray-700 rounded-md relative">
        <canvas ref={canvasRef} width={400} height={400} className="w-full h-full" />
        <p className="absolute text-xl pointer-events-none">
          {isPlaying ? '跟著節奏跳動！' : `點擊播放 ${animalName} 音樂`}
        </p>
      </div>
      <p className="mt-4 text-sm opacity-80">
        音樂節奏快慢：{animalName === '獅子' ? '慢而穩重' : '輕快跳躍'}
      </p>
    </div>
  );
}
// 注意：檔案末尾不要再有任何 export 語句