import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className='container m-auto p-2 px-4 sm:px-6 md:px-8'>
        <Navbar />

        <main>
            {children}
        </main>

        <Footer />
    </div>
  )
}

export default Layout