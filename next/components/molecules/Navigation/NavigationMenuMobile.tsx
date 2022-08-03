import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'

import ArrowBackIcon from '../../../assets/arrow_back.svg'
import ChevronIcon from '../../../assets/chevron_down.svg'
import CloseIcon from '../../../assets/close.svg'
import { usePrevious } from '../../../utils/hooks'
import IconButton from '../../atoms/IconButton'
import MLink from '../../atoms/MLink'
import { MenuItem } from '../Menu/Menu'

export type NavigationMenuMobileItem = {
  key: string
  label: string
  link: string
  items?: MenuItem[]
}

export type CurrentItem = {
  key: string
  label: string
  link: string
  items: NavigationMenuMobileItem[]
}

export type NavigationMenuMobileProps = {
  items: NavigationMenuMobileItem[]
  isOpen: boolean
  onClose: () => void
}

const RenderItems = ({
  items,
  onOpenItem,
  onClose,
  disableFocusAndScreenReader = false,
}: {
  items: NavigationMenuMobileItem[]
  onOpenItem?: (key: string) => void
  onClose?: () => void
  disableFocusAndScreenReader?: boolean
}) => {
  const ButtonComponent = disableFocusAndScreenReader ? 'div' : 'button'
  const LinkComponent = disableFocusAndScreenReader ? 'div' : MLink
  return (
    <div aria-hidden={disableFocusAndScreenReader} className="flex flex-col py-3">
      {items.map(({ key, label, link, items: subItems }) =>
        subItems && subItems.length > 0 ? (
          <ButtonComponent
            tabIndex={disableFocusAndScreenReader ? -1 : 0}
            key={key}
            onClick={() => onOpenItem && onOpenItem(key)}
            type="button"
            className="flex w-full justify-between px-4 py-3 focus:bg-primary/10"
          >
            <span className="font-semibold">{label}</span>
            <div className="-rotate-90">
              <ChevronIcon />
            </div>
          </ButtonComponent>
        ) : (
          <LinkComponent
            tabIndex={disableFocusAndScreenReader ? -1 : 0}
            onClick={onClose}
            key={key}
            noStyles
            href={link}
            className="flex w-full justify-between px-4 py-3 focus:bg-primary/10"
          >
            <span className="font-semibold">{label}</span>
          </LinkComponent>
        ),
      )}
    </div>
  )
}

const NavigationMenuMobile = ({ items, isOpen, onClose }: NavigationMenuMobileProps) => {
  const rootItem = useMemo(() => ({ key: 'root', label: '', link: '', items }), [items])

  const [currentItem, setCurrentItem] = useState<CurrentItem>(rootItem)
  const [treePreviousItem, setTreePreviousItem] = useState<CurrentItem>(rootItem)
  const [previousItem, setPreviousItem] = useState<CurrentItem>(rootItem)

  const [isAnimating, setAnimating] = useState<'forward' | 'back' | 'none'>('none')
  const previousAnimation = usePrevious(isAnimating)

  const openItemHandler = useCallback((itemKey: string) => {
    setCurrentItem((current) => {
      setAnimating('forward')
      setTimeout(() => {
        setAnimating('none')
      }, 100)
      const foundItem = current.items?.find((item) => item.key === itemKey)
      if (foundItem && foundItem.items) {
        setTreePreviousItem(current)
        setPreviousItem(current)
        return foundItem as CurrentItem
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
    <Dialog className="relative z-50" open={isOpen} onClose={closeHandler}>
      <Dialog.Panel className="fixed top-0 h-full w-full bg-white">
        {/* header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          {currentItem.key === rootItem.key ? (
            <div>{/* todo: add lang selector */}</div>
          ) : (
            <IconButton aria-label="spať" variant="tertiary" onClick={goBack}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <div className="font-bold">{currentItem.label}</div>
          <IconButton aria-label="zavrieť menu" variant="tertiary" onClick={closeHandler}>
            <CloseIcon width={24} height={24} />
          </IconButton>
        </div>

        {/* body */}
        <div className="relative">
          {/* previous menu list */}
          <motion.div
            className="absolute top-0 h-full w-full"
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
            <RenderItems disableFocusAndScreenReader items={previousItem.items} />
          </motion.div>

          {/* current menu list */}
          <motion.div
            className="relative z-20 h-full w-full overflow-auto bg-white"
            transition={{
              duration: isAnimating === 'none' ? 0.5 : 0,
            }}
            animate={{
              x: isAnimating === 'forward' ? '100%' : isAnimating === 'back' ? '-100%' : 0,
            }}
          >
            <RenderItems
              items={currentItem.items}
              onClose={closeHandler}
              onOpenItem={openItemHandler}
            />
          </motion.div>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}

export default NavigationMenuMobile
