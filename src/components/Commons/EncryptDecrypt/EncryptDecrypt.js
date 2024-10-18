import CryptoJS from "crypto-js";

export const Encrypt = (data, key) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString().replaceAll("/", "~");
}

export const Decrypt = (text, key) => {
    try {
        const bytes = CryptoJS.AES.decrypt(text, key);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (err) {
        console.error(err);
        return;
    }
}