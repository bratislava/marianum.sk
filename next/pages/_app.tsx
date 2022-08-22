import '../styles/globals.css'

import { MotionConfig } from 'framer-motion'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { OverlayProvider } from 'react-aria'

import MI18nProvider from '../components/MI18nProvider'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MI18nProvider>
      <MotionConfig reducedMotion="user">
        <OverlayProvider>
          <Component {...pageProps} />
        </OverlayProvider>
      </MotionConfig>
    </MI18nProvider>
  )
}

export default appWithTranslation(MyApp)
