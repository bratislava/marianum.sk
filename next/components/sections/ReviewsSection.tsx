import { useMemo } from 'react'
import useSWR from 'swr'

import { client } from '../../utils/gql'
import { isDefined } from '../../utils/isDefined'
import Review from '../molecules/Review'
import Section, { SectionProps } from '../molecules/Section'

const ReviewsSection = (props: Pick<SectionProps, 'background'>) => {
  const { data, error } = useSWR('Reviews', () => client.Reviews())

  const filteredReviews = useMemo(() => {
    return data?.reviews?.data?.map((review) => review.attributes).filter(isDefined)
  }, [data?.reviews])

  // TODO replace by proper loading and error
  if (!data && !error) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  return (
    <Section {...props}>
      <div className="flex flex-col gap-6">
        {filteredReviews?.map((review, index) => (
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
