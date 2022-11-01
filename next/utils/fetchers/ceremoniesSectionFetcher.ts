import { parseAbsolute } from '@internationalized/date'
import { Key } from 'swr'

import { bratislavaTimezone } from '../consts'
import { client } from '../gql'

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

export const ceremoniesSectionPrefetch = {
  sectionTypename: 'ComponentSectionsCeremoniesSection',
  key: getCeremoniesSectionSwrKey(ceremoniesSectionDefaultFilters),
  fetcher: ceremoniesSectionFetcher(ceremoniesSectionDefaultFilters),
} as const
