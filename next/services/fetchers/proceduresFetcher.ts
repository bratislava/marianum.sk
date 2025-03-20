import { client } from '@/services/graphql/gqlClient'

export const getGraphqlProceduresQueryKey = (locale: string) => ['Procedures', locale]

export const graphqlProceduresFetcher = (locale: string) => client.Procedures({ locale })

export const getProceduresPrefetch = (locale: string) => {
  return {
    sectionTypename: 'ComponentSectionsProceduresSection',
    key: getGraphqlProceduresQueryKey(locale),
    fetcher: graphqlProceduresFetcher(locale),
  } as const
}
