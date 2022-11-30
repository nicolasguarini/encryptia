//api/des
import { NextApiRequest, NextApiResponse } from 'next'
import * as Constants from '../../utils/constants'
import CryptoJS from 'crypto-js'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == 'GET'){
        const query = req.query
        const {plaintext, key, mode, triple, ciphertext, iv} = query
        const cryptoObj = triple === 'true' ? CryptoJS.TripleDES : CryptoJS.DES
        
        if(mode && !Constants.modesMap.has(mode.toString())){
            res.status(400).send({
                message: `Specified mode '${mode}' not supported by DES`
            })
        }else{
            const keyHex = CryptoJS.enc.Utf8.parse(key)
            const ivHex = iv ? CryptoJS.enc.Hex.parse(CryptoJS.enc.Utf8.parse(iv).toString(CryptoJS.enc.Hex)) 
                            : CryptoJS.enc.Hex.parse('0000')
            const modeObj = Constants.modesMap.get(mode.toString() ?? 'ECB')
            
            try{
                if(!ciphertext){ //we have to encrypt
                    const encrypted = cryptoObj.encrypt(plaintext, keyHex, {
                        iv: ivHex,
                        mode: modeObj,
                        padding: CryptoJS.pad.Pkcs7
                    })
        
                    res.status(200).json({ 
                        'plaintext': plaintext, 
                        'key': key, 
                        'ciphertext': encrypted.ciphertext.toString(),
                        'mode': mode ?? 'ECB',
                        'padding': 'Pkcs7'
                    })
                }else{ //we have to decrypt
                    const decrypted = cryptoObj.decrypt({
                        ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
                    }, keyHex, {
                        iv: ivHex,
                        mode: modeObj,
                        padding: CryptoJS.pad.Pkcs7
                    })
    
                    res.status(200).json({
                        'plaintext': decrypted.toString(CryptoJS.enc.Utf8),
                        'key': key,
                        'ciphertext': ciphertext,
                        'mode': mode ?? 'ECB',
                        'padding': 'Pkcs7'
                    })
                }
            }catch(error){
                res.status(500).send({
                    message: error.toString()
                })
            }
        }
    }else if(req.method == 'POST'){
        res.status(405).send({
            message: "Method POST Not Allowed"
        })
    }
}
