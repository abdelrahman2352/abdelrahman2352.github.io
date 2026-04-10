import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { splitPDF } from '../utils/pdfUtils';
import { downloadBlob } from '../utils/imageUtils';

export default function SplitPDF() {
  const [file, setFile] = useState(null);
  const [rangeInput, setRangeInput] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'تقسيم PDF مجانًا - أدوات دُرّة'; }, []);

  const parseRanges = (input) => {
    return input.split(',').map(s => {
      const trimmed = s.trim();
      const parts = trimmed.split('-');
      if (parts.length === 2) return { start: parseInt(parts[0]), end: parseInt(parts[1]) };
      const n = parseInt(parts[0]);
      return { start: n, end: n };
    }).filter(r => !isNaN(r.start));
  };

  const handleSplit = async () => {
    if (!file) { setError('يرجى اختيار ملف PDF'); return; }
    if (!rangeInput.trim()) { setError('يرجى إدخال نطاقات الصفحات'); return; }
    const ranges = parseRanges(rangeInput);
    if (!ranges.length) { setError('نطاقات غير صالحة'); return; }
    setStatus('processing'); setError(''); setProgress(20);
    try {
      const parts = await splitPDF(file, ranges);
      setProgress(90);
      parts.forEach((bytes, i) => {
        downloadBlob(new Blob([bytes], { type: 'application/pdf' }), `split_part${i + 1}.pdf`);
      });
      setProgress(100); setStatus('done');
    } catch (e) {
      setError('حدث خطأ: ' + e.message);
      setStatus('error');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">تقسيم ملف PDF</h1>
      <p className="text-gray-600 mb-6">قسّم ملف PDF إلى أجزاء حسب نطاقات الصفحات.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
        <FileDropzone accept=".pdf" onFiles={f => setFile(f[0])} label="اختر ملف PDF" />
        {file && <p className="text-sm text-green-600">✅ {file.name}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">نطاقات الصفحات (مثال: 1-3, 4-6, 7)</label>
          <input
            type="text"
            value={rangeInput}
            onChange={e => setRangeInput(e.target.value)}
            placeholder="1-3, 4-6, 7"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-left"
            dir="ltr"
          />
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ التقسيم..." />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4">✅ تم التقسيم بنجاح!</div>}

      <button
        onClick={handleSplit}
        disabled={!file || !rangeInput || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors"
      >
        {status === 'processing' ? '⏳ جارٍ المعالجة...' : '✂️ تقسيم الملف'}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">كيف أقسّم ملف PDF؟</h3><p className="text-gray-600 text-sm">اختر الملف، أدخل نطاقات الصفحات (مثل 1-3, 4-6)، ثم اضغط تقسيم.</p></div>
          <div><h3 className="font-semibold mb-1">ما صيغة إدخال الصفحات؟</h3><p className="text-gray-600 text-sm">استخدم أرقام مفصولة بفاصلة، مثل: 1-3, 4, 5-8</p></div>
        </div>
      </section>
    </Layout>
  );
}
