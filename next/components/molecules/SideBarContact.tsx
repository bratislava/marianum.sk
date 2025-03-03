import { useTranslation } from 'next-i18next'

import { MailIcon, PhoneIcon } from '@/assets/icons'
import Button from '@/components/atoms/Button'
import { getPhoneNumberLink } from '@/utils/getPhoneNumberLink'

type SideBarContactProps = {
  title: string | null | undefined
  phone1: string | null | undefined
  phone2: string | null | undefined
  email: string | null | undefined
}

const SideBarContact = ({ title, phone1, phone2, email }: SideBarContactProps) => {
  const { t } = useTranslation('common')

  if (!title && !phone1 && !phone2 && !email) {
    return <aside className="lg:w-[360px]" />
  }

  return (
    <aside className="flex h-fit flex-col bg-white p-6 lg:w-[360px]">
      <h5>{t('SideBarContact.contacts')}</h5>
      {title && <p className="mt-6 whitespace-pre-wrap">{title}</p>}
      {phone1 && (
        <Button
          href={getPhoneNumberLink(phone1)}
          variant="plain-primary"
          startIcon={<PhoneIcon />}
          className="mt-3 w-fit"
        >
          {phone1}
        </Button>
      )}
      {phone2 && (
        <Button
          href={getPhoneNumberLink(phone2)}
          variant="plain-secondary"
          startIcon={<PhoneIcon />}
          className="mt-2 w-fit"
        >
          {phone2}
        </Button>
      )}
      {email && (
        <>
          <Button variant="plain-primary" startIcon={<MailIcon />} className="mt-2 w-fit">
            {email}
          </Button>
          <Button href={`mailto:${email.replaceAll(' ', '')}`} variant="primary" className="mt-6">
            {t('SideBarContact.writeMessage')}
          </Button>
        </>
      )}
    </aside>
  )
}

export default SideBarContact
