import HelpIcon from '../../../assets/help.svg'
import MarianumLogo from '../../../assets/marianum_logo.svg'
import MenuIcon from '../../../assets/menu.svg'
import PhoneIcon from '../../../assets/phone.svg'
import MLink from '../../atoms/MLink'
import NavigationSearch from './NavigationSearch'

type NavigationProps = {
  phoneNumber?: string
  faqLink?: string
}

const Navigation = ({ phoneNumber, faqLink }: NavigationProps) => {
  return (
    <div className="bg-primary text-white">
      <div className="container relative mx-auto flex h-16 items-center justify-between px-4 md:h-[120px] md:pb-8">
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
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-dark md:hidden"
          >
            <MenuIcon width={24} height={24} />
          </button>
        </div>
        <div className="absolute inset-x-0 -bottom-8 hidden px-4 md:block ">
          <div className="h-16 bg-white shadow flex" />
        </div>
      </div>
    </div>
  )
}

export default Navigation
