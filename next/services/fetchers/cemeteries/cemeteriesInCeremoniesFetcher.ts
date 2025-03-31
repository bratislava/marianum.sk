import { Option } from '@/components/atoms/Select'
import { client } from '@/services/graphql/gqlClient'
import { getCemeteryInfoInCeremoniesDebtors } from '@/utils/getCemeteryInfoInCeremoniesDebtors'

export const getCemeteriesInCeremoniesKey = (locale: string) => ['CemeteriesInCeremonies', locale]

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

export const getCemeteriesInCeremoniesQuery = (locale: string) => {
  return {
    queryKey: getCemeteriesInCeremoniesKey(locale),
    queryFn: () => cemeteriesInCeremoniesFetcher(locale),
  } as const
}
