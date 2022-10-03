import cx from 'classnames'

import ChevronRightIcon from '../../../assets/chevron_right.svg'

type MenuItemProps = {
  title: string
  hover?: boolean
  open?: boolean
  isSubmenu?: boolean
}

const MenuItem = ({ title, hover, open, isSubmenu }: MenuItemProps) => {
  return (
    <div
      className={cx(
        'flex w-full cursor-pointer select-none justify-between px-6 py-3 outline-none',
        {
          'bg-primary/10': open || hover,
        },
      )}
    >
      {title}
      {isSubmenu && <ChevronRightIcon />}
    </div>
  )
}

export default MenuItem
