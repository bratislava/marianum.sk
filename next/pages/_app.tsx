import '../styles/globals.css'

import { MotionConfig } from 'framer-motion'
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <MotionConfig reducedMotion="user">
    <Component {...pageProps} />
  </MotionConfig>
)

export default MyApp
