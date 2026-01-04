"use client";
import Providers from "../(shop)/providers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Tags,
  PackageSearch,
  Share2,
  LogOut,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const navLinks = [
    { name: "الرئيسية", href: "/admin", icon: LayoutDashboard, color: "#ef4444" },
    { name: "الأقسام", href: "/admin/categories", icon: Tags, color: "#22c55e" },
    { name: "المنتجات", href: "/admin/products", icon: PackageSearch, color: "#3b82f6" },
    { name: "السوشيال", href: "/admin/social", icon: Share2, color: "#a855f7" },
  ];

  return (
    <Providers>
      <div className="admin-root">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="logo">
            <h2>لوحة الإدارة</h2>
            <span>إدارة المتجر</span>
          </div>

          <nav>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  <Icon size={20} style={{ color: link.color }} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <button className="logout">
            <LogOut size={18} />
            تسجيل خروج
          </button>
        </aside>

        {/* CONTENT */}
        <main className="content">
          <header className="topbar">
            <h3>
              مرحباً بك 
              <span className="wave-hand">👋</span>
            </h3>
          </header>

          <section className="page">{children}</section>
        </main>
      </div>

      <style jsx global>{`
        .admin-root {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
          direction: rtl;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* SIDEBAR */
        .sidebar {
          width: 280px;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          color: #1e293b;
          padding: 35px 20px 25px 20px;
          display: flex;
          flex-direction: column;
        }

        .logo h2 {
          color: #1e293b;
          font-weight: 500; /* خفيف */
          font-size: 20px;
          margin-bottom: 2px;
          margin-top: 5px; /* عشان تطلع شوية فوق */
        }

        .logo span {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 25px;
          display: block;
        }

        nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 12px;
          color: #1e293b;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          background: #f1f5f9;
          transform: translateX(-3px);
        }

        .nav-link.active {
          background: #ef4444;
          color: white;
        }

        .logout {
          margin-top: auto;
          background: #ef4444;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .logout:hover {
          background: #f87171;
          transform: scale(1.02);
        }

        /* CONTENT */
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .topbar {
          height: 70px;
          background: #ffffff;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 0 30px;
          border-bottom: 1px solid #e2e8f0;
        }

        .topbar h3 {
          font-weight: 600;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .wave-hand {
          display: inline-block;
          animation: wave 1.5s infinite;
          transform-origin: 70% 70%;
        }

        @keyframes wave {
          0% { transform: rotate(0deg); }
          15% { transform: rotate(15deg); }
          30% { transform: rotate(-10deg); }
          45% { transform: rotate(15deg); }
          60% { transform: rotate(-10deg); }
          75% { transform: rotate(15deg); }
          100% { transform: rotate(0deg); }
        }

        .page {
          padding: 30px;
        }
      `}</style>
    </Providers>
  );
}
