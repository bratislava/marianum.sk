import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import MLink from '../../atoms/MLink'
import FooterMap, { FooterMapProps } from './FooterMap'

export type FooterProps = {
  navigateToLink: string
  address: string
  openingHours: string
  phoneNumber: string
  emailAddress: string
  contactPageLink: string
  linkColumns: {
    title: string
    links: {
      label: string
      url: string
      targetBlank: boolean
    }[]
  }[]
} & Omit<FooterMapProps, 'onMarkerClick'>

const Footer = ({
  navigateToLink,
  address,
  openingHours,
  phoneNumber,
  emailAddress,
  contactPageLink,
  linkColumns,
  ...footerMapProps
}: FooterProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'components.Footer' })

  const year = useMemo(() => {
    return new Date().getFullYear()
  }, [])

  return (
    <footer className="sticky top-full flex flex-col gap-18">
      <div className="container mx-auto flex flex-col gap-14 px-4">
        <div className="grid bg-primary text-white md:grid-cols-3 lg:grid-cols-2">
          <div className="h-52 w-full md:h-full">
            <FooterMap
              // eslint-disable-next-line security/detect-non-literal-fs-filename
              onMarkerClick={() => window.open(navigateToLink, '_blank')?.focus()}
              {...footerMapProps}
            />
          </div>

          <div className="flex w-full flex-col gap-4 px-4 py-6 md:col-span-2 md:px-8 lg:col-span-1 lg:gap-8 lg:px-12 lg:py-8">
            <div className="flex flex-col gap-3">
              <div className="text-lg font-bold">{t('address')}</div>
              <div className="flex flex-col gap-2 text-sm font-regular">
                <MLink noStyles href={navigateToLink} className="opacity-72">
                  {address}
                </MLink>
                <div className="flex gap-4">
                  <div className="opacity-72">{t('open')}</div>
                  <div>{openingHours}</div>
                </div>
              </div>
            </div>
            <div className="h-[1px] bg-white/12" />
            <div className="relative flex flex-col gap-3">
              <div className="text-lg font-bold">{t('contacts')}</div>
              <div className="flex flex-col gap-2 text-sm font-regular">
                <MLink noStyles href={`tel:${phoneNumber}`} className="opacity-72">
                  {phoneNumber}
                </MLink>
                <MLink noStyles href={`mailto:${emailAddress}`} className="opacity-72">
                  {emailAddress}
                </MLink>
              </div>
              <div className="top-1 right-0 flex md:absolute">
                <MLink variant="white" href={contactPageLink}>
                  {t('allContacts')}
                </MLink>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {linkColumns.map(({ title, links }) => (
            <div className="flex flex-col gap-4">
              <h4>{title}</h4>
              <div className="flex flex-col gap-3">
                {links.map(({ label, url, targetBlank }) => (
                  <MLink noStyles href={url} target={targetBlank ? '_blank' : '_self'}>
                    {label}
                  </MLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 py-5 px-4 text-sm md:h-18 md:flex-row">
          <div className="flex items-center gap-2">
            <span>{t('founder')}</span>
            <MLink
              noStyles
              href="https://bratislava.sk"
              className="text-sm font-semibold underline"
            >
              {t('cityBratislava')}
            </MLink>
          </div>
          <div className="flex items-center gap-2">
            <span>
              {year} © {t('allRightsReserved')}
            </span>
            <span>•</span>
            <MLink noStyles href="/" className="text-sm font-semibold underline">
              Marianum
            </MLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
