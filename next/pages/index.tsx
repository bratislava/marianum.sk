/* eslint-disable sonarjs/no-duplicate-string */
import { dehydrate, DehydratedState, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { GetStaticProps, GetStaticPropsResult } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Seo from '@/components/atoms/Seo'
import PageWrapper from '@/components/layouts/PageWrapper'
import SectionsWrapper from '@/components/layouts/SectionsWrapper'
import CtaGroup from '@/components/molecules/CtaGroup'
import NavigationProvider from '@/components/molecules/Navigation/NavigationProvider/NavigationProvider'
import Section from '@/components/molecules/Section'
import ArticlesManualListingSection from '@/components/sections/ArticlesManualListingSection'
import CardSection from '@/components/sections/CardSection'
import HomepageProceduresSection from '@/components/sections/HomepageProceduresSection'
import HomepageReviewsSection from '@/components/sections/HomepageReviewsSection'
import HomepageSlider from '@/components/sections/HomepageSlider'
import NewsSection from '@/components/sections/NewsSection'
import UpcomingCeremoniesSection from '@/components/sections/UpcomingCeremoniesSection'
import { GeneralEntityFragment, HomePageQuery, NavigationItemFragment } from '@/graphql'
import { getGraphqlNewsListingQuery } from '@/services/fetchers/articles/newsListingFetcher'
import { getUpcomingCeremoniesQuery } from '@/services/fetchers/ceremonies/upcomingCeremoniesFetcher'
import { client } from '@/services/graphql/gqlClient'
import { NOT_FOUND } from '@/utils/consts'
import { isDefined } from '@/utils/isDefined'

type HomeProps = {
  navigation: NavigationItemFragment[]
  page: NonNullable<NonNullable<HomePageQuery['homePage']>['data']>
  procedures: NonNullable<HomePageQuery['procedures']>['data']
  general: GeneralEntityFragment | null
  dehydratedState: DehydratedState
}

const Home = ({ navigation, page, procedures, general, dehydratedState }: HomeProps) => {
  const { t } = useTranslation()

  const { seo } = page.attributes ?? {}

  return (
    <HydrationBoundary state={dehydratedState}>
      {/* TODO: Extract NavigationProvider from PageWrapper */}
      <NavigationProvider navigation={navigation} general={general}>
        <Seo seo={seo} title={t('HomePage.home')} homepage />
      </NavigationProvider>

      <PageWrapper navigation={navigation} general={general}>
        {/* TODO translation */}
        <h1 className="sr-only">Marianum - Pohrebníctvo mesta Bratislavy</h1>

        <HomepageSlider slides={page.attributes?.featured?.filter(isDefined)} />

        <SectionsWrapper alternateBackground startBackground="dark" className="pb-14">
          {/* eslint-disable-next-line sonarjs/cognitive-complexity */}
          {page.attributes?.sections?.map((section) => {
            if (section?.__typename === 'ComponentSectionsManualListing') {
              return <CardSection key={`${section.__typename}-${section.id}`} section={section} />
            }
            if (section?.__typename === 'ComponentSectionsArticlesManualListing') {
              return (
                <ArticlesManualListingSection
                  key={`${section.__typename}-${section.id}`}
                  section={section}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsNewsListing') {
              return <NewsSection key={`${section.__typename}-${section.id}`} section={section} />
            }
            if (section?.__typename === 'ComponentSectionsUpcomingCeremoniesSection') {
              return (
                <UpcomingCeremoniesSection
                  key={`${section.__typename}-${section.id}`}
                  section={section}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsProceduresShortSection') {
              const { outsideMedicalFacility, atMedicalFacility } = procedures?.attributes ?? {}

              return (
                <HomepageProceduresSection
                  key={`${section.__typename}-${section.id}`}
                  outsideMedicalFacility={outsideMedicalFacility}
                  atMedicalFacility={atMedicalFacility}
                  section={section}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsCtaSection') {
              return (
                <Section key={`${section.__typename}-${section.id}`} title={section.title}>
                  <CtaGroup {...section} />
                </Section>
              )
            }
            if (section?.__typename === 'ComponentSectionsHomepageReviewsSection') {
              return (
                <HomepageReviewsSection
                  key={`${section.__typename}-${section.id}`}
                  section={section}
                />
              )
            }

            return null
          })}
        </SectionsWrapper>
      </PageWrapper>
    </HydrationBoundary>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
}): Promise<GetStaticPropsResult<HomeProps>> => {
  const { homePage, procedures } = await client.HomePage({ locale })

  if (!homePage?.data) {
    return NOT_FOUND
  }

  const [{ navigation, general }, translations] = await Promise.all([
    client.General({ locale }),
    serverSideTranslations(locale),
  ])

  const filteredNavigation = navigation.filter(isDefined)

  // Prefetch data
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(getGraphqlNewsListingQuery(locale))
  await queryClient.prefetchQuery(getUpcomingCeremoniesQuery())

  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      navigation: filteredNavigation,
      general: general?.data ?? null,
      page: homePage?.data ?? null,
      procedures: procedures?.data ?? null,
      dehydratedState,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Home
