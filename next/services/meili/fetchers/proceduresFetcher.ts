import { client } from '@services/gqlClient'
import { Key } from 'swr'

export const getProceduresSwrKey = (locale: string) => ['Procedures', locale] as Key

export const proceduresFetcher = (locale: string) => () => client.Procedures({ locale })

export const getProceduresPrefetch = (locale: string) =>
  ({
    sectionTypename: 'ComponentSectionsProceduresSection',
    key: getProceduresSwrKey(locale),
    fetcher: proceduresFetcher(locale),
  } as const)
