import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { SearchData } from '../../../../hooks/useSearch'
import { AnimateHeight } from '../../../atoms/AnimateHeight'
import Search from '../../Search'
import NavigationSearchResults from './NavigationSearchResults'

type NavigationSearchDesktopProps = {
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  data: SearchData | undefined | null
  isLoading: boolean
  emptySearchQuery: boolean
  onSearch: () => void
  onOpen: () => void
  onClose: () => void
}

const NavigationSearchDesktop = ({
  searchQuery,
  onSearchQueryChange,
  data,
  isLoading,
  emptySearchQuery,
  onSearch,
  onOpen,
  onClose,
}: NavigationSearchDesktopProps) => {
  const [isOpen, setOpen] = useState(false)

  const ref = useRef(null)

  const { t } = useTranslation('common', {
    keyPrefix: 'components.molecules.Navigation.NavigationSearch',
  })

  useEffect(() => {
    if (isOpen) onOpen()
    if (!isOpen) onClose()
  }, [isOpen, onClose, onOpen])

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
        {!emptySearchQuery ? (
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          <NavigationSearchResults data={data!} isLoading={isLoading} searchQuery={searchQuery} />
        ) : null}
      </AnimateHeight>
    </div>
  )
}

export default NavigationSearchDesktop
