import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="m-0 p-0 antialiased bg-[#FFF9E6]">
        {/* 絕對不要在這裡加任何帶有 bg-white 或 border 的 div */}
        {children}
      </body>
    </html>
  );
}