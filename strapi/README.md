# 🚀 Marianum Strapi

## Setup

Before you start, install all dependencies and create `.env.local` file which is .gitignored and used for local dev.

```
yarn
cp .env.example .env.local
```

You need postgres running locally (with correct credentials & database available). The easiest way to get a postgres db with the right credentials up&running is via `docker-compose.yml` file. Check the readme in the root of this repo.

## Build

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
yarn build
```

## Start development server

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
yarn dev
```

## Start server

Start your Strapi application with autoReload disabled (not needed for development). [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
yarn start
```

## Set permissions

To allow graphql queries, you need to give access to Public role:

Open Strapi admin panel, go to Settings > USERS & PERMISSIONS PLUGIN > Roles > Public. Check `find` and `findOne` for all content types.

## Load Navigation plugin config

You also need to load configuration for Navigation plugin:

In admin panel, go to Settings > NAVIGATION PLUGIN > Configuration, scroll down and press 'Restore configuration'. Then scroll up and press 'Restart Strapi'.

## Change Navigation plugin config

To add more content types to choose from in navigation, update config for navigation plugin in `/src/config/plugin.ts`. Don't forget to update graphql fragments and queries and generate types (see readme in `next` folder).

## Using `patch-package`

We use `patch-package` to apply patches to dependencies.

### @strapi/admin
Strapi transpiled files are located in `./node_modules/@strapi/[package-name]/dist/_chunks` so it's needed to make the changes and run patch-package on every Strapi upgrade.

In Richtext editor, when image is inserted it originally takes only the image's alt text, but not the caption.
We change this behaviour, and we pass caption with alt text as `![alt||caption](url)` so we can use both on the frontend.

Find the proper chunk by searching for `alt: f.alternativeText || f.name`, change it to
``alt: `${f.alternativeText}||${f.caption}` ``
and then run the command to create a patch file:
```bash
yarn patch-package @strapi/admin
```
> Note that we use custom syntax, because at that time, we didn't know the proper syntax for caption (=title) in markdown that is `![alt](src "title")`.

### @strapi/plugin-content-manager
Strapi transpiled files for this plugin are located in `./node_modules/@strapi/plugin-content-manager/dist/server` so it's needed to make the changes and run patch-package on every Strapi upgrade.

When using slugify, for example when auto creating slug for pages, 'ä' character is not converted to 'a'.
We change this behaviour, and convert character 'ä' to 'a' in slug with `customReplacements: [ ['ä', 'a'] ]`

Find the proper chunk by searching for `value: slugify(targetValue, options)`, change it to 
``value: slugify(targetValue, {...options, customReplacements: [ ['ä', 'a'] ] }),`` and also
find `value: slugify__default.default(targetValue, options)`, change it to 
``value: slugify__default.default(targetValue, {...options, customReplacements: [ ['ä', 'a'] ] })``
and then run the command to create a patch file:
```bash
yarn patch-package @strapi/plugin-content-manager
```
