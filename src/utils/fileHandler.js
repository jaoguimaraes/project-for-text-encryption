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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = readFile;
exports.writeFile = writeFile;
const fs_1 = require("fs");
const path = __importStar(require("path"));
const inputFilePath = path.join(__dirname, '../teste.txt');
const outputDir = path.join(__dirname, '../exit');
function readFile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs_1.promises.readFile(inputFilePath, 'utf8');
            return data;
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                throw new Error(`Arquivo de entrada não encontrado: ${inputFilePath}`);
            }
            throw new Error("Erro ao ler o arquivo: " + error.message);
        }
    });
}
function writeFile(fileName, content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const outputFilePath = path.join(outputDir, fileName);
            yield fs_1.promises.mkdir(outputDir, { recursive: true });
            yield fs_1.promises.writeFile(outputFilePath, content, 'utf8');
            console.log(`Arquivo salvo com sucesso em ${outputFilePath}`);
        }
        catch (error) {
            throw new Error("Err ao salvar o arquivo: " + error.message);
        }
    });
}
