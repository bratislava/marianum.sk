import last from 'lodash/last'

import { NavigationItemFragment } from '../graphql'
import { isDefined } from './isDefined'

const navMap = new Map<string, string>()
const crumbsMap = new Map<string, { label: string; linkHref: string }>()

export const parseNavigation = (navItems: NavigationItemFragment[]) => {
  navItems.forEach(({ path, items, title }) => {
    if (path) {
      const slug = last(path?.split('/'))
      if (slug) {
        navMap.set(slug, path)
        crumbsMap.set(slug, { label: title, linkHref: path })
      }
    }
    if (items) {
      parseNavigation(items.filter(isDefined))
    }
  })

  return { navMap, crumbsMap }
}
