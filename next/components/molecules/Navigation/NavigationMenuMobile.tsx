import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'

import ArrowBackIcon from '../../../assets/arrow_back.svg'
import ChevronIcon from '../../../assets/chevron_down.svg'
import CloseIcon from '../../../assets/close.svg'
import { NavigationItemFragment } from '../../../graphql'
import { usePrevious } from '../../../utils/hooks'
import { isDefined } from '../../../utils/isDefined'
import IconButton from '../../atoms/IconButton'
import MLink from '../../atoms/MLink'

export type NavigationMenuMobileProps = {
  items: NavigationItemFragment[]
  isOpen: boolean
  onClose: () => void
}

type RenderItemsProps = {
  items: NavigationItemFragment[]
  onOpenItem?: (key: number) => void
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
      {items.map(({ id, title, path, items: subItems }) =>
        subItems && subItems.length > 0 ? (
          <ButtonComponent
            tabIndex={disableFocusAndScreenReader ? -1 : 0}
            key={id}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            onClick={() => onOpenItem && onOpenItem(id)}
            type="button"
            className="flex w-full justify-between px-4 py-3 focus:bg-primary/10"
          >
            <span className="font-semibold">{title}</span>
            <div className="-rotate-90">
              <ChevronIcon />
            </div>
          </ButtonComponent>
        ) : (
          <LinkComponent
            tabIndex={disableFocusAndScreenReader ? -1 : 0}
            onClick={onClose}
            key={id}
            noStyles
            href={path ?? ''}
            className="flex w-full justify-between px-4 py-3 focus:bg-primary/10"
          >
            <span className="font-semibold">{title}</span>
          </LinkComponent>
        ),
      )}
    </div>
  )
}

const NavigationMenuMobile = ({ items, isOpen, onClose }: NavigationMenuMobileProps) => {
  const rootItem = useMemo<NavigationItemFragment>(
    () => ({ id: 0, title: '', path: '', items } as NavigationItemFragment),
    [items],
  )

  const [currentItem, setCurrentItem] = useState<NavigationItemFragment>(rootItem)
  const [treePreviousItem, setTreePreviousItem] = useState<NavigationItemFragment>(rootItem)
  const [previousItem, setPreviousItem] = useState<NavigationItemFragment>(rootItem)

  const [isAnimating, setAnimating] = useState<'forward' | 'back' | 'none'>('none')
  const previousAnimation = usePrevious(isAnimating)

  const openItemHandler = useCallback((itemId: number) => {
    setCurrentItem((current) => {
      setAnimating('forward')
      setTimeout(() => {
        setAnimating('none')
      }, 100)
      const foundItem = current.items?.find((item) => item?.id === itemId)
      if (foundItem && foundItem.items) {
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
    <Dialog className="relative z-50" open={isOpen} onClose={closeHandler}>
      <Dialog.Panel className="fixed top-0 h-full w-full bg-white">
        {/* header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          {currentItem.id === rootItem.id ? (
            <div>{/* todo: add lang selector */}</div>
          ) : (
            <IconButton aria-label="spať" variant="tertiary" onClick={goBack}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <div className="font-bold">{currentItem.title}</div>
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
            <RenderItems
              disableFocusAndScreenReader
              items={previousItem.items?.filter(isDefined) ?? []}
            />
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
              items={currentItem.items?.filter(isDefined) ?? []}
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
