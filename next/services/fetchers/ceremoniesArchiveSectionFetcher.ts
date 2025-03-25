import {
  cemeteriesInCeremoniesFetcher,
  getCemeteriesInCeremoniesKey,
} from '@/services/fetchers/ceremoniesSectionFetcher'
import { meiliClient } from '@/services/meili/meiliClient'
import { CeremonyMeili } from '@/services/meili/meiliTypes'
import { getMeilisearchPageOptions } from '@/utils/getMeilisearchPageOptions'
import { isDefined } from '@/utils/isDefined'

export type CeremoniesArchiveSectionFilters = {
  pageSize: number
  search: string
  cemeteryId: string | null
  page: number
}

export const ceremoniesArchiveSectionDefaultFilters: CeremoniesArchiveSectionFilters = {
  pageSize: 24,
  search: '',
  page: 1,
  cemeteryId: null,
}

export const getCeremoniesArchiveSectionQueryKey = (filters: CeremoniesArchiveSectionFilters) => [
  'CeremoniesArchiveSection',
  filters,
]

// TODO consider unifying fetchers for ceremonies, upcoming ceremonies and archived ceremonies
export const ceremoniesArchiveSectionFetcher = (filters: CeremoniesArchiveSectionFilters) =>
  meiliClient.index('ceremony').search<CeremonyMeili>(filters.search, {
    ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
    filter: [
      `dateTimeTimestamp < ${Date.now()}`,
      filters.cemeteryId && `cemetery.id = ${filters.cemeteryId}`,
    ].filter(isDefined),
    sort: ['dateTimeTimestamp:desc'],
  })

export const ceremoniesArchiveSectionPrefetches = [
  {
    sectionTypename: 'ComponentSectionsCeremoniesArchiveSection',
    key: getCemeteriesInCeremoniesKey,
    fetcher: cemeteriesInCeremoniesFetcher,
  } as const,
  {
    sectionTypename: 'ComponentSectionsCeremoniesArchiveSection',
    key: getCeremoniesArchiveSectionQueryKey(ceremoniesArchiveSectionDefaultFilters),
    fetcher: ceremoniesArchiveSectionFetcher(ceremoniesArchiveSectionDefaultFilters),
  } as const,
]

// TODO: align names in next commit
export const getCeremoniesArchiveSectionQuery = (
  filters: CeremoniesArchiveSectionFilters = ceremoniesArchiveSectionDefaultFilters,
) => {
  return {
    queryKey: getCeremoniesArchiveSectionQueryKey(filters),
    queryFn: () => ceremoniesArchiveSectionFetcher(filters),
  } as const
}
