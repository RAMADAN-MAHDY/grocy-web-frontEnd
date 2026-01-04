"use client";
import { useState } from "react";
import { useLogin } from "@/app/(shop)/store/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { mutate, isPending, error } = useLogin();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        // بعد تسجيل الدخول، نوديه للرئيسية
        router.push("/");
      }
    });
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gray-50" dir="rtl">
      <div className="bg-white w-full max-w-lg p-10 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">تسجيل الدخول</h1>

        {error && (
          <p className="text-red-600 text-sm mb-6 text-center">
            {error.message || "البريد أو كلمة المرور غير صحيحة"}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            placeholder="البريد الإلكتروني"
            className="w-full rounded-2xl px-5 py-4 text-gray-700 bg-gray-100 placeholder-gray-400 shadow-inner"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full rounded-2xl px-5 py-4 text-gray-700 bg-gray-100 placeholder-gray-400 shadow-inner"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl shadow-lg">
            {isPending ? "جاري الدخول..." : "دخول"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500">
          معندكش حساب؟{" "}
          <Link href="/register" className="text-green-600 font-semibold hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  );
}
