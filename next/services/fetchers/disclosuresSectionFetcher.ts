import { meiliClient } from '@/services/meili/meiliClient'
import { DisclosureMeili, DisclosureTypeFixed } from '@/services/meili/meiliTypes'
import { getMeilisearchPageOptions } from '@/utils/getMeilisearchPageOptions'

export type DisclosuresFilters = {
  pageSize: number
  search: string
  page: number
  type: DisclosureTypeFixed | null
}

export const disclosuresSectionDefaultFilters: DisclosuresFilters = {
  pageSize: 10,
  search: '',
  page: 1,
  type: null,
}

export const getMeiliDisclosuresQueryKey = (filters: DisclosuresFilters) => [
  'DisclosuresSection',
  filters,
]

export const meiliDisclosuresFetcher = (filters: DisclosuresFilters) =>
  meiliClient.index('disclosure').search<DisclosureMeili>(filters.search, {
    ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
    filter: filters.type ? [`type = ${filters.type}`] : [],
    sort: ['publishedAtTimestamp:desc'],
  })

export const disclosuresSectionPrefetch = {
  sectionTypename: 'ComponentSectionsDisclosuresSection',
  key: getMeiliDisclosuresQueryKey(disclosuresSectionDefaultFilters),
  fetcher: meiliDisclosuresFetcher(disclosuresSectionDefaultFilters),
} as const

export const getMeiliDisclosuresQuery = (
  filters: DisclosuresFilters = disclosuresSectionDefaultFilters,
) => {
  return {
    queryKey: getMeiliDisclosuresQueryKey(filters),
    queryFn: () => meiliDisclosuresFetcher(filters),
  } as const
}
