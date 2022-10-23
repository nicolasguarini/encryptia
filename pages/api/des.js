//api/des

export default function handler(req, res) {
    if(req.method == 'GET'){
        const CryptoJS = require('crypto-js')
        const modesMap = new Map([
            ['ECB', CryptoJS.mode.ECB],
            ['CBC', CryptoJS.mode.CBC],
            ['CFB', CryptoJS.mode.CFB],
            ['OFB', CryptoJS.mode.OFB],
            ['CTR', CryptoJS.mode.CTR]
        ])

        const query = req.query
        const {plaintext, key, mode, ciphertext, iv} = query
        
        if(!modesMap.has(mode)){
            res.status(400).send({
                message: `Specified mode '${mode}' not supported by DES`
            })
        }else{
            const keyHex = CryptoJS.enc.Utf8.parse(key)
            const ivHex = iv == null ? CryptoJS.enc.Hex.parse('') : CryptoJS.enc.Hex.parse(CryptoJS.enc.Utf8.parse(iv).toString(CryptoJS.enc.Hex));
            const modeObj = modesMap.get(mode)
            
            if(ciphertext == null){ //we have to encrypt
                const encrypted = CryptoJS.DES.encrypt(plaintext, keyHex, {
                    iv: ivHex,
                    mode: modeObj,
                    padding: CryptoJS.pad.Pkcs7
                })
    
                res.status(200).json({ 
                    'plaintext': plaintext, 
                    'key': key, 
                    'ciphertext': encrypted.toString(),
                    'mode': mode,
                    'padding': 'Pkcs7'
                })
            }else{ //we have to decrypt
                const decrypted = CryptoJS.DES.decrypt({
                    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
                }, keyHex, {
                    iv: ivHex,
                    mode: modeObj,
                    padding: CryptoJS.pad.Pkcs7
                })
                
                try{
                    res.status(200).json({
                        'plaintext': decrypted.toString(CryptoJS.enc.Utf8),
                        'key': key,
                        'ciphertext': ciphertext,
                        'mode': mode,
                        'padding': 'Pkcs7'
                    })
                }catch(error){
                    res.status(400).send({
                        message: 'Malformed input data'
                    })
                }
            }
        }
    }
}
