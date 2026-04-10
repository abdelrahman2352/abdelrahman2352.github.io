import { useEffect } from 'react';
import Layout from '../components/Layout';
import ToolCard from '../components/ToolCard';

const tools = [
  { icon: '📑', title: 'دمج PDF', description: 'ادمج عدة ملفات PDF في ملف واحد بسرعة وسهولة', href: '/دمج-pdf' },
  { icon: '✂️', title: 'تقسيم PDF', description: 'قسّم ملف PDF إلى أجزاء حسب نطاق الصفحات', href: '/تقسيم-pdf' },
  { icon: '🗑️', title: 'حذف صفحات PDF', description: 'احذف أو استخرج صفحات محددة من ملف PDF', href: '/حذف-صفحات-pdf' },
  { icon: '🔄', title: 'تدوير PDF', description: 'دوِّر صفحات PDF يمينًا أو يسارًا أو 180 درجة', href: '/تدوير-pdf' },
  { icon: '🖼️', title: 'تحويل الصور إلى PDF', description: 'حوِّل صور JPG/PNG/WebP إلى ملف PDF واحد', href: '/تحويل-صور-الى-pdf' },
  { icon: '📸', title: 'PDF إلى صور', description: 'صدِّر صفحات PDF كصور JPG أو PNG', href: '/pdf-الى-jpg' },
  { icon: '🗜️', title: 'ضغط الصور', description: 'قلّل حجم صورك مع الحفاظ على الجودة', href: '/ضغط-الصور' },
  { icon: '🔁', title: 'تحويل صيغ الصور', description: 'حوِّل الصور بين JPG وPNG وWebP', href: '/تحويل-صيغ-الصور' },
];

export default function HomePage() {
  useEffect(() => {
    document.title = 'أدوات دُرّة - أدوات PDF والصور المجانية';
  }, []);

  return (
    <Layout>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">أدوات PDF والصور</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          أدوات مجانية وسريعة تعمل داخل المتصفح — ملفاتك لا تُرفع لأي سيرفر
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
          <span>🔒</span>
          <span>100% خصوصية — يعمل داخل المتصفح</span>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">أدوات PDF</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.slice(0, 6).map(tool => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">أدوات الصور</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.slice(6).map(tool => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      <section className="mt-16 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">أسئلة شائعة</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">هل ملفاتي آمنة؟</h3>
            <p className="text-gray-600">نعم، جميع العمليات تتم على جهازك مباشرة. لا نرسل ملفاتك إلى أي سيرفر.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">هل الأدوات مجانية؟</h3>
            <p className="text-gray-600">نعم، جميع الأدوات مجانية تمامًا بدون حدود أو تسجيل.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">ما هو الحد الأقصى لحجم الملف؟</h3>
            <p className="text-gray-600">الحد يعتمد على جهازك ومتصفحك. عادةً تعمل الأدوات مع ملفات حتى 200 ميغابايت.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
