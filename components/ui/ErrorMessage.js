import React from 'react'

export default function ErrorMessage(props) {
  return (
    <p className='mt-5 text-rose-800 font-medium text-center'>
        {props.children}
    </p>
  )
}
