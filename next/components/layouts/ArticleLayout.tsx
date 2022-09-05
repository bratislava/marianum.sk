import cx from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { ArticleEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import { getBreadcrumbs } from '../../utils/getBreadcrumbs'
import Section from '../molecules/Section'
import HeroSection from '../sections/HeroSection'
import NewsListing from '../sections/NewsListing'
import PageWrapper from './PageWrapper'

type ArticleLayoutProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  article: ArticleEntityFragment
  children?: ReactNode
}

const ArticleLayout = ({ article, navigation, children, general }: ArticleLayoutProps) => {
  const router = useRouter()
  const breadcrumbs = getBreadcrumbs(router.asPath, navigation)
  const { t } = useTranslation()

  const { title, perex, coverMedia, publishedAt } = article.attributes ?? {}

  return (
    <PageWrapper
      navigation={navigation}
      general={general}
      header={<HeroSection image={coverMedia?.data} breadcrumbs={breadcrumbs} />}
    >
      <div
        className={cx('h-full bg-white', {
          // Compensate image overlap
          'pt-18': coverMedia?.data,
        })}
      >
        <div className="container relative mx-auto h-auto px-4 py-6 sm:px-20 sm:pb-12 sm:pt-10 md:px-28 lg:px-40">
          <div className="pb-1 text-center text-sm">
            {/* TODO replace by date component or format function */}
            {new Date(publishedAt as string).toDateString()}
          </div>

          <div className="pb-6 sm:pb-10">
            <h1 className="text-center">{title}</h1>
            {perex && <p className="mt-6 sm:mt-8">{perex}</p>}
          </div>

          {children}
        </div>

        <Section isContainer title={t('layouts.ArticleLayout.moreNews')}>
          <NewsListing />
        </Section>
      </div>
    </PageWrapper>
  )
}

export default ArticleLayout
