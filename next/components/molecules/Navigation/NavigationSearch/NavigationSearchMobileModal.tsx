import { useTranslation } from 'next-i18next'

import { SearchData } from '../../../../hooks/useSearch'
import { AnimateHeight } from '../../../atoms/AnimateHeight'
import Button from '../../../atoms/Button'
import Modal, { ModalProps } from '../../../atoms/Modal'
import Search from '../../Search'
import NavigationSearchResults from './NavigationSearchResults'

type NavigationSearchMobileModalProps = {
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  data: SearchData | undefined | null
  emptySearchQuery: boolean
  isLoading: boolean
  onSearch: () => void
} & ModalProps

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

  const { t } = useTranslation('common', { keyPrefix: 'NavigationSearch' })

  return (
    <Modal
      centerVertically={false}
      overlayClassName="!w-full"
      showCloseButton={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex h-full w-full flex-col">
        <div className="z-50 flex w-full bg-primary py-3 pl-4">
          <Search
            value={searchQuery}
            onSearchQueryChange={onSearchQueryChange}
            className="flex-1"
            onSearch={onSearch}
          />
          <Button variant="plain-secondary" className="px-4 !text-white" onPress={onClose}>
            {t('close')}
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
