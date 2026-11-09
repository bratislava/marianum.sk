import MLink from '@/components/atoms/MLink'
import Menu from '@/components/molecules/Menu/Menu'
import { NavigationNode } from '@/services/navigation/NavigationProvider'

export type NavigationMenuDesktopProps = {
  menu: NavigationNode[]
}

const NavigationMenuDesktop = ({ menu }: NavigationMenuDesktopProps) => {
  return (
    <nav className="z-10 -mb-8 hidden h-16 grid-cols-4 bg-white text-foreground-heading shadow lg:grid">
      {menu.map(({ slug, title, children, path }, index) => (
        <div key={slug} className="relative flex items-center">
          {index !== 0 && <div className="h-8 w-px bg-border" />}
          {children.length > 0 ? (
            <Menu path={path} title={title} items={children} />
          ) : (
            <MLink
              noStyles
              href={path}
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
