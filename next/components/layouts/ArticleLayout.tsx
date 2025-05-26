import cx from 'classnames'
import { ReactNode } from 'react'

import FormatDate from '@/components/atoms/FormatDate'
import MImage from '@/components/atoms/MImage'
import NormalizeText from '@/components/atoms/NormalizeText/NormalizeText'
import PageWrapper from '@/components/layouts/PageWrapper'
import SectionsWrapper from '@/components/layouts/SectionsWrapper'
import HeroSection from '@/components/sections/HeroSection'
import NewsSection from '@/components/sections/NewsSection'
import { ArticleEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '@/graphql'

type ArticleLayoutProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  article: ArticleEntityFragment
  children?: ReactNode
}

const ArticleLayout = ({ article, navigation, children, general }: ArticleLayoutProps) => {
  const { title, perex, coverMedia, publishedAt, slug } = article.attributes ?? {}
  const coverImage = coverMedia?.data?.attributes

  return (
    <PageWrapper
      navigation={navigation}
      general={general}
      header={
        <HeroSection
          breadcrumbsMoreItems={[{ label: title, path: slug ?? '' }]}
          moreContent={
            coverImage ? (
              <div className="static h-[188px] sm:h-[238px] md:relative md:h-[287px] lg:h-[387px] xl:h-[440px]">
                <MImage image={coverImage} fill className="object-cover" />
              </div>
            ) : null
          }
        />
      }
    >
      <SectionsWrapper alternateBackground className="h-full pb-14">
        <div
          className={cx('bg-white', {
            // Compensate image overlap
            'pt-18': coverImage,
          })}
        >
          <div className="container relative h-auto py-6 sm:px-20 sm:pt-10 md:px-28 md:pb-20 lg:px-40">
            <div className="pb-1 text-center text-sm">
              <FormatDate value={publishedAt as string} valueType="ISO" format="articlePage" />
            </div>

            <div className="pb-6 sm:pb-10">
              <h1 className="text-center">{title}</h1>
              {perex && (
                <p className="mt-6 sm:mt-8">
                  <NormalizeText>{perex}</NormalizeText>
                </p>
              )}
            </div>

            {children}
          </div>
        </div>

        <NewsSection />
      </SectionsWrapper>
    </PageWrapper>
  )
}

export default ArticleLayout
