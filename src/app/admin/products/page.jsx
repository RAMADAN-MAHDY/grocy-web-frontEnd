"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// استيراد الأيقونة المطلوبة
import { PackageSearch, Edit } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    discountedPrice: "",
    discountActive: false,
    category: "",
    weights: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://iraqi-e-store-api.vercel.app/api/categories");
      setCategories(res.data.categories || res.data);
    } catch (err) {
      toast.error("فشل جلب الفئات");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://iraqi-e-store-api.vercel.app/api/products");
      setProducts(res.data.products || res.data);
    } catch (err) {
      toast.error("فشل جلب المنتجات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const submitProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category || (!editProductId && !imageFile)) {
      toast.warn("الاسم، السعر، الفئة، والصورة مطلوبة");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("discountedPrice", form.discountedPrice || "");
    formData.append("discountActive", form.discountActive.toString());
    formData.append("category", form.category);
    formData.append("weights", form.weights || "");
    if (imageFile) formData.append("image", imageFile);
    console.log("Submitting product:", formData);

    try {
      if (editProductId) {
        const res = await axios.put(
          `https://iraqi-e-store-api.vercel.app/api/products/${editProductId}`,
          formData,
          { withCredentials: true }
        );
        const updatedProduct = res.data.product || res.data;
        setProducts(prev => prev.map(p => p._id === editProductId ? updatedProduct : p));
        toast.success("تم تعديل المنتج بنجاح 🚀");
      } else {
        const res = await axios.post(
          "https://iraqi-e-store-api.vercel.app/api/products",
          formData,
          { withCredentials: true }
        );
        const newProduct = res.data.product || res.data;
        setProducts(prev => [newProduct, ...prev]); 
        toast.success("تم إضافة المنتج بنجاح 🎉");
      }

      setForm({ name: "", price: "", discountedPrice: "", discountActive: false, category: "", weights: "" });
      setImageFile(null);
      setEditProductId(null);
      
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ أثناء العملية");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("هل أنت متأكد من حذف المنتج؟")) return;
    try {
      await axios.delete(`https://iraqi-e-store-api.vercel.app/api/products/${id}`, { withCredentials: true });
      setProducts(prev => prev.filter((p) => p._id !== id));
      toast.info("تم حذف المنتج 🗑️");
    } catch (err) {
      toast.error("فشل حذف المنتج");
    }
  };

  const editProduct = (product) => {
    setEditProductId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      discountedPrice: product.discountedPrice || "",
      discountActive: product.discountActive || false,
      category: product.category?._id || "",
      weights: product.weights || "",
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 space-y-8">
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />

      {/* العنوان مع الأيقونة */}
 <div className="flex items-center gap-3 pb-4 border-b border-gray-500 dark:border-gray-700 mb-8">
  {editProductId ? (
    <Edit className="text-blue-600 w-8 h-8" />
  ) : (
    <PackageSearch className="text-blue-600 w-8 h-8" />
  )}
  <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
    {editProductId ? "تعديل المنتج" : "إضافة منتج جديد"}
  </h2>
</div>

      <form
        onSubmit={submitProduct}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <input
          className="p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="اسم المنتج"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          type="number"
          placeholder="السعر"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          className="p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          type="number"
          placeholder="السعر بعد الخصم (اختياري)"
          value={form.discountedPrice}
          onChange={(e) => setForm({ ...form, discountedPrice: e.target.value })}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="discountActive"
            checked={form.discountActive}
            onChange={(e) => setForm({ ...form, discountActive: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="discountActive" className="text-gray-700 dark:text-gray-300">تفعيل الخصم</label>
        </div>
        <select
          className="p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">اختر الفئة</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <input
          className="p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="الأوزان (مثال: 100g,200g)"
          value={form.weights}
          onChange={(e) => setForm({ ...form, weights: e.target.value })}
        />
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2 col-span-full">
          صورة المنتج
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required={!editProductId}
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="col-span-full px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-transform transform hover:scale-105 disabled:opacity-50"
        >
          {submitting ? "جاري المعالجة..." : editProductId ? "تعديل المنتج" : "إضافة المنتج"}
        </button>
      </form>

      {/* --- Products Table --- */}
      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400 font-bold py-10">جاري تحميل المنتجات...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-900 shadow-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                {["الصورة", "الاسم", "السعر", "الخصم", "الوزن", "إجراءات"].map((h) => (
                  <th key={h} className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                  <td className="py-3 px-4">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{p.name}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100 font-bold">{p.price}</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-300">
                    {p.discountActive ? p.discountedPrice || "-" : "-"}
                  </td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-300">{p.weights || "-"}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition" onClick={() => editProduct(p)}>تعديل</button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition" onClick={() => deleteProduct(p._id)}>حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}