import MLink from '@/components/atoms/MLink'
import Menu from '@/components/molecules/Menu/Menu'
import { NavigationItemFragment } from '@/graphql'

export type NavigationMenuDesktopProps = {
  navigationItems: NavigationItemFragment[]
}

const NavigationMenuDesktop = ({ navigationItems }: NavigationMenuDesktopProps) => {
  return (
    <nav className="z-10 -mb-8 hidden h-16 grid-cols-4 bg-white text-foreground-heading shadow lg:grid">
      {navigationItems.map(({ id, title, items: menuItems, path }, index) => (
        <div key={id} className="relative flex items-center">
          {index !== 0 && <div className="h-8 w-px bg-border" />}
          {menuItems?.length ? (
            <Menu path={path} title={title} items={menuItems} />
          ) : (
            <MLink
              noStyles
              href={path ?? ''}
              className="flex h-full flex-1 items-center justify-center px-4 font-semibold transition-all hover:bg-primary/10"
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
