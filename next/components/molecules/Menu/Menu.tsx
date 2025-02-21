import '@szhsin/react-menu/dist/core.css'

import { ControlledMenu as ReactControlledMenu, useMenuState } from '@szhsin/react-menu'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { KeyboardEvent, useEffect } from 'react'

import { ChevronDownIcon } from '@/assets/icons'
import MLink from '@/components/atoms/MLink'
import MenuLeaf from '@/components/molecules/Menu/MenuLeaf'
import SubMenu from '@/components/molecules/Menu/SubMenu'
import { NavigationItemFragment } from '@/graphql'

export type MenuProps = Pick<NavigationItemFragment, 'title' | 'path' | 'items'>

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
    <div className="relative h-full w-full" onPointerLeave={() => toggleMenu(false)}>
      <MLink
        onKeyDown={handleKeyDown}
        noStyles
        href={path ?? ''}
        className={cx(
          'flex h-full w-full items-center justify-center font-semibold outline-none transition-all focus:bg-primary/10',
          { 'bg-primary/10': isOpen },
        )}
        onPointerEnter={() => toggleMenu(true)}
      >
        <div className={cx('flex h-full flex-1 items-center justify-center gap-1 px-4')}>
          <span>{title}</span>
          <ChevronDownIcon />
        </div>
      </MLink>

      <ReactControlledMenu className="py-3" onClose={() => toggleMenu(false)} {...menuProps}>
        {/* For some reason `offsetY` doesn't work on the element above. */}
        <div className="mt-3">
          <div className="bg-white py-3 text-foreground shadow-card">
            {items?.map(
              (item) =>
                item &&
                (item.items?.length ? (
                  <SubMenu path={item.path} key={item.id} title={item.title} items={item.items} />
                ) : (
                  <MenuLeaf path={item.path ?? ''} title={item.title} key={item.id} />
                )),
            )}
          </div>
        </div>
      </ReactControlledMenu>
    </div>
  )
}

export default Menu
