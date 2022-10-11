import { GetStaticProps, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMemo, useState } from 'react'

import { AnimateHeight } from '../components/atoms/AnimateHeight'
import Checkbox from '../components/atoms/Checkbox'
import Pagination from '../components/atoms/Pagination/Pagination'
import ReviewStars from '../components/atoms/ReviewStars'
import ReviewLayout from '../components/layouts/ReviewLayout'
import ReviewsSection from '../components/sections/ReviewsSection'
import { GeneralEntityFragment, NavigationItemFragment, ReviewEntityFragment } from '../graphql'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'

const REVIEWS_PER_PAGE = 10

type ReviewsPageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  reviews: ReviewEntityFragment[] | null
}

const ReviewsPage = ({ navigation, general, reviews }: ReviewsPageProps) => {
  const validReviews = useMemo(() => {
    return reviews?.map((review) => review.attributes).filter(isDefined) ?? []
  }, [reviews])

  const pageCount = useMemo(() => {
    return Math.ceil((reviews?.length ?? 0) / REVIEWS_PER_PAGE)
  }, [reviews])

  const [currentPage, setCurrentPage] = useState(1)

  const visibleReviews = useMemo(() => {
    return validReviews.slice((currentPage - 1) * REVIEWS_PER_PAGE, currentPage * REVIEWS_PER_PAGE)
  }, [currentPage, validReviews])

  return (
    <>
      {/* TODO: add seo */}
      <Head>
        <title>Marianum reviews</title>
      </Head>

      <ReviewLayout
        navigation={navigation}
        general={general}
        sidebar={
          <div className="flex w-full flex-col bg-white lg:ml-auto lg:w-[448px]">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div className="flex items-center gap-2">
                <ReviewStars value={2.5} />
                <span className="font-bold">2.5 / 5</span>
              </div>
              <div>224 reviews</div>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-4">
                <div className="flex w-32">
                  <Checkbox isSelected>Skvele</Checkbox>
                </div>
                <div className="h-2 w-full flex-1 overflow-hidden rounded-full bg-background-beige">
                  <div className="h-full w-1/2 rounded-full bg-primary" />
                </div>
                <div className="w-12 text-right">xx %</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex w-32">
                  <Checkbox isSelected>Vyborne</Checkbox>
                </div>
                <div className="h-2 w-full flex-1 overflow-hidden rounded-full bg-background-beige">
                  <div className="h-full w-1/2 rounded-full bg-primary" />
                </div>
                <div className="w-12 text-right">xx %</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex w-32">
                  <Checkbox isSelected>Dobre</Checkbox>
                </div>
                <div className="h-2 w-full flex-1 overflow-hidden rounded-full bg-background-beige">
                  <div className="h-full w-1/2 rounded-full bg-primary" />
                </div>
                <div className="w-12 text-right">xx %</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex w-32">
                  <Checkbox isSelected>Nedostatocne</Checkbox>
                </div>
                <div className="h-2 w-full flex-1 overflow-hidden rounded-full bg-background-beige">
                  <div className="h-full w-1/2 rounded-full bg-primary" />
                </div>
                <div className="w-12 text-right">xx %</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex w-32">
                  <Checkbox isSelected>Zle</Checkbox>
                </div>
                <div className="h-2 w-full flex-1 overflow-hidden rounded-full bg-background-beige">
                  <div className="h-full w-1/2 rounded-full bg-primary" />
                </div>
                <div className="w-12 text-right">xx %</div>
              </div>
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-6">
          <AnimateHeight isVisible>
            <ReviewsSection reviews={visibleReviews} />
          </AnimateHeight>
          <div className="flex justify-center">
            <Pagination onChange={setCurrentPage} count={pageCount} selectedPage={currentPage} />
          </div>
        </div>
      </ReviewLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
}): Promise<GetStaticPropsResult<ReviewsPageProps>> => {
  const [{ navigation, general }, { reviews }, translations] = await Promise.all([
    client.General({ locale }),
    client.Reviews({ locale }),
    serverSideTranslations(locale, ['common']),
  ])

  const filteredNavigation = navigation.filter(isDefined)

  return {
    props: {
      navigation: filteredNavigation,
      general: general?.data ?? null,
      reviews: reviews?.data ?? null,
      ...translations,
    },
    revalidate: 10,
  }
}

export default ReviewsPage
