import NavigationSearchMobileModal from '@components/molecules/Navigation/NavigationSearch/NavigationSearchMobileModal'
import NavigationSearchMobileTrigger from '@components/molecules/Navigation/NavigationSearch/NavigationSearchMobileTrigger'
import { SearchData } from '@utils/useSearch'
import { useState } from 'react'

type NavigationSearchMobileProps = {
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  data: SearchData | undefined | null
  emptySearchQuery: boolean
  isLoading: boolean
  onSearch: () => void
}

const NavigationSearchMobile = ({
  searchQuery,
  onSearchQueryChange,
  data,
  emptySearchQuery,
  isLoading,
  onSearch,
}: NavigationSearchMobileProps) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <NavigationSearchMobileTrigger onPress={() => setOpen(!isOpen)} />
      <NavigationSearchMobileModal
        searchQuery={searchQuery}
        onSearchQueryChange={onSearchQueryChange}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        emptySearchQuery={emptySearchQuery}
        data={data}
        isLoading={isLoading}
        onSearch={onSearch}
      />
    </>
  )
}

export default NavigationSearchMobile
