/* eslint-disable sonarjs/no-duplicate-string */
import { GetStaticProps, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ReviewLayout from '../components/layouts/ReviewLayout'
import SectionsWrapper from '../components/layouts/SectionsWrapper'
import ReviewsSection from '../components/sections/ReviewsSection'
import { GeneralEntityFragment, NavigationItemFragment } from '../graphql'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'

type ReviewsPageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
}

const ReviewsPage = ({ navigation, general }: ReviewsPageProps) => {
  return (
    <>
      {/* TODO: add seo */}
      <Head>
        <title>Marianum reviews</title>
      </Head>

      <ReviewLayout navigation={navigation} general={general}>
        <SectionsWrapper startBackground="dark">
          <ReviewsSection />
        </SectionsWrapper>
      </ReviewLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
}): Promise<GetStaticPropsResult<ReviewsPageProps>> => {
  const [{ navigation, general }, translations] = await Promise.all([
    client.General({ locale }),
    serverSideTranslations(locale, ['common']),
  ])

  const filteredNavigation = navigation.filter(isDefined)

  return {
    props: {
      navigation: filteredNavigation,
      general: general?.data ?? null,
      ...translations,
    },
    revalidate: 10,
  }
}

export default ReviewsPage
