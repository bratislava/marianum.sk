import { SubMenu as ReactSubMenu } from '@szhsin/react-menu'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { MouseEvent, useCallback } from 'react'

import ChevronIcon from '../../../assets/chevron_down.svg'
import { MenuItemType } from '../../../utils/types'
import { AnimateHeight } from '../../atoms/AnimateHeight'
import MenuItem from './MenuItem'

export type SubMenuProps<T> = {
  title: string
  path?: string | null
  items?: (T | null | undefined)[] | null
  width: number
}

const SubMenu = <T extends MenuItemType<T>>({ title, items, path, width }: SubMenuProps<T>) => {
  const router = useRouter()

  const changeRouteHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(path ?? '/')
    },
    [router, path],
  )

  return (
    <ReactSubMenu
      label={({ open, hover }) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          onClick={changeRouteHandler}
          className={cx('flex w-full cursor-pointer select-none justify-between px-6 py-3', {
            'bg-primary/10': open || hover,
          })}
        >
          <span>{title}</span>
          <div className="-rotate-90">
            <ChevronIcon />
          </div>
        </div>
      )}
    >
      <div className="fixed px-3">
        <AnimateHeight isVisible initialVisible={false} className="-mt-3 bg-white shadow-card">
          <div className="py-3" style={{ width: `${width}px` }}>
            {items?.map(
              (item) =>
                item && <MenuItem path={item.path ?? ''} title={item.title} key={item.id} />,
            )}
          </div>
        </AnimateHeight>
      </div>
    </ReactSubMenu>
  )
}

export default SubMenu
