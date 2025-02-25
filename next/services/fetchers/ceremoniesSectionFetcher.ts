import { parseAbsolute } from '@internationalized/date'
import { Key } from 'swr'

import { Option } from '@/components/atoms/Select'
import { client } from '@/services/graphql/gqlClient'
import { bratislavaTimezone } from '@/utils/consts'
import { getCemeteryInfoInCeremoniesDebtors } from '@/utils/getCemeteryInfoInCeremoniesDebtors'

export type CeremoniesSectionFilters = {
  cemeteryId: string | null
}

export const ceremoniesSectionDefaultFilters: CeremoniesSectionFilters = {
  cemeteryId: null,
}

export const getCeremoniesSectionSwrKey = (filters: CeremoniesSectionFilters) =>
  ['CeremoniesSection', filters] as Key

export const ceremoniesSectionFetcher = (filters: CeremoniesSectionFilters) => () => {
  const currentDate = parseAbsolute(new Date().toISOString(), bratislavaTimezone)
  const startOfDay = currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  const startOfDayString = startOfDay.toAbsoluteString()

  return client.Ceremonies({
    dateTime: startOfDayString,
    cemeteryIdFilter: filters.cemeteryId ? { eq: filters.cemeteryId } : undefined,
  })
}

export const getCemeteriesInCeremoniesKey = (locale: string) =>
  ['CemeteriesInCeremonies', locale] as Key

export const cemeteriesInCeremoniesFetcher = async (locale: string) => {
  const result = await client.CemeteriesInCeremonies()

  return (
    result.cemeteries?.data?.map(
      (cemetery) =>
        ({
          label: getCemeteryInfoInCeremoniesDebtors(cemetery, locale).title ?? '',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          key: cemetery.id!,
        }) as Option,
    ) ?? ([] as Option[])
  )
}

export const getCeremoniesSectionPrefetches = (locale: string) => [
  {
    sectionTypename: 'ComponentSectionsCeremoniesSection',
    key: getCemeteriesInCeremoniesKey(locale),
    fetcher: cemeteriesInCeremoniesFetcher,
  } as const,
  {
    sectionTypename: 'ComponentSectionsCeremoniesSection',
    key: getCeremoniesSectionSwrKey(ceremoniesSectionDefaultFilters),
    fetcher: ceremoniesSectionFetcher(ceremoniesSectionDefaultFilters),
  } as const,
]
