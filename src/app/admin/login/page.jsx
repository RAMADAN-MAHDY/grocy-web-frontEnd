"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://iraqi-e-store-api.vercel.app/api/auth/loginadmin",
        { email, password,
            web:"client"
         },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      console.log("تم تسجيل الدخول:", response.data);
      router.push("/admin");
    } catch (err) {
      console.error("خطأ في تسجيل الدخول:", err.response?.data || err.message);
      setError(err.response?.data?.message || "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-80">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          تسجيل دخول الإدارة
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Input مودرن */}
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border-b-2 border-l-2 border-r-2 border-gray-300 rounded-tl-md rounded-tr-md focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-transform duration-200 hover:scale-105"
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border-b-2 border-l-2 border-r-2 border-gray-300 rounded-tl-md rounded-tr-md focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-transform duration-200 hover:scale-105"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 text-white p-3 rounded-md font-semibold hover:bg-red-600 disabled:opacity-70 disabled:cursor-not-allowed transition transform hover:scale-105"
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </button>

          {error && <p className="text-red-600 text-sm mt-1 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
