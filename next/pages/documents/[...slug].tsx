import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import DocumentLayout from '../../components/layouts/DocumentLayout'
import {
  DocumentEntityFragment,
  GeneralEntityFragment,
  NavigationItemFragment,
} from '../../graphql'
import { client } from '../../utils/gql'
import { isDefined } from '../../utils/isDefined'

type DocumentPageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  document: DocumentEntityFragment
} & SSRConfig

const DocumentPage = ({ navigation, document, general }: DocumentPageProps) => {
  return <DocumentLayout document={document} navigation={navigation} general={general} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { documents } = await client.DocumentsStaticPaths()
  const filteredDocuments = documents?.data.filter(isDefined) ?? []
  if (filteredDocuments.length > 0) {
    const paths = filteredDocuments
      .filter((document) => document.attributes?.slug)
      .map((document) => ({
        params: {
          slug: document?.attributes?.slug ? document.attributes?.slug.split('/') : [],
        },
      }))
    // eslint-disable-next-line no-console
    console.log(`Documents: Generated static paths for ${paths.length} slugs.`)
    return { paths, fallback: 'blocking' }
  }
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
  params,
}): Promise<GetStaticPropsResult<DocumentPageProps>> => {
  const slug = last(params?.slug) ?? ''

  const [{ navigation, general }, { documents }, translations] = await Promise.all([
    client.General({ locale }),
    client.DocumentBySlug({ slug }),
    serverSideTranslations(locale, ['common']),
  ])

  const filteredNavigation = navigation.filter(isDefined)

  if (!documents || documents.data.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      navigation: filteredNavigation,
      general: general?.data ?? null,
      document: documents.data[0],
      ...translations,
    },
    revalidate: 10,
  }
}

export default DocumentPage
