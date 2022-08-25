/* eslint-disable sonarjs/no-duplicate-string */
import { GetStaticProps, GetStaticPropsResult } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageWrapper from '../components/layouts/PageWrapper'
import Section from '../components/molecules/Section'
import CardSection from '../components/sections/CardSection'
import HomepageSlider from '../components/sections/HomepageSlider'
import { GeneralEntityFragment, HomePageQuery, NavigationItemFragment } from '../graphql'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'

type HomeProps = {
  navigation: NavigationItemFragment[]
  page: NonNullable<NonNullable<HomePageQuery['homePage']>['data']>
  general: GeneralEntityFragment | null
}

const Home = ({ navigation, page, general }: HomeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation()

  return (
    <PageWrapper navigation={navigation} general={general}>
      <HomepageSlider slides={page.attributes?.featured?.filter(isDefined)} />

      <div>
        {page.attributes?.sections?.map((section, index) => {
          const color = index % 2 === 0 ? 'default' : 'white'
          if (section?.__typename === 'ComponentSectionsManualListing') {
            return <CardSection key={section.id} fullWidth color={color} section={section} />
          }
          if (section?.__typename === 'ComponentSectionsNewsListing') {
            return (
              <Section key={section.id} fullWidth color={color}>
                {/* TODO */}
                news listing
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsCeremoniesSection') {
            return (
              <Section key={section.id} fullWidth color={color}>
                {/* TODO */}
                ceremonies listing
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsProceduresShortSection') {
            return (
              <Section key={section.id} fullWidth color={color}>
                {/* TODO */}
                procedures with numbers
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsCtaSection') {
            return (
              <Section key={section.id} fullWidth color={color}>
                {/* TODO */}
                cta section
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsReviewsSection') {
            return (
              <Section key={section.id} fullWidth color={color}>
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
  const [{ navigation, general }, { homePage }, translations] = await Promise.all([
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
      page: homePage?.data,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Home
