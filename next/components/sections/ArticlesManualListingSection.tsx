import React from 'react'

import Section, { SectionProps } from '@/components/molecules/Section'
import ArticleGroup from '@/components/sections/ArticleGroup'
import { ArticlesManualListingFragment } from '@/graphql'
import { isDefined } from '@/utils/isDefined'

type ArticlesManualListingSectionProps = Pick<SectionProps, 'background'> & {
  section?: ArticlesManualListingFragment
}

const ArticlesManualListingSection = ({ section, ...rest }: ArticlesManualListingSectionProps) => {
  const filteredArticles = section?.articles
    ?.map((article) => article?.article?.data)
    .filter(isDefined)

  return (
    <Section {...rest} title={section?.title} button={section?.showMoreButton}>
      <ArticleGroup articles={filteredArticles ?? []} />
    </Section>
  )
}

export default ArticlesManualListingSection
