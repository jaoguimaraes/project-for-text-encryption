import express from 'express';
import multer from 'multer';
import path from 'path';
import { encrypt, decrypt } from './rules/rules';
import { readFile, writeFile } from './utils/fileHandler';
import cors from 'cors';

// Configurações básicas do Express
const app = express();
const port = 3005;

//Habilita o CORS para todas as requisições
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Middleware para lidar com formulários de arquivos
const upload = multer({ dest: 'uploads/' });

// Rota para criptografar o conteúdo do arquivo
app.post('/encrypt', upload.single('file'), async (req, res) => {
    try {
        // Verificação explícita de 'req.file'
        if (!req.file) {
            return res.status(400).send("Nenhum arquivo enviado");
        }

        const filePath = req.file.path;  // Aqui você acessa o caminho do arquivo
        const content = await readFile(filePath);  // Lê o arquivo enviado
        const encryptedContent = encrypt(content); // Criptografa o conteúdo

        const encryptedFileName = 'encrypted_' + path.basename(req.file.originalname || 'output.txt');
        const encryptedFilePath = path.join(encryptedFileName);

        await writeFile(encryptedFilePath, encryptedContent);

        res.status(200).send(`Arquivo criptografado salvo como ${encryptedFilePath}`);
    } catch (error: any) {
        res.status(500).send(`Erro ao criptografar: ${error.message}`);
    }
});

// Rota para descriptografar o conteúdo do arquivo
app.post('/decrypt', upload.single('file'), async (req, res) => {
    try {
        // Verificação explícita de 'req.file'
        if (!req.file) {
            return res.status(400).send("Nenhum arquivo enviado");
        }

        const filePath = req.file.path;  // Acessa o caminho do arquivo
        const content = await readFile(filePath);  // Lê o arquivo enviado
        const decryptedContent = decrypt(content); // Descriptografa o conteúdo

        const decryptedFileName = 'decrypted_' + path.basename(req.file.originalname || 'output.txt');
        const decryptedFilePath = path.join(decryptedFileName);

        await writeFile(decryptedFilePath, decryptedContent);

        res.status(200).send(`Arquivo descriptografado salvo como ${decryptedFilePath}`);
    } catch (error: any) {
        res.status(500).send(`Erro ao descriptografar: ${error.message}`);
    }
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});