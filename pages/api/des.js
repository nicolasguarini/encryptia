//api/des

export default function handler(req, res) {
    if(req.method == 'GET'){
        const query = req.query
        const {plaintext, key} = query
        
        const CryptoJS = require('crypto-js')
        var keyHex = CryptoJS.enc.Utf8.parse(key);

        var encrypted = CryptoJS.DES.encrypt(plaintext, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        res.status(200).json({ 
            'plaintext': plaintext, 
            'key': key, 
            'ciphertext': encrypted.toString(),
            'mode': 'ECB',
            'padding': 'Pkcs7'
        })
    }
}
