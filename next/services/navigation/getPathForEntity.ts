import {
  ArticleSlugEntityFragment,
  AssetSlugEntityFragment,
  BranchSlugEntityFragment,
  BundleSlugEntityFragment,
  CemeterySlugEntityFragment,
  ManagedObjectSlugEntityFragment,
  PageSlugEntityFragment,
} from '@/graphql'
import { contentTypePathPrefixesMap } from '@/services/navigation/contentTypePathPrefixesMap'
import { navigationConfig } from '@/services/navigation/navigationConfig'
import {
  ContentType,
  NavigationObject,
  RouteEntity,
  RouteEntityWithLocale,
} from '@/services/navigation/typesNavigation'
import { isDefined } from '@/utils/isDefined'

export type StrapiEntity =
  | PageSlugEntityFragment
  | ArticleSlugEntityFragment
  | BranchSlugEntityFragment
  | BundleSlugEntityFragment
  | CemeterySlugEntityFragment
  | AssetSlugEntityFragment
  | ManagedObjectSlugEntityFragment

/** Only the presence of the category matters, Strapi and Meilisearch return it in a different shape. */
type ArticleCategories = { newsCategory?: unknown; pressCategory?: unknown; jobsCategory?: unknown }

const getArticleContentType = ({
  pressCategory,
  newsCategory,
  jobsCategory,
}: ArticleCategories): ContentType | null => {
  if (isDefined(pressCategory)) {
    return 'article-press'
  }
  if (isDefined(newsCategory)) {
    return 'article-news'
  }
  if (isDefined(jobsCategory)) {
    return 'article-jobs'
  }

  return null
}

const getBundleContentType = (bundleType: string | null | undefined): ContentType | null => {
  if (bundleType === 'pochovanie') {
    return 'bundle-burial'
  }
  if (bundleType === 'kremacia') {
    return 'bundle-cremation'
  }
  if (bundleType === 'prirodne') {
    return 'bundle-natural'
  }

  return null
}

/**
 * Returns the route entity of an entity returned by Strapi.
 */
export const getEntityForStrapiEntity = (
  strapiEntity: StrapiEntity | null | undefined,
): RouteEntity | null => {
  if (!strapiEntity?.attributes) {
    return null
  }

  const { slug } = strapiEntity.attributes
  const type = (() => {
    switch (strapiEntity.__typename) {
      case 'PageEntity':
        return 'page'
      case 'ArticleEntity':
        return getArticleContentType({
          pressCategory: strapiEntity.attributes.pressCategory?.data,
          newsCategory: strapiEntity.attributes.newsCategory?.data,
          jobsCategory: strapiEntity.attributes.jobsCategory?.data,
        })
      case 'BranchEntity':
        return 'branch'
      case 'BundleEntity':
        return getBundleContentType(strapiEntity.attributes.type)
      case 'CemeteryEntity':
        return 'cemetery'
      case 'ManagedObjectEntity':
        return 'managed-object'
      case 'AssetEntity':
        return 'asset'
      default:
        return null
    }
  })()

  return type ? { type, slug } : null
}

/**
 * Entities returned by Meilisearch (and by Strapi webhooks, they use the same "REST format") are not nested in
 * `attributes`, don't have `__typename` and their relations are nested directly.
 *
 * Managed objects are left out on purpose, they are not indexed in the global search.
 */
export type MeiliEntityArgs =
  | ['page', { slug: string }]
  | ['article', { slug: string } & ArticleCategories]
  | ['branch', { slug: string }]
  | ['bundle', { slug: string; type?: string | null }]
  | ['cemetery', { slug: string }]
  | ['asset', { slug: string }]

/**
 * Returns the route entity of an entity returned by Meilisearch.
 */
export const getEntityForMeiliEntity = (...[type, entity]: MeiliEntityArgs): RouteEntity | null => {
  const routeType = (() => {
    switch (type) {
      case 'page':
        return 'page'
      case 'article':
        return getArticleContentType(entity)
      case 'branch':
        return 'branch'
      case 'bundle':
        return getBundleContentType(entity.type)
      case 'cemetery':
        return 'cemetery'
      case 'asset':
        return 'asset'
      default:
        return null
    }
  })()

  return routeType ? { type: routeType, slug: entity.slug } : null
}

/**
 * Returns the path without the locale prefix, `Link` and `router.push` add it.
 */
export const getPathForEntity = (navigation: NavigationObject, entity: RouteEntityWithLocale) => {
  if (entity.type === 'search') {
    return navigationConfig.searchPaths[entity.locale] ?? null
  }

  const localeNavigation = navigation[entity.locale]
  if (!entity.slug || !localeNavigation) {
    return null
  }

  if (entity.type === 'page') {
    return localeNavigation.pagePathsMap[entity.slug]?.path ?? null
  }

  const pathPrefix = contentTypePathPrefixesMap[entity.type]

  return `${pathPrefix}/${entity.slug}`
}
