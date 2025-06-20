import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import { IPdfDocument } from './interfaces/IPdfDocument';

export class PdfDocument implements IPdfDocument {
    private pdfDocument: PDFDocumentProxy;
    private currentPageNumber: number

    constructor(pdfDocument: PDFDocumentProxy) {
      this.currentPageNumber = 1;
      this.pdfDocument = pdfDocument;
    }

    public async getCurrentPage() : Promise<PDFPageProxy>{
      return await this.pdfDocument.getPage(this.currentPageNumber);
    }

    public setNextPage() : void {
      this.currentPageNumber = this.currentPageNumber + 1;
    }

    public setPreviousPage() : void {
      this.currentPageNumber = this.currentPageNumber - 1;
    }

    setPage(pageNumber: number) : void {
      this.currentPageNumber = pageNumber;
    }

    getPageCount(): number {
      return this.pdfDocument.numPages;
    }
}








