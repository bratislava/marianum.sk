import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { SelectOption } from '@/components/atoms/Select'
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
  type: 'ceremonies' | 'debtors'
  defaultOption: SelectOption
  onCemeteryChange: (option: SelectOption | null) => void
}

const CeremoniesDebtorsCemeterySelect = ({
  type,
  defaultOption,
  onCemeteryChange = () => {},
}: CeremoniesDebtorsCemeterySelectProps) => {
  const { i18n } = useTranslation()

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
  const swrKey = useMemo(() => {
    if (type === 'ceremonies') {
      return getCemeteriesInCeremoniesKey(i18n.language)
    }
    if (type === 'debtors') {
      return getCemeteriesInDebtorsKey(i18n.language)
    }
  }, [type, i18n.language])

  return fetcher ? (
    <SelectWithFetcher
      swrKey={swrKey}
      defaultOption={defaultOption}
      fetcher={fetcher}
      onChange={onCemeteryChange}
    />
  ) : null
}

export default CeremoniesDebtorsCemeterySelect
