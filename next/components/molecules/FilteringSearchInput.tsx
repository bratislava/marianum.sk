import { useTranslation } from 'next-i18next'

import SearchIcon from '../../assets/search.svg'
import XIcon from '../../assets/x-alt.svg'
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
            <XIcon />
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
