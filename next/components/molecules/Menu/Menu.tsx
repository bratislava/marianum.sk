import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { FC, ReactNode, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import ChevronIcon from '../../../assets/chevron_right.svg'
import { AnimateHeight } from '../../atoms/AnimateHeight'
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
              className="w-full  font-semibold shadow outline-none"
              style={{ width: `${width ?? 0}px` }}
            >
              <AnimateHeight isVisible={isOpen}>
                {isOpen && (
                  <div className="bg-white py-3">
                    {items.map(({ key, label, link, items: subItems }) =>
                      subItems && subItems.length > 0 ? (
                        <SubMenu key={key} items={subItems}>
                          <a href={link} className="flex w-full justify-between px-6 py-3">
                            <span>{label}</span>
                            <ChevronIcon />
                          </a>
                        </SubMenu>
                      ) : (
                        <DropdownMenu.Item key={key} asChild>
                          <a
                            className="flex w-full justify-between px-6 py-3 outline-none transition-all focus:bg-primary/10"
                            href={link}
                          >
                            {label}
                          </a>
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
