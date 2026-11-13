/**
 * Phase 0 of the Navigation plugin -> parentPage migration: reports everything in the data that the migration or the
 * content team has to deal with. Read-only.
 *
 * Usage (from strapi/): node --env-file=.env.local scripts/navigation-migration/audit.mjs
 */
import { loadNavigationPlugin, loadPages, withDb } from './lib/db.mjs'
import { flattenNavigationPlugin, getAncestors, MAX_LEVELS } from './lib/navigation-plugin.mjs'

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const section = (title, lines) => {
  console.log(`\n--- ${title}`)
  console.log(lines.length > 0 ? lines.map((line) => `  ${line}`).join('\n') : '  none')
}

await withDb(async (client) => {
  const navigation = await loadNavigationPlugin(client)
  const pages = await loadPages(client)

  const treeByLocale = Object.fromEntries(
    Object.entries(navigation).map(([locale, items]) => [
      locale,
      flattenNavigationPlugin(items, pages),
    ])
  )
  const pageIdsInTree = new Set(
    Object.values(treeByLocale).flatMap((nodes) => nodes.map((node) => node.item.pageId))
  )

  for (const [locale, nodes] of Object.entries(treeByLocale)) {
    console.log(
      `\n========== ${locale}: ${nodes.length} items, ${
        nodes.filter((node) => !node.parent).length
      } top-level (become the Menu pages), max depth ${Math.max(0, ...nodes.map((node) => node.level))}`
    )

    section(
      'items that are not a page (parentPage can not keep them)',
      nodes
        .filter((node) => node.item.type !== 'INTERNAL' || node.item.pageId == null)
        .map(
          (node) =>
            `#${node.item.id} ${node.item.type} "${node.item.title}" ${node.path} (related: ${
              node.item.relatedType ?? 'none'
            })`
        )
    )

    section(
      'page items with problems (missing page, other locale, draft, URL segment differs from slug)',
      nodes
        .filter((node) => node.item.pageId != null)
        .flatMap((node) => {
          const { page } = node
          const issues = []
          if (!page) issues.push('PAGE MISSING')
          if (page && page.locale !== locale) issues.push(`page locale is ${page.locale}`)
          if (page && !page.published) {
            const hidden = nodes.filter((other) => getAncestors(other).includes(node)).length
            issues.push(`draft, hides ${hidden} descendant items on the live site`)
          }
          if (page && page.slug !== node.segment) {
            issues.push(`URL segment "${node.segment}" differs from slug "${page.slug}"`)
          }

          return issues.length > 0
            ? [`#${node.item.id} page #${node.item.pageId} ${node.path}: ${issues.join('; ')}`]
            : []
        })
    )

    section(
      'item titles that differ from the page title (menu and breadcrumbs will show the page title)',
      nodes
        .filter((node) => node.page && node.item.title.trim() !== node.page.title.trim())
        .map(
          (node) =>
            `#${node.item.id} ${node.path}: "${node.item.title}" -> "${node.page.title.trim()}"`
        )
    )

    section(
      `items deeper than ${MAX_LEVELS} levels (the frontend fetches only ${MAX_LEVELS})`,
      nodes.filter((node) => node.level > MAX_LEVELS).map((node) => `#${node.item.id} ${node.path}`)
    )

    section(
      'pages placed in the tree more than once',
      Object.entries(Object.groupBy(nodes, (node) => node.item.pageId ?? 'none'))
        .filter(([pageId, list]) => pageId !== 'none' && list.length > 1)
        .map(([pageId, list]) => `#${pageId}: ${list.map((node) => node.path).join(', ')}`)
    )

    section(
      'sibling segment collisions',
      Object.entries(Object.groupBy(nodes, (node) => node.parent?.path ?? '/')).flatMap(
        ([parentPath, siblings]) =>
          Object.entries(Object.groupBy(siblings, (node) => node.segment))
            .filter(([, list]) => list.length > 1)
            .map(([segment]) => `${parentPath}: "${segment}"`)
      )
    )
  }

  for (const locale of new Set([...pages.values()].map((page) => page.locale))) {
    section(
      `[${locale}] pages NOT in the tree (they are top-level URLs before and after the switch)`,
      [...pages.values()]
        .filter((page) => page.locale === locale && !pageIdsInTree.has(page.id))
        .map(
          (page) =>
            `#${page.id} ${page.published ? 'published' : 'draft    '} updated ${page.updatedAt
              .toISOString()
              .slice(0, 10)} /${page.slug}`
        )
    )
  }

  section(
    'slug used by more than one page within a locale (drafts included)',
    Object.entries(Object.groupBy([...pages.values()], (page) => `${page.locale} "${page.slug}"`))
      .filter(([, list]) => list.length > 1)
      .map(
        ([key, list]) =>
          `${key}: ${list
            .map((page) => `#${page.id}${page.published ? '' : ' (draft)'}`)
            .join(', ')}`
      )
  )

  section(
    'slug that is not lowercase-kebab-case (the page lifecycle rejects it once the slug is edited)',
    [...pages.values()]
      .filter((page) => !SLUG_REGEX.test(page.slug ?? ''))
      .map(
        (page) =>
          `#${page.id} (${page.locale}, ${page.published ? 'published' : 'draft'}): ${JSON.stringify(
            page.slug
          )}`
      )
  )
})
