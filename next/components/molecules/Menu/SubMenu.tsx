import { MenuItem as ReactMenuItem, SubMenu as ReactSubMenu } from '@szhsin/react-menu'
import cx from 'classnames'

import ChevronIcon from '../../../assets/chevron_down.svg'
import { MenuItem } from '../../../utils/types'
import { AnimateHeight } from '../../atoms/AnimateHeight'
import MLink from '../../atoms/MLink'

export type SubMenuProps<T> = {
  title: string
  path?: string | null
  items?: (T | null | undefined)[] | null
  width: number
}

const SubMenu = <T extends MenuItem<T>>({ title, items, path, width }: SubMenuProps<T>) => {
  return (
    <ReactSubMenu
      label={({ open }) => (
        <MLink
          noStyles
          href={path ?? ''}
          className={cx('flex w-full justify-between px-6 py-3 outline-none hover:bg-primary/10', {
            'bg-primary/10': open,
          })}
        >
          <span>{title}</span>
          <div className="-rotate-90">
            <ChevronIcon />
          </div>
        </MLink>
      )}
    >
      <div className="fixed px-3">
        <AnimateHeight isVisible initialVisible={false} className="-mt-3 bg-white shadow-card">
          <div className="py-3" style={{ width: `${width}px` }}>
            {items?.map(
              (item) =>
                item && (
                  <ReactMenuItem className="group" key={item.id}>
                    <MLink
                      noStyles
                      href={item.path ?? ''}
                      className="flex w-full justify-between px-6 py-3 outline-none hover:bg-primary/10 group-focus-within:bg-primary/10"
                    >
                      {item.title}
                    </MLink>
                  </ReactMenuItem>
                ),
            )}
          </div>
        </AnimateHeight>
      </div>
    </ReactSubMenu>
  )
}

export default SubMenu
