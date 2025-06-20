"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfPageViewerController = void 0;
/// flips the pages and activates the renderer
class PdfPageViewerController {
    constructor(pdf, renderer) {
        this.pdf = pdf;
        this.renderer = renderer;
    }
    async renderCurrentPage() {
        const page = await this.pdf.getCurrentPage();
        return this.renderer.render(page);
    }
    async nextPage() {
        this.pdf.setNextPage();
        await this.renderCurrentPage();
    }
    async previousPage() {
        this.pdf.setPreviousPage();
        await this.renderCurrentPage();
    }
    async setPage(pageNumber) {
        this.pdf.setPage(pageNumber);
        await this.renderCurrentPage();
    }
    getPdf() {
        return this.pdf;
    }
    setPdf(pdfDocument) {
        this.pdf = pdfDocument;
    }
}
exports.PdfPageViewerController = PdfPageViewerController;
//# sourceMappingURL=pdfViewerController.js.map