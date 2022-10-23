//api/des

export default function handler(req, res) {
    if(req.method == 'GET'){
        const modes = ['ECB', 'CBC', 'CFB', 'OFB', 'CTR']
        const query = req.query
        const {plaintext, key, mode, ciphertext, iv} = query
        
        if(!modes.includes(mode)){
            res.status(400).send({
                message: `Specified mode '${mode}' not supported by DES`
            })
        }else{
            const CryptoJS = require('crypto-js')
            var keyHex = CryptoJS.enc.Utf8.parse(key)
            var ivHex = iv == null ? CryptoJS.enc.Hex.parse('') : CryptoJS.enc.Hex.parse(CryptoJS.enc.Utf8.parse(iv).toString(CryptoJS.enc.Hex));

            const modeObj = mode == 'CBC' ? CryptoJS.mode.CBC 
                : mode == 'CFB' ? CryptoJS.mode.CFB
                : mode == 'OFB' ? CryptoJS.mode.OFB
                : mode == 'CTR' ? CryptoJS.mode.OFB : CryptoJS.mode.ECB
            
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
