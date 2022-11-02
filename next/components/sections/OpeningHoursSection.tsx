import React from 'react'

import { OpeningHoursSectionFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import Row from '../molecules/Row/Row'
import Section, { SectionProps } from '../molecules/Section'

type OpeningHoursSectionProps = Pick<SectionProps, 'background' | 'title'> & {
  section: OpeningHoursSectionFragment
}

const OpeningHoursSection = ({ section, ...rest }: OpeningHoursSectionProps) => {
  const filteredOffices =
    section.offices?.map((office) => office?.office?.data).filter(isDefined) ?? []

  return (
    <Section title={section.title} {...rest}>
      <div className="flex flex-col gap-4">
        {filteredOffices.map((office) => {
          const { branch, openingHours } = office.attributes ?? {}
          const { title: branchTitle, address: branchAddress } = branch?.data?.attributes ?? {}

          return (
            <Row
              border
              title={branchTitle}
              address={branchAddress}
              moreContent={
                <div className="flex flex-col gap-3">
                  {openingHours?.days?.map((record, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index} className="flex max-w-[460px]">
                      <div className="grow">{record?.label}</div>
                      <div className="font-semibold">{record?.time}</div>
                    </div>
                  ))}
                </div>
              }
            />
          )
        })}
      </div>
    </Section>
  )
}

export default OpeningHoursSection
