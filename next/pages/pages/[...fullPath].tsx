import { ParsedUrlQuery } from 'node:querystring'

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query'
import { GetStaticPaths, GetStaticProps } from 'next'
import { SSRConfig } from 'next-i18next'

import Divider from '@/components/atoms/Divider'
import Seo from '@/components/atoms/Seo'
import PageLayout from '@/components/layouts/PageLayout'
import SectionsWrapper from '@/components/layouts/SectionsWrapper'
import BranchGroup from '@/components/molecules/BranchGroup'
import DocumentGroup from '@/components/molecules/DocumentGroup'
import ImageGallery from '@/components/molecules/ImageGallery'
import {
  generateStaticPaths,
  generateStaticProps,
} from '@/components/molecules/Navigation/NavigationProvider/generateStaticPathsAndProps'
import NavigationProvider from '@/components/molecules/Navigation/NavigationProvider/NavigationProvider'
import ProcedureTabs from '@/components/molecules/ProcedureTabs'
import Section from '@/components/molecules/Section'
import AccordionGroupSection from '@/components/sections/AccordionGroupSection'
import ArticleListing from '@/components/sections/ArticleListing/ArticleListing'
import BundleListingSection from '@/components/sections/BundleListingSection'
import BundleListingSimpleSection from '@/components/sections/BundleListingSimpleSection'
import CardSection from '@/components/sections/CardSection'
import CemeteriesOpeningHoursSection from '@/components/sections/CemeteriesOpeningHoursSection'
import CeremoniesArchiveSection from '@/components/sections/CeremoniesArchiveSection'
import CeremoniesSection from '@/components/sections/CeremoniesSection'
import ContactsSection from '@/components/sections/ContactsSection'
import DebtorsSection from '@/components/sections/DebtorsSection'
import DisclosuresSection from '@/components/sections/DisclosuresSection'
import DocumentsSection from '@/components/sections/DocumentsSection/DocumentsSection'
import IframeSection from '@/components/sections/IframeSection'
import MapOfManagedObjectsSection from '@/components/sections/MapOfManagedObjectsSection'
import MapSection from '@/components/sections/MapSection'
import MenuListingSection from '@/components/sections/MenuListingSection'
import NewsListing from '@/components/sections/NewsSection'
import OpeningHoursSection from '@/components/sections/OpeningHoursSection'
import ReviewListingSection from '@/components/sections/ReviewListingSection'
import RichTextSection from '@/components/sections/RichTextSection'
import {
  Enum_Page_Layout,
  GeneralEntityFragment,
  NavigationItemFragment,
  PageEntityFragment,
} from '@/graphql'
import { ArticleType } from '@/services/fetchers/articles/articlesFetcher'
import { client } from '@/services/graphql/gqlClient'
import { prefetchPageSections } from '@/utils/prefetchPageSections'

type PageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  entity: PageEntityFragment
  dehydratedState: DehydratedState
} & SSRConfig

const Slug = ({ navigation, entity, general, dehydratedState }: PageProps) => {
  const { seo, title, perex, layout, sections, coverMedia } = entity.attributes ?? {}

  const isContainer = layout === Enum_Page_Layout.Fullwidth

  return (
    <HydrationBoundary state={dehydratedState}>
      {/* TODO: Extract NavigationProvider from PageWrapper */}
      <NavigationProvider navigation={navigation} general={general}>
        <Seo seo={seo} title={title} description={perex} image={coverMedia?.data} entity={entity} />
      </NavigationProvider>

      <PageLayout page={entity} navigation={navigation} general={general}>
        <SectionsWrapper
          alternateBackground={isContainer}
          startBackground="light"
          className="gap-y-6 sm:gap-y-8"
        >
          {/* eslint-disable-next-line sonarjs/cognitive-complexity */}
          {sections?.map((section) => {
            if (section?.__typename === 'ComponentSectionsProceduresSection') {
              return (
                <Section key={`${section.__typename}-${section.id}`} title={section.title}>
                  <ProcedureTabs />
                </Section>
              )
            }
            if (section?.__typename === 'ComponentSectionsRichtext') {
              return (
                <RichTextSection key={`${section.__typename}-${section.id}`} section={section} />
              )
            }
            if (section?.__typename === 'ComponentSectionsAccordionGroup') {
              return (
                <AccordionGroupSection
                  key={`${section.__typename}-${section.id}`}
                  section={section}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsBranchGroup') {
              return (
                <Section key={`${section.__typename}-${section.id}`} title={section.title}>
                  <BranchGroup {...section} />
                </Section>
              )
            }
            if (section?.__typename === 'ComponentSectionsBundleListing') {
              return (
                <BundleListingSection
                  key={`${section.__typename}-${section.id}`}
                  section={section}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsBundleListingSimple') {
              return (
                <BundleListingSimpleSection
                  key={`${section.__typename}-${section.id}`}
                  section={section}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsContactGroup') {
              return <ContactsSection key={`${section.__typename}-${section.id}`} {...section} />
            }
            if (section?.__typename === 'ComponentSectionsDivider') {
              return (
                <Section key={`${section.__typename}-${section.id}`}>
                  <Divider color={section.color} />
                </Section>
              )
            }
            if (section?.__typename === 'ComponentSectionsDocumentGroup') {
              return (
                <Section
                  key={`${section.__typename}-${section.id}`}
                  title={section.title}
                  titleFontSize="h3"
                >
                  <DocumentGroup {...section} />
                </Section>
              )
            }
            if (section?.__typename === 'ComponentSectionsOpeningHoursSection') {
              return (
                <OpeningHoursSection
                  key={`${section.__typename}-${section.id}`}
                  section={section}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsCemeteriesOpeningHours') {
              return (
                <CemeteriesOpeningHoursSection
                  key={`${section.__typename}-${section.id}`}
                  section={section}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsGallery') {
              return (
                <Section key={`${section.__typename}-${section.id}`} title={section.title}>
                  <ImageGallery images={section.medias?.data} variant="below" />
                </Section>
              )
            }
            if (section?.__typename === 'ComponentSectionsMenuListing') {
              return (
                <MenuListingSection key={`${section.__typename}-${section.id}`} section={section} />
              )
            }
            if (section?.__typename === 'ComponentSectionsManualListing') {
              return <CardSection key={`${section.__typename}-${section.id}`} section={section} />
            }
            if (section?.__typename === 'ComponentSectionsNewsListing') {
              return <NewsListing key={`${section.__typename}-${section.id}`} section={section} />
            }
            if (section?.__typename === 'ComponentSectionsMapSection') {
              return <MapSection key={`${section.__typename}-${section.id}`} section={section} />
            }
            // eslint-disable-next-line no-secrets/no-secrets
            if (section?.__typename === 'ComponentSectionsMapOfManagedObjects') {
              return (
                <MapOfManagedObjectsSection
                  key={`${section.__typename}-${section.id}`}
                  section={section}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsDebtorsSection') {
              return (
                <DebtorsSection
                  key={`${section.__typename}-${section.id}`}
                  description={section.description}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsCeremoniesSection') {
              return (
                <CeremoniesSection key={`${section.__typename}-${section.id}`} section={section} />
              )
            }
            if (section?.__typename === 'ComponentSectionsCeremoniesArchiveSection') {
              return <CeremoniesArchiveSection key={`${section.__typename}-${section.id}`} />
            }
            if (section?.__typename === 'ComponentSectionsDocumentsSection') {
              return <DocumentsSection key={`${section.__typename}-${section.id}`} />
            }
            if (section?.__typename === 'ComponentSectionsArticleNewsListing') {
              return (
                <ArticleListing
                  key={`${section.__typename}-${section.id}`}
                  type={ArticleType.News}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsArticlePressListing') {
              return (
                <ArticleListing
                  key={`${section.__typename}-${section.id}`}
                  type={ArticleType.Press}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsArticleJobsListing') {
              return (
                <ArticleListing
                  key={`${section.__typename}-${section.id}`}
                  type={ArticleType.Jobs}
                />
              )
            }
            if (section?.__typename === 'ComponentSectionsReviewListing') {
              return <ReviewListingSection key={`${section.__typename}-${section.id}`} />
            }
            if (section?.__typename === 'ComponentSectionsDisclosuresSection') {
              return <DisclosuresSection key={`${section.__typename}-${section.id}`} />
            }
            if (section?.__typename === 'ComponentSectionsIframeSection') {
              return <IframeSection key={`${section.__typename}-${section.id}`} section={section} />
            }

            return null
          })}
        </SectionsWrapper>
      </PageLayout>
    </HydrationBoundary>
  )
}

interface StaticParams extends ParsedUrlQuery {
  fullPath: string[]
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // TODO: Locales
  const paths = await generateStaticPaths('sk', (locale) =>
    client.PagesStaticPaths({ locale }).then((response) => response.pages?.data),
  )

  // eslint-disable-next-line no-console
  console.log(`Pages: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating page ${params?.fullPath.join('/') ?? ''}`)

  return generateStaticProps({
    // TODO: Locales
    locale,
    params,
    entityPromiseGetter: ({ slug, locale: localeInner }) =>
      client.PageBySlug({ slug, locale: localeInner }).then((response) => response.pages?.data[0]),
    getAdditionalProps: async (page) => {
      const dehydratedState = await prefetchPageSections(page, locale)

      return {
        dehydratedState,
      }
    },
  })
}

export default Slug
