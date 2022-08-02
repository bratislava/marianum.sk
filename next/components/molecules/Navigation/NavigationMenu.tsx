import cx from 'classnames'

import ChevronIcon from '../../../assets/chevron_down.svg'
import Menu, { MenuItem } from '../Menu/Menu'

export type NavigationMenuItem = {
  key: string
  label: string
  link: string
  items?: MenuItem[]
}

export type NavigationMenuProps = {
  items: NavigationMenuItem[]
}

const NavigationMenu = ({ items }: NavigationMenuProps) => {
  return (
    <div className="grid h-16 grid-cols-4 bg-white text-foreground shadow">
      {items.map(({ key, label, items: subItems }, index) => (
        <Menu key={key} items={subItems}>
          {({ isOpen }) => (
            <div className="flex h-full items-center">
              {index !== 0 && <div className="h-8 w-[1px] bg-border" />}
              <div
                className={cx(
                  'flex h-full flex-1 items-center justify-center gap-1 font-semibold transition-all group-focus:bg-primary/10',
                  { 'bg-primary/10': isOpen },
                )}
              >
                <span>{label}</span>
                {(subItems?.length ?? 0) > 0 && (
                  <div className={cx('transition-transform', { 'rotate-180': isOpen })}>
                    <ChevronIcon />
                  </div>
                )}
              </div>
            </div>
          )}
        </Menu>
      ))}
    </div>
  )
}

export default NavigationMenu
