import { PreloadApi } from "../../types/preload_api";
import { pathApi } from "./pathApi";
import { pdfApi } from "./pdfApi";

export const preloadApi : PreloadApi = {
    path: pathApi,
    pdf: pdfApi
  }