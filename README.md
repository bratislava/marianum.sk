# Marianum (marianum.sk)

This project is led by the [Department of Innovation and Technology of the City of Bratislava](https://inovacie.bratislava.sk). We’re making it entirely open-source as we believe this promotes [savings, collaboration, auditability and innovation](https://publiccode.eu) in the public sector.

Our goal is to be transparent about services we’re developing and providing, as well as to invite other cities and municipalities to build on top of the same or similar open-source technologies we’ve already tested and used - to foster an ecosystem of collaboration between teams facing similar challenges. We’ll be happy to [get in touch.](mailto:innovationteam@bratislava.sk)

We intend to make many more of our projects open-source by the end of 2022 - stay tuned!

> If you are an individual or a company who’d like to take part in these efforts, collaborate closely on development or report an issue, we’d love to hear from you! 🙌 Contact us using this repository or at [innovationteam@bratislava.sk](mailto:innovationteam@bratislava.sk)

## What's here

🏡 `/next` Next.js web app

🗄️ `/strapi` Strapi CMS server

🐳 `docker-compose.yml` providing postgres database

## Local installation

Follow user guide in folders `/strapi` and `/next`.

You need `node` and `yarn` installed locally.

If you want to start a postgres database and meilisearch instance with correct credentials, simply run:

```bash
docker-compose up -d
```

You need `docker` installed locally.

### Meilisearch

After initial `docker-compose up` you have to set keys for meilisearch for both the strapi and nextjs. To get them run the command below.

```
curl --request GET \
  --url http://localhost:7700/keys \
  --header 'Authorization: Bearer masterKey' \
  --header 'Content-Type: application/json' | json_pp
```

Then use "Default Admin API Key" for strapi in `strapi/.env.local` as `MEILISEARCH_ADMIN_API_KEY` and "Default Search API Key" in `next/.env.local` file as `NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY`.


## Stay in touch
[https://inovacie.bratislava.sk/](https://inovacie.bratislava.sk/)

----
Note: We removed a huge part of code that implemented an application form ("žiadosť") in [#473](https://github.com/bratislava/marianum.sk/pull/474). We keep it here as this note for future reference.
