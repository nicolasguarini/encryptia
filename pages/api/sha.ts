import CryptoJS from "crypto-js"
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == 'GET'){
        const {plaintext, v} = req.query

        try{
            let hash: string = ''

            switch(v){
                case '1':
                    hash = CryptoJS.SHA1(plaintext)
                    break;
                case '3':
                    hash = CryptoJS.SHA3(plaintext)
                    break;
                case '224':
                    hash = CryptoJS.SHA224(plaintext)
                    break;
                case '384':
                    hash = CryptoJS.SHA384(plaintext)
                    break;
                case '512':
                    hash = CryptoJS.SHA512(plaintext)
                    break;
                default:
                    hash = CryptoJS.SHA256(plaintext)
                    break;
            }

            res.status(200).json({
                plaintext: plaintext,
                hash: hash.toString()
            })
        }catch(e){
            console.log(e)
            res.status(400).send({
                message: e.toString()
            })
        }  
    }else if(req.method == 'POST'){
        res.status(405).json({
            message: "Method POST Not Allowed"
        })
    }
}