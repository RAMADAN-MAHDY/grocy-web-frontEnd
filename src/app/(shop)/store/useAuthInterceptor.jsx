// src/store/useAuthInterceptor.js
"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // أضفنا usePathname
import api from "@/app/(shop)/axios";
import { useAuthStore } from "@/app/(shop)/store/useAuthStore";

export const useAuthInterceptor = () => {
  const router = useRouter();
  const pathname = usePathname();
  const clearUser = useAuthStore((s) => s.clearUser);

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // لو إحنا في صفحات الإدارة، وديه للوجن بتاع الإدارة مش الرجستر العادي
          if (pathname.startsWith("/admin")) {
             clearUser();
             router.replace("/admin/login"); 
          } else {
             // لو زبون عادي، سيبيه يروح للرجستر
             clearUser();
             router.replace("/register");
          }
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(interceptor);
  }, [router, pathname, clearUser]);
};