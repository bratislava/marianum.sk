import { client } from '@/services/graphql/gqlClient'

export const getGraphqlCemeteriesQueryKey = (locale: string) => ['Cemeteries', locale]

export const graphqlCemeteriesFetcher = (locale: string) => client.Cemeteries({ locale })

export const getMapSectionPrefetch = (locale: string) => ({
  sectionTypename: 'ComponentSectionsMapSection',
  key: getGraphqlCemeteriesQueryKey(locale),
  fetcher: graphqlCemeteriesFetcher(locale),
})
