import { Option } from '@/components/atoms/Select'
import { client } from '@/services/graphql/gqlClient'
import { meiliClient } from '@/services/meili/meiliClient'
import { ArticleMeili } from '@/services/meili/meiliTypes'
import { SearchIndexWrapped, unwrapFromSearchIndex } from '@/services/meili/searchIndexWrapped'
import { getMeilisearchPageOptions } from '@/utils/getMeilisearchPageOptions'
import { isDefined } from '@/utils/isDefined'

// Each article type is a separate collection in Strapi, so here we list them manually
export enum ArticleType {
  News,
  Press,
  Jobs,
}

export type ArticlesFilters = {
  pageSize: number
  search: string
  categoryId: string | null
  page: number
}

export const articlesDefaultFilters: ArticlesFilters = {
  pageSize: 24,
  search: '',
  categoryId: null,
  page: 1,
}

export const getMeiliArticlesQueryKey = (
  filters: ArticlesFilters,
  type: 'all' | ArticleType,
  locale?: string,
) => ['Articles', filters, type, locale]

export const meiliArticlesFetcher = (
  filters: ArticlesFilters,
  type: 'all' | ArticleType,
  locale?: string,
) => {
  let sectionFilter: string | null = null

  switch (type) {
    case ArticleType.Press:
      sectionFilter = filters.categoryId
        ? `article.pressCategory.id = ${filters.categoryId}`
        : 'article.pressCategory.id EXISTS'
      break

    case ArticleType.News:
      sectionFilter = filters.categoryId
        ? `article.newsCategory.id = ${filters.categoryId}`
        : 'article.newsCategory.id EXISTS'
      break

    case ArticleType.Jobs:
      sectionFilter = filters.categoryId
        ? `article.jobsCategory.id = ${filters.categoryId}`
        : 'article.jobsCategory.id EXISTS'
      break

    default:
      break
  }

  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'article', ArticleMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: ['type = "article"', sectionFilter, locale ? `locale = ${locale}` : null].filter(
        isDefined,
      ),
      sort: ['article.publishedAtTimestamp:desc'],
    })
    .then(unwrapFromSearchIndex('article'))
}

const mapSelectFn = (category: {
  attributes?: { title?: string | null } | null
  id?: string | null
}) => {
  return {
    label: category.attributes?.title,
    key: category.id,
  } as Option
}

export const articleNewsCategoriesSelectQueryKey = ['ArticleNewsCategoriesSelect']
export const articleNewsCategoriesSelectFetcher = () =>
  client
    .ArticleNewsCategories()
    .then((data) => data.articleNewsCategories?.data.map(mapSelectFn) ?? [])

export const articlePressCategoriesSelectQueryKey = ['ArticlePressCategoriesSelect']
export const articlePressCategoriesSelectFetcher = () =>
  client
    .ArticlePressCategories()
    .then((data) => data.articlePressCategories?.data.map(mapSelectFn) ?? [])

export const articleJobsCategoriesSelectQueryKey = ['ArticleJobsCategoriesSelect']
export const articleJobsCategoriesSelectFetcher = () =>
  client
    .ArticleJobsCategories()
    .then((data) => data.articleJobsCategories?.data.map(mapSelectFn) ?? [])

export const getArticleListingNewsPrefetches = (locale: string) => {
  const argsNews = [articlesDefaultFilters, ArticleType.News, locale] as const
  const argsPress = [articlesDefaultFilters, ArticleType.Press, locale] as const
  const argsJobs = [articlesDefaultFilters, ArticleType.Jobs, locale] as const

  return [
    {
      sectionTypename: 'ComponentSectionsArticleNewsListing',
      key: getMeiliArticlesQueryKey(...argsNews),
      fetcher: meiliArticlesFetcher(...argsNews),
    } as const,
    {
      sectionTypename: 'ComponentSectionsArticleNewsListing',
      key: articleNewsCategoriesSelectQueryKey,
      fetcher: articleNewsCategoriesSelectFetcher,
    } as const,
    {
      sectionTypename: 'ComponentSectionsArticlePressListing',
      key: getMeiliArticlesQueryKey(...argsPress),
      fetcher: meiliArticlesFetcher(...argsPress),
    } as const,
    {
      sectionTypename: 'ComponentSectionsArticlePressListing',
      key: articlePressCategoriesSelectQueryKey,
      fetcher: articlePressCategoriesSelectFetcher,
    } as const,
    {
      sectionTypename: 'ComponentSectionsArticleJobsListing',
      key: getMeiliArticlesQueryKey(...argsJobs),
      fetcher: meiliArticlesFetcher(...argsJobs),
    } as const,
    {
      sectionTypename: 'ComponentSectionsArticleJobsListing',
      key: articleJobsCategoriesSelectQueryKey,
      fetcher: articleJobsCategoriesSelectFetcher,
    } as const,
  ]
}
