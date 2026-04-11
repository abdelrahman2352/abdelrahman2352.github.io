import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { addBorder, downloadBlob } from '../utils/imageUtils';

export default function BorderImages() {
  const [files, setFiles] = useState([]);
  const [borderSize, setBorderSize] = useState(20);
  const [color, setColor] = useState('#ffffff');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'إضافة إطار للصور مجانًا - أدوات دُرّة'; }, []);

  const handleBorder = async () => {
    if (!files.length) { setError('يرجى اختيار صورة'); return; }
    setStatus('processing'); setError(''); setProgress(0);
    const extFromType = (t) => t === 'image/png' ? 'png' : t === 'image/webp' ? 'webp' : 'jpg';
    for (let i = 0; i < files.length; i++) {
      const blob = await addBorder(files[i], borderSize, color);
      const baseName = files[i].name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `bordered_${baseName}.${extFromType(files[i].type)}`);
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setStatus('done');
  };

  const presetColors = ['#ffffff', '#000000', '#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">إضافة إطار للصور</h1>
      <p className="text-gray-600 mb-6">أضف إطارًا ملونًا حول صورك.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
        <FileDropzone accept="image/*" multiple onFiles={f => setFiles(prev => [...prev, ...f])} label="اختر الصور" />
        {files.length > 0 && <p className="text-sm text-gray-600">{files.length} صورة مختارة</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">سماكة الإطار: {borderSize} بكسل</label>
          <input type="range" min={1} max={200} value={borderSize} onChange={e => setBorderSize(+e.target.value)}
            className="w-full accent-blue-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">لون الإطار</label>
          <div className="flex flex-wrap gap-2 items-center">
            {presetColors.map(c => (
              <button key={c} onClick={() => setColor(c)}
                style={{ backgroundColor: c }}
                className={`w-8 h-8 rounded-full border-2 transition-all ${color === c ? 'border-blue-600 scale-110' : 'border-gray-300'}`} />
            ))}
            <input type="color" value={color} onChange={e => setColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border border-gray-300" title="لون مخصص" />
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ الإضافة..." />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4">✅ تمت الإضافة بنجاح!</div>}

      <button onClick={handleBorder} disabled={!files.length || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors">
        {status === 'processing' ? '⏳ جارٍ المعالجة...' : '🖼️ إضافة الإطار'}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">هل يمكن اختيار لون مخصص؟</h3><p className="text-gray-600 text-sm">نعم، انقر على مربع اللون في آخر الصف لاختيار أي لون تريده.</p></div>
          <div><h3 className="font-semibold mb-1">هل يتغير حجم الصورة بعد الإطار؟</h3><p className="text-gray-600 text-sm">نعم، يُضاف الإطار للمحيط فيزيد العرض والارتفاع بمقدار ضعف سماكة الإطار.</p></div>
        </div>
      </section>
    </Layout>
  );
}
