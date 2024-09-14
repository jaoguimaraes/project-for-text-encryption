import { promises as fs } from "fs";
import * as path from "path";

const inputFilePath = path.join(__dirname, '../teste.txt');
const outputDir = path.join(__dirname, '../exit');

export async function readFile(): Promise<string> {
    try {
        const data = await fs.readFile(inputFilePath, 'utf8');
        return data;
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            throw new Error(`Arquivo de entrada não encontrado: ${inputFilePath}`);
        }
        throw new Error("Erro ao ler o arquivo: " + error.message);
    }
}

export async function writeFile(fileName: string, content: string): Promise<void> {
    try {
        const outputFilePath = path.join(outputDir, fileName);

        await fs.mkdir(outputDir, { recursive: true });
        
        await fs.writeFile(outputFilePath, content, 'utf8');
        console.log(`Arquivo salvo com sucesso em ${outputFilePath}`);
    } catch (error: any) {
        throw new Error("Err ao salvar o arquivo: " + error.message);
    }
}