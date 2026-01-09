import { client } from '@/services/graphql/gqlClient'
import { getCemeteryInfoInCeremoniesDebtors } from '@/utils/getCemeteryInfoInCeremoniesDebtors'
import { isDefined } from '@/utils/isDefined'

export const getCemeteriesInDebtorsKey = (locale: string) => ['CemeteriesInDebtors', locale]

export const cemeteriesInDebtorsFetcher = async (locale: string) => {
  const result = await client.CemeteriesInDebtors()

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

export const getCemeteriesInDebtorsQuery = (locale: string) => {
  return {
    queryKey: getCemeteriesInDebtorsKey(locale),
    queryFn: () => cemeteriesInDebtorsFetcher(locale),
  } as const
}
