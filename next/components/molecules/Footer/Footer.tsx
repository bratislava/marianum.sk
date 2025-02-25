import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import MLink from '@/components/atoms/MLink'
import AccordionGroup from '@/components/molecules/Accordion/AccordionGroup'
import AccordionItem from '@/components/molecules/Accordion/AccordionItem'
import FooterCredentials from '@/components/molecules/Footer/FooterCredentials'
import FooterMapStatic from '@/components/molecules/Footer/FooterMapStatic'
import FooterSocials from '@/components/molecules/Footer/FooterSocials'
import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import { ContactFragment, FooterFragment, SocialItemFragment } from '@/graphql'
import { getPhoneNumberLink } from '@/utils/getPhoneNumberLink'
import { isDefined } from '@/utils/isDefined'

export type FooterProps = {
  contact: ContactFragment | null | undefined
  footer: FooterFragment | null | undefined
  socials: SocialItemFragment[] | null | undefined
}

const Footer = ({ contact, footer, socials }: FooterProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'Footer' })
  const { getFullPath } = useGetFullPath()

  const { phone1, email } = contact?.contact?.data?.attributes ?? {}
  const openingHoursPath = getFullPath(contact?.openingHoursPage?.data)
  const contactsPath = getFullPath(contact?.contactsPage?.data)

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

  const { latitude, longitude } = contact ?? {}

  return (
    // negative top margin to make footer overflow last section
    <footer className="sticky top-full -mt-14 flex flex-col gap-12">
      <div className="container flex flex-col gap-12">
        <div className="grid bg-primary text-white md:grid-cols-3 lg:grid-cols-2">
          {/* aspect ratios must be in sync with sizes in FooterMapStatic component */}
          <div className="relative aspect-[464/329] px-4 sm:aspect-[576/208] md:aspect-auto">
            <FooterMapStatic latitude={latitude} longitude={longitude} />
            {/* TODO tmp replaced by static image due to high number of requests exceeding our limits */}
            {/* <FooterMap */}
            {/*  onMarkerClick={() => */}
            {/*    // eslint-disable-next-line security/detect-non-literal-fs-filename */}
            {/*    window.open(contact?.navigateToLink ?? '', '_blank')?.focus() */}
            {/*  } */}
            {/*  markerLat={contact?.latitude} */}
            {/*  markerLng={contact?.longitude} */}
            {/* /> */}
          </div>

          <div className="flex w-full flex-col gap-4 px-4 py-6 md:col-span-2 md:px-8 lg:col-span-1 lg:gap-8 lg:px-12 lg:py-8">
            <div className="relative flex flex-col gap-3">
              <div className="text-lg font-bold">{t('address')}</div>
              {(contact?.addressFirstLine || contact?.address) && (
                <div className="flex flex-col gap-2 whitespace-pre-wrap font-regular text-white/72">
                  <div>{contact.addressFirstLine}</div>
                  {contact.navigateToLink && contact.address ? (
                    <div>
                      <MLink
                        href={contact.navigateToLink}
                        target="_blank"
                        noStyles
                        className="w-fit text-white/72 underline hover:text-white/100"
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        aria-label={`${t('navigateTo')} ${contact?.address}`}
                      >
                        {contact.address}
                      </MLink>
                    </div>
                  ) : (
                    <div>{contact.address}</div>
                  )}
                </div>
              )}
              <div className="right-0 top-1 flex md:absolute">
                {openingHoursPath && (
                  <MLink variant="white" href={openingHoursPath}>
                    {t('openingHours')}
                  </MLink>
                )}
              </div>
            </div>
            <div className="h-px bg-white/12" />
            <div className="relative flex flex-col gap-3">
              <div className="text-lg font-bold">{t('contacts')}</div>
              <div className="flex flex-col gap-2 font-regular">
                {phone1 && (
                  <MLink
                    noStyles
                    href={getPhoneNumberLink(phone1)}
                    className="w-fit underline opacity-72 hover:opacity-100"
                  >
                    {phone1}
                  </MLink>
                )}
                {email && (
                  <MLink
                    noStyles
                    href={`mailto:${email.replaceAll(' ', '')}`}
                    className="w-fit underline opacity-72 hover:opacity-100"
                  >
                    {email}
                  </MLink>
                )}
              </div>
              <div className="right-0 top-1 flex md:absolute">
                {contactsPath && (
                  <MLink variant="white" href={contactsPath}>
                    {t('allContacts')}
                  </MLink>
                )}
              </div>
            </div>
          </div>
        </div>

        {socials?.length ? <FooterSocials socials={socials} /> : null}

        <div className="border-t border-border" />

        {/* Mobile */}
        <div className="flex flex-col gap-4 md:hidden">
          <AccordionGroup>
            {footerColumns.map(({ title, links }, colIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <AccordionItem key={colIndex} noBoxStyles title={title}>
                <div className="flex flex-col gap-4">
                  {links?.map((link, linkIndex) => {
                    const fullPath = getFullPath(link?.page?.data) || link?.url || ''

                    return (
                      <MLink
                        // eslint-disable-next-line react/no-array-index-key
                        key={linkIndex}
                        noStyles
                        href={fullPath}
                        target={link?.targetBlank ? '_blank' : '_self'}
                        className="w-fit"
                      >
                        {link?.label}
                      </MLink>
                    )
                  })}
                </div>
              </AccordionItem>
            ))}
          </AccordionGroup>
        </div>

        {/* Desktop */}
        <div className="hidden grid-cols-4 gap-8 md:grid">
          {footerColumns.map(({ title, links }, colIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={colIndex} className="flex flex-col gap-4">
              <h4>{title}</h4>
              <div className="flex flex-col gap-3">
                {links?.map((link, linkIndex) => {
                  const fullPath = getFullPath(link?.page?.data) || link?.url || ''

                  return (
                    <MLink
                      // eslint-disable-next-line react/no-array-index-key
                      key={linkIndex}
                      noStyles
                      href={fullPath}
                      target={link?.targetBlank ? '_blank' : '_self'}
                      className="w-fit"
                    >
                      {link?.label}
                    </MLink>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterCredentials links={footer?.bottomLinks?.filter(isDefined)} />
    </footer>
  )
}

export default Footer
