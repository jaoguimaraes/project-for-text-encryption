import { readFile, writeFile } from "./utils/fileHandler";
import { decrypt, encrypt } from "./rules/rules";
import * as readline from 'readline-sync';

async function main() {
    try {
        const operation = readline.question('Você quer criptografar (1) ou descriptografar (2)? ')

        if (operation !== '1' && operation !== '2') {
            throw new Error("Opção inválida. Escolha 1 para criptografar ou 2 para descriptografar");
        }

        const fileContent = await readFile();

        let result: string;
        let outputFileName: string;
        if (operation === '1') {
            result = encrypt(fileContent);
            outputFileName = 'teste-encrypted.txt'
        } else {
            result = decrypt(fileContent);
            outputFileName = 'teste-decrypted.txt'
        }

        await writeFile(outputFileName, result);

    } catch (error: any) {
        console.error('Erro: ', error.message);
    }
}

main();