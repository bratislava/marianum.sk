import { Option } from '@/components/atoms/Select'
import { client } from '@/services/graphql/gqlClient'
import { getCemeteryInfoInCeremoniesDebtors } from '@/utils/getCemeteryInfoInCeremoniesDebtors'

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
