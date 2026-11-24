-- Copies the page tree of the Navigation plugin (strapi-plugin-navigation) into the page `parentPage` relation
-- (pages_parent_page_links) and its top-level items into the `Menu` single type (menus_pages_links), for every locale.
--
-- Run manually against the Strapi Postgres database AFTER Strapi was deployed with the page `parentPage` relation and
-- the `Menu` single type (Strapi creates their tables on boot). It is not in database/migrations because Strapi runs
-- those before creating new tables.
--
-- The plugin stays the source of truth until the frontend switches to parentPage, so this is a full re-sync: it replaces
-- all parentPage links and the menu pages with the ones from the plugin. Re-run it right before the switch to pick up
-- navigation changes made in the meantime. Check the result with scripts/navigation-migration/verify-parent-pages.mjs.
--
-- It reads the raw plugin tables, not the rendered navigation, so draft pages keep their place in the tree.
-- page_order is the position among siblings, i.e. the order in which childPages and the menu pages are returned.
--
-- It fails, and changes nothing, when the plugin tree can't be represented by parentPage without changing a URL:
-- an item that is not a page (wrapper or external link), a page placed more than once, a page in another locale, or an
-- item whose URL segment differs from the page's slug.

BEGIN;

CREATE TEMPORARY TABLE navigation_plugin_nodes ON COMMIT DROP AS
WITH RECURSIVE node AS (
  SELECT item.id AS item_id, NULL::integer AS parent_item_id, navigation.locale_code AS locale
  FROM navigations_items item
  JOIN navigations_items_master_links master ON master.navigation_item_id = item.id
  JOIN navigations navigation ON navigation.id = master.navigation_id
  WHERE NOT EXISTS (
    SELECT FROM navigations_items_parent_links parent
    WHERE parent.navigation_item_id = item.id AND parent.inv_navigation_item_id IS NOT NULL
  )
  UNION ALL
  SELECT parent.navigation_item_id, node.item_id, node.locale
  FROM node
  JOIN navigations_items_parent_links parent ON parent.inv_navigation_item_id = node.item_id
)
SELECT node.item_id,
       node.parent_item_id,
       node.locale,
       item.type,
       item.title,
       ltrim(item.path, '/') AS segment,
       item."order" AS item_order,
       related.related_type,
       CASE WHEN related.related_type = 'api::page.page' THEN related.related_id::integer END AS page_id
FROM node
JOIN navigations_items item ON item.id = node.item_id
LEFT JOIN navigations_items_related_links related_link ON related_link.navigation_item_id = item.id
LEFT JOIN navigations_items_related related ON related.id = related_link.navigations_items_related_id;

DO $$
DECLARE
  problems text;
BEGIN
  SELECT string_agg(format('locale %s has %s navigations with items', locale, navigations), ', ') INTO problems
  FROM (
    SELECT navigation.locale_code AS locale, count(DISTINCT navigation.id) AS navigations
    FROM navigations navigation
    JOIN navigations_items_master_links master ON master.navigation_id = navigation.id
    GROUP BY navigation.locale_code
    HAVING count(DISTINCT navigation.id) > 1
  ) x;
  IF problems IS NOT NULL THEN
    RAISE EXCEPTION 'Navigation plugin: %', problems;
  END IF;

  SELECT string_agg(format('item %s "%s" (%s) is not a page', item_id, title, coalesce(related_type, type)), ', ')
  INTO problems
  FROM navigation_plugin_nodes
  WHERE type <> 'INTERNAL' OR page_id IS NULL;
  IF problems IS NOT NULL THEN
    RAISE EXCEPTION 'Navigation plugin: %', problems;
  END IF;

  SELECT string_agg(format('page %s is placed %s times', page_id, placements), ', ') INTO problems
  FROM (
    SELECT page_id, count(*) AS placements FROM navigation_plugin_nodes GROUP BY page_id HAVING count(*) > 1
  ) x;
  IF problems IS NOT NULL THEN
    RAISE EXCEPTION 'Navigation plugin: %', problems;
  END IF;

  SELECT string_agg(format('page %s does not exist in locale %s', node.page_id, node.locale), ', ') INTO problems
  FROM navigation_plugin_nodes node
  LEFT JOIN pages ON pages.id = node.page_id AND pages.locale = node.locale
  WHERE pages.id IS NULL;
  IF problems IS NOT NULL THEN
    RAISE EXCEPTION 'Navigation plugin: %', problems;
  END IF;

  -- The URL segment of an item can be edited in the plugin. parentPage paths are built from slugs, so the URL would
  -- change. Change the page's slug (or the item's path) first.
  SELECT string_agg(format('item %s has path "%s", but page %s has slug "%s"', node.item_id, node.segment,
                           pages.id, pages.slug), ', ')
  INTO problems
  FROM navigation_plugin_nodes node
  JOIN pages ON pages.id = node.page_id
  WHERE node.segment IS DISTINCT FROM pages.slug;
  IF problems IS NOT NULL THEN
    RAISE EXCEPTION 'Navigation plugin: %', problems;
  END IF;
END $$;

DELETE FROM pages_parent_page_links;

INSERT INTO pages_parent_page_links (page_id, inv_page_id, page_order)
SELECT child.page_id,
       parent.page_id,
       row_number() OVER (PARTITION BY child.parent_item_id ORDER BY child.item_order, child.item_id)
FROM navigation_plugin_nodes child
JOIN navigation_plugin_nodes parent ON parent.item_id = child.parent_item_id;

-- Menu is a localized single type, Strapi reads the row of the requested locale.
INSERT INTO menus (created_at, updated_at, locale)
SELECT now(), now(), locale
FROM (SELECT DISTINCT locale FROM navigation_plugin_nodes) node_locale
WHERE NOT EXISTS (SELECT FROM menus WHERE menus.locale = node_locale.locale);

DELETE FROM menus_pages_links
WHERE menu_id IN (SELECT id FROM menus WHERE locale IN (SELECT locale FROM navigation_plugin_nodes));

INSERT INTO menus_pages_links (menu_id, page_id, page_order)
SELECT menus.id,
       node.page_id,
       row_number() OVER (PARTITION BY node.locale ORDER BY node.item_order, node.item_id)
FROM navigation_plugin_nodes node
JOIN menus ON menus.locale = node.locale
WHERE node.parent_item_id IS NULL;

SELECT locale,
       count(*) AS pages_in_tree,
       count(parent_item_id) AS pages_with_parent,
       count(*) FILTER (WHERE parent_item_id IS NULL) AS menu_pages
FROM navigation_plugin_nodes
GROUP BY locale
ORDER BY locale;

COMMIT;
