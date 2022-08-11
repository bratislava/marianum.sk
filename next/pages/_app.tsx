import '../styles/globals.css'

import { MotionConfig } from 'framer-motion'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <MotionConfig reducedMotion="user">
    <Component {...pageProps} />
  </MotionConfig>
)

export default appWithTranslation(MyApp)
