import last from 'lodash/last'
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ArticleLayout from '../../components/layouts/ArticleLayout'
import RichTextSection from '../../components/sections/RichTextSection'
import { ArticleEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import { client } from '../../utils/gql'
import { isDefined } from '../../utils/isDefined'

type ArticlePageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  article: ArticleEntityFragment
} & SSRConfig

const ArticlePage = ({ navigation, article, general }: ArticlePageProps) => {
  return (
    <ArticleLayout article={article} navigation={navigation} general={general}>
      <div className="gap-y-6 sm:gap-y-8">
        {/* TODO use Editor.js blocks */}
        <RichTextSection content={article.attributes?.content} />
      </div>
    </ArticleLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['sk', 'en'] }) => {
  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.ArticlesStaticPaths({ locale })),
  )
  const articles = pathArraysForLocales
    .flatMap(({ articles: allArticles }) => allArticles?.data || [])
    .filter(isDefined)
  if (articles.length > 0) {
    const paths = articles
      .filter((article) => article.attributes?.slug)
      .map((article) => ({
        params: {
          slug: article?.attributes?.slug ? article.attributes?.slug.split('/') : [],
          locale: article?.attributes?.locale || '',
        },
      }))
    // eslint-disable-next-line no-console
    console.log(`Articles: Generated static paths for ${paths.length} slugs.`)
    return { paths, fallback: 'blocking' }
  }
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({
  locale = 'sk',
  params,
}): Promise<GetStaticPropsResult<ArticlePageProps>> => {
  const slug = last(params?.slug) ?? ''

  const [{ navigation, general }, { articles }, translations] = await Promise.all([
    client.General({ locale }),
    client.ArticleBySlug({ locale, slug }),
    serverSideTranslations(locale, ['common']),
  ])

  const filteredNavigation = navigation.filter(isDefined)

  if (!articles || articles.data.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      navigation: filteredNavigation,
      general: general?.data ?? null,
      article: articles.data[0],
      ...translations,
    },
    revalidate: 10,
  }
}

export default ArticlePage
