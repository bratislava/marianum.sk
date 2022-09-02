import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Layout from '../components/layouts/Layout'
import AccordionGroup from '../components/molecules/Accordion/AccordionGroup'
import AccordionItem from '../components/molecules/Accordion/AccordionItem'
import BranchGroup from '../components/molecules/BranchGroup'
import ProcedureTabs from '../components/molecules/ProcedureTabs'
import Section from '../components/molecules/Section'
import BundleListingSection from '../components/sections/BundleListingSection'
import CardSection from '../components/sections/CardSection'
import ContactsSection from '../components/sections/ContactsSection'
import ImageGallerySection from '../components/sections/ImageGallerySection'
import MenuListingSection from '../components/sections/MenuListingSection'
import PartnersSection from '../components/sections/PartnersSection'
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
  const isContainer = page.attributes?.layout === Enum_Page_Layout.Fullwidth

  return (
    <Layout page={page} navigation={navigation} general={general}>
      <div className="gap-y-6 sm:gap-y-8">
        {/* eslint-disable-next-line sonarjs/cognitive-complexity */}
        {page.attributes?.sections?.map((section) => {
          if (section?.__typename === 'ComponentSectionsProceduresSection') {
            return (
              <Section key={section.id} isContainer={isContainer} title={section.title}>
                <ProcedureTabs />
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsRichtext') {
            return (
              <RichTextSection
                key={section.id}
                isContainer={isContainer}
                content={section.content}
              />
            )
          }
          if (section?.__typename === 'ComponentSectionsAccordionGroup') {
            return (
              <Section key={section.id} isContainer={isContainer} title={section.title}>
                <AccordionGroup>
                  {section.accordions?.map((accordion) => (
                    <AccordionItem key={accordion?.id} title={accordion?.title}>
                      {/* TODO parse and display content properly with EditorJS <Blocks></Blocks> */}
                      {accordion?.content}
                    </AccordionItem>
                  ))}
                </AccordionGroup>
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsBranchGroup') {
            return (
              <Section key={section.id} isContainer={isContainer} title={section.title}>
                <BranchGroup {...section} />
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsBundleListing') {
            return (
              <BundleListingSection key={section.id} isContainer={isContainer} section={section} />
            )
          }
          if (section?.__typename === 'ComponentSectionsContactGroup') {
            return section && <ContactsSection {...section} />
          }
          if (section?.__typename === 'ComponentSectionsDocumentGroup') {
            return (
              <Section key={section.id} isContainer={isContainer}>
                {/* TODO */}
                documents
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsPartnersSection') {
            return (
              <PartnersSection
                key={section.id}
                featuredTitle={section.featuredPartnersTitle}
                otherTitle={section.otherPartnersTitle}
              />
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
                isContainer={isContainer}
                title={section.title}
                slug={section.slug}
                navigation={navigation}
              />
            )
          }
          if (section?.__typename === 'ComponentSectionsManualListing') {
            return <CardSection key={section.id} isContainer={isContainer} section={section} />
          }
          if (section?.__typename === 'ComponentSectionsNewsListing') {
            return (
              <Section key={section.id} isContainer={isContainer}>
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

  const filteredNavigation = navigation.filter(isDefined)

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
