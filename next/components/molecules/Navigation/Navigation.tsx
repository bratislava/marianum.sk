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
  phoneNumber?: string
  faqLink?: string
  navigationItems: NavigationItemFragment[]
}

const Navigation = ({ phoneNumber, faqLink, navigationItems }: NavigationProps) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="bg-primary text-white">
      <div className="container relative mx-auto flex h-16 items-center justify-between px-4 lg:h-[120px] lg:pb-8">
        {/* left side of navigation */}
        <div className="w-[108px] lg:w-[142px]">
          <MarianumLogo className="h-full w-full" />
        </div>
        {/* right side of navigation */}
        <div className="flex items-center gap-4 lg:gap-8">
          {/* desktop faq and phone links */}
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
          >
            <MenuIcon width={24} height={24} />
          </IconButton>
        </div>
        {/* desktop navigation menu */}
        <div className="absolute inset-x-0 -bottom-8 hidden px-4 lg:block ">
          <NavigationMenuDesktop navigationItems={navigationItems} />
        </div>
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
