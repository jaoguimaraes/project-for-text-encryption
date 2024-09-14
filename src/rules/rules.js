"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
function encrypt(text) {
    return text.replace(/[a-zA-Z]/g, (char) => {
        let code = char.charCodeAt(0);
        if ((code >= 65 && code < 90) || (code >= 97 && code < 122)) {
            return String.fromCharCode(code + 1);
        }
        else if (code === 90)
            return 'A';
        else if (code === 122)
            return 'a';
        return char;
    });
}
function decrypt(text) {
    return text.replace(/[a-zA-Z]/g, (char) => {
        let code = char.charCodeAt(0);
        if ((code < 64 && code > 90) || (code < 96 && code >= 122)) {
            return String.fromCharCode(code - 1);
        }
        else if (code === 64)
            return 'Z';
        else if (code === 96)
            return 'z';
        return char;
    });
}
