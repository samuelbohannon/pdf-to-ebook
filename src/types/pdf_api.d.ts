import { PDFDocumentLoadingTask, PDFPageProxy } from "pdfjs-dist";

export interface PdfApi {
    loadPdfToMemory: (arrayBuffer: ArrayBuffer) => Promise<boolean>,
    displayNextPage: () => void,
    displayCurrentPage: () => void,
    displayPreviousPage: () => void,
    displayPage: (pageNumber: number) => void,
    getPageCount: () => number,
    version: () => string
}