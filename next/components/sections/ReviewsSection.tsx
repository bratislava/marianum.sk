import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ReviewEntityFragment } from '../../graphql'
import ReviewCard from '../molecules/Cards/ReviewCard'
import Section, { SectionProps } from '../molecules/Section'

type ReviewSectionProps = {
  reviews: ReviewEntityFragment[] | undefined | null
} & Pick<SectionProps, 'title' | 'button'>

const ReviewSection = ({ reviews, ...rest }: ReviewSectionProps) => {
  const [isBrowser, setBrowser] = useState(false)
  useEffect(() => {
    setBrowser(true)
  }, [])

  return (
    <div className="overflow-hidden">
      <Section {...rest}>
        {isBrowser && (
          <Swiper
            className="!overflow-visible"
            spaceBetween={16}
            loop
            autoplay
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {reviews?.map((review, index) => (
              // eslint-disable-next-line react/no-array-index-key, @typescript-eslint/restrict-template-expressions
              <SwiperSlide key={`${review.id}-${index}`}>
                <ReviewCard
                  author={review.attributes?.author ?? ''}
                  date={new Date(review.attributes?.date)}
                  rating={review.attributes?.rating ?? 5}
                  description={review.attributes?.description ?? ''}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Section>
    </div>
  )
}

export default ReviewSection
