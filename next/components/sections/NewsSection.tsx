import { useTranslation } from 'next-i18next'
import React from 'react'

import { NewsListingFragment } from '../../graphql'
import { useSlug } from '../molecules/Navigation/NavigationProvider/useFullSlug'
import Section, { SectionProps } from '../molecules/Section'
import NewsListing from './NewsListing'

type NewsSectionProps = Pick<SectionProps, 'background'> & {
  section?: NewsListingFragment
}

const NewsSection = ({ section, ...rest }: NewsSectionProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'sections.NewsSection' })
  const { getFullSlug } = useSlug()

  return (
    <Section
      {...rest}
      title={section?.title ?? t('moreNews')}
      buttonLink={{
        linkHref: getFullSlug(undefined, 'news'),
        label: t(`allNews`),
      }}
    >
      <NewsListing />
    </Section>
  )
}

export default NewsSection
