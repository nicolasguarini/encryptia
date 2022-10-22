import Head from 'next/head';
import Card from '../components/ui/Card';
import Footer from '../components/layout/Footer';
import HomeHeader from '../components/ui/HomeHeader';
import Layout from '../components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <HomeHeader />
      <Head>
        <title>encryptia</title>
      </Head>
      
      <div className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto p-10 lg:px-16 xl:px-24 mt-10 gap-12 '>
        <Card 
          destination='/des'
          shortName='DES'
          name='Data Encryption System'
          keyBits='56 bits'
          securityLevel='Low'
          bruteForceTime='22 hours'
        />
        <Card 
          destination='/tdes'
          shortName='TDES'
          name='Triple DES'
          keyBits='168 bits'
          securityLevel='Medium'
          bruteForceTime='Trillion years'
        />
        <Card 
          destination='/aes?bits=128'
          shortName='AES-128'
          name='Advanced Encryption Standard'
          keyBits='128 bits'
          securityLevel='High'
          bruteForceTime='Trillion years'
        />
        <Card 
          destination='/aes?bits=192'
          shortName='AES-192'
          name='Advanced Encryption Standard'
          keyBits='192 bits'
          securityLevel='High'
          bruteForceTime='Trillion years'
        />
        <Card 
          destination='/aes?bits=256'
          shortName='AES-256'
          name='Advanced Encryption Standard'
          keyBits='256 bits'
          securityLevel='Very High'
          bruteForceTime='Trillion years'
        />
      </div>
    </Layout>
  )
}
