import { useTranslation } from 'next-i18next'
import React from 'react'

import Contact from '@/components/molecules/Contact'
import SectionBoxed from '@/components/molecules/SectionBoxed'
import { OfficeEntityFragment } from '@/graphql'

type OfficeSectionBoxedProps = {
  office: OfficeEntityFragment
}

const OfficeSectionBoxed = ({ office }: OfficeSectionBoxedProps) => {
  const { t } = useTranslation()

  const { title, openingHours, contacts } = office.attributes ?? {}

  return (
    <SectionBoxed title={title}>
      {contacts?.data.length ? (
        <div className="pb-6">
          <h3 className="sr-only">{t('OfficeSectionBoxed.contacts')}</h3>
          <div className="flex flex-col gap-4">
            {contacts?.data.map((contact, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Contact key={index} contact={contact} className="border-b border-border pb-4" />
              )
            })}
          </div>
        </div>
      ) : null}

      {openingHours?.days?.length ? (
        <>
          <h3 className="sr-only">{t('OfficeSectionBoxed.openingHours')}</h3>
          {openingHours?.days?.map((record, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="flex max-w-[360px]">
              <div className="grow font-semibold">{record?.label}</div>
              <div>{record?.time}</div>
            </div>
          ))}
        </>
      ) : null}
    </SectionBoxed>
  )
}

export default OfficeSectionBoxed
