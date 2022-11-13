import { CloseCircleIcon, SearchIcon } from '@assets/icons'
import { useTranslation } from 'next-i18next'

import TextField from '../atoms/TextField'

export type FilteringSearchInputProps = {
  value: string
  onChange: (value: string) => void
}

const FilteringSearchInput = ({ value, onChange }: FilteringSearchInputProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'SearchField' })

  const handleCancelClick = () => {
    onChange('')
  }

  return (
    <TextField
      id="with-text-left-icon"
      value={value}
      leftSlot={<SearchIcon />}
      rightSlot={
        value ? (
          <button type="button" className="p-2" onClick={handleCancelClick}>
            <CloseCircleIcon />
          </button>
        ) : null
      }
      placeholder={t('searchPlaceholder')}
      aria-label={t('aria.searchField')}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default FilteringSearchInput
