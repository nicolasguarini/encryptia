import React from 'react'

function AlgorithmHeader({name, children}: {name: string, children: React.ReactNode}) {
  return (
    <>
        <div className='font-extrabold text-4xl sm:text-5xl lg:text-6xl text-center pt-24 md:pt-32'>
            {name}
        </div>

        <div className='px-2 py-12 text-slate-400 max-w-5xl m-auto'>
            {children}
        </div>
    </>
  )
}

export default AlgorithmHeader