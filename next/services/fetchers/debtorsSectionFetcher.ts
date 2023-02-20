import { Option } from '@components/atoms/Select'
import { client } from '@services/graphql/gqlClient'
import { meiliClient } from '@services/meili/meiliClient'
import { getCemeteryInfoInCeremoniesDebtors } from '@utils/getCemeteryInfoInCeremoniesDebtors'
import { getMeilisearchPageOptions } from '@utils/getMeilisearchPageOptions'
import { Key } from 'swr'

import { DebtorMeili } from '../meili/meiliTypes'

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
          label: getCemeteryInfoInCeremoniesDebtors(cemetery, locale).title ?? '',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          key: cemetery.id!,
        } as Option),
    ) ?? ([] as Option[])
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
