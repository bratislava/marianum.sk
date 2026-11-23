import { ParsedUrlQuery } from 'node:querystring'

import { GetStaticPaths, GetStaticProps } from 'next'
import { SSRConfig } from 'next-i18next/pages'

import Seo from '@/components/atoms/Seo'
import AssetLayout from '@/components/layouts/AssetLayout'
import { AssetEntityFragment, GeneralEntityFragment } from '@/graphql'
import { client } from '@/services/graphql/gqlClient'
import {
  generateStaticPaths,
  generateStaticProps,
} from '@/services/navigation/generateStaticPathsAndProps'
import { NavigationPageProps } from '@/services/navigation/typesNavigation'

type AssetPageProps = {
  general: GeneralEntityFragment | null
  entity: AssetEntityFragment
} & SSRConfig &
  NavigationPageProps

const AssetPage = ({ entity, general }: AssetPageProps) => {
  const { seo, title, description } = entity.attributes ?? {}

  return (
    <>
      <Seo seo={seo} title={title} description={description} entity={entity} />

      <AssetLayout asset={entity} general={general} />
    </>
  )
}

interface StaticParams extends ParsedUrlQuery {
  fullPath: string[]
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // TODO: Locales
  const paths = await generateStaticPaths('sk', async () =>
    client.AssetsStaticPaths().then((response) => response.assets?.data),
  )

  // eslint-disable-next-line no-console
  console.log(`Assets: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<AssetPageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating Asset ${params?.fullPath.join('/') ?? ''}`)

  return (
    // TODO: Locales
    generateStaticProps({
      locale,
      params,
      entityPromiseGetter: async ({ slug }) =>
        client.AssetBySlug({ slug }).then((response) => response.assets?.data[0]),
    })
  )
}

export default AssetPage
