import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-700">
            أدوات دُرّة
          </Link>
          <nav className="hidden md:flex gap-4 text-sm text-gray-600" aria-label="التنقل الرئيسي">
            <Link to="/دمج-pdf" className="hover:text-blue-600">دمج PDF</Link>
            <Link to="/تقسيم-pdf" className="hover:text-blue-600">تقسيم PDF</Link>
            <Link to="/pdf-الى-jpg" className="hover:text-blue-600">PDF إلى JPG</Link>
            <Link to="/ضغط-الصور" className="hover:text-blue-600">ضغط الصور</Link>
            <Link to="/تحويل-صيغ-الصور" className="hover:text-blue-600">تحويل الصور</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-100 mt-12" aria-label="تذييل الصفحة">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-800 mb-3">أدوات PDF</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/دمج-pdf" className="hover:text-blue-600">دمج PDF</Link></li>
                <li><Link to="/تقسيم-pdf" className="hover:text-blue-600">تقسيم PDF</Link></li>
                <li><Link to="/حذف-صفحات-pdf" className="hover:text-blue-600">حذف صفحات PDF</Link></li>
                <li><Link to="/تدوير-pdf" className="hover:text-blue-600">تدوير PDF</Link></li>
                <li><Link to="/تحويل-صور-الى-pdf" className="hover:text-blue-600">تحويل الصور إلى PDF</Link></li>
                <li><Link to="/pdf-الى-jpg" className="hover:text-blue-600">PDF إلى صور</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3">أدوات الصور</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/ضغط-الصور" className="hover:text-blue-600">ضغط الصور</Link></li>
                <li><Link to="/تحويل-صيغ-الصور" className="hover:text-blue-600">تحويل صيغ الصور</Link></li>
                <li><Link to="/تغيير-حجم-الصور" className="hover:text-blue-600">تغيير حجم الصور</Link></li>
                <li><Link to="/قص-الصور" className="hover:text-blue-600">قص الصور</Link></li>
                <li><Link to="/تدوير-وقلب-الصور" className="hover:text-blue-600">تدوير وقلب الصور</Link></li>
                <li><Link to="/علامة-مائية" className="hover:text-blue-600">إضافة علامة مائية</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3">أدوات إضافية</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/اطار-الصور" className="hover:text-blue-600">إضافة إطار للصور</Link></li>
                <li><Link to="/ضبط-الالوان" className="hover:text-blue-600">ضبط الألوان</Link></li>
                <li><Link to="/تحويل-الى-رمادي" className="hover:text-blue-600">تحويل إلى رمادي</Link></li>
                <li><Link to="/ضبط-نسبة-العرض" className="hover:text-blue-600">ضبط نسبة العرض</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
            <p className="mb-1">🔒 جميع العمليات تتم داخل متصفحك — ملفاتك لا تُرفع لأي سيرفر.</p>
            <p>© {new Date().getFullYear()} أدوات دُرّة — جميع الأدوات مجانية بدون تسجيل</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
