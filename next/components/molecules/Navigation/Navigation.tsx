import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useContext, useState } from 'react'

import MarianumLogoWithText from '../../../assets/marianum_logo_with_text.svg'
import MenuIcon from '../../../assets/menu.svg'
import PhoneIcon from '../../../assets/phone.svg'
import { ContactEntityFragment } from '../../../graphql'
import Button from '../../atoms/Button'
import IconButton from '../../atoms/IconButton'
import MLink from '../../atoms/MLink'
import SkipToContentButton from '../../atoms/SkipToContentButton'
import NavigationMenuDesktop from './NavigationMenuDesktop'
import NavigationMenuMobile from './NavigationMenuMobile'
import { NavigationContext } from './NavigationProvider/NavigationProvider'
import NavigationSearch from './NavigationSearch/NavigationSearch'

type NavigationProps = {
  contact: ContactEntityFragment | null | undefined
}

const Navigation = ({ contact }: NavigationProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'Navigation' })

  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const [isDesktopSearchOpen, setDesktopSearchOpen] = useState(false)

  const { navigation } = useContext(NavigationContext)

  const { title, phone1, phone2 } = contact?.attributes ?? {}

  const TopContacts = () => (
    <>
      {title && <div className="opacity-72">{title}:</div>}
      <div className="flex gap-3">
        {phone1 && (
          <Button href={`tel:${phone1}`} startIcon={<PhoneIcon />} variant="plain-white">
            {phone1}
          </Button>
        )}
        {phone2 && (
          <Button href={`tel:${phone2}`} startIcon={<PhoneIcon />} variant="plain-white">
            {phone2}
          </Button>
        )}
      </div>
    </>
  )

  return (
    <div className="bg-primary text-white">
      <SkipToContentButton />

      <div className="relative border-b border-white/12 xl:hidden">
        <div className="container flex flex-col items-center justify-center gap-3 py-2 sm:flex-row md:gap-4">
          <TopContacts />
        </div>
      </div>

      <div className="container relative flex h-[64px] flex-col lg:h-[120px]">
        <div className="flex h-[64px] items-center justify-between lg:h-[88px]">
          {/* left side of navigation */}
          <MLink
            className="w-[108px] lg:w-[142px]"
            href="/"
            noStyles
            noArrow
            aria-label={t('home')}
          >
            <MarianumLogoWithText className="h-full w-full" />
          </MLink>
          {/* right side of navigation */}
          <div className="flex items-center gap-4 xl:gap-8">
            {/* desktop faq and phone links */}
            <div
              className={cx('hidden items-center gap-4 opacity-0 xl:flex', {
                'opacity-100 transition-opacity delay-500': !isDesktopSearchOpen,
                hidden: isDesktopSearchOpen,
              })}
            >
              <TopContacts />
            </div>
            {/* search (both mobile and desktop) */}
            <NavigationSearch
              onDesktopSearchOpen={() => setDesktopSearchOpen(true)}
              onDesktopSearchClose={() => setDesktopSearchOpen(false)}
            />
            {/* mobile menu button */}
            <IconButton
              aria-label={t('menu')}
              onPress={() => setMobileNavOpen(true)}
              variant="primary"
              className="lg:hidden"
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
