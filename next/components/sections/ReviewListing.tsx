import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { ReviewEntityFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import { AnimateHeight } from '../atoms/AnimateHeight'
import Pagination from '../atoms/Pagination/Pagination'
import Review from '../molecules/Review'
import ReviewsFiltering, { ReviewStat } from '../molecules/ReviewsFiltering'
import Section from '../molecules/Section'

const REVIEWS_PER_PAGE = 10

type ReviewListingProps = {
  reviews: ReviewEntityFragment[] | null
}

const ReviewListing = ({ reviews }: ReviewListingProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'sections.ReviewListing' })

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
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
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
    <Section>
      <div className="h-full">
        <div className="relative grid h-auto gap-20 lg:grid-flow-col lg:grid-cols-[1fr_1fr] lg:gap-6">
          <div className="flex flex-col gap-6">
            <AnimateHeight isVisible>
              <div className="flex flex-col justify-start gap-6">
                <LayoutGroup id="reviews">
                  {visibleReviews?.map((review) => (
                    <AnimatePresence key={review.id}>
                      <motion.div
                        layout="position"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Review
                          author={review.attributes?.author ?? ''}
                          description={review.attributes?.description ?? ''}
                          rating={review.attributes?.rating ?? 5}
                          date={new Date(review.attributes?.date)}
                        />
                      </motion.div>
                    </AnimatePresence>
                  ))}
                  {visibleReviews.length === 0 ? t('noReviews') : null}
                </LayoutGroup>
              </div>
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
    </Section>
  )
}

export default ReviewListing
