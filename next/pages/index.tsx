/* eslint-disable sonarjs/no-duplicate-string */
import { GetStaticProps, GetStaticPropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageWrapper from '../components/layouts/PageWrapper'
import SectionsWrapper from '../components/layouts/SectionsWrapper'
import CtaGroup from '../components/molecules/CtaGroup'
import Section from '../components/molecules/Section'
import CardSection from '../components/sections/CardSection'
import HomepageCeremoniesListing from '../components/sections/HomepageCeremoniesListing'
import HomepageProcedures from '../components/sections/HomepageProcedures'
import HomepageSlider from '../components/sections/HomepageSlider'
import NewsListing from '../components/sections/NewsListing'
import UpcomingCeremoniesSection from '../components/sections/UpcomingCeremoniesSection'
import { GeneralEntityFragment, HomePageQuery, NavigationItemFragment } from '../graphql'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'

type HomeProps = {
  navigation: NavigationItemFragment[]
  page: NonNullable<NonNullable<HomePageQuery['homePage']>['data']>
  procedures: NonNullable<HomePageQuery['procedures']>['data']
  general: GeneralEntityFragment | null
}

const Home = ({ navigation, page, procedures, general }: HomeProps) => {
  return (
    <PageWrapper navigation={navigation} general={general}>
      <HomepageSlider slides={page.attributes?.featured?.filter(isDefined)} />

      <SectionsWrapper alternateBackground startBackground="dark" isContainer>
        {/* eslint-disable-next-line sonarjs/cognitive-complexity */}
        {page.attributes?.sections?.map((section, index) => {
          if (section?.__typename === 'ComponentSectionsManualListing') {
            return (
              <CardSection
                index={index}
                key={`${section.__typename}-${section.id}`}
                section={section}
              />
            )
          }
          if (section?.__typename === 'ComponentSectionsNewsListing') {
            return (
              <Section
                index={index}
                key={`${section.__typename}-${section.id}`}
                title={section.title}
              >
                <NewsListing />
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsUpcomingCeremoniesSection') {
            return (
              <UpcomingCeremoniesSection
                index={index}
                key={`${section.__typename}-${section.id}`}
                section={section}
              />
            )
          }
          if (section?.__typename === 'ComponentSectionsProceduresShortSection') {
            const { outsideMedicalFacility, atMedicalFacility } = procedures?.attributes ?? {}
            const proceduresArr = [outsideMedicalFacility, atMedicalFacility].filter(isDefined)

            const { showMoreButton, title, __typename, id } = section

            return (
              <HomepageProcedures
                index={index}
                key={`${__typename}-${id}`}
                title={title}
                procedures={proceduresArr}
                showMoreButton={showMoreButton}
              />
            )
          }
          if (section?.__typename === 'ComponentSectionsCtaSection') {
            return (
              <Section
                index={index}
                key={`${section.__typename}-${section.id}`}
                title={section.title}
              >
                <CtaGroup {...section} />
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsReviewsSection') {
            return (
              <Section index={index} key={`${section.__typename}-${section.id}`}>
                {/* TODO */}
                reviews section
              </Section>
            )
          }

          return null
        })}
      </SectionsWrapper>
    </PageWrapper>
  )
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
}): Promise<GetStaticPropsResult<HomeProps>> => {
  const [{ navigation, general }, { homePage, procedures }, translations] = await Promise.all([
    client.General({ locale }),
    client.HomePage({ locale }),
    serverSideTranslations(locale, ['common']),
  ])

  const filteredNavigation = navigation.filter(Boolean) as NavigationItemFragment[]

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
      ...translations,
    },
    revalidate: 10,
  }
}

export default Home
