import crypto from 'crypto'
import * as Constants from '../../../utils/constants'

export default function handler(req, res) {
    if(req.method == 'GET'){
        const bits = Constants.bitsMap.get(req.query.bits) ?? 2048

        const {publicKey, privateKey} = crypto.generateKeyPairSync("rsa", {
            modulusLength: bits,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: ''
            }
        })

        res.status(200).json({
            publicKey,
            privateKey
        })
    }else if(req.method == 'POST'){
        res.send(405).json({
            message: "Method POST Not Allowed"
        })
    }
}
