import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CheckIcon from '../../assets/check.svg'
import FormatCurrency from '../../components/atoms/FormatCurrency'
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

const BundlePage = ({ navigation, bundle, general }: BundlePageProps) => {
  const { t } = useTranslation()
  const { additionalServices, bundleContent } = bundle.attributes ?? {}

  return (
    <BundleLayout navigation={navigation} general={general} bundle={bundle}>
      <div className="flex flex-col gap-8">
        {/* todo: display bundle data */}
        {bundleContent?.length ? (
          <Section>
            <h3 className="pb-6 text-h4">{t('sections.HeroSection.bundleContent')}</h3>
            <ul>
              {bundleContent.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index} className="mt-4 flex gap-4">
                  <span className="mt-1.5 text-primary">
                    <CheckIcon className="scale-125" />
                  </span>
                  {item?.description}
                </li>
              ))}
            </ul>
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
                    service?.price ? (
                      <div>
                        {t('sections.HeroSection.priceFrom')}{' '}
                        <span className="font-bold">
                          <FormatCurrency value={service.price} />
                        </span>
                      </div>
                    ) : null
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
    console.log(`Bundles: Generated static paths for ${paths.length} slugs.`)
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

export default BundlePage
