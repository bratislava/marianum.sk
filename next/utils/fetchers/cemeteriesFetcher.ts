import { Key } from 'swr'

import { client } from '../gql'

export const getCemeteriesSwrKey = (locale: string) => ['Cemeteries', locale] as Key

export const cemeteriesFetcher = (locale: string) => () => client.Cemeteries({ locale })

export const getMapSectionPrefetch = (locale: string) => ({
  sectionTypename: 'ComponentSectionsMapSection',
  key: getCemeteriesSwrKey(locale),
  fetcher: cemeteriesFetcher(locale),
})
