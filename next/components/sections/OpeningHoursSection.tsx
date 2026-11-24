import OpeningHours from '@/components/molecules/OpeningHours'
import Row from '@/components/molecules/Row/Row'
import Section, { SectionProps } from '@/components/molecules/Section'
import { OpeningHoursSectionFragment } from '@/graphql'
import { useNavigation } from '@/services/navigation/NavigationProvider'
import { isDefined } from '@/utils/isDefined'

type OpeningHoursSectionProps = Pick<SectionProps, 'background' | 'title'> & {
  section: OpeningHoursSectionFragment
}

const OpeningHoursSection = ({ section, ...rest }: OpeningHoursSectionProps) => {
  const { getPathForStrapiEntity } = useNavigation()

  const filteredOffices = section.offices?.map((office) => office?.office).filter(isDefined) ?? []

  return (
    <Section title={section.title} {...rest}>
      <div className="flex flex-col gap-4">
        {filteredOffices.map((office) => {
          const { branch, openingHours } = office
          const { title: cemeteryTitle, address: branchAddress } = branch ?? {}

          return (
            <Row
              title={cemeteryTitle}
              address={branchAddress}
              linkHref={getPathForStrapiEntity(branch) ?? undefined}
              moreContent={openingHours && <OpeningHours openingHours={openingHours} />}
              key={office.documentId}
            />
          )
        })}
      </div>
    </Section>
  )
}

export default OpeningHoursSection
