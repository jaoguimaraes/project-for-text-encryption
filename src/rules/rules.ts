export function encrypt(text: string): string {
    return text.replace(/[a-zA-Z]/g, (char) => {
        let code = char.charCodeAt(0);
        if((code >= 65 && code < 90) || (code >= 97 && code < 122)) {
            return String.fromCharCode(code + 1);
        } else if (code === 90) return 'A';
        else if (code === 122) return 'a';
        return char;
    });
}
export function decrypt(text: string): string {
    return text.replace(/[a-zA-Z]/g, (char) => {
        let code = char.charCodeAt(0);
        if ((code > 65 && code <= 90) || (code > 97 && code <= 122)) {
            return String.fromCharCode(code - 1);
        } else if (code === 65) return 'Z';
        else if (code === 97) return 'z';
        return char;
    });
}
