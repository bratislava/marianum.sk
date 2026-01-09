import { client } from '@/services/graphql/gqlClient'
import { getCemeteryInfoInCeremoniesDebtors } from '@/utils/getCemeteryInfoInCeremoniesDebtors'
import { isDefined } from '@/utils/isDefined'

export const getCemeteriesInCeremoniesKey = (locale: string) => ['CemeteriesInCeremonies', locale]

export const cemeteriesInCeremoniesFetcher = async (locale: string) => {
  const result = await client.CemeteriesInCeremonies()

  return (
    result.cemeteries?.data
      ?.map((cemetery) => {
        return cemetery.id
          ? {
              label: getCemeteryInfoInCeremoniesDebtors(cemetery, locale).title ?? '',
              key: cemetery.id,
            }
          : null
      })
      .filter(isDefined) ?? []
  )
}

export const getCemeteriesInCeremoniesQuery = (locale: string) => {
  return {
    queryKey: getCemeteriesInCeremoniesKey(locale),
    queryFn: () => cemeteriesInCeremoniesFetcher(locale),
  } as const
}
