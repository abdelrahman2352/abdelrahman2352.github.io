import { useState, useCallback } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Sparkles, Copy, CheckCheck, Type, Layers, Square } from 'lucide-react';

// ── Text-transform helpers ──────────────────────────────────────────────────

/** Insert `sep` between every two adjacent non-space characters */
const interleave = (sep) => (t) => {
  const chars = [...t];
  const last = chars.length - 1;
  return chars.map((c, i) => {
    if (i === last) return c;
    if (c === ' ' || chars[i + 1] === ' ') return c;
    return c + sep;
  }).join('');
};

/** Append a Unicode combining character after every Arabic letter */
const withCombining = (combo) => (t) =>
  [...t].map(c => /[\u0600-\u06FF]/.test(c) ? c + combo : c).join('');

/** Swap Arabic letters for their mathematical Unicode variants */
const toMath = (map) => (t) => [...t].map(c => map[c] ?? c).join('');

// Arabic Mathematical Alphabetic Symbols – Unserifed / Base (U+1EE00–U+1EE1B)
const BASE_MAP = {
  '\u0627': '\u{1EE00}', '\u0623': '\u{1EE00}', '\u0625': '\u{1EE00}',
  '\u0622': '\u{1EE00}', '\u0621': '\u{1EE00}',
  '\u0628': '\u{1EE01}',
  '\u062C': '\u{1EE02}',
  '\u062F': '\u{1EE03}',
  '\u0648': '\u{1EE05}', '\u0624': '\u{1EE05}',
  '\u0632': '\u{1EE06}',
  '\u062D': '\u{1EE07}',
  '\u0637': '\u{1EE08}',
  '\u064A': '\u{1EE09}', '\u0649': '\u{1EE09}', '\u0626': '\u{1EE09}',
  '\u0643': '\u{1EE0A}',
  '\u0644': '\u{1EE0B}',
  '\u0645': '\u{1EE0C}',
  '\u0646': '\u{1EE0D}',
  '\u0633': '\u{1EE0E}',
  '\u0639': '\u{1EE0F}',
  '\u0641': '\u{1EE10}',
  '\u0635': '\u{1EE11}',
  '\u0642': '\u{1EE12}',
  '\u0631': '\u{1EE13}',
  '\u0634': '\u{1EE14}',
  '\u062A': '\u{1EE15}', '\u0629': '\u{1EE15}',
  '\u062B': '\u{1EE16}',
  '\u062E': '\u{1EE17}',
  '\u0630': '\u{1EE18}',
  '\u0636': '\u{1EE19}',
  '\u0638': '\u{1EE1A}',
  '\u063A': '\u{1EE1B}',
};

// Arabic Mathematical Alphabetic Symbols – Looped (U+1EE80–U+1EE9B)
const LOOPED_MAP = {
  '\u0627': '\u{1EE80}', '\u0623': '\u{1EE80}', '\u0625': '\u{1EE80}',
  '\u0622': '\u{1EE80}', '\u0621': '\u{1EE80}',
  '\u0628': '\u{1EE81}',
  '\u062C': '\u{1EE82}',
  '\u062F': '\u{1EE83}',
  '\u0647': '\u{1EE84}', '\u0629': '\u{1EE84}',
  '\u0648': '\u{1EE85}', '\u0624': '\u{1EE85}',
  '\u0632': '\u{1EE86}',
  '\u062D': '\u{1EE87}',
  '\u0637': '\u{1EE88}',
  '\u064A': '\u{1EE89}', '\u0649': '\u{1EE89}', '\u0626': '\u{1EE89}',
  '\u0644': '\u{1EE8B}',
  '\u0645': '\u{1EE8C}',
  '\u0646': '\u{1EE8D}',
  '\u0633': '\u{1EE8E}',
  '\u0639': '\u{1EE8F}',
  '\u0641': '\u{1EE90}',
  '\u0635': '\u{1EE91}',
  '\u0642': '\u{1EE92}',
  '\u0631': '\u{1EE93}',
  '\u0634': '\u{1EE94}',
  '\u062A': '\u{1EE95}',
  '\u062B': '\u{1EE96}',
  '\u062E': '\u{1EE97}',
  '\u0630': '\u{1EE98}',
  '\u0636': '\u{1EE99}',
  '\u0638': '\u{1EE9A}',
  '\u063A': '\u{1EE9B}',
};

// Arabic Mathematical Alphabetic Symbols – Double Struck (U+1EEA1–U+1EEBB, no Alef)
const DOUBLE_MAP = {
  '\u0628': '\u{1EEA1}',
  '\u062C': '\u{1EEA2}',
  '\u062F': '\u{1EEA3}',
  '\u0647': '\u{1EEA4}', '\u0629': '\u{1EEA4}',
  '\u0648': '\u{1EEA5}', '\u0624': '\u{1EEA5}',
  '\u0632': '\u{1EEA6}',
  '\u062D': '\u{1EEA7}',
  '\u0637': '\u{1EEA8}',
  '\u064A': '\u{1EEA9}', '\u0649': '\u{1EEA9}', '\u0626': '\u{1EEA9}',
  '\u0644': '\u{1EEAB}',
  '\u0645': '\u{1EEAC}',
  '\u0646': '\u{1EEAD}',
  '\u0633': '\u{1EEAE}',
  '\u0639': '\u{1EEAF}',
  '\u0641': '\u{1EEB0}',
  '\u0635': '\u{1EEB1}',
  '\u0642': '\u{1EEB2}',
  '\u0631': '\u{1EEB3}',
  '\u0634': '\u{1EEB4}',
  '\u062A': '\u{1EEB5}',
  '\u062B': '\u{1EEB6}',
  '\u062E': '\u{1EEB7}',
  '\u0630': '\u{1EEB8}',
  '\u0636': '\u{1EEB9}',
  '\u0638': '\u{1EEBA}',
  '\u063A': '\u{1EEBB}',
};

// ── Style arrays ────────────────────────────────────────────────────────────

const FRAME_STYLES = [
  { name: 'كلاسيك',            fn: t => `꧁༺ ${t} ༻꧂` },
  { name: 'نجوم ذهبية',        fn: t => `✦•┈┈•✦ ${t} ✦•┈┈•✦` },
  { name: 'ورود',               fn: t => `◦•●◉✿ ${t} ✿◉●•◦` },
  { name: 'ماسي',               fn: t => `◈◇◈ ${t} ◈◇◈` },
  { name: 'ملكي',               fn: t => `👑 ${t} 👑` },
  { name: 'أزهار',              fn: t => `✿ ❀ ${t} ❀ ✿` },
  { name: 'قمر ونجوم',          fn: t => `🌙✨ ${t} ✨🌙` },
  { name: 'قلوب',               fn: t => `♡ ${t} ♡` },
  { name: 'برواز مزدوج',        fn: t => `══╡ ${t} ╞══` },
  { name: 'بريق',               fn: t => `┊✦┊ ${t} ┊✦┊` },
  { name: 'جواهر',              fn: t => `💎 ${t} 💎` },
  { name: 'نجمة ساطعة',        fn: t => `🌟 ${t} 🌟` },
  { name: 'فراشة',              fn: t => `🦋 ${t} 🦋` },
  { name: 'زهرة ربيع',          fn: t => `🌸 ${t} 🌸` },
  { name: 'كريستال',            fn: t => `❅ ${t} ❅` },
  { name: 'فضة',                fn: t => `░▒▓ ${t} ▓▒░` },
  { name: 'خط مزخرف',          fn: t => `─────✦ ${t} ✦─────` },
  { name: 'مربع ياباني',        fn: t => `【 ${t} 】` },
  { name: 'حواشي يابانية',      fn: t => `『 ${t} 』` },
  { name: 'زاوية مزدوجة',       fn: t => `≪✦ ${t} ✦≫` },
  { name: 'زهرة لوتس',          fn: t => `🌺 ${t} 🌺` },
  { name: 'كرة ماجيك',         fn: t => `🔮 ${t} 🔮` },
  { name: 'نجمة سداسية',        fn: t => `✡ ${t} ✡` },
  { name: 'بريق خاص',           fn: t => `⋆｡‧˚ ${t} ˚‧｡⋆` },
  { name: 'صاعقة',              fn: t => `⚡ ${t} ⚡` },
  { name: 'تاج بريق',           fn: t => `꧁👑✨ ${t} ✨👑꧂` },
  { name: 'نجوم متناثرة',       fn: t => `⋆⋅☆⋅⋆ ${t} ⋆⋅☆⋅⋆` },
  { name: 'دائرة نقاط',         fn: t => `•·.·´¯\`·.·• ${t} •·.·´¯\`·.·•` },
  { name: 'خيوط زخرفة',         fn: t => `❋ ${t} ❋` },
  { name: 'تحفة فنية',          fn: t => `꧁✨💫 ${t} 💫✨꧂` },
  { name: 'برواز لا نهائي',     fn: t => `∞ ${t} ∞` },
  { name: 'نجمة بيضاء',         fn: t => `✩ ${t} ✩` },
];

const TEXT_STYLES = [
  // Arabic Mathematical Alphabetic Symbols — letters without a Unicode math variant pass through unchanged
  { name: 'رياضي أصيل',        tag: 'رياضي',  fn: toMath(BASE_MAP) },
  { name: 'رياضي حلقي',        tag: 'رياضي',  fn: toMath(LOOPED_MAP) },
  { name: 'رياضي مزدوج',       tag: 'رياضي',  fn: toMath(DOUBLE_MAP) },
  { name: 'تباعد نجمي',        tag: 'تباعد',  fn: interleave(' ✦ ') },
  { name: 'تباعد الورود',       tag: 'تباعد',  fn: interleave(' ❀ ') },
  { name: 'تباعد الماس',        tag: 'تباعد',  fn: interleave(' ◆ ') },
  { name: 'تباعد منقط',         tag: 'تباعد',  fn: interleave(' • ') },
  { name: 'تباعد بريق',         tag: 'تباعد',  fn: interleave(' ⋆ ') },
  { name: 'تباعد موجي',         tag: 'تباعد',  fn: interleave(' ≋ ') },
  { name: 'خط سفلي',            tag: 'تأثير',  fn: withCombining('\u0332') },
  { name: 'خط علوي',            tag: 'تأثير',  fn: withCombining('\u0305') },
  { name: 'خط علوي مزدوج',      tag: 'تأثير',  fn: withCombining('\u033F') },
  { name: 'نقطة فوقية',          tag: 'تأثير',  fn: withCombining('\u0307') },
  { name: 'نقطتان فوقيتان',      tag: 'تأثير',  fn: withCombining('\u0308') },
];

const MIXED_STYLES = [
  { name: 'رياضي فاخر',          fn: t => `꧁✨ ${toMath(LOOPED_MAP)(t)} ✨꧂` },
  { name: 'كلاسيك حلقي',         fn: t => `༺ ${toMath(LOOPED_MAP)(t)} ༻` },
  { name: 'ملكي مزدوج',          fn: t => `👑 ${toMath(DOUBLE_MAP)(t)} 👑` },
  { name: 'نجوم رياضية',         fn: t => `✦•┈┈•✦ ${toMath(BASE_MAP)(t)} ✦•┈┈•✦` },
  { name: 'تباعد كلاسيك',        fn: t => `꧁༺ ${interleave(' ✦ ')(t)} ༻꧂` },
  { name: 'ورود مع تباعد',        fn: t => `✿ ❀ ${interleave(' · ')(t)} ❀ ✿` },
  { name: 'خط مزدوج فاخر',       fn: t => `══╡ ${withCombining('\u0332')(t)} ╞══` },
  { name: 'بريق رياضي',          fn: t => `⋆｡‧˚ ${toMath(LOOPED_MAP)(t)} ˚‧｡⋆` },
  { name: 'ماسي حلقي',           fn: t => `◈◇◈ ${toMath(LOOPED_MAP)(t)} ◈◇◈` },
  { name: 'قمر ونجوم مزدوج',     fn: t => `🌙✨ ${toMath(DOUBLE_MAP)(t)} ✨🌙` },
];

const TABS = [
  { id: 'frames',    label: 'إطارات',        Icon: Square,  styles: FRAME_STYLES },
  { id: 'transform', label: 'تحويل الحروف',  Icon: Type,    styles: TEXT_STYLES  },
  { id: 'mixed',     label: 'مزيج',          Icon: Layers,  styles: MIXED_STYLES },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'زخارف عربية - أدوات دُرّة',
  url: 'https://abdelrahman2352.github.io/زخارف-عربية',
  description: 'اكتب اسمك بالعربي واحصل على أجمل الأنماط الزخرفية مع تحويل الحروف نفسها لنسخها ومشاركتها',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'All',
  inLanguage: 'ar',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const TAG_COLORS = {
  'رياضي': { bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.35)',  color: '#93c5fd' },
  'تباعد': { bg: 'rgba(236,72,153,0.15)',  border: 'rgba(236,72,153,0.35)',  color: '#f9a8d4' },
  'تأثير': { bg: 'rgba(234,179,8,0.15)',   border: 'rgba(234,179,8,0.35)',   color: '#fde047' },
};

export default function ArabicDecorations() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(null);
  const [activeTab, setActiveTab] = useState('frames');

  const handleCopy = useCallback((value, key) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    });
  }, []);

  const displayText = text.trim() || 'اسمك';
  const currentTab = TABS.find(t => t.id === activeTab);

  return (
    <Layout>
      <SEO
        title="زخارف عربية — زخرفة الأسماء والنصوص"
        description="اكتب اسمك أو نصك بالعربي واحصل فورًا على أكثر من 55 نمطًا زخرفيًا جميلًا — تحويل الحروف نفسها وإطارات ومزيج — جاهزة للنسخ والمشاركة مجانًا."
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
            اكتب اسمك أو نصك واحصل على أكثر من{' '}
            {FRAME_STYLES.length + TEXT_STYLES.length + MIXED_STYLES.length} نمطًا —
            إطارات، تحويل الحروف نفسها، ومزيج بينهما
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

      {/* ── Tabs ─────────────────────────────────────── */}
      <div className="flex gap-2 mb-6 flex-wrap" role="tablist" aria-label="أنواع الزخرفة">
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          const TabIcon = tab.Icon;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: isActive ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isActive ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.08)'}`,
                color: isActive ? '#c4b5fd' : '#71717a',
              }}
            >
              <TabIcon size={15} />
              {tab.label}
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={{
                  background: isActive ? 'rgba(139,92,246,0.25)' : 'rgba(255,255,255,0.06)',
                  color: isActive ? '#a78bfa' : '#52525b',
                }}
              >
                {tab.styles.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Tab description ──────────────────────────── */}
      {activeTab === 'transform' && (
        <p className="text-xs mb-5 px-1" style={{ color: '#71717a' }}>
          ✦ تحوّل الحروف العربية نفسها إلى شكل مختلف — حروف رياضية، تباعد بين الأحرف، أو تأثيرات بصرية. الأحرف غير المعروفة تظهر كما هي.
        </p>
      )}
      {activeTab === 'mixed' && (
        <p className="text-xs mb-5 px-1" style={{ color: '#71717a' }}>
          ✦ يجمع بين تحويل الحروف وإضافة إطار زخرفي معًا لأجمل النتائج.
        </p>
      )}

      {/* ── Styles Grid ──────────────────────────────── */}
      <section aria-labelledby="styles-heading">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-6 rounded-full" style={{ background: 'linear-gradient(180deg, #8b5cf6 0%, #6d28d9 100%)' }} />
          <h2 id="styles-heading" className="text-xl font-bold text-white">{currentTab.label}</h2>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa' }}
          >
            {currentTab.styles.length} نمط
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentTab.styles.map((style, idx) => {
            const result = style.fn(displayText);
            const key = `${activeTab}-${idx}`;
            const isCopied = copied === key;
            return (
              <div
                key={key}
                className="group relative rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)'; e.currentTarget.style.background = 'rgba(139,92,246,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
              >
                {/* Style name + tag */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold" style={{ color: '#a78bfa' }}>{style.name}</span>
                  {TAG_COLORS[style.tag] && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        background: TAG_COLORS[style.tag].bg,
                        border: `1px solid ${TAG_COLORS[style.tag].border}`,
                        color: TAG_COLORS[style.tag].color,
                      }}
                    >
                      {style.tag}
                    </span>
                  )}
                </div>

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
                  onClick={() => handleCopy(result, key)}
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
            { q: 'ما الفرق بين الأقسام الثلاثة؟', a: '"إطارات" تضيف رموزًا حول النص. "تحويل الحروف" يغيّر شكل الحروف نفسها إلى أنماط رياضية أو متباعدة أو بتأثيرات بصرية. "مزيج" يجمع الاثنين معًا.' },
            { q: 'هل الزخارف مجانية؟', a: 'نعم، جميع الأنماط الزخرفية مجانية تمامًا بدون حدود أو تسجيل.' },
            { q: 'أين يمكنني استخدام الزخارف؟', a: 'في البايو على انستغرام، واتساب، تويتر، تيك توك، عناوين اليوتيوب، وأي مكان يدعم نسخ النصوص.' },
            { q: 'لماذا لا تظهر بعض الحروف بشكل مختلف في "تحويل الحروف"؟', a: 'بعض الحروف ليس لها مقابل في المجموعة الرياضية اليونيكود فتظهر كما هي. كذلك قد تحتاج بعض الخطوط إلى دعم Unicode الموسّع لعرض الحروف الرياضية.' },
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
