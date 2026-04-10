import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { downloadBlob } from '../utils/imageUtils';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).href;

export default function PDFToJPG() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('image/jpeg');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => { document.title = 'تحويل PDF إلى صور مجانًا - أدوات دُرّة'; }, []);

  const handleFileSelect = async (files) => {
    const f = files[0];
    setFile(f);
    const bytes = await f.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
    setPageCount(pdf.numPages);
  };

  const handleConvert = async () => {
    if (!file) { setError('يرجى اختيار ملف PDF'); return; }
    setStatus('processing'); setError(''); setProgress(5);
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const total = pdf.numPages;
      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;
        const ext = format === 'image/jpeg' ? 'jpg' : 'png';
        await new Promise(resolve => {
          canvas.toBlob(blob => {
            downloadBlob(blob, `page_${i}.${ext}`);
            resolve();
          }, format, 0.92);
        });
        setProgress(Math.round((i / total) * 100));
      }
      setStatus('done');
    } catch (e) {
      setError('حدث خطأ: ' + e.message);
      setStatus('error');
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">تحويل PDF إلى صور</h1>
      <p className="text-gray-600 mb-6">صدِّر كل صفحة من PDF كصورة JPG أو PNG عالية الجودة.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
        <FileDropzone accept=".pdf" onFiles={handleFileSelect} label="اختر ملف PDF" />
        {file && <p className="text-sm text-green-600">✅ {file.name} ({pageCount} صفحة)</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">صيغة الإخراج</label>
          <div className="flex gap-3">
            {[{v: 'image/jpeg', l: 'JPG'}, {v: 'image/png', l: 'PNG'}].map(opt => (
              <button key={opt.v} onClick={() => setFormat(opt.v)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${format === opt.v ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:border-blue-400'}`}>
                {opt.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label={`جارٍ التحويل... صفحة ${Math.ceil(progress / 100 * pageCount)} من ${pageCount}`} />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4">✅ تم التحويل بنجاح!</div>}

      <button onClick={handleConvert} disabled={!file || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors">
        {status === 'processing' ? '⏳ جارٍ المعالجة...' : '📸 تحويل إلى صور'}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">هل جودة الصور عالية؟</h3><p className="text-gray-600 text-sm">نعم، يتم التصدير بدقة مضاعفة (2x) لضمان جودة عالية.</p></div>
          <div><h3 className="font-semibold mb-1">هل يتم تحويل جميع الصفحات؟</h3><p className="text-gray-600 text-sm">نعم، كل صفحة تُحفظ كصورة منفصلة.</p></div>
        </div>
      </section>
    </Layout>
  );
}
