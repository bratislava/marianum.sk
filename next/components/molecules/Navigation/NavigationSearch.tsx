import SearchIcon from '../../../assets/search.svg'
import IconButton from '../../atoms/IconButton'
import Search from '../Search'

const NavigationSearch = () => {
  return (
    <>
      <IconButton aria-label="hľadať" variant="primary">
        <SearchIcon width={24} height={24} />
      </IconButton>
      <div className="hidden w-72 transition-all duration-500 focus-within:w-[540px] sm:flex">
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
