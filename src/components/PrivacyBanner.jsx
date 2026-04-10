export default function PrivacyBanner() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3 text-green-800">
      <span className="text-2xl">🔒</span>
      <div>
        <p className="font-semibold">100% يعمل داخل المتصفح</p>
        <p className="text-sm">لا يتم رفع ملفاتك إلى أي سيرفر — جميع العمليات تتم على جهازك مباشرةً.</p>
      </div>
    </div>
  );
}
