import { useMemo } from 'react'

import MailIcon from '../../assets/mail.svg'
import PhoneIcon from '../../assets/phone.svg'
import { ContactGroupFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import MLink from '../atoms/MLink'

const ContactsSection = ({ contacts }: ContactGroupFragment) => {
  const filteredContacts = useMemo(() => {
    return (contacts ?? []).map((contact) => contact?.contact?.data?.attributes).filter(isDefined)
  }, [contacts])

  return (
    <div className="container mx-auto flex flex-col gap-4 px-4 py-8">
      {filteredContacts.map(({ title, email, phone1, phone2 }) => (
        <div className="border border-border bg-white">
          <div className="p-6 text-h4 font-bold">{title}</div>
          <hr className="border-border" />
          <div className="flex flex-col gap-2 p-6">
            {phone1 && (
              <MLink
                noStyles
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                href={`tel:${phone1}`}
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
                href={`tel:${phone2}`}
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
                href={`mailto:${email}`}
                className="flex items-center gap-x-2 font-semibold text-primary"
              >
                <MailIcon />
                {email}
              </MLink>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContactsSection
