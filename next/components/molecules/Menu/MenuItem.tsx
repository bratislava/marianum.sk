/* eslint-disable jsx-a11y/no-static-element-interactions */
import { MenuItem as ReactMenuItem } from '@szhsin/react-menu'
import cx from 'classnames'
import { useRouter } from 'next/router'

type MenuItemProps = {
  title: string
  path: string
}

const MenuItem = ({ title, path }: MenuItemProps) => {
  const router = useRouter()

  return (
    <ReactMenuItem
      onClick={(e) => {
        e.syntheticEvent.preventDefault()
        e.syntheticEvent.stopPropagation()
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(path ?? '/')
      }}
      className="outline-none"
    >
      {({ hover }) => (
        <div
          className={cx('flex w-full cursor-pointer select-none justify-between px-6 py-3', {
            'bg-primary/10': hover,
          })}
        >
          {title}
        </div>
      )}
    </ReactMenuItem>
  )
}

export default MenuItem
