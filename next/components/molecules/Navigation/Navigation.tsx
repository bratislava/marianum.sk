import MarianumLogo from '../../../assets/marianum_logo.svg'
import MenuIcon from '../../../assets/menu.svg'
import NavigationSearch from './NavigationSearch'

const Navigation = () => {
  return (
    <div className="bg-primary text-white">
      <div className="container relative mx-auto flex h-16 items-center justify-between px-4 md:h-[120px] md:pb-8">
        <MarianumLogo className="w-[108px] md:w-[142px]" />
        <div className="flex items-center gap-4">
          <NavigationSearch />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-dark md:hidden"
          >
            <MenuIcon width={24} height={24} />
          </button>
        </div>
        <div className="absolute inset-x-0 -bottom-8 hidden px-4 md:block ">
          <div className="h-16 bg-white shadow" />
        </div>
      </div>
    </div>
  )
}

export default Navigation
