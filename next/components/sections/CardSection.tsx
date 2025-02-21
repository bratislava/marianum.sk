import cx from 'classnames'
import { useMemo } from 'react'

import { CategoryCard } from '@/components/molecules/Cards/CategoryFaqThemeCard'
import ServiceCard from '@/components/molecules/Cards/ServiceCard'
import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import Section, { SectionProps } from '@/components/molecules/Section'
import { Enum_Componentsectionsmanuallisting_Style, ManualListingFragment } from '@/graphql'
import { isDefined } from '@/utils/isDefined'
import { useTailwindBreakpoint } from '@/utils/useTailwindBreakpoint'

type CardSectionProps = Pick<SectionProps, 'background'> & {
  section: ManualListingFragment
}

const CardSection = ({ section, ...rest }: CardSectionProps) => {
  const { getFullPath } = useGetFullPath()

  const { pages, title, style, showMoreButton } = section

  const filteredPages = pages
    ?.filter(isDefined)
    .map((page) => page.page?.data)
    .filter((page) => page?.attributes)

  const { isMD } = useTailwindBreakpoint()
  const isMobile = useMemo(() => !isMD, [isMD])

  return (
    <Section
      title={title}
      {...rest}
      cardGrid={
        style === Enum_Componentsectionsmanuallisting_Style.Service ? 'serviceCards' : 'cards'
      }
      button={showMoreButton}
    >
      {filteredPages?.map((page, index) => {
        const { id, attributes } = page ?? {}
        const { title: cardTitle, coverMedia } = attributes ?? {}
        const fullPath = getFullPath(page) ?? ''

        if (style === Enum_Componentsectionsmanuallisting_Style.Simple) {
          return (
            <CategoryCard
              // eslint-disable-next-line react/no-array-index-key, @typescript-eslint/restrict-template-expressions
              key={`${id}-${index}`}
              title={cardTitle ?? ''}
              linkHref={fullPath}
            />
          )
        }

        if (style === Enum_Componentsectionsmanuallisting_Style.Service) {
          return (
            <ServiceCard
              // eslint-disable-next-line react/no-array-index-key, @typescript-eslint/restrict-template-expressions
              key={`${id}-${index}`}
              className={cx({
                'w-[calc(100vw-6rem)] shrink-0 sm:w-[calc(100vw-16rem)]': isMobile,
              })}
              title={cardTitle ?? ''}
              linkHref={fullPath}
              image={coverMedia?.data?.attributes}
            />
          )
        }

        return null
      })}
    </Section>
  )
}

export default CardSection
