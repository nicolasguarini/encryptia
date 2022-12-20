import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import AlgorithmHeader from "../components/ui/AlgorithmHeader";
import ErrorMessage from "../components/ui/ErrorMessage";
import Loader from "../components/ui/Loader";
import * as Constants from '../utils/constants'

export default function SHA() {
    const router: NextRouter = useRouter()
    const [shaVariant, setShaVariant] = useState<string>('')

    useEffect(() => {
        if(!router.query.v) return

        setShaVariant(Constants.SHAVariants.includes(router.query.v.toString())
            ? router.query.v.toString()
            : Constants.SHAVariants[1] )
    }, [router.query.v])

    const [plaintext, setPlaintext] = useState<string>('')
    const [hash, setHash] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | JSX.Element>('')
    const [hashBtnContent, setHashBtnContent] = useState<string | JSX.Element>('Hash')

    const handleHashBtnClick = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        setErrorMessage('')
        setHashBtnContent(<Loader />)

        const request: string = `/api/sha?plaintext=${plaintext}&v=${shaVariant.replace('SHA-', '')}`

        try{
            const res: Response = await fetch(request)
            const data = await res.json()
            const status: number = res.status

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
    const handleShaVersionChange = (event: { target: { value: SetStateAction<string>; }; }) => setShaVariant(event.target.value)

    return (
        <Layout>
            <Head>
                <title>SHA | encryptia</title>
            </Head>

            <AlgorithmHeader name='SHA'>
                <p>
                    SHA stands for Secure Hashing Algorithm. SHA is a modified version of MD5 and used for hashing data and certificates. 
                    When learning about SHA forms, several different types of SHA are referenced. Examples of SHA names used are SHA-1, SHA-2, SHA-256, SHA-512, SHA-224, and SHA-384, 
                    but in actuality there are only two types: SHA-1 and SHA-2. The other larger numbers, like SHA-256, are just versions of SHA-2 that note the bit lengths of the SHA-2. 
                    <br /><br />
                    At this point in time, SHA-2 is the industry standard for hashing algorithms, though SHA-3 may eclipse this in the future. SHA-3 was released by the NIST, which also created SHA-1 and SHA-2, in 2015 but was not made the industry standard for many reasons.
                </p>
            </AlgorithmHeader>
            
            <div className="max-w-3xl m-auto">
                <label className='block mb-3 text-slate-300'>Plaintext</label>
                
                <textarea 
                    className='bg-transparent border border-solid rounded-lg border-slate-500 w-[100%] p-2 h-28 max-h-52 mb-5'
                    value={plaintext}
                    onChange={handlePlaintextChange}
                />

                <div className="text-center">
                    <select 
                        className="inline text-slate-200 px-1 py-2 border border-solid border-slate-500 rounded-lg bg-slate-900 mr-3 mb-5 md:mb-0"
                        value={shaVariant}
                        onChange={handleShaVersionChange}    
                    >
                        {Constants.SHAVariants.map((variant) => <option key={variant} value={variant}>{variant}</option>)}
                    </select>
                    
                    <button 
                        className="inline border border-solid border-gray-600 rounded-lg bg-gray-800 hover:text-white hover:bg-gray-700 px-14 py-2 font-medium m-auto mt-5 mb-5" 
                        onClick={handleHashBtnClick}
                    >
                        {hashBtnContent}
                    </button>
                </div>

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
