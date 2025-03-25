import { Option } from '@/components/atoms/Select'
import { client } from '@/services/graphql/gqlClient'
import { meiliClient } from '@/services/meili/meiliClient'
import { DebtorMeili } from '@/services/meili/meiliTypes'
import { getCemeteryInfoInCeremoniesDebtors } from '@/utils/getCemeteryInfoInCeremoniesDebtors'
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

export const getMeiliDebtorsQueryKey = (filters: DebtorsFilters) => ['DebtorsSection', filters]

export const meiliDebtorsFetcher = (filters: DebtorsFilters) =>
  meiliClient.index('debtor').search<DebtorMeili>(filters.search, {
    ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
    filter: filters.cemeteryId ? [`cemetery.id = ${filters.cemeteryId}`] : [],
  })

export const getCemeteriesInDebtorsKey = (locale: string) => ['CemeteriesInDebtors', locale]

export const cemeteriesInDebtorsFetcher = async (locale: string) => {
  const result = await client.CemeteriesInDebtors()

  return (
    result.cemeteries?.data?.map((cemetery) => {
      return {
        label: getCemeteryInfoInCeremoniesDebtors(cemetery, locale).title ?? '',
        key: cemetery.id,
      } as Option
    }) ?? []
  )
}

export const getCemeteriesInDebtorsQuery = (locale: string) => {
  return {
    queryKey: getCemeteriesInDebtorsKey(locale),
    queryFn: () => cemeteriesInDebtorsFetcher(locale),
  } as const
}

export const getMeiliDebtorsQuery = (filters: DebtorsFilters = debtorsDefaultFilters) => {
  return {
    queryKey: getMeiliDebtorsQueryKey(filters),
    queryFn: () => meiliDebtorsFetcher(filters),
  } as const
}
