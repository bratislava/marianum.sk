import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import useSwr from 'swr'

import { getBranchTitleInCeremoniesDebtors } from '../../../utils/getBranchTitleInCeremoniesDebtors'
import { client } from '../../../utils/gql'
import useGetSwrExtras from '../../../utils/useGetSwrExtras'
import Select from '../../atoms/Select'

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
  const { t, i18n } = useTranslation('common', {
    keyPrefix: 'components.molecules.CeremoniesDebtorsBranchSelect',
  })

  // eslint-disable-next-line consistent-return
  const { data, error } = useSwr(['BranchesInCeremoniesDebtors'], () => {
    if (type === 'ceremonies') {
      return client.BranchesInCeremonies()
    }
    if (type === 'debtors') {
      return client.BranchesInDebtors()
    }
  })

  const { loading } = useGetSwrExtras({ data, error })

  const branches = useMemo(() => {
    const mappedBranches = data?.branches?.data?.map((branch) => {
      return {
        label: getBranchTitleInCeremoniesDebtors(branch, i18n.language) ?? '',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        key: branch.id!,
      }
    })

    return [{ label: t('allCemeteries'), key: '' }, ...(mappedBranches ?? [])]
  }, [data, i18n.language, t])

  return (
    <Select
      label={label}
      disabled={loading || error}
      options={branches}
      defaultSelected=""
      onSelectionChange={(selection) => {
        onBranchChange(selection)
      }}
    />
  )
}

export default CeremoniesDebtorsBranchSelect
