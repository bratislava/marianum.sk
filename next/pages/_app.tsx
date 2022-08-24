import '../styles/globals.css'
import '../styles/table.css'

import { MotionConfig } from 'framer-motion'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

import MI18nProvider from '../components/atoms/MI18nProvider'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MI18nProvider>
      <MotionConfig reducedMotion="user">
        <Component {...pageProps} />
      </MotionConfig>
    </MI18nProvider>
  )
}

export default appWithTranslation(MyApp)
