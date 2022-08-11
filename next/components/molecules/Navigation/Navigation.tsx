import { useState } from 'react'

import HelpIcon from '../../../assets/help.svg'
import MarianumLogo from '../../../assets/marianum_logo.svg'
import MenuIcon from '../../../assets/menu.svg'
import PhoneIcon from '../../../assets/phone.svg'
import { NavigationItemFragment } from '../../../graphql'
import IconButton from '../../atoms/IconButton'
import MLink from '../../atoms/MLink'
import NavigationMenuDesktop from './NavigationMenuDesktop'
import NavigationMenuMobile from './NavigationMenuMobile'
import NavigationSearch from './NavigationSearch'

type NavigationProps = {
  faqLink?: string
  phoneNumber?: string
  navigationItems: NavigationItemFragment[]
}

const Navigation = ({ faqLink, phoneNumber, navigationItems }: NavigationProps) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="bg-primary text-white">
      <div className="container relative mx-auto flex h-16 items-center justify-between px-4 sm:h-[120px] sm:pb-8">
        {/* left side of navigation */}
        <MLink className="w-[108px] lg:w-[142px]" href="/" noStyles noArrow>
          <MarianumLogo className="h-full w-full" />
        </MLink>
        {/* right side of navigation */}
        <div className="flex items-center gap-4 lg:gap-8">
          {/* desktop faq and phone links */}
          <div className="flex items-center gap-8">
            {faqLink && (
              <MLink href={faqLink} className="hidden items-center gap-2 lg:flex" noStyles>
                <HelpIcon />
                <span className="">Často kladené otázky</span>
              </MLink>
            )}
            {phoneNumber && (
              <MLink href={`tel:${phoneNumber}`} className="flex items-center gap-2" noStyles>
                <PhoneIcon />
                <span>{phoneNumber}</span>
              </MLink>
            )}
          </div>
          {/* search (both mobile and desktop) */}
          <NavigationSearch />
          {/* mobile menu button */}
          <IconButton
            aria-label="navigačné menu"
            onPress={() => setMobileNavOpen(true)}
            variant="primary"
            className="sm:hidden"
          >
            <MenuIcon width={24} height={24} />
          </IconButton>
        </div>
        {/* desktop navigation menu */}
        <NavigationMenuDesktop navigationItems={navigationItems} />
        {/* mobile navigation menu */}
        <NavigationMenuMobile
          isOpen={isMobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          items={navigationItems}
        />
      </div>
    </div>
  )
}

export default Navigation
