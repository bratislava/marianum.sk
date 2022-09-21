import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { MeilisearchResultType } from '../../../../utils/types'
import { AnimateHeight } from '../../../atoms/AnimateHeight'
import Search from '../../Search'
import NavigationSearchResults from './NavigationSearchResults'

type NavigationSearchDesktopProps = {
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  results: MeilisearchResultType<string>[]
  isLoading: boolean
  onSearch: () => void
}

const NavigationSearchDesktop = ({
  searchQuery,
  onSearchQueryChange,
  results,
  isLoading,
  onSearch,
}: NavigationSearchDesktopProps) => {
  const [isOpen, setOpen] = useState(false)

  const ref = useRef(null)

  const { t } = useTranslation('common', {
    keyPrefix: 'components.molecules.Navigation.NavigationSearch',
  })

  useOnClickOutside(ref, () => setOpen(false))

  return (
    <div
      className={cx('relative w-72 text-foreground transition-all duration-500 ', {
        'w-[540px]': isOpen,
      })}
      ref={ref}
    >
      <Search
        className={cx('border-transparent', {
          'bg-white text-foreground': isOpen,
          'bg-white/20 text-white': !isOpen,
        })}
        inputClassName={cx({ 'placeholder:text-white': !isOpen })}
        value={searchQuery}
        onSearchQueryChange={onSearchQueryChange}
        onSearch={onSearch}
        onFocus={() => setOpen(true)}
        placeholder={t('search')}
      />
      <AnimateHeight
        isVisible={isOpen}
        className="absolute top-full z-50 mt-2 w-full bg-white shadow"
      >
        <NavigationSearchResults
          results={results}
          isLoading={isLoading}
          searchQuery={searchQuery}
        />
      </AnimateHeight>
    </div>
  )
}

export default NavigationSearchDesktop
