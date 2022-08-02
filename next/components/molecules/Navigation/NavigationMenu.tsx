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
      {items.map(({ key, label, items: subItems }) => (
        <Menu key={key} items={subItems}>
          <div className="flex h-full items-center justify-center gap-1 font-semibold">
            <span>{label}</span>
            {(subItems?.length ?? 0) > 0 && (
              <div className="transition-transform group-radix-state-open:rotate-180">
                <ChevronIcon />
              </div>
            )}
          </div>
        </Menu>
      ))}
    </div>
  )
}

export default NavigationMenu
