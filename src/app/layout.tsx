import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="relative w-screen h-screen">
        {/* 裝飾用的草原小細節：可以在這裡放些雲朵或小草的背景裝飾 */}
        <div className="absolute bottom-0 w-full h-32 bg-green-200/50 z-0"></div>
        
        <main className="relative z-10 w-full h-full flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}