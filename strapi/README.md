# 🚀 Marianum Strapi

## Setup

You need postgres running locally (with correct credentials & databse available). The easiest way to get a postgres db with the right credentials up&running is via `docker-compose.yml` file in the root fo this repo.

Also, please copy all variables from `.env.example` file to `.env` file.

### Install dependecies

Before you start, install all dependencies using by running

```
yarn
```

## Start development server

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
yarn develop
```

## Start server

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
yarn start
```

## Build

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
yarn build
```
