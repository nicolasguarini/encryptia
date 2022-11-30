import { NextApiRequest, NextApiResponse } from 'next'
import * as Constants from '../../../utils/constants'
const rsa = require('node-rsa')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method == 'GET'){
        const bits: number = Constants.bitsMap.get(req.query.bits.toString()) ?? 2048

        const key = new rsa().generateKeyPair(bits)
        const publicKey = key.exportKey('public')
        const privateKey = key.exportKey('private')

        res.status(200).json({
            publicKey,
            privateKey
        })
    }else if(req.method == 'POST'){
        res.status(405).json({
            message: "Method POST Not Allowed"
        })
    }
}
