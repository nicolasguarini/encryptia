'use client'

import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import AlgorithmHeader from '../../components/ui/AlgorithmHeader'
import ErrorMessage from '../../components/ui/ErrorMessage'
import Loader from '../../components/ui/Loader'
import * as Constants from '../../utils/constants'

export const metadata = {
    title: 'RSA | encryptia'
}

export default function RSA() {
    const [generateKeysBtnContent, setGenerateKeysBtnContent] = useState<string | JSX.Element>('Generate Keys')
    const [privateKey, setPrivateKey] = useState<string>('')
    const [publicKey, setPublicKey] = useState<string>('')
    const [bits, setBits] = useState<string | number>('2048')
    const [plaintext, setPlaintext] = useState<string>('')
    const [ciphertext, setCiphertext] = useState<string>('')
    const [encryptMethod, setEncryptMethod] = useState<string>('Public Key')
    const [errorMessage, setErrorMessage] = useState<string | JSX.Element>('')
    const [encryptBtnContent, setEncryptBtnContent] = useState<string | JSX.Element>('Encrypt')
    const [decryptBtnContent, setDecryptBtnContent] = useState<string | JSX.Element>('Decrypt')

    const keys: string[] = Array.from(Constants.bitsMap.keys())

    const handleGenerateKeysBtnClick = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        setGenerateKeysBtnContent(<Loader />)

        try{
            const res: Response = await fetch(`/api/rsa/generate-keys?bits=${bits}`)
            const data = await res.json()
            const status: number = res.status

            if(status == 200){
                setPrivateKey(data.privateKey)
                setPublicKey(data.publicKey)
            }else{
                setErrorMessage(<ErrorMessage>{data.message}</ErrorMessage>)
            }
        }catch(error){
            setErrorMessage(<ErrorMessage>{error.toString()}</ErrorMessage>)
        }

        setGenerateKeysBtnContent('Generate Keys')
    }

    const handleEncryptBtnClick = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        setErrorMessage('')
        setEncryptBtnContent(<Loader />)
        
        try{
            const encodedPlaintext = encodeURI(plaintext.replace(/\+/g, '%2b'))
            let requestString = `/api/rsa?plaintext=${encodedPlaintext}`

            if(encryptMethod == 'Private Key'){
                const encodedPrivateKey = encodeURI(privateKey.replace(/\+/g, '%2b'))
                requestString += `&privateKey=${encodedPrivateKey}`
            }else if(encryptMethod == 'Public Key'){
                const encodedPublicKey = encodeURI(publicKey.replace(/\+/g, '%2b'))
                requestString += `&publicKey=${encodedPublicKey}`
            }

            const res: Response = await fetch(requestString)
            const data = await res.json()
            const status: number = res.status

            if(status == 200){
                setCiphertext(data.ciphertext)
            }else{
                setErrorMessage(<ErrorMessage>{data.message}</ErrorMessage>)
            }
        }catch(error){
            setErrorMessage(<ErrorMessage>{error.toString()}</ErrorMessage>)
        }

        setEncryptBtnContent('Encrypt')
    }

    const handleDecryptBtnClick = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        setDecryptBtnContent(<Loader />)
        setErrorMessage('')

        try{
            const encodedCiphertext = encodeURI(ciphertext.replace(/\+/g, '%2b'))
            let requestString = `/api/rsa?ciphertext=${encodedCiphertext}`

            if(encryptMethod == 'Private Key'){
                const encodedPrivateKey = encodeURI(privateKey.replace(/\+/g, '%2b'))
                requestString += `&privateKey=${encodedPrivateKey}`
            }else if(encryptMethod == 'Public Key'){
                const encodedPublicKey = encodeURI(publicKey.replace(/\+/g, '%2b'))
                requestString += `&publicKey=${encodedPublicKey}`
            }

            const res = await fetch(requestString)
            const data = await res.json()
            const status = res.status

            if(status == 200){
                setPlaintext(data.plaintext)
            }else{
                setErrorMessage(<ErrorMessage>{data.message}</ErrorMessage>)
            }
        }catch(error){
            setErrorMessage(<ErrorMessage>{error.toString()}</ErrorMessage>)
        }
        
        setDecryptBtnContent('Decrypt')
    }

    const handleBitsChange = (event: { target: { value: React.SetStateAction<string | number> } }) => setBits(event.target.value)
    const handlePublicKeyChange = (event: { target: { value: React.SetStateAction<string> } }) => setPublicKey(event.target.value)
    const handlePrivateKeyChange = (event: { target: { value: React.SetStateAction<string> } }) => setPrivateKey(event.target.value)
    const handlePlaintextChange = (event: { target: { value: React.SetStateAction<string> } }) => setPlaintext(event.target.value)
    const handleCiphertextChange = (event: { target: { value: React.SetStateAction<string> } }) => setCiphertext(event.target.value)
    const handleEncryptMethodChange = (event: { target: { value: React.SetStateAction<string> } }) => setEncryptMethod(event.target.value)

    return (
        <Layout>
            <AlgorithmHeader name="Rivest-Shamir-Adleman">
                RSA is a public-key cryptosystem that is widely used for secure data transmission. It is also one of the oldest. 
                The acronym "RSA" comes from the surnames of Ron Rivest, Adi Shamir and Leonard Adleman, who publicly described the algorithm in 1977.<br />
                In a public-key cryptosystem, the encryption key is public and distinct from the decryption key, which is kept secret (private). An RSA user creates and publishes a public key based on two large prime numbers, along with an auxiliary value. 
                ùThe prime numbers are kept secret. Messages can be encrypted by anyone, via the public key, but can only be decoded by someone who knows the prime numbers. <br /> <br />

                The security of RSA relies on the practical difficulty of factoring the product of two large prime numbers, the "factoring problem". Breaking RSA encryption is known as the RSA problem. Whether it is as difficult as the factoring problem is an open question. There are no published methods to defeat the system if a large enough key is used.
                RSA is a relatively slow algorithm. Because of this, it is not commonly used to directly encrypt user data. More often, RSA is used to transmit shared keys for symmetric-key cryptography, which are then used for bulk encryption–decryption.
            </AlgorithmHeader>

            <div className='max-w-5xl m-auto'>
                <div className='grid grid-cols-0 sm:grid-cols-2 gap-6 mb-5'>
                    <div className='item'>
                        <label className='block mb-3 text-slate-300'>Public Key</label>
                        <textarea 
                            className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52'
                            value={publicKey}
                            onChange={handlePublicKeyChange}>
                        </textarea>
                    </div>
                    <div className='item'>
                        <label className='block mb-3 text-slate-300'>Private Key</label>
                        <textarea 
                            className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52' 
                            value={privateKey}
                            onChange={handlePrivateKeyChange}>
                        </textarea>
                    </div>
                </div>

                <div className='text-center'>
                    <select 
                        className='inline text-slate-200 px-1 py-2 border border-solid border-slate-500 rounded-lg bg-slate-900 mr-3 mb-5 md:mb-0' 
                        value={bits}
                        onChange={handleBitsChange}>
                        {keys.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>

                    <button 
                        className='inline border border-solid border-gray-600 rounded-lg bg-gray-800 hover:text-white hover:bg-gray-700 px-3 sm:px-10 py-2 font-medium m-auto'
                        onClick={handleGenerateKeysBtnClick}>
                        {generateKeysBtnContent}
                    </button>
                </div>

                <div className='mt-7'>
                    <label className='block mb-3 text-slate-300'>Plaintext</label>
                    <textarea className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52 mb-5'
                        value={plaintext}
                        onChange={handlePlaintextChange}>

                    </textarea>

                    <div className='text-center mb-5 grid grid-cols-1 md:grid-cols-3 w-2/3 lg:w-1/2 m-auto gap-y-5'>
                        <select className='inline text-slate-200 px-1 py-2 border border-solid border-slate-500 mx-3 rounded-lg bg-slate-900'
                            value={encryptMethod} onChange={handleEncryptMethodChange}>
                            <option>Public Key</option>
                            <option>Private Key</option>
                        </select>

                        <button className='inline border border-solid border-gray-600 rounded-lg bg-gray-800 hover:text-white hover:bg-gray-700 px-10 py-2 font-medium m-auto'
                            onClick={handleEncryptBtnClick}>
                            {encryptBtnContent}
                        </button>

                        <button className='inline border border-solid border-gray-600 rounded-lg bg-gray-800 hover:text-white hover:bg-gray-700 px-10 py-2 font-medium m-auto'
                            onClick={handleDecryptBtnClick}>
                            {decryptBtnContent}
                        </button>
                    </div>
                    {errorMessage}
                    <label className='block mb-3 text-slate-300'>Ciphertext</label>
                    <textarea className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52 mb-5'
                        value={ciphertext}
                        onChange={handleCiphertextChange}>
                    </textarea>
                </div>
            </div>
        </Layout>
    )
}
