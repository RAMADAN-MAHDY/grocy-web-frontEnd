import React from 'react';
import { Facebook, MessageCircle, Instagram, Video } from 'lucide-react'; // استيراد الأيقونات المطلوبة

const Footer = () => {
  return (
    <footer className="bg-[#f2f2f2] border-t border-gray-200 pt-10 pb-6 mt-10" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* الجزء العلوي: مقسم لأعمدة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 text-center md:text-right">
          
          {/* العمود الأول: تواصل معنا */}
          <div>
            <h3 className="text-lg font-bold text-[#8a8a8a] mb-4">تواصل معنا</h3>
            <div className="flex flex-col gap-3 items-center md:items-start">
              <a href="tel:+20123456789" className="flex items-center gap-2 text-[#8a8a8a] hover:text-red-600 transition">
                <Phone size={18} />
                <span dir="ltr">+20 123 456 789</span>
              </a>
              <a href="mailto:info@store.com" className="flex items-center gap-2 text-[#8a8a8a] hover:text-red-600 transition">
                <Mail size={18} />
                <span>info@store.com</span>
              </a>
            </div>
          </div>

          {/* العمود الثاني: السوشيال ميديا */}
          <div>
            <h3 className="text-lg font-bold text-[#8a8a8a] mb-4">تابعنا على</h3>
            <div className="flex justify-center md:justify-start gap-5">
              {/* فيسبوك */}
              <a href="#" className="bg-white p-2 rounded-full shadow-sm text-[#8a8a8a] hover:text-[#1877F2] transition">
                <Facebook size={22} />
              </a>
              {/* واتساب */}
              <a href="#" className="bg-white p-2 rounded-full shadow-sm text-[#8a8a8a] hover:text-[#25D366] transition">
                <MessageCircle size={22} />
              </a>
              {/* تيك توك */}
              <a href="#" className="bg-white p-2 rounded-full shadow-sm text-[#8a8a8a] hover:text-black transition">
                <Video size={22} /> 
              </a>
              {/* انستجرام */}
              <a href="#" className="bg-white p-2 rounded-full shadow-sm text-[#8a8a8a] hover:text-[#E4405F] transition">
                <Instagram size={22} />
              </a>
            </div>
          </div>

          {/* العمود الثالث: عن المتجر */}
          <div>
            <h3 className="text-lg font-bold text-[#8a8a8a] mb-4">عن المتجر</h3>
            <p className="text-[#8a8a8a] text-sm leading-relaxed">
              نوفر لك أجود أنواع البقوليات والمعلبات والمنتجات الغذائية بأفضل الأسعار وتوصيل سريع لباب بيتك.
            </p>
          </div>
        </div>

        {/* الخط الفاصل السفلي */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* الجزء السفلي: حقوق النشر */}
        <div className="text-center text-[#8a8a8a] text-sm font-medium">
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لمتجرنا</p>
        </div>
        
      </div>
    </footer>
  );
};

// ملاحظة: تأكدي من استيراد الأيقونات المتبقية في الأعلى إذا لم تكن موجودة
import { Phone, Mail } from 'lucide-react';

export default Footer;