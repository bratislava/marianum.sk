import { useEffect, useState } from 'react'
import { useFocusWithin } from 'react-aria'

import { AnimateHeight } from '@/components/atoms/AnimateHeight'
import NavigationSearchResults from '@/components/molecules/Navigation/NavigationSearch/NavigationSearchResults'
import Search from '@/components/molecules/Search'
import cn from '@/utils/cn'
import { SearchData } from '@/utils/useSearch'

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

  useEffect(() => {
    if (isOpen) onOpen()
    if (!isOpen) onClose()
  }, [isOpen, onClose, onOpen])

  const { focusWithinProps } = useFocusWithin({
    onBlurWithin: () => setOpen(false),
  })

  return (
    <div
      className={cn('relative w-72 text-foreground transition-all duration-500', {
        'w-[540px]': isOpen,
      })}
      {...focusWithinProps}
    >
      <Search
        className={cn('border-transparent', {
          'bg-white text-foreground': isOpen,
          'bg-white/20 text-white': !isOpen,
        })}
        inputClassName={cn({ 'placeholder:text-white': !isOpen })}
        value={searchQuery}
        onSearchQueryChange={onSearchQueryChange}
        onSearch={onSearch}
        onFocus={() => setOpen(true)}
      />
      <AnimateHeight
        isVisible={isOpen}
        className="absolute top-full z-50 mt-2 w-full bg-white shadow"
      >
        {emptySearchQuery ? null : (
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          <NavigationSearchResults data={data!} isLoading={isLoading} searchQuery={searchQuery} />
        )}
      </AnimateHeight>
    </div>
  )
}

export default NavigationSearchDesktop
