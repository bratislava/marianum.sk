# marianum.sk

This readme should get you up & running.

## First-time setup

Install dependencies and create `.env.local` file which is .gitignored and used for local dev:

```
npm install
cp .env.example .env.local
```

For CMS setup see `strapi` directory. `.env.example` points to a local Strapi - you can also run the project against the deployed Strapi (useful when developing and debugging, provided that you're not working on Strapi model changes) by uncommenting the alternative `NEXT_PUBLIC_STRAPI_URL` and `NEXT_PUBLIC_MEILISEARCH_*` values in your `.env.local`.

## Run project locally

```
npm run dev
```

## Generate GraphQL

When you change something in Strapi Content type builder, and/or if you change GraphQL queries, you always need to generate new types using Strapi SKD. To update querier, modify files in `graphql/queries` directory.

> Note: Strapi V4 does not export schema.graphql by default - instead, you'll need a running server to generate types from graphql endpoint. The Strapi url is set up directly in `codege.yml` file.

To generate new types run:

```bash
npm run gen
```

For more information, refer to [the documentation](/docs/libs/Strapi-SDK.md).

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Static Site Generation

If you want to test static site generation locally, you need to run `npm run build` and `npm run start`. Both commands read your `.env.local`, so the local `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337` from `.env.example` applies here as well.
