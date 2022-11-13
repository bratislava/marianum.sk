import { ArticleEntityFragment, GeneralEntityFragment, NavigationItemFragment } from '@graphql'
import { client } from '@services/gqlClient'
import { isDefined } from '@utils/isDefined'
import { GetStaticPaths, GetStaticProps } from 'next'
import { SSRConfig } from 'next-i18next'
import { ParsedUrlQuery } from 'node:querystring'

import RichText from '../../components/atoms/RichText/RichText'
import ArticleLayout from '../../components/layouts/ArticleLayout'
import {
  generateStaticPaths,
  generateStaticProps,
} from '../../components/molecules/Navigation/NavigationProvider/generateStaticPathsAndProps'
import ImageGallery from '../../components/sections/ImageGallery'

type ArticlePageProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null
  entity: ArticleEntityFragment
} & SSRConfig

const ArticlePage = ({ navigation, entity, general }: ArticlePageProps) => {
  const medias = entity.attributes?.mediaGallery?.data.filter(isDefined)

  return (
    <ArticleLayout article={entity} navigation={navigation} general={general}>
      <RichText content={entity.attributes?.content} />
      {medias?.length ? (
        <div className="mt-4 md:mt-6">
          <ImageGallery images={medias} />
        </div>
      ) : null}
    </ArticleLayout>
  )
}

interface StaticParams extends ParsedUrlQuery {
  fullPath: string[]
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  // TODO: Locales
  const paths = await generateStaticPaths('sk', (locale) =>
    client.ArticlesStaticPaths({ locale }).then((response) => response.articles?.data),
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
      entityPromiseGetter: ({ locale: localeInner, slug }) =>
        client
          .ArticleBySlug({ locale: localeInner, slug })
          .then((response) => response.articles?.data[0]),
    })
  )
}

export default ArticlePage
