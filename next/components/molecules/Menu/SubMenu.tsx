import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import cx from 'classnames'
import { FC, ReactNode, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import { AnimateHeight } from '../../atoms/AnimateHeight'

export type SubMenuItem = {
  key: string
  label: string
  link: string
}

export type MenuProps = {
  children: ReactNode | FC<{ isOpen: boolean }>
  items?: SubMenuItem[]
}

const SubMenu = ({ children, items = [] }: MenuProps) => {
  const { ref: triggerRef, width } = useResizeDetector()

  const [isOpen, setOpen] = useState(false)

  return (
    <DropdownMenu.Sub onOpenChange={setOpen}>
      <div className="relative w-full">
        <div className="h-full w-full">
          <DropdownMenu.SubTrigger
            onMouseDown={(e) => e.preventDefault()}
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
                    {items.map(({ key, label, link }) => (
                      <DropdownMenu.Item key={key} asChild>
                        <a
                          className="flex w-full justify-between px-6 py-3 outline-none focus:bg-primary/10"
                          href={link}
                        >
                          {label}
                        </a>
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
