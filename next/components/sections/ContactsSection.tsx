import { MailIcon, PhoneIcon } from '@assets/icons'
import MLink from '@components/atoms/MLink'
import Section, { SectionProps } from '@components/molecules/Section'
import { ContactGroupFragment } from '@graphql'
import { getPhoneNumberLink, isDefined } from '@utils'
import { useMemo } from 'react'

const ContactsSection = ({
  contacts,
  ...rest
}: Pick<SectionProps, 'background' | 'title'> & ContactGroupFragment) => {
  const filteredContacts = useMemo(() => {
    return (contacts ?? []).map((contact) => contact?.contact?.data?.attributes).filter(isDefined)
  }, [contacts])

  return (
    <Section {...rest}>
      <div className="flex flex-col gap-4">
        {filteredContacts.map(({ title, email, phone1, phone2 }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="border border-border bg-white">
            <div className="p-6 font-serif text-h4 font-bold">{title}</div>
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
                        href={getPhoneNumberLink(phone1)}
                      >
                        {phone1}
                      </MLink>
                    )}

                    {phone2 && (
                      <>
                        {', '}
                        <MLink
                          noStyles
                          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                          href={getPhoneNumberLink(phone2)}
                        >
                          {phone2}
                        </MLink>
                      </>
                    )}
                  </div>
                </div>
              )}
              {email && (
                <MLink
                  noStyles
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  href={`mailto:${email.replace(/ /g, '')}`}
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
