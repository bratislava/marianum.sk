import { useGetFullPath } from '@components/molecules/Navigation/NavigationProvider/useGetFullPath'
import Row from '@components/molecules/Row/Row'
import Section, { SectionProps } from '@components/molecules/Section'
import { OpeningHoursSectionFragment } from '@graphql'
import { isDefined } from '@utils/isDefined'

type OpeningHoursSectionProps = Pick<SectionProps, 'background' | 'title'> & {
  section: OpeningHoursSectionFragment
}

const OpeningHoursSection = ({ section, ...rest }: OpeningHoursSectionProps) => {
  const { getFullPath } = useGetFullPath()

  const filteredOffices =
    section.offices?.map((office) => office?.office?.data).filter(isDefined) ?? []

  return (
    <Section title={section.title} {...rest}>
      <div className="flex flex-col gap-4">
        {filteredOffices.map((office) => {
          const { branch, openingHours } = office.attributes ?? {}
          const { title: cemeteryTitle, address: branchAddress } = branch?.data?.attributes ?? {}

          return (
            <Row
              border
              title={cemeteryTitle}
              address={branchAddress}
              linkHref={getFullPath(branch?.data) ?? undefined}
              moreContent={
                <div className="flex grow flex-col gap-3">
                  {openingHours?.days?.map((record, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index} className="flex max-w-[360px]">
                      <div className="grow font-semibold">{record?.label}</div>
                      <div>{record?.time}</div>
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
