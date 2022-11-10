import CryptoJS from "crypto-js"

export default function handler(req, res) {
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
        res.send(405).json({
            message: "Method POST Not Allowed"
        })
    }
}