import { client } from '@/services/graphql/gqlClient'

export const getGraphqlReviewsQueryKey = (locale: string) => ['Reviews', locale]

export const graphqlReviewsFetcher = (locale: string) => client.Reviews({ locale })

export const getReviewPrefetch = (locale: string) =>
  ({
    sectionTypename: 'ComponentSectionsReviewListing',
    key: 'reviews',
    fetcher: graphqlReviewsFetcher(locale),
  }) as const

export const getGraphqlReviewsQuery = (locale: string) => {
  return {
    queryKey: getGraphqlReviewsQueryKey(locale),
    queryFn: () => graphqlReviewsFetcher(locale),
  }
}
