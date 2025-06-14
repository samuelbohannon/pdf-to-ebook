import { contextBridge } from 'electron';
import { PathApi as PathApi } from './types/path_api';

import * as path from 'path';
import * as fs from 'fs';
import * as pdfJsLib from 'pdfjs-dist';
import { PdfApi } from './types/pdf_api';

pdfJsLib.GlobalWorkerOptions.workerSrc = window.api.joinPath('.', 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs');

const api: PathApi = {
    joinPath: (...args: string[]) => path.join(...args),
}

const pdf: PdfApi = {
    loadPdfFromArrayBuffer: async (arrayBuffer: ArrayBuffer) => {
      return await pdfJsLib.getDocument({ data: arrayBuffer }).promise;
    },
    version: () => pdfJsLib.version
  };

contextBridge.exposeInMainWorld('api', api);
contextBridge.exposeInMainWorld('pdf', pdf);