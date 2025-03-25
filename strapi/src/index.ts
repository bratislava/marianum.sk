import { Strapi } from '@strapi/strapi'

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.service("plugin::graphql.extension")
    extensionService.use(({ strapi }) => ({
      typeDefs: `
            type Query {
              documentFiletypes: [String]
            }
          `,
      resolvers: {
        Query: {
          documentFiletypes: {
            resolve: async (ctx) =>
              strapi.controller("api::document.document").listFiletypes(ctx),
          },
        },
      },
      resolversConfig: {
        "Query.documentFiletypes": {
          auth: false,
        },
      },
    }))
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Strapi }) {
    console.log('Bootstrap function started')

    // create Revalidate webhook according to this suggestion https://github.com/strapi/strapi/pull/20487#issuecomment-2482527848
    const webhook = await strapi.db.query('webhook').findOne({
      where: {
        name: 'Bootstrapped Revalidate',
      },
    })

    if (!webhook) {
      await strapi.webhookStore.createWebhook({
        id: 'Bootstrapped Revalidate',
        name: 'Bootstrapped Revalidate',
        url: `${process.env.REVALIDATE_NEXT_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET_TOKEN}`,
        events: ['entry.create', 'entry.update', 'entry.publish', 'entry.unpublish', 'entry.delete'],
        headers: {},
        isEnabled: true
      })
      console.log('Revalidate webhook created')
    } else {
      console.log('Revalidate webhook already exists')
    }
  },
}
