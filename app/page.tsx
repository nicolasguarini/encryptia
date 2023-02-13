'use client'

import SymmetricEncryptionCard from '../components/ui/SymmetricEncryptionCard';
import HomeHeader from '../components/ui/HomeHeader';
import Layout from '../components/layout/Layout';
import Divider from '../components/ui/Divider';
import CardsContainer from '../components/ui/CardsContainer';
import AsymmetricEncryptionCard from '../components/ui/AsymmetricEncryptionCard';
import HashCard from '../components/ui/HashCard';

export const metadata = {
    title: 'encryptia'
}

export default function Page() {
  return (
    <Layout>
      <HomeHeader />

      <CardsContainer>
        <SymmetricEncryptionCard 
            destination='/des'
            shortName='DES'
            name='Data Encryption System'
            keyBits='56 bits'
            securityLevel='Low'
          />

          <SymmetricEncryptionCard 
            destination={{
              pathname: '/des',
              query: {triple: true}
            }}
            shortName='TDES'
            name='Triple DES'
            keyBits='168 bits'
            securityLevel='Medium'
          />

          <SymmetricEncryptionCard 
            destination={{
              pathname: '/aes',
              query: {bits: '128'}
            }}
            shortName='AES-128'
            name='Advanced Encryption Standard'
            keyBits='128 bits'
            securityLevel='High'
          />

          <SymmetricEncryptionCard 
            destination={{
              pathname: '/aes',
              query: {bits: '192'}
            }}
            shortName='AES-192'
            name='Advanced Encryption Standard'
            keyBits='192 bits'
            securityLevel='High'
          />

          <SymmetricEncryptionCard 
            destination={{
              pathname: '/aes',
              query: {bits: '256'}
            }}
            shortName='AES-256'
            name='Advanced Encryption Standard'
            keyBits='256 bits'
            securityLevel='Very High'
          />

          <AsymmetricEncryptionCard 
            destination='/rsa'
            shortName='RSA'
            name='Rivest, Shamir, Adleman'
            keyBits='≥512 bit'
            securityLevel='Very High'
          />
      </CardsContainer>
      
      <Divider />

      <CardsContainer>
            <HashCard 
              destination='/md5'
              shortName='MD5'
              name='Message-Digest algorithm'
              securityLevel='Medium'
              blockSize='128 bit'
              bruteforceTime='8 Hours'
            />

            <HashCard 
              destination={{
                pathname: '/sha',
                query: {v: 'SHA-1'}
              }}
              shortName='SHA-1'
              name='Secure Hash Algorithm'
              securityLevel='Low'
              blockSize='160 bit'
              bruteforceTime='Infinite'
            />

            <HashCard 
              destination={{
                pathname: '/sha',
                query: {v: 'SHA-2'}
              }}
              shortName='SHA-2'
              name='Secure Hash Algorithm'
              securityLevel='High'
              blockSize='256 bit'
              bruteforceTime='Infinite'
            />
      </CardsContainer>
    </Layout>
  )
}
