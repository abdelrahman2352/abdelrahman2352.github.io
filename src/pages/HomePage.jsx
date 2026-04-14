import Layout from '../components/Layout';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';
import {
  Files,
  Scissors,
  Trash2,
  RotateCw,
  FileImage,
  ImageDown,
  Minimize2,
  ArrowLeftRight,
  Maximize2,
  Crop,
  FlipHorizontal2,
  Droplets,
  Frame,
  Sliders,
  Contrast,
  LayoutTemplate,
  ShieldCheck,
  BadgeCheck,
  Globe2,
  Sparkles,
} from 'lucide-react';

const tools = [
  { icon: Files, title: 'دمج PDF', description: 'ادمج عدة ملفات PDF في ملف واحد بسرعة وسهولة', href: '/دمج-pdf' },
  { icon: Scissors, title: 'تقسيم PDF', description: 'قسّم ملف PDF إلى أجزاء حسب نطاق الصفحات', href: '/تقسيم-pdf' },
  { icon: Trash2, title: 'حذف صفحات PDF', description: 'احذف أو استخرج صفحات محددة من ملف PDF', href: '/حذف-صفحات-pdf' },
  { icon: RotateCw, title: 'تدوير PDF', description: 'دوِّر صفحات PDF يمينًا أو يسارًا أو 180 درجة', href: '/تدوير-pdf' },
  { icon: FileImage, title: 'تحويل الصور إلى PDF', description: 'حوِّل صور JPG/PNG/WebP إلى ملف PDF واحد', href: '/تحويل-صور-الى-pdf' },
  { icon: ImageDown, title: 'PDF إلى صور', description: 'صدِّر صفحات PDF كصور JPG أو PNG', href: '/pdf-الى-jpg' },
  { icon: Minimize2, title: 'ضغط الصور', description: 'قلّل حجم صورك مع الحفاظ على الجودة', href: '/ضغط-الصور' },
  { icon: ArrowLeftRight, title: 'تحويل صيغ الصور', description: 'حوِّل الصور بين JPG وPNG وWebP', href: '/تحويل-صيغ-الصور' },
  { icon: Maximize2, title: 'تغيير حجم الصور', description: 'غيّر أبعاد الصور إلى حجم محدد مع الحفاظ على النسب', href: '/تغيير-حجم-الصور' },
  { icon: Crop, title: 'قص الصور بنسبة عرض', description: 'اقطع الصورة من المنتصف لنسب 1:1، 4:3، 16:9 وغيرها', href: '/قص-الصور' },
  { icon: FlipHorizontal2, title: 'تدوير وقلب الصور', description: 'دوِّر صورك أو اقلبها أفقيًا أو رأسيًا', href: '/تدوير-وقلب-الصور' },
  { icon: Droplets, title: 'إضافة علامة مائية', description: 'أضف نصًا كعلامة مائية على صورك', href: '/علامة-مائية' },
  { icon: Frame, title: 'إضافة إطار', description: 'أضف إطارًا ملونًا حول صورك بأي لون', href: '/اطار-الصور' },
  { icon: Sliders, title: 'ضبط الألوان', description: 'عدِّل السطوع والتباين والتشبع اللوني', href: '/ضبط-الالوان' },
  { icon: Contrast, title: 'تحويل إلى رمادي', description: 'حوِّل صورك الملونة إلى أبيض وأسود', href: '/تحويل-الى-رمادي' },
  { icon: LayoutTemplate, title: 'ضبط نسبة العرض', description: 'احشو الصورة في نسبة محددة بإضافة خلفية', href: '/ضبط-نسبة-العرض' },
];

const textTools = [
  { icon: Sparkles, title: 'زخارف عربية', description: 'زخرف اسمك أو نصك بأجمل الأنماط العربية وانسخها فورًا', href: '/زخارف-عربية' },
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
  { q: 'ما هي أداة الزخارف العربية؟', a: 'أداة الزخارف العربية تتيح لك كتابة اسمك أو نصك بالعربي وتحويله فورًا إلى أكثر من 32 نمطًا زخرفيًا جميلًا جاهزة للنسخ والمشاركة في واتساب وانستغرام وغيرها.' },
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

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative text-center pt-16 pb-20 mb-6 overflow-hidden rounded-3xl"
        style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(124,58,237,0.2) 0%, transparent 65%)' }}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-8"
            style={{
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.3)',
              color: '#c4b5fd',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#a78bfa' }}
            />
            الأداة العربية الأولى لملفات PDF والصور
          </div>

          {/* Heading */}
          <h1
            className="text-5xl sm:text-6xl font-black leading-tight mb-6 tracking-tight"
            style={{ color: '#fafafa' }}
          >
            أدوات{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              PDF والصور
            </span>
            <br />
            <span className="text-4xl sm:text-5xl">بالعربي الكامل</span>
          </h1>

          <p
            className="text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#71717a' }}
          >
            أكثر من 17 أداة مجانية وسريعة — ملفاتك لا تُرفع لأي سيرفر، كل شيء يعمل على جهازك.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { Icon: ShieldCheck, text: '100% خصوصية', sub: 'يعمل داخل المتصفح' },
              { Icon: BadgeCheck, text: 'مجاني تماماً', sub: 'بدون تسجيل' },
              { Icon: Globe2, text: 'عربي بالكامل', sub: 'واجهة RTL' },
            ].map(({ Icon, text, sub }) => (
              <div
                key={text}
                className="flex items-center gap-2.5 rounded-xl px-4 py-3"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Icon size={20} style={{ color: '#a78bfa' }} strokeWidth={1.75} />
                <div className="text-right">
                  <p className="text-xs font-bold text-white leading-tight">{text}</p>
                  <p className="text-xs leading-tight" style={{ color: '#52525b' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PDF Tools ─────────────────────────────────────────── */}
      <section className="mb-10" aria-labelledby="pdf-tools-heading">
        <SectionHeader id="pdf-tools-heading" label="PDF" title="أدوات PDF" count={6} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tools.slice(0, 6).map(tool => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      {/* ── Image Tools ───────────────────────────────────────── */}
      <section className="mb-10" aria-labelledby="image-tools-heading">
        <SectionHeader id="image-tools-heading" label="صور" title="أدوات الصور" count={10} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tools.slice(6).map(tool => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      {/* ── Text Tools ────────────────────────────────────────── */}
      <section className="mb-16" aria-labelledby="text-tools-heading">
        <SectionHeader id="text-tools-heading" label="نص" title="أدوات النص" count={textTools.length} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {textTools.map(tool => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section
        className="rounded-2xl p-8"
        aria-labelledby="faq-heading"
        style={{ background: '#111120', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <h2
          id="faq-heading"
          className="text-2xl font-bold text-white mb-8"
        >
          أسئلة شائعة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl p-5"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <h3 className="font-bold text-white text-sm mb-2">{item.q}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#71717a' }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function SectionHeader({ id, label, title, count }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className="w-1 h-6 rounded-full"
        style={{ background: 'linear-gradient(180deg, #8b5cf6 0%, #6d28d9 100%)' }}
      />
      <h2 id={id} className="text-xl font-bold text-white">
        {title}
      </h2>
      <span
        className="text-xs font-semibold px-2 py-0.5 rounded-full"
        style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa' }}
      >
        {count} أداة
      </span>
    </div>
  );
}
