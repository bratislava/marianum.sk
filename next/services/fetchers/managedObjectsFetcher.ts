import { Key } from 'swr'

import { client } from '@/services/graphql/gqlClient'

export const getManagedObjectsSwrKey = (locale: string) => ['ManagedObjects', locale] as Key

export const managedObjectsFetcher = (locale: string) => () => client.ManagedObjects({ locale })

export const getMapOfManagedObjectsSectionPrefetch = (locale: string) => ({
  sectionTypename: 'ComponentSectionsMapOfManagedObjects',
  key: getManagedObjectsSwrKey(locale),
  fetcher: managedObjectsFetcher(locale),
})
