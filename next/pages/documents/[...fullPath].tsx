import { DocumentEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '@graphql'
import { client } from '@services/gqlClient'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { SSRConfig } from 'next-i18next'
import { ParsedUrlQuery } from 'node:querystring'

import DocumentLayout from '../../components/layouts/DocumentLayout'
import {
  generateStaticPaths,
  generateStaticProps,
} from '../../components/molecules/Navigation/NavigationProvider/generateStaticPathsAndProps'
import Seo from '../../components/molecules/Seo'

type DocumentPageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  entity: DocumentEntityFragment
} & SSRConfig

const DocumentPage = ({ navigation, entity, general }: DocumentPageProps) => {
  const { seo, title, description } = entity.attributes ?? {}

  return (
    <>
      <Seo seo={seo} title={title} description={description} />
      <Head>
        <title>{title}</title>
      </Head>

      <DocumentLayout document={entity} navigation={navigation} general={general} />
    </>
  )
}

interface StaticParams extends ParsedUrlQuery {
  fullPath: string[]
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // TODO: Locales
  const paths = await generateStaticPaths('sk', () =>
    client.DocumentsStaticPaths().then((response) => response.documents?.data),
  )

  // eslint-disable-next-line no-console
  console.log(`Documents: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<DocumentPageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating document ${params?.fullPath.join('/') ?? ''}`)

  return (
    // TODO: Locales
    generateStaticProps({
      locale,
      params,
      entityPromiseGetter: ({ slug }) =>
        client.DocumentBySlug({ slug }).then((response) => response.documents?.data[0]),
    })
  )
}

export default DocumentPage
