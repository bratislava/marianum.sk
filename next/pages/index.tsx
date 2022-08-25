/* eslint-disable sonarjs/no-duplicate-string */
import { GetStaticProps, GetStaticPropsResult } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import MLink from '../components/atoms/MLink'
import Tab from '../components/atoms/Tabs/Tab'
import Tabs from '../components/atoms/Tabs/Tabs'
import PageWrapper from '../components/layouts/PageWrapper'
import Checklist from '../components/molecules/Checklist/Checklist'
import Row from '../components/molecules/Row'
import Section from '../components/molecules/Section'
import CardSection from '../components/sections/CardSection'
import HomepageSlider from '../components/sections/HomepageSlider'
import { GeneralEntityFragment, HomePageQuery, NavigationItemFragment } from '../graphql'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'
import { parseSteps } from '../utils/useProcedures'

type HomeProps = {
  navigation: NavigationItemFragment[]
  page: NonNullable<NonNullable<HomePageQuery['homePage']>['data']>
  procedures: NonNullable<HomePageQuery['procedure']>['data']
  general: GeneralEntityFragment | null
}

const Home = ({ navigation, page, procedures, general }: HomeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation()

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
                fullWidth
                color={color}
                section={section}
              />
            )
          }
          if (section?.__typename === 'ComponentSectionsNewsListing') {
            return (
              <Section key={`${section.__typename}-${section.id}`} fullWidth color={color}>
                {/* TODO */}
                news listing
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsCeremoniesSection') {
            return (
              <Section key={`${section.__typename}-${section.id}`} fullWidth color={color}>
                {/* TODO */}
                ceremonies listing
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsProceduresShortSection') {
            const procedure1 = procedures?.attributes?.outsideMedicalFacility
            const steps1 = parseSteps(procedure1?.steps?.filter(isDefined) ?? [])
            const procedure2 = procedures?.attributes?.atMedicalFacility
            const steps2 = parseSteps(procedure2?.steps?.filter(isDefined) ?? [])

            const { showMoreButton, title, __typename, id } = section

            return (
              <Section key={`${__typename}-${id}`} fullWidth color={color} title={title}>
                <Tabs areBig>
                  <Tab label={procedure1?.title ?? ''}>
                    <div className="mt-9 flex flex-col gap-4">
                      {steps1.slice(0, 3).map((step, i) => (
                        <Row title={step.title} moreContent={step.description} number={i + 1} />
                      ))}
                    </div>
                  </Tab>
                  <Tab label={procedure2?.title ?? ''}>
                    <div className="mt-9">
                      <Checklist items={steps2} />
                    </div>
                  </Tab>
                </Tabs>
                {showMoreButton?.url && (
                  <div className="mt-8 text-center">
                    <MLink
                      href={showMoreButton.url}
                      target={showMoreButton.targetBlank ? '_blank' : '_self'}
                    >
                      {showMoreButton.label}
                    </MLink>
                  </div>
                )}
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsCtaSection') {
            return (
              <Section key={`${section.__typename}-${section.id}`} fullWidth color={color}>
                {/* TODO */}
                cta section
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsReviewsSection') {
            return (
              <Section key={`${section.__typename}-${section.id}`} fullWidth color={color}>
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
  const [{ navigation, general }, { homePage, procedure }, translations] = await Promise.all([
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
      procedures: procedure?.data ?? null,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Home
