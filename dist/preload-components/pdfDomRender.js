"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfPageCanvasRenderer = void 0;
class PdfPageCanvasRenderer {
    constructor(canvas) {
        this.canvas = canvas;
    }
    async render(page) {
        const viewport = page.getViewport({ scale: 1.5 });
        const context = this.canvas.getContext('2d');
        if (context == null) {
            console.log('could not render PdfPageProxy to canvas. Could not find canvas context.');
            return false;
        }
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (context != null) {
            this.canvas.height = viewport.height;
            this.canvas.width = viewport.width;
            const renderContext = { canvasContext: context, viewport: viewport };
            await page.render(renderContext).promise;
            return true;
        }
        return false;
    }
}
exports.PdfPageCanvasRenderer = PdfPageCanvasRenderer;
//# sourceMappingURL=pdfDomRender.js.map