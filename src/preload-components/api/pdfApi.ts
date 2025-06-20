import { version } from "pdfjs-dist";
import { PdfApi } from "../../types/pdf_api";

import { PdfPageViewerController } from "../pdfViewerController";
import { PDFDocumentFactory } from "../pdfDocumentFactory";
import { PdfPageCanvasRenderer } from "../pdfDomRender";


var pdfPageViewerController: PdfPageViewerController | null = null; 

export const pdfApi : PdfApi = {
  loadPdfToMemory: async (arrayBuffer: ArrayBuffer) => {
    var pdfDocument = await PDFDocumentFactory.createFromArrayBuffer(arrayBuffer);

    if(pdfPageViewerController != null){
        pdfPageViewerController?.setPdf(pdfDocument);
        return true;
    } else {
        var canvas = document.getElementById('pdf-canvas');
        if(canvas != null){
            var renderer = new PdfPageCanvasRenderer(canvas as HTMLCanvasElement);
            pdfPageViewerController = new PdfPageViewerController(pdfDocument, renderer)
            return true;
        }
    }
    return false;
  },
  getPageCount: () => {
    var pdfDocument = pdfPageViewerController?.getPdf();
    if(pdfDocument){
      return pdfDocument.getPageCount();
    }
    return 0;
  },
  displayCurrentPage: async () => {
    if(pdfPageViewerController != null){
        await pdfPageViewerController.renderCurrentPage();
    }
  },
  displayNextPage: async () => {
    if(pdfPageViewerController != null){
        await pdfPageViewerController.nextPage();
    }
  },
  displayPreviousPage: async () => {
    if(pdfPageViewerController != null){
        await pdfPageViewerController.previousPage();
    }
  },

  displayPage: async (pageNumber: number) => {
    if(pdfPageViewerController != null){
      await pdfPageViewerController.setPage(pageNumber);
    }
  },
  version: () => version
};
