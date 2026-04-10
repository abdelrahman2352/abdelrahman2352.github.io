import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-700">
            أدوات دُرّة
          </Link>
          <nav className="hidden md:flex gap-4 text-sm text-gray-600">
            <Link to="/دمج-pdf" className="hover:text-blue-600">دمج PDF</Link>
            <Link to="/تقسيم-pdf" className="hover:text-blue-600">تقسيم PDF</Link>
            <Link to="/ضغط-الصور" className="hover:text-blue-600">ضغط الصور</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="text-center text-gray-400 text-sm py-6 mt-8">
        جميع العمليات تتم داخل متصفحك — ملفاتك لا تُرفع لأي سيرفر.
      </footer>
    </div>
  );
}
