import { useMemo } from 'react'

import { useNavigationContext } from '@/components/molecules/Navigation/NavigationProvider/useNavigationContext'
import {
  ArticleSlugEntityFragment,
  AssetSlugEntityFragment,
  Branch,
  BranchSlugEntityFragment,
  Bundle,
  BundleSlugEntityFragment,
  CemeterySlugEntityFragment,
  ManagedObjectSlugEntityFragment,
  NavigationItemFragment,
  Page,
  PageSlugEntityFragment,
} from '@/graphql'
import { ArticleMeili, AssetMeili, CemeteryMeili } from '@/services/meili/meiliTypes'
import { isDefined } from '@/utils/isDefined'
import { NavMap, parseNavigation } from '@/utils/parseNavigation'

// TODO move this to separate file and add translation logic
// IMPORTANT: Keep this in sync with next config rewrites
const localPaths = {
  branches: '/o-nas/kontakty',
  news: '/aktuality/novinky',
  press: '/o-nas/pre-media',
  jobs: '/aktuality/kariera',
  bundlesBurial: '/sluzby/balicky-pohrebov/rozlucka-na-cintorine',
  bundlesCremation: '/sluzby/balicky-pohrebov/kremacia',
  bundlesNatural: '/sluzby/balicky-pohrebov/prirodne-obrady',
  cemeteries: '/o-nas/cintoriny-v-sprave',
  managedObjects: '/o-nas/starostlivost-o-mestske-fontany',
  assets: '/o-nas/dokumenty',
  legislative: '/o-nas/dokumenty/legislativa',
  search: '/vyhladavanie',
}

export type UnionSlugEntityType =
  | PageSlugEntityFragment
  | ArticleSlugEntityFragment
  | BranchSlugEntityFragment
  | BundleSlugEntityFragment
  | CemeterySlugEntityFragment
  | AssetSlugEntityFragment
  | ManagedObjectSlugEntityFragment
  | null
  | undefined

/**
 * Returns the URL for Strapi returned entity.
 *
 * IMPORTANT: When changing this function, also change the `getFullPathMeiliFn` function.
 */
export const getFullPathFn = (
  entity: UnionSlugEntityType,
  navMap: NavMap,
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const { slug } = entity ?? {}

  if (!slug || !entity) {
    return null
  }

  if (entity.__typename === 'Article') {
    if (isDefined(entity?.pressCategory)) {
      return [localPaths.press, slug].join('/')
    }
    if (isDefined(entity.newsCategory)) {
      return [localPaths.news, slug].join('/')
    }
    if (isDefined(entity.jobsCategory)) {
      return [localPaths.jobs, slug].join('/')
    }
  }

  if (entity.__typename === 'Page') {
    const path = navMap.get(slug)?.path

    return path ?? `/${slug}`
  }

  if (entity.__typename === 'Branch') {
    return [localPaths.branches, slug].join('/')
  }

  if (entity.__typename === 'Bundle') {
    if (entity.type === 'pochovanie') {
      return [localPaths.bundlesBurial, slug].join('/')
    }
    if (entity.type === 'kremacia') {
      return [localPaths.bundlesCremation, slug].join('/')
    }
    if (entity.type === 'prirodne') {
      return [localPaths.bundlesNatural, slug].join('/')
    }
  }

  if (entity.__typename === 'Cemetery') {
    return [localPaths.cemeteries, slug].join('/')
  }

  if (entity.__typename === 'ManagedObject') {
    return [localPaths.managedObjects, slug].join('/')
  }

  if (entity.__typename === 'Asset') {
    // TODO add .../dokumenty/legislativa depending on asset category
    return [localPaths.assets, slug].join('/')
  }

  return null
}

// https://stackoverflow.com/a/71469571
type GetFullPathMeiliFn = (
  ...args:
    | ['page', Pick<Page, 'slug'>]
    | ['article', ArticleMeili]
    | ['branch', Pick<Branch, 'slug'>]
    | ['bundle', Pick<Bundle, 'type' | 'slug'>]
    | ['cemetery', Pick<CemeteryMeili, 'slug'>]
    | ['asset', Pick<AssetMeili, 'slug'>]
) => string | null

/**
 * Returns the URL for Meilisearch returned entity.
 *
 * There is one difference between entities returned by Strapi and Meilisearch:
 * 1. In Meilisearch, `__typename` is missing.
 *
 * Therefore, it's easier to duplicate the logic in a new function.
 *
 * IMPORTANT: When changing this function, also change the `getFullPathFn` function.
 *
 * @param navMap
 */
export const getFullPathMeiliFn = (navMap: NavMap) => {
  // eslint-disable-next-line sonarjs/cognitive-complexity
  return ((entityType, entity) => {
    const { slug } = entity

    // IMPORTANT: managed object entity was added to `getFullPathFn` function, but it wasn't added here.
    // This was done on purpose, since we do not want these entities to be indexed in global search.

    if (entityType === 'article') {
      if (isDefined(entity.pressCategory)) {
        return [localPaths.press, slug].join('/')
      }
      if (isDefined(entity.newsCategory)) {
        return [localPaths.news, slug].join('/')
      }
      if (isDefined(entity.jobsCategory)) {
        return [localPaths.jobs, slug].join('/')
      }
    }

    if (entityType === 'page') {
      const path = navMap.get(slug)?.path

      return path ?? `/${slug}`
    }

    if (entityType === 'branch') {
      return [localPaths.branches, slug].join('/')
    }

    if (entityType === 'bundle') {
      if (entity.type === 'pochovanie') {
        return [localPaths.bundlesBurial, slug].join('/')
      }
      if (entity.type === 'kremacia') {
        return [localPaths.bundlesCremation, slug].join('/')
      }
      if (entity.type === 'prirodne') {
        return [localPaths.bundlesNatural, slug].join('/')
      }
    }

    if (entityType === 'cemetery') {
      return [localPaths.cemeteries, slug].join('/')
    }

    if (entityType === 'asset') {
      // TODO add .../dokumenty/legislativa depending on asset category
      return [localPaths.assets, slug].join('/')
    }

    return null
  }) as GetFullPathMeiliFn
}

export const useGetFullPath = () => {
  const { navMap } = useNavigationContext()

  const getFullPath = useMemo(
    () => (entity: UnionSlugEntityType) => getFullPathFn(entity, navMap),
    [navMap],
  )

  return { getFullPath }
}

export const useGetFullPathMeili = () => {
  const { navMap } = useNavigationContext()

  const getFullPathMeili = useMemo(() => getFullPathMeiliFn(navMap), [navMap])

  return { getFullPathMeili }
}

/**
 * Returns whether the provided path matches the correct path for provided entity.
 *
 * @param path
 * @param entity
 * @param navigation
 */
export const isCurrentPathValid = (
  path: string,
  entity: UnionSlugEntityType,
  navigation: NavigationItemFragment[],
) => {
  const { navMap } = parseNavigation(navigation)

  return getFullPathFn(entity, navMap) === path
}
