import { useContext } from 'react'

import { NavigationContext } from './NavigationProvider'

export const useNavigationContext = () => {
  return useContext(NavigationContext)
}
