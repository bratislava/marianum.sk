import { useTranslation } from 'next-i18next'

import MailIcon from '../../assets/mail.svg'
import PhoneIcon from '../../assets/phone.svg'
import { SidebarFragment } from '../../graphql'
import { getPhoneNumberLink } from '../../utils/getPhoneNumberLink'
import Button from '../atoms/Button'
import { useGetFullPath } from './Navigation/NavigationProvider/useGetFullPath'

type SideBarProps = {
  sidebar: SidebarFragment | null | undefined
}

const SideBar = ({ sidebar }: SideBarProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'SideBar' })
  const { getFullPath } = useGetFullPath()

  if (!sidebar) {
    return <aside className="lg:w-[360px]" />
  }

  const { title, text, ctaButton, contact } = sidebar
  const ctaSlug = getFullPath(ctaButton?.page?.data)
  const { phone1, phone2, email } = contact?.data?.attributes ?? {}

  return (
    <aside className="flex h-fit flex-col bg-white p-6 lg:w-[360px]">
      {title && <h5 className="whitespace-pre-wrap">{title}</h5>}
      {text && <p className="mt-2 whitespace-pre-wrap">{text}</p>}
      {ctaSlug ? (
        <>
          <Button href={ctaSlug} variant="primary" className="mt-6">
            {ctaButton?.label}
          </Button>
          {contact?.data?.attributes && (
            <div className="flex flex-col items-center">
              <div className="mt-4">{t('or')}</div>
              {phone1 && (
                <Button
                  variant="plain-primary"
                  href={getPhoneNumberLink(phone1)}
                  startIcon={<PhoneIcon />}
                  className="mt-4"
                >
                  {phone1}
                </Button>
              )}
              {email && (
                <Button
                  variant="plain-primary"
                  href={`mailto:${email}`}
                  startIcon={<MailIcon />}
                  className="mt-2"
                >
                  {email}
                </Button>
              )}
            </div>
          )}
        </>
      ) : (
        contact?.data?.attributes && (
          <>
            {phone1 && (
              <Button
                variant="primary"
                // Phone numbers cannot contain spaces.
                href={getPhoneNumberLink(phone1)}
                startIcon={<PhoneIcon />}
                className="mt-6"
              >
                {phone1}
              </Button>
            )}
            {phone2 && (
              <Button
                variant="tertiary"
                // Phone numbers cannot contain spaces.
                href={getPhoneNumberLink(phone2)}
                startIcon={<PhoneIcon />}
                className="mt-3"
              >
                {phone2}
              </Button>
            )}
            {email && (
              <div className="flex flex-col items-center">
                {(phone1 || phone2) && <div className="mt-4">{t('orContactUsByEmail')}</div>}
                <Button
                  variant="plain-primary"
                  href={`mailto:${email}`}
                  startIcon={<MailIcon />}
                  className="mt-4"
                >
                  {email}
                </Button>
              </div>
            )}
          </>
        )
      )}
    </aside>
  )
}

export default SideBar
