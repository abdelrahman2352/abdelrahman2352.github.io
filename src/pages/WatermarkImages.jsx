import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { addWatermark, downloadBlob } from '../utils/imageUtils';
import { Droplets, Loader2, CheckCircle2 } from 'lucide-react';

const POSITIONS = [
  { v: 'bottom-right', l: 'أسفل يسار' },
  { v: 'bottom-left', l: 'أسفل يمين' },
  { v: 'top-right', l: 'أعلى يسار' },
  { v: 'top-left', l: 'أعلى يمين' },
  { v: 'center', l: 'المنتصف' },
];

export default function WatermarkImages() {
  const [files, setFiles] = useState([]);
  const [text, setText] = useState('');
  const [position, setPosition] = useState('bottom-right');
  const [opacity, setOpacity] = useState(50);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'إضافة علامة مائية للصور مجانًا - أدوات دُرّة'; }, []);

  const handleWatermark = async () => {
    if (!files.length) { setError('يرجى اختيار صورة'); return; }
    if (!text.trim()) { setError('يرجى كتابة نص العلامة المائية'); return; }
    setStatus('processing'); setError(''); setProgress(0);
    const extFromType = (t) => t === 'image/png' ? 'png' : t === 'image/webp' ? 'webp' : 'jpg';
    for (let i = 0; i < files.length; i++) {
      const blob = await addWatermark(files[i], text, position, opacity / 100, null);
      const baseName = files[i].name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `watermarked_${baseName}.${extFromType(files[i].type)}`);
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setStatus('done');
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">إضافة علامة مائية</h1>
      <p className="text-gray-600 mb-6">أضف نصًا كعلامة مائية على صورك بسرعة.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
        <FileDropzone accept="image/*" multiple onFiles={f => setFiles(prev => [...prev, ...f])} label="اختر الصور" />
        {files.length > 0 && <p className="text-sm text-gray-600">{files.length} صورة مختارة</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">نص العلامة المائية</label>
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="مثال: © أدوات دُرّة 2026"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">الموضع</label>
          <div className="flex flex-wrap gap-2">
            {POSITIONS.map(p => (
              <button key={p.v} onClick={() => setPosition(p.v)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${position === p.v ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:border-blue-400'}`}>
                {p.l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">الشفافية: {opacity}%</label>
          <input type="range" min={10} max={100} value={opacity} onChange={e => setOpacity(+e.target.value)}
            className="w-full accent-blue-600" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>شفاف أكثر</span>
            <span>واضح أكثر</span>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ الإضافة..." />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4 flex items-center gap-2"><CheckCircle2 size={16} /> تمت الإضافة بنجاح!</div>}

      <button onClick={handleWatermark} disabled={!files.length || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors">
        {status === 'processing' ? <span className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin-icon" /> جارٍ المعالجة...</span> : <span className="flex items-center justify-center gap-2"><Droplets size={18} /> إضافة العلامة المائية</span>}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">هل يمكن إضافة رموز عربية؟</h3><p className="text-gray-600 text-sm">نعم، يدعم الأداة النصوص العربية والإنجليزية والرموز.</p></div>
          <div><h3 className="font-semibold mb-1">ما الشفافية الأنسب؟</h3><p className="text-gray-600 text-sm">30-50% تعطي علامة مائية واضحة دون إخفاء الصورة كليًا.</p></div>
        </div>
      </section>
    </Layout>
  );
}
