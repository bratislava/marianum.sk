import cx from 'classnames'
import { motion } from 'framer-motion'

import ChevronIcon from '../../../assets/chevron_down.svg'
import { NavigationItemFragment } from '../../../graphql'
import { isDefined } from '../../../utils/isDefined'
import Menu from '../Menu/Menu'

export type NavigationMenuDesktopProps = {
  navigationItems: NavigationItemFragment[]
}

const NavigationMenuDesktop = ({ navigationItems }: NavigationMenuDesktopProps) => {
  return (
    <nav className="absolute inset-x-0 -bottom-8 z-10 mx-4 hidden h-16 grid-cols-4 bg-white text-foreground-heading shadow md:grid">
      {navigationItems.map(({ id, title, items: menuItems }, index) => (
        <Menu key={id} items={menuItems?.filter(isDefined)}>
          {({ isOpen }) => (
            <div className="flex h-full items-center">
              {index !== 0 && <div className="h-8 w-[1px] bg-border" />}
              <div
                className={cx(
                  'flex h-full flex-1 items-center justify-center gap-1 px-4 font-semibold transition-all group-focus:bg-primary/10',
                  { 'bg-primary/10': isOpen },
                )}
              >
                <span>{title}</span>
                {menuItems && menuItems?.length > 0 && (
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
    </nav>
  )
}

export default NavigationMenuDesktop
