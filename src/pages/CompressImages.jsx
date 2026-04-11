import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PrivacyBanner from '../components/PrivacyBanner';
import FileDropzone from '../components/FileDropzone';
import ProgressBar from '../components/ProgressBar';
import { compressImage, downloadBlob } from '../utils/imageUtils';
import { Minimize2, Loader2, CheckCircle2 } from 'lucide-react';

export default function CompressImages() {
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => { document.title = 'ضغط الصور مجانًا - أدوات دُرّة'; }, []);

  const handleCompress = async () => {
    if (!files.length) { setError('يرجى اختيار صورة'); return; }
    setStatus('processing'); setError(''); setProgress(0); setResults([]);
    const newResults = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const compressed = await compressImage(file, quality);
      newResults.push({ original: file, compressed, name: file.name });
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setResults(newResults);
    setStatus('done');
  };

  const formatBytes = (b) => b > 1024 * 1024 ? (b / 1024 / 1024).toFixed(2) + ' MB' : (b / 1024).toFixed(1) + ' KB';

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">ضغط الصور</h1>
      <p className="text-gray-600 mb-6">قلّل حجم الصور مع الحفاظ على الجودة المقبولة.</p>
      <PrivacyBanner />

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 space-y-4">
        <FileDropzone accept="image/*" multiple onFiles={f => setFiles(prev => [...prev, ...f])} label="اختر الصور" />
        {files.length > 0 && <p className="text-sm text-gray-600">{files.length} صورة مختارة</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            مستوى الجودة: {Math.round(quality * 100)}%
          </label>
          <input type="range" min={10} max={100} value={Math.round(quality * 100)}
            onChange={e => setQuality(e.target.value / 100)}
            className="w-full accent-blue-600" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>أكثر ضغطًا</span>
            <span>جودة أعلى</span>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-4">{error}</div>}
      {status === 'processing' && <ProgressBar value={progress} label="جارٍ الضغط..." />}

      {results.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold mb-3">النتائج:</h2>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
                <div className="text-sm">
                  <p className="font-medium">{r.name}</p>
                  <p className="text-gray-500">{formatBytes(r.original.size)} → <span className="text-green-600">{formatBytes(r.compressed.size)}</span>
                    <span className="text-green-600 mr-1">(-{Math.round((1 - r.compressed.size / r.original.size) * 100)}%)</span>
                  </p>
                </div>
                <button onClick={() => downloadBlob(r.compressed, 'compressed_' + r.name)}
                  className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-700">
                  تحميل
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={handleCompress} disabled={!files.length || status === 'processing'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-colors">
        {status === 'processing' ? <span className="flex items-center justify-center gap-2"><Loader2 size={18} className="animate-spin-icon" /> جارٍ الضغط...</span> : <span className="flex items-center justify-center gap-2"><Minimize2 size={18} /> ضغط الصور</span>}
      </button>

      <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          <div><h3 className="font-semibold mb-1">ما مستوى الجودة الموصى به؟</h3><p className="text-gray-600 text-sm">70-80% عادةً يوفر توازنًا جيدًا بين الحجم والجودة.</p></div>
          <div><h3 className="font-semibold mb-1">ما الصيغ المدعومة؟</h3><p className="text-gray-600 text-sm">JPG, PNG, WebP وأغلب صيغ الصور الشائعة.</p></div>
        </div>
      </section>
    </Layout>
  );
}
