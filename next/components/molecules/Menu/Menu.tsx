import '@szhsin/react-menu/dist/core.css'

import { ControlledMenu as ReactControlledMenu, useMenuState } from '@szhsin/react-menu'
import { useRouter } from 'next/router'
import { KeyboardEvent, useEffect } from 'react'

import { ChevronDownIcon } from '@/assets/icons'
import MLink from '@/components/atoms/MLink'
import MenuLeaf from '@/components/molecules/Menu/MenuLeaf'
import SubMenu from '@/components/molecules/Menu/SubMenu'
import { NavigationNode } from '@/services/navigation/NavigationProvider'
import cn from '@/utils/cn'

export type MenuProps = Pick<NavigationNode, 'title' | 'path'> & { items: NavigationNode[] }

const Menu = ({ items, title, path }: MenuProps) => {
  const router = useRouter()

  const [menuProps, toggleMenu] = useMenuState({})

  const isOpen = menuProps.state === 'opening' || menuProps.state === 'open'

  // close menu on route change
  useEffect(() => {
    toggleMenu(false)
  }, [router.asPath, toggleMenu])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault()
      toggleMenu(true)
    }
  }

  return (
    <div className="relative size-full" onPointerLeave={() => toggleMenu(false)}>
      <MLink
        onKeyDown={handleKeyDown}
        noStyles
        href={path}
        className={cn(
          'flex h-full w-full items-center justify-center font-semibold ring-inset ring-offset-0 transition-all',
          { 'bg-primary/10': isOpen },
        )}
        onPointerEnter={() => toggleMenu(true)}
      >
        <div className="flex h-full flex-1 items-center justify-center gap-1 px-4">
          <span>{title}</span>
          <ChevronDownIcon />
        </div>
      </MLink>

      <ReactControlledMenu className="py-3" onClose={() => toggleMenu(false)} {...menuProps}>
        {/* For some reason `offsetY` doesn't work on the element above. */}
        <div className="mt-3">
          <div className="bg-white py-3 text-foreground shadow-card">
            {items.map((item) =>
              item.children.length > 0 ? (
                <SubMenu path={item.path} key={item.slug} title={item.title} items={item.children} />
              ) : (
                <MenuLeaf path={item.path} title={item.title} key={item.slug} />
              ),
            )}
          </div>
        </div>
      </ReactControlledMenu>
    </div>
  )
}

export default Menu
