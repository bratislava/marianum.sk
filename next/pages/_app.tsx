import '../styles/globals.css'

import { MotionConfig } from 'framer-motion'
import type { AppProps } from 'next/app'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { I18nProvider } from 'react-aria'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { i18n } = useTranslation()
  const locale = useMemo(() => {
    // eslint-disable-next-line sonarjs/no-small-switch
    if (i18n?.language === 'en') {
      /* https://unix.stackexchange.com/a/62317
       * https://github.com/date-fns/date-fns/issues/1996#issuecomment-984811417 */
      return 'en-IE'
    }
    return 'sk-SK'
  }, [i18n])

  return (
    <I18nProvider locale={locale}>
      <MotionConfig reducedMotion="user">
        <Component {...pageProps} />
      </MotionConfig>
    </I18nProvider>
  )
}

export default appWithTranslation(MyApp)
