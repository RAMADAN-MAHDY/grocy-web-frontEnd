"use client";
import React from "react";
import Link from "next/link";
import { ShoppingCart, Percent, Search } from "lucide-react";
import { useAuthStore } from "@/app/(shop)/store/useAuthStore";
import { useCartStore } from "@/app/(shop)/store/useCartStore"; // ✅ استيراد ستور السلة

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { cart } = useCartStore(); // ✅ جلب بيانات السلة

  // ✅ حساب عدد المنتجات الإجمالي في السلة
  const cartItemsCount = cart?.items?.reduce((acc, item) => acc + item.qty, 0) || 0;

  return (
    <nav className="bg-[#f2f2f2] sticky top-0 z-50 px-4 h-20 flex items-center" dir="rtl">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto gap-2 md:gap-4">

        {/* جهة اليمين */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* حالة تسجيل الدخول */}
          {isAuthenticated && (
            <div className="flex items-center gap-3">
              <button
                onClick={logout}
                className="hidden md:block bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 font-bold text-lg shadow-md transition-colors"
              >
                تسجيل خروج
              </button>

              <span className="text-gray-700 font-bold text-base md:text-lg whitespace-nowrap">
                مرحبا، {user?.username}
              </span>
            </div>
          )}

          {/* حالة عدم تسجيل الدخول */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login" className="text-[#8a8a8a] hover:text-red-600 font-bold text-lg transition">
                تسجيل دخول
              </Link>
              <Link href="/register" className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 font-bold text-lg shadow-md transition">
                إنشاء حساب
              </Link>
            </div>
          )}

          {/* العروض والسلة */}
          <div className="hidden md:flex items-center gap-4 border-r pr-4 border-gray-300">
            <Link href="/offers" className="flex flex-col items-center hover:text-red-600 transition">
              <Percent size={22} />
              <span className="text-xs font-bold">العروض</span>
            </Link>

            <Link href="/cart" className="flex flex-col items-center hover:text-red-600 relative transition">
              <ShoppingCart size={22} />
              <span className="text-xs font-bold">السلة</span>
              {/* ✅ عرض الرقم الحقيقي هنا */}
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* جهة اليسار: البحث واللوجو */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-[120px] sm:min-w-[200px] md:max-w-[350px]">
            <input
              type="text"
              placeholder="بحث ...."
              className="w-full bg-[#e8e8e8] border-none rounded-2xl py-2 pr-10 pl-4 text-sm text-gray-600 outline-none focus:ring-1 focus:ring-gray-300 transition-all shadow-inner"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2} />
          </div>

          <Link href="/" className="flex-shrink-0 w-14 h-14 md:w-20 md:h-20 overflow-hidden flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain scale-[2.2] mix-blend-multiply" />
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;