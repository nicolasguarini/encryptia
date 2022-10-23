import Head from 'next/head'
import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import AlgorithmHeader from '../../components/ui/AlgorithmHeader'
import ErrorMessage from '../../components/ui/ErrorMessage'
import Loader from '../../components/ui/Loader'

export default function DES() {
  const modes = ['ECB', 'CBC', 'CFB', 'OFB', 'CTR']

  const [ciphertext, setCiphertext] = useState('')
  const [plaintext, setPlaintext] = useState('')
  const [key, setKey] = useState('')
  const [mode, setMode] = useState('ECB')
  const [IV, setIV] = useState('')
  const [encryptBtnContent, setEncryptBtnContent] = useState('Encrypt')
  const [decryptBtnContent, setDecryptBtnContent] = useState('Decrypt')
  const [errorMessage, setErrorMessage] = useState('')

  const handleEncryptBtnClick = async (event) => {
    event.preventDefault()
    setEncryptBtnContent(<Loader />)
    setErrorMessage('')

    let requestString = `plaintext=${plaintext}&key=${key}&mode=${mode}`
    if(mode != 'ECB') requestString += `&iv=${IV}`

    try{
      const res = await fetch(`/api/des?${requestString}`)
      const data = await res.json()
      const status = res.status
      
      if(status == 200){
        setCiphertext(data.ciphertext)
      }else if(status == 400){
        setErrorMessage(<ErrorMessage>{data.message}</ErrorMessage>)
      }
    }catch(error){
      setErrorMessage(<ErrorMessage>An error occurred</ErrorMessage>)
      console.log(error)
    }

    setEncryptBtnContent('Encrypt')
  }

  const handleDecryptBtnClick = async (event) => {
    event.preventDefault()
    setPlaintext('')
    setDecryptBtnContent(<Loader />)
    setErrorMessage('')

    let requestString = `key=${key}&mode=${mode}&ciphertext=${ciphertext}`
    if(mode != 'ECB') requestString += `&iv=${IV}`

    try{
      const res = await fetch(`/api/des?${requestString}`)
      const data = await res.json()
      const status = res.status

      if(status == 200){
        setPlaintext(data.plaintext)
      }else if(status == 400){
       setErrorMessage(<ErrorMessage>{data.message}</ErrorMessage>)
      }
    }catch(error){
      setErrorMessage(<ErrorMessage>An error occurred</ErrorMessage>)
      console.log(error)
    }
    
    setDecryptBtnContent('Decrypt')
  }

  const handleCiphertextChange = (event) => setCiphertext(event.target.value)
  const handlePlaintextChange = (event) => setPlaintext(event.target.value)
  const handleKeyChange = (event) => setKey(event.target.value)
  const handleModeChange = (event) => setMode(event.target.value)
  const handleIVChange = (event) => setIV(event.target.value)

  return (
    <Layout>
        <Head>
            <title>DES | encryptia</title>
        </Head>

        <AlgorithmHeader name="Data Encryption System">
            <p>
              The Data Encryption Standard (DES) is a symmetric-key algorithm developed in early 1970s for the encryption of digital data. <br />
              Although its short key length of 56 bits makes it too insecure for modern applications, it has been highly influential in the advancement of cryptography. 
              Despite the criticisms, DES was approved as a federal standard in November 1976, and published on 15 January 1977 as FIPS PUB 46, authorized for use on all unclassified data.
            </p>
        </AlgorithmHeader>

        <div className='max-w-5xl m-auto'>
          <div className='grid gird-cols-1 lg:grid-cols-10 gap-x-5 md:gap-x-7 xl:gap-x-9 gap-y-7 p-1 md:p-10'>
            <div className='item col-span-5'>
              <label className='block mb-3 text-slate-300'>Plaintext (64 bit blocks)</label>
              
              <input 
                name='plaintext' 
                type="text" 
                value={plaintext}
                onChange={handlePlaintextChange}
                className='bg-slate-900 border rounded-lg p-2 w-[100%] border-slate-500'
              />
            </div>

            <div className='item col-span-4'>
              <label className='block mb-3 text-slate-300' >Key (56 bit)</label>

              <input 
                name='key' 
                type="text" 
                value={key}
                onChange={handleKeyChange}
                maxLength='8' 
                className='bg-slate-900 border rounded-lg p-2 w-[100%] border-slate-500'
              />
            </div>

            <div className='item col-span-1'>
              <label className='block mb-3 text-slate-300'>Mode</label>

              <select value={mode} onChange={handleModeChange} className='text-slate-200 w-[100%] px-1 py-2 border border-solid border-slate-500 rounded-lg bg-slate-900'>
                {modes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
              </select>
            </div>
          </div>

          {mode != 'ECB' && 
            <div className='flex justify-center'>
              <div className='mb-0 md:mb-10 mt-6 md:mt-0'>
                <label className='block mb-3 text-slate-300'>Initialization Vector (IV)</label>
                <input 
                  name='iv' 
                  value={IV} 
                  onChange={handleIVChange}
                  type="text" 
                  className='bg-slate-900 border rounded-lg p-2 border-slate-500 w-[80vw] md:w-[40vw]'
                />
              </div>
            </div>
          }
          
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
