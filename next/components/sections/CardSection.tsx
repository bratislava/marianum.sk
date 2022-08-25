import React from 'react'

import {
  Enum_Componentsectionsmanuallisting_Style,
  ManualListingFragment,
  UploadFile,
} from '../../graphql'
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
        const { id, attributes } = page?.data || {}
        if (style === Enum_Componentsectionsmanuallisting_Style.Simple) {
          return (
            <CategoryCard
              key={id}
              title={attributes?.title ?? ''}
              linkHref={attributes?.slug ?? '#'}
              border
            />
          )
        }

        if (style === Enum_Componentsectionsmanuallisting_Style.Article) {
          return (
            <ArticleCard
              key={id}
              title={attributes?.title ?? ''}
              linkHref={attributes?.slug ?? '#'}
              border
              image={attributes?.coverMedia?.data?.attributes as UploadFile}
              date={attributes?.publishedAt}
            />
          )
        }

        if (style === Enum_Componentsectionsmanuallisting_Style.Service) {
          return (
            <ServiceCard
              key={id}
              title={attributes?.title ?? ''}
              linkHref={attributes?.slug ?? '#'}
              border
              image={attributes?.coverMedia?.data?.attributes as UploadFile}
              subtitle={attributes?.perex}
            />
          )
        }

        return null
      })}
    </Section>
  )
}

export default CardSection
