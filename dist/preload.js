"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const pdfJsLib = __importStar(require("pdfjs-dist"));
pdfJsLib.GlobalWorkerOptions.workerSrc = path.join('.', 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs');
const pathApi = {
    joinPath: (...args) => path.join(...args),
};
const pdfApi = {
    loadPdfFromArrayBuffer: async (arrayBuffer, pageNumber) => {
        console.log("loadPdfFromArrayBuffer");
        console.log(arrayBuffer);
        var pdf = await pdfJsLib.getDocument({ data: arrayBuffer }).promise;
        if (isPDFDocumentProxy(pdf)) {
            var page = await pdf.getPage(pageNumber);
            if (isPdfPageProxy(page)) {
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.getElementById('pdf-canvas');
                if (!canvas) {
                    throw "Cannot load page to document. Couldn't fine canvas";
                }
                if (canvas instanceof HTMLCanvasElement) {
                    const context = canvas.getContext('2d');
                    if (context != null) {
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        const renderContext = { canvasContext: context, viewport: viewport };
                        await page.render(renderContext).promise;
                    }
                }
                return null;
            }
        }
        return pdf;
    },
    version: () => pdfJsLib.version
};
function isPDFDocumentProxy(object) {
    return true;
}
function isPdfPageProxy(object) {
    return 'getViewport' in object && 'render' in object;
}
const preloadApi = {
    path: pathApi,
    pdf: pdfApi
};
electron_1.contextBridge.exposeInMainWorld('preloadApi', preloadApi);
//# sourceMappingURL=preload.js.map