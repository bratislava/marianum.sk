/**
 * Phase 1 of the Navigation plugin -> parentPage migration: checks that page.parentPage + slug describe exactly the
 * same tree as the Navigation plugin - same parent, same position among siblings, same full path - and that the Menu
 * single type holds the first three levels of the plugin's live tree (menu items > sections > links) in the same
 * order. Run it after database/manual-migrations/navigation-plugin-to-parent-page.sql. Read-only. Exit code 1 when
 * anything differs.
 *
 * Usage (from strapi/): node --env-file=.env.local scripts/navigation-migration/verify-parent-pages.mjs
 */
import { loadMenu, loadNavigationPlugin, loadPages, loadParentLinks, withDb } from './lib/db.mjs'
import { flattenNavigationPlugin } from './lib/navigation-plugin.mjs'

const problems = []

/** One line per menu entry, e.g. `2.1.3 #55` for the third link of the first section of the second menu item. */
const getMenuLines = (menuItems) => {
  const getLine = (position, { label, pageId }) =>
    `${position.join('.')} #${pageId}${label ? ` "${label}"` : ''}`

  return menuItems.flatMap((menuItem, i) => [
    getLine([i + 1], menuItem),
    ...menuItem.sections.flatMap((section, j) => [
      getLine([i + 1, j + 1], section),
      ...section.links.map((link, k) => getLine([i + 1, j + 1, k + 1], link)),
    ]),
  ])
}

await withDb(async (client) => {
  const navigation = await loadNavigationPlugin(client)
  const pages = await loadPages(client)
  const links = await loadParentLinks(client)
  const menu = await loadMenu(client)

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

    // The menu has the first three levels of the live tree: menu items > sections > links. Menu items and sections
    // are labelled with the page title, links have no label and show the title of their page.
    const getLiveChildren = (parent) => nodes.filter((node) => node.parent === parent && node.live)
    const expectedMenu = getLiveChildren(null).map((menuItem) => ({
      label: menuItem.page?.title.trim(),
      pageId: menuItem.item.pageId,
      sections: getLiveChildren(menuItem).map((section) => ({
        label: section.page?.title.trim(),
        pageId: section.item.pageId,
        links: getLiveChildren(section).map((link) => ({ label: null, pageId: link.item.pageId })),
      })),
    }))
    const expectedLines = getMenuLines(expectedMenu)
    const actualLines = getMenuLines(menu[locale] ?? [])

    expectedLines
      .filter((line) => !actualLines.includes(line))
      .forEach((line) => problems.push(`[${locale}] Menu is missing ${line}`))
    actualLines
      .filter((line) => !expectedLines.includes(line))
      .forEach((line) => problems.push(`[${locale}] Menu has ${line}, the plugin doesn't`))

    console.log(
      `${locale}: checked ${nodes.length} pages, ${expectedMenu.length} menu items with ${
        expectedLines.length - expectedMenu.length
      } sections and links`
    )
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
