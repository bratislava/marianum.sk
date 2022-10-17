import { client } from '../gql'

export const getProceduresSwrKey = (locale: string) => ['Procedures', locale]

export const proceduresFetcher = (locale: string) => () => client.Procedures({ locale })

export const getProceduresPrefetch = (locale: string) =>
  ({
    sectionTypename: 'ComponentSectionsProceduresSection',
    key: getProceduresSwrKey(locale),
    fetcher: proceduresFetcher(locale),
  } as const)
