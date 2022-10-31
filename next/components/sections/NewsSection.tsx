import { useTranslation } from 'next-i18next'
import React from 'react'

import { NewsListingFragment } from '../../graphql'
import { useGetFullPath } from '../molecules/Navigation/NavigationProvider/useGetFullPath'
import Section, { SectionProps } from '../molecules/Section'
import NewsListing from './NewsListing'

type NewsSectionProps = Pick<SectionProps, 'background'> & {
  section?: NewsListingFragment
}

const NewsSection = ({ section, ...rest }: NewsSectionProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'NewsSection' })

  const { getFullPath } = useGetFullPath()

  return (
    <Section
      {...rest}
      title={section?.title ?? t('moreNews')}
      buttonLink={{
        linkHref: getFullPath(undefined, 'news'),
        label: t('allNews'),
      }}
    >
      <NewsListing />
    </Section>
  )
}

export default NewsSection
