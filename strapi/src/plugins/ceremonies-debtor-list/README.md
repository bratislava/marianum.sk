# Strapi plugin `ceremonies-debtor-list`

This plugin allows us to upload XLSX files (Excel) and create Ceremonies, Debtors and Disclosures entries.

It's based on similar custom plugin in OLO project, see [waste-collection-days](https://github.com/bratislava/olo.sk/tree/master/strapi/src/plugins/waste-collection-days-import).


It was created using Strapi CLI generator, see [Strapi plugin documentation](https://docs-v4.strapi.io/dev-docs/plugins/development/create-a-plugin).

Main files where the magic happens:
```
./server/routes
./server/controllers
./server/helpers
./admin/src/pages/HomePage
./admin/src/components/ImportSection
```

See also:
```
/strapi/config/plugins.ts
/strapi/package.json         --> build and postinstall scripts
/strapi/Dockerfile
```
