import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { imagesToPDF } from '../utils/pdfUtils';
import { downloadBlob } from '../utils/imageUtils';
import { FileImage, Loader2, CheckCircle2 } from 'lucide-react';

export default function ImagesToPDF() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'تحويل الصور إلى PDF مجانًا - أدوات دُرّة'; }, []);

  const handleConvert = async () => {
    if (!files.length) { setError('يرجى اختيار صورة واحدة على الأقل'); return; }
    setStatus('processing'); setError(''); setProgress(10);
    try {
      setProgress(50);
      const pdfBytes = await imagesToPDF(files);
      setProgress(90);
      downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), 'images.pdf');
      setProgress(100); setStatus('done');
    } catch (e) {
      setError('حدث خطأ: ' + e.message);
      setStatus('error');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">تحويل الصور إلى PDF</h1>
      <p className="text-gray-600 mb-6">حوِّل صور JPG وPNG وWebP إلى ملف PDF واحد.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <FileDropzone accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" multiple onFiles={f => setFiles(prev => [...prev, ...f])} label="اختر صورًا (JPG/PNG/WebP)" />
        {files.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {files.map((f, i) => (
              <div key={i} className="relative bg-gray-100 rounded-lg p-2 text-center text-xs text-gray-600">
                <p className="truncate">{f.name}</p>
                <button onClick={() => setFiles(fs => fs.filter((_, j) => j !== i))} className="absolute top-1 left-1 text-red-500 hover:text-red-700 text-xs">✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ التحويل..." />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4 flex items-center gap-2"><CheckCircle2 size={16} /> تم التحويل بنجاح!</div>}

      <button onClick={handleConvert} disabled={!files.length || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors">
        {status === 'processing' ? <span className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin-icon" /> جارٍ المعالجة...</span> : <span className="flex items-center justify-center gap-2"><FileImage size={18} /> تحويل إلى PDF</span>}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">ما الصيغ المدعومة؟</h3><p className="text-gray-600 text-sm">JPG, JPEG, PNG, WebP</p></div>
          <div><h3 className="font-semibold mb-1">هل يمكن إضافة أكثر من صورة؟</h3><p className="text-gray-600 text-sm">نعم، كل صورة ستكون صفحة في ملف PDF الناتج.</p></div>
        </div>
      </section>
    </Layout>
  );
}
