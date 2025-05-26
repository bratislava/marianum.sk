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
  const { data, emptySearchQuery, searchQuery, setSearchQuery, isPending } = useSearch({
    filters: { pageSize: 5, page: 1, selectedTypes: [] },
  })

  const router = useRouter()

  const { t } = useTranslation()

  const handleSearch = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises,@typescript-eslint/restrict-template-expressions
    router.push(`${t('paths.search')}?query=${searchQuery ?? ''}`)
  }, [router, searchQuery, t])

  return (
    <>
      <div className="md:hidden">
        <NavigationSearchMobile
          searchQuery={searchQuery ?? ''}
          onSearchQueryChange={setSearchQuery}
          data={data}
          emptySearchQuery={emptySearchQuery}
          isLoading={isPending}
          onSearch={handleSearch}
        />
      </div>

      <div className="hidden md:flex">
        <NavigationSearchDesktop
          searchQuery={searchQuery ?? ''}
          onSearchQueryChange={setSearchQuery}
          data={data}
          emptySearchQuery={emptySearchQuery}
          isLoading={isPending}
          onSearch={handleSearch}
          onOpen={onDesktopSearchOpen}
          onClose={onDesktopSearchClose}
        />
      </div>
    </>
  )
}

export default NavigationSearch
