import { Key } from 'swr'

import { SelectOption } from '@/components/atoms/Select'
import { client } from '@/services/graphql/gqlClient'
import { meiliClient } from '@/services/meili/meiliClient'
import { ArticleMeili } from '@/services/meili/meiliTypes'
import { SearchIndexWrapped, unwrapFromSearchIndex } from '@/services/meili/searchIndexWrapped'
import { getMeilisearchPageOptions } from '@/utils/getMeilisearchPageOptions'
import { isDefined } from '@/utils/isDefined'

export enum ArticleListingType {
  News,
  Press,
  Jobs,
}

export type ArticleListingFilters = {
  pageSize: number
  search: string
  categoryId: string | null
  page: number
}

export const articleListingDefaultFilters: ArticleListingFilters = {
  pageSize: 24,
  search: '',
  categoryId: null,
  page: 1,
}

export const getArticleListingSwrKey = (
  filters: ArticleListingFilters,
  type: ArticleListingType,
  locale?: string,
) => ['ArticleListing', filters, type, locale] as Key

export const getArticleListingFetcher =
  (filters: ArticleListingFilters, type: ArticleListingType, locale?: string) => () => {
    let sectionFilter: string | null = null

    // eslint-disable-next-line default-case
    switch (type) {
      case ArticleListingType.Press:
        sectionFilter = filters.categoryId
          ? `article.pressCategory.id = ${filters.categoryId}`
          : 'article.pressCategory.id EXISTS'
        break

      case ArticleListingType.News:
        sectionFilter = filters.categoryId
          ? `article.newsCategory.id = ${filters.categoryId}`
          : 'article.newsCategory.id EXISTS'
        break

      case ArticleListingType.Jobs:
        sectionFilter = filters.categoryId
          ? `article.jobsCategory.id = ${filters.categoryId}`
          : 'article.jobsCategory.id EXISTS'
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
}) =>
  ({
    value: category.id,
    label: category.attributes?.title,
  }) as SelectOption

export const articleNewsCategoriesSelectSwrKey = 'ArticleNewsCategoriesSelect'
export const articleNewsCategoriesSelectFetcher = () =>
  client
    .ArticleNewsCategories()
    .then((data) => data.articleNewsCategories?.data.map(mapSelectFn) ?? [])

export const articlePressCategoriesSelectSwrKey = 'ArticlePressCategoriesSelect'
export const articlePressCategoriesSelectFetcher = () =>
  client
    .ArticlePressCategories()
    .then((data) => data.articlePressCategories?.data.map(mapSelectFn) ?? [])

export const articleJobsCategoriesSelectSwrKey = 'ArticleJobsCategoriesSelect'
export const articleJobsCategoriesSelectFetcher = () =>
  client
    .ArticleJobsCategories()
    .then((data) => data.articleJobsCategories?.data.map(mapSelectFn) ?? [])

export const getArticleListingNewsPrefetches = (locale: string) => {
  const argsNews = [articleListingDefaultFilters, ArticleListingType.News, locale] as const
  const argsPress = [articleListingDefaultFilters, ArticleListingType.Press, locale] as const
  const argsJobs = [articleListingDefaultFilters, ArticleListingType.Jobs, locale] as const

  return [
    {
      sectionTypename: 'ComponentSectionsArticleNewsListing',
      key: getArticleListingSwrKey(...argsNews),
      fetcher: getArticleListingFetcher(...argsNews),
    } as const,
    {
      sectionTypename: 'ComponentSectionsArticleNewsListing',
      key: articleNewsCategoriesSelectSwrKey,
      fetcher: articleNewsCategoriesSelectFetcher,
    } as const,
    {
      sectionTypename: 'ComponentSectionsArticlePressListing',
      key: getArticleListingSwrKey(...argsPress),
      fetcher: getArticleListingFetcher(...argsPress),
    } as const,
    {
      sectionTypename: 'ComponentSectionsArticlePressListing',
      key: articlePressCategoriesSelectSwrKey,
      fetcher: articlePressCategoriesSelectFetcher,
    } as const,
    {
      sectionTypename: 'ComponentSectionsArticleJobsListing',
      key: getArticleListingSwrKey(...argsJobs),
      fetcher: getArticleListingFetcher(...argsJobs),
    } as const,
    {
      sectionTypename: 'ComponentSectionsArticleJobsListing',
      key: articleJobsCategoriesSelectSwrKey,
      fetcher: articleJobsCategoriesSelectFetcher,
    } as const,
  ]
}
