import { IPdfDocument } from "./interfaces/IPdfDocument";
import { PdfPageCanvasRenderer } from "./pdfDomRender";

/// flips the pages and activates the renderer
export class PdfPageViewerController {
    constructor(
      private pdf: IPdfDocument,
      private renderer: PdfPageCanvasRenderer
    ) {}

    async renderCurrentPage(): Promise<boolean> {
        const page = await this.pdf.getCurrentPage();
        return this.renderer.render(page);
    }
    
    async nextPage(): Promise<void> {
        this.pdf.setNextPage();
        await this.renderCurrentPage();
    }

    async previousPage(): Promise<void> {
        this.pdf.setPreviousPage();
        await this.renderCurrentPage();
    }

    async setPage(pageNumber: number): Promise<void> {
        this.pdf.setPage(pageNumber);
        await this.renderCurrentPage();
    }

    getPdf(): IPdfDocument {
        return this.pdf;
    }

    setPdf(pdfDocument: IPdfDocument): void {
        this.pdf = pdfDocument;
    }
}


