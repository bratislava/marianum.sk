/**
 * Phase 1 of the Navigation plugin -> parentPage migration: checks that page.parentPage + slug describe exactly the
 * same tree as the Navigation plugin - same parent, same position among siblings, same full path - and that the Menu
 * single type holds the plugin's top-level pages in the same order. Run it after
 * database/manual-migrations/navigation-plugin-to-parent-page.sql. Read-only. Exit code 1 when anything differs.
 *
 * Usage (from strapi/): node --env-file=.env.local scripts/navigation-migration/verify-parent-pages.mjs
 */
import {
  loadMenuPages,
  loadNavigationPlugin,
  loadPages,
  loadParentLinks,
  withDb,
} from './lib/db.mjs'
import { flattenNavigationPlugin } from './lib/navigation-plugin.mjs'

const problems = []

await withDb(async (client) => {
  const navigation = await loadNavigationPlugin(client)
  const pages = await loadPages(client)
  const links = await loadParentLinks(client)
  const menuPages = await loadMenuPages(client)

  Object.entries(Object.groupBy(links, (link) => link.pageId))
    .filter(([, list]) => list.length > 1)
    .forEach(([pageId, list]) => problems.push(`#${pageId} has ${list.length} parentPage rows`))

  const parentOf = new Map(links.map((link) => [link.pageId, link.parentId]))
  const getPathFromParentPage = (pageId) => {
    const segments = []
    const visited = new Set()
    for (let id = pageId; id != null; id = parentOf.get(id)) {
      if (visited.has(id)) return `<cycle at #${id}>`
      visited.add(id)
      segments.unshift(pages.get(id)?.slug ?? `<missing page #${id}>`)
    }

    return `/${segments.join('/')}`
  }
  const getChildrenFromParentPage = (parentId) =>
    links
      .filter((link) => link.parentId === parentId)
      .sort((a, b) => a.order - b.order)
      .map((link) => link.pageId)

  const pagesInTree = new Set()

  for (const [locale, items] of Object.entries(navigation)) {
    const nodes = flattenNavigationPlugin(items, pages)

    nodes.forEach((node) => {
      const id = node.item.pageId
      if (id == null) {
        problems.push(`[${locale}] item #${node.item.id} ${node.path} is not a page`)

        return
      }
      pagesInTree.add(id)

      const expectedParent = node.parent?.item.pageId ?? null
      const actualParent = parentOf.get(id) ?? null
      if (actualParent !== expectedParent) {
        problems.push(
          `[${locale}] #${id} ${node.path}: parentPage is #${actualParent}, expected #${expectedParent}`
        )
      }

      const path = getPathFromParentPage(id)
      if (path !== node.path) {
        problems.push(
          `[${locale}] #${id}: path from parentPage is ${path}, the plugin has ${node.path}`
        )
      }

      const expectedChildren = nodes
        .filter((child) => child.parent === node)
        .map((child) => child.item.pageId)
      const actualChildren = getChildrenFromParentPage(id)
      if (expectedChildren.join() !== actualChildren.join()) {
        problems.push(
          `[${locale}] #${id} ${node.path}: childPages order [${actualChildren}], the plugin has [${expectedChildren}]`
        )
      }
    })

    const expectedMenu = nodes.filter((node) => !node.parent).map((node) => node.item.pageId)
    const actualMenu = menuPages[locale] ?? []
    if (expectedMenu.join() !== actualMenu.join()) {
      problems.push(
        `[${locale}] Menu pages are [${actualMenu}], the plugin's top-level pages are [${expectedMenu}]`
      )
    }

    console.log(`${locale}: checked ${nodes.length} pages, ${expectedMenu.length} menu pages`)
  }

  links
    .filter((link) => !pagesInTree.has(link.pageId))
    .forEach((link) =>
      problems.push(
        `#${link.pageId} is not in the plugin tree but has parentPage #${link.parentId}`
      )
    )
})

if (problems.length > 0) {
  console.log(`\n${problems.length} problems:`)
  problems.forEach((problem) => console.log(`  ${problem}`))
  process.exit(1)
}
console.log('\nOK: parentPage and Menu match the Navigation plugin (parents, order, paths, menu).')
