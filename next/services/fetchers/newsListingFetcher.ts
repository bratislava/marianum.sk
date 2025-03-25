import { client } from '@/services/graphql/gqlClient'

export const getGraphqlNewsQueryKey = (locale: string) => ['News', locale]

export const graphqlNewsFetcher = (locale: string) => client.News({ locale })

export const getGraphqlNewsQuery = (locale: string) => {
  return {
    queryKey: getGraphqlNewsQueryKey(locale),
    queryFn: () => graphqlNewsFetcher(locale),
  } as const
}
