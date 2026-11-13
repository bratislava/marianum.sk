/**
 * Phase 0 of the Navigation plugin -> parentPage migration: writes every public URL of the site and every redirect
 * from next/next.config.ts, so the same URLs can be checked before and after the switch (check-urls.mjs).
 * Read-only towards the database.
 *
 * Usage (from strapi/): node --env-file=.env.local scripts/navigation-migration/build-inventory.mjs
 *
 * Output (gitignored):
 *   out/urls-inventory.tsv  kind<TAB>url
 *   out/redirects.tsv       source<TAB>destination<TAB>final destination after redirect chains<TAB>ok|broken
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'

import { loadDetailUrls, loadNavigationPlugin, loadPages, withDb } from './lib/db.mjs'
import { flattenNavigationPlugin, LOCALE_PREFIX } from './lib/navigation-plugin.mjs'

const OUT_DIR = new URL('./out/', import.meta.url)
const NEXT_CONFIG = new URL('../../../next/next.config.ts', import.meta.url)

const urls = new Map() // url -> kind

await withDb(async (client) => {
  const navigation = await loadNavigationPlugin(client)
  const pages = await loadPages(client)

  urls.set('/', 'home')
  urls.set('/vyhladavanie', 'static')

  const pageIdsInTree = new Set()
  for (const [locale, items] of Object.entries(navigation)) {
    const prefix = LOCALE_PREFIX[locale] ?? `/${locale}`
    flattenNavigationPlugin(items, pages).forEach((node) => {
      pageIdsInTree.add(node.item.pageId)
      if (node.live && node.page) urls.set(`${prefix}${node.path}`, 'page')
    })
  }

  // The frontend falls back to `/<slug>` for pages that are not in the navigation, they are top-level pages in the
  // parentPage tree too.
  ;[...pages.values()]
    .filter((page) => page.published && !pageIdsInTree.has(page.id))
    .forEach((page) =>
      urls.set(`${LOCALE_PREFIX[page.locale] ?? `/${page.locale}`}/${page.slug}`, 'page-top-level')
    )

  const detailUrls = await loadDetailUrls(client)
  detailUrls.forEach(({ kind, url }) => urls.set(url, `detail:${kind}`))
})

// Redirects are plain object literals in next.config.ts, so a regex over the `redirects()` part is enough. Redirects
// with a `has` condition are skipped, they only apply with a query parameter.
const nextConfig = await readFile(NEXT_CONFIG, 'utf8')
const redirectsSource = nextConfig.slice(nextConfig.indexOf('async redirects()'))
const redirects = [
  ...redirectsSource.matchAll(/source:\s*'([^']*)',\s*destination:\s*'([^']*)'/g),
].map(
  // `\\:` escapes path-to-regexp syntax, the real path contains just `:`
  ([, source, destination]) => ({ source: source.replaceAll('\\', ''), destination })
)
const redirectMap = new Map(redirects.map(({ source, destination }) => [source, destination]))

const resolveChain = (destination) => {
  let current = destination
  for (let hop = 0; hop < 10 && redirectMap.has(current.split('?')[0]); hop += 1) {
    current = redirectMap.get(current.split('?')[0])
  }

  return current
}

const existsToday = (destination) => {
  const path = destination.split(/[?#]/)[0].replace(/\/$/, '') || '/'

  return urls.has(path) || path.startsWith('/api/')
}

const checkedRedirects = redirects.map((redirect) => {
  const finalDestination = resolveChain(redirect.destination)

  return { ...redirect, finalDestination, status: existsToday(finalDestination) ? 'ok' : 'broken' }
})

await mkdir(OUT_DIR, { recursive: true })
await writeFile(
  new URL('urls-inventory.tsv', OUT_DIR),
  `${[...urls.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([url, kind]) => `${kind}\t${url}`)
    .join('\n')}\n`
)
await writeFile(
  new URL('redirects.tsv', OUT_DIR),
  `${checkedRedirects
    .map(({ source, destination, finalDestination, status }) =>
      [source, destination, finalDestination, status].join('\t')
    )
    .join('\n')}\n`
)

const kinds = Object.groupBy([...urls.values()], (kind) => kind)
console.log(`URLs: ${urls.size}`)
Object.entries(kinds)
  .sort(([, a], [, b]) => b.length - a.length)
  .forEach(([kind, list]) => console.log(`  ${kind.padEnd(24)} ${list.length}`))

const broken = checkedRedirects.filter(({ status }) => status === 'broken')
console.log(
  `\nRedirects: ${redirects.length}, ending at a URL that does not exist today: ${broken.length}`
)
broken.forEach(({ source, finalDestination }) =>
  console.log(`  ${source}  ->  ${finalDestination}`)
)
console.log(`\nWritten to ${OUT_DIR.pathname}`)
