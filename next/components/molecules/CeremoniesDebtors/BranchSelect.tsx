import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { getBranchInfoInCeremoniesDebtors } from '../../../utils/getBranchInfoInCeremoniesDebtors'
import { client } from '../../../utils/gql'
import SelectWithFetcher from '../SelectWithFetcher'

type CeremoniesDebtorsBranchSelectProps = {
  label?: string
  type: 'ceremonies' | 'debtors'
  onBranchChange: (id: string) => void
}

const CeremoniesDebtorsBranchSelect = ({
  label,
  type,
  onBranchChange = () => {},
}: CeremoniesDebtorsBranchSelectProps) => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'BranchSelect' })

  // eslint-disable-next-line consistent-return
  const fetcher = useMemo(() => {
    if (type === 'ceremonies') {
      return client.BranchesInCeremonies()
    }
    if (type === 'debtors') {
      return client.BranchesInDebtors()
    }
  }, [type])

  // eslint-disable-next-line consistent-return
  const swrKey = useMemo(() => {
    if (type === 'ceremonies') {
      return 'BranchesInCeremonies'
    }
    if (type === 'debtors') {
      return 'BranchesInDebtors'
    }
  }, [type])

  const mappedFetcher = useMemo(() => {
    return fetcher?.then((data) => {
      return (
        data?.branches?.data?.map((branch) => {
          return {
            label: getBranchInfoInCeremoniesDebtors(branch, i18n.language).title ?? '',
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            key: branch.id!,
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
        onBranchChange(selection)
      }}
    />
  ) : null
}

export default CeremoniesDebtorsBranchSelect
