"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/app/(shop)/store/useAuthStore";
import { useCartStore } from "@/app/(shop)/store/useCartStore";

export default function CartPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { cart, loading, fetchCart, removeItem, updateQty } = useCartStore();

  useEffect(() => {
    if (user?.id) fetchCart(user.id);
  }, [user]);

  if (!isAuthenticated) return <p className="p-6 text-red-600">يرجى تسجيل الدخول...</p>;
  if (loading) return <p className="p-6">جاري التحميل...</p>;

  return (
    <div className="p-6 space-y-4" dir="rtl">
      <h1 className="text-2xl font-bold">سلة المشتريات</h1>
      {!cart || cart.items?.length === 0 ? (
        <p>السلة فارغة 🛒</p>
      ) : (
        cart.items.map((item) => (
          <div key={item.product._id} className="flex justify-between border p-4 rounded-xl">
            <div>
              <p className="font-bold">{item.product.name}</p>
              <p>{item.product.price} د.ع</p>
            </div>
            <div className="flex gap-3 items-center">
              <button onClick={() => updateQty(user.id, item.product._id, item.qty - 1)} disabled={item.qty <= 1}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(user.id, item.product._id, item.qty + 1)}>+</button>
              <button onClick={() => removeItem(user.id, item.product._id)} className="text-red-500">حذف</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}