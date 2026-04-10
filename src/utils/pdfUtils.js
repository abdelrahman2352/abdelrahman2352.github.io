import { PDFDocument, degrees } from 'pdf-lib';

export async function mergePDFs(files) {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const doc = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    pages.forEach(page => merged.addPage(page));
  }
  return merged.save();
}

export async function splitPDF(file, ranges) {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const results = [];
  for (const range of ranges) {
    const newDoc = await PDFDocument.create();
    const indices = [];
    for (let i = range.start - 1; i < range.end && i < doc.getPageCount(); i++) {
      indices.push(i);
    }
    const pages = await newDoc.copyPages(doc, indices);
    pages.forEach(p => newDoc.addPage(p));
    results.push(await newDoc.save());
  }
  return results;
}

export async function deletePages(file, pageNumbers) {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const total = doc.getPageCount();
  const newDoc = await PDFDocument.create();
  const keepIndices = [];
  for (let i = 0; i < total; i++) {
    if (!pageNumbers.includes(i + 1)) keepIndices.push(i);
  }
  const pages = await newDoc.copyPages(doc, keepIndices);
  pages.forEach(p => newDoc.addPage(p));
  return newDoc.save();
}

export async function rotatePages(file, pageNumbers, rotationDeg) {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const total = doc.getPageCount();
  for (let i = 0; i < total; i++) {
    if (pageNumbers === 'all' || pageNumbers.includes(i + 1)) {
      const page = doc.getPage(i);
      const current = page.getRotation().angle;
      page.setRotation(degrees((current + rotationDeg) % 360));
    }
  }
  return doc.save();
}

export async function imagesToPDF(imageFiles) {
  const doc = await PDFDocument.create();
  for (const file of imageFiles) {
    const bytes = await file.arrayBuffer();
    let img;
    const type = file.type;
    if (type === 'image/jpeg' || type === 'image/jpg') {
      img = await doc.embedJpg(bytes);
    } else {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const bitmap = await createImageBitmap(new Blob([bytes], { type }));
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      ctx.drawImage(bitmap, 0, 0);
      const pngBytes = await new Promise((resolve, reject) => {
        canvas.toBlob(b => {
          if (b) b.arrayBuffer().then(resolve);
          else reject(new Error('فشل إنشاء الصورة'));
        }, 'image/png');
      });
      img = await doc.embedPng(pngBytes);
    }
    const page = doc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
  }
  return doc.save();
}
