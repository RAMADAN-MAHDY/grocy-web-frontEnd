"use client";

export default function AdminTopbar() {
  return (
    <header className="h-[70px] bg-white dark:bg-gray-900 flex items-center px-8 border-b border-gray-200 dark:border-gray-700">
      <h3 className="font-bold text-lg  md:text-xl text-gray-800 dark:text-white flex items-center gap-3 mr-10 md:mr-0">
        مرحباً بك في لوحة التحكم
        <span className="inline-block text-xl md:text-2xl animate-wave origin-[70%_70%]">👋</span>
      </h3>

      <style jsx>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          15% { transform: rotate(18deg); }
          30% { transform: rotate(-12deg); }
          45% { transform: rotate(18deg); }
          60% { transform: rotate(-10deg); }
          75% { transform: rotate(12deg); }
          100% { transform: rotate(0deg); }
        }

        .animate-wave {
          animation: wave 2s infinite ease-in-out;
        }
      `}</style>
    </header>
  );
}
