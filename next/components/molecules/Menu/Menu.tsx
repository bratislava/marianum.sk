import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import cx from 'classnames'
import { FC, ReactNode } from 'react'
import { useResizeDetector } from 'react-resize-detector'

// import { useResizeDetector } from 'react-resize-detector'
import ChevronIcon from '../../../assets/chevron_right.svg'
import SubMenu, { SubMenuItem } from './SubMenu'

export type MenuItem = {
  key: string
  label: string
  link: string
  items?: SubMenuItem[]
}

export type MenuProps = {
  children: ReactNode | FC<{ open: boolean }>
  items?: MenuItem[]
}

const Menu = ({ children: Children, items = [] }: MenuProps) => {
  const { ref: triggerRef, width } = useResizeDetector()

  return (
    <DropdownMenu.Root>
      <div className="relative w-full">
        <DropdownMenu.Trigger
          className="group h-full w-full outline-none transition-all focus:bg-primary/20 radix-state-open:bg-primary/20"
          ref={triggerRef}
        >
          {typeof Children === 'function' ? <Children open /> : Children}
        </DropdownMenu.Trigger>

        {items.length > 0 && (
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={8}
              className="w-full bg-white py-3 font-semibold shadow outline-none"
              style={{ width: `${width ?? 0}px` }}
            >
              {items.map(({ key, label, link, items: subItems }) =>
                subItems && subItems.length > 0 ? (
                  <SubMenu key={key} items={subItems}>
                    <a
                      href={link}
                      className={cx('flex w-full justify-between px-6 py-3', {
                        'bg-primary/20': false,
                      })}
                    >
                      <span>{label}</span>
                      <div className="transition-transform group-radix-state-open:rotate-180">
                        <ChevronIcon />
                      </div>
                    </a>
                  </SubMenu>
                ) : (
                  <DropdownMenu.Item key={key} asChild>
                    <a
                      className="flex w-full justify-between px-6 py-3 outline-none transition-all focus:bg-primary/20"
                      href={link}
                    >
                      {label}
                    </a>
                  </DropdownMenu.Item>
                ),
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </div>
    </DropdownMenu.Root>
  )
}

export default Menu
