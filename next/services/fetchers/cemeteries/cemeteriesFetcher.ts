import { meiliClient } from '@/services/meili/meiliClient'
import { CemeteryMeili } from '@/services/meili/meiliTypes'
import { SearchIndexWrapped, unwrapFromSearchIndex } from '@/services/meili/searchIndexWrapped'
import { getMeilisearchPageOptions } from '@/utils/getMeilisearchPageOptions'
import { isDefined } from '@/utils/isDefined'

export type CemeteriesFilters = {
  pageSize: number
  search: string
  page: number
  categorySlugs?: string[]
}

export const cemeteriesDefaultFilters: CemeteriesFilters = {
  pageSize: 24,
  search: '',
  page: 1,
  categorySlugs: [],
}

export const getMeiliCemeteriesQueryKey = (filters: CemeteriesFilters) => ['Cemeteries', filters]

export const meiliCemeteriesFetcher = (filters: CemeteriesFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'cemetery', CemeteryMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "cemetery"',
        filters.categorySlugs?.length
          ? `cemetery.cemeteryCategory.slug IN [${filters.categorySlugs.join(',')}]`
          : null,
      ].filter(isDefined),
      sort: ['cemetery.title:asc'],
    })
    .then(unwrapFromSearchIndex('cemetery'))
}

export const getMeiliCemeteriesQuery = (filters: CemeteriesFilters = cemeteriesDefaultFilters) => {
  return {
    queryKey: getMeiliCemeteriesQueryKey(filters),
    queryFn: () => meiliCemeteriesFetcher(filters),
  } as const
}
