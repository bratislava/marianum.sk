import { PagePathsMap } from '@/services/navigation/typesNavigation'

// Ported from City Library:
// https://github.com/bratislava/mestskakniznica.sk/blob/master/next/services/navigation/parseTopLevelPages.ts

/** Structural type, so that every nesting level of `PageEntityChildPagesFragment` fits. */
type PageWithChildPages = {
  attributes?: {
    title: string
    slug: string
    childPages?: { data: PageWithChildPages[] } | null
  } | null
}

/**
 * Builds the paths of all pages from the page tree: every page's path is its parent's path followed by its own slug.
 *
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

      // Slugs are unique within a locale (Strapi page lifecycle), a duplicate would overwrite the first page.
      if (!slug || !title || pagePathsMap[slug]) {
        return []
      }

      const path = `${parent?.path ?? ''}/${slug}`
      const node: NonNullable<PagePathsMap[string]> = {
        title: title.trim(),
        path,
        parentSlug: parent?.slug ?? null,
        childSlugs: [],
      }
      // Added before its children are parsed, so a child with the same slug can't overwrite it.
      pagePathsMap[slug] = node
      node.childSlugs = parsePages(grandChildPages?.data ?? [], { slug, path })

      return [slug]
    })

  parsePages(pages, null)

  return { pagePathsMap }
}
