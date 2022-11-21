import Contact from '@components/molecules/Contact'
import Section, { SectionProps } from '@components/molecules/Section'
import { ContactGroupFragment } from '@graphql'
import { isDefined } from '@utils/isDefined'
import { useMemo } from 'react'

const ContactsSection = ({
  contacts,
  ...rest
}: Pick<SectionProps, 'background' | 'title'> & ContactGroupFragment) => {
  const filteredContacts = useMemo(() => {
    return (contacts ?? []).map((contact) => contact?.contact?.data).filter(isDefined)
  }, [contacts])

  return (
    <Section {...rest}>
      <div className="flex flex-col gap-4 border border-border bg-white p-6">
        {filteredContacts.map((contact, index) => (
          <Contact
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            contact={contact}
            className="border-b border-border pb-4 last:border-0 last:pb-0"
          />
        ))}
      </div>
    </Section>
  )
}

export default ContactsSection
