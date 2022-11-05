import rsa from "node-rsa"

export default function handler(req, res) {
    if(req.method == 'GET'){
        try{
            let {plaintext, ciphertext, publicKey, privateKey} = req.query

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
                publicKey = new rsa().importKey(
                    decodeURI(publicKey).replace(/%2b/g, '+')
                )

                if(plaintext){ //We have to public encrypt
                    res.status(200).json({
                        plaintext: plaintext,
                        ciphertext: publicKey.encrypt(plaintext, 'base64'),
                        publicKey: publicKey.exportKey('public')
                    })
                }else if(ciphertext){ //We have to public decrypt
                    res.status(200).json({
                        plaintext: publicKey.decryptPublic(ciphertext, 'utf8'),
                        ciphertext: ciphertext,
                        publicKey: publicKey.exportKey('public')
                    })
                }
            }else if(privateKey){
                privateKey = new rsa().importKey(
                    decodeURI(privateKey).replace(/%2b/g, '+')
                )

                if(plaintext){ //We have to private encrypt
                    res.status(200).json({
                        plaintext: plaintext,
                        ciphertext: privateKey.encryptPrivate(plaintext, 'base64'),
                        privateKey: privateKey.exportKey('private')
                    })
                }else if(ciphertext){ //We have to private decrypt
                    res.status(200).json({
                        plaintext: privateKey.decrypt(ciphertext, 'utf8'),
                        ciphertext: ciphertext,
                        privateKey: privateKey.exportKey('private')
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
        res.send(405).json({
            message: "Method POST Not Allowed"
        })
    }
}