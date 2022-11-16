import { NavigationContext } from '@components/molecules/Navigation/NavigationProvider/NavigationProvider'
import { useContext } from 'react'

export const useNavigationContext = () => {
  return useContext(NavigationContext)
}
