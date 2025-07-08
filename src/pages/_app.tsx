import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImg from '../assets/logo.png'
import { Container, Header } from '../styles/pages/app'

globalStyles()

function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <img src={logoImg.src} alt="" />
        <h1>Brazilian Ballerz</h1>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}

export default App
