import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import AlgorithmHeader from '../components/ui/AlgorithmHeader'
import ErrorMessage from '../components/ui/ErrorMessage'
import Loader from '../components/ui/Loader'
import * as Constants from '../utils/constants'

export default function AES() {
    const router = useRouter()
    const bits = Constants.AESVariants.includes(router.query.bits) 
        ? router.query.bits 
        : Constants.AESVariants[0]

    const [ciphertext, setCiphertext] = useState('')
    const [plaintext, setPlaintext] = useState('')
    const [key, setKey] = useState('')
    const [variant, setVariant] = useState(bits)
    const [encryptBtnContent, setEncryptBtnContent] = useState('Encrypt')
    const [decryptBtnContent, setDecryptBtnContent] = useState('Decrypt')
    const [errorMessage, setErrorMessage] = useState('')

    const handleCiphertextChange = (event) => setCiphertext(event.target.value)
    const handlePlaintextChange = (event) => setPlaintext(event.target.value)
    const handleKeyChange = (event) => setKey(event.target.value)
    const handleVariantChange = (event) => setVariant(event.target.value)
    
    const handleEncryptBtnClick = async (event) => {
        event.preventDefault()
        setEncryptBtnContent(<Loader />)
        setErrorMessage('')

        try{
            const res = await fetch(`/api/aes?plaintext=${plaintext}&key=${key}`)
            const data = await res.json()
            const status = res.status

            if(status == 200){
                setCiphertext(data.ciphertext)
            }else if(status == 400 || status == 500){
                console.log(data.message)
                setErrorMessage(<ErrorMessage>{data.message}</ErrorMessage>)
            }
        }catch(error){
            console.log(error)
            setErrorMessage(<ErrorMessage>{error.toString()}</ErrorMessage>)
        }

        setEncryptBtnContent('Encrypt')
    }

    const handleDecryptBtnClick = async (event) => {
        event.preventDefault()
        setDecryptBtnContent(<Loader />)
        setErrorMessage('')

        try{
            const res = await fetch(`/api/aes?ciphertext=${ciphertext}&key=${key}`)
            const data = await res.json()
            const status = res.status

            if(status == 200){
                setPlaintext(data.plaintext)
            }else if(status == 400 || status == 500){
                console.log(data.message)
                setErrorMessage(<ErrorMessage>{data.message}</ErrorMessage>)
            }
        }catch(error){
            console.log(error)
            setErrorMessage(<ErrorMessage>{error.toString()}</ErrorMessage>)
        }

        setDecryptBtnContent('Decrypt')
    }

    return (
        <Layout>
            <Head>
                <title>AES | encryptia</title>
            </Head>

            <AlgorithmHeader name="Advanced Encryptrion Standard">
                The Advanced Encryption Standard (AES), also known by its original name Rijndael,
                is a specification for the encryption of electronic data established by the U.S. National Institute of Standards and Technology (NIST) in 2001.<br />
                AES has been adopted by the U.S. government. It supersedes the Data Encryption Standard (DES),which was published in 1977. 
                The algorithm described by AES is a symmetric-key algorithm, meaning the same key is used for both encrypting and decrypting the data. <br />
                AES is based on a design principle known as a substitution–permutation network, and is efficient in both software and hardware. Unlike its predecessor DES, AES does not use a Feistel network.
            </AlgorithmHeader>
            
            <div className='max-w-5xl m-auto'>
            <div className='grid gird-cols-1 lg:grid-cols-10 gap-x-5 md:gap-x-7 xl:gap-x-9 gap-y-7 p-1 md:p-10'>
                <div className='item col-span-5'>
                <label className='block mb-3 text-slate-300'>Plaintext (128 bit blocks)</label>
                
                <input 
                    name='plaintext' 
                    type="text" 
                    value={plaintext}
                    onChange={handlePlaintextChange}
                    className='bg-slate-900 border rounded-lg p-2 w-[100%] border-slate-500'
                />
                </div>

                <div className='item col-span-4'>
                <label className='block mb-3 text-slate-300' >Key ({variant} bit)</label>

                <input 
                    name='key' 
                    type="text" 
                    value={key}
                    onChange={handleKeyChange}
                    maxLength={parseInt(variant) / 8}
                    className='bg-slate-900 border rounded-lg p-2 w-[100%] border-slate-500'
                />
                </div>

                <div className='item col-span-1'>
                <label className='block mb-3 text-slate-300'>Variant</label>

                <select value={variant} onChange={handleVariantChange} className='text-slate-200 w-[100%] px-1 py-2 border border-solid border-slate-500 rounded-lg bg-slate-900'>
                    <option>128</option>
                    <option>192</option>
                    <option>256</option>
                </select>
                </div>
            </div>

            <div className='block text-center'>
                <button 
                onClick={handleEncryptBtnClick}
                className='block md:inline border border-solid border-gray-600 rounded-lg bg-gray-800 hover:text-white hover:bg-gray-700 px-20 py-2 mt-10 md:mt-0 font-medium m-auto'
                >
                {encryptBtnContent}
                </button>

                <button 
                onClick={handleDecryptBtnClick}
                className='block md:inline md:ml-5 border border-solid border-gray-600 rounded-lg bg-gray-800 hover:text-white hover:bg-gray-700 px-20 py-2 mt-10 md:mt-0 font-medium m-auto'
                >
                {decryptBtnContent}
                </button>

                {errorMessage}
            </div>
            
            <div className='flex justify-center'>
                <div className='mt-9'>
                <label className='block mb-3 text-slate-300'>Cyphertext (Encoded in Base64)</label>
                <input 
                    name='ciphertext' 
                    value={ciphertext} 
                    onChange={handleCiphertextChange}
                    type="text" 
                    className='bg-slate-900 border rounded-lg p-2 border-slate-500 w-[80vw] md:w-[40vw]'
                />
                </div>
            </div>
            </div>
        </Layout>
    )
}