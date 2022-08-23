/* eslint-disable sonarjs/no-duplicate-string */
import { GetStaticProps, GetStaticPropsResult } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageWrapper from '../components/layouts/PageWrapper'
import Section from '../components/molecules/Section'
import HomepageSlider from '../components/sections/HomepageSlider'
import { HomePageQuery, NavigationItemFragment } from '../graphql'
import { client } from '../utils/gql'

type HomeProps = {
  navigation: NavigationItemFragment[]
  faqLink: string
  phoneNumber: string
  page: NonNullable<NonNullable<HomePageQuery['homePage']>['data']>
}

const Home = ({ navigation, faqLink, phoneNumber, page }: HomeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation()

  return (
    <PageWrapper navigation={navigation} faqLink={faqLink} phoneNumber={phoneNumber}>
      <HomepageSlider
        slides={[
          {
            key: 'slide-1',
            title: 'Slide 1',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            imageSrc: '',
            buttonText: 'Zistiť viac',
          },
          {
            key: 'slide-2',
            title: 'Slide 2',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            imageSrc: '',
            buttonText: 'Zistiť viac',
          },
          {
            key: 'slide-3',
            title: 'Slide 3',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            imageSrc: '',
            buttonText: 'Zistiť viac',
          },
        ]}
      />
      <div>
        {/* eslint-disable-next-line sonarjs/cognitive-complexity */}
        {page.attributes?.sections?.map((section, index) => {
          if (section?.__typename === 'ComponentSectionsManualListing') {
            return (
              <Section key={section.id} fullWidth color={index % 2 === 0 ? 'white' : 'default'}>
                {/* TODO */}
                {section.title}
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsServicesListing') {
            return (
              <Section key={section.id} fullWidth color={index % 2 === 0 ? 'white' : 'default'}>
                {/* TODO */}
                {section.title}
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsMenuListing') {
            return (
              <Section key={section.id} fullWidth color={index % 2 === 0 ? 'white' : 'default'}>
                {/* TODO */}
                {section.title}
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsNewsListing') {
            return (
              <Section key={section.id} fullWidth color={index % 2 === 0 ? 'white' : 'default'}>
                {/* TODO */}
                {section.title}
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsCeremoniesSection') {
            return (
              <Section key={section.id} fullWidth color={index % 2 === 0 ? 'white' : 'default'}>
                {/* TODO */}
                {section.title}
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsProceduresShortSection') {
            return (
              <Section key={section.id} fullWidth color={index % 2 === 0 ? 'white' : 'default'}>
                {/* TODO */}
                {section.title}
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsCtaSection') {
            return (
              <Section key={section.id} fullWidth color={index % 2 === 0 ? 'white' : 'default'}>
                {/* TODO */}
                {section.title}
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsReviewsSection') {
            return (
              <Section key={section.id} fullWidth color={index % 2 === 0 ? 'white' : 'default'}>
                {/* TODO */}
                {section.title}
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
    client.Navigation({ locale }),
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
      faqLink: general?.data?.attributes?.header?.faqLink ?? '',
      phoneNumber: general?.data?.attributes?.header?.phoneNumber ?? '',
      page: homePage?.data,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Home
