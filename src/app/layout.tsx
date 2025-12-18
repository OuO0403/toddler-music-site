import './globals.css';
import AnimalSidebar from '@/components/AnimalSidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <div className="flex flex-col min-h-screen">
          {/* 上排導覽列：我們稍微修改 Sidebar 的名稱為 Navbar */}
          <header className="w-full pt-6 px-10">
            <AnimalSidebar />
          </header>
          
          {/* 主內容區：置中並放大 */}
          <main className="flex-grow flex items-center justify-center p-6">
            <div className="w-full max-w-5xl bg-white/60 backdrop-blur-md rounded-[40px] shadow-2xl p-10 border-8 border-white">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
