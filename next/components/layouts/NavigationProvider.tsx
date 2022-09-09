import last from 'lodash/last'
import { createContext, PropsWithChildren, useMemo } from 'react'

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
  const navMap = useMemo(() => {
    const tmpMap = new Map<string, string>()

    const parseNavItems = (navItems: NavigationItemFragment[]) => {
      navItems.forEach(({ path, items }) => {
        if (path) {
          const slug = last(path?.split('/'))
          if (slug) {
            tmpMap.set(slug, path)
          }
        }
        if (items) {
          parseNavItems(items.filter(isDefined))
        }
      })
    }

    parseNavItems(navigation)

    return tmpMap
  }, [navigation])

  return (
    <NavigationContext.Provider value={{ navMap, navigation }}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationProvider
