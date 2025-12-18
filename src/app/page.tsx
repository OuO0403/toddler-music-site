export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-5xl font-black text-amber-600 mb-6">
        歡迎來到音樂動物園！🦁🐦🐢
      </h1>
      <p className="text-xl text-gray-600 max-w-md">
        請點擊左側導覽列的動物按鈕，開始探索有趣的律動音樂吧！
      </p>
      <div className="mt-10 p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
        <p className="text-amber-800 font-bold">💡 提示：記得打開電腦音量喔！</p>
      </div>
    </div>
  );
}