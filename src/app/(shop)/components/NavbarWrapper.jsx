"use client";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import NavBottom from "./navbottom";
import Footer from "./footer";

export default function NavbarWrapper({ children }) {
  const pathname = usePathname();
  
  // التحقق لو كنا داخل مجلد admin
  const isAdminPage = pathname.startsWith("/admin");

  // لو في صفحة الإدارة، اعرض المحتوى فقط (لأن AdminLayout سيتولى الباقي)
  if (isAdminPage) {
    return <>{children}</>;
  }

  // لو في المتجر العادي، اظهر كل العناصر
  return (
    <>
      <Navbar />
      {children}
      <NavBottom />
      <Footer />
    </>
  );
}