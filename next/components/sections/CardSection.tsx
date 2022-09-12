import { Enum_Componentsectionsmanuallisting_Style, ManualListingFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import { CategoryCard } from '../molecules/Cards/CategoryFaqThemeCard'
import ServiceCard from '../molecules/Cards/ServiceCard'
import Section, { SectionProps } from '../molecules/Section'

type CardSectionProps = Pick<SectionProps, 'background' | 'index'> & {
  section: ManualListingFragment
}

const CardSection = ({ section, ...rest }: CardSectionProps) => {
  const { pages, title, style, showMoreButton } = section

  const filteredPages = pages
    ?.filter(isDefined)
    .map((page) => page.page?.data)
    .filter((page) => page?.attributes)

  return (
    <Section title={title} {...rest} cardGrid button={showMoreButton}>
      {filteredPages?.map((page) => {
        const { id, attributes } = page ?? {}
        const { title: cardTitle, slug, coverMedia, perex } = attributes ?? {}

        if (style === Enum_Componentsectionsmanuallisting_Style.Simple) {
          return <CategoryCard key={id} title={cardTitle ?? ''} linkHref={slug ?? '#'} border />
        }

        if (style === Enum_Componentsectionsmanuallisting_Style.Service) {
          return (
            <ServiceCard
              key={id}
              title={cardTitle ?? ''}
              linkHref={slug ?? '#'}
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
