"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/app/(shop)/axios"; // ✅ استخدام الـ api الموحد بدلاً من axios الخام
import { ShoppingCart, ArrowRight, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";

// ✅ Stores
import { useAuthStore } from "@/app/(shop)/store/useAuthStore";
import { useCartStore } from "@/app/(shop)/store/useCartStore";

const CategoryProducts = () => {
  const { id } = useParams();
  const router = useRouter();

  const { user, isAuthenticated } = useAuthStore();
  const { addToCart } = useCartStore();

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  const dummyProducts = [
    { _id: "695940756f107bff1fbcd376", name: "رز غفران 4.5 كغم * 4", price: 37000, image: "/orz.jpeg", weight: "4.5 كغم" },
    { _id: "695940b36f107bff1fbcd378", name: "شعرية البراري عراقية كي...", price: 6000, image: "/shay.jpg", weight: "500 غم" },
    { _id: "3", name: "زيت طعام كريستال 1 لتر", price: 2500, image: "/dehn.jpg", weight: "1 لتر" },
    { _id: "4", name: "سكر أبيض 1 كغم", price: 3000, image: "/sokar.jpg", weight: "1 كغم" },
    { _id: "5", name: "معكرونة إيطالية 500 غم", price: 4000, image: "/pasta.jpg", weight: "500 غم" },
    { _id: "6", name: "حليب طويل الأجل 1 لتر", price: 3500, image: "/haleb.jpg", weight: "1 لتر" },
    { _id: "7", name: "بقوليات مشكلة 1 كغم", price: 8000, image: "/bekoleat.png", weight: "1 كغم" },
    { _id: "8", name: "مشكّل حمص وعدس وفول 1 كغم", price: 7500, image: "/meshakel.jpg", weight: "1 كغم" },
  ];

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // ✅ استخدام الـ api الموحد لضمان إرسال الكوكيز
        const response = await api.get(`/api/categories/${id}`);

        const data =
          response.data.products?.length > 0
            ? response.data.products
            : dummyProducts;

        setProducts(data);
        setCategoryName(response.data.name || "المنتجات");

        const initialQuantities = {};
        data.forEach((p) => (initialQuantities[p._id] = 1));
        setQuantities(initialQuantities);
      } catch {
        setProducts(dummyProducts);
        setCategoryName("المنتجات");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCategoryData();
  }, [id]);

  const increment = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decrement = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  // ✅ إضافة للسلة + الربط الصحيح
  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      toast.info("سجّل الدخول أولاً 🧾");
      router.push("/login");
      return;
    }

    const qty = quantities[product._id] || 1;
    // ✅ التأكد من جلب المعرف الصحيح لليوزر
    const userId = user?.id || user?._id;

    try {
      // ✅ استدعاء دالة الإضافة من الـ Store
      await addToCart(userId, product._id, qty);
      // التوست (Toast) سيظهر تلقائياً من داخل الـ Store كما برمجناه
    } catch (error) {
       // الخطأ سيظهر من الـ Store أيضاً
       console.error("Cart Add Error:", error);
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 font-bold text-gray-400">
        جاري التحميل...
      </div>
    );

  return (
    <div className="bg-[#f8f8f8] min-h-screen pb-24" dir="rtl">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md sticky top-0 z-50 p-4 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-center relative">
          <button
            onClick={() => router.back()}
            className="text-red-600 absolute right-0 hover:bg-red-50 p-1 rounded-full"
          >
            <ArrowRight size={28} strokeWidth={2.5} />
          </button>
          <h1 className="text-red-600 font-extrabold text-xl md:text-2xl">
            {categoryName}
          </h1>
        </div>
      </div>

      {/* المنتجات */}
      <div className="p-4 flex flex-wrap justify-center gap-4 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-3xl p-3 shadow-sm flex flex-col items-center relative border border-gray-100 w-[calc(50%-8px)] md:w-[220px]"
          >
            <div className="absolute top-3 left-3 bg-gray-100 text-[10px] px-2 py-0.5 rounded-full">
              {product.weight}
            </div>

            <div className="w-full h-36 flex items-center justify-center mb-3">
              <img src={product.image} alt={product.name} className="max-h-full object-contain" />
            </div>

            <h3 className="font-bold text-[13px] text-center mb-1 line-clamp-2 h-8">
              {product.name}
            </h3>

            <div className="text-center mb-4 font-black">
              {product.price?.toLocaleString()} د.ع
            </div>

            <div className="flex items-center justify-between w-full bg-gray-50 p-1 rounded-full">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center"
              >
                <ShoppingCart size={15} />
              </button>

              <div className="flex items-center gap-1">
                {/* زر الناقص باللون الأحمر */}
                <button onClick={() => decrement(product._id)} className="text-red-600">
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold">
                  {quantities[product._id] || 1}
                </span>
                {/* زر الزائد باللون الأخضر */}
                <button onClick={() => increment(product._id)} className="text-green-600">
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;