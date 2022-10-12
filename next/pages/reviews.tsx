import { GetStaticProps, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ReviewLayout from '../components/layouts/ReviewLayout'
import { GeneralEntityFragment, NavigationItemFragment, ReviewEntityFragment } from '../graphql'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'

type ReviewsPageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  reviews: ReviewEntityFragment[] | null
}

const ReviewsPage = ({ navigation, general, reviews }: ReviewsPageProps) => {
  return (
    <>
      {/* TODO: add seo */}
      <Head>
        <title>Marianum reviews</title>
      </Head>

      <ReviewLayout navigation={navigation} general={general} reviews={reviews} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
}): Promise<GetStaticPropsResult<ReviewsPageProps>> => {
  const [{ navigation, general }, { reviews }, translations] = await Promise.all([
    client.General({ locale }),
    client.Reviews({ locale }),
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
