import MLink from '@/components/atoms/MLink'
import Menu from '@/components/molecules/Menu/Menu'
import { MenuNode } from '@/services/navigation/NavigationProvider'

export type NavigationMenuDesktopProps = {
  menu: MenuNode[]
}

const NavigationMenuDesktop = ({ menu }: NavigationMenuDesktopProps) => {
  return (
    <nav className="z-10 -mb-8 hidden h-16 grid-cols-4 bg-white text-foreground-heading shadow lg:grid">
      {menu.map(({ id, title, children, path }, index) => (
        <div key={id} className="relative flex items-center">
          {index !== 0 && <div className="h-8 w-px bg-border" />}
          {children.length > 0 ? (
            <Menu path={path} title={title} items={children} />
          ) : path ? (
            <MLink
              noStyles
              href={path}
              className="flex h-full flex-1 items-center justify-center px-4 font-semibold transition-all hover:bg-primary/10"
            >
              <span>{title}</span>
            </MLink>
          ) : null}
        </div>
      ))}
    </nav>
  )
}

export default NavigationMenuDesktop
