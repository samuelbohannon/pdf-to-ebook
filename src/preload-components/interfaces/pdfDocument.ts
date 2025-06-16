import { PDFPageProxy } from "pdfjs-dist";

export interface PdfDocument {
    getCurrentPage() : Promise<PDFPageProxy>;
    setNextPage() : void;
    setPreviousPage() : void;
}