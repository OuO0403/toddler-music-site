// src/app/layout.tsx (只需修改 body 內的結構)
import AnimalSidebar from '@/components/AnimalSidebar'; // 記得匯入 AnimalSidebar

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hant">
      <body>
        <div className="flex min-h-screen">
          
          {/* A. 側邊欄 - 固定在左側 */}
          <AnimalSidebar />
          
          {/* B. 主內容區 - 確保內容區避開側邊欄的寬度 */}
          <main className="flex-grow ml-64 p-8"> 
            {children}
          </main>
          
        </div>
      </body>
    </html>
  );
}