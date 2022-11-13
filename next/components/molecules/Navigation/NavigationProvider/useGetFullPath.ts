import {
  ArticleSlugEntityFragment,
  Branch,
  BranchSlugEntityFragment,
  Bundle,
  BundleSlugEntityFragment,
  CemeterySlugEntityFragment,
  DocumentSlugEntityFragment,
  NavigationItemFragment,
  Page,
  PageSlugEntityFragment,
} from '@graphql'
import { ArticleMeili, CemeteryMeili, DocumentMeili } from '@services/meili/meiliTypes'
import { isDefined, NavMap, parseNavigation } from '@utils'
import { useMemo } from 'react'

import { useNavigationContext } from './useNavigationContext'

// TODO move this to separate file and add translation logic
// IMPORTANT: Keep this in sync with next config rewrites
const localPaths = {
  branches: '/o-nas/kontakty',
  news: '/aktuality/novinky',
  press: '/o-nas/pre-media',
  bundlesBurial: '/sluzby/balicky-pohrebov/pochovanie-do-zeme',
  bundlesCremation: '/sluzby/balicky-pohrebov/kremacia',
  cemeteries: '/o-nas/cintoriny-v-sprave',
  documents: '/o-nas/dokumenty',
  legislative: '/o-nas/dokumenty/legislativa',
  search: '/vyhladavanie',
}

export type UnionSlugEntityType =
  | PageSlugEntityFragment
  | ArticleSlugEntityFragment
  | BranchSlugEntityFragment
  | BundleSlugEntityFragment
  | CemeterySlugEntityFragment
  | DocumentSlugEntityFragment
  | null
  | undefined

/**
 * Returns the URL for Strapi returned entity.
 */
export const getFullPathFn = (
  entity: UnionSlugEntityType,
  navMap: NavMap,
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const { slug } = entity?.attributes ?? {}

  if (!slug || !entity || !entity.attributes) {
    return null
  }

  if (entity.__typename === 'ArticleEntity') {
    if (isDefined(entity.attributes.pressCategory?.data)) {
      return [localPaths.press, slug].join('/')
    }
    if (isDefined(entity.attributes.newsCategory?.data)) {
      return [localPaths.news, slug].join('/')
    }
  }

  if (entity.__typename === 'PageEntity') {
    const path = navMap?.get(slug)?.path
    return path ?? `/${slug}`
  }

  if (entity.__typename === 'BranchEntity') {
    return [localPaths.branches, slug].join('/')
  }

  if (entity.__typename === 'BundleEntity') {
    if (entity.attributes.type === 'pochovanie') {
      return [localPaths.bundlesBurial, slug].join('/')
    }
    if (entity.attributes.type === 'kremacia') {
      return [localPaths.bundlesCremation, slug].join('/')
    }
  }

  if (entity.__typename === 'CemeteryEntity') {
    return [localPaths.cemeteries, slug].join('/')
  }

  if (entity.__typename === 'DocumentEntity') {
    // TODO add .../dokumenty/legislativa depending on document category
    return [localPaths.documents, slug].join('/')
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
    | ['document', Pick<DocumentMeili, 'slug'>]
) => string | null

/**
 * Returns the URL for Meilisearch returned entity.
 *
 * There are three differences between entities returned by Strapi and Meilisearch:
 * 1. In Meilisearch, `__typename` is missing.
 * 2. In Meilisearch, entities are not nested in `attributes`..
 * 3. In Meiliserach, the nested entities are nested directly, `article` vs `attributes.article.data.attributes`.
 *
 * Therefore, it's easier to duplicate the logic in a new function.
 *
 * @param navMap
 */
const getFullPathMeiliFn = (navMap: NavMap) => {
  // eslint-disable-next-line sonarjs/cognitive-complexity
  return ((entityType, entity) => {
    const { slug } = entity

    if (entityType === 'article') {
      // eslint-disable-next-line unicorn/consistent-destructuring
      if (isDefined(entity.pressCategory)) {
        return [localPaths.press, slug].join('/')
      }
      // eslint-disable-next-line unicorn/consistent-destructuring
      if (isDefined(entity.newsCategory)) {
        return [localPaths.news, slug].join('/')
      }
    }

    if (entityType === 'page') {
      const path = navMap?.get(slug)?.path
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
    }

    if (entityType === 'cemetery') {
      return [localPaths.cemeteries, slug].join('/')
    }

    if (entityType === 'document') {
      // TODO add .../dokumenty/legislativa depending on document category
      return [localPaths.documents, slug].join('/')
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
