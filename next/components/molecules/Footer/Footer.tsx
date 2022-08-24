import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import FacebookIcon from '../../../assets/facebook.svg'
import InstagramIcon from '../../../assets/instagram.svg'
import LinkedInIcon from '../../../assets/linked_in.svg'
import TwitterIcon from '../../../assets/twitter.svg'
import YoutubeIcon from '../../../assets/youtube.svg'
import {
  ComponentGeneralContacts,
  ComponentGeneralFooter,
  ComponentGeneralSocial,
} from '../../../graphql'
import MLink from '../../atoms/MLink'
import FooterMap from './FooterMap'

export type FooterProps = {
  contact?: ComponentGeneralContacts | null
  footer?: ComponentGeneralFooter | null
  social?: ComponentGeneralSocial | null
}

const Footer = ({ contact, footer, social }: FooterProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'components.Footer' })

  const year = useMemo(() => {
    return new Date().getFullYear()
  }, [])

  const footerColumns = useMemo(() => {
    return [
      {
        title: footer?.title1,
        links: footer?.links1,
      },
      {
        title: footer?.title2,
        links: footer?.links2,
      },
      {
        title: footer?.title3,
        links: footer?.links3,
      },
      {
        title: footer?.title4,
        links: footer?.links4,
      },
    ]
  }, [footer])

  return (
    <footer className="sticky top-full flex flex-col gap-18">
      <div className="container mx-auto flex flex-col gap-14 px-4">
        <div className="grid bg-primary text-white md:grid-cols-3 lg:grid-cols-2">
          <div className="h-52 w-full md:h-full">
            <FooterMap
              onMarkerClick={() =>
                // eslint-disable-next-line security/detect-non-literal-fs-filename
                window.open(contact?.navigateToLink ?? '', '_blank')?.focus()
              }
              markerLat={contact?.latitude}
              markerLng={contact?.longitude}
            />
          </div>

          <div className="flex w-full flex-col gap-4 px-4 py-6 md:col-span-2 md:px-8 lg:col-span-1 lg:gap-8 lg:px-12 lg:py-8">
            <div className="relative flex flex-col gap-3">
              <div className="text-lg font-bold">{t('address')}</div>
              <div className="flex flex-col gap-2 text-sm font-regular">
                {contact?.address && (
                  <MLink noStyles href={contact?.navigateToLink ?? ''} className="opacity-72">
                    {contact.address}
                  </MLink>
                )}
                {contact?.featuredOpeningHours && (
                  <div className="flex gap-4">
                    <div className="opacity-72">{t('open')}</div>
                    <div>{contact.featuredOpeningHours}</div>
                  </div>
                )}
              </div>
              <div className="top-1 right-0 flex md:absolute">
                {contact?.openingHoursLink && (
                  <MLink variant="white" href={contact.openingHoursLink}>
                    {t('openingHours')}
                  </MLink>
                )}
              </div>
            </div>
            <div className="h-[1px] bg-white/12" />
            <div className="relative flex flex-col gap-3">
              <div className="text-lg font-bold">{t('contacts')}</div>
              <div className="flex flex-col gap-2 text-sm font-regular">
                {contact?.phone && (
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  <MLink noStyles href={`tel:${contact.phone}`} className="opacity-72">
                    {contact.phone}
                  </MLink>
                )}
                {contact?.email && (
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  <MLink noStyles href={`mailto:${contact.email}`} className="opacity-72">
                    {contact.email}
                  </MLink>
                )}
                {(social?.facebook ||
                  social?.instagram ||
                  social?.youtube ||
                  social?.twitter ||
                  social?.linkedin) && (
                  <div className="hidden items-center gap-4 pt-3 md:flex">
                    {social.facebook && (
                      <MLink noStyles href={social.facebook}>
                        <FacebookIcon />
                      </MLink>
                    )}
                    {social.instagram && (
                      <MLink noStyles href={social.instagram}>
                        <InstagramIcon />
                      </MLink>
                    )}
                    {social.linkedin && (
                      <MLink noStyles href={social.linkedin}>
                        <LinkedInIcon />
                      </MLink>
                    )}
                    {social.youtube && (
                      <MLink noStyles href={social.youtube}>
                        <YoutubeIcon />
                      </MLink>
                    )}
                    {social.twitter && (
                      <MLink noStyles href={social.twitter}>
                        <TwitterIcon />
                      </MLink>
                    )}
                  </div>
                )}
              </div>
              <div className="top-1 right-0 flex md:absolute">
                {contact?.contactsLink && (
                  <MLink variant="white" href={contact.contactsLink}>
                    {t('allContacts')}
                  </MLink>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {footerColumns.map(({ title, links }, colIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={colIndex} className="flex flex-col gap-4">
              <h4>{title}</h4>
              <div className="flex flex-col gap-3">
                {links?.map((link, linkIndex) => (
                  <MLink
                    // eslint-disable-next-line react/no-array-index-key
                    key={linkIndex}
                    noStyles
                    href={link?.url ?? ''}
                    target={link?.targetBlank ? '_blank' : '_self'}
                  >
                    {link?.label}
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
