import cx from 'classnames'
import { useMemo } from 'react'

import { Enum_Componentsectionsmanuallisting_Style, ManualListingFragment } from '../../graphql'
import { useTailwindBreakpoint } from '../../hooks/useTailwindBreakpoint'
import { isDefined } from '../../utils/isDefined'
import { CategoryCard } from '../molecules/Cards/CategoryFaqThemeCard'
import ServiceCard from '../molecules/Cards/ServiceCard'
import { useSlug } from '../molecules/Navigation/NavigationProvider/useFullSlug'
import Section, { SectionProps } from '../molecules/Section'

type CardSectionProps = Pick<SectionProps, 'background'> & {
  section: ManualListingFragment
}

const CardSection = ({ section, ...rest }: CardSectionProps) => {
  const { getFullSlug } = useSlug()

  const { pages, title, style, showMoreButton } = section

  const filteredPages = pages
    ?.filter(isDefined)
    .map((page) => page.page?.data)
    .filter((page) => page?.attributes)

  const breakpoint = useTailwindBreakpoint()
  const isMobile = useMemo(() => breakpoint === null || breakpoint === 'sm', [breakpoint])

  if (style === Enum_Componentsectionsmanuallisting_Style.Simple) {
    return (
      <Section title={title} {...rest} cardGrid="cards" button={showMoreButton}>
        {filteredPages?.map((page) => {
          const { id, attributes } = page ?? {}
          const { title: cardTitle } = attributes ?? {}
          const fullPath = getFullSlug(page) ?? ''

          return <CategoryCard key={id} title={cardTitle ?? ''} linkHref={fullPath} border />
        })}
      </Section>
    )
  }

  if (style === Enum_Componentsectionsmanuallisting_Style.Service) {
    return (
      <Section
        title={title}
        childrenWrapperClassName={cx({
          'flex w-full gap-4 overflow-x-auto': isMobile,
        })}
        cardGrid={isMobile ? undefined : 'cards'}
        {...rest}
        button={showMoreButton}
      >
        {filteredPages?.map((page) => {
          const { id, attributes } = page ?? {}
          const { title: cardTitle, coverMedia, perex } = attributes ?? {}

          const fullPath = getFullSlug(page) ?? ''

          return (
            <ServiceCard
              className={cx({
                'w-[calc(100vw-6rem)] shrink-0 sm:w-[calc(100vw-16rem)]': isMobile,
              })}
              key={id}
              title={cardTitle ?? ''}
              linkHref={fullPath}
              border
              image={coverMedia?.data?.attributes}
              subtitle={perex}
            />
          )
        })}
      </Section>
    )
  }

  return null
}

export default CardSection
