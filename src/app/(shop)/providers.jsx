"use client"; // مهم جدًا

import { useEffect } from "react"; // 1. أضفنا useEffect
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthInterceptor } from "@/app/(shop)/store/useAuthInterceptor";
import { useAuthStore } from "@/app/(shop)/store/useAuthStore"; // 2. استيراد الـ AuthStore

const queryClient = new QueryClient();

export default function Providers({ children }) {
  useAuthInterceptor();
  
  // 3. استدعاء دالة الفحص
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    checkAuth(); // فحص اليوزر أول ما البروفايدر يشتغل
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* 4. اختياري: إظهار لودينج بسيط لحد ما الفحص يخلص */}
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-white">
           <p className="text-lg font-bold">جاري التحقق من الجلسة...</p>
        </div>
      ) : (
        <>
          {children}
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar
            closeOnClick
            rtl
            pauseOnHover={false}
            theme="light"
          />
        </>
      )}
    </QueryClientProvider>
  );
}