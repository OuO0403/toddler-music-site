import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '音樂動物園 🎵',
  description: '幼兒音樂節奏互動教學網站',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body 
        className={`${inter.className} antialiased m-0 p-0 w-full min-h-screen overflow-x-hidden`}
      >
        {/* 移除所有包裝容器（如 Container 或 main），
            確保背景草地能 100% 延伸，且圓形過場不會被截斷 
        */}
        {children}
      </body>
    </html>
  );
}