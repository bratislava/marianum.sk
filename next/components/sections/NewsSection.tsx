import { useTranslation } from 'next-i18next'
import React from 'react'

import Section, { SectionProps } from '@/components/molecules/Section'
import NewsListing from '@/components/sections/NewsListing'
import { NewsListingFragment } from '@/graphql'

type NewsSectionProps = Pick<SectionProps, 'background'> & {
  section?: NewsListingFragment
}

const NewsSection = ({ section, ...rest }: NewsSectionProps) => {
  const { t } = useTranslation('common')

  return (
    <Section
      {...rest}
      title={section?.title ?? t('NewsSection.moreNews')}
      button={section?.showMoreButton}
    >
      <NewsListing />
    </Section>
  )
}

export default NewsSection
