import { parseAbsolute } from '@internationalized/date'

import { bratislavaTimezone } from '../consts'
import { client } from '../gql'

export type CeremoniesSectionFilters = {
  branchId: string | null
}

export const ceremoniesSectionDefaultFilters: CeremoniesSectionFilters = {
  branchId: null,
}

export const getCeremoniesSectionSwrKey = (filters: CeremoniesSectionFilters) => [
  'CeremoniesSection',
  filters,
]

export const ceremoniesSectionFetcher = (filters: CeremoniesSectionFilters) => () => {
  const currentDate = parseAbsolute(new Date().toISOString(), bratislavaTimezone)
  const startOfDay = currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  const startOfDayString = startOfDay.toAbsoluteString()

  return client.Ceremonies({
    dateTime: startOfDayString,
    branchIdFilter: filters.branchId ? { eq: filters.branchId } : undefined,
  })
}

export const ceremoniesSectionPrefetch = {
  sectionTypename: 'ComponentSectionsCeremoniesSection',
  key: getCeremoniesSectionSwrKey(ceremoniesSectionDefaultFilters),
  fetcher: ceremoniesSectionFetcher(ceremoniesSectionDefaultFilters),
} as const
