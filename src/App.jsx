import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MergePDF from './pages/MergePDF';
import SplitPDF from './pages/SplitPDF';
import DeletePagesPDF from './pages/DeletePagesPDF';
import RotatePDF from './pages/RotatePDF';
import ImagesToPDF from './pages/ImagesToPDF';
import PDFToJPG from './pages/PDFToJPG';
import CompressImages from './pages/CompressImages';
import ConvertImages from './pages/ConvertImages';
import ResizeImages from './pages/ResizeImages';
import CropImages from './pages/CropImages';
import RotateFlipImages from './pages/RotateFlipImages';
import WatermarkImages from './pages/WatermarkImages';
import BorderImages from './pages/BorderImages';
import AdjustColors from './pages/AdjustColors';
import GrayscaleImages from './pages/GrayscaleImages';
import AspectRatioFitter from './pages/AspectRatioFitter';
import ArabicDecorations from './pages/ArabicDecorations';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/دمج-pdf" element={<MergePDF />} />
        <Route path="/تقسيم-pdf" element={<SplitPDF />} />
        <Route path="/حذف-صفحات-pdf" element={<DeletePagesPDF />} />
        <Route path="/تدوير-pdf" element={<RotatePDF />} />
        <Route path="/تحويل-صور-الى-pdf" element={<ImagesToPDF />} />
        <Route path="/pdf-الى-jpg" element={<PDFToJPG />} />
        <Route path="/ضغط-الصور" element={<CompressImages />} />
        <Route path="/تحويل-صيغ-الصور" element={<ConvertImages />} />
        <Route path="/تغيير-حجم-الصور" element={<ResizeImages />} />
        <Route path="/قص-الصور" element={<CropImages />} />
        <Route path="/تدوير-وقلب-الصور" element={<RotateFlipImages />} />
        <Route path="/علامة-مائية" element={<WatermarkImages />} />
        <Route path="/اطار-الصور" element={<BorderImages />} />
        <Route path="/ضبط-الالوان" element={<AdjustColors />} />
        <Route path="/تحويل-الى-رمادي" element={<GrayscaleImages />} />
        <Route path="/ضبط-نسبة-العرض" element={<AspectRatioFitter />} />
        <Route path="/زخارف-عربية" element={<ArabicDecorations />} />
      </Routes>
    </BrowserRouter>
  );
}
