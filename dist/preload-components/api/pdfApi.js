"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfApi = void 0;
const pdfjs_dist_1 = require("pdfjs-dist");
const pdfViewerController_1 = require("../pdfViewerController");
const pdfDocumentFactory_1 = require("../pdfDocumentFactory");
const pdfDomRender_1 = require("../pdfDomRender");
var pdfPageViewerController = null;
exports.pdfApi = {
    loadPdfToMemory: async (arrayBuffer) => {
        var pdfDocument = await pdfDocumentFactory_1.PDFDocumentFactory.createFromArrayBuffer(arrayBuffer);
        if (pdfPageViewerController != null) {
            pdfPageViewerController?.setPdf(pdfDocument);
            return true;
        }
        else {
            var canvas = document.getElementById('pdf-canvas');
            if (canvas != null) {
                var renderer = new pdfDomRender_1.PdfPageCanvasRenderer(canvas);
                pdfPageViewerController = new pdfViewerController_1.PdfPageViewerController(pdfDocument, renderer);
                return true;
            }
        }
        return false;
    },
    getPageCount: () => {
        var pdfDocument = pdfPageViewerController?.getPdf();
        if (pdfDocument) {
            return pdfDocument.getPageCount();
        }
        return 0;
    },
    displayCurrentPage: async () => {
        if (pdfPageViewerController != null) {
            await pdfPageViewerController.renderCurrentPage();
        }
    },
    displayNextPage: async () => {
        if (pdfPageViewerController != null) {
            await pdfPageViewerController.nextPage();
        }
    },
    displayPreviousPage: async () => {
        if (pdfPageViewerController != null) {
            await pdfPageViewerController.previousPage();
        }
    },
    displayPage: async (pageNumber) => {
        if (pdfPageViewerController != null) {
            await pdfPageViewerController.setPage(pageNumber);
        }
    },
    version: () => pdfjs_dist_1.version
};
//# sourceMappingURL=pdfApi.js.map