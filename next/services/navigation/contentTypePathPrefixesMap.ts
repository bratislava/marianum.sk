// Imported by next.config.ts, so it can't import anything at runtime through the `@/` alias.
import type { ContentType } from './typesNavigation'

/**
 * Path of the parent page under which each content type's detail pages are served, e.g. `/aktuality/novinky/:slug`.
 * The links are built from these prefixes (see `getPathForEntity`) and next.config.ts rewrites the same paths to the
 * routes below, so this is the only place to change them.
 *
 * The last segment of each prefix is the slug of the parent page, breadcrumbs of detail pages are built from it.
 *
 * Marianum is only in Slovak. When another locale is added, make this per locale, like City Library does:
 * https://github.com/bratislava/mestskakniznica.sk/blob/master/next/services/navigation/getContentTypePathPrefixesMap.ts
 */
export const contentTypePathPrefixesMap = {
  'article-news': '/aktuality/novinky',
  'article-press': '/o-nas/pre-media',
  'article-jobs': '/aktuality/kariera',
  branch: '/o-nas/kontakty',
  'bundle-burial': '/sluzby/balicky-pohrebov/rozlucka-na-cintorine',
  'bundle-cremation': '/sluzby/balicky-pohrebov/kremacia',
  'bundle-natural': '/sluzby/balicky-pohrebov/prirodne-obrady',
  cemetery: '/o-nas/cintoriny-v-sprave',
  'managed-object': '/o-nas/starostlivost-o-mestske-fontany',
  asset: '/o-nas/dokumenty',
} as const satisfies Record<ContentType, string>

/**
 * Routes that render the detail pages, `pages/<route>/[...fullPath].tsx`. They get the whole public path as
 * `fullPath` and render the entity only if it is its correct path.
 */
export const contentTypeRoutesMap = {
  'article-news': '/articles',
  'article-press': '/articles',
  'article-jobs': '/articles',
  branch: '/branches',
  'bundle-burial': '/bundles',
  'bundle-cremation': '/bundles',
  'bundle-natural': '/bundles',
  cemetery: '/cemeteries',
  'managed-object': '/managed-objects',
  asset: '/documents',
} as const satisfies Record<ContentType, string>

/** Route that renders the pages, `pages/pages/[...fullPath].tsx`. */
export const pagesRoute = '/pages'
