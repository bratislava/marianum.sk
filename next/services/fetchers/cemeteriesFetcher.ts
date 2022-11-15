import { client } from '@services/graphql/gqlClient'
import { Key } from 'swr'

export const getCemeteriesSwrKey = (locale: string) => ['Cemeteries', locale] as Key

export const cemeteriesFetcher = (locale: string) => () => client.Cemeteries({ locale })

export const getMapSectionPrefetch = (locale: string) => ({
  sectionTypename: 'ComponentSectionsMapSection',
  key: getCemeteriesSwrKey(locale),
  fetcher: cemeteriesFetcher(locale),
})
