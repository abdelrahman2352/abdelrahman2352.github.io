import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { resizeImage, downloadBlob } from '../utils/imageUtils';

export default function ResizeImages() {
  const [files, setFiles] = useState([]);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [keepAspect, setKeepAspect] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'تغيير حجم الصور مجانًا - أدوات دُرّة'; }, []);

  const handleResize = async () => {
    if (!files.length) { setError('يرجى اختيار صورة'); return; }
    if (!width && !height) { setError('يرجى إدخال العرض أو الارتفاع'); return; }
    setStatus('processing'); setError(''); setProgress(0);
    for (let i = 0; i < files.length; i++) {
      const blob = await resizeImage(files[i], parseInt(width) || 0, parseInt(height) || 0, keepAspect);
      const baseName = files[i].name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `resized_${baseName}.${extFromType(files[i].type)}`);
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setStatus('done');
  };

  const extFromType = (t) => t === 'image/png' ? 'png' : t === 'image/webp' ? 'webp' : 'jpg';

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">تغيير حجم الصور</h1>
      <p className="text-gray-600 mb-6">غيّر أبعاد الصور إلى حجم محدد مع الحفاظ على النسب.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
        <FileDropzone accept="image/*" multiple onFiles={f => setFiles(prev => [...prev, ...f])} label="اختر الصور" />
        {files.length > 0 && <p className="text-sm text-gray-600">{files.length} صورة مختارة</p>}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">العرض (بكسل)</label>
            <input type="number" min="1" value={width} onChange={e => setWidth(e.target.value)} placeholder="مثال: 800"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الارتفاع (بكسل)</label>
            <input type="number" min="1" value={height} onChange={e => setHeight(e.target.value)} placeholder="مثال: 600"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input type="checkbox" checked={keepAspect} onChange={e => setKeepAspect(e.target.checked)} className="accent-blue-600" />
          الحفاظ على نسب الأبعاد
        </label>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ تغيير الحجم..." />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4">✅ تم تغيير الحجم بنجاح!</div>}

      <button onClick={handleResize} disabled={!files.length || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors">
        {status === 'processing' ? '⏳ جارٍ المعالجة...' : '📐 تغيير الحجم'}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">هل يمكن تغيير حجم أكثر من صورة؟</h3><p className="text-gray-600 text-sm">نعم، يمكنك اختيار عدة صور وتغيير حجمها دفعةً واحدة.</p></div>
          <div><h3 className="font-semibold mb-1">ماذا يعني الحفاظ على نسب الأبعاد؟</h3><p className="text-gray-600 text-sm">يعني أن الصورة لن تتشوه؛ إذا أدخلت العرض فقط سيُحسب الارتفاع تلقائيًا والعكس.</p></div>
        </div>
      </section>
    </Layout>
  );
}
