import { PDFDocumentLoadingTask } from "pdfjs-dist";

export interface PdfApi {
    loadPdfFromArrayBuffer: (arrayBuffer: ArrayBuffer) => Promise<PDFDocumentProxy>,
    version: () => string
}