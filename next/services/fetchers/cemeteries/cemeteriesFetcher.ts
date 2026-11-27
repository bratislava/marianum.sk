import { meiliClient } from '@/services/meili/meiliClient'
import { CemeteryMeili } from '@/services/meili/meiliTypes'
import { SearchIndexWrapped, unwrapFromSearchIndex } from '@/services/meili/searchIndexWrapped'
import { getMeilisearchPageOptions } from '@/utils/getMeilisearchPageOptions'
import { isDefined } from '@/utils/isDefined'

export type CemeteriesFilters = {
  pageSize: number
  search: string
  page: number
  categoryDocumentIds?: string[]
}

export const cemeteriesDefaultFilters: CemeteriesFilters = {
  pageSize: 24,
  search: '',
  page: 1,
  categoryDocumentIds: [],
}

export const getMeiliCemeteriesQueryKey = (filters: CemeteriesFilters) => ['Cemeteries', filters]

export const meiliCemeteriesFetcher = async (filters: CemeteriesFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'cemetery', CemeteryMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "cemetery"',
        filters.categoryDocumentIds?.length
          ? `cemetery.cemeteryCategory.documentId IN [${filters.categoryDocumentIds.join(',')}]`
          : null,
      ].filter(isDefined),
      sort: ['cemetery.title:asc'],
    })
    .then(unwrapFromSearchIndex('cemetery'))
}

export const getMeiliCemeteriesQuery = (filters: CemeteriesFilters = cemeteriesDefaultFilters) => {
  return {
    queryKey: getMeiliCemeteriesQueryKey(filters),
    queryFn: async () => meiliCemeteriesFetcher(filters),
  } as const
}
