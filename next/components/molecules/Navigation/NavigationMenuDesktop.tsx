import { NavigationItemFragment } from '../../../graphql'
import MLink from '../../atoms/MLink'
import Menu from '../Menu/Menu'

export type NavigationMenuDesktopProps = {
  navigationItems: NavigationItemFragment[]
}

const NavigationMenuDesktop = ({ navigationItems }: NavigationMenuDesktopProps) => {
  return (
    <nav className="z-10 -mb-8 hidden h-16 grid-cols-4 bg-white text-foreground-heading shadow md:grid">
      {navigationItems.map(({ id, title, items: menuItems, path }, index) => (
        <div key={id} className="relative flex items-center">
          {index !== 0 && <div className="h-8 w-[1px] bg-border" />}
          {(menuItems?.length ?? 0) > 0 ? (
            <Menu path={path} title={title} items={menuItems} />
          ) : (
            <MLink
              noStyles
              href={path ?? ''}
              className="flex h-full flex-1 items-center justify-center px-4 font-semibold outline-none transition-all hover:bg-primary/10 focus:bg-primary/10"
            >
              <span>{title}</span>
            </MLink>
          )}
        </div>
      ))}
    </nav>
  )
}

export default NavigationMenuDesktop
