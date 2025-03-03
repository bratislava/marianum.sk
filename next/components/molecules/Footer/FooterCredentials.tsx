import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import MLink from '@/components/atoms/MLink'
import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import { CtaButtonFragment } from '@/graphql'

type FooterCredentialsProps = {
  links: CtaButtonFragment[] | null | undefined
}

const FooterCredentials = ({ links }: FooterCredentialsProps) => {
  const { t } = useTranslation()
  const { getFullPath } = useGetFullPath()

  const currentYear = useMemo(() => {
    return new Date().getFullYear()
  }, [])

  return (
    <div className="border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-2 py-5 text-sm lg:h-18 lg:flex-row">
        <div className="flex flex-col items-center lg:items-start">
          <div className="flex flex-col items-center gap-2 lg:flex-row">
            <span>
              2015 - {currentYear} © {t('FooterCredentials.allRightsReserved')}
            </span>
            <span className="hidden lg:inline">•</span>
            <span>Marianum - Pohrebníctvo mesta Bratislavy</span>
          </div>
          <div>
            <span>{t('FooterCredentials.founder')}: </span>
            <MLink
              noStyles
              href="https://bratislava.sk"
              className="text-sm font-semibold underline"
            >
              {t('FooterCredentials.cityBratislava')}
            </MLink>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-4">
          {links?.map((link, index) => (
            <MLink
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              href={getFullPath(link.page?.data) ?? ''}
              noStyles
              className="hover:underline"
            >
              {link.label}
            </MLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FooterCredentials
