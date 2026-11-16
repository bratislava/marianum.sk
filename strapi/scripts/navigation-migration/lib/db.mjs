import pg from 'pg'

/**
 * Connects with the same environment variables and defaults as config/database.ts. Run the scripts with the env file
 * Strapi uses, e.g. `node --env-file=.env.local scripts/navigation-migration/audit.mjs`.
 */
export const withDb = async (callback) => {
  const client = new pg.Client({
    host: process.env.DATABASE_HOST ?? '127.0.0.1',
    port: Number(process.env.DATABASE_PORT ?? 5432),
    database: process.env.DATABASE_NAME ?? 'strapi',
    user: process.env.DATABASE_USERNAME ?? 'strapi',
    password: process.env.DATABASE_PASSWORD ?? 'password',
  })
  await client.connect()

  try {
    return await callback(client)
  } finally {
    await client.end()
  }
}

const query = async (client, sql) => (await client.query(sql)).rows

/**
 * Raw items of the Navigation plugin by locale `{ [locale]: Item[] }`, including items of draft pages (unlike the
 * rendered navigation). `parentId` is null for top-level items, `pageId` is null for items that are not a page.
 */
export const loadNavigationPlugin = async (client) => {
  const items = await query(
    client,
    `SELECT item.id,
            parent.inv_navigation_item_id AS "parentId",
            navigation.locale_code AS locale,
            item.type,
            item.title,
            item.path,
            item."order",
            related.related_type AS "relatedType",
            CASE WHEN related.related_type = 'api::page.page' THEN related.related_id::integer END AS "pageId"
     FROM navigations_items item
     JOIN navigations_items_master_links master ON master.navigation_item_id = item.id
     JOIN navigations navigation ON navigation.id = master.navigation_id
     LEFT JOIN navigations_items_parent_links parent ON parent.navigation_item_id = item.id
     LEFT JOIN navigations_items_related_links related_link ON related_link.navigation_item_id = item.id
     LEFT JOIN navigations_items_related related ON related.id = related_link.navigations_items_related_id
     ORDER BY item."order", item.id`
  )

  return Object.groupBy(items, (item) => item.locale)
}

/** All page rows (every locale, drafts included) by id. */
export const loadPages = async (client) => {
  const pages = await query(
    client,
    `SELECT id, locale, published_at IS NOT NULL AS published, slug, title, updated_at AS "updatedAt"
     FROM pages
     ORDER BY id`
  )

  return new Map(pages.map((page) => [page.id, page]))
}

/** Rows of the page `parentPage` relation. `order` is the position of the page among its parent's childPages. */
export const loadParentLinks = async (client) =>
  query(
    client,
    'SELECT page_id AS "pageId", inv_page_id AS "parentId", page_order AS "order" FROM pages_parent_page_links'
  )

/**
 * The Menu single type by locale `{ [locale]: MenuItem[] }`, in order: menu items > sections > links.
 * A menu item is `{ label, pageId, sections }`, a section `{ label, pageId, links }` and a link `{ label, pageId }`.
 * `pageId` is the page the entry links to, null when it links elsewhere or nowhere.
 */
export const loadMenu = async (client) => {
  const menuItems = await query(
    client,
    `SELECT menus.locale, item.id, item.label
     FROM menus
     JOIN menus_components component ON component.entity_id = menus.id AND component.field = 'menuItems'
     JOIN components_menu_menu_items item ON item.id = component.component_id
     ORDER BY component."order", component.id`
  )
  const itemComponents = await query(
    client,
    `SELECT entity_id AS "entityId", component_id AS "componentId", field
     FROM components_menu_menu_items_components
     ORDER BY "order", id`
  )
  const sections = await query(client, 'SELECT id, label FROM components_menu_menu_sections')
  const sectionComponents = await query(
    client,
    `SELECT entity_id AS "entityId", component_id AS "componentId", field
     FROM components_menu_menu_sections_components
     ORDER BY "order", id`
  )
  const links = await query(
    client,
    `SELECT link.id, link.label, page.page_id AS "pageId"
     FROM components_menu_menu_links link
     LEFT JOIN components_menu_menu_links_page_links page ON page.menu_link_id = link.id`
  )

  const sectionById = new Map(sections.map((section) => [section.id, section]))
  const linkById = new Map(links.map((link) => [link.id, link]))
  const getComponents = (components, entityId, field) =>
    components
      .filter((component) => component.entityId === entityId && component.field === field)
      .map((component) => component.componentId)
  const getLinks = (components, entityId, field) =>
    getComponents(components, entityId, field)
      .map((id) => linkById.get(id))
      .filter(Boolean)
      .map((link) => ({ label: link.label, pageId: link.pageId ?? null }))

  const menu = menuItems.map((menuItem) => ({
    locale: menuItem.locale,
    label: menuItem.label,
    pageId: getLinks(itemComponents, menuItem.id, 'seeAllLink')[0]?.pageId ?? null,
    sections: getComponents(itemComponents, menuItem.id, 'sections')
      .map((id) => sectionById.get(id))
      .filter(Boolean)
      .map((section) => ({
        label: section.label,
        pageId: getLinks(sectionComponents, section.id, 'link')[0]?.pageId ?? null,
        links: getLinks(sectionComponents, section.id, 'links'),
      })),
  }))

  return Object.groupBy(menu, (menuItem) => menuItem.locale)
}

/**
 * Published detail pages (branches, cemeteries and managed objects have no drafts) by the path prefix they are served under, the same prefixes as
 * next/services/navigation/contentTypePathPrefixesMap.ts. Only Slovak, the site has no other locale.
 */
export const DETAIL_PAGES = [
  {
    kind: 'article-news',
    prefix: '/aktuality/novinky',
    sql: `SELECT a.slug FROM articles a
          JOIN articles_news_category_links l ON l.article_id = a.id
          WHERE a.published_at IS NOT NULL AND a.locale = 'sk'
            AND NOT EXISTS (SELECT FROM articles_press_category_links p WHERE p.article_id = a.id)`,
  },
  {
    kind: 'article-press',
    prefix: '/o-nas/pre-media',
    sql: `SELECT a.slug FROM articles a
          JOIN articles_press_category_links l ON l.article_id = a.id
          WHERE a.published_at IS NOT NULL AND a.locale = 'sk'`,
  },
  {
    kind: 'article-jobs',
    prefix: '/aktuality/kariera',
    sql: `SELECT a.slug FROM articles a
          JOIN articles_jobs_category_links l ON l.article_id = a.id
          WHERE a.published_at IS NOT NULL AND a.locale = 'sk'
            AND NOT EXISTS (SELECT FROM articles_press_category_links p WHERE p.article_id = a.id)
            AND NOT EXISTS (SELECT FROM articles_news_category_links n WHERE n.article_id = a.id)`,
  },
  {
    kind: 'branch',
    prefix: '/o-nas/kontakty',
    sql: `SELECT slug FROM branches WHERE locale = 'sk'`,
  },
  {
    kind: 'bundle-burial',
    prefix: '/sluzby/balicky-pohrebov/rozlucka-na-cintorine',
    sql: `SELECT slug FROM bundles WHERE published_at IS NOT NULL AND locale = 'sk' AND type = 'pochovanie'`,
  },
  {
    kind: 'bundle-cremation',
    prefix: '/sluzby/balicky-pohrebov/kremacia',
    sql: `SELECT slug FROM bundles WHERE published_at IS NOT NULL AND locale = 'sk' AND type = 'kremacia'`,
  },
  {
    kind: 'bundle-natural',
    prefix: '/sluzby/balicky-pohrebov/prirodne-obrady',
    sql: `SELECT slug FROM bundles WHERE published_at IS NOT NULL AND locale = 'sk' AND type = 'prirodne'`,
  },
  {
    kind: 'cemetery',
    prefix: '/o-nas/cintoriny-v-sprave',
    sql: `SELECT slug FROM cemeteries WHERE locale = 'sk'`,
  },
  {
    kind: 'managed-object',
    prefix: '/o-nas/starostlivost-o-mestske-fontany',
    sql: `SELECT slug FROM managed_objects WHERE locale = 'sk'`,
  },
  {
    kind: 'asset',
    prefix: '/o-nas/dokumenty',
    sql: `SELECT slug FROM assets WHERE published_at IS NOT NULL`,
  },
]

/** `{ kind, url }` of every published detail page. */
export const loadDetailUrls = async (client) => {
  const urls = []
  for (const { kind, prefix, sql } of DETAIL_PAGES) {
    const rows = await query(client, `${sql} ORDER BY 1`)
    rows
      .filter((row) => row.slug)
      .forEach((row) => urls.push({ kind, url: `${prefix}/${row.slug}` }))
  }

  return urls
}
