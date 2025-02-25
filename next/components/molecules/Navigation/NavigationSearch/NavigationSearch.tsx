import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import NavigationSearchDesktop from '@/components/molecules/Navigation/NavigationSearch/NavigationSearchDesktop'
import NavigationSearchMobile from '@/components/molecules/Navigation/NavigationSearch/NavigationSearchMobile'
import { useSearch } from '@/utils/useSearch'

type NavigationSearchProps = {
  onDesktopSearchOpen: () => void
  onDesktopSearchClose: () => void
}

const NavigationSearch = ({ onDesktopSearchOpen, onDesktopSearchClose }: NavigationSearchProps) => {
  const {
    dataToDisplay,
    emptySearchQuery,
    searchQuery,
    setSearchQuery,
    loadingAndNoDataToDisplay,
  } = useSearch({
    filters: { pageSize: 5, page: 1, selectedTypes: [] },
  })

  const router = useRouter()

  const { t: pathsT } = useTranslation('common', { keyPrefix: 'paths' })

  const handleSearch = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises,@typescript-eslint/restrict-template-expressions
    router.push(`${pathsT('search')}?query=${searchQuery ?? ''}`)
  }, [router, searchQuery, pathsT])

  return (
    <>
      <div className="md:hidden">
        <NavigationSearchMobile
          searchQuery={searchQuery ?? ''}
          onSearchQueryChange={setSearchQuery}
          data={dataToDisplay}
          emptySearchQuery={emptySearchQuery}
          isLoading={loadingAndNoDataToDisplay}
          onSearch={handleSearch}
        />
      </div>

      <div className="hidden md:flex">
        <NavigationSearchDesktop
          searchQuery={searchQuery ?? ''}
          onSearchQueryChange={setSearchQuery}
          data={dataToDisplay}
          emptySearchQuery={emptySearchQuery}
          isLoading={loadingAndNoDataToDisplay}
          onSearch={handleSearch}
          onOpen={onDesktopSearchOpen}
          onClose={onDesktopSearchClose}
        />
      </div>
    </>
  )
}

export default NavigationSearch
