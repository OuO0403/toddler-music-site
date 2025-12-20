import './globals.css';

export const metadata = {
  title: '音樂動物園',
  description: '幼兒律動節奏學習網',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}