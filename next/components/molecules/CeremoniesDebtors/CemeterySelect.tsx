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
  type: 'ceremonies' | 'debtors'
  onCemeteryChange: (id: string) => void
}

const CeremoniesDebtorsCemeterySelect = ({
  type,
  onCemeteryChange = () => {},
}: CeremoniesDebtorsCemeterySelectProps) => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'CemeterySelect' })

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

  const defaultOption = useMemo(() => ({ value: 'all', label: t('allCemeteries') }), [t])

  return fetcher ? (
    <SelectWithFetcher
      swrKey={swrKey}
      defaultOption={defaultOption}
      fetcher={fetcher}
      onChange={(selection: string) => {
        onCemeteryChange(selection)
      }}
    />
  ) : null
}

export default CeremoniesDebtorsCemeterySelect
