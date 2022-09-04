import { useMemo } from 'react'

import MailIcon from '../../assets/mail.svg'
import PhoneIcon from '../../assets/phone.svg'
import { ContactGroupFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import MLink from '../atoms/MLink'
import Section from '../molecules/Section'

const ContactsSection = ({ contacts, title }: ContactGroupFragment) => {
  const filteredContacts = useMemo(() => {
    return (contacts ?? []).map((contact) => contact?.contact?.data?.attributes).filter(isDefined)
  }, [contacts])

  return (
    <Section isContainer title={title}>
      <div className="flex flex-col gap-4">
        {filteredContacts.map(({ title: contactTitle, email, phone1, phone2 }) => (
          <div className="border border-border bg-white">
            <div className="p-6 text-h4 font-bold">{contactTitle}</div>
            <hr className="border-border" />
            <div className="flex flex-col gap-2 p-6">
              {(phone1 ?? phone2) && (
                <div className="flex items-center gap-x-2 font-semibold text-primary">
                  <PhoneIcon />
                  <div>
                    {phone1 && (
                      <MLink
                        noStyles
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        href={`tel:${phone1}`}
                      >
                        {phone1}
                      </MLink>
                    )}
                    <span>, </span>
                    {phone2 && (
                      <MLink
                        noStyles
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        href={`tel:${phone2}`}
                      >
                        {phone2}
                      </MLink>
                    )}
                  </div>
                </div>
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
    </Section>
  )
}

export default ContactsSection
