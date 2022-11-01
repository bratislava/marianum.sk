import { createContext, PropsWithChildren, useMemo } from 'react'

import { GeneralEntityFragment, NavigationItemFragment } from '../../../../graphql'
import { NavMap, parseNavigation } from '../../../../utils/parseNavigation'

type NavigationContextProps = {
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment | null | undefined
}

export type TNavigationContext = {
  navMap: NavMap
  navigation: NavigationItemFragment[]
  general: GeneralEntityFragment['attributes'] | null
}

export const NavigationContext = createContext<TNavigationContext>({
  navMap: new Map(),
  navigation: [],
  general: null,
})

const NavigationProvider = ({
  navigation,
  general,
  children,
}: PropsWithChildren<NavigationContextProps>) => {
  const { navMap } = useMemo(() => {
    return parseNavigation(navigation)
  }, [navigation])

  return (
    <NavigationContext.Provider
      value={{ navMap, navigation, general: general?.attributes ?? null }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationProvider
