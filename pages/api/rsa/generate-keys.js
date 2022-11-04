import * as Constants from '../../../utils/constants'
const rsa = require('node-rsa')

export default function handler(req, res) {
    if(req.method == 'GET'){
        const bits = Constants.bitsMap.get(req.query.bits) ?? 2048 //TODO: implelent dynamic key size

        const key = new rsa().generateKeyPair()
        const publicKey = key.exportKey('public')
        const privateKey = key.exportKey('private')

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
