import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'

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
        </LayoutGroup>
      </div>
    </Section>
  )
}

export default ReviewsSection
