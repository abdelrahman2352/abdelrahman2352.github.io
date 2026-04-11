import { Link } from 'react-router-dom';

const pdfLinks = [
  { to: '/دمج-pdf', label: 'دمج PDF' },
  { to: '/تقسيم-pdf', label: 'تقسيم PDF' },
  { to: '/حذف-صفحات-pdf', label: 'حذف صفحات PDF' },
  { to: '/تدوير-pdf', label: 'تدوير PDF' },
  { to: '/تحويل-صور-الى-pdf', label: 'تحويل الصور إلى PDF' },
  { to: '/pdf-الى-jpg', label: 'PDF إلى صور' },
];

const imageLinks = [
  { to: '/ضغط-الصور', label: 'ضغط الصور' },
  { to: '/تحويل-صيغ-الصور', label: 'تحويل صيغ الصور' },
  { to: '/تغيير-حجم-الصور', label: 'تغيير حجم الصور' },
  { to: '/قص-الصور', label: 'قص الصور' },
  { to: '/تدوير-وقلب-الصور', label: 'تدوير وقلب الصور' },
  { to: '/علامة-مائية', label: 'إضافة علامة مائية' },
];

const extraLinks = [
  { to: '/اطار-الصور', label: 'إضافة إطار للصور' },
  { to: '/ضبط-الالوان', label: 'ضبط الألوان' },
  { to: '/تحويل-الى-رمادي', label: 'تحويل إلى رمادي' },
  { to: '/ضبط-نسبة-العرض', label: 'ضبط نسبة العرض' },
];

export default function Layout({ children }) {
  return (
    <div className="min-h-screen" style={{ background: '#09090b' }} dir="rtl">
      {/* ── Sticky glass header ─────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(9, 9, 11, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm shrink-0 transition-transform duration-200 group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}
            >
              د
            </div>
            <span className="text-lg font-bold text-white tracking-tight">أدوات دُرّة</span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5" aria-label="التنقل الرئيسي">
            {[
              { to: '/دمج-pdf', label: 'دمج PDF' },
              { to: '/تقسيم-pdf', label: 'تقسيم PDF' },
              { to: '/pdf-الى-jpg', label: 'PDF → JPG' },
              { to: '/ضغط-الصور', label: 'ضغط الصور' },
              { to: '/تحويل-صيغ-الصور', label: 'تحويل الصور' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150"
                style={{ color: '#a1a1aa' }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fafafa';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#a1a1aa';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Main content ────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 py-8 dark-content">
        {children}
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer
        className="mt-20"
        aria-label="تذييل الصفحة"
        style={{ background: '#09090b', borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-14">
          {/* Brand */}
          <div className="mb-10">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-3">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-white font-black text-xs"
                style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}
              >
                د
              </div>
              <span className="text-base font-bold text-white">أدوات دُرّة</span>
            </Link>
            <p className="text-sm max-w-xs" style={{ color: '#52525b' }}>
              أكثر من 16 أداة مجانية لـ PDF والصور، تعمل كاملةً داخل متصفحك.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
            <FooterCol title="أدوات PDF" links={pdfLinks} />
            <FooterCol title="أدوات الصور" links={imageLinks} />
            <FooterCol title="أدوات إضافية" links={extraLinks} />
          </div>

          <div
            className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)', color: '#3f3f46' }}
          >
            <span>© {new Date().getFullYear()} أدوات دُرّة — جميع الأدوات مجانية</span>
            <span>🔒 ملفاتك لا تُرفع لأي سيرفر — خصوصية تامة</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-white mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className="text-sm transition-colors duration-150"
              style={{ color: '#52525b' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#a1a1aa'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#52525b'; }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
