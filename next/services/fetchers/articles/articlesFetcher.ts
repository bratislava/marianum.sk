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
  categorySlug: string | null
  page: number
}

export const articlesDefaultFilters: ArticlesFilters = {
  pageSize: 24,
  search: '',
  categorySlug: null,
  page: 1,
}

export type ArticlesQueryParameters = {
  filters: ArticlesFilters
  type: 'all' | ArticleType
  locale?: string
}

export const getMeiliArticlesQueryKey = ({ filters, type, locale }: ArticlesQueryParameters) =>
  ['Articles', filters, type, locale].filter(isDefined)

export const meiliArticlesFetcher = async ({ filters, type, locale }: ArticlesQueryParameters) => {
  let sectionFilter: string | null = null

  switch (type) {
    case ArticleType.Press:
      sectionFilter = filters.categorySlug
        ? `article.pressCategory.slug = ${filters.categorySlug}`
        : 'article.pressCategory.slug EXISTS'
      break

    case ArticleType.News:
      sectionFilter = filters.categorySlug
        ? `article.newsCategory.slug = ${filters.categorySlug}`
        : 'article.newsCategory.slug EXISTS'
      break

    case ArticleType.Jobs:
      sectionFilter = filters.categorySlug
        ? `article.jobsCategory.slug = ${filters.categorySlug}`
        : 'article.jobsCategory.slug EXISTS'
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

export const getMeiliArticlesQuery = ({
  filters,
  type,
  locale,
}: Partial<ArticlesQueryParameters>) => {
  return {
    queryKey: getMeiliArticlesQueryKey({
      filters: filters ?? articlesDefaultFilters,
      type: type ?? 'all',
      locale,
    }),
    queryFn: async () =>
      meiliArticlesFetcher({
        filters: filters ?? articlesDefaultFilters,
        type: type ?? 'all',
        locale,
      }),
  } as const
}
