import { createContext, PropsWithChildren, useMemo } from 'react'

import { NavigationItemFragment } from '../../graphql'
import { parseNavigation } from '../../utils/parseNavigation'

type NavigationContextProps = {
  navigation: NavigationItemFragment[]
}

type TNavigationContext = {
  navMap: Map<string, string>
  navigation: NavigationItemFragment[]
}
export const NavigationContext = createContext<TNavigationContext>({
  navMap: new Map(),
  navigation: [],
})

const NavigationProvider = ({
  navigation,
  children,
}: PropsWithChildren<NavigationContextProps>) => {
  const navMap = useMemo(() => {
    return parseNavigation(navigation)
  }, [navigation])

  return (
    <NavigationContext.Provider value={{ navMap, navigation }}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationProvider
