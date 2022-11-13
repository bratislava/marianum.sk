import { SearchData } from '@utils/useSearch'
import { useState } from 'react'

import NavigationSearchMobileModal from './NavigationSearchMobileModal'
import NavigationSearchMobileTrigger from './NavigationSearchMobileTrigger'

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
