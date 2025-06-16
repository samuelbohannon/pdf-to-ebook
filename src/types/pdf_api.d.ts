import { PDFDocumentLoadingTask, PDFPageProxy } from "pdfjs-dist";

export interface PdfApi {
    loadPdfToMemory: (arrayBuffer: ArrayBuffer) => Promise<boolean>,
    displayNextPage: () => void,
    displayCurrentPage: () => void,
    displayPreviousPage: () => void,
    version: () => string
}