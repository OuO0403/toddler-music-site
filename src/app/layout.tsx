// src/app/layout.tsx
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="w-screen h-screen m-0 p-0 overflow-hidden">
        {/* 直接渲染 children，不要再套任何白色卡片框 */}
        <main className="w-full h-full">
          {children}
        </main>
      </body>
    </html>
  );
}