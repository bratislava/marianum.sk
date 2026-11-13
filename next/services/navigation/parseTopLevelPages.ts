import { PagePathsMap } from '@/services/navigation/typesNavigation'

// Ported from City Library:
// https://github.com/bratislava/mestskakniznica.sk/blob/master/next/services/navigation/parseTopLevelPages.ts

/** Structural type, so that every nesting level of `PageEntityChildPagesFragment` fits. */
type PageWithChildPages = {
  attributes?: {
    title: string
    slug?: string | null
    childPages?: { data: PageWithChildPages[] } | null
  } | null
}

/**
 * Strapi returns only published child pages, so unpublished pages drop out together with their subtree.
 */
export const parseTopLevelPages = (pages: PageWithChildPages[]) => {
  const pagePathsMap: PagePathsMap = {}

  const parsePages = (
    childPages: PageWithChildPages[],
    parent: { slug: string; path: string } | null,
  ): string[] =>
    childPages.flatMap((page) => {
      const { title, slug, childPages: grandChildPages } = page.attributes ?? {}

      if (!slug || !title) {
        return []
      }

      const path = `${parent?.path ?? ''}/${slug}`
      pagePathsMap[slug] = {
        title,
        path,
        parentSlug: parent?.slug ?? null,
        childSlugs: parsePages(grandChildPages?.data ?? [], { slug, path }),
      }

      return [slug]
    })

  parsePages(pages, null)

  return { pagePathsMap }
}
