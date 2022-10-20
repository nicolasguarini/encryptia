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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora.
            </p>
        </AlgorithmHeader>

        <div className='container m-auto'>
          <div className='grid gird-cols-1 md:grid-cols-2 gap-12 p-1 md:p-10'>
            <div>
              <label className='block mb-3 text-slate-300' for='plaintext'>Plaintext</label>
              <input name='plaintext' type="text" className='bg-slate-900 border rounded-lg p-2 w-[100%] border-slate-500'/>
            </div>

            <div>
              <label className='block mb-3 text-slate-300' for='key'>Key (56 bit)</label>
              <input name='key' type="text" className='bg-slate-900 border rounded-lg p-2 w-[100%] border-slate-500'/>
            </div>
          </div>
          
          <button 
            onClick={handleClick}
            className='block border border-solid border-slate-500 rounded-lg bg-slate-100 text-slate-800 px-20 py-2 font-bold m-auto'
            >
            Encrypt
          </button>
        </div>

        
    </Layout>
  )
}
