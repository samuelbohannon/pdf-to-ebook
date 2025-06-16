import path from "path";
import { PathApi } from "../../types/path_api";

export const pathApi : PathApi = {
    joinPath: (...args: string[]) => path.join(...args),
}