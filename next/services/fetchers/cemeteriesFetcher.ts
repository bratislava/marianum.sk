import { client } from '@/services/graphql/gqlClient'

export const getGraphqlCemeteriesQueryKey = (locale: string) => ['Cemeteries', locale]

export const graphqlCemeteriesFetcher = (locale: string) => client.Cemeteries({ locale })

export const getGraphqlCemeteriesQuery = (locale: string) => {
  return {
    queryKey: getGraphqlCemeteriesQueryKey(locale),
    queryFn: () => graphqlCemeteriesFetcher(locale),
  } as const
}
