/* eslint-disable sonarjs/no-duplicate-string */
import Seo from '@components/atoms/Seo'
import PageWrapper from '@components/layouts/PageWrapper'
import SectionsWrapper from '@components/layouts/SectionsWrapper'
import CtaGroup from '@components/molecules/CtaGroup'
import Section from '@components/molecules/Section'
import CardSection from '@components/sections/CardSection'
import HomepageProceduresSection from '@components/sections/HomepageProceduresSection'
import HomepageReviewsSection from '@components/sections/HomepageReviewsSection'
import HomepageSlider from '@components/sections/HomepageSlider'
import NewsSection from '@components/sections/NewsSection'
import UpcomingCeremoniesSection from '@components/sections/UpcomingCeremoniesSection'
import {
  GeneralEntityFragment,
  HomepageCeremoniesQuery,
  HomePageQuery,
  NavigationItemFragment,
} from '@graphql'
import { getNewsListingPrefetch } from '@services/fetchers/newsListingFetcher'
import { upcomingCeremoniesPrefetch } from '@services/fetchers/upcomingCeremoniesFetcher'
import { client } from '@services/graphql/gqlClient'
import { isDefined } from '@utils/isDefined'
import { prefetchSections } from '@utils/prefetchSections'
import { GetStaticProps, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SWRConfig } from 'swr'

type HomeProps = {
  navigation: NavigationItemFragment[]
  page: NonNullable<NonNullable<HomePageQuery['homePage']>['data']>
  procedures: NonNullable<HomePageQuery['procedures']>['data']
  general: GeneralEntityFragment | null
  fallback: { UpcomingCeremonies?: HomepageCeremoniesQuery }
}

const Home = ({ navigation, page, procedures, general, fallback }: HomeProps) => {
  const { seo } = page.attributes ?? {}

  return (
    <SWRConfig value={{ fallback }}>
      <Seo seo={seo} />
      <Head>
        <title>Marianum</title>
      </Head>

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
    </SWRConfig>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
}): Promise<GetStaticPropsResult<HomeProps>> => {
  const { homePage, procedures } = await client.HomePage({ locale })

  const sectionFetcherMapSwr = [upcomingCeremoniesPrefetch, getNewsListingPrefetch(locale)]

  const [{ navigation, general }, translations, fallback] = await Promise.all([
    client.General({ locale }),
    serverSideTranslations(locale, ['common']),
    prefetchSections(homePage?.data?.attributes?.sections, sectionFetcherMapSwr, true),
  ])

  const filteredNavigation = navigation.filter(isDefined)

  if (!homePage?.data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      navigation: filteredNavigation,
      general: general?.data ?? null,
      page: homePage?.data ?? null,
      procedures: procedures?.data ?? null,
      fallback: fallback as { UpcomingCeremonies?: HomepageCeremoniesQuery },
      ...translations,
    },
    revalidate: 10,
  }
}

export default Home
