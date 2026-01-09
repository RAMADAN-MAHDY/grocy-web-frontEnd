"use client";

import { useState } from "react";
import api from "@/app/api"; // Axios instance (with interceptors)
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/(shop)/store/useAuthStore";
import Link from "next/link";
import { toast } from "react-toastify";
import GoogleSignInButton from "../components/GoogleSignInButton";

/**
 * ================================
 * Cookie Support Detection
 * ================================
 * Used to decide:
 * - Cookies enabled  → backend stores tokens in httpOnly cookies
 * - Cookies disabled → backend returns tokens in response body
 */
function areCookiesEnabled() {
  try {
    document.cookie = "testcookie=true; SameSite=Lax";
    const enabled = document.cookie.includes("testcookie");
    document.cookie =
      "testcookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    return enabled;
  } catch {
    return false;
  }
}

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const checkAuth = useAuthStore((state) => state.checkAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      /**
       * =========================================================
       * AUTH STRATEGY (IMPORTANT FOR BACKEND)
       * =========================================================
       * - If cookies are ENABLED:
       *    → send client: "web"
       *    → backend MUST store access & refresh tokens
       *      in httpOnly cookies (NO tokens in response body)
       *
       * - If cookies are DISABLED (mobile / Safari / in-app):
       *    → DO NOT send client: "web"
       *    → backend MUST return tokens in response body
       *      { tokens: { accessToken, refreshToken } }
       */
      const cookiesEnabled = areCookiesEnabled();

      const payload = {
        email: form.email,
        password: form.password,
        ...(cookiesEnabled ? { client: "web" } : {}),
      };

      const response = await api.post("/auth/login", payload);

      /**
       * =========================================================
       * TOKEN HANDLING
       * =========================================================
       * - Cookies enabled  → tokens are already stored as httpOnly cookies
       * - Cookies disabled → store tokens in localStorage manually
       */
      if (!cookiesEnabled && response.data?.tokens) {
        localStorage.setItem(
          "accessToken",
          response.data.tokens.accessToken
        );
        localStorage.setItem(
          "refreshToken",
          response.data.tokens.refreshToken
        );
      }

      // Sync user data in global auth store
      await checkAuth();

      toast.success("تم تسجيل الدخول بنجاح");
      router.push("/");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "البريد الإلكتروني أو كلمة المرور غير صحيحة";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gray-50"
      dir="rtl"
    >
      <div className="bg-white w-full max-w-lg p-10 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          تسجيل الدخول
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full rounded-2xl px-5 py-4 text-gray-700 bg-gray-100 shadow-inner outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full rounded-2xl px-5 py-4 text-gray-700 bg-gray-100 shadow-inner outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button
            disabled={loading}
            className={`w-full mt-6 text-white font-bold py-4 rounded-2xl shadow-lg transition-all ${
              loading
                ? "bg-gray-400"
                : "bg-green-600 hover:bg-green-700 active:scale-95"
            }`}
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
        </form>

        <GoogleSignInButton />

        <p className="text-sm text-center mt-6 text-gray-500">
          معندكش حساب؟{" "}
          <Link
            href="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  );
}
