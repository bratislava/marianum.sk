import { client } from '@/services/graphql/gqlClient'

export const getGraphqlNewsQueryKey = (locale: string) => ['News', locale]

export const graphqlNewsFetcher = (locale: string) => client.News({ locale })

export const getNewsListingPrefetch = (locale: string) => {
  return {
    sectionTypename: 'ComponentSectionsNewsListing',
    key: getGraphqlNewsQueryKey(locale).toString(),
    fetcher: () => graphqlNewsFetcher(locale),
  } as const
}
