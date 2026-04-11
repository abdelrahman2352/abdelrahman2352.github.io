import Layout from '../components/Layout';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';

const tools = [
  { icon: '📑', title: 'دمج PDF', description: 'ادمج عدة ملفات PDF في ملف واحد بسرعة وسهولة', href: '/دمج-pdf' },
  { icon: '✂️', title: 'تقسيم PDF', description: 'قسّم ملف PDF إلى أجزاء حسب نطاق الصفحات', href: '/تقسيم-pdf' },
  { icon: '🗑️', title: 'حذف صفحات PDF', description: 'احذف أو استخرج صفحات محددة من ملف PDF', href: '/حذف-صفحات-pdf' },
  { icon: '🔄', title: 'تدوير PDF', description: 'دوِّر صفحات PDF يمينًا أو يسارًا أو 180 درجة', href: '/تدوير-pdf' },
  { icon: '🖼️', title: 'تحويل الصور إلى PDF', description: 'حوِّل صور JPG/PNG/WebP إلى ملف PDF واحد', href: '/تحويل-صور-الى-pdf' },
  { icon: '📸', title: 'PDF إلى صور', description: 'صدِّر صفحات PDF كصور JPG أو PNG', href: '/pdf-الى-jpg' },
  { icon: '🗜️', title: 'ضغط الصور', description: 'قلّل حجم صورك مع الحفاظ على الجودة', href: '/ضغط-الصور' },
  { icon: '🔁', title: 'تحويل صيغ الصور', description: 'حوِّل الصور بين JPG وPNG وWebP', href: '/تحويل-صيغ-الصور' },
  { icon: '📐', title: 'تغيير حجم الصور', description: 'غيّر أبعاد الصور إلى حجم محدد مع الحفاظ على النسب', href: '/تغيير-حجم-الصور' },
  { icon: '✂️', title: 'قص الصور بنسبة عرض', description: 'اقطع الصورة من المنتصف لنسب 1:1، 4:3، 16:9 وغيرها', href: '/قص-الصور' },
  { icon: '🔃', title: 'تدوير وقلب الصور', description: 'دوِّر صورك أو اقلبها أفقيًا أو رأسيًا', href: '/تدوير-وقلب-الصور' },
  { icon: '💧', title: 'إضافة علامة مائية', description: 'أضف نصًا كعلامة مائية على صورك', href: '/علامة-مائية' },
  { icon: '🖼️', title: 'إضافة إطار', description: 'أضف إطارًا ملونًا حول صورك بأي لون', href: '/اطار-الصور' },
  { icon: '🎨', title: 'ضبط الألوان', description: 'عدِّل السطوع والتباين والتشبع اللوني', href: '/ضبط-الالوان' },
  { icon: '⬛', title: 'تحويل إلى رمادي', description: 'حوِّل صورك الملونة إلى أبيض وأسود', href: '/تحويل-الى-رمادي' },
  { icon: '⚖️', title: 'ضبط نسبة العرض', description: 'احشو الصورة في نسبة محددة بإضافة خلفية', href: '/ضبط-نسبة-العرض' },
];

const faqItems = [
  { q: 'هل ملفاتي آمنة؟', a: 'نعم، جميع العمليات تتم على جهازك مباشرة داخل المتصفح. لا نرسل ملفاتك إلى أي سيرفر خارجي على الإطلاق.' },
  { q: 'هل الأدوات مجانية؟', a: 'نعم، جميع الأدوات مجانية تمامًا بدون حدود أو تسجيل أو اشتراك.' },
  { q: 'ما هو الحد الأقصى لحجم الملف؟', a: 'الحد يعتمد على جهازك ومتصفحك. عادةً تعمل الأدوات مع ملفات حتى 200 ميغابايت.' },
  { q: 'هل يعمل على الهاتف؟', a: 'نعم، جميع الأدوات تعمل على الهاتف والتابلت والحاسوب بدون تثبيت أي تطبيق.' },
  { q: 'كيف أدمج ملفات PDF؟', a: 'اذهب إلى أداة "دمج PDF"، ارفع الملفات، رتّبها كما تريد ثم اضغط "دمج الملفات". ستحصل على الملف المدمج فورًا.' },
  { q: 'كيف أضغط صورة؟', a: 'افتح أداة "ضغط الصور"، اختر الصورة وحدد مستوى الجودة، ثم اضغط "ضغط الصور" لتحميل الصورة المضغوطة.' },
  { q: 'هل يمكنني تحويل PDF إلى JPG؟', a: 'نعم، أداة "PDF إلى صور" تتيح لك تصدير كل صفحة من ملف PDF كصورة JPG أو PNG بجودة عالية.' },
  { q: 'هل يمكنني استخدام الأدوات بدون إنترنت؟', a: 'بعد تحميل الصفحة لأول مرة، تعمل معظم الأدوات بدون اتصال بالإنترنت لأن كل المعالجة تتم على جهازك.' },
  { q: 'هل الأدوات متاحة باللغة العربية بالكامل؟', a: 'نعم! أدوات دُرّة هي من النادر جدًا — الواجهة والتعليمات والأزرار كلها بالعربية الكاملة، مما يجعلها الخيار الأول للمستخدمين العرب.' },
];


const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function HomePage() {
  return (
    <Layout>
      <SEO
        title="أدوات PDF والصور المجانية"
        description="أدوات دُرّة — أول منصة عربية متكاملة لتعديل PDF والصور، واجهة عربية 100%، أكثر من 16 أداة مجانية تعمل داخل المتصفح بدون تسجيل. دمج PDF، تقسيم PDF، ضغط الصور، وأكثر."
        path="/"
        jsonLd={jsonLd}
      />

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">أدوات PDF والصور — بالعربي الكامل</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          أكثر من 16 أداة مجانية وسريعة تعمل داخل المتصفح — ملفاتك لا تُرفع لأي سيرفر
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <span>🔒</span>
            <span>100% خصوصية — يعمل داخل المتصفح</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <span>🇸🇦</span>
            <span>واجهة عربية بالكامل</span>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-l from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 mb-10">
        <div className="flex items-start gap-4">
          <span className="text-4xl" aria-hidden="true">🌍</span>
          <div>
            <h2 className="text-lg font-bold text-blue-800 mb-1">الأداة العربية الأولى من نوعها</h2>
            <p className="text-blue-700 text-sm leading-relaxed">
              معظم أدوات PDF والصور المجانية على الإنترنت إنجليزية فقط. <strong>أدوات دُرّة</strong> مصممة للمستخدم العربي من الألف إلى الياء — كل زر وكل رسالة وكل خطوة بالعربية الكاملة، مع دعم الاتجاه من اليمين إلى اليسار.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10" aria-labelledby="pdf-tools-heading">
        <h2 id="pdf-tools-heading" className="text-2xl font-bold text-gray-800 mb-6">أدوات PDF</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.slice(0, 6).map(tool => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      <section aria-labelledby="image-tools-heading">
        <h2 id="image-tools-heading" className="text-2xl font-bold text-gray-800 mb-6">أدوات الصور</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.slice(6).map(tool => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      <section className="mt-16 bg-white rounded-xl border border-gray-100 p-8" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-bold text-gray-800 mb-6">أسئلة شائعة</h2>
        <div className="space-y-6">
          {faqItems.map((item, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-gray-800 mb-2">{item.q}</h3>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
