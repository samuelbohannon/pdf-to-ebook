import { PDFDocumentProxy, getDocument } from "pdfjs-dist";
import { PdfDocument } from "./pdfDocument";



export class PDFDocumentFactory {
    static async createFromArrayBuffer(arrayBuffer: ArrayBuffer): Promise<PdfDocument> {
        const pdfDocument = await getDocument({ data: arrayBuffer }).promise;
        return new PdfDocument(pdfDocument);
    }

    static createFromPdfDocument(pdfDocument: PDFDocumentProxy): PdfDocument {
        return new PdfDocument(pdfDocument);
    }
}