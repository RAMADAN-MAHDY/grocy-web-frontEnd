"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { PackageSearch, Tags, Star, Activity, LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    offers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const [p, c, o] = await Promise.all([
        axios.get("https://iraqi-e-store-api.vercel.app/api/products/count"),
        axios.get("https://iraqi-e-store-api.vercel.app/api/categories"),
        axios.get("https://iraqi-e-store-api.vercel.app/api/products/offers/count"),
      ]);

      setStats({
        products: p.data.count || 0,
        categories: c.data.length || 0,
        offers: o.data.count || 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Activity className="w-12 h-12 animate-spin text-red-500" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-300 dark:border-gray-700 pb-4">
        <LayoutDashboard className="w-10 h-10 text-red-500" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          لوحة تحكم المتجر
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="عدد المنتجات"
          value={stats.products}
          icon={<PackageSearch className="w-8 h-8 text-white" />}
          color="bg-red-500"
        />
        <StatCard
          title="عدد الأقسام"
          value={stats.categories}
          icon={<Tags className="w-8 h-8 text-white" />}
          color="bg-green-500"
        />
        <StatCard
          title="العروض الحالية"
          value={stats.offers}
          icon={<Star className="w-8 h-8 text-white" />}
          color="bg-yellow-500"
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div
      className={`${color} p-6 rounded-3xl shadow-lg flex flex-col justify-between hover:scale-105 transition-transform duration-300 cursor-pointer`}
    >
      <div className="flex items-center justify-between mb-4">
        {/* Title with bottom line */}
        <div className="flex items-center gap-2">
          <div className="w-1 h-8 bg-white rounded-full"></div>
          <p className="text-white font-semibold text-lg border-b border-white/50 pb-1">{title}</p>
        </div>
        <div className="rounded-full p-2 bg-white/30">{icon}</div>
      </div>
      <h2 className="text-4xl md:text-5xl text-white font-normal">{value}</h2>
    </div>
  );
}
