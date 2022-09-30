import { BreadcrumbItem } from '../components/atoms/Breadcrumbs'
import { TNavigationContext } from '../components/layouts/NavigationProvider'
import { isDefined } from './isDefined'

export const getBreadcrumbs = (path: string, crumbsMap: TNavigationContext['crumbsMap']) => {
  const pathToSplit = path.startsWith('/') ? path.slice(1) : path
  const slugs = pathToSplit.split('/')

  return slugs.map((slug) => crumbsMap.get(slug) as BreadcrumbItem).filter(isDefined)
}
