import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useIsClient } from 'usehooks-ts'

import ReviewCard from '@/components/molecules/Cards/ReviewCard'
import Section from '@/components/molecules/Section'
import { HomepageReviewsSectionFragment } from '@/graphql'

type HomepageReviewsSectionProps = {
  section?: HomepageReviewsSectionFragment
}

const HomepageReviewsSection = ({ section }: HomepageReviewsSectionProps) => {
  const isBrowser = useIsClient()

  return (
    <Section title={section?.title} button={section?.showMoreButton}>
      {/* display swiper on client only due to hydration error */}
      {isBrowser && (
        <Swiper
          spaceBetween={16}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          allowTouchMove={(section?.reviews.length ?? 0) > 4}
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
          {section?.reviews
            .sort((reviewA, reviewB) => (reviewA?.date < reviewB?.date ? 1 : -1))
            .map((review, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <SwiperSlide key={`${review?.documentId}-${index}`}>
                <ReviewCard
                  author={review?.author ?? ''}
                  date={new Date(review?.date)}
                  rating={review?.rating ?? 5}
                  description={review?.description ?? ''}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </Section>
  )
}

export default HomepageReviewsSection
