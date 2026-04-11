import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { convertToGrayscale, downloadBlob } from '../utils/imageUtils';
import { Contrast, Loader2, CheckCircle2 } from 'lucide-react';

export default function GrayscaleImages() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'تحويل الصور إلى رمادي مجانًا - أدوات دُرّة'; }, []);

  const handleGrayscale = async () => {
    if (!files.length) { setError('يرجى اختيار صورة'); return; }
    setStatus('processing'); setError(''); setProgress(0);
    const extFromType = (t) => t === 'image/png' ? 'png' : t === 'image/webp' ? 'webp' : 'jpg';
    for (let i = 0; i < files.length; i++) {
      const blob = await convertToGrayscale(files[i]);
      const baseName = files[i].name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `grayscale_${baseName}.${extFromType(files[i].type)}`);
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setStatus('done');
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">تحويل الصور إلى رمادي</h1>
      <p className="text-gray-600 mb-6">حوِّل صورك الملونة إلى أبيض وأسود بنقرة واحدة.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <FileDropzone accept="image/*" multiple onFiles={f => setFiles(prev => [...prev, ...f])} label="اختر الصور" />
        {files.length > 0 && (
          <p className="text-sm text-gray-600 mt-3">{files.length} صورة مختارة</p>
        )}
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ التحويل..." />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4 flex items-center gap-2"><CheckCircle2 size={16} /> تم التحويل بنجاح!</div>}

      <button onClick={handleGrayscale} disabled={!files.length || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors">
        {status === 'processing' ? <span className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin-icon" /> جارٍ التحويل...</span> : <span className="flex items-center justify-center gap-2"><Contrast size={18} /> تحويل إلى رمادي</span>}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">هل تُحفظ الصورة الأصلية؟</h3><p className="text-gray-600 text-sm">نعم، يتم تنزيل نسخة جديدة بالألوان الرمادية دون المساس بالصورة الأصلية على جهازك.</p></div>
          <div><h3 className="font-semibold mb-1">ما الصيغ المدعومة؟</h3><p className="text-gray-600 text-sm">JPG, PNG, WebP وأغلب صيغ الصور الشائعة.</p></div>
        </div>
      </section>
    </Layout>
  );
}
