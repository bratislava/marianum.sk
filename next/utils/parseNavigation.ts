import { NavigationItemFragment } from '@graphql'
import { isDefined } from '@utils'
import last from 'lodash/last'

const navMap = new Map<string, { label: string; path: string }>()

export type NavMap = typeof navMap

export const parseNavigation = (navItems: NavigationItemFragment[]) => {
  navItems.forEach(({ path, items, title }) => {
    if (path) {
      const slug = last(path?.split('/'))
      if (slug) {
        navMap.set(slug, { label: title, path })
      }
    }
    if (items) {
      parseNavigation(items.filter(isDefined))
    }
  })

  return { navMap }
}
