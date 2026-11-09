import { SubMenu as ReactSubMenu } from '@szhsin/react-menu'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'

import MenuItem from '@/components/molecules/Menu/MenuItem'
import MenuLeaf from '@/components/molecules/Menu/MenuLeaf'
import { NavigationNode } from '@/services/navigation/NavigationProvider'

export type SubMenuProps = Pick<NavigationNode, 'title' | 'path'> & { items: NavigationNode[] }

const SubMenu = ({ title, items, path }: SubMenuProps) => {
  const router = useRouter()

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(path)
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
        {items.map((item) => (
          <MenuLeaf path={item.path} title={item.title} key={item.slug} />
        ))}
      </div>
    </ReactSubMenu>
  )
}

export default SubMenu
