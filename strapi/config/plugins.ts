import meilisearchConfig from "./plugins.meilisearch.config";
import graphqlConfig from "./plugins.graphql.config";

export default ({ env }) => ({
  // It's important to enable Navigation plugin first, before GraphQL
  navigation: {
    enabled: true,
    config: {
      additionalFields: [],
      contentTypes: ["api::page.page"],
      contentTypesNameFields: {
        "api::page.page": ["title"],
      },
      allowedLevels: 2,
      gql: { navigationItemRelated: ["Page"] },
    },
  },
  email: {
    config: {
      //  mailgun email provider https://www.npmjs.com/package/@strapi/provider-email-mailgun
      provider: "mailgun",
      providerOptions: {
        key: env("MAILGUN_API_KEY"), // Required
        domain: env("MAILGUN_DOMAIN"), // Required
        url: "https://api.eu.mailgun.net", //Optional. If domain region is Europe use 'https://api.eu.mailgun.net'
      },
      settings: {
        defaultFrom: env("MAILGUN_EMAIL"),
        defaultReplyTo: env("MAILGUN_EMAIL"),
      },
    },
  },
  graphql: {
    enabled: true,
    config: graphqlConfig,
  },
  "ceremonies-debtor-list": {
    enabled: true,
    resolve: "./src/plugins/ceremonies-debtor-list",
  },
  meilisearch: {
    config: meilisearchConfig,
  },
});
