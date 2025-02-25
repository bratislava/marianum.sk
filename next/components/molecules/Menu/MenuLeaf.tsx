/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ClickEvent, MenuItem as ReactMenuItem } from '@szhsin/react-menu'
import { useRouter } from 'next/router'

import MenuItem from '@/components/molecules/Menu/MenuItem'

type MenuLeafProps = {
  title: string
  path: string
}

const MenuLeaf = ({ title, path }: MenuLeafProps) => {
  const router = useRouter()

  const handleClick = (e: ClickEvent) => {
    e.syntheticEvent.preventDefault()
    e.syntheticEvent.stopPropagation()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(path ?? '/')
  }

  return (
    <ReactMenuItem onClick={handleClick} className="outline-none">
      {({ hover }) => <MenuItem title={title} hover={hover} />}
    </ReactMenuItem>
  )
}

export default MenuLeaf
