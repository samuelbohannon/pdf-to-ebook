import { PreloadApi } from './preload_api';

export declare global {
  interface Window {
    preloadApi: PreloadApi;
  }
}