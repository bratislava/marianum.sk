import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { FC, ReactNode, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import ChevronIcon from '../../../assets/chevron_down.svg'
import { AnimateHeight } from '../../atoms/AnimateHeight'
import MLink from '../../atoms/MLink'
import SubMenu, { SubMenuItem } from './SubMenu'

export type MenuItem = {
  key: string
  label: string
  link: string
  items?: SubMenuItem[]
}

export type MenuProps = {
  children: ReactNode | FC<{ isOpen: boolean }>
  items?: MenuItem[]
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
                  <div className="py-3">
                    {items.map(({ key, label, link, items: subItems }) =>
                      subItems && subItems.length > 0 ? (
                        <SubMenu onTriggerClick={() => setOpen(false)} key={key} items={subItems}>
                          <MLink
                            noStyles
                            href={link}
                            className="flex w-full justify-between px-6 py-3"
                          >
                            <span>{label}</span>
                            <div className="-rotate-90">
                              <ChevronIcon />
                            </div>
                          </MLink>
                        </SubMenu>
                      ) : (
                        <DropdownMenu.Item key={key} asChild>
                          <MLink
                            noStyles
                            className="flex w-full justify-between px-6 py-3 outline-none transition-all focus:bg-primary/10"
                            href={link}
                          >
                            {label}
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
