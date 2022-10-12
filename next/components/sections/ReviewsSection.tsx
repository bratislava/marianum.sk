import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'

import { ReviewEntityFragment } from '../../graphql'
import Review from '../molecules/Review'
import Section, { SectionProps } from '../molecules/Section'

type ReviewsSectionProps = {
  reviews: ReviewEntityFragment[]
}

const ReviewsSection = ({
  reviews,
  ...rest
}: Pick<SectionProps, 'background'> & ReviewsSectionProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'layouts.ReviewsLayout' })

  return (
    <Section {...rest}>
      <div className="flex flex-col justify-start gap-6">
        <LayoutGroup id="reviews">
          {reviews?.map((review) => (
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
          {reviews.length === 0 ? t('noReviews') : null}
        </LayoutGroup>
      </div>
    </Section>
  )
}

export default ReviewsSection
