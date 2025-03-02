import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'
import { SingleValue } from 'react-select'

import Select, { SelectOption } from '@/components/atoms/Select'

export type Sort = 'newest' | 'oldest'

type SortSelectProps = {
  defaultOption: SelectOption
  onChange?: (option: SingleValue<SelectOption> | null) => void
}

const SortSelect = ({ defaultOption, onChange = () => {} }: SortSelectProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'SortSelect' })

  const options: SelectOption<Sort>[] = useMemo(
    () => [
      { value: 'newest', label: t('byNewest') },
      { value: 'oldest', label: t('byOldest') },
    ],
    [t],
  )

  return <Select options={options} onChange={onChange} defaultValue={defaultOption} />
}

export default SortSelect
