import { AnimateHeight } from '@components/atoms/AnimateHeight'
import Pagination from '@components/atoms/Pagination/Pagination'
import Review from '@components/molecules/Review'
import Section from '@components/molecules/Section'
import { ReviewEntityFragment } from '@graphql'
import { isDefined } from '@utils'
import cx from 'classnames'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const REVIEWS_PER_PAGE = 10

type ReviewListingProps = {
  reviews: ReviewEntityFragment[] | null
}

const ReviewListingSection = ({ reviews }: ReviewListingProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'ReviewListingSection' })

  const filteredReviews = useMemo(() => {
    return reviews?.filter(isDefined).filter((review) => review.attributes) ?? []
  }, [reviews])

  const [currentPage, setCurrentPage] = useState(1)

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

  return (
    <Section>
      <div className="flex flex-col gap-6">
        <AnimateHeight isVisible>
          <div className="flex flex-col justify-start gap-6">
            <LayoutGroup id="reviews">
              {visibleReviews?.map((review, index) => (
                <AnimatePresence key={review.id}>
                  <motion.div
                    layout="position"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cx({ 'border-t border-border pt-6': index !== 0 })}
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
            <Pagination onChange={setCurrentPage} count={pageCount} selectedPage={currentPage} />
          </div>
        ) : null}
      </div>
    </Section>
  )
}

export default ReviewListingSection
