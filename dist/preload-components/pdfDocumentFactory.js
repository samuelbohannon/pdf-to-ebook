"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFDocumentFactory = void 0;
const pdfjs_dist_1 = require("pdfjs-dist");
const pdfDocument_1 = require("./pdfDocument");
class PDFDocumentFactory {
    static async createFromArrayBuffer(arrayBuffer) {
        const pdfDocument = await (0, pdfjs_dist_1.getDocument)({ data: arrayBuffer }).promise;
        return new pdfDocument_1.PdfDocument(pdfDocument);
    }
    static createFromPdfDocument(pdfDocument) {
        return new pdfDocument_1.PdfDocument(pdfDocument);
    }
}
exports.PDFDocumentFactory = PDFDocumentFactory;
//# sourceMappingURL=pdfDocumentFactory.js.map