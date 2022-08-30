/* eslint-disable sonarjs/no-duplicate-string */
import { GetStaticProps, GetStaticPropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageWrapper from '../components/layouts/PageWrapper'
import Section from '../components/molecules/Section'
import CardSection from '../components/sections/CardSection'
import HomepageProcedures from '../components/sections/HomepageProcedures'
import HomepageSlider from '../components/sections/HomepageSlider'
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

      <div>
        {/* eslint-disable-next-line sonarjs/cognitive-complexity */}
        {page.attributes?.sections?.map((section, index) => {
          const color = index % 2 === 0 ? 'default' : 'white'

          if (section?.__typename === 'ComponentSectionsManualListing') {
            return (
              <CardSection
                key={`${section.__typename}-${section.id}`}
                isContainer
                color={color}
                section={section}
              />
            )
          }
          if (section?.__typename === 'ComponentSectionsNewsListing') {
            return (
              <Section key={`${section.__typename}-${section.id}`} isContainer color={color}>
                {/* TODO */}
                news listing
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsCeremoniesSection') {
            return (
              <Section key={`${section.__typename}-${section.id}`} isContainer color={color}>
                {/* TODO */}
                ceremonies listing
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsProceduresShortSection') {
            const { outsideMedicalFacility, atMedicalFacility } = procedures?.attributes ?? {}
            const proceduresArr = [outsideMedicalFacility, atMedicalFacility].filter(isDefined)

            const { showMoreButton, title, __typename, id } = section

            return (
              <HomepageProcedures
                key={`${__typename}-${id}`}
                title={title}
                isContainer
                color={color}
                procedures={proceduresArr}
                showMoreButton={showMoreButton}
              />
            )
          }
          if (section?.__typename === 'ComponentSectionsCtaSection') {
            return (
              <Section key={`${section.__typename}-${section.id}`} isContainer color={color}>
                {/* TODO */}
                cta section
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsReviewsSection') {
            return (
              <Section key={`${section.__typename}-${section.id}`} isContainer color={color}>
                {/* TODO */}
                reviews section
              </Section>
            )
          }

          return null
        })}
      </div>
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
