import { client } from '@/services/graphql/gqlClient'

export const getGraphqlProceduresQueryKey = (locale: string) => ['Procedures', locale]

export const graphqlProceduresFetcher = (locale: string) => client.Procedures({ locale })

export const getGraphqlProceduresQuery = (locale: string) => {
  return {
    queryKey: getGraphqlProceduresQueryKey(locale),
    queryFn: () => graphqlProceduresFetcher(locale),
  } as const
}
