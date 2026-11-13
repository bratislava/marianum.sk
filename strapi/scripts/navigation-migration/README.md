# Navigation migration: Navigation plugin → page.parentPage

Scripts for moving the page tree from the Navigation plugin (`strapi-plugin-navigation`) to the page `parentPage` /
`childPages` relation and the header menu to the `Menu` single type (issue #773). Ported from City Library
([mestskakniznica.sk#621](https://github.com/bratislava/mestskakniznica.sk/pull/621)). They are run by hand. All of
them only read from the database, except the SQL migration.

Run them from `strapi/`. The Node scripts connect with the same `DATABASE_*` variables as `config/database.ts`:

```sh
node --env-file=.env.local scripts/navigation-migration/<script>.mjs
```

Output is written to `out/` (gitignored, it contains data from the database).

| Script                                                                  | Phase | What it does                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `audit.mjs`                                                             | 0     | Reports what the migration or the content team has to deal with: items that are not pages, draft pages in the tree, URL segments that differ from the page slug, item titles that differ from the page title, pages outside the tree, slugs. |
| `build-inventory.mjs`                                                   | 0     | Writes every public URL (`out/urls-inventory.tsv`) and every redirect from `next/next.config.ts` (`out/redirects.tsv`), and lists redirects that already end at a non-existing URL.                                                          |
| `check-urls.mjs`                                                        | 0, 2  | Requests the inventory and records status codes and redirect locations. `--compare` compares two runs.                                                                                                                                       |
| `../../database/manual-migrations/navigation-plugin-to-parent-page.sql` | 1     | Copies the plugin tree into `pages_parent_page_links` and its top-level items into the `Menu` single type. A full re-sync, safe to run repeatedly.                                                                                           |
| `verify-parent-pages.mjs`                                               | 1     | Checks that `parentPage` + `slug` give every page the same parent, sibling order and path as the plugin, and that `Menu` has the plugin's top-level pages. Exit code 1 on any difference.                                                    |

## How the new navigation works

- A page's URL is its parent page's URL followed by its own `slug`, a page without a parent is at `/<slug>`. Slugs are
  unique within a locale, the page lifecycle (`src/api/page/content-types/page/lifecycles.ts`) validates them and the
  parent.
- The order of a page's `childPages` is the order of its subpages in the header menu and in the "menu listing" section.
- The header menu shows the pages of the `Menu` single type with their subpages.
- Detail pages (articles, bundles, branches, cemeteries, managed objects, assets) are served under hardcoded path
  prefixes, see `next/services/navigation/contentTypePathPrefixesMap.ts`.

## Phase 0: before changing anything

1. Restore a production dump locally and take a snapshot, so rehearsals can be reset:
   `docker exec <postgres container> pg_dump -U <user> -Fc <database> > before.dump`
2. `audit.mjs`. Agree with the content team on anything it reports. Item titles that differ from the page title are
   fine, the menu and the breadcrumbs will show the page title.
3. `build-inventory.mjs` on a fresh dump.
4. Baseline on production. Keep it light, detail pages are rendered on request:
   ```sh
   node scripts/navigation-migration/check-urls.mjs --base https://marianum.sk --name prod-before --sample 30
   ```

## Phase 1: parentPage next to the Navigation plugin

1. Deploy Strapi with the `parentPage` relation, the `Menu` single type and the page lifecycle, and import the config
   (roles: public read of `Menu`, editors' permissions for `Menu` and the new page fields).
2. Run the SQL migration against the database, then verify:
   ```sh
   psql ... -v ON_ERROR_STOP=1 -f database/manual-migrations/navigation-plugin-to-parent-page.sql
   node --env-file=<env> scripts/navigation-migration/verify-parent-pages.mjs
   ```
3. Until the frontend switches, the plugin stays the source of truth. Don't edit the page tree or the menu in the
   meantime, or re-run the SQL migration and the verification right before the switch.

## Phase 2: after the frontend switch

Run `check-urls.mjs` against the new build with the same options and the same `out/urls-inventory.tsv` as the
baseline. A rebuilt inventory makes `--sample` pick other detail pages, which then can't be compared.

```sh
node scripts/navigation-migration/check-urls.mjs --base <new build> --name after --sample 30 --compare prod-before
```

From now on, the page tree is edited in the page's "Otcovská stránka" field and the menu in the `Menu` single type.
The Navigation plugin is not used anymore and can be removed in the next step.
