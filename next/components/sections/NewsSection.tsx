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

  // TODO - useGetFullPath
  // const { getFullPath } = useGetFullPath()

  return (
    <Section
      {...rest}
      title={section?.title ?? t('moreNews')}
      // buttonLink={{
      //   linkHref: getFullPath(undefined, 'news'),
      //   label: t('allNews'),
      // }}
    >
      <NewsListing />
    </Section>
  )
}

export default NewsSection
