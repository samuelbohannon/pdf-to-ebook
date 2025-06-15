import { PathApi } from "./path_api";
import { PdfApi } from "./pdf_api";

export interface PreloadApi {
    path : PathApi,
    pdf : PdfApi
}