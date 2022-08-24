/* eslint-disable sonarjs/no-duplicate-string */
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageWrapper from '../components/layouts/PageWrapper'
import { FooterProps } from '../components/molecules/Footer/Footer'
import Section from '../components/molecules/Section'
import HomepageSlider from '../components/sections/HomepageSlider'
import { HomePageQuery, NavigationItemFragment } from '../graphql'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'

type HomeProps = {
  navigation: NavigationItemFragment[]
  faqLink: string
  phoneNumber: string
  page: NonNullable<NonNullable<HomePageQuery['homePage']>['data']>
  footerProps: FooterProps
}

const Home = ({ navigation, faqLink, phoneNumber, page, footerProps }: HomeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation()

  return (
    <PageWrapper
      navigation={navigation}
      faqLink={faqLink}
      phoneNumber={phoneNumber}
      footerProps={footerProps}
    >
      <HomepageSlider slides={page.attributes?.featured?.filter(isDefined)} />

      <div>
        {page.attributes?.sections?.map((section, index) => {
          const color = index % 2 === 0 ? 'default' : 'white'
          if (section?.__typename === 'ComponentSectionsManualListing') {
            return (
              <Section key={section.id} fullWidth color={color}>
                {/* TODO */}
                manual listing
              </Section>
            )
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

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale = 'sk' }) => {
  const [{ navigation }, { homePage }, { general }, translations] = await Promise.all([
    client.Navigation({ locale }),
    client.HomePage({ locale }),
    client.General({ locale }),
    serverSideTranslations(locale, ['common']) as any, // TODO: fix any
  ])

  if (!homePage?.data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      navigation,
      faqLink: general?.data?.attributes?.header?.faqLink ?? '',
      phoneNumber: general?.data?.attributes?.header?.phoneNumber ?? '',
      page: homePage?.data,
      footerProps: {
        address: general?.data?.attributes?.contact?.address,
        navigateToLink: general?.data?.attributes?.contact?.navigateToLink,
        openingHours: general?.data?.attributes?.contact?.featuredOpeningHours,
        phoneNumber: general?.data?.attributes?.contact?.phone,
        emailAddress: general?.data?.attributes?.contact?.email,
        contactPageLink: general?.data?.attributes?.contact?.contactsLink,
        markerLat: general?.data?.attributes?.contact?.latitude,
        markerLng: general?.data?.attributes?.contact?.longitude,
        socialMedia: {
          instagramLink: general?.data?.attributes?.social?.instagram,
          facebookLink: general?.data?.attributes?.social?.facebook,
          linkedInLink: general?.data?.attributes?.social?.linkedin,
          twitterLink: general?.data?.attributes?.social?.twitter,
          youtubeLink: general?.data?.attributes?.social?.youtube,
        },
        linkColumns: [
          {
            title: general?.data?.attributes?.footer?.title1,
            links: general?.data?.attributes?.footer?.links1,
          },
          {
            title: general?.data?.attributes?.footer?.title2,
            links: general?.data?.attributes?.footer?.links2,
          },
          {
            title: general?.data?.attributes?.footer?.title3,
            links: general?.data?.attributes?.footer?.links3,
          },
          {
            title: general?.data?.attributes?.footer?.title4,
            links: general?.data?.attributes?.footer?.links4,
          },
        ],
      },
      ...translations,
    },
    revalidate: 10,
  }
}

export default Home
