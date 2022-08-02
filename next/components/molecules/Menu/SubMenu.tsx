import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ReactNode } from 'react'
import { useResizeDetector } from 'react-resize-detector'

export type SubMenuItem = {
  key: string
  label: string
  link: string
}

export type MenuProps = {
  children: ReactNode
  items?: SubMenuItem[]
}

const SubMenu = ({ children, items = [] }: MenuProps) => {
  const { ref: triggerRef, width } = useResizeDetector()

  return (
    <DropdownMenu.Sub>
      <div className="relative w-full">
        <div className="h-full w-full">
          <DropdownMenu.SubTrigger
            onMouseDown={(e) => e.preventDefault()}
            ref={triggerRef}
            className="group h-full w-full outline-none transition-all focus:bg-primary/20 radix-state-open:bg-primary/20"
          >
            {children}
          </DropdownMenu.SubTrigger>
        </div>

        {items.length > 0 && (
          <DropdownMenu.Portal>
            <DropdownMenu.SubContent
              loop
              sideOffset={8}
              className="-mt-3 w-full bg-white py-3 font-semibold shadow outline-none"
              style={{ width: `${width ?? 0}px` }}
            >
              {items.map(({ key, label, link }) => (
                <DropdownMenu.Item key={key} asChild>
                  <a
                    className="flex w-full justify-between px-6 py-3 outline-none focus:bg-primary/20"
                    href={link}
                  >
                    {label}
                  </a>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        )}
      </div>
    </DropdownMenu.Sub>
  )
}

export default SubMenu
