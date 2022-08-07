import React from 'react'

import MailIcon from '../../assets/mail.svg'
import PhoneIcon from '../../assets/phone.svg'
import { SidebarFragment } from '../../graphql'
import Button from '../atoms/Button'

type SideBarProps = {
  sidebar: SidebarFragment | null | undefined
}

const SideBar = ({ sidebar }: SideBarProps) => {
  if (!sidebar) {
    return <aside className="md:w-[360px]" />
  }

  const { title, text, ctaButton, contact } = sidebar
  return (
    <aside className="flex h-fit flex-col bg-white p-6 md:w-[360px]">
      {title && <h5>{title}</h5>}
      {text && <p className="mt-2">{text}</p>}
      {ctaButton ? (
        <>
          <Button href={ctaButton.url} variant="primary" className="mt-6">
            {ctaButton.label}
          </Button>
          {contact?.data?.attributes && (
            <div className="flex flex-col items-center">
              <div className="mt-4">alebo</div>
              <Button variant="plain-primary" startIcon={<PhoneIcon />} className="mt-4">
                {contact.data.attributes.phone1}
              </Button>
              <Button variant="plain-primary" startIcon={<MailIcon />} className="mt-2">
                {contact.data.attributes.email}
              </Button>
            </div>
          )}
        </>
      ) : (
        contact?.data?.attributes && (
          <>
            <Button variant="primary" startIcon={<PhoneIcon />} className="mt-6">
              {contact.data.attributes.phone1}
            </Button>
            {contact.data.attributes.phone2 && (
              <Button variant="tertiary" startIcon={<PhoneIcon />} className="mt-3">
                {contact.data.attributes.phone2}
              </Button>
            )}
            <div className="flex flex-col items-center">
              <div className="mt-4">alebo nas kontaktujte emailom</div>
              <Button variant="plain-primary" startIcon={<MailIcon />} className="mt-4">
                {contact.data.attributes.email}
              </Button>
            </div>
          </>
        )
      )}
    </aside>
  )
}

export default SideBar
