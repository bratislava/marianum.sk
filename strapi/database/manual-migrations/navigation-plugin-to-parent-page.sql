-- Copies the page tree of the Navigation plugin (strapi-plugin-navigation) into the page `parentPage` relation
-- (pages_parent_page_links) and its first three levels into the `Menu` single type, for every locale.
--
-- Run manually against the Strapi Postgres database AFTER Strapi was deployed with the page `parentPage` relation and
-- the `Menu` single type (Strapi creates their tables on boot). It is not in database/migrations because Strapi runs
-- those before creating new tables.
--
-- The plugin stays the source of truth until the frontend switches to parentPage, so this is a full re-sync: it replaces
-- all parentPage links and the whole menu with the ones from the plugin. Re-run it right before the switch to pick up
-- navigation changes made in the meantime. Check the result with scripts/navigation-migration/verify-parent-pages.mjs.
--
-- parentPage: it reads the raw plugin tables, not the rendered navigation, so draft pages keep their place in the tree.
-- page_order is the position among siblings, i.e. the order in which childPages are returned.
--
-- Menu (same structure as olo.sk, menu items > sections > links): a top-level item becomes a menu item, its children
-- become the item's sections and their children the sections' links. Menu items and sections are labelled with the
-- page title, links have no label, so they show the title of their page. Draft pages are left out with their
-- subtree, like the plugin leaves them out of the live site. Deeper levels are not in the menu.
--
-- It fails, and changes nothing, when the plugin tree can't be represented by parentPage without changing a URL:
-- an item that is not a page (wrapper or external link), a page placed more than once, a page in another locale, or an
-- item whose URL segment differs from the page's slug. It also fails when a locale has more published top-level pages
-- than the menu has items (see `max` of menuItems in src/api/menu/content-types/menu/schema.json).

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

-- Published pages of the first three levels. `component_id` is the id of the menu item (level 1) or the section
-- (level 2), `link_id` is the id of the menu link pointing to the page. The ids are taken from the sequences here, so
-- the rows can be inserted with their relations in any order.
CREATE TEMPORARY TABLE navigation_plugin_menu_nodes ON COMMIT DROP AS
WITH RECURSIVE menu_node AS (
  SELECT node.item_id, node.parent_item_id, node.locale, node.page_id, node.item_order, 1 AS level
  FROM navigation_plugin_nodes node
  JOIN pages ON pages.id = node.page_id AND pages.published_at IS NOT NULL
  WHERE node.parent_item_id IS NULL
  UNION ALL
  SELECT node.item_id, node.parent_item_id, node.locale, node.page_id, node.item_order, menu_node.level + 1
  FROM menu_node
  JOIN navigation_plugin_nodes node ON node.parent_item_id = menu_node.item_id
  JOIN pages ON pages.id = node.page_id AND pages.published_at IS NOT NULL
  WHERE menu_node.level < 3
)
SELECT menu_node.*,
       btrim(pages.title) AS label,
       row_number() OVER (
         PARTITION BY menu_node.locale, menu_node.parent_item_id ORDER BY menu_node.item_order, menu_node.item_id
       ) AS position,
       CASE menu_node.level
         WHEN 1 THEN nextval('components_menu_menu_items_id_seq')
         WHEN 2 THEN nextval('components_menu_menu_sections_id_seq')
       END::integer AS component_id,
       nextval('components_menu_menu_links_id_seq')::integer AS link_id
FROM menu_node
JOIN pages ON pages.id = menu_node.page_id;

DO $$
DECLARE
  problems text;
BEGIN
  SELECT string_agg(format('locale %s has %s published top-level pages, the menu has at most 4 items', locale, items),
                    ', ')
  INTO problems
  FROM (
    SELECT locale, count(*) AS items FROM navigation_plugin_menu_nodes WHERE level = 1 GROUP BY locale HAVING count(*) > 4
  ) x;
  IF problems IS NOT NULL THEN
    RAISE EXCEPTION 'Navigation plugin: %', problems;
  END IF;
END $$;

-- Remove the current menu of the migrated locales. Deleting a component deletes the rows that link it to its own
-- components and relations (ON DELETE CASCADE), but not those components themselves, so collect them first.
CREATE TEMPORARY TABLE old_menu_items ON COMMIT DROP AS
SELECT menus_components.id AS row_id, menus_components.component_id AS id
FROM menus_components
JOIN menus ON menus.id = menus_components.entity_id
WHERE menus_components.field = 'menuItems' AND menus.locale IN (SELECT locale FROM navigation_plugin_nodes);

CREATE TEMPORARY TABLE old_menu_sections ON COMMIT DROP AS
SELECT component_id AS id
FROM components_menu_menu_items_components
WHERE field = 'sections' AND entity_id IN (SELECT id FROM old_menu_items);

DELETE FROM components_menu_menu_links
WHERE id IN (
  SELECT component_id FROM components_menu_menu_items_components
  WHERE field = 'seeAllLink' AND entity_id IN (SELECT id FROM old_menu_items)
  UNION ALL
  SELECT component_id FROM components_menu_menu_sections_components
  WHERE field IN ('link', 'links') AND entity_id IN (SELECT id FROM old_menu_sections)
);
DELETE FROM components_menu_menu_sections WHERE id IN (SELECT id FROM old_menu_sections);
DELETE FROM components_menu_menu_items WHERE id IN (SELECT id FROM old_menu_items);
DELETE FROM menus_components WHERE id IN (SELECT row_id FROM old_menu_items);

INSERT INTO components_menu_menu_links (id)
SELECT link_id FROM navigation_plugin_menu_nodes;

INSERT INTO components_menu_menu_links_page_links (menu_link_id, page_id)
SELECT link_id, page_id FROM navigation_plugin_menu_nodes;

INSERT INTO components_menu_menu_items (id, label)
SELECT component_id, label FROM navigation_plugin_menu_nodes WHERE level = 1;

INSERT INTO components_menu_menu_sections (id, label)
SELECT component_id, label FROM navigation_plugin_menu_nodes WHERE level = 2;

INSERT INTO menus_components (entity_id, component_id, component_type, field, "order")
SELECT menus.id, node.component_id, 'menu.menu-item', 'menuItems', node.position
FROM navigation_plugin_menu_nodes node
JOIN menus ON menus.locale = node.locale
WHERE node.level = 1;

INSERT INTO components_menu_menu_items_components (entity_id, component_id, component_type, field, "order")
SELECT component_id, link_id, 'menu.menu-link', 'seeAllLink', 1
FROM navigation_plugin_menu_nodes
WHERE level = 1
UNION ALL
SELECT item.component_id, section.component_id, 'menu.menu-section', 'sections', section.position
FROM navigation_plugin_menu_nodes section
JOIN navigation_plugin_menu_nodes item ON item.item_id = section.parent_item_id
WHERE section.level = 2;

INSERT INTO components_menu_menu_sections_components (entity_id, component_id, component_type, field, "order")
SELECT component_id, link_id, 'menu.menu-link', 'link', 1
FROM navigation_plugin_menu_nodes
WHERE level = 2
UNION ALL
SELECT section.component_id, link.link_id, 'menu.menu-link', 'links', link.position
FROM navigation_plugin_menu_nodes link
JOIN navigation_plugin_menu_nodes section ON section.item_id = link.parent_item_id
WHERE link.level = 3;

SELECT node.locale,
       count(*) AS pages_in_tree,
       count(node.parent_item_id) AS pages_with_parent,
       count(*) FILTER (WHERE menu_node.level = 1) AS menu_items,
       count(*) FILTER (WHERE menu_node.level = 2) AS menu_sections,
       count(*) FILTER (WHERE menu_node.level = 3) AS menu_links,
       count(*) FILTER (WHERE menu_node.item_id IS NULL) AS pages_not_in_menu
FROM navigation_plugin_nodes node
LEFT JOIN navigation_plugin_menu_nodes menu_node ON menu_node.item_id = node.item_id
GROUP BY node.locale
ORDER BY node.locale;

COMMIT;
