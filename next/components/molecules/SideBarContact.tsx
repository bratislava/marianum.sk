import { useTranslation } from 'next-i18next'
import React from 'react'

import MailIcon from '../../assets/mail.svg'
import PhoneIcon from '../../assets/phone.svg'
import Button from '../atoms/Button'

type SideBarProps = {
  title: string | null | undefined
  phone1: string | null | undefined
  phone2: string | null | undefined
  email: string | null | undefined
}

const SideBar = ({ title, phone1, phone2, email }: SideBarProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'layouts.BranchLayout' })

  if (!title && !phone1 && !phone2 && !email) {
    return <aside className="md:w-[360px]" />
  }

  return (
    <aside className="flex h-fit flex-col bg-white p-6 md:w-[360px]">
      <h5>{t('contacts')}</h5>
      {title && <p className="mt-6">{title}</p>}
      {phone1 && (
        <Button variant="plain-primary" startIcon={<PhoneIcon />} className="mt-3 w-fit">
          {phone1}
        </Button>
      )}
      {phone2 && (
        <Button variant="plain-secondary" startIcon={<PhoneIcon />} className="mt-2 w-fit">
          {phone2}
        </Button>
      )}
      {email && (
        <>
          <Button variant="plain-primary" startIcon={<MailIcon />} className="mt-2 w-fit">
            {email}
          </Button>
          <Button href={`mailto:${email}`} variant="primary" className="mt-6">
            {t('writeMessage')}
          </Button>
        </>
      )}
    </aside>
  )
}

export default SideBar