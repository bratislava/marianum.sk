/** sk is the default locale, so its URLs have no prefix (next/next-i18next.config.js). */
export const LOCALE_PREFIX = { sk: '', en: '/en' }

/** Must be the same as MAX_LEVELS in src/api/page/content-types/page/lifecycles.ts. */
export const MAX_LEVELS = 5

/**
 * Flattens one locale of the Navigation plugin items (see `loadNavigationPlugin`) into a list of nodes, depth-first
 * in tree order. Paths are built the same way as the plugin's rendered TREE navigation: every ancestor's `path`
 * joined with "/". They don't contain the locale prefix.
 */
export const flattenNavigationPlugin = (items, pages) => {
  const nodes = []
  const childrenOf = Object.groupBy(items ?? [], (item) => item.parentId ?? 'root')

  const visit = (parentKey, parent) => {
    ;(childrenOf[parentKey] ?? [])
      .toSorted((a, b) => a.order - b.order || a.id - b.id)
      .forEach((item, index) => {
        const page = item.pageId == null ? undefined : pages.get(item.pageId)
        const segment = (item.path ?? '').replace(/^\//, '')
        const node = {
          item,
          parent,
          index,
          page,
          segment,
          level: (parent?.level ?? 0) + 1,
          path: `${parent?.path ?? ''}/${segment}`,
          // The plugin drops items of draft pages from the live site together with their whole subtree.
          live: (parent?.live ?? true) && (item.pageId == null || Boolean(page?.published)),
        }
        nodes.push(node)
        visit(item.id, node)
      })
  }
  visit('root', null)

  return nodes
}

export const getAncestors = (node) => {
  const ancestors = []
  for (let current = node.parent; current; current = current.parent) {
    ancestors.push(current)
  }

  return ancestors
}
