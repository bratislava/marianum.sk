import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { MarianumLogoWithTextSvg } from '@/assets'
import { MenuIcon, PhoneIcon } from '@/assets/icons'
import Button from '@/components/atoms/Button'
import IconButton from '@/components/atoms/IconButton'
import MLink from '@/components/atoms/MLink'
import SkipToContentButton from '@/components/atoms/SkipToContentButton'
import NavigationMenuDesktop from '@/components/molecules/Navigation/NavigationMenuDesktop'
import NavigationMenuMobile from '@/components/molecules/Navigation/NavigationMenuMobile'
import { useNavigationContext } from '@/components/molecules/Navigation/NavigationProvider/useNavigationContext'
import NavigationSearch from '@/components/molecules/Navigation/NavigationSearch/NavigationSearch'
import { ContactEntityFragment } from '@/graphql'
import { getPhoneNumberLink } from '@/utils/getPhoneNumberLink'

type NavigationProps = {
  contact: ContactEntityFragment | null | undefined
}

const Navigation = ({ contact }: NavigationProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'Navigation' })

  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const [isDesktopSearchOpen, setDesktopSearchOpen] = useState(false)

  const { navigation } = useNavigationContext()

  const { title, phone1, phone2 } = contact?.attributes ?? {}

  const TopContacts = () => (
    <>
      {title && <div>{title}:</div>}
      <div className="flex gap-3">
        {phone1 && (
          <Button href={getPhoneNumberLink(phone1)} startIcon={<PhoneIcon />} variant="plain-white">
            {phone1}
          </Button>
        )}
        {phone2 && (
          <Button href={getPhoneNumberLink(phone2)} startIcon={<PhoneIcon />} variant="plain-white">
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
            <MarianumLogoWithTextSvg className="size-full" />
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
              onPressEnd={() => setMobileNavOpen(true)}
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
