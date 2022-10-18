import Head from 'next/head';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Home/Header';

export default function Home() {
  return (
    <div>
      <Head>
        <title>encryptia</title>
      </Head>
      
      <Header />

      <div className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto p-10 lg:px-16 xl:px-24 mt-10 gap-12 '>
        <Card />
        <Card />
        <Card />

        <Card />
        <Card />
        <Card />
      </div>

      <Footer />
    </div>
  )
}
