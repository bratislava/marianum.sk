import { NavigationItemFragment } from '../../../graphql'
import Menu from '../Menu/Menu'

export type NavigationMenuDesktopProps = {
  navigationItems: NavigationItemFragment[]
}

const NavigationMenuDesktop = ({ navigationItems }: NavigationMenuDesktopProps) => {
  return (
    <nav className="absolute inset-x-0 -bottom-8 z-10 mx-4 hidden h-16 grid-cols-4 bg-white text-foreground-heading shadow md:grid">
      {navigationItems.map(
        ({ id, title, items: menuItems, path }) =>
          menuItems && (
            <Menu
              path={path}
              key={id}
              title={title}
              items={menuItems.filter(Boolean) as NavigationItemFragment[]}
            />
          ),
      )}
    </nav>
  )
}

export default NavigationMenuDesktop
