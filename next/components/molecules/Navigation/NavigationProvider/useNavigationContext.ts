import { useContext } from 'react'

import { NavigationContext } from '@/components/molecules/Navigation/NavigationProvider/NavigationProvider'

export const useNavigationContext = () => {
  return useContext(NavigationContext)
}
