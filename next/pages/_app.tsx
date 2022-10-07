import '../styles/globals.css'
import '../styles/table.scss'

import { MotionConfig } from 'framer-motion'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { OverlayProvider } from 'react-aria'

import CookieBanner from '../components/atoms/CookieBanner'
import CookieConsent from '../components/atoms/CookieConsent'
import CookieSettingsModal from '../components/atoms/CookieSettingsModal'
import MI18nProvider from '../components/atoms/MI18nProvider'
import ThirdPartyScripts from '../components/atoms/ThirdPartyScripts'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#446650" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#446650" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#446650" />
      </Head>
      <MI18nProvider>
        <MotionConfig reducedMotion="user">
          <OverlayProvider>
            <CookieConsent banner={CookieBanner} modal={CookieSettingsModal}>
              <ThirdPartyScripts />
              <Component {...pageProps} />
            </CookieConsent>
          </OverlayProvider>
        </MotionConfig>
      </MI18nProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
