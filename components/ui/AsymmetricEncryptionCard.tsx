import React from 'react'
import Link from 'next/link'
import LockIcon from '../icons/LockIcon'
import RightArrowIcon from '../icons/RightArrowIcon'
import KeyIcon from '../icons/KeyIcon'
import ShieldIcon from '../icons/ShieldIcon'
import BookIcon from '../icons/BookIcon'

type Props = {
    destination: string,
    shortName: string,
    name: string,
    keyBits: string,
    securityLevel: string
}

export default function AsymmetricEncryptionCard({ destination, shortName, name, keyBits, securityLevel }: Props) {
  return (
    <Link href={destination}> 
        <a>
            <div className='cursor-pointer border-solid border-2 rounded-2xl border-slate-600 hover:border-slate-400 mb-10 px-5 py-4 text-slate-500 hover:text-slate-50 ease-linear duration-200'>
                <div className='relative border-solid border-b-[1px] pb-3 border-slate-700 '>
                    <LockIcon />

                    <div className='inline font-bold text-xl pl-3 border-solid border-l-[1px] border-slate-700 align-middle'>
                        {shortName}
                    </div>

                    <RightArrowIcon />
                </div>

                <div className='my-3 font-semibold'>
                    {name}
                </div>

                <div className=' font-semibold'>
                    <div className='mb-2'>
                        <KeyIcon />

                        <span className='align-middle'>
                            {keyBits}
                        </span>
                    </div>
                    <div className='mb-2'>
                        <ShieldIcon />

                        <span className='align-middle'>
                            {securityLevel}
                        </span>
                    </div>
                    <div className='mb-2'>
                        <BookIcon />

                        <span className='align-middle'>Asymmetric</span>
                    </div>
                </div>
            </div>
        </a>
    </Link>
  )
}
