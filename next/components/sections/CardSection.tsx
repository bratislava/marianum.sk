import React from 'react'

import { Enum_Componentsectionsmanuallisting_Style, ManualListingFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import ArticleCard from '../molecules/Cards/ArticleCard'
import { CategoryCard } from '../molecules/Cards/CategoryFaqThemeCard'
import ServiceCard from '../molecules/Cards/ServiceCard'
import Section, { SectionProps } from '../molecules/Section'

type CardSectionProps = Pick<SectionProps, 'fullWidth' | 'color'> & {
  section: ManualListingFragment
}

const CardSection = ({ section, ...rest }: CardSectionProps) => {
  const { pages, title, style, showMoreButton } = section

  return (
    <Section title={title} {...rest} cardGrid button={showMoreButton}>
      {pages?.filter(isDefined).map(({ page }) => {
        if (style === Enum_Componentsectionsmanuallisting_Style.Simple) {
          return (
            <CategoryCard
              key={page?.data?.id}
              title={page?.data?.attributes?.title ?? ''}
              linkHref={page?.data?.attributes?.slug ?? '#'}
              border
            />
          )
        }

        if (style === Enum_Componentsectionsmanuallisting_Style.Article) {
          return (
            <ArticleCard
              key={page?.data?.id}
              title={page?.data?.attributes?.title ?? ''}
              linkHref={page?.data?.attributes?.slug ?? '#'}
              border
              imageUrl={page?.data?.attributes?.coverMedia?.data?.attributes?.url ?? ''}
              imageAlt={page?.data?.attributes?.coverMedia?.data?.attributes?.alternativeText ?? ''}
              date={page?.data?.attributes?.publishedAt}
            />
          )
        }

        if (style === Enum_Componentsectionsmanuallisting_Style.Service) {
          return (
            <ServiceCard
              key={page?.data?.id}
              title={page?.data?.attributes?.title ?? ''}
              linkHref={page?.data?.attributes?.slug ?? '#'}
              border
              imageUrl={page?.data?.attributes?.coverMedia?.data?.attributes?.url ?? ''}
              imageAlt={page?.data?.attributes?.coverMedia?.data?.attributes?.alternativeText ?? ''}
              subtitle={page?.data?.attributes?.perex}
            />
          )
        }

        return null
      })}
    </Section>
  )
}

export default CardSection
