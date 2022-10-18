import Head from 'next/head'
import React from 'react'
import Layout from '../../components/layout/Layout'
import AlgorithmHeader from '../../components/ui/AlgorithmHeader'

function DES() {
  return (
    <Layout>
        <Head>
            <title>DES | encryptia</title>
        </Head>

        <AlgorithmHeader name="Data Encryption System">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora.
            </p>
        </AlgorithmHeader>
    </Layout>
  )
}

export default DES