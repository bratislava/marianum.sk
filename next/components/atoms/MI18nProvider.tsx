import { useTranslation } from 'next-i18next'
import { PropsWithChildren, useMemo } from 'react'
import { I18nProvider } from 'react-aria'

const MI18nProvider = ({ children }: PropsWithChildren) => {
  const { i18n } = useTranslation()
  const locale = useMemo(() => {
    if (i18n?.language === 'en') {
      /* https://unix.stackexchange.com/a/62317
       * https://github.com/date-fns/date-fns/issues/1996#issuecomment-984811417 */
      return 'en-IE'
    }
    return 'sk-SK'
  }, [i18n])

  return <I18nProvider locale={locale}>{children}</I18nProvider>
}

export default MI18nProvider
