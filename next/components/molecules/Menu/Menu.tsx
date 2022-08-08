import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { FC, ReactNode, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import ChevronIcon from '../../../assets/chevron_down.svg'
import { NavigationItemFragment } from '../../../graphql'
import { isDefined } from '../../../utils/isDefined'
import { AnimateHeight } from '../../atoms/AnimateHeight'
import MLink from '../../atoms/MLink'
import SubMenu from './SubMenu'

export type MenuProps = {
  children: ReactNode | FC<{ isOpen: boolean }>
  items?: NavigationItemFragment[]
}

const Menu = ({ children, items = [] }: MenuProps) => {
  const { ref: triggerRef, width } = useResizeDetector()

  const [isOpen, setOpen] = useState(false)

  return (
    <DropdownMenu.Root onOpenChange={setOpen}>
      <div className="relative w-full">
        <DropdownMenu.Trigger className="group h-full w-full outline-none" ref={triggerRef}>
          {typeof children === 'function' ? children({ isOpen }) : children}
        </DropdownMenu.Trigger>

        {items.length > 0 && (
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              loop
              sideOffset={8}
              className="w-full bg-white font-semibold shadow outline-none"
              style={{ width: `${width ?? 0}px` }}
            >
              <AnimateHeight isVisible={isOpen}>
                {isOpen && (
                  <div className="py-3 text-foreground">
                    {items.map(({ id, title, path, items: subItems }) =>
                      subItems && subItems.length > 0 ? (
                        // type === 'WRAPPER' ? (
                        <SubMenu
                          onTriggerClick={() => setOpen(false)}
                          key={id}
                          items={subItems?.filter(isDefined)}
                        >
                          <MLink
                            noStyles
                            href={path ?? ''}
                            className="flex w-full justify-between px-6 py-3"
                          >
                            <span>{title}</span>
                            <div className="-rotate-90">
                              <ChevronIcon />
                            </div>
                          </MLink>
                        </SubMenu>
                      ) : (
                        <DropdownMenu.Item key={id} asChild>
                          <MLink
                            noStyles
                            className="flex w-full justify-between px-6 py-3 outline-none transition-all focus:bg-primary/10"
                            href={path ?? ''}
                          >
                            {title}
                          </MLink>
                        </DropdownMenu.Item>
                      ),
                    )}
                  </div>
                )}
              </AnimateHeight>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </div>
    </DropdownMenu.Root>
  )
}

export default Menu
