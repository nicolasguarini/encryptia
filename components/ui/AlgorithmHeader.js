import React from 'react'

function AlgorithmHeader(props) {
  return (
    <>
        <div className='font-extrabold text-4xl sm:text-5xl lg:text-6xl text-center pt-32'>
            {props.name}
        </div>

        <div className='px-2 py-12 text-slate-400 max-w-5xl m-auto'>
            {props.children}
        </div>
    </>
  )
}

export default AlgorithmHeader