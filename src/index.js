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
const fileHandler_1 = require("./utils/fileHandler");
const rules_1 = require("./rules/rules");
const readline = __importStar(require("readline-sync"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const operation = readline.question('Você quer criptografar (1) ou descriptografar (2)? ');
            if (operation !== '1' && operation !== '2') {
                throw new Error("Opção inválida. Escolha 1 para criptografar ou 2 para descriptografar");
            }
            const fileContent = yield (0, fileHandler_1.readFile)();
            let result;
            let outputFileName;
            if (operation === '1') {
                result = (0, rules_1.encrypt)(fileContent);
                outputFileName = 'teste-encrypted.txt';
            }
            else {
                result = (0, rules_1.decrypt)(fileContent);
                outputFileName = 'teste-decrypted.txt';
            }
            yield (0, fileHandler_1.writeFile)(outputFileName, result);
        }
        catch (error) {
            console.error('Erro: ', error.message);
        }
    });
}
main();
