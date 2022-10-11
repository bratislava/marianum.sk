import { GetStaticProps, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMemo } from 'react'

import ReviewLayout from '../components/layouts/ReviewLayout'
import SectionsWrapper from '../components/layouts/SectionsWrapper'
import ReviewsSection from '../components/sections/ReviewsSection'
import { GeneralEntityFragment, NavigationItemFragment, ReviewEntityFragment } from '../graphql'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'

type ReviewsPageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  reviews: ReviewEntityFragment[] | null
}

const ReviewsPage = ({ navigation, general, reviews }: ReviewsPageProps) => {
  const filteredReviews = useMemo(() => {
    return reviews?.map((review) => review.attributes).filter(isDefined) ?? []
  }, [reviews])

  return (
    <>
      {/* TODO: add seo */}
      <Head>
        <title>Marianum reviews</title>
      </Head>

      <ReviewLayout navigation={navigation} general={general}>
        <SectionsWrapper startBackground="dark">
          <ReviewsSection reviews={filteredReviews} />
        </SectionsWrapper>
      </ReviewLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
}): Promise<GetStaticPropsResult<ReviewsPageProps>> => {
  const [{ navigation, general }, { reviews }, translations] = await Promise.all([
    client.General({ locale }),
    client.Reviews(),
    serverSideTranslations(locale, ['common']),
  ])

  const filteredNavigation = navigation.filter(isDefined)

  return {
    props: {
      navigation: filteredNavigation,
      general: general?.data ?? null,
      reviews: reviews?.data ?? null,
      ...translations,
    },
    revalidate: 10,
  }
}

export default ReviewsPage
