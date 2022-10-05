import { BreadcrumbItem } from '../components/atoms/Breadcrumbs'
import { TNavigationContext } from '../components/molecules/Navigation/NavigationProvider/NavigationProvider'
import { isDefined } from './isDefined'

export const getBreadcrumbs = (path: string, navMap: TNavigationContext['navMap']) => {
  const pathToSplit = path.startsWith('/') ? path.slice(1) : path
  const slugs = pathToSplit.split('/')

  return slugs.map((slug) => navMap.get(slug) as BreadcrumbItem).filter(isDefined)
}
