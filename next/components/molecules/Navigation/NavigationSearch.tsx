import SearchIcon from '../../../assets/search.svg'
import Search from '../Search'

const NavigationSearch = () => {
  return (
    <>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
      >
        <SearchIcon width={24} height={24} />
      </button>
      <div className="hidden w-72 transition-all duration-500 focus-within:w-[540px] md:flex">
        <Search
          className="w-full border-transparent bg-white/[16%] focus-within:bg-white/100 focus-within:text-foreground hover:border-transparent hover:focus-within:border-border"
          inputClassName="placeholder:text-white focus:placeholder:text-foreground-placeholder"
          placeholder="Hľadať na stránke"
        />
      </div>
    </>
  )
}

export default NavigationSearch
