import { Option } from '@/components/atoms/Select'
import { client } from '@/services/graphql/gqlClient'

const mapSelectFn = (category: {
  attributes?: { title?: string | null } | null
  id?: string | null
}) => {
  return {
    label: category.attributes?.title,
    key: category.id,
  } as Option
}

// News
export const articleNewsCategoriesSelectQueryKey = ['ArticleNewsCategoriesSelect']
export const articleNewsCategoriesSelectFetcher = () =>
  client
    .ArticleNewsCategories()
    .then((data) => data.articleNewsCategories?.data.map(mapSelectFn) ?? [])

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
    .then((data) => data.articlePressCategories?.data.map(mapSelectFn) ?? [])

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
    .then((data) => data.articleJobsCategories?.data.map(mapSelectFn) ?? [])

export const getArticleJobsCategoriesSelectQuery = () => {
  return {
    queryKey: articleJobsCategoriesSelectQueryKey,
    queryFn: () => articleJobsCategoriesSelectFetcher(),
  } as const
}
