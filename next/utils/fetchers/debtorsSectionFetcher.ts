import { Key } from 'swr'

import { DebtorMeili } from '../../types/meiliTypes'
import { getMeilisearchPageOptions } from '../getMeilisearchPageOptions'
import { meiliClient } from '../meilisearch'

export type DebtorsSectionFilters = {
  pageSize: number
  search: string
  branchId: string | null
  page: number
}

export const debtorsSectionDefaultFilters: DebtorsSectionFilters = {
  pageSize: 20,
  search: '',
  page: 1,
  branchId: null,
}

export const getDebtorsSectionSwrKey = (filters: DebtorsSectionFilters) =>
  ['DebtorsSection', filters] as Key

export const debtorsSectionFetcher = (filters: DebtorsSectionFilters) => () =>
  meiliClient.index('debtor').search<DebtorMeili>(filters.search, {
    ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
    filter: filters.branchId ? [`branch.id = ${filters.branchId}`] : [],
  })

export const debtorsSectionPrefetch = {
  sectionTypename: 'ComponentSectionsDebtorsSection',
  key: getDebtorsSectionSwrKey(debtorsSectionDefaultFilters),
  fetcher: debtorsSectionFetcher(debtorsSectionDefaultFilters),
} as const
