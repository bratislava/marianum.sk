import { meiliClient } from '@/services/meili/meiliClient'
import { DebtorMeili } from '@/services/meili/meiliTypes'
import { getMeilisearchPageOptions } from '@/utils/getMeilisearchPageOptions'

export type DebtorsFilters = {
  pageSize: number
  search: string
  cemeteryId: string | null
  page: number
}

export const debtorsDefaultFilters: DebtorsFilters = {
  pageSize: 20,
  search: '',
  page: 1,
  cemeteryId: null,
}

export const getMeiliDebtorsQueryKey = (filters: DebtorsFilters) => ['Debtors', filters]

export const meiliDebtorsFetcher = (filters: DebtorsFilters) =>
  meiliClient.index('debtor').search<DebtorMeili>(filters.search, {
    ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
    filter: filters.cemeteryId ? [`cemetery.id = ${filters.cemeteryId}`] : [],
  })

export const getMeiliDebtorsQuery = (filters: DebtorsFilters = debtorsDefaultFilters) => {
  return {
    queryKey: getMeiliDebtorsQueryKey(filters),
    queryFn: () => meiliDebtorsFetcher(filters),
  } as const
}
