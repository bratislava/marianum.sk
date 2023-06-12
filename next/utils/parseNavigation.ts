import { NavigationItemFragment } from '@graphql'
import { isDefined } from '@utils/isDefined'

const navMap = new Map<string, { label: string; path: string }>()

export type NavMap = typeof navMap

export const parseNavigation = (navItems: NavigationItemFragment[]) => {
  navItems.forEach(({ path, items, title, related }) => {
    const slug = related?.attributes?.slug
    if (slug && path) {
      navMap.set(slug, { label: title, path })
    }
    if (items) {
      parseNavigation(items.filter(isDefined))
    }
  })

  return { navMap }
}
