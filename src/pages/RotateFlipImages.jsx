import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { rotateFlipImage, downloadBlob } from '../utils/imageUtils';

export default function RotateFlipImages() {
  const [files, setFiles] = useState([]);
  const [degrees, setDegrees] = useState(90);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => { document.title = 'تدوير وقلب الصور مجانًا - أدوات دُرّة'; }, []);

  const handleProcess = async () => {
    if (!files.length) { setError('يرجى اختيار صورة'); return; }
    setStatus('processing'); setError(''); setProgress(0);
    const extFromType = (t) => t === 'image/png' ? 'png' : t === 'image/webp' ? 'webp' : 'jpg';
    for (let i = 0; i < files.length; i++) {
      const blob = await rotateFlipImage(files[i], degrees, flipH, flipV);
      const baseName = files[i].name.replace(/\.[^.]+$/, '');
      downloadBlob(blob, `rotated_${baseName}.${extFromType(files[i].type)}`);
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setStatus('done');
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">تدوير وقلب الصور</h1>
      <p className="text-gray-600 mb-6">دوِّر أو اقلب صورك بأي اتجاه.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-5">
        <FileDropzone accept="image/*" multiple onFiles={f => setFiles(prev => [...prev, ...f])} label="اختر الصور" />
        {files.length > 0 && <p className="text-sm text-gray-600">{files.length} صورة مختارة</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">زاوية التدوير</label>
          <div className="flex flex-wrap gap-2">
            {[0, 90, 180, 270].map(d => (
              <button key={d} onClick={() => setDegrees(d)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${degrees === d ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:border-blue-400'}`}>
                {d}°
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" checked={flipH} onChange={e => setFlipH(e.target.checked)} className="accent-blue-600" />
            قلب أفقي ↔
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" checked={flipV} onChange={e => setFlipV(e.target.checked)} className="accent-blue-600" />
            قلب رأسي ↕
          </label>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ المعالجة..." />}
      {status === 'done' && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4">✅ تمت المعالجة بنجاح!</div>}

      <button onClick={handleProcess} disabled={!files.length || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors">
        {status === 'processing' ? '⏳ جارٍ المعالجة...' : '🔄 تدوير / قلب الصور'}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">هل يمكن الجمع بين التدوير والقلب؟</h3><p className="text-gray-600 text-sm">نعم، يمكنك اختيار زاوية تدوير وتفعيل القلب في نفس الوقت.</p></div>
          <div><h3 className="font-semibold mb-1">ما الفرق بين القلب الأفقي والرأسي؟</h3><p className="text-gray-600 text-sm">القلب الأفقي يعكس الصورة يمينًا ويسارًا، والرأسي يعكسها أعلى وأسفل.</p></div>
        </div>
      </section>
    </Layout>
  );
}
