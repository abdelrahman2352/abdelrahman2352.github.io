import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { convertImageFormat, downloadBlob } from '../utils/imageUtils';

export default function ConvertImages() {
  const [files, setFiles] = useState([]);
  const [targetFormat, setTargetFormat] = useState('image/jpeg');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'تحويل صيغ الصور مجانًا - أدوات دُرّة'; }, []);

  const formatExt = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };

  const handleConvert = async () => {
    if (!files.length) { setError('يرجى اختيار صورة'); return; }
    setStatus('processing'); setError(''); setProgress(0);
    const ext = formatExt[targetFormat];
    for (let i = 0; i < files.length; i++) {
      const blob = await convertImageFormat(files[i], targetFormat);
      const baseName = files[i].name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `${baseName}.${ext}`);
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setStatus('done');
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">تحويل صيغ الصور</h1>
      <p className="text-gray-600 mb-6">حوِّل الصور بين JPG وPNG وWebP بسهولة.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
        <FileDropzone accept="image/*" multiple onFiles={f => setFiles(prev => [...prev, ...f])} label="اختر الصور" />
        {files.length > 0 && <p className="text-sm text-gray-600">{files.length} صورة مختارة</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">تحويل إلى</label>
          <div className="flex gap-3">
            {[{v: 'image/jpeg', l: 'JPG'}, {v: 'image/png', l: 'PNG'}, {v: 'image/webp', l: 'WebP'}].map(opt => (
              <button key={opt.v} onClick={() => setTargetFormat(opt.v)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${targetFormat === opt.v ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:border-blue-400'}`}>
                {opt.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ التحويل..." />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4">✅ تم التحويل بنجاح!</div>}

      <button onClick={handleConvert} disabled={!files.length || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors">
        {status === 'processing' ? '⏳ جارٍ التحويل...' : '🔁 تحويل الصور'}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">ما الصيغ المدعومة؟</h3><p className="text-gray-600 text-sm">JPG, PNG, WebP والتحويل بينها في كل الاتجاهات.</p></div>
          <div><h3 className="font-semibold mb-1">هل تُفقد الجودة؟</h3><p className="text-gray-600 text-sm">يتم التحويل بجودة عالية (90%). PNG يدعم الشفافية وتحويله إلى JPG يفقد الشفافية.</p></div>
        </div>
      </section>
    </Layout>
  );
}
