import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { ContactFragment, FooterFragment, SocialFragment } from '../../../graphql'
import MLink from '../../atoms/MLink'
import FooterCredentials from './FooterCredentials'
import FooterMap from './FooterMap'
import FooterSocials from './FooterSocials'

export type FooterProps = {
  contact?: ContactFragment | null
  footer?: FooterFragment | null
  social?: SocialFragment | null
}

const Footer = ({ contact, footer, social }: FooterProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'components.molecules.Footer' })

  const { phone1, email } = contact?.contact?.data?.attributes ?? {}
  const { slug: openingHoursSlug } = contact?.openingHoursPage?.data?.attributes ?? {}
  const { slug: contactsSlug } = contact?.contactsPage?.data?.attributes ?? {}

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
    // negative top margin to make footer overflow last section
    <footer className="sticky top-full -mt-14 flex flex-col gap-18">
      <div className="container flex flex-col gap-14">
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
              <div className="flex flex-col gap-2 whitespace-pre-wrap text-sm font-regular">
                {contact?.address && (
                  <MLink noStyles href={contact?.navigateToLink ?? ''} className="opacity-72">
                    {contact.address}
                  </MLink>
                )}
              </div>
              <div className="top-1 right-0 flex md:absolute">
                {openingHoursSlug && (
                  <MLink variant="white" href={openingHoursSlug}>
                    {t('openingHours')}
                  </MLink>
                )}
              </div>
            </div>
            <div className="h-[1px] bg-white/12" />
            <div className="relative flex flex-col gap-3">
              <div className="text-lg font-bold">{t('contacts')}</div>
              <div className="flex flex-col gap-2 text-sm font-regular">
                {phone1 && (
                  <MLink noStyles href={`tel:${phone1}`} className="opacity-72">
                    {phone1}
                  </MLink>
                )}
                {email && (
                  <MLink noStyles href={`mailto:${email}`} className="opacity-72">
                    {email}
                  </MLink>
                )}
                {social && <FooterSocials social={social} />}
              </div>
              <div className="top-1 right-0 flex md:absolute">
                {contactsSlug && (
                  <MLink variant="white" href={contactsSlug}>
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
      <FooterCredentials />
    </footer>
  )
}

export default Footer
