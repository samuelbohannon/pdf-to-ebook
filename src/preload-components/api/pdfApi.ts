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
  displayCurrentPage: () => {
    if(pdfPageViewerController != null){
        pdfPageViewerController.renderCurrentPage();
    }
  },
  displayNextPage: () => {
    if(pdfPageViewerController != null){
        pdfPageViewerController.nextPage();
        pdfPageViewerController.renderCurrentPage();
    }
  },
  displayPreviousPage: () => {
    if(pdfPageViewerController != null){
        pdfPageViewerController.previousPage();
        pdfPageViewerController.renderCurrentPage();
    }
  },
  version: () => version
};
