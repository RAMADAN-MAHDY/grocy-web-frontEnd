import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/app/(shop)/axios";

export const useAuthStore = create(
  persist(
    (set, get) => ({ // أضفنا get هنا لاستخدام البيانات داخل الدالة
      user: null,
      isAuthenticated: false,
      loading: true,

      setUser: (user) =>
        set({
          user: { id: user._id || user.id, ...user }, // ضمان وجود id
          isAuthenticated: true,
          loading: false,
        }),

      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
        }),

      // دالة الفحص (getMe) لضمان أن البيانات المحفوظة لا تزال صالحة
      checkAuth: async () => {
        try {
          const res = await api.get("/api/auth/me");
          const userData = res.data.user || res.data;
          set({ 
            user: { id: userData._id || userData.id, ...userData }, 
            isAuthenticated: true, 
            loading: false 
          });
        } catch (err) {
          // إذا فشل الفحص، نمسح البيانات المحفوظة محلياً
          set({ user: null, isAuthenticated: false, loading: false });
        }
      },

      logout: async () => {
        try {
          await api.post("/api/auth/logout", { client: "web" });
        } catch (error) {
          console.error("Logout error", error);
        } finally {
          // نمسح كل شيء في كل الأحوال
          set({ user: null, isAuthenticated: false });
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          // تنظيف الـ persist storage يدوياً إذا لزم الأمر
          localStorage.removeItem("auth-storage");
        }
      },
    }),
    { 
      name: "auth-storage",
      // اختياري: حددي ما الذي تريدين حفظه فقط (اليوزر وحالة الدخول)
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);