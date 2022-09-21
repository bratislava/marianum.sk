import last from 'lodash/last'

import { NavigationItemFragment } from '../graphql'
import { isDefined } from './isDefined'

const tmpMap = new Map<string, string>()

export const parseNavigation = (navItems: NavigationItemFragment[]) => {
  navItems.forEach(({ path, items }) => {
    if (path) {
      const slug = last(path?.split('/'))
      if (slug) {
        tmpMap.set(slug, path)
      }
    }
    if (items) {
      parseNavigation(items.filter(isDefined))
    }
  })

  return tmpMap
}
