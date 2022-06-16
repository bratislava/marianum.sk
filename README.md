# Marianum

Simple Strapi v4 + Next.js app

## What's here

🏡 `/next` marianum.sk Nextjs web app

🗄️ `/strapi` Strapi CMS server for marianum.sk

🐳 `docker-compose.yml`

## Quick run

If you want to run an application strapi and next without installing it locally quickly, you can run it through `docker-compose`:

```bash
docker-compose up
```

## Local installation

Follow user guide in folders `/strapi` and `/next`.

## Deployment

### Manual

You can use our `bratiska-cli`, which takes care of deploying the app.

1. First, install the utility:

   ```bash
   yarn global add bratislava/bratiska-cli
   ```

2. then go to folder of `/strapi` or `/next` and run just this command:
   ```bash
   bartiska-cli deploy
   ```

That`s all, everything should run automatically and if not you will be notified. You can also check [user guide of bratiska-cli](https://github.com/bratislava/bratiska-cli/blob/master/README.md).

### Pipelines

TODO

## Stay in touch

- Website - [https://inovacie.bratislava.sk/](https://inovacie.bratislava.sk/)
