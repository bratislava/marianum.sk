import Section, { SectionProps } from '@components/molecules/Section'
import NewsListing from '@components/sections/NewsListing'
import { NewsListingFragment } from '@graphql'
import { useTranslation } from 'next-i18next'
import React from 'react'

type NewsSectionProps = Pick<SectionProps, 'background'> & {
  section?: NewsListingFragment
}

const NewsSection = ({ section, ...rest }: NewsSectionProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'NewsSection' })

  return (
    <Section {...rest} title={section?.title ?? t('moreNews')} button={section?.showMoreButton}>
      <NewsListing />
    </Section>
  )
}

export default NewsSection
