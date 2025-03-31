import { client } from '@/services/graphql/gqlClient'

export const getGraphqlNewsListingQueryKey = (locale: string) => ['NewsListing', locale]

export const graphqlNewsListingFetcher = (locale: string) => client.News({ locale })

export const getGraphqlNewsListingQuery = (locale: string) => {
  return {
    queryKey: getGraphqlNewsListingQueryKey(locale),
    queryFn: () => graphqlNewsListingFetcher(locale),
  } as const
}
