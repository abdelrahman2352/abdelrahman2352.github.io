import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { deletePages } from '../utils/pdfUtils';
import { downloadBlob } from '../utils/imageUtils';

export default function DeletePagesPDF() {
  const [file, setFile] = useState(null);
  const [pageInput, setPageInput] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'حذف صفحات PDF مجانًا - أدوات دُرّة'; }, []);

  const parsePages = (input) => {
    return input.split(',').flatMap(s => {
      const trimmed = s.trim();
      const parts = trimmed.split('-');
      if (parts.length === 2) {
        const arr = [];
        for (let i = parseInt(parts[0]); i <= parseInt(parts[1]); i++) arr.push(i);
        return arr;
      }
      return [parseInt(trimmed)];
    }).filter(n => !isNaN(n));
  };

  const handleDelete = async () => {
    if (!file) { setError('يرجى اختيار ملف PDF'); return; }
    const pages = parsePages(pageInput);
    if (!pages.length) { setError('يرجى إدخال أرقام الصفحات المراد حذفها'); return; }
    setStatus('processing'); setError(''); setProgress(20);
    try {
      const result = await deletePages(file, pages);
      setProgress(90);
      downloadBlob(new Blob([result], { type: 'application/pdf' }), 'edited.pdf');
      setProgress(100); setStatus('done');
    } catch (e) {
      setError('حدث خطأ: ' + e.message);
      setStatus('error');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">حذف صفحات PDF</h1>
      <p className="text-gray-600 mb-6">احذف صفحات محددة من ملف PDF.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
        <FileDropzone accept=".pdf" onFiles={f => setFile(f[0])} label="اختر ملف PDF" />
        {file && <p className="text-sm text-green-600">✅ {file.name}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">أرقام الصفحات المراد حذفها (مثال: 2, 4, 6-8)</label>
          <input type="text" value={pageInput} onChange={e => setPageInput(e.target.value)}
            placeholder="2, 4, 6-8" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-left" dir="ltr" />
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ الحذف..." />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4">✅ تمت العملية بنجاح!</div>}

      <button onClick={handleDelete} disabled={!file || !pageInput || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors">
        {status === 'processing' ? '⏳ جارٍ المعالجة...' : '🗑️ حذف الصفحات'}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">كيف أحذف صفحات من PDF؟</h3><p className="text-gray-600 text-sm">اختر الملف، أدخل أرقام الصفحات المراد حذفها، ثم اضغط حذف الصفحات.</p></div>
          <div><h3 className="font-semibold mb-1">هل يمكن حذف نطاق من الصفحات؟</h3><p className="text-gray-600 text-sm">نعم، مثل: 3-7 لحذف الصفحات من 3 إلى 7.</p></div>
        </div>
      </section>
    </Layout>
  );
}
