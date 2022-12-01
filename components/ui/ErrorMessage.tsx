import React, { ReactNode } from 'react'

export default function ErrorMessage({children}: {children: ReactNode}) {
  return (
    <p className='mt-5 text-rose-800 font-medium text-center'>
        {children}
    </p>
  )
}
