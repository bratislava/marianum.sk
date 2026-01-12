import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import { SelectItem } from '@/components/atoms/SelectField'
import SelectWithFetcher from '@/components/molecules/SelectWithFetcher'
import {
  cemeteriesInCeremoniesFetcher,
  getCemeteriesInCeremoniesKey,
} from '@/services/fetchers/cemeteries/cemeteriesInCeremoniesFetcher'
import {
  cemeteriesInDebtorsFetcher,
  getCemeteriesInDebtorsKey,
} from '@/services/fetchers/cemeteries/cemeteriesInDebtorsFetcher'

type CeremoniesDebtorsCemeterySelectProps = {
  label?: string
  type: 'ceremonies' | 'debtors'
  onCemeteryChange: (id: string | null) => void
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

  // eslint-disable-next-line consistent-return
  const queryKey = useMemo(() => {
    if (type === 'ceremonies') {
      return getCemeteriesInCeremoniesKey(i18n.language)
    }
    if (type === 'debtors') {
      return getCemeteriesInDebtorsKey(i18n.language)
    }
  }, [type, i18n.language])

  const defaultOption = useMemo(() => ({ label: t('CemeterySelect.allCemeteries'), key: '' }), [t])

  return fetcher ? (
    <SelectWithFetcher
      queryKey={queryKey ?? []}
      defaultOption={defaultOption}
      defaultValue={defaultOption.key}
      fetcher={fetcher}
      label={label}
      onChange={(selection) => {
        onCemeteryChange(selection ? (selection as string) : null)
      }}
    >
      {(item) => <SelectItem label={item.label} id={item.key} />}
    </SelectWithFetcher>
  ) : null
}

export default CeremoniesDebtorsCemeterySelect
