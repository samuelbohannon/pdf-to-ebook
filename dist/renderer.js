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
const pdfJsLib = __importStar(require("pdfjs-dist"));
window.addEventListener('DOMContentLoaded', () => {
    const uploadElement = document.getElementById('upload');
    if (!uploadElement) {
        console.error('No element with id "upload" found!');
        return;
    }
    uploadElement.addEventListener('change', async (event) => {
        if (!event || !event.target)
            return;
        var files = event.target.files;
        if (!files)
            return;
        const file = files[0];
        console.log(file);
        if (!file)
            return;
        console.log(pdfJsLib.version);
        pdfJsLib.GlobalWorkerOptions.workerSrc = window.api.joinPath('.', 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs');
        const arrayBuffer = await file.arrayBuffer();
        console.log(arrayBuffer);
        const pdf = await pdfJsLib.getDocument({ data: arrayBuffer }).promise;
        console.log(pdf);
        const page = await pdf.getPage(1);
        console.log(page);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.getElementById('pdf-canvas');
        // const context = canvas.getContext('2d');
        // canvas.height = viewport.height;
        // canvas.width = viewport.width;
        // const renderContext = { canvasContext: context, viewport: viewport };
        // await page.render(renderContext).promise;
    });
});
//# sourceMappingURL=renderer.js.map