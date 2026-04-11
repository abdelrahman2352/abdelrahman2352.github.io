import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { cropToAspectRatio, downloadBlob } from '../utils/imageUtils';

const RATIOS = [
  { label: '1:1 (مربع)', w: 1, h: 1 },
  { label: '4:3', w: 4, h: 3 },
  { label: '3:4', w: 3, h: 4 },
  { label: '16:9', w: 16, h: 9 },
  { label: '9:16', w: 9, h: 16 },
  { label: '3:2', w: 3, h: 2 },
  { label: '2:3', w: 2, h: 3 },
  { label: '5:4', w: 5, h: 4 },
];

export default function CropImages() {
  const [files, setFiles] = useState([]);
  const [ratio, setRatio] = useState(RATIOS[0]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'قص الصور بنسبة عرض مجانًا - أدوات دُرّة'; }, []);

  const handleCrop = async () => {
    if (!files.length) { setError('يرجى اختيار صورة'); return; }
    setStatus('processing'); setError(''); setProgress(0);
    const extFromType = (t) => t === 'image/png' ? 'png' : t === 'image/webp' ? 'webp' : 'jpg';
    for (let i = 0; i < files.length; i++) {
      const blob = await cropToAspectRatio(files[i], ratio.w, ratio.h);
      const baseName = files[i].name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `cropped_${baseName}.${extFromType(files[i].type)}`);
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setStatus('done');
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">قص الصور بنسبة عرض</h1>
      <p className="text-gray-600 mb-6">اقطع الصورة من المنتصف لتناسب نسبة عرض محددة.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
        <FileDropzone accept="image/*" multiple onFiles={f => setFiles(prev => [...prev, ...f])} label="اختر الصور" />
        {files.length > 0 && <p className="text-sm text-gray-600">{files.length} صورة مختارة</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">نسبة العرض إلى الارتفاع</label>
          <div className="flex flex-wrap gap-2">
            {RATIOS.map(r => (
              <button key={r.label} onClick={() => setRatio(r)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${ratio.label === r.label ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:border-blue-400'}`}>
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ القص..." />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4">✅ تم القص بنجاح!</div>}

      <button onClick={handleCrop} disabled={!files.length || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors">
        {status === 'processing' ? '⏳ جارٍ المعالجة...' : '✂️ قص الصور'}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">كيف يتم القص؟</h3><p className="text-gray-600 text-sm">يتم القص من مركز الصورة لضمان أن الجزء المحتفظ به هو المنتصف.</p></div>
          <div><h3 className="font-semibold mb-1">متى أستخدم 1:1؟</h3><p className="text-gray-600 text-sm">نسبة 1:1 مثالية لصور الملف الشخصي ومنصات مثل إنستغرام.</p></div>
        </div>
      </section>
    </Layout>
  );
}
