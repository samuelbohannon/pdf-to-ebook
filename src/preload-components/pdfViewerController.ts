import { PdfDocument } from "./interfaces/pdfDocument";
import { PdfPageCanvasRenderer } from "./pdfDomRender";

/// flips the pages and activates the renderer
export class PdfPageViewerController {
    constructor(
      private pdf: PdfDocument,
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

    setPdf(pdfDocument: PdfDocument): void {
        this.pdf = pdfDocument;
    }
}


