import { meiliClient } from '@/services/meili/meiliClient'
import { ManagedObjectMeili } from '@/services/meili/meiliTypes'
import { SearchIndexWrapped, unwrapFromSearchIndex } from '@/services/meili/searchIndexWrapped'
import { getMeilisearchPageOptions } from '@/utils/getMeilisearchPageOptions'
import { isDefined } from '@/utils/isDefined'

export type ManagedObjectsFilters = {
  pageSize: number
  search: string
  page: number
  categorySlugs?: string[]
}

export const managedObjectsDefaultFilters: ManagedObjectsFilters = {
  pageSize: 24,
  search: '',
  page: 1,
  categorySlugs: [],
}

export const getMeiliManagedObjectsQueryKey = (filters: ManagedObjectsFilters) => [
  'ManagedObjects',
  filters,
]

export const meiliManagedObjectsFetcher = async (filters: ManagedObjectsFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'managed-object', ManagedObjectMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "managed-object"',
        filters.categorySlugs?.length
          ? `managed-object.managedObjectCategory.slug IN [${filters.categorySlugs.join(',')}]`
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
    queryFn: async () => meiliManagedObjectsFetcher(filters),
  } as const
}
