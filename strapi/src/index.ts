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
  async bootstrap({ strapi }) {
    //------------------------------------
    // ADDING ENGLISH LOCALE
    //------------------------------------
    const existingEnglish = await strapi.db
      .query("plugin::i18n.locale")
      .findOne({ where: { code: "en" } });
    if (!existingEnglish) {
      const english = { name: "English (en)", code: "en" };
      try {
        await strapi.db.query("plugin::i18n.locale").create({ data: english });
      } catch (error: any) {
        console.log(
          "Caught error while creating locale, checking if locale created successfully."
        );
        const createdEnglish = await strapi.db
          .query("plugin::i18n.locale")
          .findOne({ where: english });
        if (createdEnglish) console.log("Created English locale.");
      }
    }
    console.log({
      locales: await strapi.db.query("plugin::i18n.locale").findMany(),
    });
  },
};
