import { PDFDocumentLoadingTask, PDFPageProxy } from "pdfjs-dist";

export interface PdfApi {
    loadPdfFromArrayBuffer: (arrayBuffer: ArrayBuffer, pageNumber: number) => void,
    version: () => string
}