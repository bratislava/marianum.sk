import { TNavigationContext } from '../components/layouts/NavigationProvider'
import {
  ArticleSlugEntityFragment,
  BranchSlugEntityFragment,
  BundleCardEntityFragment,
  DocumentSlugEntityFragment,
  PageSlugEntityFragment,
} from '../graphql/index'

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

export const getFullPath = (
  entity:
    | PageSlugEntityFragment
    | ArticleSlugEntityFragment
    | BranchSlugEntityFragment
    | BundleCardEntityFragment
    | DocumentSlugEntityFragment
    | null
    | undefined,
  navMap?: TNavigationContext['navMap'],
  nudge?: LocalRouteType,
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const { slug } = entity?.attributes ?? {}

  if (nudge) {
    return [localPaths[nudge], slug].join('/')
  }

  if (!slug || !entity || !entity.attributes) {
    return null
  }

  if (entity.__typename === 'PageEntity') {
    const path = navMap?.get(slug)
    return path || null
  }

  if (entity.__typename === 'ArticleEntity' && nudge) {
    return [localPaths[nudge], slug].join('/')
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
