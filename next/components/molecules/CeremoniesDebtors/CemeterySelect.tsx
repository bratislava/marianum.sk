import SelectWithFetcher from '@components/molecules/SelectWithFetcher'
import { client } from '@services/gqlClient'
import { getCemeteryInfoInCeremoniesDebtors } from '@utils'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

type CeremoniesDebtorsCemeterySelectProps = {
  label?: string
  type: 'ceremonies' | 'debtors'
  onCemeteryChange: (id: string) => void
}

const CeremoniesDebtorsCemeterySelect = ({
  label,
  type,
  onCemeteryChange = () => {},
}: CeremoniesDebtorsCemeterySelectProps) => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'CemeterySelect' })

  // eslint-disable-next-line consistent-return
  const fetcher = useMemo(() => {
    if (type === 'ceremonies') {
      return client.CemeteriesInCeremonies()
    }
    if (type === 'debtors') {
      return client.CemeteriesInDebtors()
    }
  }, [type])

  // eslint-disable-next-line consistent-return
  const swrKey = useMemo(() => {
    if (type === 'ceremonies') {
      return 'CemeteriesInCeremonies'
    }
    if (type === 'debtors') {
      return 'CemeteriesInDebtors'
    }
  }, [type])

  const mappedFetcher = useMemo(() => {
    return fetcher?.then((data) => {
      return (
        data?.cemeteries?.data?.map((cemetery) => {
          return {
            label: getCemeteryInfoInCeremoniesDebtors(cemetery, i18n.language).title ?? '',
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            key: cemetery.id!,
          }
        }) ?? []
      )
    })
  }, [fetcher, i18n.language])

  const defaultOption = useMemo(() => ({ label: t('allCemeteries'), key: '' }), [t])

  return mappedFetcher ? (
    <SelectWithFetcher
      swrKey={swrKey}
      defaultOption={defaultOption}
      fetcher={() => mappedFetcher}
      label={label}
      onSelectionChange={(selection: string) => {
        onCemeteryChange(selection)
      }}
    />
  ) : null
}

export default CeremoniesDebtorsCemeterySelect
