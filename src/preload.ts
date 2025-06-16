import { contextBridge } from 'electron';
import * as path from 'path';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { preloadApi } from './preload-components/api/preloadApi';

GlobalWorkerOptions.workerSrc = path.join('.', 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs');

contextBridge.exposeInMainWorld('preloadApi', preloadApi);