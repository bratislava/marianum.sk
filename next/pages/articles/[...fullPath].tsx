import { ParsedUrlQuery } from 'node:querystring'

import { GetStaticPaths, GetStaticProps } from 'next'
import { SSRConfig } from 'next-i18next/pages'

import RichText from '@/components/atoms/RichText'
import Seo from '@/components/atoms/Seo'
import ArticleLayout from '@/components/layouts/ArticleLayout'
import ImageGallery from '@/components/molecules/ImageGallery'
import { ArticleEntityFragment, GeneralEntityFragment } from '@/graphql'
import { client } from '@/services/graphql/gqlClient'
import {
  generateStaticPaths,
  generateStaticProps,
} from '@/services/navigation/generateStaticPathsAndProps'
import { NavigationPageProps } from '@/services/navigation/typesNavigation'
import { isDefined } from '@/utils/isDefined'

type ArticlePageProps = {
  general: GeneralEntityFragment | null
  entity: ArticleEntityFragment
} & SSRConfig &
  NavigationPageProps

const ArticlePage = ({ entity, general }: ArticlePageProps) => {
  const medias = entity.mediaGallery.filter(isDefined)
  const { seo, title, perex, coverMedia } = entity

  return (
    <>
      <Seo seo={seo} title={title} description={perex} image={coverMedia} entity={entity} />

      <ArticleLayout article={entity} general={general}>
        <RichText content={entity.content} />
        {medias.length ? (
          <div className="mt-4 md:mt-6">
            <ImageGallery images={medias} />
          </div>
        ) : null}
      </ArticleLayout>
    </>
  )
}

interface StaticParams extends ParsedUrlQuery {
  fullPath: string[]
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // TODO: Locales
  const paths = await generateStaticPaths('sk', async (locale) =>
    client.ArticlesStaticPaths({ locale }).then((response) => response.articles),
  )

  // eslint-disable-next-line no-console
  console.log(`Articles: Generated static paths for ${paths.length} slugs.`)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<ArticlePageProps, StaticParams> = async ({
  locale = 'sk',
  params,
}) => {
  // eslint-disable-next-line no-console
  console.log(`Revalidating article ${params?.fullPath.join('/') ?? ''}`)

  return (
    // TODO: Locales
    generateStaticProps({
      locale,
      params,
      entityPromiseGetter: async ({ locale: localeInner, slug }) =>
        client
          .ArticleBySlug({ locale: localeInner, slug })
          .then((response) => response.articles[0]),
    })
  )
}

export default ArticlePage
