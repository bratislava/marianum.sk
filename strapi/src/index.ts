export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.service("plugin::graphql.extension");
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
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap(/*{ strapi }*/) {},
};
