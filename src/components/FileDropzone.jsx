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
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
        dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 bg-white'
      }`}
    >
      <div className="text-4xl mb-3">📁</div>
      <p className="text-gray-600 font-medium">{label || 'اسحب الملفات هنا أو انقر للاختيار'}</p>
      <p className="text-gray-400 text-sm mt-1">أو انقر لتصفح الملفات</p>
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
