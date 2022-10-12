import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { GeneralEntityFragment, NavigationItemFragment, ReviewEntityFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import { AnimateHeight } from '../atoms/AnimateHeight'
import Pagination from '../atoms/Pagination/Pagination'
import ReviewsFiltering, { ReviewStat } from '../molecules/ReviewsFiltering'
import HeroSection from '../sections/HeroSection'
import ReviewsSection from '../sections/ReviewsSection'
import PageWrapper from './PageWrapper'

const REVIEWS_PER_PAGE = 10

type ReviewLayoutProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  reviews: ReviewEntityFragment[] | null
}

const ReviewLayout = ({ navigation, general, reviews }: ReviewLayoutProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'layouts.ReviewsLayout' })

  const validReviews = useMemo(() => {
    return reviews?.filter(isDefined).filter((review) => review.attributes) ?? []
  }, [reviews])

  const [currentPage, setCurrentPage] = useState(1)

  const [is5StarsSelected, set5StarsSelected] = useState(true)
  const [is4StarsSelected, set4StarsSelected] = useState(true)
  const [is3StarsSelected, set3StarsSelected] = useState(true)
  const [is2StarsSelected, set2StarsSelected] = useState(true)
  const [is1StarsSelected, set1StarsSelected] = useState(true)

  const filtersState = useMemo(
    () => [
      is1StarsSelected,
      is2StarsSelected,
      is3StarsSelected,
      is4StarsSelected,
      is5StarsSelected,
    ],
    [is1StarsSelected, is2StarsSelected, is3StarsSelected, is4StarsSelected, is5StarsSelected],
  )

  // When filters change -> go to page 1
  useEffect(() => {
    setCurrentPage(1)
  }, [is1StarsSelected, is2StarsSelected, is3StarsSelected, is4StarsSelected, is5StarsSelected])

  const filteredReviews = useMemo(() => {
    return validReviews.filter((review) => filtersState[(review.attributes?.rating ?? 1) - 1])
  }, [filtersState, validReviews])

  const pageCount = useMemo(() => {
    return Math.ceil((filteredReviews.length ?? 0) / REVIEWS_PER_PAGE)
  }, [filteredReviews])

  // Currently visible reviews based on current page
  const visibleReviews = useMemo(() => {
    return filteredReviews.slice(
      (currentPage - 1) * REVIEWS_PER_PAGE,
      currentPage * REVIEWS_PER_PAGE,
    )
  }, [currentPage, filteredReviews])

  const averageRating = useMemo(() => {
    return (
      validReviews.map((review) => review.attributes?.rating ?? 5).reduce((a, b) => a + b, 0) /
      (validReviews?.length ?? 0)
    )
  }, [validReviews])

  const percentageOfReviewsWithRating = useCallback(
    (rating: number) => {
      return (
        (validReviews.filter((review) => review.attributes?.rating === rating).length /
          validReviews.length) *
        100
      )
    },
    [validReviews],
  )

  const reviewStats: ReviewStat[] = useMemo(() => {
    return [
      {
        title: t('ratings.five'),
        percentage: percentageOfReviewsWithRating(5),
        isSelected: filtersState[4],
        onSelectedChange: set5StarsSelected,
      },
      {
        title: t('ratings.four'),
        percentage: percentageOfReviewsWithRating(4),
        isSelected: filtersState[3],
        onSelectedChange: set4StarsSelected,
      },
      {
        title: t('ratings.three'),
        percentage: percentageOfReviewsWithRating(3),
        isSelected: filtersState[2],
        onSelectedChange: set3StarsSelected,
      },
      {
        title: t('ratings.two'),
        percentage: percentageOfReviewsWithRating(2),
        isSelected: filtersState[1],
        onSelectedChange: set2StarsSelected,
      },
      {
        title: t('ratings.one'),
        percentage: percentageOfReviewsWithRating(1),
        isSelected: filtersState[0],
        onSelectedChange: set1StarsSelected,
      },
    ]
  }, [filtersState, percentageOfReviewsWithRating, t])

  return (
    <PageWrapper
      navigation={navigation}
      general={general}
      header={
        <HeroSection
          title={t('title')}
          breadcrumbsMoreItems={[{ label: t('title'), path: '/o-nas/reviews' }]}
        />
      }
    >
      <div className="h-full">
        <div className="container relative grid h-auto gap-20 pt-12 pb-32 lg:grid-flow-col lg:grid-cols-[1fr_1fr] lg:gap-6">
          <div className="flex flex-col gap-6">
            <AnimateHeight isVisible>
              <ReviewsSection reviews={visibleReviews} />
            </AnimateHeight>
            {pageCount > 0 ? (
              <div className="flex justify-center">
                <Pagination
                  onChange={setCurrentPage}
                  count={pageCount}
                  selectedPage={currentPage}
                />
              </div>
            ) : null}
          </div>
          <div>
            <ReviewsFiltering
              averageRating={averageRating}
              totalReviewCount={validReviews?.length ?? 0}
              reviewStats={reviewStats}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default ReviewLayout
