import { NextApiRequest, NextApiResponse } from "next"
import CryptoJS from 'crypto-js'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == 'GET'){
        const {plaintext, key, iv, ciphertext} = req.query
        
        const ivHex = CryptoJS.enc.Utf8.parse(iv ?? '0000')
        const keyHex = CryptoJS.enc.Utf8.parse(key)
        
        const options = {
            iv: ivHex, 
            mode: CryptoJS.mode.CTR,
            padding: CryptoJS.pad.Pkcs7
        }
        
        try{
            if(!ciphertext){
                const encrypted = CryptoJS.AES.encrypt(plaintext, keyHex, options)

                res.status(200).json({
                    plaintext: plaintext,
                    ciphertext: encrypted.toString(),
                    key: key,
                    iv: ivHex.toString(),
                    mode: 'CTR'
                })
            }else{
                const encrypted = CryptoJS.enc.Base64.parse(ciphertext)

                const decrypted  = CryptoJS.AES.decrypt({
                    ciphertext: encrypted
                }, keyHex, options)

                res.status(200).json({
                    plaintext: decrypted.toString(CryptoJS.enc.Utf8),
                    ciphertext: ciphertext,
                    key: key,
                    iv: ivHex.toString(),
                    mode: 'CTR'
                })
            } 
        }catch(error){
            console.log(error)
            res.status(500).send({
                message: error.toString()
            })
        }
    }else if(req.method == 'POST'){
        res.status(405).json({
            message: "Method POST Not Allowed"
        })
    }
}