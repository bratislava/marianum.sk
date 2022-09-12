import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import RichText from '../components/atoms/RichText/RichText'
import Layout from '../components/layouts/Layout'
import SectionsWrapper from '../components/layouts/SectionsWrapper'
import AccordionGroup from '../components/molecules/Accordion/AccordionGroup'
import AccordionItem from '../components/molecules/Accordion/AccordionItem'
import BranchGroup from '../components/molecules/BranchGroup'
import DocumentGroup from '../components/molecules/DocumentGroup'
import ProcedureTabs from '../components/molecules/ProcedureTabs'
import Section from '../components/molecules/Section'
import BundleListingSection from '../components/sections/BundleListingSection'
import CardSection from '../components/sections/CardSection'
import ContactsSection from '../components/sections/ContactsSection'
import ImageGallerySection from '../components/sections/ImageGallerySection'
import MenuListingSection from '../components/sections/MenuListingSection'
import NewsListing from '../components/sections/NewsListing'
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
  general: GeneralEntityFragment | null
  page: PageEntityFragment
} & SSRConfig

const Slug = ({ navigation, page, general }: PageProps) => {
  const isContainer = page.attributes?.layout === Enum_Page_Layout.Fullwidth

  return (
    <Layout page={page} navigation={navigation} general={general}>
      <SectionsWrapper
        isContainer={isContainer}
        alternateBackground={isContainer}
        startBackground="light"
        className="gap-y-6 sm:gap-y-8"
      >
        {/* eslint-disable-next-line sonarjs/cognitive-complexity */}
        {page.attributes?.sections?.map((section, index) => {
          if (section?.__typename === 'ComponentSectionsProceduresSection') {
            return (
              <Section
                index={index}
                key={`${section.__typename}-${section.id}`}
                title={section.title}
              >
                <ProcedureTabs />
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsRichtext') {
            return (
              <RichTextSection
                index={index}
                key={`${section.__typename}-${section.id}`}
                content={section.content}
              />
            )
          }
          if (section?.__typename === 'ComponentSectionsAccordionGroup') {
            return (
              <Section
                index={index}
                key={`${section.__typename}-${section.id}`}
                title={section.title}
              >
                <AccordionGroup>
                  {section.accordions?.map((accordion) => (
                    <AccordionItem key={accordion?.id} title={accordion?.title}>
                      <RichText data={accordion?.content} coloredTable={false} />
                    </AccordionItem>
                  ))}
                </AccordionGroup>
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsBranchGroup') {
            return (
              <Section
                index={index}
                key={`${section.__typename}-${section.id}`}
                title={section.title}
              >
                <BranchGroup {...section} />
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsBundleListing') {
            return (
              <BundleListingSection
                index={index}
                key={`${section.__typename}-${section.id}`}
                section={section}
              />
            )
          }
          if (section?.__typename === 'ComponentSectionsContactGroup') {
            return section && <ContactsSection index={index} {...section} />
          }
          if (section?.__typename === 'ComponentSectionsDocumentGroup') {
            return (
              <Section
                index={index}
                key={`${section.__typename}-${section.id}`}
                title={section.title}
              >
                <DocumentGroup {...section} />
              </Section>
            )
          }
          if (section?.__typename === 'ComponentSectionsPartnersSection') {
            return (
              <PartnersSection
                index={index}
                key={`${section.__typename}-${section.id}`}
                featuredTitle={section.featuredPartnersTitle}
                otherTitle={section.otherPartnersTitle}
              />
            )
          }
          if (section?.__typename === 'ComponentSectionsGallery') {
            return (
              <ImageGallerySection
                index={index}
                key={`${section.__typename}-${section.id}`}
                title={section.title}
                images={section.medias?.data}
                variant="bellow"
              />
            )
          }
          if (section?.__typename === 'ComponentSectionsMenuListing') {
            return (
              <MenuListingSection
                index={index}
                key={`${section.__typename}-${section.id}`}
                title={section.title}
                slug={section.slug}
                navigation={navigation}
              />
            )
          }
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
          return null
        })}
      </SectionsWrapper>
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
      general: general?.data ?? null,
      page: pages.data[0],
      ...translations,
    },
    revalidate: 10,
  }
}

export default Slug
