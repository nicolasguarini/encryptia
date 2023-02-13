'use client'

import { SetStateAction, useState } from "react";
import Layout from "../../components/layout/Layout";
import AlgorithmHeader from "../../components/ui/AlgorithmHeader";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Loader from "../../components/ui/Loader";

export const metadata = {
    title: 'MD5 | encryptia'
}

export default function MD5() {
    const [plaintext, setPlaintext] = useState<string>('')
    const [hash, setHash] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | JSX.Element>('')
    const [hashBtnContent, setHashBtnContent] = useState<string | JSX.Element>('Hash')

    const handleHashBtnClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        setErrorMessage('')
        setHashBtnContent(<Loader />)

        try{
            const res = await fetch(`/api/md5?plaintext=${plaintext}`)
            const data = await res.json()
            const status = res.status

            if(status == 200){
                setHash(data.hash)
            }else{
                setErrorMessage(
                    <ErrorMessage>
                        {data.message}
                    </ErrorMessage>
                )
            }
        }catch(e){
            setErrorMessage(
                <ErrorMessage>
                    {e.toString()}
                </ErrorMessage>
            )
        }

        setHashBtnContent('Hash')
    }

    const handlePlaintextChange = (event: { target: { value: SetStateAction<string>; }; }) => setPlaintext(event.target.value)
    const handleHashChange = (event: { target: { value: SetStateAction<string>; }; }) => setHash(event.target.value)

    return (
        <Layout>
            <AlgorithmHeader name='MD5'>
                <p>
                    The MD5 message-digest algorithm is a cryptographically broken but still widely used hash function producing a 128-bit hash value. 
                    <br />
                    Although MD5 was initially designed to be used as a cryptographic hash function, it has been found to suffer from extensive vulnerabilities. 
                    <br />
                    It can still be used as a checksum to verify data integrity, but only against unintentional corruption; collision attacks are possible when malice is introduced. 
                    <br />
                    It remains suitable for other non-cryptographic purposes, for example for determining the partition for a particular key in a partitioned database, and may be preferred due to lower computational requirements than more recent Secure Hash Algorithms.
                    <br /> <br />
                    MD5 was designed by Ronald Rivest in 1991 to replace an earlier hash function MD4, and was specified in 1992 as RFC 1321.
                </p>
            </AlgorithmHeader>
            
            <div className="max-w-3xl m-auto">
                <label className='block mb-3 text-slate-300'>Plaintext</label>
                
                <textarea 
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52 mb-5'
                    value={plaintext}
                    onChange={handlePlaintextChange}
                />

                <button 
                    className="block border border-solid border-gray-600 rounded-lg bg-gray-800 hover:text-white hover:bg-gray-700 px-14 py-2 font-medium m-auto mt-5 mb-5" 
                    onClick={handleHashBtnClick}
                >
                    {hashBtnContent}
                </button>

                {errorMessage}

                <label className='block mb-3 text-slate-300'>Hash</label>
                
                <textarea 
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52 mb-5'
                    value={hash}
                    onChange={handleHashChange}
                />
            </div>
        </Layout>
    )
}
