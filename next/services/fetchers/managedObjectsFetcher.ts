import { client } from '@/services/graphql/gqlClient'

export const getGraphqlManagedObjectsQueryKey = (locale: string) => ['ManagedObjects', locale]

export const graphqlManagedObjectsFetcher = (locale: string) => client.ManagedObjects({ locale })

export const getMapOfManagedObjectsSectionPrefetch = (locale: string) => ({
  sectionTypename: 'ComponentSectionsMapOfManagedObjects',
  key: getGraphqlManagedObjectsQueryKey(locale),
  fetcher: graphqlManagedObjectsFetcher(locale),
})

export const getGraphqlManagedObjectsQuery = (locale: string) => {
  return {
    queryKey: getGraphqlManagedObjectsQueryKey(locale),
    queryFn: () => graphqlManagedObjectsFetcher(locale),
  } as const
}
