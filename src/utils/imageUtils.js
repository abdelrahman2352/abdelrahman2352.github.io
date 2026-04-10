import imageCompression from 'browser-image-compression';

export async function compressImage(file, quality = 0.7) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 4096,
    useWebWorker: true,
    fileType: file.type,
    initialQuality: quality,
  };
  return imageCompression(file, options);
}

export async function convertImageFormat(file, targetFormat) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('فشل إنشاء blob أثناء تحويل الصورة إلى الصيغة المطلوبة'));
    }, targetFormat, 0.9);
  });
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob instanceof Blob ? blob : new Blob([blob]));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
