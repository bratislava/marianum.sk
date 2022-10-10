import {
  ArticleSlugEntityFragment,
  BranchSlugEntityFragment,
  BundleCardEntityFragment,
  DocumentSlugEntityFragment,
  PageSlugEntityFragment,
} from '../../../../graphql'
import { ArticleMeili, BranchMeili } from '../../../../types/meiliTypes'
import { isDefined } from '../../../../utils/isDefined'
import { TNavigationContext } from './NavigationProvider'
import { useNavigationContext } from './useNavigationContext'

// TODO move this to separate file and add translation logic
const localPaths = {
  contacts: '/o-nas/kontakty',
  news: '/aktuality/novinky',
  press: '/o-nas/pre-media',
  bundles: '/sluzby/pohrebna-sluzba/balicky-pohrebov',
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
    return path || null
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
    return [localPaths.bundles, slug].join('/')
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
    | ['branch', Pick<BranchMeili, 'type' | 'slug'>] /* | ['another', AnotherMeili] */
) => string | null

const getFullPathMeili: getFullPathMeiliFn = (entityType, entity) => {
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

  if (entityType === 'branch') {
    if (entity.type === 'cintorin') {
      return [localPaths.cemeteries, slug].join('/')
    }
    if (entity.type === 'pobocka') {
      return [localPaths.contacts, slug].join('/')
    }
  }

  return null
}

export const useSlug = () => {
  const { navMap } = useNavigationContext()

  const getFullSlug = (entity: UnionEntityType, explicitPathPrefix?: LocalRouteType) => {
    return getFullPath(entity, navMap, explicitPathPrefix)
  }

  return { getFullSlug }
}

export const useSlugMeili = () => {
  return { getFullSlugMeili: getFullPathMeili }
}
