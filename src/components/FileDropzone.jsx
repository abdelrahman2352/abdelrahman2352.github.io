import { useRef, useState } from 'react';

export default function FileDropzone({ accept, multiple = false, onFiles, label }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFiles(files);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      className="rounded-xl p-10 text-center cursor-pointer transition-all duration-200"
      style={{
        border: dragging
          ? '2px dashed #7c3aed'
          : '2px dashed rgba(255,255,255,0.12)',
        background: dragging ? 'rgba(124,58,237,0.07)' : 'rgba(255,255,255,0.02)',
        boxShadow: dragging ? '0 0 20px rgba(124,58,237,0.15)' : 'none',
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4"
        style={{ background: 'rgba(124,58,237,0.15)' }}
      >
        📁
      </div>
      <p className="font-semibold text-white text-sm">{label || 'اسحب الملفات هنا أو انقر للاختيار'}</p>
      <p className="text-xs mt-1.5" style={{ color: '#52525b' }}>أو انقر لتصفح الملفات</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => onFiles(Array.from(e.target.files))}
      />
    </div>
  );
}
