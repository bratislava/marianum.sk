import { Enum_Componentsectionsmanuallisting_Style, ManualListingFragment } from '../../graphql'
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

  return (
    <Section title={title} {...rest} cardGrid="cards" button={showMoreButton}>
      {filteredPages?.map((page, index) => {
        const { id, attributes } = page ?? {}
        const { title: cardTitle, coverMedia, perex } = attributes ?? {}

        const fullPath = getFullSlug(page) ?? ''

        if (style === Enum_Componentsectionsmanuallisting_Style.Simple) {
          return (
            <CategoryCard
              // eslint-disable-next-line react/no-array-index-key, @typescript-eslint/restrict-template-expressions
              key={`${id}-${index}`}
              title={cardTitle ?? ''}
              linkHref={fullPath}
              border
            />
          )
        }

        if (style === Enum_Componentsectionsmanuallisting_Style.Service) {
          return (
            <ServiceCard
              // eslint-disable-next-line react/no-array-index-key, @typescript-eslint/restrict-template-expressions
              key={`${id}-${index}`}
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
