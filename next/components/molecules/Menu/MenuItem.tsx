import { ChevronRightIcon } from '@/assets/icons'
import cn from '@/utils/cn'

type MenuItemProps = {
  title: string
  hover?: boolean
  open?: boolean
  isSubmenu?: boolean
}

const MenuItem = ({ title, hover, open, isSubmenu }: MenuItemProps) => {
  return (
    <div
      className={cn('flex w-full cursor-pointer select-none justify-between px-6 py-3', {
        'bg-primary/10': open || hover,
      })}
    >
      {title}
      {isSubmenu && <ChevronRightIcon />}
    </div>
  )
}

export default MenuItem
