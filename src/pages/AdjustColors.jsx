import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { adjustColors, downloadBlob } from '../utils/imageUtils';
import { Sliders, Loader2, CheckCircle2 } from 'lucide-react';

export default function AdjustColors() {
  const [files, setFiles] = useState([]);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'ضبط ألوان الصور مجانًا - أدوات دُرّة'; }, []);

  const handleAdjust = async () => {
    if (!files.length) { setError('يرجى اختيار صورة'); return; }
    setStatus('processing'); setError(''); setProgress(0);
    const extFromType = (t) => t === 'image/png' ? 'png' : t === 'image/webp' ? 'webp' : 'jpg';
    for (let i = 0; i < files.length; i++) {
      const blob = await adjustColors(files[i], brightness, contrast, saturation);
      const baseName = files[i].name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `adjusted_${baseName}.${extFromType(files[i].type)}`);
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setStatus('done');
  };

  const sliders = [
    { label: 'السطوع', value: brightness, set: setBrightness, min: 0, max: 200 },
    { label: 'التباين', value: contrast, set: setContrast, min: 0, max: 200 },
    { label: 'التشبع اللوني', value: saturation, set: setSaturation, min: 0, max: 200 },
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">ضبط ألوان الصور</h1>
      <p className="text-gray-600 mb-6">عدِّل السطوع والتباين والتشبع اللوني لصورك.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-5">
        <FileDropzone accept="image/*" multiple onFiles={f => setFiles(prev => [...prev, ...f])} label="اختر الصور" />
        {files.length > 0 && <p className="text-sm text-gray-600">{files.length} صورة مختارة</p>}

        {sliders.map(s => (
          <div key={s.label}>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">{s.label}</label>
              <span className="text-sm text-blue-600 font-medium">{s.value}%</span>
            </div>
            <input type="range" min={s.min} max={s.max} value={s.value}
              onChange={e => s.set(+e.target.value)}
              className="w-full accent-blue-600" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>أقل</span>
              <button onClick={() => s.set(100)} className="text-blue-500 hover:underline">إعادة ضبط</button>
              <span>أكثر</span>
            </div>
          </div>
        ))}
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ الضبط..." />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4 flex items-center gap-2"><CheckCircle2 size={16} /> تم الضبط بنجاح!</div>}

      <button onClick={handleAdjust} disabled={!files.length || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors">
        {status === 'processing' ? <span className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin-icon" /> جارٍ المعالجة...</span> : <span className="flex items-center justify-center gap-2"><Sliders size={18} /> ضبط الألوان</span>}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">ما المعنى بـ 100%؟</h3><p className="text-gray-600 text-sm">100% يعني الصورة الأصلية بدون تغيير. الأرقام أعلى من 100% تزيد القيمة والأقل تخفضها.</p></div>
          <div><h3 className="font-semibold mb-1">كيف أحصل على صورة أكثر حيوية؟</h3><p className="text-gray-600 text-sm">ارفع التباين إلى 120-130% والتشبع اللوني إلى 120% للحصول على ألوان أكثر زخمًا.</p></div>
        </div>
      </section>
    </Layout>
  );
}
