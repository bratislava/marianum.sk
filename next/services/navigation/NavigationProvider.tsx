import { createContext, PropsWithChildren, useContext, useMemo } from 'react'

import { contentTypePathPrefixesMap } from '@/services/navigation/contentTypePathPrefixesMap'
import {
  getEntityForMeiliEntity,
  getEntityForStrapiEntity,
  getPathForEntity,
  MeiliEntityArgs,
  StrapiEntity,
} from '@/services/navigation/getPathForEntity'
import { NavigationStaticProps, RouteEntity } from '@/services/navigation/typesNavigation'
import { isDefined } from '@/utils/isDefined'

// Ported from City Library:
// https://github.com/bratislava/mestskakniznica.sk/blob/master/next/services/navigation/NavigationProvider.tsx

export type NavigationNode = {
  slug: string
  title: string
  path: string
  children: NavigationNode[]
}

export type NavigationBreadcrumb = { label: string; path: string }

// Number of columns of the desktop menu grid in NavigationMenuDesktop.tsx, keep them in sync.
const MAX_MENU_PAGES = 4

const NavigationContext = createContext<NavigationStaticProps | null>(null)

export const NavigationProvider = ({
  staticProps,
  children,
}: PropsWithChildren<{ staticProps: NavigationStaticProps | undefined }>) => {
  return (
    <NavigationContext.Provider value={staticProps ?? null}>{children}</NavigationContext.Provider>
  )
}

const getNavigationObject = ({ navigation, locale, currentEntity }: NavigationStaticProps) => {
  const { pagePathsMap = {}, menuSlugs = [] } = navigation[locale] ?? {}

  const getPath = (entity: RouteEntity & { locale?: string }) =>
    getPathForEntity(navigation, { ...entity, locale: entity.locale ?? locale })

  const getPathForStrapiEntity = (strapiEntity: StrapiEntity | null | undefined) => {
    const entity = getEntityForStrapiEntity(strapiEntity)

    return entity ? getPath(entity) : null
  }

  const getPathForMeiliEntity = (...args: MeiliEntityArgs) => {
    const entity = getEntityForMeiliEntity(...args)

    return entity ? getPath(entity) : null
  }

  const getNode = (slug: string): NavigationNode | null => {
    const page = pagePathsMap[slug]
    if (!page) {
      return null
    }

    return {
      slug,
      title: page.title,
      path: page.path,
      children: page.childSlugs.map(getNode).filter(isDefined),
    }
  }

  /** Subpages of a page, `slugOrPath` is the page's slug or its whole path. */
  const getChildren = (slugOrPath: string | null | undefined) => {
    const slug = slugOrPath?.split('/').findLast(Boolean)

    return (slug && getNode(slug)?.children) || []
  }

  /**
   * Header menu: pages from the Menu single type with their subpages. Only the first MAX_MENU_PAGES are shown, the
   * desktop menu has that many columns.
   */
  const menu = menuSlugs.map(getNode).filter(isDefined).slice(0, MAX_MENU_PAGES)

  const currentPage =
    currentEntity?.type === 'page' && currentEntity.slug
      ? pagePathsMap[currentEntity.slug]
      : undefined
  const currentPath = currentEntity ? getPath(currentEntity) : null

  /** Parent page of a page, or the page whose path is the prefix of a detail page. */
  const parentSlug = (() => {
    if (!currentEntity || currentEntity.type === 'search') {
      return null
    }
    if (currentEntity.type === 'page') {
      return currentPage?.parentSlug ?? null
    }

    // The path of a page ends with its slug.
    return contentTypePathPrefixesMap[currentEntity.type].split('/').at(-1) ?? null
  })()

  /** From the closest one. */
  const parents: NavigationBreadcrumb[] = []
  const visitedSlugs = new Set<string>()
  let ancestorSlug = parentSlug
  // `visitedSlugs` guards against a loop caused by two pages with the same slug.
  while (ancestorSlug && !visitedSlugs.has(ancestorSlug)) {
    visitedSlugs.add(ancestorSlug)
    const ancestor = pagePathsMap[ancestorSlug]
    if (ancestor) {
      parents.push({ label: ancestor.title, path: ancestor.path })
    }
    ancestorSlug = ancestor?.parentSlug ?? null
  }

  /**
   * Ancestor pages and the current page. Detail pages add their own title (see `HeroSection`'s
   * `breadcrumbsMoreItems`).
   */
  const breadcrumbs: NavigationBreadcrumb[] = [
    ...[...parents].reverse(),
    currentPage ? { label: currentPage.title, path: currentPage.path } : null,
  ].filter(isDefined)

  return {
    currentPath,
    getPathForEntity: getPath,
    getPathForStrapiEntity,
    getPathForMeiliEntity,
    getChildren,
    menu,
    breadcrumbs,
  }
}

export const useNavigation = () => {
  const staticProps = useContext(NavigationContext)

  const navigation = useMemo(() => staticProps && getNavigationObject(staticProps), [staticProps])

  if (!navigation) {
    throw new Error(
      'You must return `navigationStaticProps` from getStaticProps or getServerSideProps (see `getNavigationStaticProps`) in order to use `useNavigation` hook.',
    )
  }

  return navigation
}
