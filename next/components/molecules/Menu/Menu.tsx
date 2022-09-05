import { ControlledMenu as ReactControlledMenu, useMenuState } from '@szhsin/react-menu'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { KeyboardEvent, useCallback, useEffect, useMemo } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import ChevronIcon from '../../../assets/chevron_down.svg'
import { MenuItemType } from '../../../utils/types'
import { AnimateHeight } from '../../atoms/AnimateHeight'
import MLink from '../../atoms/MLink'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

export type MenuProps<T> = {
  title: string
  path?: string | null
  items?: (T | null | undefined)[] | null
}

const Menu = <T extends MenuItemType<T>>({ items, title, path }: MenuProps<T>) => {
  const { ref, width } = useResizeDetector()
  const [menuProps, toggleMenu] = useMenuState({})

  const router = useRouter()

  const isOpen = useMemo(
    () => menuProps.state === 'opening' || menuProps.state === 'open',
    [menuProps.state],
  )

  // close menu on route change
  useEffect(() => {
    toggleMenu(false)
  }, [router.asPath, toggleMenu])

  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault()
        toggleMenu(true)
      }
    },
    [toggleMenu],
  )

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => toggleMenu(true)}
      // onMouseLeave={() => toggleMenu(false)}
    >
      <MLink
        onKeyDown={keyDownHandler}
        noStyles
        href={path ?? ''}
        className={cx(
          'flex h-full w-full items-center justify-center font-semibold outline-none transition-all focus:bg-primary/10',
          { 'bg-primary/10': isOpen },
        )}
        ref={ref}
      >
        <div className={cx('flex h-full flex-1 items-center justify-center gap-1 px-4 ')}>
          <span>{title}</span>
          <ChevronIcon />
        </div>
      </MLink>
      <ReactControlledMenu
        {...menuProps}
        onClose={() => toggleMenu(false)}
        className="absolute w-full pt-3"
      >
        <AnimateHeight
          isVisible
          initialVisible={false}
          className="absolute bg-white text-foreground shadow-card"
        >
          <div style={{ width: `${width ?? 0}px` }} className="relative py-3">
            {items?.map(
              (item) =>
                item &&
                (item.items && item.items.length > 0 ? (
                  <SubMenu
                    path={item.path}
                    width={width ?? 0}
                    key={item.id}
                    title={item.title}
                    items={item.items}
                  />
                ) : (
                  <MenuItem path={item.path ?? ''} title={item.title} key={item.id} />
                )),
            )}
          </div>
        </AnimateHeight>
      </ReactControlledMenu>
    </div>
  )
}

export default Menu
