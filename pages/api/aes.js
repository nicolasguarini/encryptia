//api/aes
import * as Constants from '../../utils/constants'

export default function handler(req, res) {
    if(req.method == 'GET'){
        const CryptoJS = require('crypto-js')
        const query = req.query

        const {plaintext, key, mode, ciphertext, iv} = query
        
        if(!Constants.modesMap.has(mode)){
            res.status(400).send({
                message: `Specified mode '${mode}' not supported by AES`
            })
        }else{
            try{
                if(!ciphertext){
                    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), CryptoJS.enc.Utf8.parse(key), {
                        mode: Constants.modesMap.get(mode),
                        padding: CryptoJS.pad.Pkcs7,
                        iv: iv == null ? CryptoJS.enc.Utf8.parse('') : CryptoJS.enc.Utf8.parse(iv)
                    })
    
                    res.status(200).json({
                        plaintext: plaintext,
                        key: key,
                        ciphertext: encrypted.ciphertext.toString(),
                        mode: mode,
                        padding: 'Pkcs7'
                    })
                }else{
                    const decrypted = CryptoJS.AES.decrypt({
                        ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
                    }, CryptoJS.enc.Utf8.parse(key), {
                        mode: Constants.modesMap.get(mode),
                        padding: CryptoJS.pad.Pkcs7,
                        iv: iv == null ? CryptoJS.enc.Utf8.parse('') : CryptoJS.enc.Utf8.parse(iv)
                    })

                    res.status(200).json({
                        plaintext: decrypted.toString(CryptoJS.enc.Utf8),
                        key: key,
                        ciphertext: ciphertext,
                        mode: mode,
                        padding: 'Pkcs7'
                    })
                } 
            }catch(error){
                console.log(error)
                res.status(500).send({
                    message: error.toString()
                })
            }
        }   
    }
}