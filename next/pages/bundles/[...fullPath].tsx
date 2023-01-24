import { CheckNoPaddingIcon } from '@assets/icons'
import FormatCurrency from '@components/atoms/FormatCurrency'
import RichText from '@components/atoms/RichText'
import Seo from '@components/atoms/Seo'
import BundleLayout from '@components/layouts/BundleLayout'
import AccordionGroup from '@components/molecules/Accordion/AccordionGroup'
import AccordionItem from '@components/molecules/Accordion/AccordionItem'
import DocumentGroup from '@components/molecules/DocumentGroup'
import {
  generateStaticPaths,
  generateStaticProps,
} from '@components/molecules/Navigation/NavigationProvider/generateStaticPathsAndProps'
import Section from '@components/molecules/Section'
import { BundleEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '@graphql'
import { client } from '@services/graphql/gqlClient'
import { isDefined } from '@utils/isDefined'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { SSRConfig, useTranslation } from 'next-i18next'
import { ParsedUrlQuery } from 'node:querystring'

type BundlePageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  entity: BundleEntityFragment
} & SSRConfig

const BundlePage: NextPage<BundlePageProps> = ({ navigation, entity, general }) => {
  const { t } = useTranslation('common', { keyPrefix: 'BundlePage' })
  const {
    seo,
    title,
    perex,
    discountText,
    additionalServices,
    bundleItems,
    additionalItems,
    description,
    documents,
    coverMedia,
  } = entity.attributes ?? {}

  const claims = [...(bundleItems ?? []), ...(additionalItems ?? [])].filter(isDefined)

  return (
    <>
      <Seo seo={seo} title={title} description={perex} image={coverMedia?.data} />

      <BundleLayout navigation={navigation} general={general} bundle={entity}>
        <div className="flex flex-col">
          {/* todo: display bundle data */}
          {claims?.length ? (
            <Section>
              <h2 className="pb-6 text-h3">{t('bundleContent')}</h2>
              <ul>
                {claims.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index} className="mt-4 flex gap-4">
                    <span className="mt-1.5 text-primary">
                      <CheckNoPaddingIcon className="scale-125" />
                    </span>
                    {item?.description}
                  </li>
                ))}
              </ul>

              {discountText && (
                <div className="mt-8 w-fit rounded-2xl bg-primary/12 py-1.5 px-3 text-sm font-semibold leading-4 text-primary">
                  {discountText}
                </div>
              )}
            </Section>
          ) : null}

          {description ? (
            <Section>
              <RichText content={description} />
            </Section>
          ) : null}

          {additionalServices?.length ? (
            <Section>
              <h3 className="pb-4">{t('additionalServices')}</h3>
              <AccordionGroup>
                {additionalServices.map((service) => (
                  <AccordionItem
                    key={service?.id}
                    title={service?.title}
                    additionalInfo={
                      service?.price ? (
                        <div>
                          {t('priceFrom')}{' '}
                          <span className="font-bold">
                            <FormatCurrency value={service.price} />
                          </span>
                        </div>
                      ) : null
                    }
                  >
                    <RichText content={service?.description} />
                  </AccordionItem>
                ))}
              </AccordionGroup>
            </Section>
          ) : null}
          {documents && (
            <Section>
              {documents.title && <h2 className="pb-6 text-h3">{documents.title}</h2>}
              <DocumentGroup {...documents} />
            </Section>
          )}
        </div>
      </BundleLayout>
    </>
  )
}

interface StaticParams extends ParsedUrlQuery {
  fullPath: string[]
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const paths = await generateStaticPaths('sk', (locale) =>
    client.BundlesStaticPaths({ locale }).then((response) => response.bundles?.data),
  )

  // eslint-disable-next-line no-console, @typescript-eslint/restrict-template-expressions
  console.log(`Bundles: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<BundlePageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating bundle ${params?.fullPath.join('/') ?? ''}`)

  return generateStaticProps({
    locale,
    params,
    entityPromiseGetter: ({ locale: localeInner, slug }) =>
      client
        .BundleBySlug({ locale: localeInner, slug })
        .then((response) => response.bundles?.data[0]),
  })
}

export default BundlePage
