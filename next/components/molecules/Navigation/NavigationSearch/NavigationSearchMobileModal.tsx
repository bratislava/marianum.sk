import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AriaOverlayProps, FocusScope, OverlayContainer, useModal, useOverlay } from 'react-aria'

import { MeilisearchResultType } from '../../../../utils/types'
import { AnimateHeight } from '../../../atoms/AnimateHeight'
import Button from '../../../atoms/Button'
import MLink from '../../../atoms/MLink'
import Spinner from '../../../atoms/Spinner'
import Search from '../../Search'

type NavigationSearchMobileModalProps = {
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  results: MeilisearchResultType<string>[]
  isLoading: boolean
} & AriaOverlayProps

const NavigationSearchMobileModal = (props: NavigationSearchMobileModalProps) => {
  const { isOpen, onClose, searchQuery, onSearchQueryChange, results, isLoading } = props
  const { t } = useTranslation('common', {
    keyPrefix: 'components.molecules.Navigation.NavigationSearch',
  })

  const { t: searchPagePathsT } = useTranslation('common', {
    keyPrefix: 'pages.search.paths',
  })

  const ref = useRef<HTMLDivElement | null>(null)

  const { overlayProps, underlayProps } = useOverlay(props, ref)

  const { modalProps } = useModal()

  // workaround because react-aria OverlayContainers uses DOM
  const [isBrowser, setBrowser] = useState(false)
  useEffect(() => {
    setBrowser(true)
  }, [])

  const router = useRouter()

  const handleSearch = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(`/search?query=${searchQuery}`)
  }, [router, searchQuery])

  return isBrowser ? (
    <OverlayContainer>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FocusScope autoFocus contain restoreFocus>
              <div {...underlayProps} className="fixed inset-0 z-50 flex flex-col bg-black/40">
                <div
                  className="z-50 flex w-full bg-primary py-3 pl-4"
                  {...overlayProps}
                  {...modalProps}
                  ref={ref}
                >
                  <Search
                    value={searchQuery}
                    onSearchQueryChange={onSearchQueryChange}
                    className="flex-1"
                    onSearch={handleSearch}
                  />
                  <Button variant="plain-secondary" className="px-4 !text-white" onPress={onClose}>
                    {t('close')}
                  </Button>
                </div>
                <AnimateHeight isVisible className="bg-white">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-4 text-primary">
                      <motion.div animate={{ scale: 1 }} initial={{ scale: 0 }}>
                        <Spinner className="h-8 w-8" />
                      </motion.div>
                    </div>
                  ) : results.length > 0 ? (
                    <div className="flex flex-col py-2">
                      {results.map(({ slug, title, index }) => (
                        <MLink
                          noStyles
                          // eslint-disable-next-line sonarjs/no-nested-template-literals, @typescript-eslint/restrict-template-expressions
                          href={`${searchPagePathsT(index)}/${slug ?? ''}`}
                          key={`${index}-${slug}`}
                          className="px-4 py-2 text-[14px]"
                        >
                          {title}
                        </MLink>
                      ))}
                      <MLink
                        className="!justify-start px-4 py-2"
                        href={`/search?query=${searchQuery}`}
                      >
                        {t('allResults')}
                      </MLink>
                    </div>
                  ) : null}
                </AnimateHeight>
              </div>
            </FocusScope>
          </motion.div>
        )}
      </AnimatePresence>
    </OverlayContainer>
  ) : null
}

export default NavigationSearchMobileModal
