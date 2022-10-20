//api/des

export default function handler(req, res) {
    if(req.method == 'GET'){
        const query = req.query
        const {plaintext, key} = query
        const cyphertext = 'idaW8ixz0iCxvVttt1VDsA=='

        res.status(200).json({ 'plaintext': plaintext, 'key': key, 'cyphertext': cyphertext })
    }
}