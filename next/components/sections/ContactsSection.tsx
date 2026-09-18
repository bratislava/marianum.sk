import { useContext, useMemo } from 'react'

import { sectionContext } from '@/components/layouts/SectionsWrapper'
import Contact from '@/components/molecules/Contact'
import Section, { SectionProps } from '@/components/molecules/Section'
import { ContactGroupFragment, Enum_Componentsectionscontactgroup_Layout } from '@/graphql'
import cn from '@/utils/cn'
import { isDefined } from '@/utils/isDefined'

const ContactsSection = ({
  contacts,
  layout,
  ...rest
}: Pick<SectionProps, 'background' | 'title'> & ContactGroupFragment) => {
  const { border } = useContext(sectionContext)

  const filteredContacts = useMemo(() => {
    return (contacts ?? []).map((contact) => contact?.contact).filter(isDefined)
  }, [contacts])

  return (
    <Section {...rest}>
      {layout === Enum_Componentsectionscontactgroup_Layout.Condensed && (
        <div
          className={cn('flex flex-col gap-4 bg-white p-6', {
            'border border-border': border,
          })}
        >
          {filteredContacts.map((contact, index) => (
            <Contact
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              contact={contact}
              className="border-b border-border pb-4 last:border-0 last:pb-0"
            />
          ))}
        </div>
      )}

      {layout === Enum_Componentsectionscontactgroup_Layout.Default && (
        <div className="flex flex-col gap-4">
          {filteredContacts.map((contact, index) => (
            <div
              className={cn('bg-white p-6', {
                'border border-border': border,
              })}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <Contact contact={contact} />
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}

export default ContactsSection
