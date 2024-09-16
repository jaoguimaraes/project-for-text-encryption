import { promises as fs } from "fs";
import * as path from "path";

// Função para ler o conteúdo de um arquivo específico
export async function readFile(filePath: string): Promise<string> {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return data;
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            throw new Error(`Arquivo de entrada não encontrado: ${filePath}`);
        }
        throw new Error("Erro ao ler o arquivo: " + error.message);
    }
}

// Função para escrever o conteúdo em um arquivo de saída
export async function writeFile(fileName: string, content: string): Promise<void> {
    try {
        const outputDir = path.join(__dirname, '../exit'); // Defina o diretório de saída
        const outputFilePath = path.join(outputDir, fileName);

        await fs.mkdir(outputDir, { recursive: true }); // Garante que o diretório existe
        
        await fs.writeFile(outputFilePath, content, 'utf8');
        console.log(`Arquivo salvo com sucesso em ${outputFilePath}`);
    } catch (error: any) {
        throw new Error("Erro ao salvar o arquivo: " + error.message);
    }
}
