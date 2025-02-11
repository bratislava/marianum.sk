# 🚀 Marianum Strapi

## First-time setup

Install all dependencies

```
yarn
```

Create `.env.local` file based on `.env.example` which is .gitignored and used for local dev.

```
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
