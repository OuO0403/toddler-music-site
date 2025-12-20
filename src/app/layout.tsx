import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      {/* 這裡絕對不要加任何帶有 padding 或 max-width 的 div */}
      <body className="antialiased m-0 p-0">
        {children}
      </body>
    </html>
  );
}