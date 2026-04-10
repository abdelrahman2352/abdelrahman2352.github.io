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
      </Routes>
    </BrowserRouter>
  );
}
