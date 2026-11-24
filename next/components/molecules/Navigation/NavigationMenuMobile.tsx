import { motion } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'

import { ArrowLeftIcon, ChevronDownIcon, CloseIcon } from '@/assets/icons'
import IconButton from '@/components/atoms/IconButton'
import MLink from '@/components/atoms/MLink'
import Modal from '@/components/atoms/Modal'
import { NavigationNode } from '@/services/navigation/NavigationProvider'
import cn from '@/utils/cn'
import { usePrevious } from '@/utils/usePrevious'

export type NavigationMenuMobileProps = {
  menu: NavigationNode[]
  isOpen: boolean
  onClose: () => void
}

type RenderItemsProps = {
  items: NavigationNode[]
  onOpenItem?: (slug: string) => void
  onClose?: () => void
  disableFocusAndScreenReader?: boolean
}

const RenderItems = ({
  items,
  onOpenItem,
  onClose,
  disableFocusAndScreenReader = false,
}: RenderItemsProps) => {
  const ButtonComponent = disableFocusAndScreenReader ? 'div' : 'button'
  const LinkComponent = disableFocusAndScreenReader ? 'div' : MLink

  return (
    <div aria-hidden={disableFocusAndScreenReader} className="flex flex-col py-3">
      {items.map(({ slug, title, path, children }) =>
        children.length > 0 ? (
          <ButtonComponent
            tabIndex={disableFocusAndScreenReader ? -1 : 0}
            key={slug}
            onMouseUp={() => onOpenItem && onOpenItem(slug)}
            type="button"
            className={cn('flex w-full justify-between px-4 py-3 active:bg-primary/10', {
              'base-focus-ring': !disableFocusAndScreenReader,
            })}
          >
            <span className="font-semibold">{title}</span>
            <div className="-rotate-90">
              <ChevronDownIcon />
            </div>
          </ButtonComponent>
        ) : (
          <LinkComponent
            tabIndex={disableFocusAndScreenReader ? -1 : 0}
            onClick={onClose}
            key={slug}
            noStyles={LinkComponent === 'div' ? undefined : true}
            href={path}
            className={cn('flex w-full justify-between px-4 py-3 active:bg-primary/10', {
              'base-focus-ring': !disableFocusAndScreenReader,
            })}
          >
            <span className="font-semibold">{title}</span>
          </LinkComponent>
        ),
      )}
    </div>
  )
}

const NavigationMenuMobile = ({ menu, isOpen, onClose }: NavigationMenuMobileProps) => {
  const rootItem = useMemo<NavigationNode>(
    () => ({ slug: '', title: '', path: '', children: menu }),
    [menu],
  )

  const [currentItem, setCurrentItem] = useState<NavigationNode>(rootItem)
  const [treePreviousItem, setTreePreviousItem] = useState<NavigationNode>(rootItem)
  const [previousItem, setPreviousItem] = useState<NavigationNode>(rootItem)

  const [isAnimating, setAnimating] = useState<'forward' | 'back' | 'none'>('none')
  const previousAnimation = usePrevious(isAnimating)

  const openItemHandler = useCallback((slug: string) => {
    setCurrentItem((current) => {
      setAnimating('forward')
      setTimeout(() => {
        setAnimating('none')
      }, 100)
      const foundItem = current.children.find((item) => item.slug === slug)
      if (foundItem && foundItem.children.length > 0) {
        setTreePreviousItem(current)
        setPreviousItem(current)

        return foundItem
      }

      return current
    })
  }, [])

  const goBack = useCallback(() => {
    setAnimating('back')
    setTimeout(() => {
      setAnimating('none')
    }, 100)
    setCurrentItem(treePreviousItem)
    setTreePreviousItem(rootItem)
    setPreviousItem(currentItem)
  }, [treePreviousItem, rootItem, currentItem])

  const closeHandler = useCallback(() => {
    setCurrentItem(rootItem)
    setTreePreviousItem(rootItem)
    setPreviousItem(rootItem)
    onClose()
  }, [rootItem, onClose])

  return (
    <Modal
      overlayClassName="w-full!"
      showCloseButton={false}
      isOpen={isOpen}
      onClose={closeHandler}
    >
      <div className="fixed top-0 size-full bg-white">
        {/* header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          {currentItem.slug === rootItem.slug ? (
            <div>{/* todo: add lang selector */}</div>
          ) : (
            <IconButton aria-label="späť" variant="tertiary" onPress={goBack}>
              <ArrowLeftIcon />
            </IconButton>
          )}
          <div className="font-bold">{currentItem.title}</div>
          <IconButton aria-label="zavrieť menu" variant="tertiary" onPress={closeHandler}>
            <CloseIcon width={24} height={24} />
          </IconButton>
        </div>

        {/* body */}
        <nav className="relative">
          {/* previous menu list */}
          <motion.div
            className="absolute top-0 size-full"
            transition={{
              duration: isAnimating === 'none' ? 0.5 : 0,
            }}
            animate={{
              x:
                previousAnimation === 'forward'
                  ? '-100%'
                  : previousAnimation === 'back'
                    ? '100%'
                    : 0,
            }}
          >
            <RenderItems disableFocusAndScreenReader items={previousItem.children} />
          </motion.div>

          {/* current menu list */}
          <motion.div
            className="relative z-20 size-full overflow-auto bg-white"
            transition={{
              duration: isAnimating === 'none' ? 0.5 : 0,
            }}
            animate={{
              x: isAnimating === 'forward' ? '100%' : isAnimating === 'back' ? '-100%' : 0,
            }}
          >
            <RenderItems
              items={currentItem.children}
              onClose={closeHandler}
              onOpenItem={openItemHandler}
            />
          </motion.div>
        </nav>
      </div>
    </Modal>
  )
}

export default NavigationMenuMobile
