import CryptoJS from "crypto-js"
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == 'GET'){
        const {plaintext} = req.query

        try{
            res.status(200).json({
                plaintext: plaintext,
                hash: CryptoJS.MD5(plaintext).toString()
            })
        }catch(e){
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