import { PDFPageProxy } from "pdfjs-dist";

export class PdfPageCanvasRenderer {
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    async render(page: PDFPageProxy) {
        const viewport = page.getViewport({ scale: 1.5 });
        const context = this.canvas.getContext('2d');
        if(context == null){
            console.log('could not render PdfPageProxy to canvas. Could not find canvas context.')
            return false;
        }
        
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if(context != null){
            this.canvas.height = viewport.height;
            this.canvas.width = viewport.width;
            const renderContext = { canvasContext: context, viewport: viewport };
            await page.render(renderContext).promise;
            return true
        }
        return false;
    }
}