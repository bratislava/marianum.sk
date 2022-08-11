import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import cx from 'classnames'
import { FC, MouseEvent, ReactNode, useCallback, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import { NavigationItemFragment } from '../../../graphql'
import { AnimateHeight } from '../../atoms/AnimateHeight'
import MLink from '../../atoms/MLink'

export type MenuProps = {
  children: ReactNode | FC<{ isOpen: boolean }>
  items?: NavigationItemFragment[]
  onTriggerClick?: () => void
}

const SubMenu = ({ children, items = [], onTriggerClick }: MenuProps) => {
  const { ref: triggerRef, width } = useResizeDetector()

  const [isOpen, setOpen] = useState(false)

  const triggerClickHandler = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()
      if (onTriggerClick) onTriggerClick()
    },
    [onTriggerClick],
  )

  return (
    <DropdownMenu.Sub onOpenChange={setOpen}>
      <div className="relative w-full">
        <div className="h-full w-full">
          <DropdownMenu.SubTrigger
            onMouseDown={triggerClickHandler}
            ref={triggerRef}
            className={cx('group h-full w-full outline-none transition-all focus:bg-primary/10', {
              'bg-primary/10': isOpen,
            })}
          >
            {typeof children === 'function' ? children({ isOpen }) : children}
          </DropdownMenu.SubTrigger>
        </div>

        {items.length > 0 && (
          <DropdownMenu.Portal>
            <DropdownMenu.SubContent
              loop
              sideOffset={8}
              className="-mt-3 w-full font-semibold shadow outline-none"
              style={{ width: `${width ?? 0}px` }}
            >
              <AnimateHeight isVisible={isOpen}>
                {isOpen && (
                  <div className="bg-white py-3">
                    {items.map(({ id, title, path }) => (
                      <DropdownMenu.Item key={id} asChild>
                        <MLink
                          noStyles
                          className="flex w-full justify-between px-6 py-3 outline-none focus:bg-primary/10"
                          href={path ?? ''}
                        >
                          {title}
                        </MLink>
                      </DropdownMenu.Item>
                    ))}
                  </div>
                )}
              </AnimateHeight>
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        )}
      </div>
    </DropdownMenu.Sub>
  )
}

export default SubMenu
