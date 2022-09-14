import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import MLink from '../../atoms/MLink'

const FooterCredentials = () => {
  const { t } = useTranslation('common', { keyPrefix: 'components.molecules.Footer' })

  const currentYear = useMemo(() => {
    return new Date().getFullYear()
  }, [])

  return (
    <div className="border-t border-border">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 py-5 px-4 text-sm md:h-18 md:flex-row">
        <div className="flex items-center gap-2">
          <span>{t('founder')}</span>
          <MLink noStyles href="https://bratislava.sk" className="text-sm font-semibold underline">
            {t('cityBratislava')}
          </MLink>
        </div>
        <div className="flex items-center gap-2">
          <span>
            2022{currentYear !== 2022 ? ` - ${currentYear}` : ''} © {t('allRightsReserved')}
          </span>
          <span>•</span>
          <MLink noStyles href="/" className="text-sm font-semibold underline">
            Marianum
          </MLink>
        </div>
      </div>
    </div>
  )
}

export default FooterCredentials
