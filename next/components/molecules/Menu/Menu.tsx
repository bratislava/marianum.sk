import { ControlledMenu as ReactControlledMenu, useMenuState } from '@szhsin/react-menu'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { KeyboardEvent, useEffect } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import ChevronIcon from '../../../assets/chevron_down.svg'
import { NavigationItemFragment } from '../../../graphql'
import { AnimateHeight } from '../../atoms/AnimateHeight'
import MLink from '../../atoms/MLink'
import MenuLeaf from './MenuLeaf'
import SubMenu from './SubMenu'

export type MenuProps = Pick<NavigationItemFragment, 'title' | 'path' | 'items'>

const Menu = ({ items, title, path }: MenuProps) => {
  const router = useRouter()
  const { ref, width } = useResizeDetector()

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
    <div
      className="relative h-full w-full"
      onMouseEnter={() => toggleMenu(true)}
      onMouseLeave={() => toggleMenu(false)}
    >
      <MLink
        onKeyDown={handleKeyDown}
        noStyles
        href={path ?? ''}
        className={cx(
          'flex h-full w-full items-center justify-center font-semibold outline-none transition-all focus:bg-primary/10',
          { 'bg-primary/10': isOpen },
        )}
        ref={ref}
      >
        <div className={cx('flex h-full flex-1 items-center justify-center gap-1 px-4')}>
          <span>{title}</span>
          <ChevronIcon />
        </div>
      </MLink>

      <ReactControlledMenu
        {...menuProps}
        onClose={() => toggleMenu(false)}
        className={cx('absolute w-full pt-3', { hidden: !isOpen })}
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
                (item.items?.length ? (
                  <SubMenu
                    path={item.path}
                    width={width ?? 0}
                    key={item.id}
                    title={item.title}
                    items={item.items}
                  />
                ) : (
                  <MenuLeaf path={item.path ?? ''} title={item.title} key={item.id} />
                )),
            )}
          </div>
        </AnimateHeight>
      </ReactControlledMenu>
    </div>
  )
}

export default Menu
