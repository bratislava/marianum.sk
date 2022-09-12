import { useContext, useState } from 'react'

import HelpIcon from '../../../assets/help.svg'
import MarianumLogo from '../../../assets/marianum_logo.svg'
import MenuIcon from '../../../assets/menu.svg'
import PhoneIcon from '../../../assets/phone.svg'
import { ContactEntityFragment } from '../../../graphql'
import IconButton from '../../atoms/IconButton'
import MLink from '../../atoms/MLink'
import { NavigationContext } from '../../layouts/NavigationProvider'
import NavigationMenuDesktop from './NavigationMenuDesktop'
import NavigationMenuMobile from './NavigationMenuMobile'
import NavigationSearch from './NavigationSearch'

type NavigationProps = {
  faqSlug: string | null | undefined
  contact: ContactEntityFragment | null | undefined
}

const Navigation = ({ faqSlug, contact }: NavigationProps) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)

  const { navigation } = useContext(NavigationContext)

  const { phone1 } = contact?.attributes ?? {}

  return (
    <div className="bg-primary text-white">
      <div className="container relative mx-auto flex h-16 items-center justify-between px-4 md:h-[120px] md:pb-8">
        {/* left side of navigation */}
        <MLink className="w-[108px] lg:w-[142px]" href="/" noStyles noArrow>
          <MarianumLogo className="h-full w-full" />
        </MLink>
        {/* right side of navigation */}
        <div className="flex items-center gap-4 xl:gap-8">
          {/* desktop faq and phone links */}
          <div className="hidden items-center gap-8 xl:flex">
            {faqSlug && (
              <MLink href={faqSlug} className="flex items-center gap-2" noStyles>
                <HelpIcon />
                <span className="">Často kladené otázky</span>
              </MLink>
            )}
            {phone1 && (
              <MLink href={`tel:${phone1}`} className="flex items-center gap-2" noStyles>
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
