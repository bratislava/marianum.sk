import { useTranslation } from 'next-i18next'
import { useContext, useMemo } from 'react'

import { cookieConsentContext } from '../../atoms/CookieConsent'
import MLink from '../../atoms/MLink'

const FooterCredentials = () => {
  const { t } = useTranslation('common', { keyPrefix: 'components.molecules.Footer' })

  const currentYear = useMemo(() => {
    return new Date().getFullYear()
  }, [])

  const { onOpenModal } = useContext(cookieConsentContext)

  return (
    <div className="border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-2 py-5 text-sm md:h-18 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <span>
            2022{currentYear !== 2022 ? ` - ${currentYear}` : ''} © {t('allRightsReserved')}
          </span>
          <span className="hidden md:inline">•</span>
          <MLink noStyles href="/" className="text-sm font-semibold underline">
            Marianum
          </MLink>
          <span className="hidden md:inline">•</span>
          <div>
            <span>{t('founder')} </span>
            <MLink
              noStyles
              href="https://bratislava.sk"
              className="text-sm font-semibold underline"
            >
              {t('cityBratislava')}
            </MLink>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="hover:underline" type="button" onClick={onOpenModal}>
            {t('cookieSettings')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FooterCredentials
