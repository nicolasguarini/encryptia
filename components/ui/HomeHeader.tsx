import Link from 'next/link'
import React from 'react'

function HomeHeader() {
  return (
    <div className='container m-auto p-2'>
      <header className='relative'>
        <div className='relative mt-9 max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32'>
          <h1 className='font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center'>
            Easily encrypt your texts using the most known algorithms.
          </h1>

          <p className='mt-6 text-lg text-center max-w-3xl mx-auto text-slate-400'>
            You can also use encryptia for your personal projects with the free REST API reachable at <span className='font-mono font-medium text-sky-500'>/api/</span>! <br />
            For detailed instructions, <Link href="https://github.com/nicolasguarini/encryptia/" className='underline'>read the docs</Link>!
          </p>
          
          <p className='mt-3 text-sm text-center max-w-3xl mx-auto text-slate-500'>
            Created by <a href='https://nicolasguarini.it' className="underline" target="_blank" rel="noopener noreferrer">Nicolas Guarini</a>.
          </p>
        </div>
      </header>
    </div>
  )
}

export default HomeHeader