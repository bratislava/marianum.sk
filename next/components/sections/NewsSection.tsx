import { useTranslation } from 'next-i18next'
import React from 'react'

import { NewsListingFragment } from '../../graphql'
import { getFullPath } from '../../utils/localPaths'
import Section, { SectionProps } from '../molecules/Section'
import NewsListing from './NewsListing'

type NewsSectionProps = Pick<SectionProps, 'background'> & {
  section?: NewsListingFragment
}

const NewsSection = ({ section, ...rest }: NewsSectionProps) => {
  const { t } = useTranslation()

  return (
    <Section
      {...rest}
      title={section?.title ?? t('layouts.ArticleLayout.moreNews')}
      buttonLink={{
        linkHref: getFullPath(undefined, undefined, 'news'),
        label: t(`layouts.ArticleLayout.allArticles`),
      }}
    >
      <NewsListing />
    </Section>
  )
}

export default NewsSection
