import { useTranslation } from 'next-i18next'

import { AnimateHeight } from '@/components/atoms/AnimateHeight'
import Button from '@/components/atoms/Button'
import Modal, { ModalProps } from '@/components/atoms/Modal'
import NavigationSearchResults from '@/components/molecules/Navigation/NavigationSearch/NavigationSearchResults'
import Search from '@/components/molecules/Search'
import { SearchData } from '@/utils/useSearch'

type NavigationSearchMobileModalProps = {
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  data: SearchData | undefined | null
  emptySearchQuery: boolean
  isLoading: boolean
  onSearch: () => void
} & Omit<ModalProps, 'children'>

const NavigationSearchMobileModal = (props: NavigationSearchMobileModalProps) => {
  const {
    isOpen,
    onClose,
    searchQuery,
    onSearchQueryChange,
    data,
    isLoading,
    emptySearchQuery,
    onSearch,
  } = props

  const { t } = useTranslation('common')

  return (
    <Modal
      centerVertically={false}
      overlayClassName="!w-full"
      showCloseButton={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex size-full flex-col">
        <div className="z-50 flex w-full bg-primary py-3 pl-4">
          <Search
            value={searchQuery}
            onSearchQueryChange={onSearchQueryChange}
            className="flex-1"
            onSearch={onSearch}
          />
          <Button variant="plain-secondary" className="px-4 !text-white" onPress={onClose}>
            {t('NavigationSearch.close')}
          </Button>
        </div>
        <AnimateHeight className="bg-white" isVisible>
          {emptySearchQuery ? null : (
            <NavigationSearchResults
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              data={data!}
              isLoading={isLoading}
              searchQuery={searchQuery}
            />
          )}
        </AnimateHeight>
      </div>
    </Modal>
  )
}

export default NavigationSearchMobileModal
