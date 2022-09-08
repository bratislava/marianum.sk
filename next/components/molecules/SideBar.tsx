import { useTranslation } from 'next-i18next'
import React from 'react'

import MailIcon from '../../assets/mail.svg'
import PhoneIcon from '../../assets/phone.svg'
import { SidebarFragment } from '../../graphql'
import Button from '../atoms/Button'

type SideBarProps = {
  sidebar: SidebarFragment | null | undefined
}

const SideBar = ({ sidebar }: SideBarProps) => {
  const { t } = useTranslation()

  if (!sidebar) {
    return <aside className="md:w-[360px]" />
  }

  const { title, text, ctaButton, contact } = sidebar
  const ctaSlug = ctaButton?.page?.data?.attributes?.slug
  const { phone1, phone2, email } = contact?.data?.attributes ?? {}

  return (
    <aside className="flex h-fit flex-col bg-white p-6 md:w-[360px]">
      {title && <h5>{title}</h5>}
      {text && <p className="mt-2">{text}</p>}
      {ctaSlug ? (
        <>
          <Button href={ctaSlug} variant="primary" className="mt-6">
            {ctaButton.label}
          </Button>
          {contact?.data?.attributes && (
            <div className="flex flex-col items-center">
              <div className="mt-4">{t('general.or')}</div>
              <Button variant="plain-primary" startIcon={<PhoneIcon />} className="mt-4">
                {phone1}
              </Button>
              <Button variant="plain-primary" startIcon={<MailIcon />} className="mt-2">
                {email}
              </Button>
            </div>
          )}
        </>
      ) : (
        contact?.data?.attributes && (
          <>
            <Button variant="primary" startIcon={<PhoneIcon />} className="mt-6">
              {phone1}
            </Button>
            {phone2 && (
              <Button variant="tertiary" startIcon={<PhoneIcon />} className="mt-3">
                {phone2}
              </Button>
            )}
            <div className="flex flex-col items-center">
              <div className="mt-4">alebo nas kontaktujte emailom</div>
              <Button variant="plain-primary" startIcon={<MailIcon />} className="mt-4">
                {email}
              </Button>
            </div>
          </>
        )
      )}
    </aside>
  )
}

export default SideBar
