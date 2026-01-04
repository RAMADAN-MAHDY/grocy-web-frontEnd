"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Form state
  const [productId, setProductId] = useState(null); // null = إضافة جديد
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const API_BASE = "https://iraqi-e-store-api.vercel.app/api";

  // جلب المنتجات
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products`, { withCredentials: true });
         console.log("Raw response from API:", res); // هنا نشوف كل حاجة
    console.log("Data array:", res.data.data);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Reset form
  const resetForm = () => {
    setProductId(null);
    setName("");
    setWeight("");
    setPrice("");
    setDiscountedPrice("");
    setImageFile(null);
  };

  // إضافة / تعديل المنتج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("weight", weight);
      formData.append("price", price);
      formData.append("discountedPrice", discountedPrice || price);
      if (imageFile) formData.append("image", imageFile);

      // ✅ هنا نضيف الكونسول قبل الإرسال
      console.log("Data being sent to backend:");
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ": " + pair[1]);
      }

      if (productId) {
        await axios.put(`${API_BASE}/products/${productId}`, formData, { withCredentials: true });
        setMessage("تم تعديل المنتج بنجاح!");
      } else {
        await axios.post(`${API_BASE}/products`, formData, { withCredentials: true });
        setMessage("تم إضافة المنتج بنجاح!");
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage("حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  // حذف المنتج
  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    try {
      await axios.delete(`${API_BASE}/products/${id}`, { withCredentials: true });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("حدث خطأ أثناء الحذف");
    }
  };

  // ملء الفورم للتعديل
  const handleEdit = (product) => {
    setProductId(product._id);
    setName(product.name);
    setWeight(product.weight || "");
    setPrice(product.price);
    setDiscountedPrice(product.discountedPrice || product.price);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{productId ? "تعديل المنتج" : "إضافة منتج جديد"}</h2>

      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-6 rounded shadow">
        <input
          type="text"
          placeholder="اسم المنتج"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="الوزن"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="الخصم"
          value={discountedPrice}
          onChange={(e) => setDiscountedPrice(e.target.value)}
          min="0"
          className="p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="p-2 border rounded col-span-1 md:col-span-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-600 text-white p-2 rounded col-span-1 md:col-span-2"
        >
          {loading ? "جارٍ الحفظ..." : productId ? "تعديل المنتج" : "إضافة المنتج"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">قائمة المنتجات</h2>
      <table className="w-full border-collapse bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border p-2">الصورة</th>
            <th className="border p-2">الاسم</th>
            <th className="border p-2">الوزن</th>
            <th className="border p-2">السعر</th>
            <th className="border p-2">الخصم</th>
            <th className="border p-2">خيارات</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((prod) => (
            <tr key={prod._id} className="text-center border-b">
              <td className="p-2">
                {prod.image ? <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover mx-auto" /> : "-"}
              </td>
              <td className="p-2">{prod.name}</td>
              <td className="p-2">{prod.weight || "-"}</td>
              <td className="p-2">{prod.price}</td>
              <td className="p-2">{prod.discountedPrice || "-"}</td>
              <td className="p-2 flex justify-center gap-2">
                <button
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(prod)}
                >
                  تعديل
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(prod._id)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center">لا يوجد منتجات</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
