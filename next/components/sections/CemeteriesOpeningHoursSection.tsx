import { useContext } from 'react'

import Button from '@/components/atoms/Button'
import { sectionContext } from '@/components/layouts/SectionsWrapper'
import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import { useNavigationContext } from '@/components/molecules/Navigation/NavigationProvider/useNavigationContext'
import OpeningHours from '@/components/molecules/OpeningHours'
import Section, { SectionProps } from '@/components/molecules/Section'
import { CemeteriesOpeningHoursFragment } from '@/graphql'
import cn from '@/utils/cn'

type CemeteriesOpeningHoursSectionProps = Pick<SectionProps, 'background' | 'title'> & {
  section: CemeteriesOpeningHoursFragment
}

const CemeteriesOpeningHoursSection = ({
  section,
  ...rest
}: CemeteriesOpeningHoursSectionProps) => {
  const { general } = useNavigationContext()
  const { border } = useContext(sectionContext)
  const { getFullPath } = useGetFullPath()

  const showMorePath = getFullPath(section.showMoreButton?.page?.data)

  return (
    <Section
      title={section.title}
      button={section.buttonPosition === 'standard' ? section.showMoreButton : undefined}
      {...rest}
    >
      <div
        className={cn('bg-white px-4 py-3 md:px-5 md:py-4', {
          'border border-border': border,
        })}
      >
        {general?.cemeteryOpeningHours && (
          <OpeningHours openingHours={general?.cemeteryOpeningHours} />
        )}
      </div>
      {showMorePath && section.buttonPosition === 'below' && (
        <div className="mt-6 flex justify-center md:mt-8 md:justify-start">
          <Button variant="primary" href={showMorePath}>
            {section.showMoreButton?.label}
          </Button>
        </div>
      )}
    </Section>
  )
}

export default CemeteriesOpeningHoursSection
