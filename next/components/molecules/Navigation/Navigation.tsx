import { useContext, useState } from 'react'

import MarianumLogo from '../../../assets/marianum_logo.svg'
import MenuIcon from '../../../assets/menu.svg'
import PhoneIcon from '../../../assets/phone.svg'
import { ContactEntityFragment } from '../../../graphql'
import IconButton from '../../atoms/IconButton'
import MLink from '../../atoms/MLink'
import NavigationMenuDesktop from './NavigationMenuDesktop'
import NavigationMenuMobile from './NavigationMenuMobile'
import { NavigationContext } from './NavigationProvider/NavigationProvider'
import NavigationSearch from './NavigationSearch/NavigationSearch'

type NavigationProps = {
  contact: ContactEntityFragment | null | undefined
}

const Navigation = ({ contact }: NavigationProps) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)

  const { navigation } = useContext(NavigationContext)

  const { title, phone1, phone2 } = contact?.attributes ?? {}

  return (
    <div className="bg-primary text-white">
      <div className="container relative flex h-[64px] flex-col md:h-[120px]">
        <div className="flex h-[64px] items-center justify-between md:h-[88px]">
          {/* left side of navigation */}
          <MLink className="w-[108px] lg:w-[142px]" href="/" noStyles noArrow>
            <MarianumLogo className="h-full w-full" />
          </MLink>
          {/* right side of navigation */}
          <div className="flex items-center gap-4 xl:gap-8">
            {/* desktop faq and phone links */}
            <div className="hidden items-center gap-8 xl:flex">
              <span>{title}</span>
              {phone1 && (
                <MLink href={`tel:${phone1}`} className="flex items-center gap-2" noStyles>
                  <PhoneIcon />
                  <span>{phone1}</span>
                </MLink>
              )}
              {phone2 && (
                <MLink href={`tel:${phone2}`} className="flex items-center gap-2" noStyles>
                  <PhoneIcon />
                  <span>{phone1}</span>
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
              className="md:hidden"
            >
              <MenuIcon width={24} height={24} />
            </IconButton>
          </div>
        </div>
        {/* desktop navigation menu */}
        <NavigationMenuDesktop navigationItems={navigation} />
        {/* mobile navigation menu */}
        <NavigationMenuMobile
          isOpen={isMobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          items={navigation}
        />
      </div>
    </div>
  )
}

export default Navigation
