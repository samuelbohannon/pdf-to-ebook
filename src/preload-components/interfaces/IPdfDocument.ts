import { PDFPageProxy } from "pdfjs-dist";

export interface IPdfDocument {
    getCurrentPage() : Promise<PDFPageProxy>;
    setNextPage() : void;
    setPreviousPage() : void;
    setPage(pageNumber: number) : void,

    getPageCount() : number;
}