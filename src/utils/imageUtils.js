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

export async function resizeImage(file, width, height, keepAspect = true) {
  const bitmap = await createImageBitmap(file);
  let targetW = width;
  let targetH = height;
  if (keepAspect && width && height) {
    const ratio = bitmap.width / bitmap.height;
    if (width / height > ratio) { targetW = Math.round(height * ratio); }
    else { targetH = Math.round(width / ratio); }
  } else if (!height) {
    targetH = Math.round((width / bitmap.width) * bitmap.height);
  } else if (!width) {
    targetW = Math.round((height / bitmap.height) * bitmap.width);
  }
  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0, targetW, targetH);
  return canvasToBlob(canvas, file.type);
}

export async function cropToAspectRatio(file, ratioW, ratioH) {
  const bitmap = await createImageBitmap(file);
  const srcW = bitmap.width;
  const srcH = bitmap.height;
  const targetRatio = ratioW / ratioH;
  const srcRatio = srcW / srcH;
  let cropW, cropH, offsetX, offsetY;
  if (srcRatio > targetRatio) {
    cropH = srcH;
    cropW = Math.round(srcH * targetRatio);
    offsetX = Math.round((srcW - cropW) / 2);
    offsetY = 0;
  } else {
    cropW = srcW;
    cropH = Math.round(srcW / targetRatio);
    offsetX = 0;
    offsetY = Math.round((srcH - cropH) / 2);
  }
  const canvas = document.createElement('canvas');
  canvas.width = cropW;
  canvas.height = cropH;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, offsetX, offsetY, cropW, cropH, 0, 0, cropW, cropH);
  return canvasToBlob(canvas, file.type);
}

export async function rotateFlipImage(file, degrees, flipH, flipV) {
  const bitmap = await createImageBitmap(file);
  const rad = (degrees * Math.PI) / 180;
  const rotated90 = degrees % 180 !== 0;
  const outW = rotated90 ? bitmap.height : bitmap.width;
  const outH = rotated90 ? bitmap.width : bitmap.height;
  const canvas = document.createElement('canvas');
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext('2d');
  ctx.translate(outW / 2, outH / 2);
  if (flipH) ctx.scale(-1, 1);
  if (flipV) ctx.scale(1, -1);
  ctx.rotate(rad);
  ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);
  return canvasToBlob(canvas, file.type);
}

export async function addWatermark(file, text, position, opacity, fontSize) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0);
  const size = fontSize || Math.round(Math.max(bitmap.width, bitmap.height) * 0.05);
  ctx.font = `bold ${size}px Cairo, Arial`;
  ctx.globalAlpha = opacity ?? 0.5;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = size * 0.06;
  const metrics = ctx.measureText(text);
  const tw = metrics.width;
  const th = size;
  const pad = size * 0.5;
  const positions = {
    'top-right': [pad, pad + th],
    'top-left': [bitmap.width - tw - pad, pad + th],
    'bottom-right': [pad, bitmap.height - pad],
    'bottom-left': [bitmap.width - tw - pad, bitmap.height - pad],
    'center': [(bitmap.width - tw) / 2, (bitmap.height + th) / 2],
  };
  const [x, y] = positions[position] || positions['bottom-right'];
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1;
  return canvasToBlob(canvas, file.type);
}

export async function addBorder(file, borderSize, color) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width + borderSize * 2;
  canvas.height = bitmap.height + borderSize * 2;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color || '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, borderSize, borderSize);
  return canvasToBlob(canvas, file.type);
}

export async function adjustColors(file, brightness, contrast, saturation) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  const filters = [];
  if (brightness !== 100) filters.push(`brightness(${brightness}%)`);
  if (contrast !== 100) filters.push(`contrast(${contrast}%)`);
  if (saturation !== 100) filters.push(`saturate(${saturation}%)`);
  ctx.filter = filters.join(' ') || 'none';
  ctx.drawImage(bitmap, 0, 0);
  return canvasToBlob(canvas, file.type);
}

export async function convertToGrayscale(file) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  ctx.filter = 'grayscale(100%)';
  ctx.drawImage(bitmap, 0, 0);
  return canvasToBlob(canvas, file.type);
}

export async function fitToAspectRatio(file, ratioW, ratioH, bgColor) {
  const bitmap = await createImageBitmap(file);
  const targetRatio = ratioW / ratioH;
  const srcRatio = bitmap.width / bitmap.height;
  let outW, outH;
  if (srcRatio > targetRatio) {
    outW = bitmap.width;
    outH = Math.round(bitmap.width / targetRatio);
  } else {
    outH = bitmap.height;
    outW = Math.round(bitmap.height * targetRatio);
  }
  const canvas = document.createElement('canvas');
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = bgColor || '#ffffff';
  ctx.fillRect(0, 0, outW, outH);
  const offsetX = Math.round((outW - bitmap.width) / 2);
  const offsetY = Math.round((outH - bitmap.height) / 2);
  ctx.drawImage(bitmap, offsetX, offsetY);
  return canvasToBlob(canvas, file.type);
}

function canvasToBlob(canvas, type) {
  const mimeType = type === 'image/png' ? 'image/png' : type === 'image/webp' ? 'image/webp' : 'image/jpeg';
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('فشل إنشاء blob'));
    }, mimeType, 0.92);
  });
}
