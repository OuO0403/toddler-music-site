import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="m-0 p-0 antialiased min-h-screen w-full overflow-x-hidden">
        {/* 直接渲染，不加任何包裝容器 */}
        {children}
      </body>
    </html>
  );
}