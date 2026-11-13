/**
 * Content types that have detail pages. Each one is served under a hardcoded path prefix, see
 * `contentTypePathPrefixesMap`. Articles and bundles have several prefixes, one per category or type.
 */
export const contentTypes = [
  'article-news',
  'article-press',
  'article-jobs',
  'branch',
  'bundle-burial',
  'bundle-cremation',
  'bundle-natural',
  'cemetery',
  'managed-object',
  'asset',
] as const

export type ContentType = (typeof contentTypes)[number]

/**
 * Pages are keyed by their `slug`, which is unique within a locale. Paths don't contain the locale prefix.
 */
export type PagePathsMap = {
  [slug: string]:
    | {
        title: string
        path: string
        parentSlug: string | null
        childSlugs: string[]
      }
    | undefined
}

export type LocaleNavigation = {
  pagePathsMap: PagePathsMap
  /** Slugs of the pages in the header menu (Menu single type in Strapi), in order. */
  menuSlugs: string[]
}

export type NavigationObject = Record<string, LocaleNavigation | undefined>

export type RouteEntity =
  | { type: 'page' | ContentType; slug: string | null | undefined }
  | { type: 'search' }

export type RouteEntityWithLocale = RouteEntity & { locale: string }

export type NavigationStaticProps = {
  navigation: NavigationObject
  locale: string
  currentEntity: RouteEntity | null
}

export type NavigationPageProps = {
  navigationStaticProps: NavigationStaticProps
}

export type NavigationConfig = {
  cacheTtl: number
  searchPaths: Record<string, string>
}
