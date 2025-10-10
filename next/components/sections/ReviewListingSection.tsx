import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { AnimateHeight } from '@/components/atoms/AnimateHeight'
import Loading from '@/components/atoms/Loading'
import Pagination from '@/components/atoms/Pagination/Pagination'
import Review from '@/components/molecules/Review'
import Section from '@/components/molecules/Section'
import {
  getGraphqlReviewsQueryKey,
  graphqlReviewsFetcher,
} from '@/services/fetchers/reviewsFetcher'
import cn from '@/utils/cn'
import { isDefined } from '@/utils/isDefined'

const REVIEWS_PER_PAGE = 10

const ReviewListingSection = () => {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const { data, isPending, isError, error } = useQuery({
    queryKey: getGraphqlReviewsQueryKey(locale),
    queryFn: () => graphqlReviewsFetcher(locale),
    placeholderData: keepPreviousData,
  })

  const [currentPage, setCurrentPage] = useState(1)

  if (isPending) {
    return <Loading />
  }

  // TODO replace by proper error
  if (isError) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  const filteredReviews =
    data.reviews?.data.filter(isDefined).filter((review) => review.attributes) ?? []

  const pageCount = Math.ceil((filteredReviews.length ?? 0) / REVIEWS_PER_PAGE)

  // Currently visible reviews based on current page
  const visibleReviews = filteredReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE,
  )

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
                    className={cn({ 'border-t border-border pt-6': index !== 0 })}
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
              {visibleReviews.length === 0 ? t('ReviewListingSection.noReviews') : null}
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
