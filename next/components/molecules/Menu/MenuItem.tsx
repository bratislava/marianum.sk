import cx from 'classnames'

import { ChevronRightIcon } from '@/assets/icons'

type MenuItemProps = {
  title: string
  hover?: boolean
  open?: boolean
  isSubmenu?: boolean
}

const MenuItem = ({ title, hover, open, isSubmenu }: MenuItemProps) => {
  return (
    <div
      className={cx('flex w-full cursor-pointer select-none justify-between px-6 py-3', {
        'bg-primary/10': open || hover,
      })}
    >
      {title}
      {isSubmenu && <ChevronRightIcon />}
    </div>
  )
}

export default MenuItem
