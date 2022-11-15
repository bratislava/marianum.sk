import { meiliClient } from '@services/meili/meiliClient'
import { getMeilisearchPageOptions } from '@utils/getMeilisearchPageOptions'
import { isDefined } from '@utils/isDefined'
import { Key } from 'swr'

import { CeremonyMeili } from '../meili/meiliTypes'

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

export const getCeremoniesArchiveSectionSwrKey = (filters: CeremoniesArchiveSectionFilters) =>
  ['CeremoniesArchiveSection', filters] as Key

export const ceremoniesArchiveSectionFetcher = (filters: CeremoniesArchiveSectionFilters) => () =>
  meiliClient.index('ceremony').search<CeremonyMeili>(filters.search, {
    ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
    filter: [
      `dateTimeTimestamp < ${Date.now()}`,
      filters.cemeteryId && `cemetery.id = ${filters.cemeteryId}`,
    ].filter(isDefined),
    sort: ['dateTimeTimestamp:desc'],
  })

export const ceremoniesArchiveSectionPrefetch = {
  sectionTypename: 'ComponentSectionsCeremoniesArchiveSection',
  key: getCeremoniesArchiveSectionSwrKey(ceremoniesArchiveSectionDefaultFilters),
  fetcher: ceremoniesArchiveSectionFetcher(ceremoniesArchiveSectionDefaultFilters),
} as const
