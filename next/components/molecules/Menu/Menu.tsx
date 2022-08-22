// import '@szhsin/react-menu/dist/core.css'

import {
  ControlledMenu as ReactControlledMenu,
  MenuItem as ReactMenuItem,
  useMenuState,
} from '@szhsin/react-menu'
import cx from 'classnames'
import { useMemo } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import ChevronIcon from '../../../assets/chevron_down.svg'
import { MenuItem } from '../../../utils/types'
import { AnimateHeight } from '../../atoms/AnimateHeight'
import MLink from '../../atoms/MLink'
import SubMenu from './SubMenu'

export type MenuProps<T> = {
  title: string
  path?: string | null
  items?: (T | null | undefined)[] | null
}

const Menu = <T extends MenuItem<T>>({ items, title, path }: MenuProps<T>) => {
  const { ref, width } = useResizeDetector()
  const [menuProps, toggleMenu] = useMenuState()

  const isOpen = useMemo(
    () => menuProps.state === 'opening' || menuProps.state === 'open',
    [menuProps.state],
  )

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => toggleMenu(true)}
      onMouseLeave={() => toggleMenu(false)}
    >
      <MLink noStyles href={path ?? ''} className="flex h-full items-center" ref={ref}>
        {/* {0 !== 0 && <div className="h-8 w-[1px] bg-border" />} */}
        <div
          className={cx(
            'flex h-full flex-1 items-center justify-center gap-1 px-4 font-semibold transition-all group-focus:bg-primary/10',
            { 'bg-primary/10': isOpen },
          )}
        >
          <span>{title}</span>
          <ChevronIcon />
        </div>
      </MLink>
      <ReactControlledMenu {...menuProps} className="absolute w-full pt-3">
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
                  <ReactMenuItem className="group outline-none" key={item.id}>
                    <MLink
                      noStyles
                      href={item.path ?? ''}
                      className="flex w-full justify-between px-6 py-3 hover:bg-primary/10 group-focus-within:bg-primary/10"
                    >
                      {item.title}
                    </MLink>
                  </ReactMenuItem>
                )),
            )}
          </div>
        </AnimateHeight>
      </ReactControlledMenu>
    </div>
  )
}

export default Menu
