import { SubMenu as ReactSubMenu } from '@szhsin/react-menu'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'

import { NavigationItemFragment } from '../../../graphql'
import { AnimateHeight } from '../../atoms/AnimateHeight'
import MenuItem from './MenuItem'
import MenuLeaf from './MenuLeaf'

export type SubMenuProps = Pick<NavigationItemFragment, 'title' | 'path' | 'items'> & {
  width: number
}

const SubMenu = ({ title, items, path, width }: SubMenuProps) => {
  const router = useRouter()

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(path ?? '#')
  }

  return (
    <ReactSubMenu
      className="outline-none"
      label={({ open, hover }) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div onClick={handleClick} className="outline-none">
          <MenuItem title={title} hover={hover} open={open} isSubmenu />
        </div>
      )}
    >
      <div className="fixed px-3">
        <AnimateHeight isVisible initialVisible={false} className="-mt-3 bg-white shadow-card">
          <div className="py-3" style={{ width: `${width}px` }}>
            {items?.map(
              (item) =>
                item && <MenuLeaf path={item.path ?? ''} title={item.title} key={item.id} />,
            )}
          </div>
        </AnimateHeight>
      </div>
    </ReactSubMenu>
  )
}

export default SubMenu
