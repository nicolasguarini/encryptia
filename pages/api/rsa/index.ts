import { NextApiRequest, NextApiResponse } from "next"
import rsa from "node-rsa"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == 'GET'){
        try{
            let {plaintext, ciphertext, publicKey, privateKey} = req.query
            let publicKeyObj: rsa
            let privateKeyObj: rsa

            plaintext = plaintext ? plaintext.toString() : null
            ciphertext = ciphertext ? ciphertext.toString() : null
            publicKey = publicKey ? publicKey.toString() : null
            privateKey = privateKey ? privateKey.toString() : null

            if(plaintext) plaintext = decodeURI(plaintext).replace(/%2b/g, '+')
            if(ciphertext) ciphertext = decodeURI(ciphertext).replace(/%2b/g, '+')

            if(!plaintext && !ciphertext){
                res.status(400).send({
                    message: 'You must specify either plaintext or ciphertext'
                })
            }else if(publicKey && privateKey){
                res.status(400).send({
                    message: 'You must specify either private or public key'
                })
            }else if(publicKey){ 
                publicKeyObj = new rsa().importKey(
                    decodeURI(publicKey).replace(/%2b/g, '+')
                )

                if(plaintext){ //We have to public encrypt
                    res.status(200).json({
                        plaintext: plaintext,
                        ciphertext: publicKeyObj.encrypt(plaintext, 'base64'),
                        publicKey: publicKeyObj.exportKey('public')
                    })
                }else if(ciphertext){ //We have to public decrypt
                    res.status(200).json({
                        plaintext: publicKeyObj.decryptPublic(ciphertext, 'utf8'),
                        ciphertext: ciphertext,
                        publicKey: publicKeyObj.exportKey('public')
                    })
                }
            }else if(privateKey){
                privateKeyObj = new rsa().importKey(
                    decodeURI(privateKey).replace(/%2b/g, '+')
                )

                if(plaintext){ //We have to private encrypt
                    res.status(200).json({
                        plaintext: plaintext,
                        ciphertext: privateKeyObj.encryptPrivate(plaintext, 'base64'),
                        privateKey: privateKeyObj.exportKey('private')
                    })
                }else if(ciphertext){ //We have to private decrypt
                    res.status(200).json({
                        plaintext: privateKeyObj.decrypt(ciphertext, 'utf8'),
                        ciphertext: ciphertext,
                        privateKey: privateKeyObj.exportKey('private')
                    })
                }
            }else{
                res.status(400).send({
                    message: 'No key specified'
                })
            }
        }catch(error){
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