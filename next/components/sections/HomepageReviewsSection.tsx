import { useContext } from 'react'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSsr } from 'usehooks-ts'

import { ReviewEntityFragment } from '../../graphql'
import { sectionContext } from '../layouts/SectionsWrapper'
import ReviewCard from '../molecules/Cards/ReviewCard'
import Section, { SectionProps } from '../molecules/Section'

type HomepageReviewsSectionProps = {
  reviews: ReviewEntityFragment[] | undefined | null
} & Pick<SectionProps, 'title' | 'button'>

const HomepageReviewsSection = ({ reviews, ...rest }: HomepageReviewsSectionProps) => {
  const { background } = useContext(sectionContext)

  const { isBrowser } = useSsr()

  return (
    <Section {...rest}>
      {/* display swiper on client only due to hydration error */}
      {isBrowser && (
        <Swiper
          spaceBetween={16}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          allowTouchMove={(reviews?.length ?? 0) > 4}
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
          modules={[Autoplay]}
        >
          {reviews?.map((review, index) => (
            // eslint-disable-next-line react/no-array-index-key, @typescript-eslint/restrict-template-expressions
            <SwiperSlide key={`${review.id}-${index}`}>
              <ReviewCard
                author={review.attributes?.author ?? ''}
                date={new Date(review.attributes?.date)}
                rating={review.attributes?.rating ?? 5}
                description={review.attributes?.description ?? ''}
                border={background === 'light'}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Section>
  )
}

export default HomepageReviewsSection
