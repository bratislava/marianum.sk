import { Key } from 'swr'

import { SelectOption } from '@/components/atoms/Select'
import { client } from '@/services/graphql/gqlClient'
import { meiliClient } from '@/services/meili/meiliClient'
import { DebtorMeili } from '@/services/meili/meiliTypes'
import { getCemeteryInfoInCeremoniesDebtors } from '@/utils/getCemeteryInfoInCeremoniesDebtors'
import { getMeilisearchPageOptions } from '@/utils/getMeilisearchPageOptions'

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

export const getCemeteriesInDebtorsKey = (locale: string) => ['CemeteriesInDebtors', locale] as Key

export const cemeteriesInDebtorsFetcher = async (locale: string) => {
  const result = await client.CemeteriesInDebtors()

  return (
    result.cemeteries?.data?.map(
      (cemetery) =>
        ({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          value: cemetery.id!,
          label: getCemeteryInfoInCeremoniesDebtors(cemetery, locale).title ?? '',
        }) as SelectOption,
    ) ?? ([] as SelectOption[])
  )
}

export const getDebtorsSectionPrefetches = (locale: string) => [
  {
    sectionTypename: 'ComponentSectionsDebtorsSection',
    key: getCemeteriesInDebtorsKey(locale),
    fetcher: cemeteriesInDebtorsFetcher,
  } as const,
  {
    sectionTypename: 'ComponentSectionsDebtorsSection',
    key: getDebtorsSectionSwrKey(debtorsSectionDefaultFilters),
    fetcher: debtorsSectionFetcher(debtorsSectionDefaultFilters),
  } as const,
]
