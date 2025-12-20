import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="antialiased m-0 p-0 min-h-screen w-full">
        {children}
      </body>
    </html>
  );
}