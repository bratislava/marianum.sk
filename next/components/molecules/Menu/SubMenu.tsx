import { SubMenu as ReactSubMenu } from '@szhsin/react-menu'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'

import MenuItem from '@/components/molecules/Menu/MenuItem'
import MenuLeaf from '@/components/molecules/Menu/MenuLeaf'
import { MenuNode } from '@/services/navigation/NavigationProvider'

export type SubMenuProps = Pick<MenuNode, 'title' | 'path'> & { items: MenuNode[] }

const SubMenu = ({ title, items, path }: SubMenuProps) => {
  const router = useRouter()

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    // A section without its own link only opens its links.
    if (path) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(path)
    }
  }

  return (
    <ReactSubMenu
      className="outline-hidden"
      label={({ open, hover }) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div onClick={handleClick} className="-mx-3 px-3">
          <MenuItem title={title} hover={hover} open={open} isSubmenu />
        </div>
      )}
      offsetY={-13}
      offsetX={12}
    >
      <div className="bg-white py-3 shadow-card">
        {items.map((item) =>
          item.path ? <MenuLeaf path={item.path} title={item.title} key={item.id} /> : null,
        )}
      </div>
    </ReactSubMenu>
  )
}

export default SubMenu
