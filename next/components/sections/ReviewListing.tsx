import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

import { ReviewEntityFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'
import { AnimateHeight } from '../atoms/AnimateHeight'
import Pagination from '../atoms/Pagination/Pagination'
import Review from '../molecules/Review'
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

  const pageCount = useMemo(() => {
    return Math.ceil((validReviews.length ?? 0) / REVIEWS_PER_PAGE)
  }, [validReviews])

  // Currently visible reviews based on current page
  const visibleReviews = useMemo(() => {
    return validReviews.slice((currentPage - 1) * REVIEWS_PER_PAGE, currentPage * REVIEWS_PER_PAGE)
  }, [currentPage, validReviews])

  return (
    <Section>
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
            <Pagination onChange={setCurrentPage} count={pageCount} selectedPage={currentPage} />
          </div>
        ) : null}
      </div>
    </Section>
  )
}

export default ReviewListing
