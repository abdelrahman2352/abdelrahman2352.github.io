import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { fitToAspectRatio, downloadBlob } from '../utils/imageUtils';
import { LayoutTemplate, Loader2, CheckCircle2 } from 'lucide-react';

const RATIOS = [
  { label: '1:1 (مربع)', w: 1, h: 1 },
  { label: '4:3', w: 4, h: 3 },
  { label: '3:4', w: 3, h: 4 },
  { label: '16:9', w: 16, h: 9 },
  { label: '9:16', w: 9, h: 16 },
  { label: '3:2', w: 3, h: 2 },
  { label: '2:3', w: 2, h: 3 },
  { label: '21:9', w: 21, h: 9 },
];

export default function AspectRatioFitter() {
  const [files, setFiles] = useState([]);
  const [ratio, setRatio] = useState(RATIOS[0]);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'ضبط نسبة العرض للصور مجانًا - أدوات دُرّة'; }, []);

  const handleFit = async () => {
    if (!files.length) { setError('يرجى اختيار صورة'); return; }
    setStatus('processing'); setError(''); setProgress(0);
    const extFromType = (t) => t === 'image/png' ? 'png' : t === 'image/webp' ? 'webp' : 'jpg';
    for (let i = 0; i < files.length; i++) {
      const blob = await fitToAspectRatio(files[i], ratio.w, ratio.h, bgColor);
      const baseName = files[i].name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `fitted_${baseName}.${extFromType(files[i].type)}`);
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setStatus('done');
  };

  const presetColors = ['#ffffff', '#000000', '#f3f4f6', '#1e293b', '#ef4444', '#3b82f6'];

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">ضبط نسبة العرض</h1>
      <p className="text-gray-600 mb-6">احشو الصورة في نسبة عرض محددة بإضافة خلفية ملونة (Letterbox/Pillarbox).</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
        <FileDropzone accept="image/*" multiple onFiles={f => setFiles(prev => [...prev, ...f])} label="اختر الصور" />
        {files.length > 0 && <p className="text-sm text-gray-600">{files.length} صورة مختارة</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">النسبة المستهدفة</label>
          <div className="flex flex-wrap gap-2">
            {RATIOS.map(r => (
              <button key={r.label} onClick={() => setRatio(r)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${ratio.label === r.label ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:border-blue-400'}`}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">لون الخلفية</label>
          <div className="flex flex-wrap gap-2 items-center">
            {presetColors.map(c => (
              <button key={c} onClick={() => setBgColor(c)}
                style={{ backgroundColor: c }}
                className={`w-8 h-8 rounded-full border-2 transition-all ${bgColor === c ? 'border-blue-600 scale-110' : 'border-gray-300'}`} />
            ))}
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border border-gray-300" title="لون مخصص" />
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ المعالجة..." />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4 flex items-center gap-2"><CheckCircle2 size={16} /> تمت المعالجة بنجاح!</div>}

      <button onClick={handleFit} disabled={!files.length || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors">
        {status === 'processing' ? <span className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin-icon" /> جارٍ المعالجة...</span> : <span className="flex items-center justify-center gap-2"><LayoutTemplate size={18} /> ضبط نسبة العرض</span>}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">ما الفرق بين هذه الأداة والقص؟</h3><p className="text-gray-600 text-sm">بدلًا من قص أجزاء من الصورة، تضيف هذه الأداة أشرطة (letterbox أو pillarbox) من الخلفية للوصول للنسبة المطلوبة مع الاحتفاظ بالصورة كاملة.</p></div>
          <div><h3 className="font-semibold mb-1">متى أستخدمها؟</h3><p className="text-gray-600 text-sm">مثالية لتوحيد نسبة صور متعددة قبل رفعها على منصات تشترط نسبة محددة.</p></div>
        </div>
      </section>
    </Layout>
  );
}
