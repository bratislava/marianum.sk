import { Review as GraphqlReview } from '../../graphql'
import Review from '../molecules/Review'
import Section, { SectionProps } from '../molecules/Section'

type ReviewsSectionProps = {
  reviews: GraphqlReview[]
}

const ReviewsSection = ({
  reviews,
  ...rest
}: Pick<SectionProps, 'background'> & ReviewsSectionProps) => {
  return (
    <Section {...rest}>
      <div className="flex flex-col gap-6">
        {reviews?.map((review, index) => (
          <>
            {index !== 0 && <div className="border-b border-border" />}
            <Review
              author={review.author}
              description={review.description}
              rating={review.rating}
              date={new Date(review.date)}
            />
          </>
        ))}
      </div>
    </Section>
  )
}

export default ReviewsSection
