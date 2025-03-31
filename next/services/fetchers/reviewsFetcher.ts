import { client } from '@/services/graphql/gqlClient'

export const getGraphqlReviewsQueryKey = (locale: string) => ['Reviews', locale]

export const graphqlReviewsFetcher = (locale: string) => client.Reviews({ locale })

export const getGraphqlReviewsQuery = (locale: string) => {
  return {
    queryKey: getGraphqlReviewsQueryKey(locale),
    queryFn: () => graphqlReviewsFetcher(locale),
  } as const
}
