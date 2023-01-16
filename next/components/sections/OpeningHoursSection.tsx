import { useGetFullPath } from '@components/molecules/Navigation/NavigationProvider/useGetFullPath'
import OpeningHours from '@components/molecules/OpeningHours'
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
              title={cemeteryTitle}
              address={branchAddress}
              linkHref={getFullPath(branch?.data) ?? undefined}
              moreContent={openingHours && <OpeningHours openingHours={openingHours} />}
            />
          )
        })}
      </div>
    </Section>
  )
}

export default OpeningHoursSection
