import last from 'lodash/last'
import { createContext, PropsWithChildren } from 'react'

import { NavigationItemFragment } from '../../graphql'
import { isDefined } from '../../utils/isDefined'

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
  const navMap = new Map<string, string>()

  const addPathToMap = (path: string) => {
    const slug = last(path?.split('/'))
    if (slug) {
      navMap.set(slug, path)
    }
  }

  navigation.forEach((navItem) => {
    if (navItem.path) {
      addPathToMap(navItem.path)
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    navItem.items?.filter(isDefined)?.forEach((navItem) => {
      if (navItem.path) {
        addPathToMap(navItem.path)
      }
      // eslint-disable-next-line @typescript-eslint/no-shadow
      navItem.items?.filter(isDefined)?.forEach((navItem) => {
        if (navItem.path) {
          addPathToMap(navItem.path)
        }
      })
    })
  })

  return (
    <NavigationContext.Provider value={{ navMap, navigation }}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationProvider
