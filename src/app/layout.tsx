import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="m-0 p-0 antialiased min-h-screen w-full overflow-x-hidden">
        {/* 移除所有 div 包裝，確保內容能 100% 填滿視窗 */}
        {children}
      </body>
    </html>
  );
}