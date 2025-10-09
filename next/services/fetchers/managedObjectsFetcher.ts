import { Sort } from '@/components/molecules/SortSelect'
import { client } from '@/services/graphql/gqlClient'
import { meiliClient } from '@/services/meili/meiliClient'
import { ManagedObjectMeili } from '@/services/meili/meiliTypes'
import { SearchIndexWrapped, unwrapFromSearchIndex } from '@/services/meili/searchIndexWrapped'
import { getMeilisearchPageOptions } from '@/utils/getMeilisearchPageOptions'
import { isDefined } from '@/utils/isDefined'

export const getGraphqlManagedObjectsQueryKey = (locale: string) => ['ManagedObjects', locale]

export const graphqlManagedObjectsFetcher = (locale: string) => client.ManagedObjects({ locale })

export const getGraphqlManagedObjectsQuery = (locale: string) => {
  return {
    queryKey: getGraphqlManagedObjectsQueryKey(locale),
    queryFn: () => graphqlManagedObjectsFetcher(locale),
  } as const
}

export type ManagedObjectsFilters = {
  pageSize: number
  search: string
  categoryIds?: string[]
  page: number
  sort: Sort
  filetype: string | null
}

export const managedObjectsDefaultFilters: ManagedObjectsFilters = {
  pageSize: 24,
  search: '',
  page: 1,
  categoryIds: [],
  sort: 'newest',
  filetype: null,
}

export const getMeiliManagedObjectsQueryKey = (filters: ManagedObjectsFilters) => [
  'ManagedObjects',
  filters,
]

export const meiliManagedObjectsFetcher = (filters: ManagedObjectsFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'managed-object', ManagedObjectMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "managed-object"',
        filters.categoryIds?.length
          ? `managed-object.managedObjectCategory.id [${filters.categoryIds.join(',')}]`
          : null,
      ].filter(isDefined),
      sort: ['managed-object.title:asc'],
    })
    .then(unwrapFromSearchIndex('managed-object'))
}

export const getMeiliManagedObjectsQuery = (
  filters: ManagedObjectsFilters = managedObjectsDefaultFilters,
) => {
  return {
    queryKey: getMeiliManagedObjectsQueryKey(filters),
    queryFn: () => meiliManagedObjectsFetcher(filters),
  } as const
}
