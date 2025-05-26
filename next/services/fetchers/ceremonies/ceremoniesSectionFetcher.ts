import { parseAbsolute } from '@internationalized/date'

import { client } from '@/services/graphql/gqlClient'
import { bratislavaTimezone } from '@/utils/consts'

export type CeremoniesSectionFilters = {
  cemeteryId: string | null
}

export const ceremoniesSectionDefaultFilters: CeremoniesSectionFilters = {
  cemeteryId: null,
}

export const getCeremoniesSectionQueryKey = (filters: CeremoniesSectionFilters) => [
  'CeremoniesSection',
  filters,
]

export const ceremoniesSectionFetcher = (filters: CeremoniesSectionFilters) => {
  const currentDate = parseAbsolute(new Date().toISOString(), bratislavaTimezone)
  const startOfDay = currentDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  const startOfDayString = startOfDay.toAbsoluteString()

  return client.Ceremonies({
    dateTime: startOfDayString,
    cemeteryIdFilter: filters.cemeteryId ? { eq: filters.cemeteryId } : undefined,
  })
}

export const getGraphqlCeremoniesSectionQuery = (
  filters: CeremoniesSectionFilters = ceremoniesSectionDefaultFilters,
) => {
  return {
    queryKey: getCeremoniesSectionQueryKey(filters),
    queryFn: () => ceremoniesSectionFetcher(filters),
  } as const
}
