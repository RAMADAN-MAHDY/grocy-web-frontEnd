"use client";
import { useState } from "react";
import { useRegister } from "@/app/(shop)/store/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { mutate, isPending, error } = useRegister();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        router.push("/login");
      }
    });
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50" dir="rtl">
      <div className="bg-white w-full max-w-lg p-10 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">إنشاء حساب</h1>

        {error && (
          <p className="text-red-600 text-sm mb-6 text-center">
            {error.message || "حدث خطأ أثناء إنشاء الحساب"}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            placeholder="اسم المستخدم"
            className="w-full rounded-2xl px-5 py-4 text-gray-700 bg-gray-100 placeholder-gray-400 shadow-inner"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
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
          <button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl shadow-lg">
            {isPending ? "جاري الإنشاء..." : "إنشاء حساب"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500">
          عندك حساب؟{" "}
          <Link href="/login" className="text-red-600 font-semibold hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
