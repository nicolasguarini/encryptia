import React from 'react'
import Link from 'next/link'
import LogoIcon from '../icons/LogoIcon'
import GitHubIcon from '../icons/GitHubIcon'

function Navbar() {
  return (
    <div className='relative pt-6 lg:pt-8 flex items-center justify-between font-semibold text-md leading-6 text-slate-200'>
        <Link href='/'>
            <span className='text-xl'>
                <LogoIcon />
            </span>
        </Link>

        <div className='flex item-center'>
            <div className='flex items-center'>
                <nav className='hidden md:block'>
                    <ul className="flex items-center space-x-8">
                        <li>
                            <Link href="/" className='hover:text-sky-500 dark:hover:text-sky-400'>Home</Link>
                        </li>
                        <li>
                            <Link href="https://github.com/nicolasguarini/encryptia/" className="hover:text-sky-500 dark:hover:text-sky-400">
                                Docs
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className='flex items-center border-l ml-6 pl-6 border-slate-800'>
                    <Link href="https://github.com/nicolasguarini/" className="block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300" target='_blank' passHref>
                        <GitHubIcon />
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar