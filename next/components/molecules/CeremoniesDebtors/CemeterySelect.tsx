import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import {
  cemeteriesInCeremoniesFetcher,
  getCemeteriesInCeremoniesKey,
} from '@/services/fetchers/ceremoniesSectionFetcher'
import {
  cemeteriesInDebtorsFetcher,
  getCemeteriesInDebtorsKey,
} from '@/services/fetchers/debtorsSectionFetcher'

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
  const { t, i18n } = useTranslation()

  // eslint-disable-next-line consistent-return
  const fetcher = useMemo(() => {
    if (type === 'ceremonies') {
      return () => cemeteriesInCeremoniesFetcher(i18n.language)
    }
    if (type === 'debtors') {
      return () => cemeteriesInDebtorsFetcher(i18n.language)
    }
  }, [type, i18n.language])

  const queryKey = useMemo(() => {
    if (type === 'ceremonies') {
      return getCemeteriesInCeremoniesKey(i18n.language)
    }
    if (type === 'debtors') {
      return getCemeteriesInDebtorsKey(i18n.language)
    }

    return ['']
  }, [type, i18n.language])

  const defaultOption = useMemo(() => ({ label: t('CemeterySelect.allCemeteries'), key: '' }), [t])

  return fetcher ? (
    <SelectWithFetcher
      queryKey={queryKey}
      defaultOption={defaultOption}
      fetcher={fetcher}
      label={label}
      onSelectionChange={(selection: string) => {
        onCemeteryChange(selection)
      }}
    />
  ) : null
}

export default CeremoniesDebtorsCemeterySelect
