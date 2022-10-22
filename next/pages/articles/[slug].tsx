import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { SSRConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'node:querystring'

import RichText from '../../components/atoms/RichText/RichText'
import ArticleLayout from '../../components/layouts/ArticleLayout'
import ImageGallery from '../../components/sections/ImageGallery'
import { ArticleEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '../../graphql'
import { client } from '../../utils/gql'
import { isDefined } from '../../utils/isDefined'

type ArticlePageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  article: ArticleEntityFragment
} & SSRConfig

const ArticlePage = ({ navigation, article, general }: ArticlePageProps) => {
  const medias = article.attributes?.mediaGallery?.data.filter(isDefined)

  return (
    <ArticleLayout article={article} navigation={navigation} general={general}>
      <RichText content={article.attributes?.content} />
      {medias?.length ? (
        <div className="mt-4 md:mt-6">
          <ImageGallery images={medias} />
        </div>
      ) : null}
    </ArticleLayout>
  )
}

interface StaticParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async ({ locales = ['sk', 'en'] }) => {
  const pathArraysForLocales = await Promise.all(
    locales.map((locale) => client.ArticlesStaticPaths({ locale })),
  )

  const articles = pathArraysForLocales
    .flatMap(({ articles: allArticles }) => allArticles?.data || [])
    .filter(isDefined)

  const paths = articles
    .map(
      (article) =>
        article.attributes && {
          params: {
            // TODO use proper full slug
            slug: article?.attributes.slug,
            locale: article?.attributes.locale || '',
          },
        },
    )
    .filter(isDefined)

  // eslint-disable-next-line no-console
  console.log(`Articles: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<ArticlePageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}): Promise<GetStaticPropsResult<ArticlePageProps>> => {
  const slug = params?.slug ?? ''

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
