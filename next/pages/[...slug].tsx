import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '../components/layouts/Layout'
import { FooterProps } from '../components/molecules/Footer/Footer'
import Section from '../components/molecules/Section'
import MenuListingSection from '../components/sections/MenuListingSection'
import { Enum_Page_Layout, NavigationItemFragment, PageEntityFragment } from '../graphql'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'

type PageProps = {
  navigation: NavigationItemFragment[]
  faqLink: string
  phoneNumber: string
  page: PageEntityFragment
  footerProps: FooterProps
}

const Slug = ({ navigation, faqLink, phoneNumber, page, footerProps }: PageProps) => {
  const isFullWidth = page.attributes?.layout === Enum_Page_Layout.Fullwidth

  return (
    <Layout
      page={page}
      navigation={navigation}
      faqLink={faqLink}
      phoneNumber={phoneNumber}
      footerProps={footerProps}
    >
      <div className="space-y-6 sm:space-y-8">
        {/* eslint-disable-next-line sonarjs/cognitive-complexity */}
        {page.attributes?.sections?.map((section, index) => {
          if (section?.__typename === 'ComponentSectionsRichtext') {
            return (
              <Section
                key={section.id}
                fullWidth={isFullWidth}
                color={index % 2 === 0 ? 'white' : 'default'}
              >
                {/* TODO */}
                {section.markdown}
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsAccordionGroup') {
            return (
              <Section key={section.id} fullWidth={isFullWidth}>
                {/* TODO */}
                accordions
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsBranchGroup') {
            return (
              <Section key={section.id} fullWidth={isFullWidth}>
                {/* TODO */}
                branches
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsContactGroup') {
            return (
              <Section key={section.id} fullWidth={isFullWidth}>
                {/* TODO */}
                contacts
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsDocumentGroup') {
            return (
              <Section key={section.id} fullWidth={isFullWidth}>
                {/* TODO */}
                documents
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsGallery') {
            return (
              <Section key={section.id} fullWidth={isFullWidth}>
                {/* TODO */}
                gallery
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsMenuListing') {
            return (
              <MenuListingSection
                key={section.id}
                slug={section.slug}
                navigation={navigation}
                isFullWidth={isFullWidth}
                title={section.title}
              />
            )
          }
          return null
        })}
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['sk', 'en'] }) => {
  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.PagesStaticPaths({ locale })),
  )
  const pages = pathArraysForLocales
    .flatMap(({ pages: allPages }) => allPages?.data || [])
    .filter(isDefined)
  if (pages.length > 0) {
    const paths = pages
      .filter((page) => page.attributes?.slug)
      .map((page) => ({
        params: {
          slug: page?.attributes?.slug ? page.attributes?.slug.split('/') : [],
          locale: page?.attributes?.locale || '',
        },
      }))
    // eslint-disable-next-line no-console
    console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS`)
    return { paths, fallback: 'blocking' }
  }
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale = 'sk', params }) => {
  const slug = last(params?.slug) ?? ''

  const [{ navigation }, { pages }, { general }, translations] = await Promise.all([
    client.Navigation({ locale }),
    client.PageBySlug({ locale, slug }),
    client.General({ locale }),
    serverSideTranslations(locale, ['common']) as any, // TODO: fix any
  ])

  if (!pages || pages.data.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      navigation,
      faqLink: general?.data?.attributes?.header?.faqLink ?? '',
      phoneNumber: general?.data?.attributes?.header?.phoneNumber ?? '',
      page: pages.data[0],
      footerProps: {
        address: general?.data?.attributes?.contact?.address,
        navigateToLink: general?.data?.attributes?.contact?.navigateToLink,
        openingHours: general?.data?.attributes?.contact?.featuredOpeningHours,
        phoneNumber: general?.data?.attributes?.contact?.phone,
        emailAddress: general?.data?.attributes?.contact?.email,
        contactPageLink: general?.data?.attributes?.contact?.contactsLink,
        markerLat: general?.data?.attributes?.contact?.latitude,
        markerLng: general?.data?.attributes?.contact?.longitude,
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

export default Slug
