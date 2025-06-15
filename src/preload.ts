import { contextBridge } from 'electron';
import { PathApi as PathApi } from './types/path_api';

import * as path from 'path';
import * as pdfJsLib from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import { PdfApi } from './types/pdf_api';
import { PreloadApi } from './types/preload_api';

pdfJsLib.GlobalWorkerOptions.workerSrc = path.join('.', 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs');

const pathApi : PathApi = {
    joinPath: (...args: string[]) => path.join(...args),
}

const pdfApi : PdfApi = {
  loadPdfFromArrayBuffer: async (arrayBuffer: ArrayBuffer, pageNumber: number) => {
    console.log("loadPdfFromArrayBuffer");
    console.log(arrayBuffer);
    var pdf =  await pdfJsLib.getDocument({ data: arrayBuffer }).promise;

    if(isPDFDocumentProxy(pdf)){
      var page = await pdf.getPage(pageNumber);
      if(isPdfPageProxy(page)){
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.getElementById('pdf-canvas');
        if(!canvas){
          throw "Cannot load page to document. Couldn't fine canvas";
        } 

        if(canvas instanceof HTMLCanvasElement){
          const context = canvas.getContext('2d');
          if(context != null){
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = { canvasContext: context, viewport: viewport };
            await page.render(renderContext).promise;
          }
        }
      }
    }
  },
  version: () => pdfJsLib.version
};

function isPDFDocumentProxy(object: any): object is PDFDocumentProxy {
    return true;
}

function isPdfPageProxy(object:any): object is PDFPageProxy {
  return 'getViewport' in object && 'render' in object;
}


const preloadApi : PreloadApi = {
  path: pathApi,
  pdf: pdfApi
}

contextBridge.exposeInMainWorld('preloadApi', preloadApi);