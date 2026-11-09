import i18nextConfig from '@/next-i18next.config'
import { client } from '@/services/graphql/gqlClient'
import { parseTopLevelPages } from '@/services/navigation/parseTopLevelPages'
import { NavigationConfig, NavigationObject } from '@/services/navigation/typesNavigation'
import { isDefined } from '@/utils/isDefined'

// Ported from City Library:
// https://github.com/bratislava/mestskakniznica.sk/blob/master/next/services/navigation/fetchNavigation.ts

let cache: {
  timestamp: number
  value: NavigationObject
} | null = null

// The config is a CommonJS file, so its types are not inferred.
const { locales } = (i18nextConfig as { i18n: { locales: string[] } }).i18n

/**
 * Fetches navigation data of all locales, bypassing the cache. Use it where a stale navigation is not acceptable,
 * e.g. in the revalidate API route.
 */
export const fetchNonCachedNavigation = async (): Promise<NavigationObject> => {
  const localeNavigations = await Promise.all(
    locales.map(async (locale) => {
      const { topLevelPages, menu } = await client.Navigation({ locale })

      const { pagePathsMap } = parseTopLevelPages(topLevelPages?.data ?? [])
      const menuSlugs =
        menu?.data?.attributes?.pages?.data
          .map((page) => page.attributes?.slug)
          .filter(isDefined) ?? []

      return [locale, { pagePathsMap, menuSlugs }] as const
    }),
  )

  return Object.fromEntries(localeNavigations)
}

/**
 * Fetches and caches navigation data of all locales directly from the Strapi client.
 * Use this function in getStaticProps and getServerSideProps (see `getNavigationStaticProps`).
 *
 * @param config
 */
export const fetchNavigation = async (config: NavigationConfig) => {
  if (cache?.timestamp && cache.timestamp + config.cacheTtl > Date.now()) {
    return cache.value
  }

  const navigation = await fetchNonCachedNavigation()

  cache = { timestamp: Date.now(), value: navigation }

  return navigation
}
