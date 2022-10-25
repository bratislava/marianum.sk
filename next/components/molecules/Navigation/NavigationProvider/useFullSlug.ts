import { useMemo } from 'react'

import {
  ArticleSlugEntityFragment,
  BranchSlugEntityFragment,
  Bundle,
  BundleCardEntityFragment,
  DocumentSlugEntityFragment,
  Page,
  PageSlugEntityFragment,
} from '../../../../graphql'
import { ArticleMeili, BranchMeili, DocumentMeili } from '../../../../types/meiliTypes'
import { isDefined } from '../../../../utils/isDefined'
import { TNavigationContext } from './NavigationProvider'
import { useNavigationContext } from './useNavigationContext'

// TODO move this to separate file and add translation logic
// IMPORTANT: Keep this in sync with next config rewrites
const localPaths = {
  contacts: '/o-nas/kontakty',
  news: '/aktuality/novinky',
  press: '/o-nas/pre-media',
  bundlesBurial: '/sluzby/balicky-pohrebov/pochovanie-do-zeme',
  bundlesCremation: '/sluzby/balicky-pohrebov/kremacia',
  cemeteries: '/o-nas/cintoriny-v-sprave',
  documents: '/o-nas/dokumenty',
  legislative: '/o-nas/dokumenty/legislativa',
  search: '/vyhladavanie',
}

type LocalRouteType = keyof typeof localPaths

type UnionEntityType =
  | PageSlugEntityFragment
  | ArticleSlugEntityFragment
  | BranchSlugEntityFragment
  | BundleCardEntityFragment
  | DocumentSlugEntityFragment
  | null
  | undefined

/**
 * Returns the URL for Strapi returned entity.
 */
const getFullPath = (
  entity: UnionEntityType,
  navMap?: TNavigationContext['navMap'],
  explicitPathPrefix?: LocalRouteType,
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const { slug } = entity?.attributes ?? {}

  // Use explicitPathPrefix for Articles and whenever you need to specify a path prefix manually
  if (explicitPathPrefix) {
    return [localPaths[explicitPathPrefix], slug].join('/')
  }

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
    return path ?? slug
  }

  if (entity.__typename === 'BranchEntity') {
    if (entity.attributes.type === 'cintorin') {
      return [localPaths.cemeteries, slug].join('/')
    }
    if (entity.attributes.type === 'pobocka') {
      return [localPaths.contacts, slug].join('/')
    }
  }

  if (entity.__typename === 'BundleEntity') {
    if (entity.attributes.type === 'pochovanie') {
      return [localPaths.bundlesBurial, slug].join('/')
    }
    if (entity.attributes.type === 'kremacia') {
      return [localPaths.bundlesCremation, slug].join('/')
    }
  }

  if (entity.__typename === 'DocumentEntity') {
    // TODO add .../dokumenty/legislativa depending on document category
    return [localPaths.documents, slug].join('/')
  }

  return null
}

// https://stackoverflow.com/a/71469571
type getFullPathMeiliFn = (
  ...args:
    | ['article', ArticleMeili]
    | ['branch', Pick<BranchMeili, 'type' | 'slug'>]
    | ['document', Pick<DocumentMeili, 'slug'>]
    | ['page', Pick<Page, 'slug'>]
    | ['bundle', Pick<Bundle, 'type' | 'slug'>]
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
const getFullSlugMeiliFn = (navMap: TNavigationContext['navMap']) => {
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
      return path ?? slug
    }

    if (entityType === 'branch') {
      if (entity.type === 'cintorin') {
        return [localPaths.cemeteries, slug].join('/')
      }
      if (entity.type === 'pobocka') {
        return [localPaths.contacts, slug].join('/')
      }
    }

    if (entityType === 'bundle') {
      if (entity.type === 'pochovanie') {
        return [localPaths.bundlesBurial, slug].join('/')
      }
      if (entity.type === 'kremacia') {
        return [localPaths.bundlesCremation, slug].join('/')
      }
    }

    if (entityType === 'document') {
      // TODO add .../dokumenty/legislativa depending on document category
      return [localPaths.documents, slug].join('/')
    }

    return null
  }) as getFullPathMeiliFn
}

export const useSlug = () => {
  const { navMap } = useNavigationContext()

  const getFullSlug = useMemo(
    () => (entity: UnionEntityType, explicitPathPrefix?: LocalRouteType) =>
      getFullPath(entity, navMap, explicitPathPrefix),
    [navMap],
  )

  return { getFullSlug }
}

export const useSlugMeili = () => {
  const { navMap } = useNavigationContext()

  const getFullSlugMeili = useMemo(() => getFullSlugMeiliFn(navMap), [navMap])

  return { getFullSlugMeili }
}
