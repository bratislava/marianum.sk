import { useContext } from 'react'

import { Enum_Componentsectionsmanuallisting_Style, ManualListingFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import { getFullPath } from '../../utils/localPaths'
import { NavigationContext } from '../layouts/NavigationProvider'
import { CategoryCard } from '../molecules/Cards/CategoryFaqThemeCard'
import ServiceCard from '../molecules/Cards/ServiceCard'
import Section, { SectionProps } from '../molecules/Section'

type CardSectionProps = Pick<SectionProps, 'background'> & {
  section: ManualListingFragment
}

const CardSection = ({ section, ...rest }: CardSectionProps) => {
  const { pages, title, style, showMoreButton } = section
  const { navMap } = useContext(NavigationContext)

  const filteredPages = pages
    ?.filter(isDefined)
    .map((page) => page.page?.data)
    .filter((page) => page?.attributes)

  return (
    <Section title={title} {...rest} cardGrid="cards" button={showMoreButton}>
      {filteredPages?.map((page) => {
        const { id, attributes } = page ?? {}
        const { title: cardTitle, coverMedia, perex } = attributes ?? {}

        const fullPath = getFullPath(page, navMap) ?? ''

        if (style === Enum_Componentsectionsmanuallisting_Style.Simple) {
          return <CategoryCard key={id} title={cardTitle ?? ''} linkHref={fullPath} border />
        }

        if (style === Enum_Componentsectionsmanuallisting_Style.Service) {
          return (
            <ServiceCard
              key={id}
              title={cardTitle ?? ''}
              linkHref={fullPath}
              border
              image={coverMedia?.data?.attributes}
              subtitle={perex}
            />
          )
        }

        return null
      })}
    </Section>
  )
}

export default CardSection
