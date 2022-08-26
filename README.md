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

If you want to start a postgres database witch correct credentials, simply run:

```bash
docker-compose up -d
```

You need `docker` installed locally.

## Deployment

### Manual

You can use our `bratiska-cli`, which takes care of deploying the app.

1. First, install the utility:

   ```bash
   yarn global add bratislava/bratiska-cli
   ```

2. then go to folder of `/strapi` or `/next` and run just this command:
   ```bash
   bratiska-cli deploy
   ```

That`s all, everything should run automatically and if not you will be notified. You can also check [user guide of bratiska-cli](https://github.com/bratislava/bratiska-cli/blob/master/README.md).

### Pipelines

TODO

## Stay in touch

- Website - [https://inovacie.bratislava.sk/](https://inovacie.bratislava.sk/)
