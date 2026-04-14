import { useState, useCallback } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Sparkles, Copy, CheckCheck } from 'lucide-react';

const STYLES = [
  { name: 'كلاسيك',       fn: t => `꧁༺ ${t} ༻꧂` },
  { name: 'نجوم ذهبية',   fn: t => `✦•┈┈•✦ ${t} ✦•┈┈•✦` },
  { name: 'ورود',          fn: t => `◦•●◉✿ ${t} ✿◉●•◦` },
  { name: 'ماسي',          fn: t => `◈◇◈ ${t} ◈◇◈` },
  { name: 'ملكي',          fn: t => `👑 ${t} 👑` },
  { name: 'أزهار',         fn: t => `✿ ❀ ${t} ❀ ✿` },
  { name: 'قمر ونجوم',     fn: t => `🌙✨ ${t} ✨🌙` },
  { name: 'قلوب',          fn: t => `♡ ${t} ♡` },
  { name: 'برواز مزدوج',   fn: t => `══╡ ${t} ╞══` },
  { name: 'بريق',          fn: t => `┊✦┊ ${t} ┊✦┊` },
  { name: 'جواهر',         fn: t => `💎 ${t} 💎` },
  { name: 'نجمة ساطعة',   fn: t => `🌟 ${t} 🌟` },
  { name: 'فراشة',         fn: t => `🦋 ${t} 🦋` },
  { name: 'زهرة ربيع',     fn: t => `🌸 ${t} 🌸` },
  { name: 'كريستال',       fn: t => `❅ ${t} ❅` },
  { name: 'فضة',           fn: t => `░▒▓ ${t} ▓▒░` },
  { name: 'خط مزخرف',     fn: t => `─────✦ ${t} ✦─────` },
  { name: 'مربع ياباني',   fn: t => `【 ${t} 】` },
  { name: 'حواشي يابانية', fn: t => `『 ${t} 』` },
  { name: 'زاوية مزدوجة',  fn: t => `≪✦ ${t} ✦≫` },
  { name: 'زهرة لوتس',     fn: t => `🌺 ${t} 🌺` },
  { name: 'كرة ماجيك',    fn: t => `🔮 ${t} 🔮` },
  { name: 'نجمة سداسية',   fn: t => `✡ ${t} ✡` },
  { name: 'بريق خاص',      fn: t => `⋆｡‧˚ ${t} ˚‧｡⋆` },
  { name: 'صاعقة',         fn: t => `⚡ ${t} ⚡` },
  { name: 'تاج بريق',      fn: t => `꧁👑✨ ${t} ✨👑꧂` },
  { name: 'نجوم متناثرة',  fn: t => `⋆⋅☆⋅⋆ ${t} ⋆⋅☆⋅⋆` },
  { name: 'دائرة نقاط',    fn: t => `•·.·´¯\`·.·• ${t} •·.·´¯\`·.·•` },
  { name: 'خيوط زخرفة',    fn: t => `❋ ${t} ❋` },
  { name: 'تحفة فنية',     fn: t => `꧁✨💫 ${t} 💫✨꧂` },
  { name: 'برواز لا نهائي', fn: t => `∞ ${t} ∞` },
  { name: 'نجمة بيضاء',    fn: t => `✩ ${t} ✩` },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'زخارف عربية - أدوات دُرّة',
  url: 'https://abdelrahman2352.github.io/زخارف-عربية',
  description: 'اكتب اسمك بالعربي واحصل على أجمل الأنماط الزخرفية لنسخها ومشاركتها',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'All',
  inLanguage: 'ar',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function ArabicDecorations() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(null);

  const handleCopy = useCallback((value, idx) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(idx);
      setTimeout(() => setCopied(null), 1800);
    });
  }, []);

  const displayText = text.trim() || 'اسمك';

  return (
    <Layout>
      <SEO
        title="زخارف عربية — زخرفة الأسماء والنصوص"
        description="اكتب اسمك أو نصك بالعربي واحصل فورًا على أكثر من 32 نمطًا زخرفيًا جميلًا جاهزة للنسخ والمشاركة — مجانًا وبدون تسجيل."
        path="/زخارف-عربية"
        jsonLd={jsonLd}
      />

      {/* ── Hero ─────────────────────────────────────── */}
      <section
        className="relative text-center pt-12 pb-14 mb-8 overflow-hidden rounded-3xl"
        style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(124,58,237,0.2) 0%, transparent 65%)' }}
      >
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-6"
            style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#c4b5fd' }}
          >
            <Sparkles size={13} />
            أداة نصية جديدة
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4 tracking-tight" style={{ color: '#fafafa' }}>
            زخارف{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              عربية
            </span>
          </h1>
          <p className="text-base sm:text-lg max-w-lg mx-auto" style={{ color: '#71717a' }}>
            اكتب اسمك أو نصك بالعربي واحصل على أكثر من {STYLES.length} نمطًا زخرفيًا جميلًا جاهزة للنسخ فورًا
          </p>
        </div>
      </section>

      {/* ── Input ────────────────────────────────────── */}
      <div
        className="rounded-2xl p-6 mb-8"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
      >
        <label className="block text-sm font-semibold text-white mb-3">
          اكتب اسمك أو نصك هنا
        </label>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="مثال: محمد أو أدوات دُرّة"
          dir="rtl"
          className="w-full rounded-xl px-4 py-3 text-lg text-white placeholder-zinc-600 outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
          onFocus={e => { e.target.style.borderColor = 'rgba(139,92,246,0.6)'; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          maxLength={60}
        />
        {text.length > 0 && (
          <p className="text-xs mt-2" style={{ color: '#52525b' }}>
            {text.length}/60 حرف
          </p>
        )}
      </div>

      {/* ── Styles Grid ──────────────────────────────── */}
      <section aria-labelledby="styles-heading">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-6 rounded-full" style={{ background: 'linear-gradient(180deg, #8b5cf6 0%, #6d28d9 100%)' }} />
          <h2 id="styles-heading" className="text-xl font-bold text-white">الأنماط الزخرفية</h2>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa' }}
          >
            {STYLES.length} نمط
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {STYLES.map((style, idx) => {
            const result = style.fn(displayText);
            const isCopied = copied === idx;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)'; e.currentTarget.style.background = 'rgba(139,92,246,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
              >
                {/* Style name */}
                <span className="text-xs font-semibold" style={{ color: '#a78bfa' }}>{style.name}</span>

                {/* Styled text */}
                <p
                  dir="rtl"
                  className="text-lg font-bold text-white leading-loose text-center break-words select-all"
                  style={{ wordBreak: 'break-word' }}
                >
                  {result}
                </p>

                {/* Copy button */}
                <button
                  onClick={() => handleCopy(result, idx)}
                  className="mt-auto flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm font-semibold transition-all duration-150"
                  style={{
                    background: isCopied ? 'rgba(34,197,94,0.15)' : 'rgba(139,92,246,0.12)',
                    border: `1px solid ${isCopied ? 'rgba(34,197,94,0.35)' : 'rgba(139,92,246,0.25)'}`,
                    color: isCopied ? '#4ade80' : '#a78bfa',
                  }}
                >
                  {isCopied ? (
                    <>
                      <CheckCheck size={15} />
                      تم النسخ!
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      نسخ
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section
        className="rounded-2xl p-8 mt-12"
        aria-labelledby="faq-heading"
        style={{ background: '#111120', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <h2 id="faq-heading" className="text-2xl font-bold text-white mb-8">أسئلة شائعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { q: 'كيف أستخدم الزخارف؟', a: 'اكتب اسمك أو نصك في الحقل أعلاه، وستظهر فورًا جميع الأنماط. اضغط "نسخ" على أي نمط لنسخه ومشاركته.' },
            { q: 'هل الزخارف مجانية؟', a: 'نعم، جميع الأنماط الزخرفية مجانية تمامًا بدون حدود أو تسجيل.' },
            { q: 'أين يمكنني استخدام الزخارف؟', a: 'في البايو على انستغرام، واتساب، تويتر، تيك توك، عناوين اليوتيوب، وأي مكان يدعم نسخ النصوص.' },
            { q: 'هل تعمل الزخارف على جميع الأجهزة؟', a: 'نعم، الزخارف عبارة عن نصوص Unicode تعمل على جميع الأجهزة والتطبيقات التي تدعم Unicode.' },
            { q: 'هل يمكنني زخرفة أي نص؟', a: 'نعم، يمكنك زخرفة الأسماء العربية، الجمل القصيرة، العبارات التحفيزية، وأي نص تريده.' },
            { q: 'هل البيانات تُرفع لسيرفر؟', a: 'لا، كل شيء يعمل داخل المتصفح مباشرة. نصك لا يُرسل لأي خادم خارجي.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl p-5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
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
