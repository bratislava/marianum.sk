import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import TickListItem from '../../components/atoms/TickListItem'
import BundleLayout from '../../components/layouts/BundleLayout'
import AccordionGroup from '../../components/molecules/Accordion/AccordionGroup'
import AccordionItem from '../../components/molecules/Accordion/AccordionItem'
import Section from '../../components/molecules/Section'
import { BundleEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import { client } from '../../utils/gql'
import { isDefined } from '../../utils/isDefined'

type BundlePageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  bundle: BundleEntityFragment
} & SSRConfig

const PackagePage = ({ navigation, bundle, general }: BundlePageProps) => {
  const { t } = useTranslation()
  const { additionalServices, packageContent: bundleContent } = bundle.attributes ?? {}

  return (
    <BundleLayout navigation={navigation} general={general} bundle={bundle}>
      <div className="flex flex-col gap-8">
        {/* todo: display bundle data */}
        {bundleContent?.length ? (
          <Section>
            <h3 className="pb-6 text-h4">{t('sections.HeroSection.bundleContent')}</h3>
            {bundleContent.map((item) => (
              <TickListItem>{item?.description}</TickListItem>
            ))}
          </Section>
        ) : null}

        {additionalServices?.length ? (
          <Section>
            <h3 className="pb-4 text-h4">{t('sections.HeroSection.additionalServices')}</h3>
            <AccordionGroup>
              {additionalServices.map((service) => (
                <AccordionItem
                  key={service?.id}
                  title={service?.title}
                  additionalInfo={
                    <div>
                      {t('sections.HeroSection.priceFrom')}{' '}
                      <span className="font-bold">{service?.price}</span>
                    </div>
                  }
                >
                  {service?.content}
                </AccordionItem>
              ))}
            </AccordionGroup>
          </Section>
        ) : null}
      </div>
    </BundleLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['sk', 'en'] }) => {
  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.BundlesStaticPaths({ locale })),
  )
  const bundles = pathArraysForLocales
    .flatMap(({ bundles: allBundles }) => allBundles?.data || [])
    .filter(isDefined)
  if (bundles.length > 0) {
    const paths = bundles
      .filter((bundle) => bundle.attributes?.slug)
      .map((bundle) => ({
        params: {
          slug: bundle?.attributes?.slug ? bundle.attributes?.slug.split('/') : [],
          locale: bundle?.attributes?.locale || '',
        },
      }))
    // eslint-disable-next-line no-console
    console.log(`Bundles: generated static paths for ${paths.length} slugs.`)
    return { paths, fallback: 'blocking' }
  }
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
  params,
}): Promise<GetStaticPropsResult<BundlePageProps>> => {
  const slug = last(params?.slug) ?? ''

  const [{ navigation, general }, { bundles }, translations] = await Promise.all([
    client.General({ locale }),
    client.BundleBySlug({ locale, slug }),
    serverSideTranslations(locale, ['common']),
  ])

  const filteredNavigation = navigation.filter(Boolean) as NavigationItemFragment[]

  if (!bundles || bundles.data.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      navigation: filteredNavigation,
      general: general?.data ?? null,
      bundle: bundles.data[0],
      ...translations,
    },
    revalidate: 10,
  }
}

export default PackagePage
