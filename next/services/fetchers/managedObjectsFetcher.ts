import { client } from '@/services/graphql/gqlClient'

export const getGraphqlManagedObjectsQueryKey = (locale: string) => ['ManagedObjects', locale]

export const graphqlManagedObjectsFetcher = (locale: string) => client.ManagedObjects({ locale })

export const getGraphqlManagedObjectsQuery = (locale: string) => {
  return {
    queryKey: getGraphqlManagedObjectsQueryKey(locale),
    queryFn: () => graphqlManagedObjectsFetcher(locale),
  } as const
}
