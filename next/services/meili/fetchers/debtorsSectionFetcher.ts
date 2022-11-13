import { meiliClient } from '@services/meili/meiliClient'
import { getMeilisearchPageOptions } from '@utils'
import { Key } from 'swr'

import { DebtorMeili } from '../meiliTypes'

export type DebtorsSectionFilters = {
  pageSize: number
  search: string
  cemeteryId: string | null
  page: number
}

export const debtorsSectionDefaultFilters: DebtorsSectionFilters = {
  pageSize: 20,
  search: '',
  page: 1,
  cemeteryId: null,
}

export const getDebtorsSectionSwrKey = (filters: DebtorsSectionFilters) =>
  ['DebtorsSection', filters] as Key

export const debtorsSectionFetcher = (filters: DebtorsSectionFilters) => () =>
  meiliClient.index('debtor').search<DebtorMeili>(filters.search, {
    ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
    filter: filters.cemeteryId ? [`cemetery.id = ${filters.cemeteryId}`] : [],
  })

export const debtorsSectionPrefetch = {
  sectionTypename: 'ComponentSectionsDebtorsSection',
  key: getDebtorsSectionSwrKey(debtorsSectionDefaultFilters),
  fetcher: debtorsSectionFetcher(debtorsSectionDefaultFilters),
} as const
