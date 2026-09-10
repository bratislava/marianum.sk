export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.service('plugin::graphql.extension')
    extensionService.use(({ strapi }) => ({
      typeDefs: `
            type Query {
              assetFileTypes: [String]
            }
          `,
      resolvers: {
        Query: {
          assetFileTypes: {
            resolve: async (ctx) => strapi.controller('api::asset.asset').listFiletypes(ctx),
          },
        },
      },
      resolversConfig: {
        'Query.assetFileTypes': {
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
  async bootstrap({ strapi }) {
    console.log('Bootstrap function started')

    // create Revalidate webhook according to this suggestion https://github.com/strapi/strapi/pull/20487#issuecomment-2482527848
    const webhooks = await strapi.get('webhookStore').findWebhooks()
    const webhook = webhooks.find((w) => w.name === 'Bootstrapped Revalidate')

    if (!webhook) {
      await strapi.get('webhookStore').createWebhook({
        id: 'Bootstrapped Revalidate',
        name: 'Bootstrapped Revalidate',
        url: `${process.env.REVALIDATE_NEXT_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET_TOKEN}`,
        events: ['entry.create', 'entry.update', 'entry.publish'],
        headers: {},
        isEnabled: true,
      })
      console.log('Revalidate webhook created')
    } else {
      console.log('Revalidate webhook already exists')
    }
  },
}
