import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { SSRConfig, useTranslation } from 'next-i18next'
import { ParsedUrlQuery } from 'node:querystring'

import NavigateToIcon from '../../assets/directions.svg'
import PlaceIcon from '../../assets/place.svg'
import Button from '../../components/atoms/Button'
import RichText from '../../components/atoms/RichText/RichText'
import BranchCemeteryLayout from '../../components/layouts/BranchCemeteryLayout'
import {
  generateStaticPaths,
  generateStaticProps,
} from '../../components/molecules/Navigation/NavigationProvider/generateStaticPathsAndProps'
import SectionBoxed from '../../components/molecules/SectionBoxed'
import Seo from '../../components/molecules/Seo'
import {
  CemeteryEntityFragment,
  GeneralEntityFragment,
  NavigationItemFragment,
} from '../../graphql'
import { client } from '../../utils/gql'

type CemeteryPageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  entity: CemeteryEntityFragment
} & SSRConfig

const CemeteryPage = ({ navigation, entity, general }: CemeteryPageProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'BranchCemeteryPage' })

  const { seo, title, address, navigateToLink, description } = entity.attributes ?? {}

  return (
    <>
      <Seo seo={seo} title={title} />
      <Head>
        <title>{title}</title>
      </Head>

      <BranchCemeteryLayout entity={entity} navigation={navigation} general={general}>
        <div className="flex flex-col gap-3 md:gap-4">
          <SectionBoxed>
            <h1 className="pb-1 md:pb-3">{title}</h1>
            <div className="flex flex-col items-start gap-2 md:flex-row">
              {address && (
                <div className="flex items-center gap-x-2">
                  <span className="text-primary">
                    <PlaceIcon />
                  </span>
                  {address}
                </div>
              )}
              {navigateToLink && (
                <Button
                  href={navigateToLink}
                  target="_blank"
                  variant="plain-secondary"
                  startIcon={<NavigateToIcon />}
                  className="-ml-2 md:ml-0"
                >
                  {t('navigate')}
                </Button>
              )}
            </div>
          </SectionBoxed>
          {description && (
            <SectionBoxed title={t('aboutCemetery')}>
              <RichText content={description} coloredTable={false} />
            </SectionBoxed>
          )}
          <SectionBoxed title={t('openingHours')}>
            <RichText content={general?.attributes?.generalOpeningHours} />
          </SectionBoxed>
        </div>
      </BranchCemeteryLayout>
    </>
  )
}

interface StaticParams extends ParsedUrlQuery {
  fullPath: string[]
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // TODO: Locales
  const paths = await generateStaticPaths('sk', (locale) =>
    client.BranchesStaticPaths({ locale }).then((response) => response.branches?.data),
  )

  // eslint-disable-next-line no-console
  console.log(`Branches: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<CemeteryPageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating cemetery ${params?.fullPath.join('/') ?? ''}`)

  return (
    // TODO: Locales
    generateStaticProps({
      locale,
      params,
      entityPromiseGetter: ({ locale: localeInner, slug }) =>
        client
          .CemeteryBySlug({ locale: localeInner, slug })
          .then((response) => response.cemeteries?.data[0]),
    })
  )
}

export default CemeteryPage