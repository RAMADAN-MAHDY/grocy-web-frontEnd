// src/app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        {/* هذا الملف هو الأساس ولا يحتوي على أي تصميم، فقط يمرر المحتوى */}
        {children}
      </body>
    </html>
  );
}