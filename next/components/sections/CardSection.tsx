import { CategoryCard } from '@/components/molecules/Cards/CategoryFaqThemeCard'
import ServiceCard from '@/components/molecules/Cards/ServiceCard'
import { useGetFullPath } from '@/components/molecules/Navigation/NavigationProvider/useGetFullPath'
import Section, { SectionProps } from '@/components/molecules/Section'
import { Enum_Componentsectionsmanuallisting_Style, ManualListingFragment } from '@/graphql'
import { isDefined } from '@/utils/isDefined'

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
              className="w-4/5 shrink-0 sm:w-2/5 md:w-full"
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
