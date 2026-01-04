
import CategoryGrid from './components/categoriesgrid';


// 2. يجب أن يكون هناك export default للدالة الأساسية
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* محتوى الصفحة (الجريد) */}
      <div>
        <CategoryGrid />
      </div>
    </main>
  );
}