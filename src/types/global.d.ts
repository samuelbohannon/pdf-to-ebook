import type { PathApi } from './path_api';

export declare global {
  interface Window {
    api: PathApi;
  }
}