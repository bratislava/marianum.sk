import { client } from '@/services/graphql/gqlClient'
import { isDefined } from '@/utils/isDefined'

const mapSelectFn = (category: {
  attributes?: { title?: string | null } | null
  id?: string | null
}) => {
  return category.id && category.attributes
    ? {
        label: category.attributes?.title,
        key: category.id,
      }
    : null
}

// News
export const articleNewsCategoriesSelectQueryKey = ['ArticleNewsCategoriesSelect']
export const articleNewsCategoriesSelectFetcher = () =>
  client
    .ArticleNewsCategories()
    .then((data) => data.articleNewsCategories?.data.map(mapSelectFn).filter(isDefined) ?? [])

export const getArticleNewsCategoriesSelectQuery = () => {
  return {
    queryKey: articleNewsCategoriesSelectQueryKey,
    queryFn: () => articleNewsCategoriesSelectFetcher(),
  } as const
}

// Press
export const articlePressCategoriesSelectQueryKey = ['ArticlePressCategoriesSelect']
export const articlePressCategoriesSelectFetcher = () =>
  client
    .ArticlePressCategories()
    .then((data) => data.articlePressCategories?.data.map(mapSelectFn).filter(isDefined) ?? [])

export const getArticlePressCategoriesSelectQuery = () => {
  return {
    queryKey: articlePressCategoriesSelectQueryKey,
    queryFn: () => articlePressCategoriesSelectFetcher(),
  } as const
}

// Jobs
export const articleJobsCategoriesSelectQueryKey = ['ArticleJobsCategoriesSelect']
export const articleJobsCategoriesSelectFetcher = () =>
  client
    .ArticleJobsCategories()
    .then((data) => data.articleJobsCategories?.data.map(mapSelectFn).filter(isDefined) ?? [])

export const getArticleJobsCategoriesSelectQuery = () => {
  return {
    queryKey: articleJobsCategoriesSelectQueryKey,
    queryFn: () => articleJobsCategoriesSelectFetcher(),
  } as const
}
