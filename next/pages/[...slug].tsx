import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '../components/layouts/Layout'
import Section from '../components/molecules/Section'
import ImageGallerySection from '../components/sections/ImageGallerySection'
import MenuListingSection from '../components/sections/MenuListingSection'
import { Enum_Page_Layout, NavigationItemFragment, PageEntityFragment } from '../graphql'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'

type PageProps = {
  navigation: NavigationItemFragment[]
  faqLink: string
  phoneNumber: string
  page: PageEntityFragment
} & SSRConfig

const Slug = ({ navigation, faqLink, phoneNumber, page }: PageProps) => {
  const isFullWidth = page.attributes?.layout === Enum_Page_Layout.Fullwidth

  return (
    <Layout page={page} navigation={navigation} faqLink={faqLink} phoneNumber={phoneNumber}>
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
              <ImageGallerySection
                key={section.id}
                title={section.title}
                images={section.medias?.data}
                variant="bellow"
              />
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
    console.log(`PAGES: GENERATED STATIC PATHS FOR ${paths.length} SLUGS`)
    return { paths, fallback: 'blocking' }
  }
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
  params,
}): Promise<GetStaticPropsResult<PageProps>> => {
  const slug = last(params?.slug) ?? ''

  const [{ navigation, general }, { pages }, translations] = await Promise.all([
    client.Navigation({ locale }),
    client.PageBySlug({ locale, slug }),
    serverSideTranslations(locale, ['common']),
  ])

  const filteredNavigation = navigation.filter(Boolean) as NavigationItemFragment[]

  if (!pages || pages.data.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      navigation: filteredNavigation,
      faqLink: general?.data?.attributes?.header?.faqLink ?? '',
      phoneNumber: general?.data?.attributes?.header?.phoneNumber ?? '',
      page: pages.data[0],
      ...translations,
    },
    revalidate: 10,
  }
}

export default Slug
