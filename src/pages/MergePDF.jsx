import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { mergePDFs } from '../utils/pdfUtils';
import { downloadBlob } from '../utils/imageUtils';

export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'دمج PDF مجانًا - أدوات دُرّة'; }, []);

  const handleMerge = async () => {
    if (files.length < 2) { setError('يرجى اختيار ملفين PDF على الأقل'); return; }
    setStatus('processing'); setError(''); setProgress(10);
    try {
      setProgress(50);
      const merged = await mergePDFs(files);
      setProgress(90);
      downloadBlob(new Blob([merged], { type: 'application/pdf' }), 'merged.pdf');
      setProgress(100); setStatus('done');
    } catch (e) {
      setError('حدث خطأ أثناء الدمج: ' + e.message);
      setStatus('error');
    }
  };

  const removeFile = (idx) => setFiles(f => f.filter((_, i) => i !== idx));
  const moveUp = (idx) => {
    if (idx === 0) return;
    const newFiles = [...files];
    [newFiles[idx - 1], newFiles[idx]] = [newFiles[idx], newFiles[idx - 1]];
    setFiles(newFiles);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">دمج ملفات PDF</h1>
      <p className="text-gray-600 mb-6">ادمج عدة ملفات PDF في ملف واحد. يمكنك إعادة ترتيب الملفات قبل الدمج.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-gray-700 mb-4">الخطوة 1: اختر ملفات PDF</h2>
        <FileDropzone accept=".pdf,application/pdf" multiple onFiles={f => setFiles(prev => [...prev, ...f])} label="اسحب ملفات PDF هنا" />

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
                <span className="text-sm text-gray-700">📄 {file.name}</span>
                <div className="flex gap-2">
                  <button onClick={() => moveUp(idx)} disabled={idx === 0} className="text-blue-500 hover:text-blue-700 text-xs disabled:opacity-30">▲ للأعلى</button>
                  <button onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700 text-xs">✕ حذف</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ الدمج..." />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4">✅ تم الدمج بنجاح! تحقق من مجلد التنزيلات.</div>}

      <button
        onClick={handleMerge}
        disabled={files.length < 2 || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors"
      >
        {status === 'processing' ? '⏳ جارٍ المعالجة...' : '🔗 دمج الملفات'}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">كيف أدمج ملفات PDF؟</h3><p className="text-gray-600 text-sm">اختر الملفات، رتّبها كما تريد، ثم اضغط "دمج الملفات".</p></div>
          <div><h3 className="font-semibold mb-1">هل هناك حد لعدد الملفات؟</h3><p className="text-gray-600 text-sm">لا، يمكنك دمج أي عدد من الملفات.</p></div>
          <div><h3 className="font-semibold mb-1">هل الملفات آمنة؟</h3><p className="text-gray-600 text-sm">نعم، كل المعالجة تتم على جهازك فقط.</p></div>
        </div>
      </section>
    </Layout>
  );
}
