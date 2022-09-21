import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import useSwr from 'swr'

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
    // As the relation in ceremonies and debtors is always with the Slovak version, we need the Slovak id,
    // so we fetch the Slovak version and only display the title if the locale is English.
    const mappedBranches = data?.branches?.data?.map((branch) => {
      const skBranchTitle = branch?.attributes?.title
      const localeBranchTitle = branch?.attributes?.localizations?.data?.find(
        (innerBranch) => innerBranch?.attributes?.locale === i18n.language,
      )?.attributes?.title
      const branchTitle = localeBranchTitle ?? skBranchTitle

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return { label: branchTitle ?? '', key: branch.id! }
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
