import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '../components/layouts/Layout'
import Section from '../components/molecules/Section'
import ImageGallerySection from '../components/sections/ImageGallerySection'
import MenuListingSection from '../components/sections/MenuListingSection'
import RichTextSection from '../components/sections/RichTextSection'
import {
  Enum_Page_Layout,
  GeneralEntityFragment,
  NavigationItemFragment,
  PageEntityFragment,
} from '../graphql'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'

type PageProps = {
  navigation: NavigationItemFragment[]
  page: PageEntityFragment
  general: GeneralEntityFragment | null
} & SSRConfig

const Slug = ({ navigation, page, general }: PageProps) => {
  const fullWidth = page.attributes?.layout === Enum_Page_Layout.Fullwidth

  return (
    <Layout page={page} navigation={navigation} general={general}>
      <div className="space-y-6 sm:space-y-8">
        {/* eslint-disable-next-line sonarjs/cognitive-complexity */}
        {page.attributes?.sections?.map((section, index) => {
          const color = index % 2 === 0 ? 'white' : 'default'
          if (section?.__typename === 'ComponentSectionsRichtext') {
            return (
              <RichTextSection
                key={section.id}
                fullWidth={fullWidth}
                color={color}
                markdown={section.markdown}
              />
            )
          }
          if (section?.__typename === 'ComponentSectionsAccordionGroup') {
            return (
              <Section key={section.id} fullWidth={fullWidth} color={color}>
                {/* TODO */}
                accordions
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsBranchGroup') {
            return (
              <Section key={section.id} fullWidth={fullWidth} color={color}>
                {/* TODO */}
                branches
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsContactGroup') {
            return (
              <Section key={section.id} fullWidth={fullWidth} color={color}>
                {/* TODO */}
                contacts
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsDocumentGroup') {
            return (
              <Section key={section.id} fullWidth={fullWidth} color={color}>
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
                fullWidth={fullWidth}
                color={color}
                title={section.title}
                slug={section.slug}
                navigation={navigation}
              />
            )
          }
          if (section?.__typename === 'ComponentSectionsManualListing') {
            return (
              <Section key={section.id} fullWidth={fullWidth} color={color}>
                {/* TODO */}
                manual listing
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsNewsListing') {
            return (
              <Section key={section.id} fullWidth={fullWidth} color={color}>
                {/* TODO */}
                news listing
              </Section>
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
    client.General({ locale }),
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
      page: pages.data[0],
      general: general?.data ?? null,
      ...translations,
    },
    revalidate: 10,
  }
}

export default Slug
