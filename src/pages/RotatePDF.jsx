import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { rotatePages } from '../utils/pdfUtils';
import { downloadBlob } from '../utils/imageUtils';
import { RotateCw, Loader2, CheckCircle2 } from 'lucide-react';

export default function RotatePDF() {
  const [file, setFile] = useState(null);
  const [rotation, setRotation] = useState(90);
  const [scope, setScope] = useState('all');
  const [pageInput, setPageInput] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'تدوير PDF مجانًا - أدوات دُرّة'; }, []);

  const parsePages = (input) => {
    return input.split(',').flatMap(s => {
      const parts = s.trim().split('-');
      if (parts.length === 2) {
        const arr = [];
        for (let i = parseInt(parts[0]); i <= parseInt(parts[1]); i++) arr.push(i);
        return arr;
      }
      return [parseInt(s.trim())];
    }).filter(n => !isNaN(n));
  };

  const handleRotate = async () => {
    if (!file) { setError('يرجى اختيار ملف PDF'); return; }
    const pages = scope === 'all' ? 'all' : parsePages(pageInput);
    setStatus('processing'); setError(''); setProgress(20);
    try {
      const result = await rotatePages(file, pages, rotation);
      setProgress(90);
      downloadBlob(new Blob([result], { type: 'application/pdf' }), 'rotated.pdf');
      setProgress(100); setStatus('done');
    } catch (e) {
      setError('حدث خطأ: ' + e.message);
      setStatus('error');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">تدوير صفحات PDF</h1>
      <p className="text-gray-600 mb-6">دوِّر صفحات PDF يمينًا أو يسارًا.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
        <FileDropzone accept=".pdf" onFiles={f => setFile(f[0])} label="اختر ملف PDF" />
        {file && <p className="text-sm text-green-600 flex items-center gap-1"><CheckCircle2 size={13} /> {file.name}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">اتجاه التدوير</label>
          <div className="flex gap-3 flex-wrap">
            {[{v: 90, l: '90° يمين'}, {v: 180, l: '180°'}, {v: 270, l: '90° يسار'}].map(opt => (
              <button key={opt.v} onClick={() => setRotation(opt.v)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${rotation === opt.v ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:border-blue-400'}`}>
                {opt.l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">نطاق الصفحات</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2"><input type="radio" value="all" checked={scope === 'all'} onChange={() => setScope('all')} /> كل الصفحات</label>
            <label className="flex items-center gap-2"><input type="radio" value="custom" checked={scope === 'custom'} onChange={() => setScope('custom')} /> صفحات محددة</label>
          </div>
          {scope === 'custom' && (
            <input type="text" value={pageInput} onChange={e => setPageInput(e.target.value)}
              placeholder="1, 3, 5-7" className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 text-left" dir="ltr" />
          )}
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ التدوير..." />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4 flex items-center gap-2"><CheckCircle2 size={16} /> تم التدوير بنجاح!</div>}

      <button onClick={handleRotate} disabled={!file || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors">
        {status === 'processing' ? <span className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin-icon" /> جارٍ المعالجة...</span> : <span className="flex items-center justify-center gap-2"><RotateCw size={18} /> تدوير الصفحات</span>}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">هل يمكن تدوير صفحة واحدة فقط؟</h3><p className="text-gray-600 text-sm">نعم، اختر "صفحات محددة" وأدخل رقم الصفحة.</p></div>
        </div>
      </section>
    </Layout>
  );
}
