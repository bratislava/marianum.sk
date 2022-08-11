import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import { NavigationItemFragment, Page } from '../graphql'
import { client } from '../utils/gql'
import { isDefined } from '../utils/isDefined'

type PageProps = {
  navigation: NavigationItemFragment[]
  page: Page
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Slug = ({ navigation, page }: PageProps) => {
  const router = useRouter()

  console.log(router, page)

  return <div>{router.asPath}</div>
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
    console.log(`GENERATED STATIC PATHS FOR ${paths.length} SLUGS`)
    return { paths, fallback: 'blocking' }
  }
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale = 'sk', params }) => {
  const slug = last(params?.slug) ?? ''

  const [{ navigation }, { pages }, translations] = await Promise.all([
    client.Navigation({ locale }),
    client.PageBySlug({ locale, slug }),
    serverSideTranslations(locale, ['common']) as any,
  ])

  if (!pages || pages.data.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      navigation,
      page: pages.data[0],
      ...translations,
    },
    revalidate: 10,
  }
}

export default Slug
