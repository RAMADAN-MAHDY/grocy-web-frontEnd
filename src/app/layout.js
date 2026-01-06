// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(()=>{try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch{}})();",
          }}
        />
        {/* هذا الملف هو الأساس ولا يحتوي على أي تصميم، فقط يمرر المحتوى */}
        {children}
      </body>
    </html>
  );
}
