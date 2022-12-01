import { AppProps } from 'next/app'
import '../styles/globals.css'

function EncryptiaApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default EncryptiaApp
