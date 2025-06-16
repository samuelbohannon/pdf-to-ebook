"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathApi = void 0;
const path_1 = __importDefault(require("path"));
exports.pathApi = {
    joinPath: (...args) => path_1.default.join(...args),
};
//# sourceMappingURL=pathApi.js.map