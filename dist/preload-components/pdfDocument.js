"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfDocument = void 0;
class PdfDocument {
    constructor(pdfDocument) {
        this.currentPageNumber = 1;
        this.pdfDocument = pdfDocument;
    }
    async getCurrentPage() {
        return await this.pdfDocument.getPage(this.currentPageNumber);
    }
    setNextPage() {
        this.currentPageNumber = this.currentPageNumber + 1;
    }
    setPreviousPage() {
        this.currentPageNumber = this.currentPageNumber - 1;
    }
    setPage(pageNumber) {
        this.currentPageNumber = pageNumber;
    }
    getPageCount() {
        return this.pdfDocument.numPages;
    }
}
exports.PdfDocument = PdfDocument;
//# sourceMappingURL=pdfDocument.js.map