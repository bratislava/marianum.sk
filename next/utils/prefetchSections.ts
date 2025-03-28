import { Key, unstable_serialize } from 'swr'

interface SectionFetcher<SectionsType extends string, Data, InnerKey> {
  /**
   * Section to fetch.
   */
  sectionTypename: SectionsType
  /**
   * SWR key or string key of the fetcher.
   */
  key: InnerKey
  /**
   * Fetcher.
   */
  fetcher: () => Promise<Data>
}

interface Section<SectionsType extends string> {
  __typename?: SectionsType | null
}

/**
 * Prefetches the section data if the page contains them.
 *
 * See usages.
 *
 * For SWR prefetch see: https://swr.vercel.app/docs/prefetching
 *
 * @param sections List of the sections of page, etc.
 * @param sectionFetchersList List of which sections to fetch, what's the data and what's the identifying key.
 * @param swr Whether the results are used as fallback for SWR.
 *
 * TODO: Improve types to correctly match key with it's respective data type instead of merging all the keys and data types.
 */
// SWR version, accepts Key as `key`
export async function prefetchSections<
  SectionsType extends string,
  Data extends object,
  InnerKey extends Key,
>(
  sections: (Section<SectionsType> | null | undefined)[] | null | undefined,
  sectionFetchersList: SectionFetcher<SectionsType, Data, InnerKey>[],
  swr: true,
): Promise<Record<string, Data>>
// Non-SWR version, accepts string as `key`
export async function prefetchSections<
  SectionsType extends string,
  Data extends object,
  InnerKey extends string,
>(
  sections: (Section<SectionsType> | null | undefined)[] | null | undefined,
  sectionFetchersList: SectionFetcher<SectionsType, Data, InnerKey>[],
  swr: false,
): Promise<Record<InnerKey, Data>>
export async function prefetchSections<
  SectionsType extends string,
  Data extends object,
  InnerKey extends Key | string,
>(
  sections: (Section<SectionsType> | null | undefined)[] | null | undefined,
  sectionFetchersList: SectionFetcher<SectionsType, Data, InnerKey>[],
  swr: boolean,
) {
  const filteredSections = sectionFetchersList.filter((section) =>
    sections?.some((pageSection) => pageSection?.__typename === section.sectionTypename),
  )

  const promises = filteredSections.map(async ({ key, fetcher }) => {
    if (swr) {
      // SWR prefetches are allowed to fail, in that case they are not prefetched as fallback and are loaded during the
      // client load. This is useful for e.g. when Meilisearch doesn't work / is missing data, it won't break the build
      // unnecessarily.
      try {
        const data = await fetcher()

        return { [unstable_serialize(key)]: data }
      } catch {
        return {}
      }
    }

    const data = await fetcher()

    return { [key as string]: data }
  })

  // Merge all the fallback objects into a one.
  const fallbacks = await Promise.all(promises)

  return Object.assign({}, ...fallbacks)
}
