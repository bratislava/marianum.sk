import cx from 'classnames'
import { motion } from 'framer-motion'

import ChevronIcon from '../../../assets/chevron_down.svg'
import Menu, { MenuItem } from '../Menu/Menu'

export type NavigationMenuDesktopItem = {
  key: string
  label: string
  link: string
  items?: MenuItem[]
}

export type NavigationMenuDesktopProps = {
  items: NavigationMenuDesktopItem[]
}

const NavigationMenuDesktop = ({ items }: NavigationMenuDesktopProps) => {
  return (
    <div className="relative z-40 grid h-16 grid-cols-4 bg-white text-foreground shadow">
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
                  <motion.div
                    transition={{ type: 'linear' }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                  >
                    <ChevronIcon />
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </Menu>
      ))}
    </div>
  )
}

export default NavigationMenuDesktop
