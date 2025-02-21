import { Autoplay } from 'swiper'
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
          allowTouchMove={(section?.reviews?.data?.length ?? 0) > 4}
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
          {section?.reviews?.data
            ?.sort((reviewA, reviewB) =>
              reviewA.attributes?.date < reviewB.attributes?.date ? 1 : -1,
            )
            .map((review, index) => (
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
  )
}

export default HomepageReviewsSection
