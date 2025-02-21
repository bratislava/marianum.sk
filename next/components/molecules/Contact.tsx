import React from 'react'

import { MailIcon, PhoneIcon } from '@/assets/icons'
import MLink from '@/components/atoms/MLink'
import { ContactEntityFragment } from '@/graphql'
import { getPhoneNumberLink } from '@/utils/getPhoneNumberLink'

type ContactProps = {
  contact: ContactEntityFragment
  className?: string
}

const Contact = ({ contact, className }: ContactProps) => {
  const { title, position, email, phone1, phone2 } = contact.attributes ?? {}

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-x-4 gap-y-2 pb-3">
        <div className="font-bold text-foreground-heading">{title}</div>
        {position && (
          <div className="flex gap-4">
            <span>&bull;</span>
            <span>{position}</span>
          </div>
        )}
      </div>
      <div className="flex gap-6">
        {phone1 && (
          <MLink
            noStyles
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            href={getPhoneNumberLink(phone1)}
            className="flex items-center gap-x-2 font-semibold text-primary"
          >
            <PhoneIcon />
            {phone1}
          </MLink>
        )}
        {phone2 && (
          <MLink
            noStyles
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            href={getPhoneNumberLink(phone2)}
            className="flex items-center gap-x-2 font-semibold text-primary"
          >
            <PhoneIcon />
            {phone2}
          </MLink>
        )}
        {email && (
          <MLink
            noStyles
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            href={`mailto:${email.replaceAll(' ', '')}`}
            className="flex items-center gap-x-2 font-semibold text-primary hover:text-primary-dark"
          >
            <MailIcon />
            {email}
          </MLink>
        )}
      </div>
    </div>
  )
}

export default Contact
