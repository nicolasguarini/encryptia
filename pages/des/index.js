import Head from 'next/head'
import React from 'react'
import Layout from '../../components/layout/Layout'
import AlgorithmHeader from '../../components/ui/AlgorithmHeader'

export default function DES() {
  const handleClick = () => {
    console.log("clicked")
  }

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

        <div className='container m-auto'>
          <div className='grid gird-cols-1 md:grid-cols-2 gap-12 p-1 md:p-10'>
            <div>
              <label className='block mb-3 text-slate-300'>Plaintext</label>
              <input name='plaintext' type="text" className='bg-slate-900 border rounded-lg p-2 w-[100%] border-slate-500'/>
            </div>

            <div>
              <label className='block mb-3 text-slate-300' >Key (56 bit)</label>
              <input name='key' type="text" className='bg-slate-900 border rounded-lg p-2 w-[100%] border-slate-500'/>
            </div>
          </div>
          
          <button onClick={handleClick} className='block border border-solid border-slate-500 rounded-lg bg-slate-100 text-slate-800 px-20 py-2 mt-10 md:mt-0 font-bold m-auto'>
            Encrypt
          </button>

          <div className='flex justify-center'>
            <div className='mt-9'>
              <label className='block mb-3 text-slate-300'>Cyphertext</label>
              <input name='cyphertext' type="text" className='bg-slate-900 border rounded-lg p-2 border-slate-500 w-[80vw] md:w-[40vw]' disabled/>
            </div>
          </div>
        </div>
        
    </Layout>
  )
}
