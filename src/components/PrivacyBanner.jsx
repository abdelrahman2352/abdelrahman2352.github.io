import { ShieldCheck } from 'lucide-react';

export default function PrivacyBanner() {
  return (
    <div
      className="rounded-xl p-4 mb-6 flex items-center gap-3"
      style={{
        background: 'rgba(124, 58, 237, 0.08)',
        border: '1px solid rgba(124, 58, 237, 0.2)',
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: 'rgba(124,58,237,0.2)' }}
      >
        <ShieldCheck size={17} style={{ color: '#a78bfa' }} />
      </div>
      <div>
        <p className="font-semibold text-sm text-white">100% يعمل داخل المتصفح</p>
        <p className="text-xs mt-0.5" style={{ color: '#a1a1aa' }}>
          لا يتم رفع ملفاتك إلى أي سيرفر — جميع العمليات تتم على جهازك مباشرةً.
        </p>
      </div>
    </div>
  );
}
