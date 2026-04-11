import { Link } from 'react-router-dom';

/* Map tool href prefix → gradient for icon background */
const categoryGradient = (href) => {
  if (href.includes('pdf')) return 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)';
  return 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)';
};

export default function ToolCard({ icon: Icon, title, description, href }) {
  return (
    <Link
      to={href}
      className="group flex flex-col gap-4 rounded-2xl p-5 transition-all duration-200"
      style={{
        background: '#13132a',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.border = '1px solid rgba(124,58,237,0.45)';
        e.currentTarget.style.boxShadow = '0 0 32px rgba(124,58,237,0.18)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.background = '#16163a';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.background = '#13132a';
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: categoryGradient(href) }}
      >
        <Icon size={22} color="#ffffff" strokeWidth={1.75} />
      </div>
      <div>
        <h3 className="font-bold text-white text-base mb-1 leading-snug">{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: '#71717a' }}>{description}</p>
      </div>
    </Link>
  );
}
