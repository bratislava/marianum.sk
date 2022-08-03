import HelpIcon from '../../../assets/help.svg'
import MarianumLogo from '../../../assets/marianum_logo.svg'
import MenuIcon from '../../../assets/menu.svg'
import PhoneIcon from '../../../assets/phone.svg'
import MLink from '../../atoms/MLink'
import NavigationMenuDesktop, { NavigationMenuDesktopProps } from './NavigationMenuDesktop'
import NavigationSearch from './NavigationSearch'

type NavigationProps = {
  phoneNumber?: string
  faqLink?: string
  navigationItems: NavigationMenuDesktopProps['items']
}

const Navigation = ({ phoneNumber, faqLink, navigationItems }: NavigationProps) => {
  return (
    <div className="bg-primary text-white">
      <div className="container relative mx-auto flex h-16 items-center justify-between px-4 lg:h-[120px] lg:pb-8">
        <MarianumLogo className="w-[108px] md:w-[142px]" />
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="hidden items-center gap-8 xl:flex">
            {faqLink && (
              <MLink href={faqLink} className="flex items-center gap-2" noStyles>
                <HelpIcon />
                <span>Často kladené otázky</span>
              </MLink>
            )}
            {phoneNumber && (
              <MLink href={`tel:${phoneNumber}`} className="flex items-center gap-2" noStyles>
                <PhoneIcon />
                <span>+421 987 654 321</span>
              </MLink>
            )}
          </div>
          <NavigationSearch />
          {/* mobile menu button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-dark lg:hidden"
          >
            <MenuIcon width={24} height={24} />
          </button>
        </div>
        <div className="absolute inset-x-0 -bottom-8 hidden px-4 lg:block ">
          <NavigationMenuDesktop items={navigationItems} />
        </div>
      </div>
    </div>
  )
}

export default Navigation
