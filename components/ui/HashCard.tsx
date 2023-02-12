import React from 'react'
import Link from 'next/link'
import LockIcon from '../icons/LockIcon'
import RightArrowIcon from '../icons/RightArrowIcon'
import ClockIcon from '../icons/ClockIcon'
import ShieldIcon from '../icons/ShieldIcon'
import BookIcon from '../icons/BookIcon'

type Props = {
    destination: string | {
        pathname: string, 
        query: any
    },
    shortName: string,
    name: string,
    bruteforceTime: string,
    securityLevel: string,
    blockSize: string
}

export default function HashCard({destination, shortName, name, bruteforceTime, securityLevel, blockSize}: Props) {
  return (
    <Link href={destination}> 
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
                    <ClockIcon />

                    <span className='align-middle'>
                        {bruteforceTime}
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

                    <span className='align-middle'>{blockSize}</span>
                </div>
            </div>
        </div>
    </Link>
  )
}
