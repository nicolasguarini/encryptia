//api/des

export default function handler(req, res) {
    if(req.method == 'GET'){
        const modes = ['ECB', 'CBC', 'CFB', 'OFB', 'CTR']
        const query = req.query
        const {plaintext, key, mode, iv} = query
        
        if(!modes.includes(mode)){
            res.status(400).send({
                message: `Specified mode '${mode}' not supported by DES`
            })
        }else{
            const CryptoJS = require('crypto-js')
            var keyHex = CryptoJS.enc.Hex.parse(key)
            var ivHex = iv == null ? CryptoJS.enc.Hex.parse('') : CryptoJS.enc.Hex.parse(iv)

            const modeObj = mode == 'CBC' ? CryptoJS.mode.CBC 
                : mode == 'CFB' ? CryptoJS.mode.CFB
                : mode == 'OFB' ? CryptoJS.mode.OFB
                : mode == 'CTR' ? CryptoJS.mode.OFB : CryptoJS.mode.ECB

            var encrypted = CryptoJS.DES.encrypt(plaintext, keyHex, {
                iv: ivHex,
                mode: modeObj,
                padding: CryptoJS.pad.Pkcs7
            })

            res.status(200).json({ 
                'plaintext': plaintext, 
                'key': key, 
                'ciphertext': encrypted.toString(),
                'mode': 'ECB',
                'padding': 'Pkcs7'
            })
        }
    }
}
