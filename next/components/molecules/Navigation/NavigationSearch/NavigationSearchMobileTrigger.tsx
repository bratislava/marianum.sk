import { SearchIcon } from '@/assets/icons'
import IconButton, { PolymorphicIconProps } from '@/components/atoms/IconButton'

const NavigationSearchMobileTrigger = (props: PolymorphicIconProps) => {
  return (
    <IconButton {...props} className="" aria-label="hľadať" variant="primary">
      <SearchIcon />
    </IconButton>
  )
}

export default NavigationSearchMobileTrigger
